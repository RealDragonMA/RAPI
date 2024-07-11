import Fastify, {FastifyInstance} from "fastify";
import {bootstrap} from "fastify-decorators";
import {resolve} from "path";
import Main from "../Main";
import 'reflect-metadata';

interface IWebServer {
    middlewares?: IMiddleware[];
}

interface IMiddleware<T = {}> {
    import: any;
    config?: T;
}

export default class WebServer {

    private readonly server: any
    private readonly middlewares: IMiddleware[];

    constructor(option: IWebServer) {
        this.server = Fastify({
            logger: false,
            disableRequestLogging: true
        });
        this.middlewares = option.middlewares ?? [];
    }

    public async start(): Promise<void> {

        for (const middleware of this.middlewares) {
            await this.server.register(middleware.import, middleware.config);
        }

        await this.server.addHook('onRequest', (request: any, reply: any, done: any) => {
            (request as any).startTime = process.hrtime();
            done();
        });

        await this.server.addHook('onResponse', (request: any, reply: any, done: any) => {
            const [seconds, nanoseconds] = process.hrtime((request as any).startTime);
            const responseTimeMs = (seconds * 1000 + nanoseconds / 1000000).toFixed(2);
            const statusCode = reply.statusCode;
            const clientIp = request.ip || request.headers['x-forwarded-for'] || request.socket.remoteAddress;
            const methodEndpoint = `${request.method} ${request.url}`;

            const message: string = `${statusCode} | ${clientIp} | ${responseTimeMs}ms | ${methodEndpoint}`
            if (statusCode >= 500) {
                Main.getLogger().error(message);
            } else if (statusCode >= 400) {
                Main.getLogger().warn(message);
            } else {
                Main.getLogger().info(message);
            }
            done();
        });
        await this.server.register(bootstrap, {
            directory: resolve(__dirname, "..", `controllers`),
            mask: /Controller\./,
        });

        this.server.listen({port: process.env.FASTIFY_PORT ?? 3000, host: process.env.FASTIFY_HOST ?? "0.0.0.0"}, (err: any, address: string) => {
            if (err) throw err;
            Main.getLogger().info("The server was successfully started on : " + address);
        })
    }

    public addMiddleware<T = {}>(middleware: IMiddleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    public getServer(): FastifyInstance {
        return this.server;
    }

    public getSocketIO() {
        return this.server.io
    }

}
