import { Request, Response, NextFunction } from "express";	

import { NowMatchingUser, User } from "../../../entities";
// import { getLogger } from "../../../logger";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body.nickname) {
			return res.status(471).json({
				code: 470,
				message: 'no nickname',
			});
		}
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
		let partner = await User.findOne({
			where: {
				partner: {
					id: user.id
				}
			}
		});
		if (partner) {
			let nowMatchingUser = new NowMatchingUser();
			nowMatchingUser.user = partner;
			nowMatchingUser.nickname = partner.nickname;
			nowMatchingUser.month = partner.month;
			nowMatchingUser.date = partner.date;
			nowMatchingUser.hour = partner.hour;
			nowMatchingUser.minute = partner.minute;
			nowMatchingUser.place = partner.place;
			nowMatchingUser.food_type = partner.food_type;
			nowMatchingUser.gender = partner.gender;
			nowMatchingUser.prefer_gender = partner.prefer_gender;
			nowMatchingUser.age = partner.age;
			nowMatchingUser.mbti_1 = partner.mbti_1;
			nowMatchingUser.mbti_2 = partner.mbti_2;
			nowMatchingUser.mbti_3 = partner.mbti_3;
			nowMatchingUser.mbti_4 = partner.mbti_4;
			nowMatchingUser.kakao_id = partner.kakao_id;
			partner.is_matched = false;
			await User.delete({
				id: user.id
			});
			await nowMatchingUser.save();
			await partner.save();
		}
		else {
			await User.delete({
				id: user.id
			});
		}
		return res.status(203).json({
			code: 203,
			message: 'deleting completed'
		});
	}
	catch (err) {
		// getLogger('server').error(err);
		console.error(err);
		return res.status(408).json({
			code: 408,
			message: 'server error',
		});
	}
}