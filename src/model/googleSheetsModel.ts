import { action, Action, thunk, Thunk } from "easy-peasy";
import type GoogleSheet from "../interfaces/GoogleSheet";
import type RawCardRow from "../interfaces/RawCardRow";
import type RawLayoutRow from "../interfaces/RawLayoutRow";
import cardDataSheetKey from "@static/cardDataSheetKey";
import layoutsGoogleSheetKey from "@static/layoutsGoogleSheetKey";
import GoogleSheetData from "@classes/📋GoogleSheetData";
import Papa from "papaparse";
import { RawCompositionRow } from "@interfaces/RawCompositionRow";
import { ParagraphProps } from "evergreen-ui";

type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

export interface GoogleSheetsModel {
  //state
  compositionsSheet: GoogleSheetData | undefined;
  appGoogleSheet: GoogleSheetData | undefined;
  cardDataGoogleSheet: RawCardRow[] | null;
  // cardDataGoogleSheet: GoogleSheet<RawCardRow> | null;
  layoutDataGoogleSheet: GoogleSheet<RawLayoutRow> | null;

  //requests
  fetchAppGoogleSheet: Thunk<GoogleSheetsModel>;
  fetchCompositionsSheet: Thunk<GoogleSheetsModel>;
  // fetchLayoutDataGoogleSheet: Thunk<GoogleSheetsModel>;

  //setters
  setAppGoogleSheetData: Action<GoogleSheetsModel, GoogleSheetData>;
  setCardDataGoogleSheet: Action<GoogleSheetsModel, RawCardRow[]>;
  setCompositionsSheet: Action<GoogleSheetsModel, Papa.ParseResult<unknown>>;
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
  compositionsSheet: undefined,
  fetchCompositionsSheet: thunk(async (actions) => {
    console.log("FETCHING COMPOSITIONS SHEET");
    const url = process.env.PUBLIC_URL+"/TEST_ANALYSIS.csv";
    Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
          actions.setCompositionsSheet(results)
        }
    });
    
  }),
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
  setCompositionsSheet: action((state, compositionSheet) => {
    compositionSheet.data = compositionSheet.data as RawCompositionRow[]
  }),
};

export default googleSheetsModel;


// function isRawCompositionRowArray(value: unknown): value is RawCompositionRow[] {
//   return (
//     Array.isArray(value) && value.every(element => typeof element = RawCompositionRow)
//   );
// }