






module.exports=function StyleSheetPropType(shape){
var createStrictShapeTypeChecker=require('./createStrictShapeTypeChecker');
var StyleSheet=require('../apis/StyleSheet');

var shapePropType=createStrictShapeTypeChecker(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){

newProps={};
newProps[propName]=StyleSheet.flatten(props[propName]);
}
return shapePropType(newProps,propName,componentName,location);
};
};