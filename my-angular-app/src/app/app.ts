import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer
  ) { }


  /* ================= PAGE CONTROL ================= */
  isLogin = true;
  isLoggedIn = false;
  activeSection: string = 'home';

  /* ================= USER SESSION ================= */
  currentUser: any = null;

  /* ================= LOGIN DATA ================= */
  loginData = {
    email: '',
    password: ''
  };

  /* ================= REGISTER DATA ================= */
  registerData = {
    name: '',
    email: '',
    password: ''
  };

  /* ================= CAPTCHA ================= */
  loginCaptcha: string = '';
  registerCaptcha: string = '';

  loginCaptchaInput: string = '';
  registerCaptchaInput: string = '';

  error = '';
  success = '';

  /* ================= AUTO LOGIN ================= */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const sessionUser = localStorage.getItem('sessionUser');
      if (sessionUser) {
        this.currentUser = JSON.parse(sessionUser);
        this.isLoggedIn = true;
      }
    }


    this.refreshLoginCaptcha();
    this.refreshRegisterCaptcha();


  }

  /* ================= CAPTCHA GENERATOR ================= */
  generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  refreshLoginCaptcha() {
    this.loginCaptcha = this.generateCaptcha();
    this.loginCaptchaInput = '';
  }

  refreshRegisterCaptcha() {
    this.registerCaptcha = this.generateCaptcha();
    this.registerCaptchaInput = '';
  }

  /* convert youtube link to safe url */
  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /* ================= SWITCH PAGE ================= */
  switchPage() {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.success = '';
  }

  /* ================= LOGIN ================= */
  login() {


    if (this.loginCaptchaInput.toUpperCase() !== this.loginCaptcha) {
      this.error = "Wrong Captcha!";
      this.refreshLoginCaptcha();
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const validUser = users.find(
      (u: any) =>
        u.email === this.loginData.email &&
        u.password === this.loginData.password
    );

    if (!validUser) {
      this.error = "Invalid Email or Password!";
      return;
    }

    localStorage.setItem('sessionUser', JSON.stringify(validUser));

    this.currentUser = validUser;
    this.isLoggedIn = true;
    this.activeSection = 'home';
    this.error = '';


  }

  /* ================= REGISTER ================= */
  register() {


    if (this.registerCaptchaInput.toUpperCase() !== this.registerCaptcha) {
      this.error = "Wrong Captcha!";
      this.refreshRegisterCaptcha();
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.find((u: any) => u.email === this.registerData.email);

    if (userExists) {
      this.error = "Email already registered!";
      return;
    }

    users.push({
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    this.success = "Registration Successful! Please Login.";
    this.error = '';

    this.switchPage();


  }

  /* ================= NAVIGATION ================= */
  setSection(section: string) {
    this.activeSection = section;
  }

  /* ================= COURSE PLAYER ================= */

  courseMode = false;
  currentLessonIndex = 0;

  /* course content */
  courses: any = {
    web: {
      title: 'Web Development',
      lessons: [
        { title: 'Introduction to Web', video: 'https://www.youtube.com/embed/UB1O30fR-E' },
        { title: 'HTML Basics', video: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
        { title: 'CSS Basics', video: 'https://www.youtube.com/embed/yfoY53QXEnI' },
        { title: 'JavaScript Basics', video: 'https://www.youtube.com/embed/W6NZfCO5SIk' }
      ]
    },
    python: {
      title: 'Python Programming',
      lessons: [
        { title: 'Python Introduction', video: 'https://www.youtube.com/embed/_uQrJ0TkZlc' },
        { title: 'Variables & Data Types', video: 'https://www.youtube.com/embed/kqtD5dpn9C8' },
        { title: 'Loops', video: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ' },
        { title: 'Functions', video: 'https://www.youtube.com/embed/NSbOtYzIQI0' }
      ]
    },
    dsa: {
      title: 'Data Structures',
      lessons: [
        { title: 'Arrays', video: 'https://www.youtube.com/embed/RBSGKlAvoiM' },
        { title: 'Linked List', video: 'https://www.youtube.com/embed/NobHlGUjV3g' },
        { title: 'Stack', video: 'https://www.youtube.com/embed/F1F2imiOJfk' },
        { title: 'Queue', video: 'https://www.youtube.com/embed/okr-XE8yTO8' }
      ]
    }
  };

  selectedCourseKey: string = '';

  /* ================= START COURSE ================= */

  startLearning(courseKey: string) {
    this.selectedCourseKey = courseKey;
    this.courseMode = true;
    this.currentLessonIndex = 0;
  }

  /* next lesson */
  nextLesson() {
    const total = this.courses[this.selectedCourseKey].lessons.length;
    if (this.currentLessonIndex < total - 1) {
      this.currentLessonIndex++;
      this.saveProgress();
    }
  }

  /* previous lesson */
  prevLesson() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
    }
  }

  /* exit course */
  exitCourse() {
    this.courseMode = false;
    this.activeSection = 'courses';
  }

  /* save progress */
  saveProgress() {
    if (!this.currentUser) return;

    const key = `progress_${this.currentUser.email}_${this.selectedCourseKey}`;
    localStorage.setItem(key, this.currentLessonIndex.toString());
  }


  /* ================= LOGOUT ================= */
  logout() {
    localStorage.removeItem('sessionUser');
    this.isLoggedIn = false;
    this.currentUser = null;
    this.loginData = { email: '', password: '' };
    this.activeSection = 'home';
  }
}
