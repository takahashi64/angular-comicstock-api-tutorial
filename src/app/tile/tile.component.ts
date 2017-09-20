import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  issue: Issue;

  constructor(private _sanitizer: DomSanitizer, private issueService: IssueService) { }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  getIssue(): Issue {
	  return this.issueService.getIssue();
  }

  ngOnInit() {
    this.issue = this.getIssue();
  }
}
