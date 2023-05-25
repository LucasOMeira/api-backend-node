import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {
    
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find();

      res.status(200).json(livrosResultado);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id);

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado);
    } catch (error) {
      next(error);
    } 
    
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
    } catch (error) {
      next(error);
    }
    
  };

  static deletaLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
    
      if (livroResultado !== null) {
        res.status(200).send({ message: `${livroResultado.nome} deletado com sucesso` });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
    } catch (error) {
      next(error);
    }
    
  };
  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livroResultado = await livros.find({"editora": editora}, {});
      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
    }
  
  };


}

export default LivroController;