import S from "fluent-json-schema";
import {FastifyReply} from "fastify";

export default {
    response: {
        200: S.object()
            .prop("error", S.boolean().required())
            .prop("message", S.string().required())
            .prop("data")
    }
}

export function replySuccess(reply: FastifyReply, message?: string, data?: any) {
    reply.code(200).send({error: false, message: message ?? "No messages", data: data ?? undefined});
}
