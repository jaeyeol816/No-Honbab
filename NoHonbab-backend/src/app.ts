import express , { Request, Response } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import matchRouter from './routes/match';
import { User, NowMatchingUser }	from './entities';

const app = express();

app.set('port', process.env.PORT || 80);

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
		console.log('데이터베이스 연결 성공');
	}
	catch (err) {
		console.log('데이터베이스 연결 실패');
		console.error(err);
	}


	app.use(morgan(process.env.NODE_ENV || 'dev'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use('/match', matchRouter);
	

	app.get('/', (req, res) => {
		res.json({ signal: 'success~!' });
	});

	app.listen(app.get('port'), () => {
		console.log(app.get('port'), '번 포트에서 대기중 (컨테이너의 포트번호)');
	});
}

main();