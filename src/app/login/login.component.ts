import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user =new User();
  erreur!: number;
  listeUsers: User[] = [];

  constructor(private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.listeUser().subscribe((users:any)=>{
      console.log(users);
      this.listeUsers=users;
      });
    }


  err:number = 0;
  onLoggedin()
  {
    if(this.listeUsers.some((e) => e.username == this.user.username)){
      Swal.fire({
        icon: 'success',
        title: 'Hi Motor User!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
   /*  else{
      this.err = 1;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not found!',
      });
      return;
    } */
    console.log(this.user.enabled);

  this.authService.login(this.user).subscribe({
  next: (data) => {
  let jwToken = data.headers.get('Authorization')!;

  this.authService.saveToken(jwToken);
  this.router.navigate(['/']);
  },
  error: (err: any) => {

    Swal.fire({
      title: 'vous devez confirmer votre compte par email',
      input: 'text',
      inputPlaceholder: '-----', // Placeholder for the input field
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (inputValue === '') {
          Swal.showValidationMessage('Please enter a value');
        }
        return inputValue;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const inputValue = result.value; // Get the input value
        console.log(this.user.username)
        this.authService.activateUser(this.user.username!, inputValue).subscribe({
          next: (data) => {
            this.err = 1;
            console.log(data);
            Swal.fire({
              icon: 'success',
              title: 'Account activated!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      }
    });
  },
});
console.log(this.user.enabled);
}
}
