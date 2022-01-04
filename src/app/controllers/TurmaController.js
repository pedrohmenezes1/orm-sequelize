/* eslint-disable no-unused-expressions */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Turmas from '../models/turmas';

class ControllerTurmas {
  // Cadastra uma única turma ;)
  async criar(req, res) {
    const schema = Yup.object().shape({
      data_inicio: Yup.date(
        'Erro: Necessário preencher o campo data_inicio!'
      ).required('Erro: Necessário preencher o campo data_inicio!'),
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
      const data_inicio = req.body;

      const Turma = await Turmas.create(data_inicio);

      await Turma.save();

      return res.status(201).send({ Turma });
    } catch (error) {
      return res
        .status(400)
        .send({ error: 'Erro ao registrar uma nova turma' });
    }
  }

  async listarTodos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;
    try {
      const listarTurmas = await Turmas.findAll({ where });
      return res.status(200).send({ listarTurmas });
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de Turmas ' });
    }
  }

  async listarUm(req, res) {
    const { id } = req.params;
    try {
      const listarturma = await Turmas.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ listarturma });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao listar turma por Id' });
    }
  }

  async atualizarUm(req, res) {
    const { id } = req.params;
    const atualizarturma = req.body;
    try {
      await Turmas.update(atualizarturma, { where: { id: Number(id) } });

      const atualizado = await Turmas.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ atualizado });
    } catch (err) {
      return res.status(404).send({ error: 'Erro ao atualizar Turmas' });
    }
  }

  async deletarUm(req, res) {
    const { id } = req.params;
    try {
      await Turmas.destroy({ where: { id: Number(id) } });

      const deletado = `id ${id} foi deletado`;

      return res.status(204).json({ deletado });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir turma' });
    }
  }

  async recuperarTurma(req, res) {
    const { id } = req.params;
    try {
      await Turmas.restore({ where: { id: Number(id) } });

      const mensagem = `id ${id} foi recuperado`;

      return res.status(200).json({ mensagem });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao recuperar esse id!' });
    }
  }
}

export default new ControllerTurmas();
