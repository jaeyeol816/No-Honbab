import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn
} from 'typeorm';

import { User } from './User';
import { FoodType } from '../models/FoodType';
import { GenderType } from '../models/GenderType';
import { Mbti1Type, Mbti2Type, Mbti3Type, Mbti4Type } from '../models/MbtiType';
import { MinuteType } from '../models/MinuteType';
import { PlaceType } from '../models/PlaceType';


@Entity('now_matching_users')
export class NowMatchingUser extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
		nullable: false,
	})
	nickname: string;

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
		nullable: false,
		type: 'enum',
		enum: GenderType,
	})
	prefer_gender: number;

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

	@Column({
		unique: false,
		nullable: false,
	})
	kakao_id: string;

	@CreateDateColumn()
	created_at: Date;


	@OneToOne(
		() => User,
		user => user.now_matching_user,
		{ cascade: true, onDelete: 'CASCADE'}
	)
	@JoinColumn({
		name: 'user_id',
	})
	user: User;
}