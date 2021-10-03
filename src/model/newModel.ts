import { action, Action, thunk, Thunk } from "easy-peasy";
import { StoreModel } from "./index";

export interface newModel{
  //state
  data: string[]

  //requests

  //setter
  setData: Action<newModel, string[]>

}

const newModel: newModel= {
    //state
    data: [],
    
    //requests

    //setters
    setData: action((state, data) => {
    state.data = data
  }),
};

export default newModel;


