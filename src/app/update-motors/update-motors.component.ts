import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MotorsService } from "../service/motors.service";
import { Motors } from "../model/motors.model";
import { Type } from "../model/Type.model";
import { Image } from "../model/image.model";

@Component({
  selector: "app-update-motors",
  templateUrl: "./update-motors.component.html",
  styleUrls: ["./update-motors.component.css"],
})
export class UpdateMotorsComponent implements OnInit {
  currentMotors = new Motors();
  emptyType = new Type();
  types!: any;
  updatedTypId!: number;
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private motorsService: MotorsService
  ) {
    this.types = this.motorsService.listeTypes();
  }

 /*  ngOnInit(): void {
    this.emptyType.nameTyp="";
    this.emptyType.idTyp=0;
    this.motorsService.listeTypes().subscribe((data) => {
      this.types = data;
    });
    this.motorsService
      .consulterMotors(this.activatedRoute.snapshot.params["id"])
      .subscribe((moto) => {
        this.currentMotors = moto;
        this.updatedTypId = this.currentMotors.type!.idTyp;
   
      this.motorsService.loadImage(this.currentMotors.image.idImage).subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
});} ) ;

  } */
  ngOnInit(): void {
    this.emptyType.nameTyp="";
    this.emptyType.idTyp=0;
    this.motorsService.listeTypes().subscribe((data) => {
      this.types = data;
    });
    this.motorsService
      .consulterMotors(this.activatedRoute.snapshot.params["id"])
      .subscribe((moto) => {
        this.currentMotors = moto;
        this.updatedTypId = this.currentMotors.type.idTyp;});} 
    
  /* updateMotors() {
    this.currentMotors.type = this.types.find((mt :{idTyp:Number ;}) => mt.idTyp == this.updatedTypId )
 //tester si l'image du produit a été modifiée
if (this.isImageUpdated)
{
this.motorsService
.uploadImage(this.uploadedImage, this.uploadedImage.name)
.subscribe((img: Image) => {
this.currentMotors.image = img;
this.motorsService
.updateMotors(this.currentMotors)
.subscribe((prod) => {
this.router.navigate(['motors']);
});
});
}
else{
this.motorsService
.updateMotors(this.currentMotors)
.subscribe((prod) => {
this.router.navigate(['motors']);
});
}
  } */
  



  updateMotors() {
    this.currentMotors.type = this.types.find((mt :{idTyp:Number ;}) => mt.idTyp == this.updatedTypId )
    this.motorsService
    .updateMotors(this.currentMotors)
    .subscribe((prod) => {
    this.router.navigate(['motors']);
    });
    }
















  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }



    onAddImageMotor() {
      this.motorsService.uploadImageMot(this.uploadedImage,this.uploadedImage.name,this.currentMotors.idMotors)
      .subscribe( (img : Image) => {
      this.currentMotors.images.push(img);
      });
      }
      

      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.motorsService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentMotors.images.indexOf(img, 0);
        if (index > -1) {
        this.currentMotors.images.splice(index, 1);
        }
        })


      

}}
