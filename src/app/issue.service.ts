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
	currentIssueSelectedId: number;
	refreshAllIssuesSource:  Subject<string>;
	refreshAllIssues: Observable<string>;

	sidePanelOpenSource:  Subject<{}>;
	sidePanelOpen: Observable<{}>;

	_allIssuesRefreshed: boolean = false;
	sidePanelOpenByRow = {}

	constructor(private http: HttpClient) {
		this.currentIssueDetailSource = new Subject<number>();
		this.currentIssueSelected = this.currentIssueDetailSource.asObservable();

		this.refreshAllIssuesSource = new Subject<string>();
		this.refreshAllIssues = this.refreshAllIssuesSource.asObservable();

		this.sidePanelOpenSource = new Subject<{}>();
		this.sidePanelOpen = this.sidePanelOpenSource.asObservable();

		this.fetchMoreIssues();
		this.fetchMoreIssues();
	}

	fetchMoreIssues() {
			// Make the HTTP request:
    	this.http.get('https://frontendshowcase.azurewebsites.net/api/Issues').subscribe(data => {
      		// Read the result field from the JSON response.
      		let issues = (<Issue[]>data).reduce(function(accumulator, currentValue) {
			    accumulator[currentValue.id] = currentValue;
			    return accumulator;
			}, {});

      		this.allIssues = Object.assign({}, issues, this.allIssues);

			this.refreshAllIssuesSource.next("GO");
			this._allIssuesRefreshed = true;
    	});
	}

	allIssuesRefreshed(): boolean {
		return this._allIssuesRefreshed;
	}

	getSidePanelOpen(rowNumber: number) {
		return this.sidePanelOpenByRow[rowNumber];
	}

	setSidePanelOpen(open: boolean, rowNumber: number) {
		this.sidePanelOpenByRow = {};
		this.sidePanelOpenByRow[rowNumber] = open;
		this.sidePanelOpenSource.next({'open': open, 'rowNumber': rowNumber});
	}

	getCurrentIssueDetail() {
		return this.getIssue(this.currentIssueSelectedId);
	}

	setCurrentIssueDetail(id: number) {
		this.currentIssueSelectedId = id;
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