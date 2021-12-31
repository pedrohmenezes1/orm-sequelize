import { Router } from 'express';
import rotaPessoas from './pessoasRoutes';

const apiRotas = new Router();

/* apiRotas.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Orm-Sequelize' });
}); */

apiRotas.use('/api', rotaPessoas);

export default apiRotas;
