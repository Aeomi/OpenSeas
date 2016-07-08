const __filenameS:string = __filename.slice(35);
import {isValid} 	from "./validate";
import * as config 	from "./config";
import {Colors, log} from "./log"


export class Hook {
	
	private callbacks:any;
	
	public constructor() {
		this.callbacks = {};
	}
	
	public setHook(eventName:string, hookUId:string, callback:Function):void {
		if (config.DEBUG)
			log(Colors.debug, `[${__filenameS}]\tSetting hook ${hookUId} on ${eventName}`);
		
		if (!isValid(this.callbacks[eventName]))
			this.callbacks[eventName] = {};
		
		this.callbacks[eventName][hookUId] = callback;
	}
	
	public removeHook(eventName:string, hookUId:string):void {
		if (config.DEBUG)
			log(Colors.debug, `[${__filenameS}]\tRemoving hook ${hookUId} from ${eventName}`);
		
		delete this.callbacks[eventName][hookUId];
	}
	
	public triggerEvent(eventName:string):void {
		if (config.DEBUG) 
			log(Colors.debug, `[${__filenameS}]\tTriggering all callbacks on ${eventName} event`);
		
		let callbacks:Function = this.callbacks[eventName];
		
		for (let hookUId in callbacks)
			if (callbacks.hasOwnProperty(hookUId))
				callbacks[hookUId]();
	}
	
}
