//변경사항: 
import { Request, Response, NextFunction } from "express";		
import moment from 'moment-timezone';

import { MatchingUser, User } from "../../../entities";
import { UnivType } from "../../../models/UnivType";
import { MinuteType } from "../../../models/MinuteType";
import { PlaceType } from "../../../models/PlaceType";	
import { FoodType } from "../../../models/FoodType";
import { GenderType } from "../../../models/GenderType";
import { Mbti1Type, Mbti2Type, Mbti3Type, Mbti4Type } from "../../../models/MbtiType";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		//들어온 데이터 형식이 잘못된게 있는지 확인
		const inputNickname: string = req.body.nickname;
		if (inputNickname.length <= 1 || inputNickname.length >= 10) {
			return res.status(461).json({
				code: 461,
				message: 'invalid nickname',
			});
		}
		const inputUniv: number = req.body.univ;
		if (!(inputUniv in UnivType)) {
			return res.status(462).json({
				code: 462,
				message: 'invalid univ type',
			});
		}
		const inputHour: number = req.body.hour;
		if (inputHour < 0 || inputHour >= 24) {
			return res.status(463).json({
				code: 463,
				message: 'invalid hour',
			});
		}
		const inputMinute: number = req.body.minute;
		if (!(inputMinute in MinuteType)) {
			return res.status(464).json({
				code: 464,
				message: 'invalid minute type'
			});
		}
		const inputFood: number = req.body.food_type;
		if (!(inputFood in FoodType)) {
			return res.status(465).json({
				code: 464,
				message: 'invalid food type'
			});
		}
		const inputPlace: number = req.body.place;
		if (!(inputPlace in PlaceType)) {
			return res.status(465).json({
				code: 465,
				message: 'invalid place type',
			});
		}
		const inputGender: number = req.body.gender;
		if (!(inputGender in GenderType)) {
			return res.status(466).json({
				code: 466,
				message: 'invalid gender type',
			});
		}
		const inputMbti: string = req.body.mbti;
		let resultArr: number[] = [];
		let errorFlag: boolean = false;
		if (inputMbti[0] === 'i' || inputMbti[0] === 'I') {
			resultArr[0] = Mbti1Type.I;
		}
		else if (inputMbti[0] === 'e' || inputMbti[0] === 'E') {
			resultArr[0] = Mbti1Type.E;
		}
		else {
			errorFlag = true;
		}
		if (inputMbti[1] === 'S' || inputMbti[1] === 's') {
			resultArr[1] = Mbti2Type.S;
		}
		else if (inputMbti[1] === 'N' || inputMbti[1] === 'n') {
			resultArr[1] = Mbti2Type.N;
		}
		else {
			errorFlag = true;
		}
		if (inputMbti[2] === 'T' || inputMbti[2] === 't') {
			resultArr[2] = Mbti3Type.T;
		}
		else if (inputMbti[2] === 'F' || inputMbti[2] === 'f') {
			resultArr[2] = Mbti3Type.F;
		}
		else {
			errorFlag = true;
		}
		if (inputMbti[3] === 'J' || inputMbti[3] === 'j') {
			resultArr[3] = Mbti4Type.J;
		}
		else if (inputMbti[3] === 'P' || inputMbti[3] === 'p') {
			resultArr[3] = Mbti4Type.P;
		}
		else {
			errorFlag = true;
		}
		if (errorFlag) {
			return res.status(466).json({
				code: 467,
				message: 'invalid mbti type',
			});
		}
		
		//이미 같은 닉네임이 등록된게 있는지 확인
		const temp = await User.findOne({
			where: { nickname: inputNickname },
		});
		if (temp) {
			return res.status(405).json({
				code: 405,
				message: 'already existing nickname',
			});
		}
		
		//받은 정보의 유효성을 체크 완료한 상태
		//이제 데이터베이스에 등록 (User에도 등록(is_matched가 false값이 되게 해서), AvailableUser에도 등록(매칭 되어야 하는 상태이므로))
		let user = new User();
		let matchingUser = new MatchingUser();
		user.nickname = inputNickname;
		user.univ = inputUniv;
		const today = new Date();
		moment.tz.setDefault('Asia/Seoul');
		user.month = moment().month() + 1;
		user.date = moment().date();
		user.hour = inputHour;
		user.minute = inputMinute;
		user.food_type = inputFood;
		user.place = inputPlace;
		user.gender = inputGender;
		user.mbti_1 = resultArr[0];
		user.mbti_2 = resultArr[1];
		user.mbti_3 = resultArr[2];
		user.mbti_4 = resultArr[3];
		user.is_matched = false;
		matchingUser.user = user;

		await user.save();
		await matchingUser.save();

		return res.status(200).json({
			code: 200,
			message: 'stored successfully',
		});
	}
	catch (err) {
		console.error(err);
		return res.status(408).json({
			code: 408,
			message: 'server error',
		});
	}
};