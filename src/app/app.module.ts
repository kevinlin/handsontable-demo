import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HotTableModule } from 'ng2-handsontable';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { OrderService } from './service/order.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarryOrdersComponent } from './carry-orders/carry-orders.component';
import { OrderComponent } from './order/order.component';
import { ResultComponent } from './result/result.component';
import { RunSummaryComponent } from './run-summary/run-summary.component';
import { RunActionsComponent } from './run-actions/run-actions.component';
import { VerticalOrdersComponent } from './vertical-orders/vertical-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ResultComponent,
    RunSummaryComponent,
    RunActionsComponent,
    CarryOrdersComponent,
    VerticalOrdersComponent
  ],
  imports: [
    BrowserModule,
    HotTableModule,
    AppRoutingModule,
    TabsModule.forRoot()
  ],
  providers: [
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
