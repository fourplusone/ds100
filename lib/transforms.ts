import { Transform } from "stream";
import { Station } from "./model";

export class CSVStationTransform extends Transform {
    private isFirstRow = true;

    constructor() {
        super({
            objectMode: true,
  
            transform(chunk: Array<string>, _encoding, callback) {
                const self = this as CSVStationTransform;

                if (self.isFirstRow) {
                    self.isFirstRow = false
                    return callback(undefined, undefined);
                }

                const fplrel = chunk[11].toUpperCase() === 'J';
        
                // Push the data onto the readable queue.
                callback(undefined, new Station(
                    chunk[0], 
                    chunk[1], 
                    chunk[2], 
                    parseInt(chunk[6],10),
                    fplrel)
                );
            }
        });
    }
}


/* Tranfroms the the list of stations into a TS Module*/
export class StationCodeTransform extends Transform {
    private isFirstChunk = true;
    private prepend = 'import { Station } from \'../lib/model\';\n\n export const stations : Array<Station> = [\n';

    constructor() {
        super({
            objectMode: true,
            transform(chunk: Station, _encoding, callback) {
                const self = this as StationCodeTransform;
                let prepend = '';

                if (self.isFirstChunk) {
                    prepend = self.prepend;
                    self.isFirstChunk = false;
                } 

                callback(undefined, prepend + JSON.stringify(chunk) + ' as Station,\n')
            },
        
            flush (callback){
                callback(undefined, "];")
            }
        })
    }
}