import {Controller, POST} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import S from "fluent-json-schema";
import HelloRoute from "../routes/test/HelloRoute";


@Controller("/test")
export default class TestController {

    @POST("/hello", {
        schema: {
            body: S.object()
                .prop('message', S.string().description('Message you want to receive').required())
        }
    })
    public handlerHello = async (req: FastifyRequest, reply: FastifyReply) => new HelloRoute().run(req, reply);

}
