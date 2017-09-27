import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SupplierPipe'
})
export class SupplierPipe implements PipeTransform {

	transform(value: any, input: string) {
	        if (input) {

	            return value.filter(function (el: any) {
	                return (el.name.toLowerCase() + el.city.toLowerCase() + el.reference.toLowerCase() ).indexOf(input.toLowerCase()) > -1;
	            })
	        }
	        return value;
	    }
}