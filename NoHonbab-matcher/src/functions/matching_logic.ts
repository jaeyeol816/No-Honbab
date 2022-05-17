import cron from 'node-cron';
import moment from 'moment-timezone';

import { User, NowMatchingUser } from '../entities';
import { getAgeScore } from './get_age_score';
import { getMbtiScore } from './get_mbti_score';
// import { getLogger } from '../logger';


type Element = {
	person: NowMatchingUser,
	score: number,
}


export const task = cron.schedule('*/15 * * * * *', async () => {
	//NowMatchingUser에 있는 사용자 각각 매칭 로직 실시 (모든 사람에 대해 반복))
	//일단 앞 사람부터 한명 가져온다.
	//그 사람이랑 시간,분,장소 같은 사람 모두 가져온다.
	//age, mbti 에 대해 매칭 실시. 각 사람에 대한 점수를 우선순위큐에 담는다.
	//우선순위큐에 원소가 있고, 그 원소의 점수가 특정 점수 이상이면 매칭된 것으로 처리
	//매칭되었으면, 해당 사람을 User에서 업데이트하고, 상대방도 User에서 업데이트. (User에서 partenr 속성값 추가, is_matched속성도 변경)
	//그리고 NowMatchingUser에서 두 사용자 삭제.
	try {
		moment.tz.setDefault('Asia/Seoul');
		let alreadyDone = Array<number>();
		alreadyDone.push(9999999999);
		while (true) {
			const targetMatchingUser = await NowMatchingUser
				.createQueryBuilder()
				.where('NowMatchingUser.id NOT IN (:...x)', {x: alreadyDone})
				.getOne();
			if (targetMatchingUser) {
				alreadyDone.push(targetMatchingUser.id);
				const matchingUsers = await NowMatchingUser.find({
					// where: {
					// 	month: moment().month() + 1 as number,
					// 	date: moment().date() as number,
					// 	hour: targetMatchingUser.hour as number,
					// 	minute: targetMatchingUser.minute as number,
					// 	place: targetMatchingUser.place as number,
					// }
				});
				let candidateMatchingUsers = matchingUsers.filter((u) => {
					if ((u.month == targetMatchingUser.month)
					&& (u.date == targetMatchingUser.date) 
					&& (u.hour == targetMatchingUser.hour)
					&& (u.minute == targetMatchingUser.minute)
					&& (u.place == targetMatchingUser.place)) 
						return true;
					else
						return false;
				});
				let tempArr = Array<Element>();
				for (let u of candidateMatchingUsers) {
					if (u.id === targetMatchingUser.id) 
						continue;
					let ageScore = getAgeScore(targetMatchingUser.age, u.age);
					let mbtiScore = getMbtiScore(targetMatchingUser.mbti_1, targetMatchingUser.mbti_2, targetMatchingUser.mbti_3, targetMatchingUser.mbti_4,
						u.mbti_1, u.mbti_2, u.mbti_3, u.mbti_4);
					tempArr.push({ person: u, score: ageScore+mbtiScore });
				}
				if (tempArr.length >= 1) {		//원소가 있을 때,
					tempArr.sort((e1: Element, e2: Element) => {		//내림차순 정렬
						return e2.score - e1.score;
					});
					if (tempArr[0].score >= 12) {		//가장 큰 점수 가진 사람과의 점수가 12점 이상이면 매칭 된것!!
						let targetUser = await User.findOne({
							relations: ['now_matching_user'],
							where: {
								now_matching_user: {id: targetMatchingUser.id},
							}
						});
						let partnerUser = await User.findOne({
							relations: ['now_matching_user'],
							where: {
								now_matching_user: {id: tempArr[0].person.id},
							}
						});
						if (!targetUser || !partnerUser) {
							//에러 처리
						}
						else {
							targetUser.partner = partnerUser;
							partnerUser.partner = targetUser;
							targetUser.is_matched = true;
							partnerUser.is_matched = true;
							// getLogger('server').info('matching completed: ', targetUser.nickname, ' and ', partnerUser.nickname);
							console.log('matching completed: ', targetUser.nickname, ' and ', partnerUser.nickname);
							await targetUser.save();
							await partnerUser.save();
							await NowMatchingUser.delete(targetMatchingUser.id);
							await NowMatchingUser.delete(tempArr[0].person.id);	
						}
					}
					else {	
					}
				}
				else {		//원소가 없을 때
				}
			}
			else {
				break;
			}
		}

	}
	catch (err) {
		// getLogger('server').error(err);
		console.error('err at matching logic');
	}
}, {
	scheduled: false,
});