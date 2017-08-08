import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CarryOrder } from '../model/carry-order';
import { OrderService } from '../service/order.service';
import { VerticalOrder } from '../model/vertical-order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  carryOrders: Observable<CarryOrder[]>;
  initialVerticalOrders: VerticalOrder[] = [];

  verticalOrders: Observable<VerticalOrder[]>;
  month1Orders: Observable<VerticalOrder[]>;
  month2Orders: Observable<VerticalOrder[]>;
  month3Orders: Observable<VerticalOrder[]>;
  month4Orders: Observable<VerticalOrder[]>;
  month1Label: Observable<string>;
  month2Label: Observable<string>;
  month3Label: Observable<string>;
  month4Label: Observable<string>;

  constructor(public orderService: OrderService) {
    this.carryOrders = this.orderService.carryOrders;
    this.month1Orders = this.orderService.month1Orders;
    this.month2Orders = this.orderService.month2Orders;
    this.month3Orders = this.orderService.month3Orders;
    this.month4Orders = this.orderService.month4Orders;
    this.month1Label = this.orderService.month1Label;
    this.month2Label = this.orderService.month2Label;
    this.month3Label = this.orderService.month3Label;
    this.month4Label = this.orderService.month4Label;
  }

  ngOnInit() {
    this.carryOrders.subscribe((orders: CarryOrder[]) => {
      console.log('Order.ngOnInit()->carryOrders change detected');
    });
    this.month1Orders.subscribe((orders: VerticalOrder[]) => {
      console.log('Order.ngOnInit()->Month1 vertial orders change detected');
    });
    this.month2Orders.subscribe((orders: VerticalOrder[]) => {
      console.log('Order.ngOnInit()->Month2 vertial orders detected');
    });
    this.month3Orders.subscribe((orders: VerticalOrder[]) => {
      console.log('Order.ngOnInit()->Month3 vertial orders detected');
    });
    this.month4Orders.subscribe((orders: VerticalOrder[]) => {
      console.log('Order.ngOnInit()->Month4 vertial orders detected');
    });

    // The code block below simulate initial loading of orders from backend
    window.setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.orderService.addCarryOrder(this.orderService.createCarryOrder());
      }

      const firstDate = new Date(2017, 5, 13);
      const lastDate = new Date(2017, 8, 13);
      const jun21 = new Date(2017, 5, 21);
      const jul19 = new Date(2017, 6, 19);
      const aug16 = new Date(2017, 7, 16);
      const sep08 = new Date(2017, 8, 8);
      for (let timestamp = firstDate.getTime(); timestamp <= lastDate.getTime(); timestamp += 24 * 3600 * 1000) {
        const curDate: Date = new Date(timestamp);
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          continue;
        }

        const vOrder = this.orderService.createVerticalOrder();
        vOrder.date = curDate;
        vOrder.endOfWeek = (curDate.getDay() === 5);
        if (curDate.getTime() === jun21.getTime() || curDate.getTime() === jul19.getTime() || curDate.getTime() === aug16.getTime()) {
          vOrder.mostLiquidDate = true;
        }
        if (curDate.getTime() === sep08.getTime()) {
          vOrder.threeMonthDate = true;
        }
        this.initialVerticalOrders.push(vOrder);
      }

      this.orderService.initializeVerticalOrder(this.initialVerticalOrders);
    }, 3000);
  }

}
