import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import * as Handsontable from 'handsontable';
import * as moment from 'moment';
import {Observable} from 'rxjs';

import {VerticalOrder} from '../../model/vertical-order';
import {OrderService} from '../../service/order.service';

@Component({
    selector: 'app-vertical-orders',
    templateUrl: './vertical-orders.component.html',
    styleUrls: ['./vertical-orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalOrdersComponent implements OnInit {

    @Input() data: Observable<VerticalOrder[]>;
    @Input() label: Observable<string>;

    private verticalOrders: VerticalOrder[];
    colHeaders: string[];
    columns: any[];
    options: any;

    constructor(public orderService: OrderService) {
        this.colHeaders = ['Day', 'Date', 'Enter Order', 'Net'];
        this.columns = [
            {data: 'date', type: 'date', dateFormat: 'ddd', readOnly: true, renderer: this.dayRenderer},
            {data: 'date', type: 'date', dateFormat: 'DD-MMM-YY', readOnly: true, renderer: this.dateRenderer},
            {data: 'qty', type: 'numeric', format: '0,0', renderer: this.qtyRenderer},
            {data: 'netQty', type: 'numeric', format: '0,0', readOnly: true, renderer: this.qtyRenderer}
        ];
        this.options = {
            rowHeaders: true,
            stretchH: 'none',
            columnSorting: false,
            contextMenu: true,
            className: 'htCenter htMiddle',
            readOnly: false
        };
    }

    ngOnInit() {
        this.data.subscribe((orders: VerticalOrder[]) => {
            this.verticalOrders = orders;
        });

    }

    dayRenderer(instance, td, row, col, prop, value: Date, cellProperties) {
        Handsontable.renderers.BaseRenderer.apply(this, arguments);
        if (value && value instanceof Date) {
            const date = moment(value.getTime());
            td.innerHTML = date.format('ddd');
        }
    }

    dateRenderer(instance, td, row, col, prop, value: Date, cellProperties) {
        Handsontable.renderers.BaseRenderer.apply(this, arguments);
        if (value && value instanceof Date) {
            const date = moment(value.getTime());
            td.innerHTML = date.format('DD-MMM-YY');
        }
    }

    qtyRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.NumericRenderer.apply(this, arguments);
        td.style.color = (value < 0) ? 'red' : 'green';
    }

    onAfterChange = (hot: any, changes: any, source: any) => {
        console.log('VerticalOrders.onAfterChange()->', changes);
        if (source === 'edit') {
            changes.forEach((change) => {
                const orderChanged: VerticalOrder = this.verticalOrders[change[0]];
                const oldVal = change[2];
                const newVal = change[3];
                if (!orderChanged.netQty) {
                    orderChanged.netQty = 0;
                }
                if (oldVal) {
                    orderChanged.netQty -= oldVal;
                }
                orderChanged.netQty += newVal;
                console.log('oldQty: ' + oldVal + ', newQty: ' + newVal + ', netQty: ' + orderChanged.netQty);

                console.log('VerticalOrders.onAfterChange()->order changed: ' + JSON.stringify(orderChanged));
                this.orderService.updateVerticalOrder(orderChanged);
            });
        }
    };

}
