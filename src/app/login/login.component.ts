import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../application/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit() {
        this.buildForm();
    }


    public buildForm() {
        this.loginForm = this.formBuilder.group({
            email: null,
            password: null
        });
    }

    public sendLogin() {
      this.authenticationService.login(this.loginForm.value).subscribe( result => {
        console.log(result);
      });
    }
}
