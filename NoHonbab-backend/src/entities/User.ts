import {
	Entity,
	BaseEntity,
	Column,
	ObjectIdColumn,
	ObjectID,
	CreateDateColumn,
	OneToOne
} from 'typeorm';

import { MatchingUser } from './MatchingUser';
import { UnivType } from '../models/UnivType';
import { MinuteType } from '../models/MinuteType';
import { PlaceType } from '../models/PlaceType';	
import { FoodType } from '../models/FoodType';
import { GenderType } from '../models/GenderType';
import { Mbti1Type, Mbti2Type, Mbti3Type, Mbti4Type } from '../models/MbtiType';

@Entity('users') 
export class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Column({
		unique: true,
		nullable: false,
	})
	nickname: string;

	@Column({
		unique: false,
		nullable: false,
		type: 'enum',
		enum: UnivType,
		default: UnivType.SKKU_SEOUL,
	})
	univ: number;

	@Column({
		unique: false,
		nullable: false,
	})
	month: number;

	@Column({
		unique: false,
		nullable: false,
	})
	date: number;

	@Column({
		unique: false,
		nullable: false,
	})
	hour: number;

	@Column({
		unique: false,
		nullable: false,
		type: 'enum',
		enum: MinuteType,
		default: MinuteType.M0,
	})
	minute: number;

	@Column({
		unique: false,
		nullable: false,
		type: 'enum',
		enum: PlaceType,
	})
	place: number;

	@Column({
		unique: false,
		nullable: true,
		type: 'enum',
		enum: FoodType,
	})
	food_type: number;

	@Column({
		unique: false,
		nullable: false,
		type: 'enum',
		enum: GenderType,
	})
	gender: number;

	@Column({
		unique: false,
		nullable: true,
	})
	age: number;

	@Column({
		unique: false,
		nullable: true,
		type: 'enum',
		enum: Mbti1Type,
	})
	mbti_1: number;

	@Column({
		unique: false,
		nullable: true,
		type: 'enum',
		enum: Mbti2Type,
	})
	mbti_2: number;

	@Column({
		unique: false,
		nullable: true,
		type: 'enum',
		enum: Mbti3Type,
	})
	mbti_3: number;

	@Column({
		unique: false,
		nullable: true,
		type: 'enum',
		enum: Mbti4Type,
	})
	mbti_4: number;

	@Column({
		unique: false,
		nullable: false,
	})
	is_matched: boolean;

	@CreateDateColumn()
	created_at: Date;

	@Column({
		unique: false,
		nullable: false,
	})
	expires_at: Date;

	@OneToOne(
		() => MatchingUser,
		matching_user => matching_user.user
	)
	matching_user: MatchingUser;
}