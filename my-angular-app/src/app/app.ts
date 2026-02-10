import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // page switch
  isLogin = true;

  // login fields
  loginEmail = '';
  loginPassword = '';
  loginCaptcha = '';
  loginUserCaptcha = '';

  // register fields
  name = '';
  email = '';
  password = '';
  registerCaptcha = '';
  registerUserCaptcha = '';

  error = '';
  success = '';

  ngOnInit() {
    this.generateLoginCaptcha();
    this.generateRegisterCaptcha();
  }

  switchPage() {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.success = '';
  }

  // captcha generator
  generateLoginCaptcha() {
    this.loginCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  generateRegisterCaptcha() {
    this.registerCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // login
  login() {

    if (this.loginUserCaptcha !== this.loginCaptcha) {
      this.error = "Wrong Login Captcha!";
      this.generateLoginCaptcha();
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const validUser = users.find(
      (u: any) => u.email === this.loginEmail && u.password === this.loginPassword
    );

    if (!validUser) {
      this.error = "Invalid Email or Password!";
      return;
    }

    this.error = '';
    this.success = "Welcome " + validUser.name + " 🎉";
  }


  // register
  register() {

    if (this.registerUserCaptcha !== this.registerCaptcha) {
      this.error = "Wrong Register Captcha!";
      this.generateRegisterCaptcha();
      return;
    }

    // get existing users
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // check if email already exists
    const userExists = users.find((u: any) => u.email === this.email);

    if (userExists) {
      this.error = "Email already registered!";
      return;
    }

    // save new user
    users.push({
      name: this.name,
      email: this.email,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    this.error = '';
    this.success = "Registration Successful! Now Login.";
    this.switchPage();
  }

}
