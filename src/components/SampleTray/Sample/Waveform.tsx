import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import { readBuilderProgram } from "typescript";

const Waveform = ({path}: {path: string}): JSX.Element =>{
  // useEffect(()=>{
  //   console.log(path);
  // })
const imgStyle = {
    width: "100%",
    height: "100%"
} as React.CSSProperties
const strokeWidth = 0;

  return(
    <div className = "waveform container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.0 100.0" style = {{width: 400, height: 90}}>
      <defs>
        <linearGradient   x1='.258%' y1='49.75%' x2='101.258%' y2='49.75%' id='bgGradient' > 
              <stop offset='20.525%'  stop-color='#3023AE'  />
              <stop offset='47.525%' stop-color='#53A0FD'  /> 
              <stop offset='100%' stop-color='#B4EC51'  /> 
           </linearGradient>
        </defs>
        <g fill="#61DAFB"   transform={"translate(0 50)"}>  
          {/* <rect width ={100} fill = {"green"} height={100}></rect>  */}
          <path d={path} stroke = {"red"} fill = {"url(#bgGradient)"} strokeWidth ={strokeWidth}/>
        </g>
      </svg>

    </div>

  )
}

export default Waveform

