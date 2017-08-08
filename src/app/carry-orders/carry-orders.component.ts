/* tslint:disable:no-any */
import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HotTable } from 'ng2-handsontable';
import * as Handsontable from 'handsontable';
import { TabsetComponent } from 'ngx-bootstrap';

import { CarryOrder } from '../model/carry-order';
import { OrderService } from '../service/order.service';

interface Coordinates {
  col: number;
  row: number;
}

@Component({
  selector: 'app-carry-orders',
  templateUrl: './carry-orders.component.html',
  styleUrls: ['./carry-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarryOrdersComponent implements OnInit {

  @Input() data: Observable<CarryOrder[]>;

  @ViewChild(HotTable) hotTableComponent;

  private carryOrders: CarryOrder[];
  private colHeaders: string[];
  private columns: any[];
  private options: any;

  constructor(public orderService: OrderService) {
    this.colHeaders = ['', 'Metals', 'Side', 'Lot', 'Prompt1', 'Limit Prompt1', 'Prompt2', 'Limit Prompt2', `Break Period`, 'Val', 'Status', 'Submit',
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'];
    this.columns = [
      { data: 'selected', type: 'checkbox' },
      { data: 'instrument', type: 'dropdown', source: ['Ali', 'Copper', 'Lead', 'Nickle', 'Tin', 'Zinc']
      },
      { data: 'side', type: 'dropdown', source: ['Brw', 'Lend']
      },
      { data: 'qty', type: 'numeric', format: '0,0'},
      { data: 'prompt1',
        type: 'date',
        dateFormat: 'DD-MMM-YY',
        correctFormat: true,
        // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
        datePickerConfig: {
          // First day of the week (0: Sunday, 1: Monday, etc)
          firstDay: 1,
          showWeekNumber: true,
          numberOfMonths: 3,
          disableDayFn: function(date) {
            // Disable Sunday and Saturday
            return date.getDay() === 0 || date.getDay() === 6;
          }
        }
      },
      { data: 'limitPrompt1',
        type: 'date',
        dateFormat: 'DD-MMM-YY',
        correctFormat: true,
        // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
        datePickerConfig: {
          // First day of the week (0: Sunday, 1: Monday, etc)
          firstDay: 1,
          showWeekNumber: true,
          numberOfMonths: 3,
          disableDayFn: function(date) {
            // Disable Sunday and Saturday
            return date.getDay() === 0 || date.getDay() === 6;
          }
        }
      },
      { data: 'prompt2',
        type: 'date',
        dateFormat: 'DD-MMM-YY',
        correctFormat: true,
        // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
        datePickerConfig: {
          // First day of the week (0: Sunday, 1: Monday, etc)
          firstDay: 1,
          showWeekNumber: true,
          numberOfMonths: 3,
          disableDayFn: function(date) {
            // Disable Sunday and Saturday
            return date.getDay() === 0 || date.getDay() === 6;
          }
        }
      },
      { data: 'limitPrompt2',
        type: 'date',
        dateFormat: 'DD-MMM-YY',
        correctFormat: true,
        // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
        datePickerConfig: {
          // First day of the week (0: Sunday, 1: Monday, etc)
          firstDay: 1,
          showWeekNumber: true,
          numberOfMonths: 3,
          disableDayFn: function(date) {
            // Disable Sunday and Saturday
            return date.getDay() === 0 || date.getDay() === 6;
          }
        }
      },
      { data: 'breakPeriod', type: 'checkbox'},
      { data: 'variation', readOnly: true},
      { data: 'status', readOnly: true},
      { data: 'submitted', renderer: this.submittedRenderer },
      { readOnly: true, renderer: this.actionRenderer }
    ];
    this.options = {
      height: 260,
      rowHeaders: true,
      stretchH: 'none',
      columnSorting: false,
      contextMenu: true,
      className: 'htCenter htMiddle',
      readOnly: false
    };
  }

  ngOnInit() {
    this.data.subscribe((orders: CarryOrder[]) => {
      this.carryOrders = orders;
    });
  }

  // Cell Renderer
  submittedRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.BaseRenderer.apply(this, arguments);
    if (value) {
      td.innerHTML = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
      td.style.color = 'green';
    } else {
      td.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
      td.style.color = 'red';
    }
  }

  actionRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.BaseRenderer.apply(this, arguments);
    td.innerHTML = '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>';
  }

  // Event handler
  onAfterChange($event: any) {
    const changes: any = $event[0];
    const source: string = $event[1];
    console.log('CarryOrders.onAfterChange()->source:' + source + ', changes: ' + JSON.stringify(changes));
    if (source === 'edit') {
      changes.forEach((change) => {
        const orderChanged: CarryOrder =  this.carryOrders[change[0]];
        console.log('CarryOrders.onAfterChange()->order changed: ' + JSON.stringify(orderChanged));
        this.orderService.updateCarryOrder(orderChanged);
      });
    }
  }
  onAfterOnCellMouseDown($event: any) {
    const coords: Coordinates = $event[1];
    console.log('CarryOrders.onAfterOnCellMouseDown()->Clicked on cell: [' + coords.row + ', ' + coords.col + ']');
  }

}
