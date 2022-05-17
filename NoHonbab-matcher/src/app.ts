import express from 'express';
import morgan, { StreamOptions } from 'morgan';
import { createConnection } from 'typeorm';
import cors from 'cors';

import { User, NowMatchingUser }	from './entities';
import controlRouter from './routes/control';
// import { stream } from './logger';
// import { getLogger } from './logger';

const app = express();

app.set('port', process.env.PORT || 8112);

const main = async () => {
	try {
		await createConnection({
      type: 'mysql',
      host: process.env.DB_URL,
      port: 3306,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [User, NowMatchingUser],
      synchronize: true,
      charset: 'UTF8_GENERAL_CI',
    });
		// getLogger('server').info('데이터베이스 연결 성공 (matcher서버)');
		console.log('데이터베이스 연결 성공(matcher서버)')
	}
	catch (err) {
		// getLogger('server').info('데이터베이스 연결 실패 (matcher서버)');
		// getLogger('server').error(err);
		console.log('데이터베이스 연결 실패(matcher서버)');
		console.error(err);
	}

	app.use(morgan(process.env.NODE_ENV || 'dev'));

	app.use(cors());
	app.use('/control', controlRouter);

	app.get('/', (req, res) => {
		res.status(200).json({ signal: 'success~!' });
	});

	app.listen(app.get('port'), () => {
		// getLogger('server').info(app.get('port'), '번 포트에서 대기중 (컨테이너의 포트번호)');
		console.log(app.get('port'), '번 포트에서 대기중(컨테이너의 포트번호)');
	});
}

main();