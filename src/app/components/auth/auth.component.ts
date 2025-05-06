// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    username: string = '';
    password: string = '';
    role: string = 'User';
    errorMessage: string = '';

    registerUser: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Redirect if already logged in
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }

        const urlSegments = this.route.snapshot.url;
        if (urlSegments.length > 0) {
            if(urlSegments[urlSegments.length - 1].path === 'register')
                this.registerUser = true
            else if(urlSegments[urlSegments.length - 1].path === 'login')
                this.registerUser = false
            else
                this.router.navigate(['/login']);
        }
    }

    onSubmit(): void {
        if (!this.username || !this.password) {
            this.errorMessage = 'Please enter both username and password';
            return;
        }
        if (!this.registerUser) {
            const loginSuccess = this.authService.login(this.username, this.password);

            if (loginSuccess) {
                this.router.navigate(['/home']);
            } else {
                this.errorMessage = 'Invalid username or password';
            }
        }
        else {
            const registerSuccess = this.authService.register(this.username, this.password, this.role);

            if (registerSuccess) {
                this.router.navigate(['/home']);
            } else {
                this.errorMessage = 'Registration failed';
            }
        }
    }
}
