import { App } from './app';

const main = async () => {
  const app = new App();
  await app.connectDatabase();
};
main();
