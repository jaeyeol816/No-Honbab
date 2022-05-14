import { Request, Response, NextFunction } from "express";	

import { User } from "../../../entities";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findOne({
			where: {
				nickname: req.body.nickname
			}
		});
		if (!user) {
			return res.status(480).json({
				code: 480,
				message: 'non registered nickname'
			});
		}
		await User.delete({
			id: user.id
		});
		return res.status(203).json({
			code: 203,
			message: 'deleting completed'
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			code: 408,
			message: 'server error',
		});
	}
}