import { Router } from 'express';
import ControllerTurmas from '../app/controllers/TurmaController';

const rotaTurmas = Router();

rotaTurmas.post('/turmas', ControllerTurmas.criar);

rotaTurmas.get('/turmas', ControllerTurmas.listarTodos);

rotaTurmas.get('/turmas/:id', ControllerTurmas.listarUm);

rotaTurmas.put('/turmas/:id', ControllerTurmas.atualizarUm);

rotaTurmas.delete('/turmas/:id', ControllerTurmas.deletarUm);

export default rotaTurmas;
