import { Language } from './language.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm/decorator/columns/Column';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column({nullable: true})
  @Field({nullable: true})
  name: string;

  @Column({nullable: true, default: new Date()})
  @Field({nullable: true})
  createdAt: Date;

  @Column({nullable: true, default: new Date()})
  @Field({nullable: true})
  updatedAt: Date;

  @ManyToMany(() => Language)
  @JoinTable()
  languages: Language[];

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];
}
