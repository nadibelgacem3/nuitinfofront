import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthfakeauthenticationService} from "../../../core/services/authfake.service";
import {AccountService} from "../../../core/auth/account.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "./register.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              public authFackservice: AuthfakeauthenticationService, public accountService: AccountService,
              public cookiesService: CookieService, private http: HttpClient, private registerService: RegisterService) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  owlcarousel = []
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };
  submitted = false;

  get f() {
    return this.loginForm.controls;
  }

  get fR() {
    return this.registerForm.controls;
  }

  returnUrl: string;
  type = null;

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.minLength(3), Validators.pattern]],
      lastName: ['', [Validators.minLength(3), Validators.pattern]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard/default']);
    }

  }

  onSubmit() {


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {


      this.authFackservice.login({
        username: this.f.email.value.trim(),
        password: this.f.password.value,
        rememberMe: false
      })
        .pipe()
        .subscribe(
          data => {
            this.accountService.identity().subscribe(account => {
              if (account !== null) {
                this.accountService.authenticate(account);
                localStorage.setItem('locale', account.langKey);
                localStorage.setItem('lang', account.langKey);
                this.cookiesService.set('lang', account.langKey);
                this.router.navigate(['/dashboard/default']);
              }

            });

          },
          error => {

          });
    }

  }


  onSave() {
    const user = {
      firstName: this.fR.firstName.value.trim(),
      lastName: this.fR.lastName.value.trim(),
      phone: this.fR.phone.value.trim(),
      email: this.fR.email.value.trim(),
      password: this.fR.password.value,
      type: this.type,
      langKey: 'en',
    };
    this.registerService.save(user).subscribe(
      () => {
        console.log(user);
        this.router.navigate(['/dashboard/default']);
        // this.router.navigate(['/users/list-user']);
      });
  }

  changeType() {
    console.log(this.type);
  }
}
