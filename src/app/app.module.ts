import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotTableModule } from '@handsontable-pro/angular';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarryOrdersComponent } from './component/carry-orders/carry-orders.component';
import { OrderComponent } from './component/order/order.component';
import { ResultComponent } from './component/result/result.component';
import { RunActionsComponent } from './component/run-actions/run-actions.component';
import { RunSummaryComponent } from './component/run-summary/run-summary.component';
import { VerticalOrdersComponent } from './component/vertical-orders/vertical-orders.component';
import { OrderService } from './service/order.service';

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
