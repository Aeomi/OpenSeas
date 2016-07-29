
export interface IComponent {
    setId(id:number):void;
    getId():number;
}


export abstract class Component implements IComponent {

    private _id:number;


    public constructor(componentId:number) {
        this.setId(componentId);
    }


    public setId(id:number):void {
        this._id = id;
    }


    public getId():number {
        return this._id;
    }

}