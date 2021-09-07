import appData, { AppDataModel } from "./appModel";

// https://codesandbox.io/s/easy-peasy-typescript-v3-riqbl?file=/src/model/todos.ts

export interface StoreModel {
  appModel: AppDataModel;
}

const model: StoreModel = {
  appModel: appData,
};

export default model;
