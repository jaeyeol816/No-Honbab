import { Request, Response, NextFunction } from "express";		
import moment from 'moment-timezone';

import { User, NowMatchingUser } from "../../../entities";
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
		if (!inputNickname || inputNickname.length <= 1 || inputNickname.length >= 10) {
			return res.status(460).json({
				code: 460,
				message: 'invalid nickname',
			});
		}
		const inputHour: number = req.body.hour;
		if (!inputHour || inputHour < 0 || inputHour >= 24) {
			return res.status(461).json({
				code: 461,
				message: 'invalid hour',
			});
		}
		const inputMinute: number = req.body.minute;
		if (!inputMinute ||  !(inputMinute in MinuteType)) {
			return res.status(462).json({
				code: 462,
				message: 'invalid minute type'
			});
		}
		const inputAge: number = req.body.age;
		if (!inputAge || inputAge <= 0 || inputAge >= 100) {
			return res.status(466).json({
				code: 466,
				message: 'invalid age value',
			});
		}
		const inputFood: number = req.body.food_type;
		if (!inputFood || !(inputFood in FoodType)) {
			return res.status(464).json({
				code: 464,
				message: 'invalid food type'
			});
		}
		const inputPlace: number = req.body.place;
		if (!inputPlace || !(inputPlace in PlaceType)) {
			return res.status(463).json({
				code: 463,
				message: 'invalid place type',
			});
		}
		const inputGender: number = req.body.gender;
		if (!inputGender || !(inputGender in GenderType)) {
			return res.status(465).json({
				code: 465,
				message: 'invalid gender type',
			});
		}
		const inputMbti: string = req.body.mbti;
		if (!inputMbti) {
			return res.status(467).json({
				code: 467,
				message: 'invalid mbti type',
			});
		}
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
			return res.status(467).json({
				code: 467,
				message: 'invalid mbti type',
			});
		}
		const inputKakaoId: string = req.body.kakao_id;
		if (!inputKakaoId || inputKakaoId.length <= 1 && inputKakaoId.length > 20) {
			return res.status(468).json({
				code: 468,
				message: 'invalid kakao id',
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
		let nowMatchingUser = new NowMatchingUser();
		user.nickname = inputNickname;
		nowMatchingUser.nickname = inputNickname;
		const today = new Date();
		moment.tz.setDefault('Asia/Seoul');
		user.month = moment().month() + 1;
		nowMatchingUser.month = moment().month() + 1;
		user.date = moment().date();
		nowMatchingUser.date = moment().date();
		user.hour = inputHour;
		nowMatchingUser.hour = inputHour;
		user.minute = inputMinute;
		nowMatchingUser.minute = inputMinute;
		user.food_type = inputFood;
		nowMatchingUser.food_type = inputFood;
		user.place = inputPlace;
		nowMatchingUser.place = inputPlace;
		user.gender = inputGender;
		nowMatchingUser.gender = inputGender;
		user.age = inputAge;
		nowMatchingUser.age = inputAge;
		user.mbti_1 = resultArr[0];
		nowMatchingUser.mbti_1 = resultArr[0];
		user.mbti_2 = resultArr[1];
		nowMatchingUser.mbti_2 = resultArr[1];
		user.mbti_3 = resultArr[2];
		nowMatchingUser.mbti_3 = resultArr[2];
		user.mbti_4 = resultArr[3];
		nowMatchingUser.mbti_4 = resultArr[3];
		user.kakao_id = inputKakaoId;
		nowMatchingUser.kakao_id = inputKakaoId;
		user.is_matched = false;
		nowMatchingUser.user = user;

		await user.save();
		await nowMatchingUser.save();

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