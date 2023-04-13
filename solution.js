const items = {
  'book': {
    category: 'books',
    imported: false
  },
  'music CD': {
    category: 'CDs & vinyl',
    imported: false
  },
  'chocolate bar': {
    category: 'food',
    imported: false
  },
  'imported box of chocolates': {
    category: 'food',
    imported: true
  },
  'imported bottle of perfume': {
    category: 'perfume',
    imported: true
  },
  'bottle of perfume': {
    category: 'perfume',
    imported: false
  },
  'packet of headache pills': {
    category: 'medical products',
    imported: false
  }
};

const input1 = {
  'book': {
    price: 12.49,
    quantity: 2
  },
  'music CD': {
    price: 14.99,
    quantity: 1
  },
  'chocolate bar': {
    price: 0.85,
    quantity: 1
  }
};

const input2 = {
  'imported box of chocolates': {
    price: 10,
    quantity: 1
  },
  'imported bottle of perfume': {
    price: 47.50,
    quantity: 1
  }
};

const input3 = {
  'imported bottle of perfume': {
    price: 27.99,
    quantity: 1
  },
  'bottle of perfume': {
    price: 18.99,
    quantity: 1
  },
  'packet of headache pills': {
    price: 9.75,
    quantity: 1
  },
  'imported box of chocolates': {
    price: 11.25,
    quantity: 3
  }
};

const basicSalesTax = 0.1;
const basicSalesTaxExceptionsCategories = ['books', 'food', 'medical products'];
const importDutyTax = 0.05;

const roundTaxValue = value => (Math.ceil(value * 20) / 20);

const getItemTaxAsociated = (item, price) => {
  const itemCategory = items[item].category;
  const itemBasicSalesTax = basicSalesTaxExceptionsCategories.includes(itemCategory)
    ? 0
    : price * basicSalesTax;
  const isItemImported = items[item].imported;
  const itemImportDutyTax = isItemImported
    ? price * importDutyTax
    : 0;

  return roundTaxValue(itemBasicSalesTax + itemImportDutyTax);
};

const generateReceipt = input => {
  const inputItemsNames = Object.keys(input);
  let salesTaxes = 0;
  let total = 0;

  inputItemsNames.forEach(item => {
    const itemPrice = input[item].price;
    const itemQuantity = input[item].quantity;
    const itemTaxAsociated = getItemTaxAsociated(item, itemPrice);

    total = total + itemPrice * itemQuantity;
    salesTaxes = salesTaxes + itemTaxAsociated * itemQuantity;

    console.log(`${itemQuantity} ${item}: ${((itemPrice + itemTaxAsociated) * itemQuantity).toFixed(2)}`);
  });

  console.log(`Sales Taxes: ${salesTaxes.toFixed(2)}`);
  console.log(`Total: ${(total + salesTaxes).toFixed(2)}`, '\n');
};

// Log to console
console.log('Output 1');
generateReceipt(input1);

console.log('Output 2');
generateReceipt(input2);

console.log('Output 3');
generateReceipt(input3);
