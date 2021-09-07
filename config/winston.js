const winston = require('winston');

const infoLogger = new winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: './logs/info.log', level: 'info'}),
  ],
  exitOnError: false
});

const errorLogger = new winston.createLogger({
    level: 'error',
    transports: [
      new winston.transports.File({ filename: './logs/error.log', level: 'error'}),
    ],
    exitOnError: false
  });

module.exports = {
    infoLogger,
    errorLogger
};