import {FastifyReply, FastifyRequest} from "fastify";

export default abstract class AbstractRoute {
    public abstract run(req: FastifyRequest, reply: FastifyReply): Promise<string | Record<string, any> | any[]>;
}
