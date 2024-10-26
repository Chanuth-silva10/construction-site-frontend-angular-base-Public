import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from '../../../services/order/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { ItemService } from 'src/app/services/item/item.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Delivery } from '../delivery.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  update: boolean;
  data: Delivery;
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
  addDeliveryForm!: FormGroup;
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
    private deliveryService: DeliveryService,
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
    
    this.formName = this.update ? 'updateDelivery' : 'addDelivery';
    this.title = this.update ? 'Update Delivery' : 'Add Delivery';

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
    this.addDeliveryForm = this.fb.group({
      date: ['', Validators.required],
      comment: ['']
    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.date?.setValue(this.data?.date.split('T')[0]);
      this.comment?.setValue(this.data?.comment);
    }
  }

  populateData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.deliveryService.getDeliveryById(id).subscribe(
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

          this.onSelectOrder(this.data.orderId, data.items);

          this.date?.setValue(this.data?.date.split('T')[0]);
          this.comment?.setValue(this.data?.comment);

          this.formName = "updateDelivery";
          this.title = "Update Delivery";
        },
        error => {
          this.error = error;
        }
      );
  }

  // Getters for form input values
  get date() {
    return this.addDeliveryForm.get('date');
  }

  get comment() {
    return this.addDeliveryForm.get('comment');
  }

  onSelectOrder(orderId: any, updateItems?: any) {
    this.itemsLoading = true;
    this.orders.map(order => {
      if (order._id === orderId) {
        const orderItems: string[] = [];
        const orderItemQuantities: number[] = [];
        const orderItemDelivered: number[] = [];
        order.items.map(orderItem => {
          orderItems.push(orderItem.itemId);
          orderItemQuantities.push(orderItem.qty);
          orderItemDelivered.push(orderItem.delivered);
        });
        const itemSource = this.items.filter(item => {
          if (orderItems.includes(item._id)) {
            item.qty = orderItemQuantities[orderItems.indexOf(item._id)];
            const delivered = orderItemDelivered[orderItems.indexOf(item._id)];
            const remaining = item.qty - delivered;
            this.orderItems[item._id] = {
              qty: 0,
              delivered: delivered,
              deliveredOriginal: delivered,
              remaining: remaining,
              qtyOriginal: 0
            };
            this.completed[item._id] = item.qty === delivered ? true : false;

            if (updateItems) {
              const orderItem = this.orderItems[item._id];
              updateItems.map(updateItem => {
                orderItem.qty = updateItem.qty;
                orderItem.deliveredOriginal = orderItem.delivered - orderItem.qty;
                orderItem.qtyOriginal = orderItem.qty;
              })
            }

            return true;
          }
          return false;
        });
        this.items = itemSource;
        this.itemSource = new MatTableDataSource(itemSource);
      }
    });
  }

  onDeselectOrder() {
    this.itemSource = new MatTableDataSource();
  }

  incrementQty(itemId: any) {
    let orderItem = this.orderItems[itemId];
    if (orderItem.remaining > orderItem.qty - orderItem.qtyOriginal) {
      ++orderItem.qty;
      ++orderItem.delivered;
    }
    if (orderItem.remaining === orderItem.qty - orderItem.qtyOriginal)
      this.completed[itemId] = true;
  }

  decrementQty(itemId: any) {
    let orderItem = this.orderItems[itemId];
    if (0 < orderItem.qty) {
      --orderItem.qty;
      --orderItem.delivered;
    }
    if (orderItem.remaining !== orderItem.qty - orderItem.qtyOriginal)
      this.completed[itemId] = false;
  }

  onChangeQty(itemId: any) {
    let orderItem = this.orderItems[itemId];
    if (orderItem.qty <= 0) {
      orderItem.qty = 0;
      orderItem.delivered = orderItem.deliveredOriginal;
    } else if (orderItem.qty - orderItem.qtyOriginal > orderItem.remaining) {
      orderItem.qty = orderItem.remaining + orderItem.qtyOriginal;
      orderItem.delivered = orderItem.deliveredOriginal + orderItem.qty;
    } else {
      orderItem.delivered = orderItem.deliveredOriginal + orderItem.qty;
    }
    
    if (orderItem.qty - orderItem.qtyOriginal === orderItem.remaining)
      this.completed[itemId] = true;
    else
      this.completed[itemId] = false;
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

    const items: any[] = [];
    let somethingDelivered = false;

    for (let itemId in this.orderItems) {      
      const quantities = this.orderItems[itemId];
      
      if (quantities.qty > 0)
        somethingDelivered = true;

      items.push({
        itemId: itemId,
        qty: quantities.qty,
        delivered: quantities.delivered,
      });
    }

    if (!somethingDelivered) {
      this.feedback.error('Should deliver at least 1 item');
      return
    }

    if (this.addDeliveryForm.valid) {
      this.loading = true;

      // Create delivery object
      const delivery: Delivery = {
        date: this.date?.value,
        orderId: order._id,
        supplierId: order.supplier,
        comment: this.comment?.value,
        items: items,
      }

      console.log(delivery);

      // Call save/update function from order service
      if (!this.update) {
        this.deliveryService.saveDelivery(delivery).subscribe(
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
        this.deliveryService.updateDelivery(this.data._id!, delivery).subscribe(
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
    this.feedback.success(`Delivery ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/deliveries']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
