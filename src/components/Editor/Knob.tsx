import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import {Pane} from "evergreen-ui";
import "@css/Knob.scss";

const Knob = (): JSX.Element =>{
  return(
        <div className="dimmer-container">
        {/* <div className="background light"></div>
        <div className="background dark"></div> */}
        <div className="dimmer">
            {/* <canvas id="dimmer-lines" height="325" width="470"></canvas> */}
            <div className="dimmer-inner">
            {/* <div className="dimmer-inner-knob">
            </div> */}
            </div>
            <div className="text">
            </div>
        </div>
        </div>
  )
}

export default Knob
