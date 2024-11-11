const dotenv = require('dotenv');

// #### DEFAULT ####

async function setupEnv() {
  dotenv.config({ path: `${process.cwd()}/.env` });
}

module.exports = async () => {
  await setupEnv();
};
