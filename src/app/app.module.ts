import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TileRowComponent } from './tile-row/tile-row.component';
import { TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Issue } from './issue';
import { IssueService } from './issue.service';
import { SupplierService } from './supplier.service';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { SupplierPipe } from './supplier.pipe';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll'

const appRoutes: Routes = [
  { path: 'issues', component: IssuesComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: '', redirectTo: '/issues', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    Ng2SimplePageScrollModule.forRoot()
  ],
  declarations: [
    AppComponent,
    TileComponent,
    TileRowComponent,
    IssuesComponent,
    SuppliersComponent,
    IssueDetailComponent,
    SupplierPipe
  ],
  providers: [IssueService, SupplierService, BsModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
