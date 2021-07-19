const winston = require("winston");
const util = require("util");
const format = util.format;

const SPLAT = Symbol.for("splat");

const { colorize, combine, errors, printf, timestamp } = winston.format;
const formatLogs = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(
    ({ timestamp, level, message, stack, [SPLAT]: args = [] }) =>
      `${timestamp} - ${level}: ${
        stack ? format(message, stack, ...args) : format(message, ...args)
      }`
  )
);

module.exports = setupLogger = () => {
  const consoleTransport = new winston.transports.Console({
    format: formatLogs,
  });

  const logger = winston.createLogger({
    transports: consoleTransport,
  });

  console.error = function () {
    return logger.error.apply(logger, arguments);
  };

  console.info = function () {
    return logger.info.apply(logger, arguments);
  };

  console.warn = function () {
    return logger.warn.apply(logger, arguments);
  };

  console.log = function () {
    return logger.info.apply(logger, arguments);
  };

  return logger;
};
