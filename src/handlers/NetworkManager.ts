import * as exceptions 	from "../framework/utility/exceptions";
import {Map, IMap} 		from "../framework/utility/Map";
import {Hook}			from "../framework/utility/Hook";


class NetworkManager {
	
	private static _instansiated:boolean = false;
	
	private _hooks:Hook;
	
	
	public constructor() {
		if (NetworkManager._instansiated)
			throw exceptions.exclusiveInstance;
		
		this._hooks = new Hook();
		
		NetworkManager._instansiated = true;
	}
	
	
	public getHooks():Hook {
		return this._hooks;
	}
	
}


export default NetworkManager;