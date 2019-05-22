import * as fileSystem from "fs-extra";

/*\
   \-----------------------------------------------------------------------------|
    | Due to underwhelming advancement thanks async-await unproductivity on node |
   /-----------------------------------------------------------------------------|
*/



//  File mutator functions



// /**
//  * Attempt to async. write <data> to file at relative path <fileName>
//  * Passes throwable node error to callback
//  */
// export function writeFile2(path:string, data:string) {
//     return new Promise(function(exec, reject) {
//         fileSystem.writeFile(path, data, () => {}, reject);
//     });
// }

// export function writeFile(path:string, data:string, callback:any):void {
//     fileSystem.writeFile(path, data, {flag : 'wx'}, callback);
// }


// /**
//  * Attempt to async. remove the file at relative path <fileName>
//  * Returns boolean on success or failure
//  */
// export function removeFile(path:string, callback:any) {
//     fileSystem.stat(path, function(error:NodeJS.ErrnoException, stats:fileSystem.Stats) {
//         if (error) throw error;
        
//         if (stats.isFile())
//             fileSystem.remove(path);
//     });
// }


// //  Folder mutator functions

// export function createDirectory(path:string, callback:any):void {

// }


// export function removeDirectory(path:string, callback:any):void {
//     fileSystem.stat(path, function(error:NodeJS.ErrnoException, stats:fileSystem.Stats) {
//         if (error) throw error;
        
//         if (stats.isDirectory())
//             fileSystem.remove(path);
//     });
// }

