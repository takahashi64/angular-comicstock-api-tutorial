import { Component, OnInit } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-tile-row',
  templateUrl: './tile-row.component.html',
  styleUrls: ['./tile-row.component.css']
})
export class TileRowComponent implements OnInit { 

  issueIds: string[];

  constructor(private issueService: IssueService) { }

  issueIdsExist() {
  	return this.issueIds != undefined && Object.keys(this.issueIds).length > 0;
  }

  ngOnInit() {
  	if (this.issueService.allIssuesRefreshed()) {
  		this.issueIds = this.issueService.getIssueIds();
  	}
  	else
  	{
  		this.issueService.refreshAllIssues.subscribe(dummy_var => this.issueIds = this.issueService.getIssueIds());
  	}
  }
}
