import * as Yup from 'yup';
import Pessoas from '../models/pessoas';

class ControllerPessoas {
  // Cadastra uma única pessoa ;)
  async criar(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string('Erro: Necessário preencher o campo nome!').required(
        'Erro: Necessário preencher o campo nome!'
      ),
      ativo: Yup.boolean(
        'Erro: Necessário preencher o campo ativo com True ou False!'
      ).required('Erro: Necessário preencher o campo ativo!'),
      email: Yup.string('Erro: Necessário preencher o campo email!')
        .email('Erro: Necessário preencher o campo com email válido!')
        .required('Erro: Necessário preencher o campo email!'),
      role: Yup.string('Erro: Necessário preencher o campo role!').required(
        'Erro: Necessário preencher o campo role com sua ocupação!'
      ),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        erro: true,
        mensagem: err.errors,
      });
    }

    const emailExists = await Pessoas.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        error: 'Email já cadastrado',
      });
    }

    try {
      const { nome, ativo, email, role } = req.body;

      const Pessoa = await Pessoas.create({ nome, ativo, email, role });

      await Pessoa.save();

      return res.status(201).send({ Pessoa });
    } catch (error) {
      return res
        .status(400)
        .send({ error: 'Erro ao registrar uma nova pessoa' });
    }
  }

  async listarTodos(req, res) {
    try {
      const listarPessoas = await Pessoas.findAll();
      return res.status(200).send({ listarPessoas });
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de pessoas ' });
    }
  }

  async listarUm(req, res) {
    const { id } = req.params;
    try {
      const listarPessoa = await Pessoas.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ listarPessoa });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao listar pessoa por Id' });
    }
  }

  async atualizarUm(req, res) {
    const { id } = req.params;
    const atualizarPessoa = req.body;
    try {
      await Pessoas.update(atualizarPessoa, { where: { id: Number(id) } });

      const atualizado = await Pessoas.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ atualizado });
    } catch (err) {
      return res.status(404).send({ error: 'Erro ao atualizar pessoas' });
    }
  }

  async deletarUm(req, res) {
    const { id } = req.params;
    try {
      await Pessoas.destroy({ where: { id: Number(id) } });

      const deletado = `id ${id} foi deletado`;

      return res.status(204).json({ deletado });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir pessoa' });
    }
  }
}

export default new ControllerPessoas();
