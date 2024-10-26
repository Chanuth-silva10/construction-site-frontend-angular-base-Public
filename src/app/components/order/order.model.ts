export interface Order {
  _id:string;
  orderReferenceNo:number;
  site:any;
  supplier:any;
  deliveryAddress:string;
  expectedDeliveryDate:Date;
  total:number;
  items:any;
  status:string;
  comments:[];
  orderNotes:string;
  createdBy:string;
  approvals:[]
}
