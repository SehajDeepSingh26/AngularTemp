import { Injectable } from '@angular/core';
import { Customer } from '../models/component.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private storageKey = 'customers';

  constructor() {
    // Initialize with some sample customers if none exist
    if (!localStorage.getItem(this.storageKey)) {
      const sampleCustomers: Customer[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          address: '123 Main St, Anytown, USA',
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '555-5678',
          address: '456 Oak Ave, Somewhere, USA',
          createdAt: new Date()
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(sampleCustomers));
    }
  }

  getAllCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getCustomerById(id: string): Customer | undefined {
    const customers = this.getAllCustomers();
    return customers.find(customer => customer.id === id);
  }

  addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Customer {
    const customers = this.getAllCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    customers.push(newCustomer);
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
    return newCustomer;
  }

  updateCustomer(id: string, customerData: Partial<Customer>): Customer | null {
    const customers = this.getAllCustomers();
    const index = customers.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    const updatedCustomer = { ...customers[index], ...customerData };
    customers[index] = updatedCustomer;
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
    return updatedCustomer;
  }

  deleteCustomer(id: string): boolean {
    const customers = this.getAllCustomers();
    const filteredCustomers = customers.filter(c => c.id !== id);
    
    if (filteredCustomers.length === customers.length) {
      return false; // No customer was deleted
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredCustomers));
    return true;
  }
}