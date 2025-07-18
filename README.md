# 🛒 Ecommerce NodeJS + MongoDB

Aplicação de e-commerce desenvolvida com Node.js, Express e MongoDB.
O projeto implementa autenticação de usuários com JSON Web Tokens (JWT), incluindo rotas de cadastro e login.

⚠️ **Este projeto ainda está em desenvolvimento. Novas funcionalidades serão adicionadas em breve.**

---

## ✨ Funcionalidades Desenvolvidas

✅ Cadastro de usuários  
✅ Login com geração de token JWT  
✅ Validação de autenticação em rotas protegidas  
✅ Estrutura inicial organizada em controllers e routes
**Sistema de Gerenciamento de Produtos**
✅ CRUD completo para produtos (criar, listar, atualizar, deletar)
✅ Modelo de produto com campos: nome, descrição, preço, quantidade em estoque, categoria
- **Sistema de Gerenciamento de Categorias**
✅ CRUD completo para categorias (criar, listar, atualizar, deletar)
✅ Modelo de categoria com nome e descrição
- **Sistema de Validação com Joi**
✅ Validações automáticas para dados de entrada
✅ Middleware de validação para todas as rotas
✅ Schemas de validação para usuários, produtos e categorias

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Joi (validação de dados)
- bcryptjs (criptografia de senhas)
---

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
yarn add or npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes informações:
```env
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
```

4. Inicie a aplicação
```bash
yarn dev
```

### Autenticação
- `POST /cadastro` - Cadastro de usuário
- `POST /login` - Login de usuário

### Produtos
- `GET /produtos/list` - Listar todos os produtos
- `GET /produtos/list/:id` - Buscar produto por ID
- `POST /produtos/create` - Criar novo produto (requer autenticação)
- `PUT /produtos/edit/:id` - Atualizar produto (requer autenticação)
- `DELETE /produtos/delete/:id` - Deletar produto (requer autenticação)

### Categorias
- `GET /categorias/list` - Listar todas as categorias
- `GET /categorias/list/:id` - Buscar categoria por ID
- `POST /categorias/create` - Criar nova categoria (requer autenticação)
- `PUT /categorias/edit/:id` - Atualizar categoria (requer autenticação)
- `DELETE /categorias/delete/:id` - Deletar categoria (requer autenticação)

## 🔄 Atualizações Recentes

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


📌 Próximos Passos

-  Upload de imagens

-  Sistema de busca e filtros

-  Sistema de Avaliações

-  Carrinho de Compras


💡 **Sobre**
Este projeto tem como objetivo ser uma base inicial para aplicações de e-commerce modernas, com autenticação segura e estrutura escalável.


## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

⚠️ Status: Em desenvolvimento

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.