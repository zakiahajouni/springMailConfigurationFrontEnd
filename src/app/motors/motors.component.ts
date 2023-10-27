import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Motors } from "../model/motors.model";
import { AuthService } from "../service/auth.service";
import { MotorsService } from "../service/motors.service";
import { Image } from "../model/image.model";

@Component({
  selector: "app-motors",
  templateUrl: "./motors.component.html",
  styleUrls: ["./motors.component.css"],
})
export class MotorsComponent implements OnInit {
  motors!: Motors[];
  apiurl:string='http://localhost:8090/motors/api';
  constructor(private motorsService: MotorsService,private router: Router,public authService: AuthService) {}

  ngOnInit(): void {
    this.motorsService.listeMotors().subscribe((moto) => {
      console.log(moto);
      this.motors = moto;
    });
  }
 
  /*   chargerMotors(){
      this.motorsService.listeMotors().subscribe(prods => {
      this.motors = prods;
      this.motors.forEach((prod) => {
      prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +
      prod.images[0].image;
      });
      });
      } */




      chargerMotors(){
        this.motorsService.listeMotors().subscribe(prods => {
        this.motors = prods;
        });
        }
        







  supprimerMotors(m: Motors)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.motorsService.supprimerMotors(m.idMotors!).subscribe(()=>{
    console.log("hjzhjehj");
    this.chargerMotors();
  })  

}

}
  


  


