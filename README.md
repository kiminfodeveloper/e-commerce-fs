# Dashboard de E-commerce Full-stack

Este é um sistema completo de dashboard para gerenciamento de e-commerce, com backend em Java/Spring Boot e frontend em Next.js.

## Tecnologias

### Backend
- **Java 8+**
- **Spring Boot 2.7.18**
- **Spring Data JPA**
- **PostgreSQL**
- **Lombok**

### Frontend
- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (Gráficos)
- **Lucide React** (Ícones)

## Como Rodar

### 1. Configurar o Banco de Dados
Certifique-se de ter um PostgreSQL rodando e crie um banco chamado `ecommerce_db`.
Atualize as credenciais em `backend/src/main/resources/application.properties`.

### 2. Rodar o Backend
Navegue até a pasta `backend` e execute:
```bash
mvn spring-boot:run
```
O servidor iniciará em `http://localhost:8080`.

### 3. Rodar o Frontend
Navegue até a pasta `frontend` e execute:
```bash
npm install
npm run dev
```
O painel estará disponível em `http://localhost:3000`.

## Funcionalidades
- **Dashboard:** Resumo de vendas, novos clientes e gráficos de performance.
- **Gerenciamento de Produtos:** Listagem com busca, filtros por categoria e status de estoque.
- **Design:** Clean Dark Mode inspirado em dashboards modernos de alta performance.
- **Arquitetura:** Código modular, tipado e seguindo as melhores práticas RESTful.
