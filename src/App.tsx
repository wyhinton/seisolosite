import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SampleTray from "./components/SampleTray/SampleTray";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { DragSource } from '@enums';
import {useStoreActions, useStoreState} from "@hooks";


import Editor from '@components/Editor/Editor';

const App = (): JSX.Element =>{
  const fetchCardDataGoogleSheetThunk = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  );
  useEffect(() => {
    fetchCardDataGoogleSheetThunk();
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
