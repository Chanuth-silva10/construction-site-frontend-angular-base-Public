export interface Rules {
  _id: string;
  name:string;
  limit:number;
  description:string;
  approvals:[];
  approvalType:string;
}
