import mercadopago from 'mercadopago'
import { config } from '../config/config'

mercadopago.configurations.setAccessToken(config.access_token)

export const mercadoPago = mercadopago