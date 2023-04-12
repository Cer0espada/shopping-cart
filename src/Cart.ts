import { InvalidSKUSequenceError, Errors, ItemNotPresentInStore, ItemAlreadyPresentInStore } from "./Error";

export class GroceryItem {
    // main base object

    //TODO: refactor quantity of Total Cost in Cart and Grocery Item
    public name: string
    public price: number
    public totalCost: number;
    public quantity: number;
    public SKU: string;
    public type: string;
    constructor(name: string, type: string, price: number, quantity?: number) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.quantity = quantity ? quantity : 1; //add in quantity as 1 if not specified
        this.SKU = this.name.slice(0, 3).toUpperCase() + this.type.slice(0, 3).toUpperCase();
        this.totalCost = Math.round(this.price * (quantity ? quantity : 1) * 100) / 100;
    }
    public increaseQuantity(amount: number) {
        this.quantity += amount;
        this.totalCost = Math.round((this.quantity * this.price) * 100) / 100;
    }
    public decreaseQuantity(amount: number) {
        this.quantity - amount;
        this.totalCost = this.quantity / this.price;
    }

}

export class StoreInventory {
    //main store of the cart, allows selection of items available in 'hypothetical' store
    public contents: Map<string, GroceryItem> = new Map(null);

    constructor() { }

    public addItem(name: string, type: string, price: number, quantity = 1) {


        /**
         * @throws {@link ItemAlreadyPresentInStore} 
         * returns a not present store and logs it to the user
         */
        const value = name.slice(0, 3).toUpperCase() + type.slice(0, 3).toUpperCase()

        if (this.contents.has(value)) throw new ItemAlreadyPresentInStore(`${name} is already present in the store with a value of ${value}`)

        const entry = new GroceryItem(name, type, price, quantity);

        this.contents.set(entry.SKU, entry);
    }

    public getSKU(SKU: string) {
        if (this.contents.has(SKU)) return this.contents.get(SKU);

        throw new Error('Item is not present in the store');
    }
}

export class Cart {
    //main container, contains reference of main store object "store" which holds a list of all possible grocery stores 
    // contains unique quantity of objects in the "contents" hashtable
    public contents: Map<string, GroceryItem> = new Map<string, GroceryItem>();
    public itemsNum = 0;
    public totalCost = 0;
    public list: Set<string> = new Set<string>();
    public list_item: string | null = null;
    public store: StoreInventory; // composition of seperate Store Class

    constructor(store: StoreInventory) {
        this.store = store;
    }

    public add(SKU: string): void | never {
        /**
         * 
         * @TimeComplexity - O(list^2 log(list))
         * Time Complexity reduces to n^2 logn due to 
         * @throws {@link InvalidSKUSequenceError}
         * An exception if SKU not in appropriate convention 
         * @throws {@link ItemNotPresentInStore}
         * An exception if the Item is not in the store
         * 
         */

        if (SKU.length !== 6 || SKU !== SKU.toUpperCase()) throw new InvalidSKUSequenceError(Errors.invalidSKUSequence);

        if (!this.store.contents.has(SKU)) throw new ItemNotPresentInStore(Errors.itemNotPresentInStore);
        const entry = this.store.contents.get(SKU);

        if (this.store.contents.has(SKU) && this.contents.has(entry!.name)) {
            entry!.quantity++; //potential for refactor / redundant code 
            entry!.totalCost += entry!.price; // potential for refactor /redundant code
            this.totalCost = Math.round((this.totalCost + entry!.price) * 100 / 100);
            this.itemsNum++; // potential for refactor /redundant code
            return;
        }
        this.contents.set(entry!.name, entry as GroceryItem);
        //functional bottle neck

        /**
         * the following optimizes for easy access of the list_item array, but is not optimized for adding elements to the cart
         * In the following example we expect that the addition of additional items has a higher priority
         */
        this.list = new Set([...this.list.values(), entry!.name]!.sort()) //sorts the list into alphabetic order

        this.list_item = [...this.list].join(", ");
        this.totalCost = Math.round((this.totalCost + entry!.price) * 100) / 100;
        this.itemsNum++;
    }


}