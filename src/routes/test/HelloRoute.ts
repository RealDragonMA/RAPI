import {FastifyReply, FastifyRequest} from "fastify";
import AbstractRoute from "../AbstractRoute";

export default class HelloRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {message} = <{ message: string }>req.body;

        reply.code(200).send({message: `Hello ${message} !`});

    }
}