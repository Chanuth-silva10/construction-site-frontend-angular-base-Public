import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from '../../../services/order/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ItemService } from 'src/app/services/item/item.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Invoice } from '../invoice.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  update: boolean;
  data: Invoice;
  orders: any[];
  items: any[];
  orderItems= {};
  completed={};
  
  // Form input variables
  orderDropdownItems: any[] = [];
  orderSelectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};

  // Form properties
  formName: string;
  title: string;
  addInvoiceForm!: FormGroup;
  loading = false;
  itemsLoading = false;

  // Item table properties
  // @ts-ignore
  itemSource: MatTableDataSource<T>;
  displayedColumns = ['itemName', 'received', 'qty']

  buttons = [
    { type: 'cancel', name: 'Cancel', submit: false },
    { type: 'save', name: 'Save', submit: true }
  ];

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private invoiceService: InvoiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    // Initialise view data
    this.data = history.state;
    this.activatedRoute.data.subscribe(data => {
      this.update = data.update;
    });
    
    this.formName = this.update ? 'updateInvoice' : 'addInvoice';
    this.title = this.update ? 'Update Invoice' : 'Add Invoice';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });

    console.log(this.buttons);

    this.orderService.getAllOrders().subscribe(data => {
      if (data.length > 0) {
        this.orders = data;
        this.orderDropdownItems = data.map(order => {
          return { id: order._id, text: `#${order.orderReferenceNo}` };
        });

        this.itemService.getAllItems().subscribe(data => {
          if (data.length > 0)
            this.items = data;
            this.populateData();
        });
      }
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      allowSearchFilter: true,
    }

    // Initialise form inputs
    this.addInvoiceForm = this.fb.group({
      date: ['', Validators.required],
      payedAmount: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]]
    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.date?.setValue(this.data?.date.split('T')[0]);
      this.payedAmount?.setValue(this.data?.payedAmount);
    }
  }

  populateData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.invoiceService.getInvoiceById(id).subscribe(
        data => {
          this.data = data;
          this.update = true;
          
          let orderReference = '';
          this.orders.map(order => {
            if (order._id === data.orderId)
              orderReference = order.orderReferenceNo;
          });

          this.orderSelectedItems = [{
            id: this.data.orderId,
            text: `#${orderReference}`
          }]

          this.date?.setValue(this.data?.date.split('T')[0]);
          this.payedAmount?.setValue(this.data?.payedAmount);

          this.formName = "updateInvoice";
          this.title = "Update Invoice";
        },
        error => {
          this.error = error;
        }
      );
  }

  // Getters for form input values
  get date() {
    return this.addInvoiceForm.get('date');
  }

  get payedAmount() {
    return this.addInvoiceForm.get('payedAmount');
  }

  // Submit form function
  submit(): void {
    if (this.orderSelectedItems.length !== 1) {
      this.feedback.error('Please select an order');
      return;
    }

    let order: any = {};
    this.orders.map(orderObject => {
      if (orderObject._id === this.orderSelectedItems[0].id)
        order = orderObject;
    });

    if (this.addInvoiceForm.valid) {
      this.loading = true;

      // Create invoice object
      const invoice: Invoice = {
        date: this.date?.value,
        orderId: order._id,
        payedAmount: this.payedAmount?.value,
      }

      console.log(invoice);

      // Call save/update function from order service
      if (!this.update) {
        this.invoiceService.saveInvoice(invoice).subscribe(
          () => {
            this.success();
          },
          () => {
            this.error();
          },
        ).add(() => {
          this.loading = false;
        });
      } else {
        this.invoiceService.updateInvoice(this.data._id!, invoice).subscribe(
          () => {
            this.success();
          },
          () => {
            this.error();
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }

  private success(): void {
    this.feedback.success(`Invoice ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/invoices']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
