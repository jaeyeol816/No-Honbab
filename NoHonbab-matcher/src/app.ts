import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { User, NowMatchingUser }	from './entities';

import controlRouter from './routes/control';

const app = express();

app.set('port', process.env.PORT || 80);

const main = async () => {
	try {
		const connection = await createConnection({
			type: 'mongodb',
			url: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
			ssl: true,
			authSource: 'admin',
			entities: [ User, NowMatchingUser ],
		});
		console.log('데이터베이스 연결 성공 from matcher서버');
	}
	catch (err) {
		console.log('데이터베이스 연결 실패');
		console.error(err);
	}

	app.use(morgan(process.env.NODE_ENV || 'dev'));

	app.use('/control', controlRouter);

	app.get('/', (req, res) => {
		res.json({ signal: 'success~!' });
	});

	app.listen(app.get('port'), () => {
		console.log(app.get('port'), '번 포트에서 대기중 (컨테이너의 포트번호)');
	});
}

main();