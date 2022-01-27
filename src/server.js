import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';

// IIFE Immediatly Invoked Function Expression
(async () => {
  try {
    //connect to DB
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();

    // import the app and set up the server
    const App = require('./app').default;
    const app = new App();
    app.listen();
  } catch (err) {
    console.error(
      'Something went wrong when initializing the app:\n',
      err.stack
    );
  }
})();
