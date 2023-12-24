import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function generateLogMessage(): [string, string] {
  const logLevels = ['I', 'E', 'W', 'D'];
  const requestPaths = ['/api/user', '/api/product', '/api/order', '/api/auth'];
  const statusCodes = [200, 404, 500, 403, 201];
  const userIDs = Array.from({ length: 10 }, (_, i) => i + 1);

  const timestamp = new Date().toISOString();
  const logLevel = logLevels[Math.floor(Math.random() * logLevels.length)];
  const path = requestPaths[Math.floor(Math.random() * requestPaths.length)];
  const statusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)];
  const userID = userIDs[Math.floor(Math.random() * userIDs.length)];

  const messages = [
    `Database connection established.`,
    `User ${userID} login successful.`,
    `Request to ${path} returned ${statusCode}.`,
    `Cache updated for key: user_${userID}`,
    `Configuration reloaded from file.`,
    `User ${userID} attempted unauthorized access.`,
    `Error processing payment for order ${Math.floor(Math.random() * 1000)}.`,
    `Session timeout for user ${userID}.`,
    `New user created with ID: ${userID}.`,
    `Failed to send email notification to user ${userID}.`
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];

  return [logLevel, `${timestamp} [${logLevel}] ${message}`];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  setInterval(() => {
    const [logLevel, message] = generateLogMessage();
    switch (logLevel) {
      case 'I':
        console.info(message);
        break;
      case 'E':
        console.error(message);
        break;
      case 'W':
        console.warn(message);
        break;
      default:
        console.log(message);
    }
  }, 200);
}
bootstrap();
