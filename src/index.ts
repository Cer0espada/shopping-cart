import {StoreInventory, Cart} from "./Cart";
//General functionality file
const store = new StoreInventory();
store.addItem('Potatoes', 'Vegetable', 10.00);
store.addItem('Rice', 'Grain', 30.00 );
store.addItem('Coffee', 'Beans', 14.99);
store.addItem('NewsPaper', 'NonEditable', 2.99);

const cart = new Cart(store);
cart.add('POTVEG')
cart.add('RICGRA')
cart.add('COFBEA')
cart.add('NEWNON');
console.log(cart.list_item);
console.log(cart.totalCost)