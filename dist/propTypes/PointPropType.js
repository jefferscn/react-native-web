











'use strict';

var _propTypes=require('prop-types');

var PointPropType=require('./createStrictShapeTypeChecker')({
x:_propTypes.number,
y:_propTypes.number});


module.exports=PointPropType;