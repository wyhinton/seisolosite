import { action, Action, thunk, Thunk, thunkOn, ThunkOn } from "easy-peasy";
import History from "@classes/History";
import { Layouts } from "react-grid-layout";
import WaveFormBuilder from "@classes/WaveFormBuilder";
import SampleData from "@classes/SampleData";
import placeHolderSamples from "@static/placeHolderSamples"
import { StoreModel } from "model";
import WaveformData from "waveform-data";

export interface SamplesModel{
    //state
    samples: SampleData[],
    //thunks

    //simple setters
    setSamples: Action<SamplesModel, SampleData[]>
    //proccessing
    processSamples: Thunk<SamplesModel, never, StoreModel>
}

const samplesModel: SamplesModel = {
    //state
    samples: placeHolderSamples,
    //processing
    processSamples: thunk((actions, _, {getState})=>{
        console.log("processing samples")
        const state = getState()
        const { samples }  = {...state}
        console.log(samples)
        const processor = new WaveFormBuilder()
        const processedSamples = samples.map(s=>processor.generateSVG(s))
        Promise.allSettled(processedSamples).then(results=>{
            const succesfulAnalaysisSamples: SampleData[] = [];
            for (const result of results) {
                if (result.status === "fulfilled"){
                    succesfulAnalaysisSamples.push(result.value)
                }
            }
            actions.setSamples(succesfulAnalaysisSamples)
        })
        console.log(processedSamples);
    }),
    //simple setters
    setSamples: action((state, samplesArray) => {
        console.log("setting samples")
        state.samples = samplesArray;
        // state.tempLayout = layouts;
    }),
}

export default samplesModel