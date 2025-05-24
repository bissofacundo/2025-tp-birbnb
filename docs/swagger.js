// swagger.js
import swaggerAutogenFactory from 'swagger-autogen';
const swaggerAutogen = swaggerAutogenFactory();

const doc = {
  info: {
    title: 'API BIRBNB',
    description: 'Documentación generada automáticamente',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/notificacionRoutes.js', './routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
