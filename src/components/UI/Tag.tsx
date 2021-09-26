import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "@hooks";
import classNames from "classnames";
import { TagInput, Button } from "evergreen-ui";

interface TagProperties {
  text: string;
  onMouseUp: (id: string) => void;
}

const Tag = ({ text, onMouseUp }: TagProperties): JSX.Element => {
  return (
    <div
      onMouseUp={(e) => {
        console.log("got mouseup");
        onMouseUp(text);
      }}
      style = {{ paddingRight: ".5em" }}
    >
      <Button
        onChange={(e) => {
          onMouseUp(text);
        }}
        height = {20}
        // borderRadius={100}
      >
        {text}
      </Button>
     </div>
  );
};

export default Tag;
