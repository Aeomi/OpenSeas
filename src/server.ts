import * as express     from "express";
import * as http        from "http";
import * as bodyParser  from "body-parser";
import * as SocketIO    from "socket.io";
import * as fileSystem  from "fs";

//TODO: Figure out how to import this via ES2015
let tc = require("colors/safe");


/* -----------------------------------------
|	Express server configuration and setup
| ----------------------------------------- */

const PORT_NUMBER:number = process.env.PORT || 8080;
const DEBUG_ENABLED:boolean = true;

const PACKAGE_JSON:any = JSON.parse(fileSystem.readFileSync("../package.json", 'utf8'));
const AOS_VERSION = PACKAGE_JSON.version; //TODO: Send the version to the client
	//have the client display it in the page title
const AOS_BUILD = PACKAGE_JSON.build;

const app:express.Application = express();
const server:http.Server = http.createServer(<any>app);

//TODO: create a module for logging framework/utility/log.ts
//	Set up custom colors.js theme for logging
tc.setTheme({
	aos: 'bold',
	error: 'red',
	title: 'magenta',
	indent: 'grey'
});


/* ---------------------
|	Set up middleware
| --------------------- */

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));


/* -----------------------
|	Bind server to port
| ----------------------- */

const io = SocketIO.listen(server);
server.listen(PORT_NUMBER, function() {
	console.log(tc.aos("[AOS]") + " Server bound to port: " + PORT_NUMBER);
});


/* -----------------------
|	Define entry point
| ----------------------- */

function main():void {
	
	//TODO:
		//  Create an instance of Framework/Program.
			//	Init & Run Program
	let startupMessage:string = (
		tc.aos("\n\n[AOS] ") +
		tc.title("Initialising AOS serverside framework...\n") +
		tc.indent(`\t- AOS version:\t${AOS_VERSION}\n`) +
		tc.indent(`\t- AOS build:\t${AOS_BUILD}\n`)
	);
	
	console.log(startupMessage);
	
}

main();