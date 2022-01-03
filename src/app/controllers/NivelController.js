import * as Yup from 'yup';
import Niveis from '../models/niveis';

class ControllerNivel {
  // Cadastra um único nível ;)
  async criar(req, res) {
    const schema = Yup.object().shape({
      descr_nivel: Yup.string(
        'Erro: Necessário preencher o campo descr_nivel!'
      ).required('Erro: Necessário preencher o campo descr_nivel!'),
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
      const descr_nivel = req.body;

      const Nivel = await Niveis.create(descr_nivel);

      await Nivel.save();

      return res.status(201).send({ Nivel });
    } catch (error) {
      return res.status(400).send({ error: 'Erro ao registrar um novo nível' });
    }
  }

  async listarTodos(req, res) {
    try {
      const listarNiveis = await Niveis.findAll();
      return res.status(200).send({ listarNiveis });
    } catch (erro) {
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de níveis ' });
    }
  }

  async listarUm(req, res) {
    const { id } = req.params;
    try {
      const listarNivel = await Niveis.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ listarNivel });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao listar nível por id' });
    }
  }

  async atualizarUm(req, res) {
    const { id } = req.params;
    const atualizarNivel = req.body;
    try {
      await Niveis.update(atualizarNivel, { where: { id: Number(id) } });

      const atualizado = await Niveis.findOne({ where: { id: Number(id) } });

      return res.status(200).send({ atualizado });
    } catch (err) {
      return res.status(404).send({ error: 'Erro ao atualizar níveis' });
    }
  }

  async deletarUm(req, res) {
    const { id } = req.params;
    try {
      await Niveis.destroy({ where: { id: Number(id) } });

      const deletado = `id ${id} foi deletado`;

      return res.status(204).json({ deletado });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir níveis' });
    }
  }
}

export default new ControllerNivel();
