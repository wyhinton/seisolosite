import React, { useState, useEffect, useRef} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import IXDrop from "@components/IXDrop";
import { DropCategory } from "@enums";
import Section from "@components/UI/Section";
import "./Editor.scss";
import WidgetGrid from "./WidgetGrid";
import TrackContainer from "./TrackContainer";
import Knob from "./Knob";

const Editor = (): JSX.Element =>{
  const WidgetGridSectionRef= useRef<HTMLDivElement|undefined>();
  const trackWidth = 1500;
  const [trackHeight, setTrackHeight] = useState(200)
  useEffect(() => {
  }, []);

  return(

      <Section height= {"100vh"} className="editor-container">
        <TrackContainer height = {trackHeight}>
            <WidgetGrid height = {trackHeight} width = {trackWidth}/>
        </TrackContainer>
      </Section>
 
  )
}

export default Editor
