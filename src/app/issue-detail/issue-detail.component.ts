import { Component, OnInit, TemplateRef } from '@angular/core';
import { IssueService } from '../issue.service';
import { Issue } from '../issue';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {

  currentIssue: Issue = undefined;
  open: boolean = false;
  modalRef: BsModalRef;
  quantity_very_fine: number = 0;
  quantity_fine: number = 0;
  quantity_good: number = 0;
  quantity_poor: number = 0;

  constructor(private issueService: IssueService, private _sanitizer: DomSanitizer,  private modalService: BsModalService) { 
	  this.issueService.currentIssueSelected.subscribe(id => this.currentIssue = this.issueService.getIssue(id));
  }

  getBackgroundStyle() {
    return this._sanitizer.bypassSecurityTrustStyle("linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + this.currentIssue.thumbnail.pathIncludingExtension + "')");
  }

  toggleNav() {
  	this.open = !this.open;
  	this.issueService.setSidePanelOpen(this.open);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}