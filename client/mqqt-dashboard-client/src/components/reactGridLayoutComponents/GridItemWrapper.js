import React from 'react';

/*
 *  GridItemWrapper
 *  it is used as a Wrapper of the items in a ResponsiveReactGridLayout component
 *  It gives the with of the grid Items to the Childcomponent.
 *
 *
 *  @props key type string: Is the name of the element in the ReactGrid,
 *    data-grid type object: says where is schould be placed on the grid
 *      example = {x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}
 *  @Children type reactComponent: the Component thath should be shown in the grid
 *  @Children.props width: type string: width of the Griditem,
 *    height type string: height of the Griditem
 */
var GridItemWrapper = React.createClass({
    render: function () {
        var that = this;
        var newChildren = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { width: that.props.style.width,
            height: that.props.style.height})
            });
      return (
        <div {...this.props}>
            {newChildren}
        </div>
      );
    }
});

module.exports = GridItemWrapper;
