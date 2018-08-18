import { stations } from './gen/data';
import { Station } from './lib/model';

let map_data = stations.map((s) => [s.ds100, s]) as [string, Station][];

export const ds100_codes = new Map<string, Station>(map_data);
export default stations;