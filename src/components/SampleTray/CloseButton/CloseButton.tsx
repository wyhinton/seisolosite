import React, { useEffect, useState } from "react";
import {useStoreActions, useStoreState} from "@hooks";

import IconButton from "@components/UI/IconButton";
import {Pane} from "evergreen-ui";
import classNames from "classnames";

interface CloseButtonProperties{
  onMouseUp: React.MouseEventHandler<HTMLDivElement>
}

const CloseButton = ({onMouseUp}:CloseButtonProperties): JSX.Element =>{
  const closeButtonStyle = {
    position: "absolute",
    left: "50%",
    top: -50,
  } as React.CSSProperties

  return(
    <div onMouseUp={onMouseUp} style = {closeButtonStyle} className = {"close-button-container"} >
      <IconButton></IconButton>
    </div>
  )
}

export default CloseButton
