import { Injectable, Input } from "@angular/core";
import { Motors } from "../model/motors.model";
import { Type } from "../model/Type.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { TypeWrapper } from "../model/TypeWrapped.model";
import { Image } from "../model/image.model";
import { User } from "../model/user.model";
import { Role } from "../model/role.model";


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class MotorsService {
  apiURL: string = "http://localhost:8090/motors/api";
  apiURLTyp: string = "http://localhost:8090/motors/api/typ";
  apiURL3:string="http://localhost:8090/motors/api/image/uplaodImageMotor/id";
  apiURL4:string="http://localhost:8081/users"



  motors!: Motors[];
  motor!: Motors;
  types!: Type[];
  motorsrecherch!: Motors[];

  constructor(private http: HttpClient,private authService :AuthService) {}

  listeMotors(): Observable<Motors[]>{
    return this.http.get<Motors[]>(this.apiURL+"/all");

    }




  ajouterMotors( mot: Motors):Observable<Motors>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Motors>(this.apiURL+"/addmotor", mot, {headers:httpHeaders});
    }


  supprimerMotors(id : number) {
    const url = `${this.apiURL}/delmotor/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
    }


  consulterMotors(id: number): Observable<Motors> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Motors>(url,{headers:httpHeaders});

  }

  updateMotors(m: Motors): Observable<Motors> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Motors>(this.apiURL+"/updatemotor", m, {headers:httpHeaders});  }

  trierMotors() {
    this.motors = this.motors.sort((n1, n2) => {
      if (n1.idMotors! > n2.idMotors!) {
        return 1;
      }
      if (n1.idMotors! < n2.idMotors!) {
        return -1;
      }
      return 0;
    });
  }

  listeTypes():Observable<TypeWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<TypeWrapper>(this.apiURLTyp,{headers:httpHeaders}
    );
    }

  consulterType(idTyp: number): Type {
    return this.types.find((typ) => typ.idTyp == idTyp)!;
  }

  // rechercherParType(idTyp: number): Motors[]{
  //   this.motorsrecherch = [];

  //   this.motors.forEach((cur, index) => {
  //    if(idTyp == cur.types.idTyp) {
  //        console.log("cur "+cur);
  //       this.motorsrecherch.push(cur);
  //        }
  //  });
  //  return this.motorsrecherch;
  //  }

  rechercherParType (idTyp: number): Observable<Motors[]> {
    const url = `${this.apiURL}/motorstyp/${idTyp}`;
    return this.http.get<Motors[]>(url);;
  }
  rechercherParNom(nom: string):Observable< Motors[]> {
    const url = `${this.apiURL}/motorsByName/${nom}`;
    return this.http.get<Motors[]>(url);
    }

  ajouterType(item: Type):Observable<Type>{
    return this.http.post<Type>(this.apiURLTyp, item, httpOptions);
  }


  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
    }

    uploadImageMot(file: File, filename: string, idMotors: number): Observable<any> {
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/uplaodImageMotor'}/${idMotors}`;
      return this.http.post(url, imageFormData);
    }

      supprimerImage(id : number) {
        const url = `${this.apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);

}

uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
  return this.http.post(url, imageFormData);
  }

  listeUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL4 + "/all");

  }
  addUser(user: any) {
    return this.http.post(`${this.apiURL4}/add`, user);
  }

  getAllRoles() {
    return this.http.get(`${this.apiURL4}/allRoles`);
  }

/*   AddRoleForUser(id: number, idR: Role): Observable<any> {
    const url = `${this.apiURL4}/addRole/${id}`; // Replace with your API endpoint
    const roleData = { idR }; // Send the role ID as the request body

    return this.http.post(url, roleData);
  } */


  findRoleById(id: number): Observable<Role> {
  const url = `${this.apiURL4}/findRoleById/${id}`;
  return this.http.get<Role>(url);}




}
