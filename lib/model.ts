
export class Station {
    constructor(
        public readonly ds100: string,
        public readonly shortName: string,
        public readonly longName: string,
        public readonly uic: number,
        public readonly fplrel: boolean
    ){};
}