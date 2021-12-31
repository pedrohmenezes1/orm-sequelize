import { Router } from 'express';
import CriarPessoas from '../app/controllers/PessoasController';

const rotaPessoas = Router();

rotaPessoas.post('/pessoas', CriarPessoas.criar);

export default rotaPessoas;
