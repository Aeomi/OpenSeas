const __filenameS:string = __filename.slice(35);
import NetworkHandler 	from "../handlers/NetworkManager";

import * as exceptions 	from "./utility/exceptions";
import {Colors, log}	from "./utility/log";
import {Hook} 			from "./utility/Hook";


class Program {

	private static _instansiated:boolean = false;

	private _networkhandler:NetworkHandler
	private _hooks:Hook;

	public constructor() {
		if (Program._instansiated) throw exceptions.exclusiveInstance;
		
		this._hooks = new Hook();
		
		Program._instansiated = true;
	}


	public init():void {
		
		// Define handlers
		this._networkhandler = new NetworkHandler();
		
		
		// Set up initialising hooks
		this._hooks.setHook("ProgramInitialise", 'Initialise', function() {
			log(Colors.aos, "[AOS/Program] ",
				Colors.text, "Program initialised."
			);
		});
		
		
		// Trigger initialise event
		this._hooks.triggerEvent("ProgramInitialise");
		
		
		// Send the game version to the client
		// ...

	}


	public run():void {

	}
	
	
	public getHooks():Hook {
		return this._hooks;
	}

}


export default Program;