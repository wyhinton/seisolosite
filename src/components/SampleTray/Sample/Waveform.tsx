import "@css/Waveform.scss";

import React, { useEffect, useState } from "react";
import {useStoreActions, useStoreState} from "@hooks";

import {Pane} from "evergreen-ui";
import SampleData from "@classes/SampleData";
import classNames from "classnames";
import {mapRange} from '@utils';

const Waveform = ({sampleData, sampleProgress}: {sampleProgress: number, sampleData:SampleData}): JSX.Element =>{
  // useEffect(()=>{
  //   console.log(path);
  // })
const imgStyle = {
    width: "100%",
    height: "100%"
} as React.CSSProperties
const [hovered, setHovered] = useState(false)
const {length, svgPath} = sampleData

const createViewBox= (length: number):string =>{
  return `0 0 ${mapRange(length, 0, 3, 0, 400)} 100.0`
}

const containerClass = classNames("waveform-container", {
  "popup-3d": hovered,
  // "popdown-3d": !hovered,
});
const boxWidth = mapRange(length, 0, 3, 0, 400);
const playheadPosition = mapRange(sampleProgress, 0, 1, 0, boxWidth)
const strokeWidth = 0;

  return(
    <div className ={containerClass} onMouseEnter = {(e)=>{setHovered(true)}} onMouseLeave = {(e)=>{setHovered(false)}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={createViewBox(length)} style = {{width: "fit-content", height: 90}}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.0 100.0" style = {{width: "fit-content", height: 90}}> */}
      <defs>
        <linearGradient   x1='.258%' y1='49.75%' x2='101.258%' y2='49.75%' id='bgGradient' > 
              <stop offset='20.525%'  stop-color='#3023AE'  />
              <stop offset='47.525%' stop-color='#53A0FD'  /> 
              {/* <stop offset='100%' stop-color='#B4EC51'  />  */}
        </linearGradient>
        <clipPath id="myClip">
          <g transform={"translate(0 50)"}>  
           <path d={svgPath}/>
          </g>
        </clipPath>
        <clipPath id="rectClip">
            {/* <rect x = {playheadPosition} y ={-100} id = "playhead" width ={100} fill = {"green"} height={400}></rect>  */}
            <rect x = {playheadPosition} y ={-100} id = "playhead" width ={100} fill = {"green"} height={400}></rect> 
        </clipPath>
      </defs>
        {/* <g>   */}
        <g transform={"translate(0 50)"}>  
          {/* <rect width ={100} fill = {"green"} height={100}></rect>  */}
          <path d={svgPath} stroke = {"red"} fill = {"url(#bgGradient)"} strokeWidth ={strokeWidth}/>
          {/* <path d={svgPath} stroke = {"red"} fill = {"red"} strokeWidth ={strokeWidth} /> */}
          {/* <path d={svgPath} stroke = {"red"} fill = {"red"} strokeWidth ={strokeWidth} clipPath="url(#rectClip)"/> */}
          <rect x = {playheadPosition} y ={-100} id = "playhead" width ={100} fill = {"green"} height={400} clipPath="url(#myClip)"></rect> 
        </g>
      </svg>

    </div>

  )
}

export default Waveform

