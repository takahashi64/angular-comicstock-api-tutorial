import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service'
import { Supplier } from '../supplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  allSuppliers: Supplier[];
  p: number = 1;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
  	if (this.supplierService.allSuppliersRefreshed()) {
  	  this.allSuppliers = this.supplierService.getSuppliers();
  	}
    else
    {
      this.supplierService.refreshAllSuppliers.subscribe(dummy_var => this.allSuppliers = this.supplierService.getSuppliers());
    }
  
  }

}
