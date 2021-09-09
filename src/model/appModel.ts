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
import CardData from "@classes/CardData";
import type RawCardRow from "../interfaces/RawCardRow";
import { Layouts } from "react-grid-layout";
import defaultGridLayout from "../static/defaultLayouts";
import { AppMode } from "../enums";
import History from "@classes/History";
import { StoreModel } from "./index";
/**
 * Core app model
 * @param
 */
export interface AppDataModel {
  //state
  availableCards: CardData[];
  activeCards: CardData[];
  currentLayout: Layouts;
  appMode: AppMode;
  history: History;
  // localStorageLayouts: any[];

  //requests
  // fetchGoogleSheet: Thunk<AppDataModel>;

  //loaders
  // loadLocalLayouts: Action<AppDataModel>;

  //listeners
  onCardSheetLoadSuccess: ActionOn<AppDataModel, StoreModel>;
  onSwapCardContent: ThunkOn<AppDataModel, never, StoreModel>;
  onSetActiveLayout: ThunkOn<AppDataModel, never, StoreModel>;
  //managers
  manageViewModeChange: Thunk<AppDataModel, AppMode>;
  toggleViewMode: Thunk<AppDataModel, never>;
  //simple setters
  setAppMode: Action<AppDataModel, AppMode>;
  setCurrentLayout: Action<AppDataModel, Layouts>;
  setActiveCards: Action<AppDataModel, CardData[]>;
  setAvailableCards: Action<AppDataModel, CardData[]>;
  registerCardLoadFailure: Thunk<AppDataModel, CardData, never, StoreModel>
  //listeners
  onUndoHistory: ThunkOn<AppDataModel, never, StoreModel>;
  onRedoHistory: ThunkOn<AppDataModel, never, StoreModel>;

  //clear
  // clearLocalLayouts: Action<AppDataModel>;

  //local storage
  // saveLayoutLocal: Thunk<AppDataModel>;
}

