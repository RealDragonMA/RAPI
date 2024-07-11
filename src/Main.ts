import WebServer from "./base/WebServer";
import {Logger} from "tslog";
import MongoManager from "./base/MongoManager";
import path from "node:path";


class Main {

    private readonly webserver: WebServer;
    private readonly mongoManager: MongoManager;
    private readonly logger: Logger;

    constructor() {
        this.webserver = new WebServer({
            middlewares: [
                {
                    import: import("@fastify/sensible"),
                },
                {
                    import: import('fastify-socket.io'),
                    config: {
                        cors: {
                            origin: "*",
                            credentials: true
                        }
                    }
                },
                {
                    import: import("@fastify/cors"),
                    config: {
                        origin: "*",
                    },
                }, {
                    import: import('@fastify/routes')
                }, {
                    import: import("@fastify/jwt"),
                    config: {
                        secret: "ZwpFAlscZ8NA&J9bRZO5K70h82eH7q"
                    }
                }, {
                    import: import("fastify-bcrypt"),
                    config: {
                        saltWorkFactor: 12
                    }
                }, {
                    import: import("@fastify/static"),
                    config: {
                        root: path.join(__dirname, "../public"),
                        prefix: "/public/",
                    }
                }, {
                    import: import("@fastify/multipart")
                }
            ],
        });

        console.log(path.join(__dirname, "../public"))

        this.logger = new Logger({
            displayFilePath: "hidden",
            displayFunctionName: false,
            prefix: [process.env.LOGGER_PREFIX || "RAPI"],
            overwriteConsole: true,
            dateTimeTimezone: "Europe/Paris",
            dateTimePattern: "day/month/year hour:minute:second.millisecond",
        });

        this.mongoManager = new MongoManager();

    }

    public async start() {
        await this.webserver.start();
        await this.mongoManager.connect();
    }

    public getWebServer(): WebServer {
        return this.webserver;
    }

    public getLogger(): Logger {
        return this.logger;
    }

    public getMongoManager(): MongoManager {
        return this.mongoManager;
    }

}

export default new Main();
