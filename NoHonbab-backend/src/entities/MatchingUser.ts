import {
	Entity,
	BaseEntity,
	Column,
	ObjectIdColumn,
	ObjectID,
	CreateDateColumn,
	OneToOne,
	JoinColumn
} from 'typeorm';

import { User } from './User';

@Entity('matching_users')
export class MatchingUser extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@OneToOne(
		() => User,
		user => user.matching_user,
		{ cascade: true, onDelete: 'CASCADE'}
	)
	@JoinColumn({
		name: 'user_id',
	})
	user: User;
}