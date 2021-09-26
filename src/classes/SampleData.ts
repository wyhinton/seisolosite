import { CompositionTitle } from "./🎻CompositionData";

class SampleData {
    id!: string;
    src!: string;
    tags!: string[]; 
    path!: string;
    composition: CompositionTitle;
    startTime: Date;
    endTime: Date;

    constructor(id: string, src: string, tags: string[], startTime: Date, endTime: Date, composition: CompositionTitle) {
        this.id = id
        this.src = src
        this.tags = tags
        this.path = ""
        this.startTime = startTime
        this.endTime = endTime
        this.composition =  composition
    }
    
    setPath = (path: string): void =>{
        this.path = path
    }
}
export default SampleData;