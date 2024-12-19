type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage extends Message {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage extends Message {
  type: 'orderCancelled';
  payload: { orderId: string };
}

type MessageHandler<T extends Message> = (message: T) => void;
type Subscribers = {
  [K in MessageType]?: MessageHandler<any>[];
};

export class MessageBus {
  private subscribers: Subscribers = {};

  subscribe<T extends Message>(type: T['type'], subscriber: MessageHandler<T>): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type]?.push(subscriber);
  }

  publish<T extends Message>(message: T): void {
    const handlers = this.subscribers[message.type] || [];
    handlers.forEach((handler) => handler(message));
  }
}

export class InventoryStockTracker {
  private orderHistory: Map<string, Order> = new Map();

  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message) => {
      this.orderHistory.set(message.payload.orderId, message.payload);
      message.payload.items.forEach((item) => {
        this.stock[item.productId] = (this.stock[item.productId] || 0) - item.quantity;
      });
    });

    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', (message) => {
      const order = this.orderHistory.get(message.payload.orderId);
      if (order) {
        order.items.forEach((item) => {
          this.stock[item.productId] = (this.stock[item.productId] || 0) + item.quantity;
        });
        this.orderHistory.delete(message.payload.orderId);
      }
    });
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
