# Integrando uma aplicação web com a API do Mercado Pago 💲💸

Nesse projeto o objetivo foi testar a API do Mercado Pago para gerar um QR Code que permitirá realizar pagamentos via PIX.

No front-end foi utilizado o ReactJS em conjunto com o Vite, além do Tailwind CSS para estilização e o Axios para realizar a requisição. Já no back-end, utilizando o 
NodeJS e o Fastify, foi criado um servidor simples com apenas uma rota, a qual é responsável por fazer a comunicação com a API do Mercado Pago, enviando os dados do
pagador e recebendo como resposta os dados do pagamento, dentre eles o código para realizar o PIX e o QR Code.
