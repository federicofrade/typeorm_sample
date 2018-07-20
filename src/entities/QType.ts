import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class QType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}