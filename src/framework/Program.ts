import * as exceptions from "./utility/exceptions";


class Program {

	private static _instansiated:boolean = false;


	public constructor() {
		if (Program._instansiated) throw exceptions.exclusiveInstance;
		Program._instansiated = true;
	}


	public init():void {
		// Send the game version to the client
	}


	public run():void {
		
	}

}


export default Program;