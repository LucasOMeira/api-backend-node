import livros from "../models/Livro.js";

class LivroController {
    
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find();

      res.status(200).json(livrosResultado);
    } catch (error) {
      res.status(500).json({message: "Eroo interno no servidor" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id);

      res.status(200).send(livroResultado);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do livro não localizado.`});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado);
    } catch (error) {
      res.status(500).json({message: "Eroo interno no servidor" });
    } 
    
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send(livroResultado);
    } catch (error) {
      res.status(500).send({message: error.message});
    }
    
  };

  static deletaLivro = async (req, res) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
    

      res.status(200).send({ message: `${livroResultado.nome} deletado com sucesso` });
    } catch (error) {
      res.status(500).send({message: error.message});
    }
    
  };
  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      const livroResultado = await livros.find({"editora": editora}, {});
      res.status(200).send(livroResultado);
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  
  };






}

export default LivroController;