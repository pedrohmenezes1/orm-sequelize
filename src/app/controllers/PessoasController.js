import * as Yup from 'yup';
import Pessoas from '../models/Pessoas';

class CriarPessoas {
  // Cadastra uma única pessoa ;)
  async criar(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string('Erro: Necessário preencher o campo name!').required(
        'Erro: Necessário preencher o campo name!'
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
}
export default new CriarPessoas();
