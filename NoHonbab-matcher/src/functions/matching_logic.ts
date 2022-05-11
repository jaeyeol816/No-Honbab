import cron from 'node-cron';
import { User, NowMatchingUser } from '../entities';

export const task = cron.schedule('* * * * *', () => {
	console.log('1분마다 시행 (임시)');
	//NowMatchingUser에 있는 사용자 각각 매칭 로직 실시
	//  매칭시 해당 사람을 User에서 업데이트하고, 상대방도 User에서 업데이트. (User에서 partenr 속성값 추가, is_matched속성도 변경)
	//  NowMatchingUser에서 해당 사용자 삭제.

}, {
	scheduled: false,
});