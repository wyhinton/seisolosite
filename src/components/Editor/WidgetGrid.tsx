import React, { useEffect, useState, useMemo, useRef } from "react";
import { WidthProvider, Responsive, Layout, Layouts, } from "react-grid-layout";
// import "../css/cardLayout.css";
import ViewCard from "./ViewCard/ViewCard";
import { useStoreState, useStoreActions } from "@hooks";
import CardData from "@classes/CardData";
import { AppMode, DropCategory, DragSource } from "@enums";
import IXDrop from "@components/IXDrop";
import type { GridPosition } from "@interfaces/GridPosition";
import defaultLayouts from "@static/defaultLayouts";
import "./WidgetGrid.scss";
/**
 * Responsible for managing the layout of card components. Accesses a list of available card data from the store, then maps them into Card Components
 * @component
 *
 */

interface WidgetGridProperties{
  width?: number;
  height?: number;
}

export const WidgetGrid = ({width, height}: WidgetGridProperties): JSX.Element => {
  const rows = 1;
  const cols = 4;
  const viewModeState = useStoreState((state) => state.appModel.appMode);
  const setBufferLayoutAction = useStoreActions(
    (actions) => actions.layoutsModel.setBufferLayout
  );

  const currentLayoutState = useStoreState(
    (state) => state.layoutsModel.activeLayout
  );
  //use the size of the window in order to set the height of the cards
  // const [size, setSize] = useState({
  //   x: window.innerWidth,
  //   y: window.innerHeight,
  // });

  const testViewMode = useMemo(() => {
    return viewModeState === AppMode.EDIT;
  }, [viewModeState]);

  const activeCards = useStoreState((state) => state.appModel.activeCards);
  const [placeholderCards, setPlaceholderCards] = useState<string[]>([]);
  const [filledLayout, setFilledLayout] = useState(defaultLayouts);
  const [realLayout, setRealLayout] = useState(currentLayoutState?.layout);

  //keep a local mutable reference to a layout in order to avoid making excess calls to store and causing re-renders on each new edit
  const localLayout = useRef<null | Layouts>(null);
  type compactType = 'vertical' | 'horizontal' | null | undefined;
  //each card has a unique key. Clicking a card sets the current active key. If a card's key is equal to the active key
  //then it will be rendered into the modal popup
  const activeKeyReference = useRef("");

  const removeItem = (id: string, layout: Layouts): void => {
    const old = { ...localLayout.current };
    if (old) {
      for (const [k, v] of Object.entries(old)) {
        old[k] = v.filter((l) => l.i !== id);
      }
    }
    localLayout.current = old;
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  useEffect(() => {
    const allBlank = generateFilledLayout(rows, cols);
    const justPlaceholders = allBlank.lg
      .filter((l) => l.i.startsWith("empty"))
      .map((l) => l.i);

    setPlaceholderCards(justPlaceholders);
    setFilledLayout(allBlank);
    setRealLayout(currentLayoutState?.layout);
    if (currentLayoutState?.layout) {
      localLayout.current = currentLayoutState?.layout;
    }
  }, [activeCards, currentLayoutState]);

  const sharedGridSettings = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 },
    // rowHeight: size.y / 3.5,
    rowHeight: 100,
    margin: [10, 10] as [number, number],
    preventCollision: true,
    // compactType: 2,
    // compactType: 
    compactType: "horizontal" as compactType,
    isBounded: true,
    maxRows: 1,
    useCSSTransfroms: true,
  };

  return (
    <div>
        {realLayout ? (
          <ResponsiveGridLayout
            {...sharedGridSettings}
            className="card-layout"
            layouts={realLayout}
            resizeHandles={["se"]}
            preventCollision={false}
            // verticalCompact={true}
            // horizontalCompact = {true}
            onDragStart={(
              layout,
              oldItem,
              newItem,
              placeholder,
              e,
              element
            ) => {
              const previousStyle = element.style;
              previousStyle.border = "2px solid cyan";
              element.style.border = "4px solid cyan";
            }}
            onDrop={(layout, item, e) => {
              console.log(layout, item, e);
            }}
            onLayoutChange={(l) => {
              const newLayout: Layouts = {
                lg: l,
                md: l,
                sm: l,
                xs: l,
                xxs: l,
              };
              localLayout.current = newLayout;
              setBufferLayoutAction(localLayout.current);
            }}
            isDraggable={true}
            // isDraggable={testViewMode}
            isResizable={false}
          >

            {activeCards.map((card: CardData, index: number) => {
              return (
                <div
                  //key provided here is the means of accessing a unique identifier for the cards
                  key={card.sourceId}
                  draggable={true}
                  className = {"draggable-widget"}
                  // className = {cardContainerClass(card, viewModeState)}
                >
                  {card.title}
                  <IXDrop
                    key={index}
                    droppableId={card.sourceId}
                    dropCategory={DropCategory.IFRAME}
                  >
                    <ViewCard>
                    </ViewCard>
                  </IXDrop>
                </div>
              );
            })}
          </ResponsiveGridLayout>
        ) : (
          <div className={"centered-flex"}>not loaded</div>
        )}

      {/* <div>
        {filledLayout ? (
          <ResponsiveGridLayout
            {...sharedGridSettings}
            className="card-layout"
            layouts={filledLayout}
            resizeHandles={[]}
            preventCollision={true}
            isDraggable={false}
            isResizable={false}
          >
            {placeholderCards.map((p, index) => {
              return (
                <div key={p}>
                  <IXDrop
                    key={index}
                    droppableId={p}
                    dropCategory={DropCategory.PLACEHOLDER}
                  >
                    <ViewCard
                      // key={p}
                      // cardId={p}
                      // activeKey={activeKeyReference}
                      // cardType={DropCategory.PLACEHOLDER}
                    ></ViewCard>
                  </IXDrop>
                </div>
              );
            })}
          </ResponsiveGridLayout>
        ) : (
          <div className={"centered-flex"}>not loaded</div>
        )}
      </div> */}
    </div>
  );
};
export default React.memo(WidgetGrid);

