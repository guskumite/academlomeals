import app from './app.js';
import { authenticated, syncUp } from './config/database/database.js';
import { envs } from './config/environments/environments.js';

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
});