import {DoneFuncWithErrOrRes, FastifyReply, FastifyRequest} from "fastify";

export default function authorizedOnly(): (req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => any {

    return async (req: FastifyRequest, reply: FastifyReply) => {

        const {authorization: authHeader} = req.headers;

        if (!authHeader) return reply.unauthorized('Not authorized !');

        try {
        } catch (e) {
            reply.forbidden((<Error>e).message);
        }

    }
}