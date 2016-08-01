import EntityHandler from "../systems/EntityHandler"


// export interface IBaseEntity {
//     setId(id:number):void;
//     getId():number;
// }


export abstract class BaseEntity { // implements IBaseEntity {

    private _id:number;


    public constructor() {
        // Register the entity to the EntityHandler for handling!
        let id:number = EntityHandler.getInstance().registerEntity(this);
        this._setId(id);
    }


    protected _setId(id:number):void {
        this._id = id;
    }


    protected _getId():number {
        return this._id;
    }

}