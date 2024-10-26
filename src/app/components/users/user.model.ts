export interface User {
    _id?: string;
    empId?: number;
    firstName: string;
    lastName: string;
    department?: string;
    email: string;
    password?: string;
    phone: string;
    status?: string;
    type: string;
    permissions?: [];
  }