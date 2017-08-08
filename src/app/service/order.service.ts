import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CarryOrder } from '../model/carry-order';
import { VerticalOrder } from '../model/vertical-order';
import * as moment from 'moment';

type ICarryOrdersOperation = (carryOrders: CarryOrder[]) => CarryOrder[];

type IVerticalOrdersOperation = (verticalOrders: VerticalOrder[]) => VerticalOrder[];


@Injectable()
export class OrderService {
  // `carryOrders` is a stream that emits an array of the most up to date carryOrders
  public carryOrders: Observable<CarryOrder[]>;

  // `carryOrderUpdates` receives _operations_ to be applied to our `carryOrders`
  // it's a way we can perform changes on *all* carryOrders (that are currently stored in `carryOrders`)
  private carryOrderUpdates: Subject<any> = new Subject<any>();

  // a stream that publishes new carryOrders only once
  private newCarryOrder: Subject<CarryOrder> = new Subject<CarryOrder>();
  // a stream that publishes carryOrder updates
  private changedCarryOrder: Subject<CarryOrder> = new Subject<CarryOrder>();

  // action streams
  private carryOrderToCreate: Subject<CarryOrder> = new Subject<CarryOrder>();

  private verticalOrders: Observable<VerticalOrder[]>;
  private verticalOrderUpdates: Subject<any> = new Subject<any>();
  private changedVerticalOrder: Subject<VerticalOrder> = new Subject<VerticalOrder>();
  public month1Orders: Subject<VerticalOrder[]> = new BehaviorSubject<VerticalOrder[]>([]);
  public month2Orders: Subject<VerticalOrder[]> = new BehaviorSubject<VerticalOrder[]>([]);
  public month3Orders: Subject<VerticalOrder[]> = new BehaviorSubject<VerticalOrder[]>([]);
  public month4Orders: Subject<VerticalOrder[]> = new BehaviorSubject<VerticalOrder[]>([]);
  public month1Label: Subject<string> = new BehaviorSubject<string>('Initializing');
  public month2Label: Subject<string> = new BehaviorSubject<string>('Initializing');
  public month3Label: Subject<string> = new BehaviorSubject<string>('Initializing');
  public month4Label: Subject<string> = new BehaviorSubject<string>('Initializing');
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    this.carryOrders = this.carryOrderUpdates
      // watch the carryOrderUpdates and accumulate operations on the carryOrders
      .scan(
        (carryOrders: CarryOrder[], operation: ICarryOrdersOperation) => {
          return operation(carryOrders);
        }, [])
      // make sure we can share the most recent list of carryOrders across anyone who's interested in the last known list of carryOrders
      .publishReplay(1)
      .refCount();
    // `carryOrderToCreate` takes a CarryOrder and then puts an operation (the inner function) on the `carryOrderUpdates` stream to add the CarryOrder to carryOrders.
    // That is, for each item that gets added to `carryOrderToCreate` (by using `next`) this stream emits a concat operation function.
    //
    // Next we subscribe `this.carryOrderUpdates` to listen to this stream, which means that it will receive each operation that is created
    this.carryOrderToCreate
      .map(function(carryOrder: CarryOrder): ICarryOrdersOperation {
        return (carryOrders: CarryOrder[]) => {
          return carryOrders.concat(carryOrder);
        };
      })
      .subscribe(this.carryOrderUpdates);

    this.newCarryOrder.subscribe(this.carryOrderToCreate);

    this.changedCarryOrder
      .map(
        (changedOrder: CarryOrder) => {
          return (carryOrders: CarryOrder[]) => {
            for (let i = 0; i < carryOrders.length; i++) {
              if (carryOrders[i].getId() === changedOrder.getId()) {
                carryOrders.splice(i, 1, changedOrder);
              }
            }
            return carryOrders;
          };
        }
      )
      .subscribe(this.carryOrderUpdates);

    this.verticalOrders = this.verticalOrderUpdates
      .scan(
        (verticalOrders: VerticalOrder[], operation: IVerticalOrdersOperation) => {
          return operation(verticalOrders);
        }, [])
      .publishReplay(1)
      .refCount();

    this.changedCarryOrder
      .map(
        (changedOrder: CarryOrder) => {
          return (verticalOrders: VerticalOrder[]) => {
            verticalOrders.forEach((verticalOrder: VerticalOrder) => {
              const vOrdDate = moment(verticalOrder.date.getTime());
              const vOrdDateStr = vOrdDate.format('DD-MMM-YY');
              if ( (changedOrder.prompt1 && changedOrder.prompt1 === vOrdDateStr)
                || (changedOrder.prompt2 && changedOrder.prompt2 === vOrdDateStr)
              ) {
                verticalOrder.netQty = verticalOrder.qty + changedOrder.qty;
                console.log('OrderSerivce.constructor()->vertial order changed due to carry order' + JSON.stringify(verticalOrder));
              }
            });
            return verticalOrders;
          };
        }
      )
      .subscribe(this.verticalOrderUpdates);

    this.changedVerticalOrder
      .map(
        (changedOrder: VerticalOrder) => {
          return (verticalOrders: VerticalOrder[]) => {
            for (let i = 0; i < verticalOrders.length; i++) {
              if (verticalOrders[i].getId() === changedOrder.getId()) {
                verticalOrders.splice(i, 1, changedOrder);
              }
            }
            return verticalOrders;
          };
        }
      )
      .subscribe(this.verticalOrderUpdates);

    this.verticalOrders.subscribe((orders: VerticalOrder[]) => {
      console.log('OrderService.constructor()->vertical orders changed, count: ' + orders.length);

      // Cheating here
      this.month1Orders.next(orders.filter(order => order.date.getMonth() === 5));
      this.month2Orders.next(orders.filter(order => order.date.getMonth() === 6));
      this.month3Orders.next(orders.filter(order => order.date.getMonth() === 7));
      this.month4Orders.next(orders.filter(order => order.date.getMonth() === 8));
      this.month1Label.next(this.monthNames[5] + '- 17');
      this.month2Label.next(this.monthNames[6] + '- 17');
      this.month3Label.next(this.monthNames[7] + '- 17');
      this.month4Label.next(this.monthNames[8] + '- 17');
    });
  }

  // an imperative function call to this action stream
  addCarryOrder(carryOrder: CarryOrder): void {
    console.log('OrderService.addCarryOrder()->' + JSON.stringify(carryOrder));

    this.newCarryOrder.next(carryOrder);
  }

  updateCarryOrder(changedOrder: CarryOrder): void {
    console.log('OrderService.updateCarryOrder()->' + JSON.stringify(changedOrder));

    this.changedCarryOrder.next(changedOrder);
  }

  initializeVerticalOrder(initiaOrders: VerticalOrder[]) {
    console.log('OrderService.initializeVerticalOrder()->' + JSON.stringify(initiaOrders));

    this.verticalOrderUpdates.next(
      (verticalOrders: VerticalOrder[]) => {
        return initiaOrders;
      }
    );
  }

  updateVerticalOrder(changedOrder: VerticalOrder): void {
    console.log('OrderService.updateVerticalOrder()->' + JSON.stringify(changedOrder));

    this.changedVerticalOrder.next(changedOrder);
  }

  guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  createCarryOrder(): CarryOrder {
    const order = new CarryOrder(this.guid());
    order.side = 'Brw';
    return order;
  }

  createVerticalOrder(): VerticalOrder {
    return new VerticalOrder(this.guid());
  }

}
