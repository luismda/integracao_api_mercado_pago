import Fastify from 'fastify'
import cors from '@fastify/cors'

import { paymentRoutes } from './routes/payment'

(async function bootstrap(){
    const fastify = Fastify({
        logger: true
    })
    
    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(paymentRoutes)

    fastify.listen({ port: 3333 })
})()