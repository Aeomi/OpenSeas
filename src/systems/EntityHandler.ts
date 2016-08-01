// Libraries
import {HashMap}                    from "typescript-stl";
// Components
import {BaseEntity}                 from "../entities/BaseEntity";
// Utility
import * as exceptions              from "../framework/utility/exceptions";
import {
    logDebugStatement, 
    logDebugIndent
}   						        from "../framework/utility/log";


class EntityHandler {

    private static _instansiated:boolean = false;
    private static _instance:EntityHandler;

    private _entityMap:HashMap<number, BaseEntity>;


    public constructor() {
        if (EntityHandler._instansiated) 
            throw exceptions.exclusiveInstance;

        this._entityMap = new HashMap<number, BaseEntity>();

        EntityHandler._instansiated = true;
    }


    public static getInstance():EntityHandler {
        if (!EntityHandler._instansiated) {
            logDebugStatement(__filename, "Lazily generating singleton instance");
            EntityHandler._instance = new EntityHandler();
        }

        return EntityHandler._instance;
    }


    // Performed upon the single instance:

    private _getEntityMap():HashMap<number, BaseEntity> {
        return this._entityMap;
    }


    private _setEntity(id:number, entity:BaseEntity):void {
        this._getEntityMap().set(id, entity);
    }


    private _getEntity(id:number):BaseEntity {
        return this._getEntityMap().get(id);
    }


    public registerEntity(entity:BaseEntity):number {
        let id:number = this._getEntityMap().size() + 0;
        this._setEntity(id, entity);

        logDebugStatement(__filename, `Entity self-registered: #${id}`);
        return id;
    }

}


export default EntityHandler;