import React, { useState, useEffect} from "react";
import {Pane} from "evergreen-ui";
import "./Section.scss";

interface SectionProperties{
  children: JSX.Element | JSX.Element[];
  className?: string;
  backgroundColor?: string
  column?: boolean; 
  padding?: string;
  width?: string;
  height?: string;
}
// const Component = React.forwardRef<RefType, PropsType>((props, ref) => {
// eslint-disable-next-line react/display-name
const Section = React.forwardRef<HTMLDivElement, SectionProperties>(({children, className, backgroundColor, column, padding, width, height}, ref) => {
  const flexStatus = column?"flex-column ":"flex-row "
  const style = {
    backgroundColor: "white"??backgroundColor,
    padding: padding,
    borderRadius: "1em",
    width: width??"100%", 
    height: height??"100%",
  }
  return(
    <div className = {"ui-section " + flexStatus + className??""}style = {style} ref = {ref}>
    {/* <Pane ref = {ref} className = {"ui-section " + flexStatus + className??""}width = {"100%"} height = {"100%"} backgroundColor = {backgroundColor??"lightgrey"} padding = {padding??"1em"} borderRadius = {"1em"}> */}
        {children} 
    {/* </Pane> */}
    </div>
  )
})

export default Section
