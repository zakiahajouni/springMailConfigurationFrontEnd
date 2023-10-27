import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../model/role.model';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { MotorsService } from '../service/motors.service';

@Component({
  selector: 'app-addroletousr',
  templateUrl: './addroletousr.component.html',
  styleUrls: ['./addroletousr.component.css']
})
export class AddroletousrComponent {
  constructor(private motorService: MotorsService,private   activatedRoute: ActivatedRoute , private authserv: AuthService ) { }

  User!:User
  Users!:User[]
  roles!:any
  Role!:Role
  idOfRole!:Role
  NewRole!:Role

  RoleToRemove:Role = new Role();

  ngOnInit(): void {
    this.motorService.listeUser().subscribe(
      data => {
        this.Users = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    this.authserv.consulterUser(this.activatedRoute.snapshot.params['id']).subscribe((user) => {
      console.log(user);
      this.User = user;


  });
  this.motorService.getAllRoles().subscribe(
    data => {
      this.roles = data;
      console.log(data);
    },
    err => {
      console.log(err);
    }
  );
  }
  addRoleToUser(){
    console.log(this.idOfRole);
    console.log(this.activatedRoute.snapshot.params['id'])


      this.authserv.AddRoleForUser(this.activatedRoute.snapshot.params['id'],this.idOfRole).subscribe((user) => {
        console.log(user);
        this.User = user;

      });







    }
   removeRoleFromUsers(id:number){
      console.log("id of the role"+id)



      this.motorService.findRoleById(id).subscribe((role) => {


        this.Role = role;
        console.log("the role"+role.role_id);




      console.log(this.activatedRoute.snapshot.params['id'])


         this.authserv.removeRoleFromUser(this.activatedRoute.snapshot.params['id'],this.Role).subscribe((user) => {
           console.log(user);
           this.User = user;

         });

      }


      );

  } }
