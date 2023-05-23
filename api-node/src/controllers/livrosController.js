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

      res.status(200).send(livroResultado);
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

      res.status(200).send(livroResultado);
    } catch (error) {
      next(error);
    }
    
  };

  static deletaLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
    

      res.status(200).send({ message: `${livroResultado.nome} deletado com sucesso` });
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