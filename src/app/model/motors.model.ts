import { Type } from "./Type.model";
import { Image } from "./image.model";

export class Motors {
  idMotors!: number;
  nomMotors!: string;
  prixMotors!: number;
  dateCreation!: Date;
  type!: Type;
  image! : Image;
  imageStr!:string;
  images!: Image[];


}
