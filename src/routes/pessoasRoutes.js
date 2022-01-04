import { Router } from 'express';
import ControllerPessoas from '../app/controllers/PessoasController';

const rotaPessoas = Router();

rotaPessoas.get('/pessoas/index', ControllerPessoas.listarTudo);

rotaPessoas.post('/pessoas', ControllerPessoas.criar);

rotaPessoas.get('/pessoas', ControllerPessoas.listarTodosAtivos);

rotaPessoas.get('/pessoas/all', ControllerPessoas.listarTodos);

rotaPessoas.get('/pessoas/:id', ControllerPessoas.listarUm);

rotaPessoas.put('/pessoas/:id', ControllerPessoas.atualizarUm);

rotaPessoas.delete('/pessoas/:id', ControllerPessoas.deletarUm);

rotaPessoas.post('/pessoas/:id/recuperar', ControllerPessoas.recuperarPessoa);

rotaPessoas.get(
  '/pessoas/:estudanteId/matricula',
  ControllerPessoas.pegarMatriculas
);

rotaPessoas.get(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  ControllerPessoas.listarUmaMatricula
);
rotaPessoas.get('/matriculas', ControllerPessoas.matriculasConfirmadas);

rotaPessoas.get('/matriculas/all', ControllerPessoas.matriculasTodas);

rotaPessoas.post(
  '/pessoas/:estudanteId/matricula',
  ControllerPessoas.criarMatricula
);
rotaPessoas.put(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  ControllerPessoas.atualizarMatricula
);
rotaPessoas.delete(
  '/pessoas/:estudanteId/matricula/:matriculaId',
  ControllerPessoas.deletarMatricula
);
rotaPessoas.post(
  '/pessoas/:estudanteId/matricula/:matriculaId/recuperar',
  ControllerPessoas.recuperarMatricula
);

rotaPessoas.get(
  '/pessoas/matricula/:turmaId/confirmados',
  ControllerPessoas.pegarMatriculasPorTurma
);

export default rotaPessoas;
