import * as express     from "express";
import * as http        from "http";
import * as bodyParser  from "body-parser";
import * as SocketIO    from "socket.io";


// Configuration
const PORT_NUMBER:number = process.env.PORT || 8080;
const DEBUG_ENABLED:boolean = true;

const app = express();
const server:http.Server = http.createServer(app);
const io = SocketIO.listen(server);


// Set up Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

// Set up server listening on port
app.listen(8000);
server.listen(PORT_NUMBER, function() {
	console.log("Server started: listening on port " + PORT_NUMBER);
});




//  Define entry point

function main():void {
    
    //  Create an instance of Framework/Program.
            //  Init & Run Program
    console.log("Hello serverside");
    
}

main();