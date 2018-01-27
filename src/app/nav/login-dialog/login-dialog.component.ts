import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  form: FormGroup;
  formPlaceholders = {
    email: 'Електронна пошта',
    password: 'Пароль'
  };
  buttonPlaceholders = {
    logIn: 'Увійти',
    signUp: 'Реєстрація'
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  login(data) {
    this.loginService.login(data).subscribe(response => {
      this.loginService.getUser().subscribe(userResp => {
        this.dialogRef.close();
      });
    });
  }

  ngOnInit() {
  }

}
