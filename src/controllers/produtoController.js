import { Produto } from '../models/produto.js'
import { Categoria } from '../models/categoria.js'
import mongoose from 'mongoose'


export const criarProduto = async (req, res) => {
    try {
        const {nome, descricao, preco, estoque, categoria, isActive} = req.body

        const produtoCadastrado = await Produto.findOne({nome})
        if(produtoCadastrado) {
            return res.status(400).json({Message: "Produto ja cadastrado"});
        }
        
        const categoriaName = categoria.trim();
        const categoriaExiste = await Categoria.findOne({nome: {$regex: new RegExp(`^${categoriaName}$`, 'i')}});
        console.log('categoria recebida:', categoriaName);
        console.log('req.body completo:', req.body);
            if(!categoriaExiste) {
                return res.status(400).json({message: "categoria não encontrada"});
            }
            
        
        const imagens = req.files.map(file => file.path);

        const novoProduto = new Produto({
            nome,
            descricao,
            preco,
            estoque,
            imagens,
            categoria: categoriaExiste._id,
            isActive
        });
        await novoProduto.save();

        res.status(201).json({
            Message: "Produto Cadastrado com sucesso",
            produto: {
                id: novoProduto._id,
                nome: novoProduto.nome,
                descricao: novoProduto.descricao,
                preco: novoProduto.preco,
                estoque: novoProduto.estoque,
                categoria: novoProduto.categoria,
                imagens: novoProduto.imagens,
                ativo: novoProduto.isActive
            }
        });
    }
    catch(err) {
        res.status(500).json({message: "erro ao criar o produto"})
    }
}

export const listarProdutos = async (req, res) => {
    
    try {
        const { search, category, minPrice, maxPrice, inStock} = req.query;

        const query = {};

        if(search) {
            query.$or = [
                { nome: {$regex: search, $options: 'i'}},
                { descricao: {$regex: search, $options: 'i'}}
            ];
        }

        if(category) {
            if(category.length === 24) {
                query.categoria = category
            }
            else {
                const foundCategory = await Categoria.findOne({ nome: {$regex: category, $options: 'i'}})
                if(foundCategory) {
                    query.categoria = foundCategory._id;
                }
                else {
                    return res.json({
                        total: 0,
                        page: Number(page),
                        pages: 0,
                        produtos: []
                    });
                }
            }
        }

        if(minPrice || maxPrice) {
            query.preco = {};
            if(minPrice) query.preco.$gte = Number(minPrice);
            if(maxPrice) query.preco.$lte = Number(maxPrice);
        }

        if(inStock) {
            query.estoque = inStock === 'true' ? { $gt: 0} : 0;
        }
 
        const { limit, skip } = req.pagination

        const produtos = await Produto.find(query)
        .skip(skip)
        .limit(limit);

        const total = await Produto.countDocuments(query);
        
        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            produtos
        });
    }
    catch(err) {
        res.status(500).json({message: "Erro ao Listar Produtos", error: err.message });
    }
}

export const listarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)
        if(!produto) {
            return res.status(404).json({Message: "Produto Não encontrado"});
        }
        res.status(200).json({produto})
    }
    catch(err) {
        res.status(500).json({message: "Erro ao Listar Produto"});
    }
}

export const editarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id)
        if(!produto) {
            return res.status(404).json({Message: "Produto Não encontrado"});
        }

        const camposPermitidos = ['nome', 'descricao', 'preco', 'estoque', 'imagens', 'isActive'];

        camposPermitidos.forEach(campo => {
            if(req.body[campo] !== undefined) {
                produto[campo] = req.body[campo];
            }
        });
        
        if (req.body.categoria !== undefined) {
        const categoriaInput = req.body.categoria;
        let categoria;

        if (mongoose.Types.ObjectId.isValid(categoriaInput)) {
            categoria = await Categoria.findById(categoriaInput);
            if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada pelo ID" });
            }
        } 
        else {
            categoria = await Categoria.findOne({ nome: categoriaInput });
            if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada pelo nome" });
            }
        }

      produto.categoria = categoria._id;
    }
        await produto.save();

        res.status(200).json({
            message: "Produto Editado com sucesso",
            produto: {
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                estoque: produto.estoque,
                ativo: produto.isActive
            }
        });
    }
    catch(err) {
        res.status(500).json({message: "Erro ao Editar Produto"});
    }
}

export const deletarProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if(!produto){
           return res.status(404).json({message: "Produto Não encontrado"})
        }
        console.log(`[LOG] produto será deletado:
            Id: ${produto._id},
            nome: ${produto.nome},
            Data: ${new Date().toLocaleString()}`);

            if(produto.estoque > 0) {
                return res.status(400).json({ message: "Não é possível deletar produtos com estoque" });
            }
        await produto.deleteOne();
        res.status(200).json({message: "Produto Deletado com sucesso"});
    }
    catch(err) {
        res.status(500).json({message: "Erro ao Deletar Produto"});
    }
}