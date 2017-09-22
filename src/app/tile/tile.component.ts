import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Issue } from '../issue';
import { IssueService } from '../issue.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {

  @Input() issueID: number;
  issue: Issue = undefined;

  constructor(private _sanitizer: DomSanitizer, private issueService: IssueService) { 
     this.issueService.refreshAllIssues.subscribe(dummy_var => this.issue = this.getIssue(this.issueID));
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  issueLoaded() {
    if (this.issueService.allIssuesRefreshed()) {
      this.issue = this.getIssue(this.issueID)
    }
    return this.issue != undefined;
  }

  getIssue(id: number): Issue {
	  return this.issueService.getIssue(id);
  }

  onClick() {
    this.issueService.setCurrentIssueDetail(this.issueID);
  }
}