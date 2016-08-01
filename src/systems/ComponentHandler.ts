// Libraries
import * as std                         from "typescript-stl";
// Components
import {BaseComponent, IBaseComponent}  from "../components/BaseComponent";
// Utility
import * as exceptions                  from "../framework/utility/exceptions";
import {
    logDebugStatement, 
    logDebugIndent
}   						            from "../framework/utility/log";

// Locally typedef long hashmap templatic type
type ComponentList      = std.HashMap<number, IBaseComponent>;
type ComponentListsMap  = std.HashMap<string, ComponentList>;
s

class ComponentHandler {

    private static _instansiated:boolean = false;
    private static _instance:ComponentHandler;

    //private _componentMap:std.HashMultiMap<number, IBaseComponent>;
    private _componentListsMap:ComponentListsMap;


    public constructor() {
        if (ComponentHandler._instansiated) 
            throw exceptions.exclusiveInstance;

        this._componentListsMap = new std.HashMap<string, std.HashMap<number, IBaseComponent>>();

        ComponentHandler._instansiated = true;
    }


    public static getInstance():ComponentHandler {
        if (!ComponentHandler._instansiated) {
            logDebugStatement(__filename, "Lazily generating singleton instance");
            ComponentHandler._instance = new ComponentHandler();
        }
        
        return ComponentHandler._instance;
    }


    private _getComponentMap():ComponentListsMap {
        return this._componentListsMap;
    }


    private _setComponent(componentClass:string, id:number, component:IBaseComponent):void {
        

        this._getComponentMap().set(componentClass, )
    }


    private _getComponent(componentType:string, id:number):IBaseComponent {
        return this._getComponentMap().get(componentType).get(id);
    }

    // For components to request self-registration
    public registerComponent(component:IBaseComponent):void {
        let id:number = component.getId();
        this._setComponent(id, component);
        
        logDebugStatement(__filename, `Component was registered to entity: #${id}`);
    }

}


export default ComponentHandler;