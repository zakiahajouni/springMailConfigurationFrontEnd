import { Component, OnInit } from "@angular/core";
import { Motors } from "../model/motors.model";
import { MotorsService } from "../service/motors.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Type } from "../model/Type.model";
import { Image } from "../model/image.model";


@Component({
  selector: "add-motors",
  templateUrl: "./add-motors.component.html",
  styleUrls: ["./add-motors.component.css"],
})
export class AddMotorsComponent implements OnInit {
  newMotors = new Motors();
  newIdTyp!: number;
  newType!: Type;
  types!: any;
  uploadedImage!: File;
imagePath: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private motorsService: MotorsService
  ) {}

  ngOnInit(): void {
    this.motorsService.listeTypes().subscribe((typ) => {
      console.log(typ);
      this.types = typ;
    });
  }
  addMotors() {
          this.motorsService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newMotors.image=img;
    this.newMotors.type = this.types.find((item : {idTyp : number}) => item.idTyp == this.newIdTyp);
    this.motorsService.ajouterMotors(this.newMotors).subscribe((moto) => {
      console.log(moto);
      this.router.navigate(["motors"]);
    });
  })}


 /* addMotors(){
    this.newMotors.type = this.types.find((item : {idTyp : number}) => item.idTyp
    == this.newIdTyp)!;
    this.motorsService
    .ajouterMotors(this.newMotors)
    .subscribe((prod) => {
    this.motorsService
    .uploadImage(this.uploadedImage,
    this.uploadedImage.name,prod.idMotors)
    .subscribe((response: any) => {}
    );
    this.router.navigate(['motors']);
    });
    }*/

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
}
