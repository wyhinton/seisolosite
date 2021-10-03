import React, { useState, useEffect} from "react";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import Section from "@components/UI/Section";
import "@css/TrackContainer.scss";

interface TrackContainerProperties{
  height: string | number;
  children: JSX.Element | JSX.Element[]
}

const TrackContainer = ({children, height}:TrackContainerProperties): JSX.Element =>{
  return(
      <Section width= {"80%"} height = {height} backgroundColor= {"green"} className = {"track-container"} padding = {"0em"}>
          {children}
      </Section>

  )
}

export default TrackContainer
