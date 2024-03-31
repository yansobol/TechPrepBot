import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 {
        "topic": "backend",
        "lang": python,
        "framework": "Ruby on Rails",
        "text": "What is Ruby on Rails?",
        "options": [
            {"text": "A server-side web application framework written in Python", "isCorrect": false},
            {"text": "A server-side web application framework written in Ruby", "isCorrect": true},
            {"text": "A JavaScript library for building user interfaces", "isCorrect": false},
            {"text": "A database management system", "isCorrect": false}
        ],
        "answer": "A server-side web application framework written in Ruby",
        "learnMore": "https://rubyonrails.org/"
    
}
 */
@Entity('questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    topic: string

    @Column({ nullable: true })
    lang: string

    @Column({ nullable: true })
    framework: string

    @Column()
    text: string

    @Column({ nullable: false })
    answer: string

    @Column()
    options: string

    @Column()
    learnMore: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
