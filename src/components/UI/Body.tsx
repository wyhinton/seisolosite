import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";

interface BodyProperties{
  children: JSX.Element | JSX.Element[]
}

const Body = ({children}: BodyProperties): JSX.Element =>{
  return(
    <div className = {"body-container"}>
        {children}
    </div>
  )
}

export default Body
