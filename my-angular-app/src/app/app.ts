import {
  Component, ViewChild, ElementRef, AfterViewInit,
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

export class App implements OnInit, AfterViewInit {

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
  // loginCaptcha: string = '';
  // registerCaptcha: string = '';

  // loginCaptchaInput: string = '';
  // registerCaptchaInput: string = '';

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

  /* ================= CAPTCHA CANVAS ================= */

  @ViewChild('loginCaptchaCanvas') loginCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('registerCaptchaCanvas') registerCanvas!: ElementRef<HTMLCanvasElement>;

  loginCaptcha: string = '';
  registerCaptcha: string = '';

  loginCaptchaInput: string = '';
  registerCaptchaInput: string = '';

  ngAfterViewInit() {

    // VERY IMPORTANT: stop SSR from running canvas
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      if (this.loginCanvas) {
        this.generateLoginCaptcha();
      }

      if (this.registerCanvas) {
        this.generateRegisterCaptcha();
      }
    }, 200);

  }


  /* ===== RANDOM TEXT ===== */
  private randomText(length: number): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /* ===== DRAW CAPTCHA ===== */
  private drawCaptcha(canvas: HTMLCanvasElement, text: string) {

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = '#eef2ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.7)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // characters
    ctx.font = 'bold 26px Arial';

    for (let i = 0; i < text.length; i++) {

      const x = 15 + i * 25;
      const y = 30 + Math.random() * 8;
      const angle = (Math.random() - 0.5) * 0.7;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${Math.random() * 120},${Math.random() * 120},${Math.random() * 120})`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // dots
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random()})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
  }

  /* ===== LOGIN CAPTCHA ===== */
  generateLoginCaptcha() {
    this.loginCaptcha = this.randomText(5);
    setTimeout(() => {
      this.drawCaptcha(this.loginCanvas.nativeElement, this.loginCaptcha);
    });
  }

  refreshLoginCaptcha() {
    this.generateLoginCaptcha();
  }

  /* ===== REGISTER CAPTCHA ===== */
  generateRegisterCaptcha() {
    this.registerCaptcha = this.randomText(5);
    setTimeout(() => {
      this.drawCaptcha(this.registerCanvas.nativeElement, this.registerCaptcha);
    });
  }

  refreshRegisterCaptcha() {
    this.generateRegisterCaptcha();
  }

  // refreshLoginCaptcha() {
  //   this.loginCaptcha = this.generateCaptcha();
  //   this.loginCaptchaInput = '';
  // }

  // refreshRegisterCaptcha() {
  //   this.registerCaptcha = this.generateCaptcha();
  //   this.registerCaptchaInput = '';
  // }

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
