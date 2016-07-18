import * as exceptions      from "../framework/utility/exceptions";
import {isValid} 	    	from "../framework/utility/validate";
import * as config 	    	from "../framework/utility/config";
import {Colors, logDebug}   from "../framework/utility/log";
import {Map, IMap}    		from "../framework/utility/Map";

//  TODO: convert from any to map

/*
callbacks = {
	eventName = {
		hookUId = function(){...}
	}
}

callbacks = Map<(Map<string>)>
eventName = Map<string>

*/


class Hook {

	private static _instansiated:boolean = false;
	private static _instance:Hook;
	
	private callbacks:IMap< Map<string> >;
	
	
	public constructor() {
		if (Hook._instansiated) 
			throw exceptions.exclusiveInstance;
		
		this.callbacks = new Map<Map<string>>();
		
		Hook._instansiated = true;
	}
	

	public static getInstance():Hook {
		if (!Hook._instansiated) {
			if (config.DEBUG) 
				logDebug(__filename, "Lazily generating singleton instance");
				
			Hook._instance = new Hook();
		}
		
		return Hook._instance;
	}


	// Performed upon the single instance:

	public setHook(eventName:string, hookUId:string, callback:Function):void {
		if (config.DEBUG) logDebug(__dirname, `Setting hook ${hookUId} on ${eventName}`);
		
		//  If the event currently isn't registered then register it
		if (!isValid(this.callbacks[eventName]))
			this.callbacks[eventName] = {};
		
		//  Now that the event is registered, we can set the callback value to a unique key within the 
		//      event map
		this.callbacks[eventName][hookUId] = callback;      
	}
	
	
	public removeHook(eventName:string, hookUId:string):void {
		if (config.DEBUG) logDebug(__dirname, `Removing hook ${hookUId} from ${eventName}`);
		
		// Attempt to remove a hook regardless of whether the event or hook exists
		delete this.callbacks[eventName][hookUId];
	}
	
	
	public triggerEvent(eventName:string):void {
		if (config.DEBUG) logDebug(__dirname, `Triggering all callbacks on ${eventName} event`);
		
		// Attempt to gather the hooks under a given event
		let callbacks:any = this.callbacks[eventName];
		
		for (let hookUId in callbacks)
			if (callbacks.hasOwnProperty(hookUId))
				callbacks[hookUId]();
	}
	

}

export default Hook;