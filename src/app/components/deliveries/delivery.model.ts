interface DeliveryItem {
    itemId: string,
    delivered: number,
    remaining: number
};

export interface Delivery {
    _id?: string,
    deliveryId?: number,
    date: string,
    orderId: any,
    status?: string,
    supplierId: any,
    items: DeliveryItem[],
    comment: string
}