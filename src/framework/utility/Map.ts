import {isValid} from "./validate";


export interface IMap<T> {
	// private | _keys:string[];
	// private | _values:Array<T>;
	
	getKeys():string[];
	getValues():Array<T>;
	
	get(key:string):T;
	set(key:string, value:T):void;
	remove(key:string):void;
	containsKey(key:string):boolean;
}


export class Map<T> implements IMap<T> {
	
	private _keys:string[] = new Array<string>();
	private _values:T[]  = new Array<T>();
	
	
	public constructor(initObj?:any) {
		if (isValid(initObj)) {
			
			let initKeys = Object.keys(initObj);
			
			for (let i = 0; i < initKeys.length; i++) {
				let key:string = initKeys[i];
				let value:T = initObj[key];
				
				this.set(key, value);
			}
			
		}
	}
    
	
	public set(key:string, value:T):void {
		// Expose key:value pair on the object
        this[key] = value;
        
		this._keys.push(key);
		this._values.push(value);
	}
	
    
	public get(key:string):T {
		return this[key];
	}
	
	
	public remove(key:string):void {
		let index = this._keys.indexOf(key, 0);
		this._keys.splice(index, 1);
		this._values.splice(index, 1);
		
		delete this[key];
	}
	
    
	public getKeys():string[] {
		return this._keys;
	}
	
    
	public getValues():Array<T> {
		return this._values;
	}
    
	
	public containsKey(key:string):boolean {
		return isValid(this[key]);
	}
	
}