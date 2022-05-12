import { DataSource } from "typeorm"
import { User, NowMatchingUser }	from './entities';

export const myDataSource = new DataSource({
	type: 'mongodb',
			url: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
			ssl: true,
			authSource: 'admin',
			entities: [ User, NowMatchingUser ],
});