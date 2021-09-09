import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";

const Waveform = ({url}: {url: string}): JSX.Element =>{
const imgStyle = {
    width: "100%",
    height: "100%"
} as React.CSSProperties

  return(
    <img style= {imgStyle} src = {url}></img>
  )
}

export default Waveform

