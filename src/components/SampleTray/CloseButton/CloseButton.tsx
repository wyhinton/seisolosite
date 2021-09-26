import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import IconButton from "@components/UI/IconButton";

interface CloseButtonProperties{
  onMouseUp: React.MouseEventHandler<HTMLDivElement>
}

const CloseButton = ({onMouseUp}:CloseButtonProperties): JSX.Element =>{
  return(
    <div onMouseUp={onMouseUp} className = {"close-button-container"} >
      <IconButton></IconButton>
    </div>
  )
}

export default CloseButton
