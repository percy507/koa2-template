// import { Entity, Column, AfterLoad } from 'typeorm';
// import { Length, validate } from 'class-validator';
// import { Base } from './base';

// @Entity('user')
// export class User extends Base {
//   @Column({ comment: '用户名', type: 'varchar', length: 10 })
//   @Length(5, 10, { message: 'username too short or too long' })
//   username: string;

//   @Column({ comment: '账号', type: 'varchar', length: 20 })
//   @Length(5, 20, { message: 'account too short or too long' })
//   account: string;

//   @Column({ comment: '密码', type: 'varchar', length: 20 })
//   @Length(5, 20, { message: 'password too short or too long' })
//   password: string;
// }
