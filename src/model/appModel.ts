import {
    action,
    thunk,
    Thunk,
    Action,
    ActionOn,
    thunkOn,
    ThunkOn,
    debug,
    actionOn,
  } from "easy-peasy";
  /**
   * Core app model
   * @param
   */
  export interface AppDataModel {
    //state
    availableSounds: any[];
    //requests
    //loaders
    //listeners
    //managers
    //simple setters
    //listeners
    //clear
    // clearLocalLayouts: Action<AppDataModel>;
  
    //local storage
    // saveLayoutLocal: Thunk<AppDataModel>;
  }
  
  const appModel: AppDataModel = {
    //state
    availableSounds: [],
    //managers
    /**Control side effects for altering the view state of the app, and dispatch a setter for the state */
    //listeners
  };
  
  export default appModel;
  