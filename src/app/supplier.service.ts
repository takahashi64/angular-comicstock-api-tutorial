import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from './supplier';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SupplierService {

  private allSuppliers: {};
  private _allSuppliersRefreshed = false;

  refreshAllSuppliersSource:  Subject<string>;
  refreshAllSuppliers: Observable<string>;

  constructor(private http: HttpClient) {

    this.refreshAllSuppliersSource = new Subject<string>();
  	this.refreshAllSuppliers = this.refreshAllSuppliersSource.asObservable();

    	// Make the HTTP request:
  	this.http.get('https://frontendshowcase.azurewebsites.net/api/Suppliers').subscribe(data => {
    		// Read the result field from the JSON response.
    		let suppliers =  <Supplier[]>data;

    		this.allSuppliers = suppliers.reduce(function(accumulator, currentValue) {
  		    accumulator[currentValue.id] = currentValue;
  		    return accumulator;
  		}, {});

  		//this.refreshAllIssuesSource.next("GO");
  		this._allSuppliersRefreshed = true;
  		this.refreshAllSuppliersSource.next("GO");
  	});
  }

  getSuppliers(): Supplier[] {
	  return <Supplier[]>Object.values(this.allSuppliers);	
  }

  allSuppliersRefreshed(): boolean {
    return this._allSuppliersRefreshed;
  }

  updateSupplier(supplier: Supplier) {
  	let headers = new HttpHeaders();
    	headers.set('Content-Type', 'application/json');	
    	// Make the HTTP request:

  	this.http.delete(`https://frontendshowcase.azurewebsites.net/api/Suppliers/${supplier.id}`).subscribe(data => {
  		this.http.put('https://frontendshowcase.azurewebsites.net/api/Suppliers', supplier, {headers: headers}).subscribe(data => {
  			this.allSuppliers[supplier.id] = supplier;
  			this.refreshAllSuppliersSource.next("GO");
  		});
  	});
  }

  addSupplier(supplier: Supplier) {
  	let headers = new HttpHeaders();
  	headers.set('Content-Type', 'application/json');	
  	// Make the HTTP request:

	this.http.put('https://frontendshowcase.azurewebsites.net/api/Suppliers', supplier, {headers: headers}).subscribe(data => {
		this.allSuppliers[supplier.id] = supplier;
		this.refreshAllSuppliersSource.next("GO");
	});
  }

  deleteSupplier(supplier: Supplier) {
  	// Make the HTTP request:
	this.http.delete(`https://frontendshowcase.azurewebsites.net/api/Suppliers/${supplier.id}`).subscribe(data => {
  		// Read the result field from the JSON response.
  		delete this.allSuppliers[supplier.id];
		this.refreshAllSuppliersSource.next("GO");
	});
  }
}
