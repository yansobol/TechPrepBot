import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Table users {
  id integer [primary key]
  email varchar
  password varchar
  first_name varchar
  last_name varchar
  role varchar
  created_at datetime
  updated_at datetime
}
 */
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tg_id: number

    @Column()
    first_name: string

    @Column({ nullable: true })
    last_name: string

    @Column({ nullable: false })
    prog_lang: string

    @Column({ nullable: false })
    technology: string

    @Column({ nullable: false, default: false })
    common_qst: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
