"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cart_js_1 = require("./Cart.js");
describe('My cart', function () {
    var store = new Cart_js_1.StoreInventory();
    store.addItem("Water", "Drink", 2.99);
    var cart;
    beforeEach(function () {
        cart = new Cart_js_1.Cart(store);
    });
    it('is created with a store, but otherwise empty', function () {
        expect(cart.itemsNum).toBe(0);
        expect(cart.list).toBe(null);
        expect(cart.totalCost).toBe(0);
        expect(cart.contents).toBe(null);
        expect(cart.list_item).toBe("");
    });
    test('test new grocery item of existing item', function () {
        cart.add('WATDRI');
        expect(cart.itemsNum).toBe(1);
        expect(__spreadArray([], __read(cart.list.keys()))[0]).toBe('Water');
        expect(cart.totalCost).toBe(2.99);
        //checks map key type
        expect(cart.contents.get('Water')).toBeInstanceOf(Cart_js_1.GroceryItem);
        expect(cart.list_item).toBe("Water");
    });
    test('test new grocery item of an item not in the store', function () {
        expect(cart.add('FOOBAR')).toThrowError('item is not available in store');
    });
    test('test that item that is inputted is an actual an SKU', function () {
        expect(cart.add('not a valid SKU sequence')).toThrowError('item is not a valid SKU sequence');
    });
    test('adding multiple items', function () {
        var newStore = new Cart_js_1.StoreInventory();
        newStore.addItem('Water', 'Drink', 2.99);
        newStore.addItem('Chocolate Milk', 'Drink', 4.99);
        newStore.addItem('Teddy Bear', 'TOY', 7.99);
        var cart = new Cart_js_1.Cart(newStore);
        cart.add('WATDRI');
        cart.add('CHODRI');
        cart.add('TEDTOY');
        expect(cart.itemsNum).toBe(3);
        expect(cart.list_item).toBe('Water, Chocalate Milk, Teddy Bear');
        expect(cart.totalCost).toBe(15.97);
    });
});
