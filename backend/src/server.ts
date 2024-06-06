import app from './app';
import { config } from './config';
import { closePool } from './db/db';

const PORT = config.server.port;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
const gracefulShutdown = () => {
  server.close(async () => {
    await closePool();
    console.log('Server and pool closed');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);