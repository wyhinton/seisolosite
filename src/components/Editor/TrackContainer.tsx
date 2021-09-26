import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import Section from "@components/UI/Section";
import "./TrackContainer.scss";

interface TrackContainerProperties{
  children: JSX.Element | JSX.Element[]
}

const TrackContainer = ({children}:TrackContainerProperties): JSX.Element =>{
  return(
      <Section width= {"80%"} height = {"20%"}backgroundColor= {"green"} className = {"track-container"} padding = {"0em"}>
          {children}
      </Section>

  )
}

export default TrackContainer
