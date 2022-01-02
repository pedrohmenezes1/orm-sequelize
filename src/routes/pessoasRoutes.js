import { Router } from 'express';
import ControllerPessoas from '../app/controllers/PessoasController';

const rotaPessoas = Router();

rotaPessoas.post('/pessoas', ControllerPessoas.criar);

rotaPessoas.get('/pessoas', ControllerPessoas.ListarTodos);

export default rotaPessoas;
