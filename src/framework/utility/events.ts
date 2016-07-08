const __filenameS:string = __filename.slice(35);

import {Hook}           from "./Hook";
import * as exceptions  from "./exceptions";


class Events {
    
    private static _instansiated:boolean = false;
    
    private hooks:Hook;
     
    
    public constructor() {
        if (Events._instansiated) throw exceptions.exclusiveInstance;
        
        
        
        Events._instansiated = true;
    }
    
    
    public triggerEvent():void {
        
    }
    
}

