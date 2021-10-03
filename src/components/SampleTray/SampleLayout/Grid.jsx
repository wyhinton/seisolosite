import React from 'react';
import isEqualWith from 'lodash.isequalwith';
import reactBrickwork, { SpringGrid, CSSGrid,
  makeResponsive, measureItems } from './react-stonecutter';

//test
export default class Grid extends React.Component {

  componentWillMount() {
    let Grid = CSSGrid;

    Grid = measureItems(Grid);

  //   Grid = makeResponsive(measureItems(Grid), {
  //     // maxWidth: 1920,
  //     // minPadding: 100
  // });
    Grid = makeResponsive(Grid);
    this.setState({ Grid })
    this.createGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqualWith(nextProps, this.props, (a, b, key) => {
      if (key === 'children') return true;
    })) {
      this.createGrid(nextProps);
    }
  }
  

  createGrid({ useCSS, measured, responsive }) {
    let Grid = useCSS ? CSSGrid : SpringGrid;

    if (measured) {
      Grid = measureItems(Grid);
    }

    if (responsive) {
      Grid = makeResponsive(Grid, {
        maxWidth: 1920,
        minPadding: 100
      });
    }

    this.setState({ Grid });
  }

  render() {
    const { children, useCSS, responsive, layout, enterExitStyle,
      duration, easing, stiffness, damping, gutters, columnWidth, columns, ...rest } = this.props;
    const { Grid } = this.state;
    const gridLayout = reactBrickwork.layout[layout];
    const gridEnterExitStyle = reactBrickwork.enterExitStyle[enterExitStyle];


    return (
      <Grid
        {...rest}
        className="grid"
        component="ul"
        columns={9}
        columnWidth={columnWidth}
        gutterWidth={gutters}
        gutterHeight={gutters}
        layout={gridLayout}
        enter={gridEnterExitStyle.enter}
        entered={gridEnterExitStyle.entered}
        exit={gridEnterExitStyle.exit}
        perspective={1000}
        duration = {200}
        duration={useCSS ? duration : null}
        easing={useCSS ? easing : null}
        springConfig={!useCSS && stiffness && damping ?
          { stiffness, damping } : null}
      >
        {children}
      </Grid>
    );
  }

};
