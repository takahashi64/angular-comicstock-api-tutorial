import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
	this.http.get('http://frontendshowcase.azurewebsites.net/api/Suppliers').subscribe(data => {
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

  addSupplier(supplier: Supplier) {
  	this.allSuppliers[supplier.id] = supplier;
  	this.refreshAllSuppliersSource.next("GO")
  }

  deleteSupplier(supplier: Supplier) {
  	delete this.allSuppliers[supplier.id];
  	this.refreshAllSuppliersSource.next("GO")
  }
}
