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
  itemsPerRow: number = 6;

  constructor(private issueService: IssueService) {}

  issueIdsExist() {
  	return this.issueIds != undefined && this.issueIds.length > 0;
  }

  issueIdsGrid(): string[][] {
    let result = [];
    let numRows = Math.ceil(this.issueIds.length / this.itemsPerRow);

    for (let i = 0; i < numRows; i++) {
      result[i] = this.issueIds.slice(0).splice(i * this.itemsPerRow, this.itemsPerRow);
    }

    return result;
  }

  ngOnInit() {
  	if (this.issueService.allIssuesRefreshed()) {
  		this.issueIds = this.issueService.getIssueIds();
  	}
  	this.issueService.refreshAllIssues.subscribe(dummy_var => this.issueIds = this.issueService.getIssueIds());
  }

  onScroll () {
    this.issueService.fetchMoreIssuesSync();
  }
}
