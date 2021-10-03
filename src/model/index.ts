import appData, { AppDataModel } from "./appModel";
import compositonsModel, {CompositionsModel} from "./🎻compositionsModel";
import googleSheetsModel, { GoogleSheetsModel } from "./googleSheetsModel";
import historyData, { HistoryModel } from "./historyModel";
import layoutsModel, { LayoutsModel } from "./layoutsModel";
import logModel, {LogModel} from "./logModel";
import samplesModel, { SamplesModel } from "./samplesModel";

// https://codesandbox.io/s/easy-peasy-typescript-v3-riqbl?file=/src/model/todos.ts

export interface StoreModel {
  appModel: AppDataModel;
  historyModel: HistoryModel;
  layoutsModel: LayoutsModel;
  googleSheetsModel: GoogleSheetsModel;
  samplesModel: SamplesModel; 
  compositionsModel: CompositionsModel;
  logModel: LogModel;
}

const model: StoreModel = {
  appModel: appData,
  historyModel: historyData,
  layoutsModel: layoutsModel,
  googleSheetsModel: googleSheetsModel,
  samplesModel: samplesModel,
  compositionsModel: compositonsModel,
  logModel: logModel, 
};

export default model;
