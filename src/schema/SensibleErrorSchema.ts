import S from "fluent-json-schema";
import {FastifyReply} from "fastify";

export default {
    response: {
        400: S.object()
            .prop("error", S.boolean().required())
            .prop("message", S.string().required())
    }
}

export function replyError(reply: FastifyReply, message: string) {
    reply.code(400).send({error: true, message});
}
