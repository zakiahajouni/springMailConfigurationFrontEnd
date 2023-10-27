import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotorsComponent } from './motors/motors.component';
import { AddMotorsComponent } from './add-motors/add-motors.component';
import { UpdateMotorsComponent } from './update-motors/update-motors.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MotorGuard } from './motor.guard';
import { RechercheParTypesComponent } from './recherche-par-types/recherche-par-types.component';
import { RechercheParNameComponent } from './recherche-par-name/recherche-par-name.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddroletousrComponent } from './addroletousr/addroletousr.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ {path: "motors", component : MotorsComponent},
{path: "add-motors", component : AddMotorsComponent,canActivate:[MotorGuard]},
{path: "updateMotors/:id", component: UpdateMotorsComponent,canActivate:[MotorGuard]},
{path: 'login', component: LoginComponent , pathMatch: 'full'},
{path : "add-motors", component : AddMotorsComponent, canActivate:[MotorGuard]},
{path: 'app-forbidden', component: ForbiddenComponent},
{path: "rechercheParType", component : RechercheParTypesComponent},
{path: "rechercheparname" , component:RechercheParNameComponent},
{path: "listeTypes", component : ListeTypesComponent ,canActivate:[MotorGuard]},
{path: "listeusers", component : ListeusersComponent},
{path:"addUser",component:AddUserComponent},
{path:"addroletousr/:id",component:AddroletousrComponent},
{path:"register",component:RegisterComponent},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
