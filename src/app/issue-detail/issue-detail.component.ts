import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {

  currentIssue: Issue = undefined;

  constructor(private issueService: IssueService) { 
	this.issueService.currentIssueSelected.subscribe(id => this.currentIssue = this.issueService.getIssue(id));
  }
  
}
