import React, { useState, useEffect, useRef} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import IXDrop from "@components/IXDrop";
import { DropCategory } from "@enums";
import Section from "@components/UI/Section";
import "./Editor.scss";
import WidgetGrid from "./WidgetGrid";
import TrackContainer from "./TrackContainer";

const Editor = (): JSX.Element =>{
  const WidgetGridSectionRef= useRef<HTMLDivElement|undefined>();
  
  useEffect(() => {
   const divElement= WidgetGridSectionRef.current;
   console.log(divElement);
  }, []);

  return(

      <Section height= {"100vh"} className="editor-container">
        <TrackContainer>
        <Section backgroundColor= {"darkgrey"} className = {"widget-grid-container"}>
            <WidgetGrid/>
          <div>hello</div>
        </Section>
        </TrackContainer>
      </Section>
 
  )
}

export default Editor
