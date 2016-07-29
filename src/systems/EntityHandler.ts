// Libraries
import {HashMap}                from "typescript-stl";
// Components
import {Entity, IEntity}     from "../entities/Entity";
// Utility
import * as exceptions          from "../framework/utility/exceptions";
import {
    logDebugStatement, 
    logDebugIndent
}   						    from "../framework/utility/log";


class EntityHandler {

    private static _instansiated:boolean = false;
    private static _instance:EntityHandler;

    private _entityMap:HashMap<number, IEntity>;


    public constructor() {
        if (EntityHandler._instansiated) 
            throw exceptions.exclusiveInstance;

        this._entityMap = new HashMap<number, IEntity>();

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

    public getEntityMap():HashMap<number, IEntity> {
        return this._entityMap;
    }


    public setEntity(id:number, entity:IEntity) {
        this.getEntityMap().set(id, entity);
    }


    public getEntity(id:number):IEntity {
        return this.getEntityMap().get(id);
    }
    
}


export default EntityHandler;