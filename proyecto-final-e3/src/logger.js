const path = require("path");
const winston = require("winston");
const { align, combine, printf, timestamp, colorize } = winston.format;

const LOG_FORMAT = combine(
  timestamp({ format: "YYYY-MM-DDTHH:mm:ss.sss" }),
  printf(({ level, message, timestamp, label }) => {
    return `${timestamp} ${level.toUpperCase()} ${message}`;
  }),
  colorize()
);

// Silly, Debug, Verbose, Info, Warn, Error.
const logger = winston.createLogger({
  level: "silly",
  format: LOG_FORMAT,
  transports: [
    new winston.transports.Console({
      level: "silly",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;

