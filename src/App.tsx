import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SampleTray from "./components/SampleTray/SampleTray";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { DragSource } from '@enums';
import {useStoreActions, useStoreState} from "@hooks";

import {useKeyboardShortcut} from "crooks";
import Editor from '@components/Editor/Editor';
import { actions } from 'react-table';

const App = (): JSX.Element =>{
  const fetchCardDataGoogleSheetThunk = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  );
  const processSamples = useStoreActions((actions)=>actions.samplesModel.processSamples)
  const processCompositions = useStoreActions((actions)=>actions.compositionsModel.processCompositions)
  const fetchCompositionSheet = useStoreActions((actions)=>actions.googleSheetsModel.fetchCompositionsSheet)

  useEffect(() => {
    processSamples();
    fetchCardDataGoogleSheetThunk();
    processCompositions();
    fetchCompositionSheet();
  }, [fetchCardDataGoogleSheetThunk]);
  return (
    <DragDropContext
    onBeforeDragStart={(e) => {
      console.log(e);
      const { source } = e;
      // if (source.droppableId === DragSource.SAMPLE_TRAY) {
      //   console.log("dragged form samle tray");
      // }
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
