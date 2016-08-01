import * as colorjs     from "colors";

import * as config      from "./config";
import * as file		from "./file";



interface TermColors {
    title:string;
    text:string,
    indent:string;
    aos:string;
    error:string;
    debug:string;
}


export const Colors:TermColors = {
    title   : 'magenta',
    text    : 'white',
    indent  : 'grey',
    aos     : 'bold',
    error   : 'red',
    debug   : 'yellow'
};

colorjs.setTheme(Colors);


/**
 * Log to the console.
 */
export function log(...colorTextPairs:Array<any>):void {
    
    if (colorTextPairs.length % 2 != 0)
        throw new Error("Called log with non-even number of arguments");
    
    let result:string = "";

    for (let i:number = 0; i < colorTextPairs.length; i += 2) {
        const color = colorTextPairs[i];
        const text:string = colorTextPairs[i + 1];
        
        result += colorjs[color](text);
    }

    console.log(result);
}


/*
 *  Helper function for debug logging
 *  Logs to console IF debugging is enabled
 *  Debug mode check is done here for decoupling 
 *      any part of the engine from the debug config option
 */
export function logDebugStatement(fileName:string, text:string) {
    let slicedFileName:string = fileName.slice(40);
    
    if (config.DEBUG_TO_TERMINAL) {
        log(Colors.debug, `\n[${slicedFileName}]\n\t${text}`);
    }
    
    if (config.DEBUG_TO_FILE) {
    
    }
}


export function logDebugIndent(text:string) {
    if (config.DEBUG_TO_TERMINAL) {
        log(Colors.debug, `\t\t${text}`);
    }
    
    if (config.DEBUG_TO_FILE) {
    }
}