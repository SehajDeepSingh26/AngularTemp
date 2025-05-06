// src/app/components/home/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  customerCount: number = 0;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.customerCount = this.customerService.getAllCustomers().length;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
