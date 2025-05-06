import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: User[] = [
        { id: '1', username: 'admin', password: 'admin123', role: 'Admin' },
        { id: '2', username: 'user', password: 'user123', role: 'User' }
    ];

    constructor(private router: Router) {
        // Initialize users in localStorage if not present
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    register(username: string, password: string, role: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = {
            id: Date.now().toString(),
            username,
            password,
            role
        };

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }

    login(username: string, password: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User) => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getCurrentUser(): User | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    isLoggedIn(): boolean {
        return !!this.getCurrentUser();
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user ? user.role === 'Admin' : false;
    }
}