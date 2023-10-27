import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role.model';

import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { MotorsService } from '../service/motors.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './listeusers.component.html',

  styleUrls: ['./listeusers.component.css']
})
export class ListeusersComponent implements OnInit{

  users? : User[];
  roles?: Role[];
  constructor(public authService: AuthService, private motorService: MotorsService) {}

  ngOnInit(): void {
    this.chargerUser();
    console.log(this.users);

  }

  chargerUser(){
    this.authService.listeUser().subscribe(prods => {
      this.users = prods;
  });}

    deleteUser(id: number) {
      const confirmed = confirm("Are you sure you want to delete this user?");

      if (confirmed) {
        this.authService.deleteUser(id).subscribe(
          data => {
            console.log(data);
            //window.location.reload();
            this.chargerUser();
          },
          err => {
            console.log(err);
          }
        );
      }
    }







}
