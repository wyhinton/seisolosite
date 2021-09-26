import appData, { AppDataModel } from "./appModel";
import historyData, { HistoryModel } from "./historyModel";
import layoutsModel, { LayoutsModel } from "./layoutsModel";
import googleSheetsModel, { GoogleSheetsModel } from "./googleSheetsModel";
import samplesModel, { SamplesModel } from "./samplesModel";
import compositonsModel, {CompositionsModel} from "./🎻compositionsModel";
// https://codesandbox.io/s/easy-peasy-typescript-v3-riqbl?file=/src/model/todos.ts

export interface StoreModel {
  appModel: AppDataModel;
  historyModel: HistoryModel;
  layoutsModel: LayoutsModel;
  googleSheetsModel: GoogleSheetsModel;
  samplesModel: SamplesModel; 
  compositionsModel: CompositionsModel;
}

const model: StoreModel = {
  appModel: appData,
  historyModel: historyData,
  layoutsModel: layoutsModel,
  googleSheetsModel: googleSheetsModel,
  samplesModel: samplesModel,
  compositionsModel: compositonsModel
};

export default model;
