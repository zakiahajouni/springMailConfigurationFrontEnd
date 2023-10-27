import { Component, OnInit } from '@angular/core';
import { MotorsService } from '../service/motors.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../model/role.model';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: any = {};
  roles: any[] = [];
  idRole!: Role;

  constructor(private motorService: MotorsService , private activatedRoute: ActivatedRoute , private authServ:AuthService) {}

  ngOnInit(): void {
    this.motorService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
      console.log('Roles data:', this.roles); // Add this line for debugging
    });
  }


  onSubmit() {
    // Send a request to your backend to add the user
    this.motorService.addUser(this.user).subscribe((data: any) => {
      // Handle the response from the backend, e.g., show a success message
      console.log('User added:', data);
    });
  }




  addUser() {
    this.motorService.addUser(this.user).subscribe(
      (user: any) => {
        console.log('User added:', user);

        // Assuming the response includes the user's ID, you can use it to add the role
        const userId = user.user_id;
        this.addRoleToUser(userId);
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }



  addRoleToUser(userId: number) {
    this.authServ.AddRoleForUser(userId, this.user.roleId).subscribe(
      (user) => {
        console.log('Role added to the user:', user);
        // You can perform any additional actions or navigate to another page if needed.
      },
      (error) => {
        console.error('Error adding role to the user:', error);
      }
    );
  }














}
