import fs from 'fs';
import path from 'path';

let models = {};

export function registerModels(sequelize) {
  const thisFile = path.basename(__filename);
  const modelFiles = fs.readdirSync(__dirname);
  const filteredModelFiles = modelFiles.filter(
    (file) => file !== thisFile && file.slice(-3) === '.js'
  );

  for (const file of filteredModelFiles) {
    const model = require(path.join(__dirname, file)).default(sequelize);
    models[model.name] = model;
  }

  //register associations of the models
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models.sequelize = sequelize;
}

export default models;
