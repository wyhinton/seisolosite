import SampleData from "@classes/SampleData"
import RawSampleRow from "@interfaces/RawSampleRow";
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


    for (let i = 0; i < count; i++) {
        const sampleUrl = `${process.env.PUBLIC_URL}/`+randomElements(placeHolderSamplePaths, 1)[0]
        const basicRow: RawSampleRow = {
            composition:`placeHolderSample_${i}`,
            starTime: "1995-12-17T03:24:00",
            endTime: "1995-12-17T03:24:01",
            tags: "MR, FD",
            date: "2021-09-24",
            hour: "222332",
            svgPath: "",
            length: 1.0,
            filename: sampleUrl
        }
        const tagNames = randomElements(tags, 3)

        const sampleD = new SampleData(basicRow)
        defaultSamples.push(sampleD)
    }
    return defaultSamples
}

const placeHolderSamples = makeDefaultSamples(30)

export default placeHolderSamples