import { Component, OnInit, TemplateRef} from '@angular/core';
import { SupplierService } from '../supplier.service'
import { Supplier } from '../supplier';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { SupplierPipe } from '../supplier.pipe'

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  allSuppliers: Supplier[];
  p: number = 1;
  modalRef: BsModalRef;

  name: string;
  city: string;
  reference: string;

  selectedSupplier: Supplier;
  filter: string;
  rowsPerPage: number = 6;

  constructor(private supplierService: SupplierService, private modalService: BsModalService) {}

  ngOnInit() {
  	if (this.supplierService.allSuppliersRefreshed()) {
  	  this.allSuppliers = this.supplierService.getSuppliers();
  	}
  	else 
  	{
   		this.supplierService.refreshAllSuppliers.subscribe(dummy_var => this.allSuppliers = this.supplierService.getSuppliers());
   	}
  }

  deleteSupplier() {
  	 this.supplierService.deleteSupplier(this.selectedSupplier);
  }

  setSelectedSupplier(supplier: Supplier) {
  	this.selectedSupplier = supplier;
  	this.name = this.selectedSupplier.name;
  	this.city = this.selectedSupplier.city;
   	this.reference = this.selectedSupplier.reference;
  }

  clearSelectedSupplier() {
  	this.selectedSupplier = undefined;
  	this.name = '';
  	this.city = '';
  	this.reference = '';
  }

  addSupplier() {
  	let new_supplier = new Supplier(0, this.name, this.city, this.reference);
  	this.supplierService.addSupplier(new_supplier);
  	this.name = '';
  	this.city = '';
  	this.reference = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateSupplier() {
  	this.selectedSupplier.name = this.name;
  	this.selectedSupplier.city = this.city;
  	this.selectedSupplier.reference = this.reference;
  	this.supplierService.updateSupplier(this.selectedSupplier);
  }
}