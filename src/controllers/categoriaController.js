import { Categoria } from '../models/categoria.js'

export const criarCategoria = async (req, res) => {
    const {nome, descricao} = req.body

    try {
        const existeCategoria = await Categoria.findOne({nome});
        if(existeCategoria) {
            return res.status(400).json({Message: "Categoria ja cadastrada!"});
        }

        const novaCategoria = new Categoria(req.body);
        await novaCategoria.save();
        res.status(201).json({
            Message: "Categoria Cadastrada com sucesso",
            categoria: {
                id: novaCategoria.id,
                nome: novaCategoria.nome,
                descricao: novaCategoria.descricao
            }
        });
    }
    catch(err) {
        res.status(500).json({message: "Erro ao cadastrar usuario"});
    }
}

export const listarCategorias = async (req, res) => {
    try {
        let Categorias = await Categoria.find({}).select("nome descricao _id");
        res.json({categorias: Categorias});
    }
    catch(err) {
        res.status(500).json({message: "Erro ao Listar Categorias"});
    }
}

export const listarCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findOne({_id: req.params.id});
        if(!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        res.json({categoria});
    }
    catch(err) {
        res.status(500).json({message: "Erro ao listar categoria"});
    }
}

export const editaCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findOne({_id: req.params.id});
        if(!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        categoria.nome = req.body.nome
        categoria.descricao = req.body.descricao

        await categoria.save()
        res.status(200).json({message: "Categoria Editada com sucesso"});
    }
    catch(err) {
        res.status(500).json({message: "Erro ao editar categoria"});
    }
}

export const deletaCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findOne({_id: req.params.id})
        if(!categoria) {
            return res.status(404).json({message: "Categoria não encontrada"});
        }
        await categoria.deleteOne()
        res.status(200).json({message: "Categoria Deletada com sucesso"});
    }
    catch(err) {
        res.status(500).json({message: "Erro ao deletar essa categoria"});
    }
}