import ComponentHandler                 from "../systems/ComponentHandler";

import {BaseComponent, IBaseComponent}  from "./BaseComponent"


// Vector2d type definition
export interface IVector2d {
    x:number;
    y:number;
}


export class Vector2d implements IVector2d {

    public x:number;
    public y:number;

    public constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

}


// Transform component
export interface ITransform {
    position:IVector2d;
    scale:IVector2d;
    angle:number;
}


export class Transform extends BaseComponent implements ITransform {

    public id:number;

    public position:IVector2d;
    public scale:IVector2d;
    public angle:number;

    public constructor(componentId:number) {
        super(componentId);

        ComponentHandler.getInstance().registerComponent(this);
    }

}