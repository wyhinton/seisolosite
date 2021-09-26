import React, { FC, ReactNode } from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";
import ReactTable from "react-table";
import { DropCategory } from "@enums";

interface IXDrag extends Omit<DraggableProps, "children"> {
  dndType: DropCategory;
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

/**
 * A draggable table row.
 * @param param0
 * @returns
 */
const XDrag: FC<IXDrag> = ({
  dndType,
  className,
  children,
  dragAll,
  ...properties
}) => {
  console.log(React.isValidElement(children));
  // console.log(props);
  if (!React.isValidElement(children)) return <div />;
  // const child = React.memo(children, []);
  return (
    <Draggable {...properties}>
      {(provided, snapshot) => {
        const dragHandleProperties = dragAll ? provided.dragHandleProps : {};
        return (
          <>
            <div
              className={className}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...dragHandleProperties}
            >
              {React.cloneElement(children, { provided })}
            </div>
            <div
              style={{
                display: snapshot.isDragging ? "table-row" : "none",
                backgroundColor: snapshot.isDragging ? "green" : "none",
              }}
            >
              {React.cloneElement(children, { provided })}
            </div>
          </>
        );
      }}
    </Draggable>
  );
};

XDrag.defaultProps = {
  dragAll: true,
};

export default React.memo(XDrag);
