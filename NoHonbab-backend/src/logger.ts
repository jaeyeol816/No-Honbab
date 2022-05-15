import { createLogger, format, transports } from "winston";
import { StreamOptions } from "morgan";
import winstonDaily from 'winston-daily-rotate-file';
import path from "path";

const logDir = path.join(__dirname, '/../logs');

const { combine, timestamp, printf, label } = format;

const colorize = format.colorize();

const logFormat = printf(({ level, message, label, timestamp}) => {
	return `${colorize.colorize(level, `[${timestamp}] [${level.toUpperCase()}] ${label ?? 'default'}:`)} ${message}`;
});

export const getLogger = (path: string) => {
	/**
	 * Log Level
	 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
	 */
	const logger = createLogger({
			format: combine(
					label({ label: path }), // 로그 출력 시 라벨링 설정
					timestamp({
							format: 'YYYY-MM-DD HH:mm:ss',
					}),
					logFormat,
			),
			transports: [
					// info 레벨 로그를 저장할 파일 설정
					new winstonDaily({
							level: 'info',
							datePattern: 'YYYY-MM-DD',
							dirname: logDir,
							filename: `%DATE%.log`,
							maxFiles: 30,  // 30일치 로그 파일 저장
							zippedArchive: true,
					}),
					// error 레벨 로그를 저장할 파일 설정
					new winstonDaily({
							level: 'error',
							datePattern: 'YYYY-MM-DD',
							dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
							filename: `%DATE%.error.log`,
							maxFiles: 30,
							zippedArchive: true,
					}),
			],
	});

	const httpLogger = createLogger({
		format: combine(
			label({ label: 'http' }),
			timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			logFormat,
		),
		transports: [
			// info 레벨 로그를 저장할 파일 설정
			new winstonDaily({
				level: 'info',
				datePattern: 'YYYY-MM-DD',
				dirname: logDir,
				filename: `%DATE%.http.log`,
				maxFiles: 30,  // 30일치 로그 파일 저장
				zippedArchive: true,
			})
		],
	});

	// Production 환경이 아닌 경우(dev 등) - Console 로그 출력
	if (process.env.NODE_ENV !== 'production') {
		logger.add(new transports.Console({
			// handleExceptions: true,
			// json: false,
			format: combine(
					label({ label: path }),
					timestamp(),
					logFormat,
					// `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
					// winston.format.simple(),  
			)
		}));
	}

	return logger;
}

const httpLogger2 = createLogger({
	format: combine(
		label({ label: 'http' }),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		logFormat,
	),
	transports: [
		// info 레벨 로그를 저장할 파일 설정
		new winstonDaily({
			level: 'info',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir,
			filename: `%DATE%.http.log`,
			maxFiles: 30,  // 30일치 로그 파일 저장
			zippedArchive: true,
		})
	],
});
export const stream: StreamOptions = {
	write: (message: string) => {
		httpLogger2.info(message.trim());
	}
}

