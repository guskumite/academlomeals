import { Sequelize } from 'sequelize';
import { envs } from '../environments/environments.js';

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function authenticated() {
  try {
    await sequelize.authenticate();
    console.log('Connection is ok!: La conexión es uai! 😁');
  } catch (error) {
    throw new Error('Error when authenticating: Error al autenticar 😱', error);
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log(
      'db correctly synced!: La base de datos ha sido sincronizada! 😉'
    );
  } catch (error) {
    throw new Error('Error when synchronizing: Error al sincronizar 😱', error);
  }
}

export default sequelize