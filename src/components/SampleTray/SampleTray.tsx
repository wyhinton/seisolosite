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
import {useKeyboardShortcut} from "crooks";
// import {useToggle} from "@withvoid/melting-pot"
import {useToggle} from "@hooks";

const SampleTray = (): JSX.Element => {
  const [value, toggleValue] = useToggle(false)
  const submit = () =>{
    console.log("doing submit");
    toggleValue()
  }
  
  const sampleTrayClass = classNames("sample-tray-container", {
    "sample-tray-hidden": value,
  });
  const containerRef= useRef<HTMLDivElement|undefined>();
  const [tagFilter, setTagFilter] = useState("none")

  useEffect(()=>{
    console.log(`setting tray filter to ${tagFilter}`);
  },[tagFilter]);

  const {enable, disable} = useKeyboardShortcut({
    keyCode: 72,
    action: submit,
    disabled: false // This key is not required
  })

  return (
      <Section
      className={sampleTrayClass}>
        <CloseButton onMouseUp= {toggleValue}/>
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
