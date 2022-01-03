import { Router } from 'express';
import rotaPessoas from './pessoasRoutes';
import rotaNiveis from './niveisRouters';
import rotaTurmas from './turmasRoutes';

const apiRotas = new Router();

/* apiRotas.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Orm-Sequelize' });
}); */

apiRotas.use('/api', rotaPessoas, rotaNiveis, rotaTurmas);

export default apiRotas;
