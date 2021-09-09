import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
// import "/node_modules/react-grid-layout/css/styles.css";
// import "/node_modules/react-resizable/css/styles.css"
import "@css/react-grid-layout.css"
import "@css/react-resizable.css"

import {
    layout,
    makeResponsive,
    measureItems,
    SpringGrid
  } from "react-stonecutter";
import Sample from "../Sample/Sample";
import DraggableSample from "../Sample/DraggableSample";
import IXDrop from "@components/IXDrop";
import { DropCategory } from "@enums";
import SampleData from "@classes/SampleData";
import tags from "@static/tags";

const Grid = makeResponsive(measureItems(SpringGrid, { measureImages: true }), {
defaultColumns: 3,
maxWidth: 1920
});
const springGridOptions = { stiffness: 170, damping: 26 };

interface SampleLayoutProperties{
  activeTags: string[]
}

const SampleLayout = ({activeTags}:SampleLayoutProperties): JSX.Element =>{
  const testArray = Array.from(Array(45).keys())
  const dummySamples = Array.from(Array(45).keys()).map(f=>new SampleData([rand(tags)]))
  const noFilter = (c: SampleData) => {return true};
  const [availableSamples, setAvailableSamples] = useState<SampleData[]>([])
  function rand(items: any[]) {
    // "~~" for a closest "int"
    return items[~~(items.length * Math.random())];
  }
  const [filterFunction, setFilterFunction] = useState<(c: SampleData) =>boolean>(()=>(c: SampleData) => true)
  useEffect(()=>{
    console.log(activeTags);
    const func = (c: SampleData) =>
    {
      if (c.tags){
        for (const s of c.tags) {
          if (activeTags.includes(s)){
            return true
          }
        }
      }
      return false
    }
    setFilterFunction(func)
  },[activeTags]);
  return(
    <IXDrop isDropDisabled= {true} dropCategory = {DropCategory.SampleTraySample} droppableId= {"Sample Dray"} >
    <Grid
    columns = {3}
    columnWidth={200}
    gutterWidth={1}
    gutterHeight={7}
    layout={layout.pinterest}
    springConfig={springGridOptions}
    >
      
     { 
     dummySamples.filter(s=>()=>filterFunction(s)).map((item, index)=>(
        <div>
          <DraggableSample index = {index} key = {index} droppableId = {index+"_drop"} draggableId = {index+"_drag"}/>
        </div>
      ))}
    </Grid>
    </IXDrop>
  )
}

export default SampleLayout
