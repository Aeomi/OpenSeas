import * as exceptions 			from "./utility/exceptions";
import {Colors, logDebug, log}	from "./utility/log";
import Hook 					from "./Hook";
import * as Config				from "./utility/config"


enum PROGRAM_STATES {
	STOPPED,
//	MAIN_MENU,
	RUNNING
}


class Program {

	private static _instansiated:boolean = false;
	private static _instance:Program;
	
	public static STATES = PROGRAM_STATES;
	
	
	private _state:PROGRAM_STATES;
	
	
	public constructor() {
		if (Program._instansiated) 
			throw exceptions.exclusiveInstance;
		
		Program._instansiated = true;
	}
	

	public static getInstance():Program {
		if (!Program._instansiated) {
			if (Config.DEBUG) 
				logDebug(__filename, "Lazily generating singleton instance");
				
			Program._instance = new Program();
		}
		
		return Program._instance;
	}


	// Performed upon the single instance:

	
	public setState(state:PROGRAM_STATES):void {
		if (Config.DEBUG) 
			logDebug(__filename, `Setting Program state from ${this._state} to ${state}`);
		this._state = state;
	}
	
	
	public getState():PROGRAM_STATES {
		return this._state;
	}

	public init():void {
		if (Config.DEBUG) logDebug(__filename, "Program initialising");
		
		// Initialise sub-systems
		Hook.getInstance().setHook("ProgramInit", "test", function() {
			console.log("Program init!")
		});
		Hook.getInstance().triggerEvent("ProgramInit");
	}


	public run():void {
		if (Config.DEBUG) logDebug(__filename, "Program running");
		
		this.setState(PROGRAM_STATES.RUNNING);
		
		while (this.getState())
			this.update();
	}
	
	
	public quit():void {
		if (Config.DEBUG) logDebug(__filename, "Program quitting");
		
	}
	
	
	public update():void {
		
	}

}


export default Program;