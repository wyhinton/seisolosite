import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import { IconButton as EvergreenIconButton, CaretDownIcon} from "evergreen-ui";

const IconButton = (): JSX.Element =>{
  return(
    <EvergreenIconButton icon = {CaretDownIcon}></EvergreenIconButton>
  )
}

export default IconButton
