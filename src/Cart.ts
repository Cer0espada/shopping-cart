//Enum of error messages
export enum Errors{
    invalidSKUSequence = "item is not a valid SKU Sequence",
    itemNotPresentInStore="item is not present in the store"
}

export class InvalidSKUSequenceError extends Error{
    constructor(...args:string[]){
        super(...args);
       Error.captureStackTrace(this, InvalidSKUSequenceError)
    }
}

export class ItemNotPresentInStore extends Error{
    constructor(...args:string[]){
        super(...args);
        Error.captureStackTrace(this, ItemNotPresentInStore)
    }
}

export class GroceryItem{
    // main base object

    //TODO: refactor quantity of Total Cost in Cart and Grocery Item
    public name:string
    public price:number
    public totalCost:number;
    public quantity:number;
    public SKU:string;
    public type:string;
    constructor(name:string, type:string, price:number, quantity?:number){
        this.name = name;
        this.price = price;
        this.type = type;
        this.quantity = quantity ? quantity: 1; //add in quantity as 1 if not specified
        this.SKU = this.name.slice(0, 3).toUpperCase() + this.type.slice(0, 3).toUpperCase();
        this.totalCost = Math.round(this.price * (quantity ? quantity:1)*100)/100;
    }
    public increaseQuantity(amount:number){
        this.quantity+=amount;
        this.totalCost = Math.round((this.quantity*this.price)*100)/100 ;
    }
    public decreaseQuantity(amount:number){
        this.quantity-amount;
        this.totalCost = this.quantity / this.price;
    }

}

export class StoreInventory{
    //main store of the cart, allows selection of items available in 'hypothetical' store
    public contents:Map<string, GroceryItem> = new Map(null);
    

    constructor(){}

    public addItem(name:string, type:string, price:number, quantity:number=1){
        let value = name.slice(0,3).toUpperCase() + type.slice(0,3).toUpperCase()

        if(this.contents.has(value)){
            console.log(`this item ${name} is already present in the store`);
            //refactor to throw an Error 
            return;
        }

        const entry = new GroceryItem(name, type, price, quantity);

        this.contents.set(entry.SKU, entry);
    }

    public getSKU(SKU:string){
        if(this.contents.has(SKU)) return this.contents.get(SKU);
        
        throw new Error('Item is not present in the store');
    }
}

export class Cart{
    //main container, contains reference of main store object "store" which holds a list of all possible grocery stores 
    // contains unique quantity of objects in the "contents" hashtable
    public contents:Map<string,GroceryItem> = new Map<string, GroceryItem>();
    public itemsNum:number = 0;
    public totalCost:number = 0;
    public list:Set<string> = new Set<string>(); 
    public list_item:string|null = null;
    public store:StoreInventory; // composition of seperate Store Class
    

    constructor(store:StoreInventory){
        this.store = store;
    }
    
    public add(SKU:string):void|never{
        if(SKU.length !==6 || SKU !==SKU.toUpperCase())throw new InvalidSKUSequenceError(Errors.invalidSKUSequence);
        if(!this.store.contents.has(SKU)) throw new ItemNotPresentInStore(Errors.itemNotPresentInStore);
        const entry = this.store.contents.get(SKU);

        if(this.store.contents.has(SKU) && this.contents.has(entry!.name)){
            entry!.quantity++; //potential for refactor / redundant code 
            entry!.totalCost+= entry!.price; // potential for refactor /redundant code
            this.totalCost = Math.round((this.totalCost+entry!.price)*100/100);
            this.itemsNum++; // potential for refactor /redundant code
            return;
        }
        this.contents.set(entry!.name, entry as GroceryItem);
        this.list = new Set([...this.list.values(), entry!.name]!.sort()) //sorts the list into alphabetic order
        this.list_item = [...this.list].join(", ");
        this.totalCost = Math.round((this.totalCost +entry!.price)*100) /100;
        this.itemsNum++;
    }
    

}