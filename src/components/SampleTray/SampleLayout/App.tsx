//Useable version of newsiberian's "horizontal" layout 

import React, { useState } from 'react';
import shuffle from 'lodash.shuffle';
import camelCase from 'lodash.camelcase';
import Grid from './Grid';
import "../main.css"

export const quadIn     = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
export const quadOut    = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
export const quadInOut  = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
export const cubicIn    = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
export const cubicOut   = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
export const cubicInOut = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
export const quartIn    = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
export const quartOut   = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
export const quartInOut = 'cubic-bezier(0.77, 0, 0.175, 1)';
export const quintIn    = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
export const quintOut   = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const quintInOut = 'cubic-bezier(0.86, 0, 0.07, 1)';
export const sineIn     = 'cubic-bezier(0.47, 0, 0.745, 0.715)';
export const sineOut    = 'cubic-bezier(0.39, 0.575, 0.565, 1)';
export const sineInOut  = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
export const expoIn     = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';
export const expoOut    = 'cubic-bezier(0.19, 1, 0.22, 1)';
export const expoInOut  = 'cubic-bezier(1, 0, 0, 1)';
export const circIn     = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';
export const circOut    = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
export const circInOut  = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';
export const backIn     = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
export const backOut    = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
export const backInOut  = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';


const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const widths = [1, 2, 3]; // this is width ratio

const ipsum = `Who controls the British crown?
Who keeps the metric system down?
Who keeps Atlantis off the maps?
Who keeps the Martians under wraps?
Who holds back the electric car?
Who makes Steve Guttenberg a star?
Who robs cavefish of their sight?
Who rigs every Oscar night?`.split('\n');

const enterExitStyles = ['Simple', 'Skew', 'Newspaper',
  'Fold Up', 'From Center', 'From Left to Right', 'From Top', 'From Bottom'];

function generateData(minItems: number) {
    return shuffle(alphabet)
      .slice(0, minItems +
        Math.floor(Math.random() * (26 - minItems)))
      .sort();
}

export default function App(){
    const [data, setData] = useState(generateData(10))
    const itemHeight = 190;
    const gridProps = {
      data: data,
      useCSS: false,
      responsive: true,
      layout: "horizontal",
      enterExitStyle: camelCase(enterExitStyles[0]),
      duration: 800,
      stiffness: 60,
      damping: 14,
      columns: 3,
      gutters: 5,
      easing: cubicOut
    }

    const items: JSX.Element[] = data.map(letter => {
      const contentIndex = letter.charCodeAt(0) % 6;
      const content = ipsum.slice(contentIndex, (contentIndex * 1.5 | 0) + 1);
      const widthRatio =shuffle(widths)[0]
      const gutters = 5

      return (
        <li
          className="grid-item"
          key={letter}
          //allow for custom prop on li
          //@ts-ignore
          dataRatio={widthRatio}
          style={{
            width: widthRatio * 150 +  gutters * (widthRatio - 1),
            height: itemHeight
          }}
        >
          <h3>{letter.toUpperCase()}</h3>
          {content.map((p, i) => <p key={i}>{p}</p>)}
          <p>{'We do! We do!'}</p>
        </li>
      );
    });

    return (
      <div>
        <Grid
        itemHeight={itemHeight}
        measured={true}
        {...gridProps}
        >
        {items}
      </Grid>
    </div>
    )
}