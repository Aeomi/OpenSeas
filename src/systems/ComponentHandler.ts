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


    // Performed on the single instance


    private _getComponentListsMap():ComponentListsMap {
        return this._componentListsMap;
    }


    private _getComponentList(componentClass:string):ComponentList {
        return this._getComponentListsMap().get(componentClass);
    }


    private _createComponentList(componentClass:string) {
        let emptyComponentList = new std.HashMap<number, IBaseComponent>();
        this._getComponentListsMap().set(componentClass, emptyComponentList)
    }


    private _componentClassExists(componentClass:string):boolean {
        return this._getComponentListsMap().has(componentClass);
    }


    private _getComponent(componentClass:string, id:number):IBaseComponent {
        return this._getComponentList(componentClass).get(id);
    }


    private _setComponent(componentClass:string, id:number, component:IBaseComponent):void {
        // Ensure the componentList exists
        if (!this._componentClassExists(componentClass))
            this._createComponentList(componentClass);

        this._getComponentList(componentClass).set(id, component);
    }


    // For components to request self-registration
    public registerComponent(componentClass:string, component:IBaseComponent):void {
        let id:number = component.getId();
        this._setComponent(componentClass, id, component);
        
        logDebugStatement(__filename, `A ${componentClass} component was registered to entity: #${id}`);
    }

}


export default ComponentHandler;