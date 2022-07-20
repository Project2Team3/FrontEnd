import { LoginService } from './../../services/loginService/login.service';
import { AppComponent } from './../../app.component';
import { UserService } from 'src/app/services/userService/users.service';
import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
<<<<<<< Updated upstream

  constructor(private userService:UserService, private appComponent:AppComponent){


  }
  //user:User[] = new User[];

 user:User =new User(0,'','','',0,'');
 userString:string | null = sessionStorage.getItem("user");


  ngOnInit() :void{
    if (!sessionStorage.getItem("user")) {
=======
  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private router:Router,
    private loginService: LoginService
  ) {}

  user: User = new User(0, '', '', '', 0, '');
  userString: string | null = sessionStorage.getItem('user');
  active:string = "title";
  notif:string = 'Error';

  ngOnInit(): void {
    if (!sessionStorage.getItem('user')) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        console.log(this.user);
      }
    })
=======
      },
    });
  }

  onChangePasswordListItemClick() {
    this.active = this.active === "form" ? "title" : "form";
  }

  changePassword(event:any):void{


    event.stopPropagation();


    if(this.user.password.trim().length==0){


      this.notif = 'INVALID';
      setTimeout(() => (this.notif = 'Changed'), 3000);
      return;

  }

    this.userService.updateUser(this.user).subscribe({


      next: () => {




      }
    })
    this.router.navigate(['/home']);



  }
>>>>>>> Stashed changes

    // this.user= sessionStorage.getItem('user');

   // this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
