import "./TagBar.scss";

import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "@hooks";

import { Actions } from "easy-peasy";
import { Pane } from "evergreen-ui";
import { SampleTrayModel } from "../SampleTray";
import Tag from "@components/UI/Tag";
import classNames from "classnames";
import tags from "@static/tags";

interface TagBarProperties {
  actions: Actions<SampleTrayModel>;
  tagsState: string[];
  onTagClick?: (id: string) => void;
}

const TagBar = ({
  onTagClick,
  tagsState,
  actions,
}: TagBarProperties): JSX.Element => {
  
  const [active, setActive] = useState(false)

  const handleTagClick = (tag:string) =>{
    console.log(tags);
    if (tagsState.includes(tag)){
      actions.removeTag(tag)
      setActive(false)
    } else {
      actions.addTag(tag)
      setActive(true)
    }
  }

  return (
    <div className={"tag-bar-container"}>
      {tags.map((t, i) => (
        <Tag
          onMouseUp={t=>{handleTagClick(t)}}
          key={i}
          tag={t}
          active= {tagsState.includes(t)}
        ></Tag>
      ))}
    </div>
  );
};

export default TagBar;
