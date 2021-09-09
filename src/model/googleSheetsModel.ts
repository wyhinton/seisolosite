import { action, Action, thunk, Thunk } from "easy-peasy";
import type GoogleSheet from "../interfaces/GoogleSheet";
import type RawCardRow from "../interfaces/RawCardRow";
import type RawLayoutRow from "../interfaces/RawLayoutRow";
import cardDataSheetKey from "@static/cardDataSheetKey";
import layoutsGoogleSheetKey from "@static/layoutsGoogleSheetKey";
import GoogleSheetData from "@classes/GoogleSheetData";

type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

export interface GoogleSheetsModel {
  //state
  appGoogleSheet: GoogleSheetData | undefined;
  cardDataGoogleSheet: RawCardRow[] | null;
  // cardDataGoogleSheet: GoogleSheet<RawCardRow> | null;
  layoutDataGoogleSheet: GoogleSheet<RawLayoutRow> | null;

  //requests
  fetchAppGoogleSheet: Thunk<GoogleSheetsModel>;
  // fetchLayoutDataGoogleSheet: Thunk<GoogleSheetsModel>;

  //setters
  setAppGoogleSheetData: Action<GoogleSheetsModel, GoogleSheetData>;
  setCardDataGoogleSheet: Action<GoogleSheetsModel, RawCardRow[]>;
  // setCardDataGoogleSheet: Action<GoogleSheetsModel, GoogleSheet<RawCardRow>>;
  setLayoutDataGoogleSheet: Action<
    GoogleSheetsModel,
    GoogleSheet<RawLayoutRow>
  >;
}
/**
 * Responsible for making requestst to google sheets. Other models must listen this model to intercept the sheet payload.
 * Also stores the fetch data purely for debugging purposes.
 */

const googleSheetsModel: GoogleSheetsModel = {
  //state
  layoutDataGoogleSheet: null,
  cardDataGoogleSheet: null,
  appGoogleSheet: undefined,
  //requests
  /**Handle a request to the google sheet containing the cards
   * listeners: appModel.onCardSheetLoadSuccess
   */
  fetchAppGoogleSheet: thunk(async (actions) => {
    GoogleSheetData.prototype
      .loadSheets(
        cardDataSheetKey.key,
        process.env.REACT_APP_GCP_TOKEN as string
      )
      .then((response) => {
        Promise.all(response).then((responseData) => {
          const studentsGoogleSheet = new GoogleSheetData(
            "DSC App",
            cardDataSheetKey.key,
            responseData
          );
          console.log(studentsGoogleSheet);
          actions.setAppGoogleSheetData(studentsGoogleSheet);
        });
      });
  }),
  setAppGoogleSheetData: action((state, googleSheet) => {
    state.appGoogleSheet = googleSheet;
  }),
  /**Handle a request to the google sheet containing the layouts
   * listeners: layoutsModel.onLayoutSheetLoadSuccess
   */
  // fetchLayoutDataGoogleSheet: thunk(async (actions) => {
  //   // getSheet<RawLayoutRow>(layoutsGoogleSheetKey).then((sheet) => {
  //   //   console.log(sheet);
  //   //   actions.setLayoutDataGoogleSheet(sheet);
  //   // });
  // }),
  //setters
  setCardDataGoogleSheet: action((state, sheet) => {
    state.cardDataGoogleSheet = sheet;
  }),
  setLayoutDataGoogleSheet: action((state, sheet) => {
    state.layoutDataGoogleSheet = sheet;
  }),
};

export default googleSheetsModel;
