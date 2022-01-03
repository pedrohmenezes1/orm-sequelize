import { Router } from 'express';
import ControllerNivel from '../app/controllers/NivelController';

const rotaNiveis = Router();

rotaNiveis.post('/niveis', ControllerNivel.criar);

rotaNiveis.get('/niveis', ControllerNivel.listarTodos);

rotaNiveis.get('/niveis/:id', ControllerNivel.listarUm);

rotaNiveis.put('/niveis/:id', ControllerNivel.atualizarUm);

rotaNiveis.delete('/niveis/:id', ControllerNivel.deletarUm);

export default rotaNiveis;
