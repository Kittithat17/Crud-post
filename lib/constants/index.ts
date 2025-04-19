export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
    ? process.env.PAYMENT_METHODS.split(', ')
: ['PayPal', 'Stripe', 'CashOnDelivery']