const appModel: AppDataModel = {
  //state
  availableCards: [],
  activeCards: [],
  currentLayout: defaultGridLayout,
  appMode: AppMode.DISPLAY,
  history: new History(),
  // localStorageLayouts: [],

  //managers
  /**Control side effects for altering the view state of the app, and dispatch a setter for the state */
  manageViewModeChange: thunk((actions, viewModeEnum) => {
    console.log(viewModeEnum);
    actions.setAppMode(viewModeEnum);
    switch (viewModeEnum) {
      case AppMode.EDIT:
        break;
      case AppMode.DISPLAY:
        break;
      case AppMode.CYCLE:
        break;
      default:
        console.log("reached default in set view mode thunk");
    }
  }),
  toggleViewMode: thunk((actions, _, { getState }) => {
    console.log("toggling view mod ");

    switch (getState().appMode) {
      case AppMode.EDIT:
        actions.setAppMode(AppMode.DISPLAY);
        break;
      case AppMode.DISPLAY:
        actions.setAppMode(AppMode.EDIT);
        break;
      case AppMode.CYCLE:
        break;
      default:
        console.log("reached default in set view mode thunk");
    }
    console.log(getState().appMode);
  }),
  setCurrentLayout: action((state, layoutArray) => {
    state.currentLayout = layoutArray;
  }),
  setAvailableCards: action((state, cardDataArray) => {
    console.log("setting available cards");
    state.availableCards = cardDataArray;
  }),
  setActiveCards: action((state, cardDataArray) => {
    console.log("setting active cards");
    console.log(cardDataArray);
    state.activeCards = cardDataArray;
  }),
  setAppMode: action((state, viewModeEnum) => {
    console.log("setting view mode");
    state.appMode = viewModeEnum;
  }),

  //listeners
  onCardSheetLoadSuccess: actionOn(
    // targetResolver:
    (actions, storeActions) =>
      storeActions.googleSheetsModel.setAppGoogleSheetData,
    // handler:
    (state, target) => {
      // console.log("got on card sheet load success");
      const cardRowsArray = target.payload.getSheetRows(0);
      const rawCardRowsArray = cardRowsArray.map((row) => {
        return {
          src: row.src,
          title: row.title,
          added: row.added,
          sourceid: row.sourceid,
          author: row.author,
          interaction: row.interaction,
        } as RawCardRow;
      });
      const cards = rawCardRowsArray.map((c: RawCardRow) => new CardData(c));
      console.log(cards);
      state.availableCards = cards;
      console.log(debug(state.availableCards));
    }
  ),

  onSetActiveLayout: thunkOn(
    (actions, storeActions) => storeActions.layoutsModel.setActiveLayout,
    async (actions, layout, { getState }) => {
      // console.log("listened for setActiveLayout at app_model");
      //if a card source is in the active layout, then it must be active
      // const sources = layout.payload.sources();
      // console.log(sources);
      const activeSources = layout.payload
        .sources()
        .filter((s) => s !== "clock");

      const availableCardsUpdated = getState().availableCards.map((card) => {
        if (activeSources.includes(card.sourceId)) {
          card.setActive(true);
        } else {
          card.setActive(false);
        }
        return card;
      });
      const activeCards = getState().availableCards.filter((card) => {
        return activeSources.includes(card.sourceId);
      });
      // console.log(availableCardsUpdated);
      actions.setAvailableCards(availableCardsUpdated);
      actions.setActiveCards(activeCards);
      // console.log(activeCards);
    }
  ),
  registerCardLoadFailure: thunk((actions, failedCard, { getState, getStoreState }) => {
    console.log("Got card Register Load Failure at Layouts Model");
    console.log(failedCard);
    const { activeCards } = getState();
    const failedId = failedCard.sourceId;
    let newCards = activeCards.map(c=>{
      if (c.sourceId === failedId) {
        console.log("found failed");
        c.fail();
      }
      return c
    })
    actions.setActiveCards(newCards);
  }),
  onSwapCardContent: thunkOn(
    (actions, storeActions) => storeActions.layoutsModel.swapCardContent,
    async (actions, payload, { getState }) => {
      console.log("got swap card content");
      console.log(payload.payload);
      console.log(getState().activeCards);
      const newCards = getState().activeCards.map((c) => {
        if (c.sourceId === payload.payload.targetId) {
          const newSource = getState().availableCards.find(
            (c) => c.sourceId === payload.payload.sourceId
          );
          console.log(newSource);
          return newSource;
        } else {
          return c;
        }
      });
      if (newCards) {
        actions.setActiveCards(newCards as CardData[]);
      }
      console.log(debug(payload));
    }
  ),

  onUndoHistory: thunkOn(
    (actions, storeActions) => storeActions.historyModel.setCurrentHistory,
    async (actions, payload) => {
      console.log("got undo");
      console.log(payload.payload);
      actions.setCurrentLayout(payload.payload);
      console.log(debug(payload));
    }
  ),
  onRedoHistory: thunkOn(
    (actions, storeActions) => storeActions.historyModel.setCurrentHistory,
    async (actions, payload) => {
      console.log("got redo");
      console.log(payload.payload);
      actions.setCurrentLayout(payload.payload);
      console.log(debug(payload));
    }
  ),
  //local storage
  // clearLocalLayouts: action((state) => {
  //   localStorage.clear();
  //   state.localStorageLayouts = [];
  // }),
  // loadLocalLayouts: action((state) => {
  //   const layouts: any = Object.keys(localStorage)
  //     .filter((k) => k.startsWith("curLayout"))
  //     .map((k) => ({
  //       name: k,
  //       layout: JSON.parse(localStorage[k]) as Layout[],
  //     }));
  //   state.localStorageLayouts = layouts;
  // }),
  // saveLayoutLocal: thunk((actions, _, { getState }) => {
  //   localStorage.setItem(
  //     `curLayout_${localStorage.length}`,
  //     JSON.stringify(getState().currentLayout)
  //   );
  //   actions.loadLocalLayouts();
  // }),
};

export default appModel;
