import { Router } from '@angular/router';
import { AppComponent } from './../../../app.component';
import { UserService } from 'src/app/services/userService/users.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {



  constructor(private userService:UserService,

    private appComponent:AppComponent,
    private router:Router){


  }
  //user:User[] = new User[];

  newpass: string= 'NEWPASS';
 user:User =new User(0,'','','',0,'');
 userString:string | null = sessionStorage.getItem("user");


  ngOnInit() :void{
    if (!sessionStorage.getItem("user")) {
      this.appComponent.signOut();
      return;
    }

    let userJSON = {id:0};
    if (this.userString) {
      userJSON = JSON.parse(this.userString);
    }
    console.log(userJSON);

    this.userService.findUserById(userJSON.id).subscribe({
      next:(data)=>{
        this.user = data;
        console.log(this.user);
      }
    })


    // this.user= sessionStorage.getItem('user');

  }

  changePassword():void{

    console.log(this.user.password);
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        console.log(data);

      }
    })

    this.router.navigate(['/home']);



  }
}
