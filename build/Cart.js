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
exports.Cart = exports.StoreInventory = exports.GroceryItem = void 0;
var GroceryItem = /** @class */ (function () {
    function GroceryItem(name, type, price, quantity) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.quantity = quantity ? quantity : 1; //add in quantity as 1 if not specified
        this.SKU = this.name.slice(0, 3).toUpperCase() + this.type.slice(0, 3).toUpperCase();
        this.totalCost = Math.round(this.price * (quantity ? quantity : 1) * 100) / 100;
    }
    GroceryItem.prototype.increaseQuantity = function (amount) {
        this.quantity += amount;
        this.totalCost = Math.round((this.quantity * this.price) * 100) / 100;
    };
    GroceryItem.prototype.decreaseQuantity = function (amount) {
        this.quantity - amount;
        this.totalCost = this.quantity / this.price;
    };
    return GroceryItem;
}());
exports.GroceryItem = GroceryItem;
var StoreInventory = /** @class */ (function () {
    function StoreInventory() {
        this.contents = new Map(null);
    }
    StoreInventory.prototype.addItem = function (name, type, price, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var value = name.slice(0, 3).toUpperCase() + type.slice(0, 3).toUpperCase();
        if (this.contents.has(value)) {
            console.log("this item " + name + " is already present in the store");
            return;
        }
        var entry = new GroceryItem(name, type, price, quantity);
        this.contents.set(entry.SKU, entry);
    };
    StoreInventory.prototype.getSKU = function (SKU) {
        if (this.contents.has(SKU))
            return this.contents.get(SKU);
        throw new Error('Item is not present in the store');
    };
    return StoreInventory;
}());
exports.StoreInventory = StoreInventory;
var Cart = /** @class */ (function () {
    function Cart(store) {
        this.contents = new Map();
        this.itemsNum = 0;
        this.totalCost = 0;
        this.list = new Set(); // may implement this differently if we also want to return the quantities of each item;
        this.list_item = null;
        this.store = store;
    }
    Cart.prototype.add = function (SKU) {
        if (SKU.length !== 6 || SKU !== SKU.toUpperCase())
            throw new Error('item is not a valid SKU sequence');
        if (!this.store.contents.has(SKU))
            throw new Error('item not available in store');
        var entry = this.store.contents.get(SKU);
        if (this.store.contents.has(SKU) && this.contents.has(entry.name)) {
            entry.quantity++; //potential for refactor
            entry.totalCost += entry.price; // potential for refactor
            this.totalCost = Math.round((this.totalCost + entry.price) * 100 / 100);
            this.itemsNum++;
            return;
        }
        this.contents.set(entry.name, entry);
        this.list = new Set(__spreadArray(__spreadArray([], __read(this.list.values())), [entry.name]).sort()); //sorts the list into alphabetic order
        this.list_item = __spreadArray([], __read(this.list)).join(", ");
        this.totalCost = Math.round((this.totalCost + entry.price) * 100) / 100;
        this.itemsNum++;
    };
    Cart.prototype.addFull = function (name, type, price, quantity) {
        if (quantity === void 0) { quantity = 1; }
        if (!this.contents.has(name)) {
            if (!type || !price)
                throw new Error('Item not present need "item type" and/or "item price parameter"');
            this.contents.set(name, new GroceryItem(name, type, price));
            this.itemsNum += quantity;
            this.totalCost += quantity * price;
            this.list.add(name);
            return;
        }
        var item = this.contents.get(name);
        item.increaseQuantity(quantity);
        this.totalCost += item.price * quantity;
        this.itemsNum += quantity;
    };
    Cart.prototype.remove = function (name, type, price, quantity) {
        var _a;
        if (!this.contents.has(name)) {
            throw new Error('No items with that name exist in the cart');
        }
        var item = this.contents.get(name);
        if (item.quantity === 1) {
            this.contents.delete(name);
            this.totalCost -= item.totalCost;
            this.totalCost -= quantity * price;
            this.itemsNum--;
            this.list.delete(name);
        }
        (_a = this.contents.get(name)) === null || _a === void 0 ? void 0 : _a.decreaseQuantity(quantity);
        this.totalCost -= price * quantity;
        this.itemsNum -= quantity;
    };
    Cart.prototype.printItems = function () {
        this.list.forEach(function (item) {
            console.log(item);
        });
    };
    return Cart;
}());
exports.Cart = Cart;
