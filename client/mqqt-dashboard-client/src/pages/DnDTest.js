import React from 'react';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import TestGridItem from '../components/testComponents/TestGridItem';
import GridItemWrapper from '../components/reactGridLayoutComponents/GridItemWrapper';





var DnDTest = React.createClass({
  onDragStop(layout) {
    console.log(layout);
  },
  render() {
  return (
    <ResponsiveReactGridLayout className="layout" onDragStop={this.onDragStop}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
      <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: false}}>a</div>
        <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
        <GridItemWrapper  key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>
          <TestGridItem />
        </ GridItemWrapper >
    </ResponsiveReactGridLayout>
  )
}
});

module.exports = DnDTest;
