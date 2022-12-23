import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { mercadoPago } from '../lib/mercadopago'
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model'

export async function paymentRoutes(fastify: FastifyInstance) {
    fastify.post('/payments', async (request, reply) => {
        const createPaymentBody = z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            amount: z.number(),
            description: z.string()
        })

        const { firstName, lastName, email, amount, description } = createPaymentBody.parse(request.body)

        const paymentData: CreatePaymentPayload = {
            transaction_amount: amount,
            description,
            payment_method_id: 'pix',
            payer: {
                first_name: firstName,
                last_name: lastName,
                email
            },
            installments: 0
        }

        const paymentCreateResponse = await mercadoPago.payment.create(paymentData)

        interface PaymentDataResponse {
            point_of_interaction: {
                transaction_data: {
                    qr_code: string;
                    qr_code_base64: string;
                }
            }
        }

        const paymentDataResponse:PaymentDataResponse = paymentCreateResponse.body

        return reply.status(201).send({
            qr_code: paymentDataResponse.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: paymentDataResponse.point_of_interaction.transaction_data.qr_code_base64
        })
    })
}