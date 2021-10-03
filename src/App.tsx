import '@css/App.css';

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from "@hooks";

import { DragSource } from '@enums';
import Editor from '@components/Editor/Editor';
import SampleTray from "./components/SampleTray/SampleTray";
import { actions } from 'react-table';
import {useKeyboardShortcut} from "crooks";

const App = (): JSX.Element =>{
  const fetchCardDataGoogleSheetThunk = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  );
  const processCompositions = useStoreActions((actions)=>actions.compositionsModel.processCompositions)
  const fetchCompositionSheet = useStoreActions((actions)=>actions.googleSheetsModel.fetchCompositionsSheet)
  const fetchSamples = useStoreActions((actions)=>actions.googleSheetsModel.fetchSamplesSheet)

  useEffect(() => {
    fetchCardDataGoogleSheetThunk();
    processCompositions();
    fetchCompositionSheet();
    fetchSamples();
  }, [fetchCardDataGoogleSheetThunk]);

  return (
    <DragDropContext
    onBeforeDragStart={(e) => {
      console.log(e);
      const { source } = e;
    }}
    onDragEnd={onDragEnd}
  >
    <div className="App">
        <Editor/>
        <SampleTray/>
    </div>
    </DragDropContext>
  );
}

const onDragEnd = (response: DropResult) => {
  console.log(response);
  if (response.destination?.droppableId == response.source?.droppableId)
    return;
  const { source, destination, draggableId } = response;
  console.log(source, destination, draggableId);
  console.log(
    `dragged from ${draggableId} to ${
      destination?.droppableId
    } current title: ${"yes"}`
  );

  if (!destination) return;
};



export default App;
