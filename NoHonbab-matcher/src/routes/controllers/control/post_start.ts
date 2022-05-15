import { Request, Response, NextFunction } from 'express';

import { getLogger } from "../../../logger";
import { task } from "../../../functions/matching_logic";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		task.start();
		return res.status(200).json({
			code: 200,
			message: 'matching system started'
		});
	}
	catch(err) {
		getLogger('server').error(err);
		return res.status(401).json({
			code: 401, 
			message: 'error starting system',
		})
	}
}