// src/app/components/customer/customer-form/customer-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
    customerId: string | null = null;
    isEditMode: boolean = false;
    pageTitle: string = 'Add New Customer';

    customer: any = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    errors: any = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {
        this.customerId = this.route.snapshot.paramMap.get('id');

        if (this.customerId) {
            this.isEditMode = true;
            this.pageTitle = 'Edit Customer';
            this.loadCustomer(this.customerId);
        }
    }

    loadCustomer(id: string): void {
        const customer = this.customerService.getCustomerById(id);

        if (customer) {
            // Clone the customer to avoid direct reference
            this.customer = { ...customer };
        } else {
            // Handle case when customer is not found
            this.router.navigate(['/customers']);
        }
    }

    validateForm(): boolean {
        let isValid = true;
        this.errors = {
            name: '',
            email: '',
            phone: '',
            address: ''
        };

        // Name validation
        if (!this.customer.name.trim()) {
            this.errors.name = 'Name is required';
            isValid = false;
        }

        // Email validation
        if (!this.customer.email.trim()) {
            this.errors.email = 'Email is required';
            isValid = false;
        } else if (!this.isValidEmail(this.customer.email)) {
            this.errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation
        if (!this.customer.phone.trim()) {
            this.errors.phone = 'Phone number is required';
            isValid = false;
        }

        // Address validation
        if (!this.customer.address.trim()) {
            this.errors.address = 'Address is required';
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    onSubmit(): void {
        if (!this.validateForm()) {
            return;
        }

        if (this.isEditMode && this.customerId) {
            // Update existing customer
            this.customerService.updateCustomer(this.customerId, this.customer);
        } else {
            // Add new customer
            this.customerService.addCustomer(this.customer);
        }

        this.router.navigate(['/customers']);
    }
}
