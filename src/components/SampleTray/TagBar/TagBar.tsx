import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import tags from "@static/tags"
import Tag from "@components/UI/Tag";
import "./TagBar.scss";

interface TagBarProperties{
  onTagClick?: (id: string)=>void
}

const TagBar = ({onTagClick}:TagBarProperties): JSX.Element =>{
    return(
    <div className = {"tag-bar-container"} >
        {
        tags.map((t, i)=>(
            <Tag onMouseUp= {onTagClick} key = {i} text = {t}></Tag>
        ))
        }
    </div>
  )
}

export default TagBar
