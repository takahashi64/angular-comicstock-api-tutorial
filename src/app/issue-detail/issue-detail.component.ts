import { Component, OnInit, TemplateRef, Input} from '@angular/core';
import { IssueService } from '../issue.service';
import { Issue } from '../issue';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { SimplePageScrollService } from 'ng2-simple-page-scroll'

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {

  @Input() rowNumber: number;
  currentIssue: Issue = undefined;
  open: boolean = false;
  modalRef: BsModalRef;
  quantity_very_fine: number = 0;
  quantity_fine: number = 0;
  quantity_good: number = 0;
  quantity_poor: number = 0;

  constructor(private issueService: IssueService, private _sanitizer: DomSanitizer,  private modalService: BsModalService, private simplePageScrollService: SimplePageScrollService) { 
	  this.issueService.sidePanelOpen.subscribe(data => {
      this.open = (data['open'] && data['rowNumber'] == this.rowNumber);
      if (this.open) {
        this.simplePageScrollService.scrollToElement("#issue_detail_" + this.rowNumber , 0);
      }
    });

    this.issueService.currentIssueSelected.subscribe(id => {this.currentIssue = this.issueService.getIssue(id)});
    
    if (this.currentIssue == undefined) {
      this.currentIssue = this.issueService.getCurrentIssueDetail();
    }
  }

  getBackgroundStyle() {
    return this._sanitizer.bypassSecurityTrustStyle("linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + this.currentIssue.thumbnail.pathIncludingExtension + "')");
  }

  isOpen() {
    return this.issueService.getSidePanelOpen(this.rowNumber);
  }

  toggleNav() {
  	this.open = false;
  	this.issueService.setSidePanelOpen(this.open, this.rowNumber);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}