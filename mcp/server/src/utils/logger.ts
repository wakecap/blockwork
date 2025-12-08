import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";
const nodeEnv = process.env.NODE_ENV || "development";

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Create the logger
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: { service: "blockwork-mcp-server" },
  transports: [
    // Console transport with pretty formatting for development
    new winston.transports.Console({
      format:
        nodeEnv === "development"
          ? winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(({ timestamp, level, message, ...metadata }) => {
                let msg = `${timestamp} [${level}]: ${message}`;
                if (Object.keys(metadata).length > 0) {
                  msg += ` ${JSON.stringify(metadata)}`;
                }
                return msg;
              }),
            )
          : logFormat,
    }),
  ],
});

// Request logger middleware
export function requestLogger(req: any, res: any, next: any) {
  const start = Date.now();
  const { method, url, headers } = req;

  // Log request
  logger.info("Incoming request", {
    method,
    url,
    ip: req.ip || req.connection?.remoteAddress,
    userAgent: headers["user-agent"],
  });

  // Log response
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const logData = {
      method,
      url,
      statusCode,
      duration,
      ip: req.ip || req.connection?.remoteAddress,
    };

    if (statusCode >= 400) {
      logger.warn("Request completed with error", logData);
    } else {
      logger.info("Request completed", logData);
    }
  });

  next();
}

// Export convenience methods
export default logger;
