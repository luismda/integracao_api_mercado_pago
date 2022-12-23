import { useState, FormEvent } from 'react'
import { Input } from './components/Input'
import { Button } from './components/Button'

import { api } from './lib/axios'

interface PaymentData {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  description: string;
}

export function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [payment, setPayment] = useState<PaymentData>({} as PaymentData)
  const [qrCode, setQRCode] = useState('')
  const [qrCodeBase64, setQRCodeBase64] = useState('')
  const [textButtonCopy, setTextButtonCopy] = useState<'Copiar código' | 'Código copiado!'>('Copiar código')

  async function handleCreatePayment(event: FormEvent) {
    event.preventDefault()
  
    try {
      setIsLoading(true)

      const response = await api.post('/payments', payment)

      setQRCode(response.data.qr_code)
      setQRCodeBase64(response.data.qr_code_base64)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleCodeCopy() {
    navigator.clipboard.writeText(qrCode)

    setTextButtonCopy('Código copiado!')

    setTimeout(() => setTextButtonCopy('Copiar código'), 3000)
  }

  return (
    <div className="bg-gray-900 w-screen h-screen flex justify-center items-center">
      <main className="bg-gray-800 rounded max-w-md p-4">
        <h1 className="text-gray-200 font-bold text-2xl">{qrCode ? 'Escaneie ou copie o código' : 'Pagamento via PIX'}</h1>

        {qrCode ? (
          <>
            <img 
              src={`data:image/jpeg;base64,${qrCodeBase64}`}
              alt="QR Code da chave PIX para pagamento"
              className="mt-4 mx-auto max-w-[250px]"
            />

            <Input 
              className="mt-4"
              name="qrCode"
              type="text"
              value={qrCode}
              readOnly
            />

            <Button 
                className="mt-4"
                type="button"
                onClick={handleCodeCopy}
            >
              {textButtonCopy}
            </Button>
          </>
        ) :(
          <>
            <form onSubmit={handleCreatePayment}>
              <div className="flex gap-2 mt-4">
                <Input 
                  placeholder="Nome"
                  name="firstName"
                  type="text"
                  onChange={event => setPayment({ ...payment, firstName: event.target.value })}
                  value={payment.firstName ?? ''}
                />

                <Input 
                  placeholder="Sobrenome"
                  name="lastName"
                  type="text"
                  onChange={event => setPayment({ ...payment, lastName: event.target.value })}
                  value={payment.lastName ?? ''}
                />
              </div>

              <Input 
                placeholder="E-mail"
                name="email"
                type="email"
                className="mt-2"
                onChange={event => setPayment({ ...payment, email: event.target.value })}
                value={payment.email ?? ''}
              />

              <Input 
                placeholder="Valor"
                name="amount"
                type="number"
                className="mt-2"
                onChange={event => setPayment({ ...payment, amount: parseFloat(event.target.value) })}
                value={payment.amount ?? ''}
              />

              <Input 
                placeholder="Descrição"
                name="description"
                type="text"
                className="mt-2"
                onChange={event => setPayment({ ...payment, description: event.target.value })}
                value={payment.description ?? ''}
              />  

              <Button 
                className="mt-4"
                type="submit"
                isLoading={isLoading}
              >
                Pagar
              </Button>
            </form>
          </>
        )}
      </main>
    </div>
  )
}