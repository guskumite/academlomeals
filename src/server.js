import app from './app.js';
import { authenticated, syncUp } from './modules/config/database/database.js';
import { envs } from './modules/config/environments/environments.js';

async function main() {
  try {
    // conexiones a base de datos
    await authenticated();
    await syncUp();
  } catch (error) {
    console.error(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT} 🏍🌞`);
  const currentTime = new Date();
  console.log('Date and time / Fecha y hora actual:', currentTime);
});
