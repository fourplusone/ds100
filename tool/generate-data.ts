import { Parser } from 'csv-parse';
import { createReadStream, createWriteStream } from 'fs';
import { CSVStationTransform, StationCodeTransform } from '../lib/transforms'
import 'process';

const parser = new Parser({delimiter: ";"});
const inputStream = createReadStream(process.argv[2]);
const outputStream = createWriteStream(process.argv[3]);

inputStream
    .pipe(parser)
    .pipe(new CSVStationTransform())
    .pipe(new StationCodeTransform())
    .pipe(outputStream);


