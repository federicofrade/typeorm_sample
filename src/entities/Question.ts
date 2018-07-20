import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import {Category} from "./Category";
import { QType } from "./QType";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    //Cascade Way
    @ManyToMany(type => Category, category => category.questions)
    @JoinTable()
    categories: Promise<Category[]>;

    @OneToOne(type => QType, {cascade: true})
    @JoinColumn()
    type: Promise<QType>;

}