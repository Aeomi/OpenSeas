import * as express     from "express";
import * as http        from "http";
import * as bodyParser  from "body-parser";
import * as SocketIO    from "socket.io";
import * as fileSystem  from "fs";
import {log, Colors}	from "./framework/utility/log";


/* -----------------------------------------
|	Express server configuration and setup
| ----------------------------------------- */

const PORT_NUMBER:number 	= process.env.PORT || 8080;
const DEBUG_ENABLED:boolean = true;

const PACKAGE_JSON:any 	 = JSON.parse(fileSystem.readFileSync("../package.json", 'utf8'));
const AOS_VERSION:string = PACKAGE_JSON.version; //TODO: Send the version to the client
	//have the client display it in the page title
const AOS_BUILD:string	 = PACKAGE_JSON.build;

const app:express.Application = express();
const server:http.Server 	  = http.createServer(<any>app);


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
	log(
		Colors.aos, "[AOS] ", 
		Colors.text, `Server bound to port: ${PORT_NUMBER}`
	);
});


/* -----------------------
|	Define entry point
| ----------------------- */

function main():void {
	
	//TODO: Create an instance of Framework/Program
			//	Init & Run Program
	
	log(
		Colors.aos, 	"\n\n[AOS] ",
		Colors.title, 	"Initialising AOS serverside framework...\n",
		Colors.indent, 	`\t- AOS version:\t${AOS_VERSION}\n`,
		Colors.indent, 	`\t- AOS build:\t${AOS_BUILD}\n`
	);
	
}

main();