











'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};








var _createReactClass=require('create-react-class');var _createReactClass2=_interopRequireDefault(_createReactClass);
var _propTypes=require('prop-types');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var EdgeInsetsPropType=require('../../propTypes/EdgeInsetsPropType');var React=require('react');var TimerMixin=require('react-timer-mixin');var Touchable=require('./Touchable');var ensurePositiveDelayProps=require('./ensurePositiveDelayProps');var warning=require('fbjs/lib/warning');var StyleSheet=require('../../apis/StyleSheet');



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};










var TouchableWithoutFeedback=(0,_createReactClass2.default)({
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:_propTypes.bool,
accessibilityLabel:_propTypes.string,
accessibilityRole:_propTypes.string,



disabled:_propTypes.bool,




onPress:_propTypes.func,
onPressIn:_propTypes.func,
onPressOut:_propTypes.func,





onLayout:_propTypes.func,

onLongPress:_propTypes.func,




delayPressIn:_propTypes.number,



delayPressOut:_propTypes.number,



delayLongPress:_propTypes.number,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return this.touchableGetInitialState();
},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
},





touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);
},

touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);
},

touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;
},

touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;
},

touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:this.props.delayLongPress||500;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut||0;
},

render:function render(){var _props=












this.props;var delayLongPress=_props.delayLongPress;var delayPressIn=_props.delayPressIn;var delayPressOut=_props.delayPressOut;var onLongPress=_props.onLongPress;var onPress=_props.onPress;var onPressIn=_props.onPressIn;var onPressOut=_props.onPressOut;var pressRetentionOffset=_props.pressRetentionOffset;var other=_objectWithoutProperties(_props,['delayLongPress','delayPressIn','delayPressOut','onLongPress','onPress','onPressIn','onPressOut','pressRetentionOffset']);


var child=React.Children.only(this.props.children);
var children=child.props.children;
warning(
!child.type||child.type.displayName!=='Text',
'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See '+(
child._owner&&child._owner.getName&&child._owner.getName()||'<unknown>'));

if(
process.env.NODE_ENV!=='production'&&
Touchable.TOUCH_TARGET_DEBUG&&
child.type&&
child.type.displayName==='View')
{
children=React.Children.toArray(children);
children.push(Touchable.renderDebugView({color:'red',hitSlop:this.props.hitSlop}));
}
var style=Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='Text'?
[styles.root,this.props.disabled&&styles.disabled,child.props.style,{color:'red'}]:
[styles.root,this.props.disabled&&styles.disabled,child.props.style];
return React.cloneElement(child,_extends({},
other,{
accessible:this.props.accessible!==false,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:style,
children:children}));

}});


var styles=StyleSheet.create({
root:{
cursor:'pointer'},

disabled:{
cursor:'default'}});



module.exports=TouchableWithoutFeedback;