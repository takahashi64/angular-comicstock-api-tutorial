import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { Issue } from '../issue';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {

  currentIssue: Issue = undefined;
  open: boolean = false;

  constructor(private issueService: IssueService, private _sanitizer: DomSanitizer) { 
	this.issueService.currentIssueSelected.subscribe(id => this.currentIssue = this.issueService.getIssue(id));
  }

  getBackgroundStyle() {
    return this._sanitizer.bypassSecurityTrustStyle("linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + this.currentIssue.thumbnail.pathIncludingExtension + "')");
  }

  toggleNav() {
  	this.open = !this.open;
  	this.issueService.setSidePanelOpen(this.open);
  }
}