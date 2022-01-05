import * as Yup from 'yup';
import { literal } from 'sequelize';
import Pessoas from '../models/pessoas';
import Matriculas from '../models/matriculas';

class ControllerPessoas {
  // Cadastra uma única pessoa ;)
  async criar(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string('Erro: Necessário preencher o campo nome!')
        .required('Erro: Necessário preencher o campo nome!')
        .min(4, 'campo nome tem que ser maior que 4 caracteres'),
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

  async listarTodosAtivos(req, res) {
    try {
      const listarAtivos = await Pessoas.findAll({
        attributes: ['id', 'nome', 'ativo', 'email', 'role'],
      });
      return res.status(200).send({ listarAtivos });
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de pessoas ' });
    }
  }

  async listarTodos(req, res) {
    try {
      const listarPessoas = await Pessoas.scope('all').findAll({
        attributes: ['id', 'nome', 'ativo', 'email', 'role'],
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
      const mensagem = `id ${id} foi deletado`;
      return res.status(200).json({ mensagem });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir pessoa' });
    }
  }

  async recuperarPessoa(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { id } = req.params;
    try {
      await Pessoas.restore({ where: { id: Number(id) } });

      const mensagem = `id ${id} foi recuperado`;

      return res.status(200).json({ mensagem });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao recuperar esse id!' });
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

  async matriculasConfirmadas(req, res) {
    try {
      const matricula = await Matriculas.findAll({
        atributes: ['id', 'status'],
      });
      return res.status(200).json(matricula);
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de matrículas ' });
    }
  }

  async matriculasTodas(req, res) {
    try {
      const matricula = await Matriculas.scope('all').findAll({
        atributes: ['id', 'status'],
      });
      return res.status(200).json(matricula);
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de matrículas ' });
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

      const mensagem = `id ${matriculaId} foi deletado`;

      return res.status(200).json({ mensagem });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir matrícula' });
    }
  }

  async recuperarMatricula(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { estudanteId, matriculaId } = req.params;
    try {
      await Matriculas.restore({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });

      const mensagem = `id ${matriculaId} foi recuperado`;

      return res.status(200).json({ mensagem });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao recuperar esse id!' });
    }
  }

  async pegarMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao pegar matrícula' });
    }
  }

  async listarTudo(req, res) {
    try {
      const pessoas = await Pessoas.scope('all').findAndCountAll({
        attributes: ['id', 'nome', 'ativo', 'email', 'role'],
        include: [
          {
            model: Matriculas,
            as: 'aulasMatriculadas',
          },
        ],
      });
      return res.status(200).send({ pessoas });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao pegar o index' });
    }
  }

  async pegarMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasMatriculas = await Matriculas.findAndCountAll({
        where: { turma_id: Number(turmaId), status: 'confirmado' },
        limit: 10,
        order: [['estudante_id', 'ASC']],
      });
      return res.status(200).json(todasMatriculas);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao pegar matrícula' });
    }
  }

  async pegarTurmaCheia(req, res) {
    const lotacao = 2;
    try {
      const turmasLotadas = await Matriculas.findAndCountAll({
        where: { status: 'confirmado' },
        attributes: ['turma_id'],
        group: ['turma_id'],
        having: literal(`count (turma_id) >= ${lotacao}`),
      });

      return res.status(200).json(turmasLotadas.count);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao pegar matrícula' });
    }
  }

  // eslint-disable-next-line consistent-return
  async cancelarPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await Pessoas.update(
        { ativo: true },
        { where: { id: Number(estudanteId) } }
      );
      await Matriculas.update(
        { status: 'cancelado' },
        { where: { estudante_id: Number(estudanteId) } }
      );
      return res.status(200).json({
        messagem: `as matrículas do estudante ${estudanteId} foram canceladas`,
      });
    } catch {
      return res.status(400).send({ error: 'Erro ao cancelar a matrícula' });
    }
  }
}
export default new ControllerPessoas();
