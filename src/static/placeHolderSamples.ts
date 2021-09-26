import SampleData from "@classes/SampleData"
import {randomElements} from "@utils"
import tags from "./tags";

const placeHolderSamplePaths = ["DNB_BREAK_134-1.wav", "Samples/s1.wav"]
const recitalrecordings = ["RECORDINGS/Bach Move 2 v2.wav", "RECORDINGS/Bach Move 3 v2.wav"]


const makeDefaultSamples = (count: number): SampleData[] =>{
    const defaultSamples: SampleData[] = [];
    // const defaultUrl = `${process.env.PUBLIC_URL}/Samples/s1.wav`
    // const defaultUrl = `${process.env.PUBLIC_URL}/DNB_BREAK_134-1.wav`
    const defaultStartTime = new Date("1995-12-17T03:24:00")
    const defaultEndTime = new Date("1995-12-17T03:24:01")
    // console.log(defaultStartTime);
    // console.log(defaultEndTime);

    for (let i = 0; i < count; i++) {
        const tagNames = randomElements(tags, 3)
        const sampleUrl = `${process.env.PUBLIC_URL}/`+randomElements(placeHolderSamplePaths, 1)[0]
        const sampleD = new SampleData(`placeHolderSample_${i}`, sampleUrl, tagNames, defaultStartTime, defaultEndTime, "Bartok Movement 1")
        defaultSamples.push(sampleD)
    }
    return defaultSamples
}

const placeHolderSamples = makeDefaultSamples(30)

export default placeHolderSamples