// ❌
export class Payments {
  pay(method: any, paymentInfo: any) {
    switch (method) {
      case "credit":
        // pay with credit card
        break;
      case "transfer":
        // pay with bank transfer
        break;
      case "paypal":
        // pay with paypal
        break;
      default:
        throw new Error("Invalid payment method");
    }
  }
}

// ✅
interface Pay {
  pay(paymentInfo: any): void;
}
export class CreditCardPayment implements Pay {
  pay(paymentInfo: any) {
    // pay with credit card
  }
}
export class BankTransferPayment implements Pay {
  pay(paymentInfo: any) {
    // pay with bank transfer
  }
}
export class PaypalPayment implements Pay {
  pay(paymentInfo: any) {
    // pay with paypal
  }
}
export class Payments_D {
  pay(method: Pay, paymentInfo: any) {
    method.pay(paymentInfo);
  }
}
