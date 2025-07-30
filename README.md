# 🛒 Ecommerce NodeJS + MongoDB

Este é um projeto de E-commerce desenvolvido com uma stack moderna e escalável, utilizando Node.js, Express e MongoDB. O principal objetivo é fornecer uma base sólida para aplicações de comércio eletrônico, com foco em boas práticas, organização de código e escalabilidade. Ideal para quem deseja iniciar ou evoluir projetos modernos de E-commerce com tecnologias amplamente utilizadas no mercado.

⚠️ **Este projeto ainda está em desenvolvimento. Novas funcionalidades serão adicionadas em breve.**

---

## ✨ Funcionalidades Desenvolvidas

✅ Cadastro de usuários  
✅ Login com geração de token JWT  
✅ Validação de autenticação em rotas protegidas  
✅ Estrutura inicial organizada em controllers e routes  
✅ CRUD completo para produtos (criar, listar, atualizar, deletar)  
✅ Modelo de produto com campos: nome, descrição, preço, quantidade em estoque, categoria  
✅ CRUD completo para categorias (criar, listar, atualizar, deletar)  
✅ Modelo de categoria com nome e descrição  
✅ Validações automáticas para dados de entrada  
✅ Middleware de validação para todas as rotas  
✅ Schemas de validação para usuários, produtos e categorias  
✅ Sistema de upload de imagens para produtos (com suporte a múltiplas imagens e Cloudinary)  
✅ Sistema de busca, filtro e paginação para produtos  
✅ Sistema de Avaliações  
✅ Sistema de Carrinho de Compras (com cálculo automático de totais e validação de estoque)  
✅ Sistema de Pedidos  
---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Joi (validação de dados)
- bcryptjs (criptografia de senhas)
- Multer (upload de arquivos)
- Cloudinary (armazenamento de imagens)



## 📂 Como executar o projeto

### Pré-requisitos
- Node.js instalado
- MongoDB instalado e rodando
- Yarn ou npm

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/LukeRobs/Ecommerce-NodeJS-MongoDB.git
```

2. Instale as dependências
```bash
cd Ecommerce-NodeJS-MongoDB
# com Yarn
yarn add
# ou com NPM
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes informações:
```env
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

4. Inicie a aplicação
```bash
yarn dev
```

### 🔒 Autenticação
- `POST /cadastro` - Cadastro de usuário
- `POST /login` - Login de usuário

### 📦 Produtos
- `GET /produtos/list` - Listar todos os produtos
- `GET /produtos/list/:id` - Buscar produto por ID
- `POST /produtos/create` - Criar novo produto (requer autenticação 🔒)
- `PUT /produtos/edit/:id` - Atualizar produto (requer autenticação 🔒)
- `DELETE /produtos/delete/:id` - Deletar produto (requer autenticação 🔒)

### 📁 Categorias
- `GET /categorias/list` - Listar todas as categorias
- `GET /categorias/list/:id` - Buscar categoria por ID
- `POST /categorias/create` - Criar nova categoria (requer autenticação 🔒)
- `PUT /categorias/edit/:id` - Atualizar categoria (requer autenticação 🔒)
- `DELETE /categorias/delete/:id` - Deletar categoria (requer autenticação 🔒)

### 💯 Avaliações
- `POST /reviews/produto/:produtoId` - Adicionar avaliação a um produto (requer autenticação 🔒)
- `GET /reviews/produto/:produtoId` - Listar avaliações de um produto
- `DELETE /reviews/:id` - Deletar avaliação do produto (requer autenticação 🔒)

### 🛒 Carrinho de Compras
- `POST /me/carrinho/` - Adicionar produto ao carrinho (requer autenticação 🔒)
- `GET /me/carrinho` - Visualizar carrinho (requer autenticação 🔒)
- `DELETE /me/carrinho/:produtoId` - Remover item do carrinho (requer autenticação 🔒)

### 📃 Pedidos
- `POST /pedidos/` - Gerar um pedido (requer autenticação 🔒)
- `GET /pedidos/listar` - Listar meus pedidos (requer autenticação 🔒)
- `GET /pedidos/listar/:id` - Visualizar detalhes de um pedido (requer autenticação 🔒)
- `GET /pedidos/cliente/:clienteId` - Visualiza Pedidos de um unico Cliente (requer autenticação 🔒)
- `PUT /pedidos/atualizar/:id` - Atualizar Pedido (requer autenticação 🔒)
- `DELETE /pedidos/delete/:id` - Deletar o Pedido (requer autenticação 🔒)


## 🔄 Atualizações Recentes

### v1.5.0 - Sistema de Pedidos
- Implementação do sistema de pedidos

### v1.4.0 - Sistema de Carrinho de Compras
- Implementação do modelo, rotas e controller do carrinho de compras
- Cálculo automático de totais e validação de estoque no carrinho

### v1.3.0 - Sistema de Avaliações, Busca, Filtro e Paginação
- Criação do sistema de avaliações
- Adição de sistema de busca, filtro e paginação para produtos

### v1.2.1 - Upload de Imagens com Cloudinary
- Implementação do upload de várias imagens para produtos
- Uso do Cloudinary para armazenamento de imagens
- Ajustes no Multer e middleware de upload

### v1.2.0 - Sistema de Validação com Joi
- Implementação do Joi para validação de dados
- Criação de middleware de validação personalizado
- Adição de schemas de validação para todas as entidades
- Melhoria na tratativa de erros de validação

### v1.1.0 - Sistema de Produtos e Categorias
- Criação do modelo de Produto com campos completos
- Criação do modelo de Categoria
- Implementação de CRUD completo para produtos
- Implementação de CRUD completo para categorias
- Adição de relacionamento entre produtos e categorias


## 📌 Em breve

- [ ] Dashboard de administração
- [ ] Testes automatizados com Jest

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

⚠️ Status: Em desenvolvimento

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
