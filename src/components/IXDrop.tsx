import React, { FC, ReactNode, useEffect } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import { AddIcon } from "evergreen-ui";
import "../css/droppable.scss";
// import Pulsar from "./Shared/Pulsar";
import { DropCategory } from "@enums";
interface IXDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  dropCategory: DropCategory;
  className?: string;
}

/**A droppable container. Wraps child widgets in a react-beautiful-dnd Droppable component, and renders a "+" if a draggable is dragging over the container */
const IXDrop: FC<IXDrop> = ({
  children,
  className,
  dropCategory,
  ...properties
}) => {
  // const droppableContainert className = {"droppable " + className}
  return (
    <Droppable {...properties} type={"DEFAULT"}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.innerRef}
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver
                ? "droppable-hovered" + " " + className
                : "droppable" + " " + className
            }
          >
            <div
              className={
                snapshot.isDraggingOver
                  ? "droppable-overlay droppable-overlay-visible"
                  : "droppable-overlay droppable-overlay-hidden"
              }
            >
              {/* <Pulsar /> */}
            </div>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default IXDrop;
