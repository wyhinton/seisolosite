import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import Sample from "./Sample";
import IXDrop from "@components/IXDrop";
import XDrag from "@components/XDrag";
import { DropCategory, DragSource } from '@enums';

const DraggableSample = ({droppableId, draggableId, index}: {droppableId: string, draggableId: string, index: number}): JSX.Element =>{
  return(
    <XDrag index= {index} draggableId = {draggableId} dndType= {DropCategory.SampleTraySample}>
    <Sample label= {draggableId}/>
    </XDrag>

  )
}

export default DraggableSample
