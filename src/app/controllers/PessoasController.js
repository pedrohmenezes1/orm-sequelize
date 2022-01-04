import * as Yup from 'yup';
import Pessoas from '../models/pessoas';
import Matriculas from '../models/matriculas';

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
      const listarPessoas = await Pessoas.findAll({
        attributes: ['id', 'nome', 'ativo', 'email', 'role'],
        include: [
          {
            model: Matriculas,
            as: 'matriculas',
          },
        ],
      });
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

  async listarUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const listarMatricula = await Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).send({ listarMatricula });
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Erro ao listar uma matrícula por id' });
    }
  }

  async index(req, res) {
    try {
      const matricula = await Matriculas.findAll({
        atributes: ['id', 'status'],
        include: [
          {
            model: Pessoas,
            as: 'pessoas',
          },
        ],
      });
      return res.status(200).json(matricula);
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de pessoas ' });
    }
  }

  async criarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

    const schema = Yup.object().shape({
      status: Yup.string('Erro: Necessário preencher o campo status!').required(
        'Erro: Necessário preencher o campo status!'
      ),
      turma_id: Yup.number(
        'Erro: Necessário preencher o campo turma_id com números!'
      ).required('Erro: Necessário preencher o campo turma_id!'),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        erro: true,
        mensagem: err.errors,
      });
    }
    try {
      const novaMatriculaCriada = await Matriculas.create(novaMatricula);

      return res.status(201).send(novaMatriculaCriada);
    } catch (error) {
      return res
        .status(400)
        .send({ error: 'Erro ao registrar uma nova matrícula' });
    }
  }

  async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novaMatricula = req.body;
    try {
      await Matriculas.update(novaMatricula, {
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });

      const atualizada = await Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });

      return res.status(200).send({ atualizada });
    } catch (err) {
      return res.status(404).send({ error: 'Erro ao atualizar uma matrícula' });
    }
  }

  async deletarMatricula(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { estudanteId, matriculaId } = req.params;
    try {
      await Matriculas.destroy({ where: { id: Number(matriculaId) } });

      const deletado = `id ${matriculaId} foi deletado`;

      return res.status(204).json({ deletado });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir matrícula' });
    }
  }
}

export default new ControllerPessoas();