const cardContainerClass =(card: CardData, appMode: AppMode): string=>{
    const isFailed = card.failed;
    if(isFailed && appMode === AppMode.DISPLAY){
      return "card-container-hidden"
    } else if (isFailed && appMode === AppMode.EDIT){
      return "card-container-error"
    } else {
      return "card-container"
    }
}

const createLayout = (cards: CardData[], cols: number, rows: number) => {
  const pos: GridPosition = { x: 0, y: 0 };
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // allGridSpots.push({ x: x, y: y });
    }
  }
};

function generateFilledLayout(rows: number, cols: number): Layouts {
  const allGridSpots: GridPosition[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      allGridSpots.push({ x: x, y: y });
    }
  }

  const emptyCards = allGridSpots.map((rr) => {
    return {
      x: rr.x,
      y: rr.y,
      w: 1,
      h: 1,
      i: `empty_card_[${rr.x}, ${rr.y}]`,
      minW: 1,
      maxW: 1,
      minH: 1,
      maxH: 1,
      static: false,
      // static: true,
      isDraggable: false,
      isResizable: false,
      resizeHandles: [],
    } as Layout;
  });
  //TODO: MORE FUNCTIONAL SOLUTION
  // const filled = layout.concat(emptyCards);
  //pop off the first two positions where the clock is
  emptyCards.shift();
  emptyCards.shift();
  return {
    lg: emptyCards,
    md: emptyCards,
    sm: emptyCards,
    xs: emptyCards,
    xxs: emptyCards,
  };
}

function findFilledPositions(layouts: Layout[]): GridPosition[] {
  const takenSpots: GridPosition[] = [];
  for (const l of layouts) {
    takenSpots.push({ x: l.x, y: l.y });
    for (let index = 1; index < l.w; index++) {
      const fullSpotX: GridPosition = {
        x: l.x + index,
        y: l.y,
      };
      takenSpots.push(fullSpotX);
    }
    for (let index = 1; index < l.h; index++) {
      const fullSpotY: GridPosition = {
        x: l.x,
        y: l.y + index,
      };
      takenSpots.push(fullSpotY);
    }
  }
  return takenSpots;
}
function findEmptyGridPositions(
  layouts: Layout[],
  rows: number,
  cols: number
): GridPosition[] {
  const allGridSpots: GridPosition[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      allGridSpots.push({ x: x, y: y });
    }
  }
  const filledSpots = findFilledPositions(layouts);
  const stringFilledSpots = new Set(
    filledSpots.map((fs) => [fs.x, fs.y].toString())
  );

  return allGridSpots.filter(
    (gs) => !stringFilledSpots.has([gs.x, gs.y].toString())
  );
}


// import React, { useState, useEffect} from "react";
// import {useStoreActions, useStoreState} from "@hooks";
// import classNames from "classnames";
// import {Pane} from "evergreen-ui";
// import { WidthProvider, Responsive, Layout, Layouts } from "react-grid-layout";

// const WidgetLayout = (): JSX.Element =>{
//    const rows = 3;
//    const cols = 4;
//    const [size, setSize] = useState({
//     x: window.innerWidth,
//     y: window.innerHeight,
//   });
  
//   const activeWidgets =  Array.from(Array(45).keys());
  
//   return(
//     <div>hello</div>
//   )
// }

// export default WidgetLayout
