# ExtractLight API

Bem-vindo à API ExtractLight, que é uma parte do teste prático para o cargo de Desenvolvedor Full Stack Pleno na Lumi. Esta API é responsável por extrair dados relevantes de faturas de energia elétrica, armazená-los em um banco de dados PostgreSQL e fornecer endpoints para a aplicação web consumir esses dados.

## Tecnologias Utilizadas

✅ Node.js
✅ Prisma (ORM para PostgreSQL)

## Como Executar

1. Certifique-se de ter o Node.js e o PostgreSQL instalados.
2. Clone este repositório.
3. Instale as dependências com `yarn`.
4. Configure as variáveis de ambiente necessárias (consulte o arquivo `.env.example`).
5. Execute as migrações do banco de dados com `npx prisma migrate dev`.
6. Execute a API com `yarn start`.

## Endpoints

- `POST /extract-invoice`: Extrai informações de pdfs quando não estiverem no banco de dados.
- `GET /invoices?clientNumber`: Retorna a lista de faturas disponíveis para um cliente.
- `GET /download/:mes`: faz o download do documento a partir do nome do arquivo.

