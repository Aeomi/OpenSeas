import * as exceptions 	from "./utility/exceptions";
import {
    Colors, 
    logDebugStatement,	
    log
}						from "./utility/log";
import Hook 			from "../systems/HookSystem";


enum ENGINE_STATES {
    STOPPED,
    // MAIN_MENU,
    RUNNING
}


class Engine {

    private static _instansiated:boolean = false;
    private static _instance:Engine;
    
    public static STATES = ENGINE_STATES;
    
    
    private _state:ENGINE_STATES;
    
    
    public constructor() {
        if (Engine._instansiated) 
            throw exceptions.exclusiveInstance;
        
        Engine._instansiated = true;
    }
    
    
    public static getInstance():Engine {
        if (!Engine._instansiated) {
            logDebugStatement(__filename, "Lazily generating singleton instance");
            
            Engine._instance = new Engine();
        }
        
        return Engine._instance;
    }


    // Performed upon the single instance:

    
    public setState(state:ENGINE_STATES):void {
        logDebugStatement(__filename, `Setting Engine state from ${this._state} to ${state}`);
        this._state = state;
        
        Hook.getInstance().triggerEvent("EngineStateChange", this.getState(), state);
    }
    
    
    public getState():ENGINE_STATES {
        return this._state;
    }


    public initialise():void {
        logDebugStatement(__filename, "Engine initialising");
        
        Hook.getInstance().triggerEvent("EngineInit");
        
        // Initialise sub-systems
        // ----
    }


    public run():void {
        logDebugStatement(__filename, "Engine running");
        
        this.setState(ENGINE_STATES.RUNNING);
        
        while (this.getState())
            this.update();
    }
    
    
    public quit():void {
        logDebugStatement(__filename, "Engine quitting");
        Hook.getInstance().triggerEvent("EngineQuitting");
    }
    
    
    public update():void {
        Hook.getInstance().triggerEvent("EngineUpdate");
    }

}


export default Engine;