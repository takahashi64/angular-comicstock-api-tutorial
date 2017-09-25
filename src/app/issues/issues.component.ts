import { Component } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {

  sidePanelOpen: boolean = false;

  constructor(private issueService: IssueService) { 
	this.issueService.sidePanelOpen.subscribe(open => this.sidePanelOpen = open);
  }

}
