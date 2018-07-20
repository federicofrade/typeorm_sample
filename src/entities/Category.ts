import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //WRONG ! Lazy Relation only: It doesn't save the questions at saving the category.
    /*@ManyToMany(type => Question, question => question.categories)
    questions: Promise<Question[]>;*/

    /*WRONG ! Cascade Way Only: It save the questions at saving the category but you can't reference the questions from category
        (category.questions) because it is always undifined.
    /*@ManyToMany(type => Question, question => question.categories, {cascade: true})
    questions: Question[];*/

    //Right !
    @ManyToMany(type => Question, question => question.categories, {cascade: true})
    questions: Promise<Question[]>;

}