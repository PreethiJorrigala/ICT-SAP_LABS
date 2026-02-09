import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  username: string = '';
  password: string = '';
  userCaptcha: string = '';

  generatedCaptcha: string = '';
  message: string = '';
  messageColor: string = 'black';

  // create captcha when page loads
  ngOnInit() {
    this.generateCaptcha();
  }

  // Generate random captcha
  generateCaptcha() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";


    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      captcha += chars[randomIndex];
    }

    this.generatedCaptcha = captcha;


  }

  // Login button
  login() {


    if (this.userCaptcha === this.generatedCaptcha) {
      this.message = "Login Successful ✅";
      this.messageColor = "green";
    } else {
      this.message = "Wrong Captcha ❌";
      this.messageColor = "red";
      this.generateCaptcha();
      this.userCaptcha = '';
    }


  }
}
