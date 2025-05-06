// src/app/components/customer/customer-list/customer-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Customer } from 'src/app/models/component.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  showDeleteModal: boolean = false;
  customerToDelete: Customer | null = null;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getAllCustomers();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  confirmDelete(customer: Customer): void {
    this.customerToDelete = customer;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.customerToDelete = null;
  }

  deleteCustomer(): void {
    if (this.customerToDelete) {
      this.customerService.deleteCustomer(this.customerToDelete.id);
      this.loadCustomers();
      this.showDeleteModal = false;
      this.customerToDelete = null;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
