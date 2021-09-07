import React, { useState, useEffect, FC } from "react";
import classNames from "classnames";
import "./SampleTray.scss";
import { Pane } from "evergreen-ui";

const SampleTray = (): JSX.Element => {
  const [closed, setClosed] = useState(false);
  const sampleTrayClass = classNames("sample-tray-container", {
    "sample-tray-hidden": closed,
  });

  return (
    <div
      onClick={(e) => {
        setClosed(!closed);
      }}
      className={sampleTrayClass}
    >
      hello
    </div>
  );
};

export default SampleTray;
