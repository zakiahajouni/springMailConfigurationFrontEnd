import { Role } from "./role.model";

export class User{
  user_id!:number;
    username?:string ;
    password?: string ;
    roles! :Role[];
    enabled!:boolean;
    email!:string;

   }
