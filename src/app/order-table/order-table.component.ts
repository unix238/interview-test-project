import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface DialogData {
  item: Item;
  quantity: number;
  price: number;
}
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css',
})
export class OrderTableComponent {
  displayedColumns: string[] = [
    'id',
    'item',
    'quantity',
    'unitPrice',
    'totalPrice',
  ];
  dataSource: PeriodicElement[] = ORDERS_DATA;
  selected: PeriodicElement | null = null;
  animal: string = '';
  name: string = '';
  item: Item | null = null;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      this.dataSource = [
        ...this.dataSource,
        {
          id: this.dataSource.length + 1,
          item: ITEMS.find((item) => item.id == result.item) || {
            id: 0,
            name: '',
            price: 0,
          },
          quantity: result.quantity,
        },
      ];
    });
  }

  constructor(public dialog: MatDialog) {}

  highlight(row: PeriodicElement) {
    this.selected = row;
  }
  delete(row: PeriodicElement) {
    this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'order-table-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
})
export class DialogOverviewExampleDialog {
  items: Item[] = ITEMS;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface PeriodicElement {
  item: Item;
  id: number;
  quantity: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
}

const ITEMS: Item[] = [
  { id: 1, name: 'Toy 1', price: 10 },
  { id: 2, name: 'Toy 2', price: 30 },
  { id: 3, name: 'Toy 3', price: 40 },
  { id: 4, name: 'Toy 4', price: 50 },
  { id: 5, name: 'Toy 5', price: 20 },
  { id: 6, name: 'Toy 6', price: 80 },
  { id: 7, name: 'Toy 7', price: 90 },
];

const ORDERS_DATA: PeriodicElement[] = [
  { id: 1, item: ITEMS[0], quantity: 1 },
  { id: 2, item: ITEMS[1], quantity: 2 },
  { id: 3, item: ITEMS[2], quantity: 3 },
  { id: 4, item: ITEMS[3], quantity: 1 },
  { id: 5, item: ITEMS[4], quantity: 6 },
  { id: 6, item: ITEMS[5], quantity: 3 },
  { id: 7, item: ITEMS[6], quantity: 5 },
];
