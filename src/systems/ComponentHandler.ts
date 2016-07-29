// Libraries
import {HashMap}                from "typescript-stl";
// Components
import {Component, IComponent}  from "../components/Component";
// Utility
import * as exceptions          from "../framework/utility/exceptions";
import {
    logDebugStatement, 
    logDebugIndent
}   						    from "../framework/utility/log";


class ComponentHandler {

    private static _instansiated:boolean = false;
    private static _instance:ComponentHandler;

    private _componentMap:HashMap<number, IComponent>;


    public constructor() {
        if (ComponentHandler._instansiated) 
            throw exceptions.exclusiveInstance;

        this._componentMap = new HashMap<number, IComponent>();

        ComponentHandler._instansiated = true;
    }


    public static getInstance():ComponentHandler {
        if (!ComponentHandler._instansiated) {
            logDebugStatement(__filename, "Lazily generating singleton instance");
            ComponentHandler._instance = new ComponentHandler();
        }
        
        return ComponentHandler._instance;
    }


    // Performed upon the single instance:

    public getComponentMap():HashMap<number, IComponent> {
        return this._componentMap;
    }

    
    public setComponent(id:number, component:IComponent) {
        this.getComponentMap().set(id, component);
    }


    public getComponent(id:number):IComponent {
        return this.getComponentMap().get(id);
    }
    
}


export default ComponentHandler;