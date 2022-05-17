import { Request, Response, NextFunction } from "express";	
import querystring from 'querystring';

import { User } from "../../../entities";
import { getLogger } from "../../../logger";

export default async (req: Request, res: Response, next: NextFunction) => {
	const inputNickname = req.query.nickname as string;
	try {
		if (!inputNickname) {
			return res.status(471).json({
				code: 470,
				message: 'no nickname',
			});
		}
		const user = await User.findOne({
			where: {
				nickname: inputNickname,
			}
		});
		if (!user) {
			return res.status(470).json({
				code: 470,
				message: 'non registered nickname',
			});
		}	
		if (user.is_matched == true) {
			const partnerUser = await User.findOne({
				where: {
					partner: {
						id: user.id
					}
				}
			});
			return res.status(202).json({
				code: 202,
				partner: partnerUser,
			});
		}
		else {
			return res.status(201).json({
				code: 201,
				partner: null,
			})
		}
	}
	catch (err) {
		getLogger('server').error(err);
		return res.status(408).json({
			code: 408,
			message: 'server error',
		});
	}
};