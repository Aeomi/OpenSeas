import * as exceptions      from "../framework/utility/exceptions";
import {isValid} 	    	from "../framework/utility/validate";
import {
    logDebugStatement, 
    logDebugIndent
}   						from "../framework/utility/log";
import {Map, IMap}    		from "../framework/utility/Map";


/*
    callbacks = {
        eventName = {
            hookUId = function(){...}
        }
    }

    callbacks = Map<Map<string>>
    eventName = Map<string>

    eventHooks = Map< Map<Function[]> >
    event = Map<Function>
*/


class HookHandler {

    private static _instansiated:boolean = false;
    private static _instance:HookHandler;
    
    private eventHooks:Map<Map<Function>>;
    
    
    public constructor() {
        if (HookHandler._instansiated) 
            throw exceptions.exclusiveInstance;
        
        this.eventHooks = new Map<Map<Function>>();
        
        HookHandler._instansiated = true;
    }
    

    public static getInstance():HookHandler {
        if (!HookHandler._instansiated) {
            
                logDebugStatement(__filename, "Lazily generating singleton instance");
                
            HookHandler._instance = new HookHandler();
        }
        
        return HookHandler._instance;
    }


    // Performed upon the single instance:
    

    public setHook(eventName:string, hookUId:string, callback:Function):void {
        logDebugStatement(__filename, `Setting hook ${hookUId} on ${eventName}`);
        
        //  If the event currently isn't registered then register it
        if (!this.eventHooks.containsKey(eventName))
            this.createEvent(eventName);
        
        // Event is 100% registered, let's add a hook under the event
        this.eventHooks.get(eventName).set(hookUId, callback);
    }
    
    
    public removeHook(eventName:string, hookUId:string):void {
        
        logDebugStatement(__filename, `Attempting to emoving hook ${hookUId} from ${eventName}`);
        
        if (this.eventHooks.containsKey(eventName)) {
            
            this.eventHooks.get(eventName).remove(hookUId);
            
            logDebugIndent(`Hook removed`);
            
        } else {
            logDebugIndent(`Hook does not exist`);
        }
    }
    
    
    public createEvent(eventName:string) {
        this.eventHooks.set(eventName, new Map<Function>());
    }
    
    
    /**
     * Trigger an engine event (should be used statically)
     * @eventName The name of the event (document on http://github.com/Aeomi/OpenSeas/wiki/Hooks)
     */
    public triggerEvent(eventName:string, ...args:any[]):void {
        
        if (!eventName.toLowerCase().endsWith("update")) {   // Do not debug any events ending in "update"
            logDebugStatement(__filename, `Attempting to trigger all callbacks on ${eventName} event`);
        }
        
        // Attempt to gather the hooks under a given event
        if (this.eventHooks.containsKey(eventName)) {
            
            let callbacks:Map<Function> = this.eventHooks.get(eventName);
            
            // If there are any hooks then run them with the supplied arguments
            for (let hookUIdIter in callbacks.getKeys()) {
                let hookUId = callbacks.getKeys()[hookUIdIter];
                
                logDebugIndent(`Calling hook callback for ${hookUId}`);
                
                callbacks.get(hookUId)(...args);
            }
            
            
        }
        
    }
    
    
    public getHooks(eventName:string):IMap<Function> {
        return this.eventHooks.get(eventName);
    }

}

export default HookHandler;