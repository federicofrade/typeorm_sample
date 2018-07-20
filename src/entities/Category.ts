import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //MAL: Lazy Relation only
    /*@ManyToMany(type => Question, question => question.categories)
    questions: Promise<Question[]>;*/

    //MAL Cascade Way Only: Guarda bien, pero no permite hacer el .questions al hacer el find (lo devuelve como undefined siempre)
    /*@ManyToMany(type => Question, question => question.categories, {cascade: true})
    questions: Question[];*/

    @ManyToMany(type => Question, question => question.categories, {cascade: true})
    questions: Promise<Question[]>;

}