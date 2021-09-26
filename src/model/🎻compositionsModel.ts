


import { action, Action, thunk, Thunk, thunkOn, ThunkOn } from "easy-peasy";
import History from "@classes/History";
import { Layouts } from "react-grid-layout";
import WaveFormBuilder from "@classes/WaveFormBuilder";
import SampleData from "@classes/SampleData";
import placeHolderSamples from "@static/placeHolderSamples"
import { StoreModel } from "model";
import WaveformData from "waveform-data";
import CompositionData from "@classes/🎻CompositionData";
import defaultCompositions from "@static/defaultCompositions";
import FileSaver from "file-saver"
import Papa from "papaparse"
import { RawCompositionRow } from "@interfaces/RawCompositionRow";

export interface CompositionsModel{
    //state
    compositions: CompositionData[],
    //thunks
    //simple setters
    setCompositions: Action<CompositionsModel, CompositionData[]>
    //proccessing
    processCompositions: Thunk<CompositionsModel, never, StoreModel>
    downloadAnalysis: Action<CompositionsModel>
}


const compositionsModel: CompositionsModel = {
    //state
    compositions: defaultCompositions,
    //processing
    processCompositions: thunk((actions, _, {getState})=>{
        console.log("processing compositions")
        const state = getState()
        const { compositions: compositions }  = {...state}

        console.log(compositions)
        const processor = new WaveFormBuilder()

        //TODO: ERROR HANDLING
        const analysisResults = compositions.map(c=>processor.getAudio(c.url))
        
        // const waveformData = processor.getAudio()
        // const processedCompositions = compositions.map(composition=>composition.buildWaveform());
        Promise.allSettled(analysisResults).then(results=>{
            const succesfulAnalaysisCompositions: CompositionData[] = [];
            for (let index = 0; index < results.length; index++) {
                const result = results[index];
                const compClone = [...compositions]
                const comp = compClone[index]   
                console.log(result);
                if (result.status == "fulfilled"){
                    comp.waveFormData = result.value 
                    succesfulAnalaysisCompositions.push(comp)
                }
            }
            console.log("SETTINGS COMPOSITOINS");
            console.log(succesfulAnalaysisCompositions);
            actions.setCompositions(succesfulAnalaysisCompositions)
            actions.downloadAnalysis()
        })
        // console.log(processedCompositions);
    }),
    //simple setters
    setCompositions: action((state, samplesArray) => {
        console.log("setting samples")
        state.compositions = samplesArray;
        // state.tempLayout = layouts;
      }),
    downloadAnalysis: action((state)=>{
        console.log(state.compositions[0].waveFormData.toJSON().data);
        const rows: RawCompositionRow[] = state.compositions.map(c=>({title: c.title, url: c.url , data: JSON.stringify(c.waveFormData)}))
        const csv = Papa.unparse(rows)
        console.log(rows[0].data.length);
        
        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        // FileSaver.saveAs(csvData, "test.csv")
    })
}

export default compositionsModel

