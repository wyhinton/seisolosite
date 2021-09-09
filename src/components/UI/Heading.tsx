import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";

const Heading = ({children}:{children: JSX.Element | JSX.Element[]}): JSX.Element =>{
    return(
      <Pane paddingBottom = {".5em"}>
          {children}
      </Pane>
    )
  }
  
export default Heading
