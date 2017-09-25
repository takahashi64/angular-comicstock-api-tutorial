import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TileRowComponent } from './tile-row/tile-row.component';
import { TooltipModule } from 'ngx-bootstrap';
import { Issue } from './issue';
import { IssueService } from './issue.service';
import { SupplierService } from './supplier.service';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 

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
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    TileComponent,
    TileRowComponent,
    IssuesComponent,
    SuppliersComponent,
    IssueDetailComponent
  ],
  providers: [IssueService, SupplierService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
