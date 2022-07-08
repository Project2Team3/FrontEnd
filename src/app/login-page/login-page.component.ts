import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user = {
    username: "",
    password: "",
  };

  changeToRegister() {
    let loginForm = document.getElementsByClassName("loginFormContainer")[0];
    loginForm.classList.add("inactive");

    let registerForm = document.getElementsByClassName(
      "registerFormContainer"
    )[0];
    registerForm.classList.remove("inactive");
  };

  changeToLogin(){
    let registerForm = document.getElementsByClassName(
      "registerFormContainer"
    )[0];
    registerForm.classList.add("inactive");

    let loginForm = document.getElementsByClassName("loginFormContainer")[0];
    loginForm.classList.remove("inactive");
  };

  async formSubmit(e: any) {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    this.user.username = username;
    this.user.password = password;

    let content = await this.fetchUser();

    console.log(content)
    if (content.username === this.user.username) {
      console.log("Welcome " + content.username);
      console.log(window.location)
      window.location.replace(window.location.origin + "/homePage");
    } else {
      console.log("Illegal")
    }
  };

  async fetchUser() {
    let returnObject;

    const rawResponse = await fetch("http://54.226.62.51:8080/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.user.username, password: this.user.password})
    });

    returnObject = await rawResponse.json();

    return returnObject;
  }

}
