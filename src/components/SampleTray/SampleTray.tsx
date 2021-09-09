import React, { useState, useEffect, FC, useRef } from "react";
import classNames from "classnames";
import "./SampleTray.scss";
import { Pane } from "evergreen-ui";
import Sample from "./Sample/Sample";
import SampleLayout from "./SampleLayout/SampleLayout";
import Section from "../UI/Section";
import TagBar from "./TagBar/TagBar";
import Heading from "@components/UI/Heading";
import IconButton from "@components/UI/IconButton";
import CloseButton from "./CloseButton/CloseButton";

// import {useStoreState} from @hooks;

const SampleTray = (): JSX.Element => {
  const [closed, setClosed] = useState(false);
  const sampleTrayClass = classNames("sample-tray-container", {
    "sample-tray-hidden": closed,
  });
  const containerRef= useRef<HTMLDivElement|undefined>();
  const [tagFilter, setTagFilter] = useState("none")
  
  useEffect(() => {
   const divElement= containerRef.current;
  }, []);

  useEffect(()=>{
    console.log(`setting tray filter to ${tagFilter}`);
  },[tagFilter]);

  return (
      <Section
      className={sampleTrayClass}>
        <CloseButton onMouseUp= {(e)=>setClosed(!closed)}/>
          <Section column = {true} className = {"sample-tray-inner-container"}>
            <Heading>
              <TagBar onTagClick= {(id: string)=>{setTagFilter(id)}}/>
            </Heading>
            <SampleLayout activeTags = {[tagFilter]}/>
        </Section>
      </Section>
  );
};

export default SampleTray;
