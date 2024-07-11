import S from "fluent-json-schema";

export default {
    headers: S.object().required(["authorization"]).prop("authorization", S.string()).valueOf(),
    response: {
        401: S.object()
            .prop("statusCode", S.number())
            .prop("error", S.string())
            .prop("message", S.string())
            .description("Header not provided")
            .valueOf(),
        403: S.object()
            .prop("statusCode", S.number())
            .prop("error", S.string())
            .prop("message", S.string())
            .description("Invalid JWT token")
            .valueOf(),
    },
};
