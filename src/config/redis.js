const Redis = require('ioredis');

  const redis = new Redis({
    host: 'localhost', // Use 'localhost' if connecting from the same machine
    port: 6379 // The exposed port on your host machine
  });



module.export = redis;