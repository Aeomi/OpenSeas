import {BaseEntity}     from "../BaseEntity"
import ComponentHandler from "../../systems/ComponentHandler"

// Components
import {Transform}      from "../../components/Transform"


export class Frame extends BaseEntity {

    public constructor() {
        super();

        let id:number = this._getId();

        ComponentHandler.getInstance().registerComponent(new Transform(id));
    }

}