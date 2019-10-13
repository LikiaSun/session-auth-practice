import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity("User")
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;
}
