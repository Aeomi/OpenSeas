
export interface IEntity {
    setId(id:number):void;
    getId():number;
}


export abstract class Entity implements IEntity {

    private _id:number;


    public constructor(entityId:number) {
        this.setId(entityId);
    }


    public setId(id:number):void {
        this._id = id;
    }


    public getId():number {
        return this._id;
    }

}