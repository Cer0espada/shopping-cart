import { Errors, GroceryItem, StoreInventory, Cart} from './Cart';
//TODO: add in testing file for GroceryItem and StoreInventory Classes 
    //1. add in testing of totalcost and quanitity 

describe('My cart', () => {
    const store = new StoreInventory();
    store.addItem("Water", "Drink", 2.99);


    let cart:Cart; 

    beforeEach(() => {
        cart = new Cart(store);
    })
    it('is created with a store, but otherwise empty', () => {
        

        expect(cart.itemsNum).toBe(0);
        expect(cart.store).toBeInstanceOf(StoreInventory)
        expect(cart.list).toBeInstanceOf(Set)
      
        expect(cart.totalCost).toBe(0);
        expect([...cart.contents.values()]).toEqual([])
        expect(cart.list_item).toBeFalsy();
    })

    test('test new grocery item of existing item', () => {
        cart.add('WATDRI');

        expect(cart.itemsNum).toBe(1);
        expect([...cart.list.keys()][0]).toBe('Water');
        expect(cart.totalCost).toBe(2.99);
        //checks map key type
        expect(cart.contents.get('Water')).toBeInstanceOf(GroceryItem);
        expect(cart.list_item).toBe("Water");
    })
    //@Todo: add in a test the type of Error returned
    test('test addition of new grocery item that is not present in the store', () => {
        expect(() => cart.add('FOOBAR')).toThrow(Errors.itemNotPresentInStore)
    })
    test('test addition of item is in actual an SKU format', () => {
        expect(() => cart.add('not a valid SKU sequence')).toThrow(Errors.invalidSKUSequence)
        cart.add('WATDRI')
        expect(cart.contents.get("Water")!.quantity).toBe(1);
    })

    test('test the addition of multiple items', () => {
        let newStore = new StoreInventory();
        newStore.addItem('Water', 'Drink', 2.99);
        newStore.addItem('Chocolate Milk', 'Drink', 4.99);
        newStore.addItem('Teddy Bear', 'TOY', 7.99);

       let cart = new Cart(newStore);
       cart.add('WATDRI');
       cart.add('CHODRI');
       cart.add('TEDTOY');

        expect(cart.itemsNum).toBe(3);
        expect(cart.list_item).toBe('Chocolate Milk, Teddy Bear, Water');
        expect(cart.totalCost).toBe(15.97);

    })
})


