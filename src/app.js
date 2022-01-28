import express from 'express';
import logger from 'morgan';
import environment from './config/environment';
import errorsMiddelware from './middelwares/errors';

class App {
  constructor() {
    this.app = express();
    this.app.use(
      logger('dev', { skip: (req, res) => environment.nodeEnv === 'test' })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRoutes();
  }

  setRoutes() {
    this.app.use(errorsMiddelware);
  }

  getrApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`listening at port ${port}`);
    });
  }
}

export default App;