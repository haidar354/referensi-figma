// Helper functions

export const formatCurrency = (amount) => {
  return `Rp. ${amount.toLocaleString('id-ID')}`;
};

export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateTax = (amount, taxRate = 0.1) => {
  return Math.round(amount * taxRate);
};

export const roundAmount = (amount) => {
  const remainder = amount % 100;
  if (remainder >= 50) {
    return amount + (100 - remainder);
  } else if (remainder > 0) {
    return amount - remainder;
  }
  return amount;
};
