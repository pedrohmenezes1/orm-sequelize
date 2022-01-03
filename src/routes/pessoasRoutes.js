import { Router } from 'express';
import ControllerPessoas from '../app/controllers/PessoasController';

const rotaPessoas = Router();

rotaPessoas.post('/pessoas', ControllerPessoas.criar);

rotaPessoas.get('/pessoas', ControllerPessoas.listarTodos);

rotaPessoas.get('/pessoas/:id', ControllerPessoas.listarUm);

rotaPessoas.put('/pessoas/:id', ControllerPessoas.atualizarUm);

rotaPessoas.delete('/pessoas/:id', ControllerPessoas.deletarUm);

export default rotaPessoas;
