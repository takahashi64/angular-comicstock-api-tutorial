import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IssueService {
	private allIssues;
	private currentIssueDetailSource:  Subject<number>;
	currentIssueSelected: Observable<number>;

	refreshAllIssuesSource:  Subject<string>;
	refreshAllIssues: Observable<string>;

	sidePanelOpenSource:  Subject<boolean>;
	sidePanelOpen: Observable<boolean>;

	_allIssuesRefreshed: boolean = false;

	constructor(private http: HttpClient) {
		this.currentIssueDetailSource = new Subject<number>();
		this.currentIssueSelected = this.currentIssueDetailSource.asObservable();

		this.refreshAllIssuesSource = new Subject<string>();
		this.refreshAllIssues = this.refreshAllIssuesSource.asObservable();

		this.sidePanelOpenSource = new Subject<boolean>();
		this.sidePanelOpen = this.sidePanelOpenSource.asObservable();

		// Make the HTTP request:
    	this.http.get('https://frontendshowcase.azurewebsites.net/api/Issues').subscribe(data => {
      		// Read the result field from the JSON response.
      		let issues: Issue[] = <Issue[]>data;

      		this.allIssues = issues.reduce(function(accumulator, currentValue) {
			    accumulator[currentValue.id] = currentValue;
			    return accumulator;
			}, {});

			this.refreshAllIssuesSource.next("GO");
			this._allIssuesRefreshed = true;
    	});
	}

	allIssuesRefreshed(): boolean {
		return this._allIssuesRefreshed;
	}

	setSidePanelOpen(open: boolean) {
		this.sidePanelOpenSource.next(open);
	}

	setCurrentIssueDetail(id: number) {
		this.currentIssueDetailSource.next(id);
	}

	getIssueIds(): string[] {
		return Object.keys(this.allIssues);
	}

	getIssue(id: number): Issue {
	  	
	  	if (this.allIssues) {
	  		return this.allIssues[id];
	  	}
	  	else
	  	{
	  		return undefined
	  	}

	}
}