











'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};










var _createReactClass=require('create-react-class');var _createReactClass2=_interopRequireDefault(_createReactClass);
var _propTypes=require('prop-types');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var NativeMethodsMixin=require('../../modules/NativeMethodsMixin');var React=require('react');var StyleSheet=require('../../apis/StyleSheet');var TimerMixin=require('react-timer-mixin');var Touchable=require('./Touchable');var TouchableWithoutFeedback=require('./TouchableWithoutFeedback');var View=require('../View');

var ensurePositiveDelayProps=require('./ensurePositiveDelayProps');
var flattenStyle=StyleSheet.flatten;



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};






















var TouchableOpacity=(0,_createReactClass2.default)({
mixins:[TimerMixin,Touchable.Mixin,NativeMethodsMixin],

propTypes:_extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:_propTypes.number,
focusedOpacity:_propTypes.number}),


getDefaultProps:function getDefaultProps(){
return{
activeOpacity:0.2,
focusedOpacity:0.7};

},

getInitialState:function getInitialState(){
return this.touchableGetInitialState();
},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
},

setOpacityTo:function setOpacityTo(value,duration){
this.setNativeProps({
style:{
opacity:value,
transitionDuration:duration/1000+'s'}});


},





touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
if(e.dispatchConfig.registrationName==='onResponderGrant'){
this._opacityActive(0);
}else{
this._opacityActive(150);
}
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this._opacityInactive(250);
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);
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
return this.props.delayPressOut;
},

_opacityActive:function _opacityActive(duration){
this.setOpacityTo(this.props.activeOpacity,duration);
},

_opacityInactive:function _opacityInactive(duration){
var childStyle=flattenStyle(this.props.style)||{};
this.setOpacityTo(childStyle.opacity===undefined?1:childStyle.opacity,duration);
},

_opacityFocused:function _opacityFocused(){
this.setOpacityTo(this.props.focusedOpacity);
},

_onKeyEnter:function _onKeyEnter(e,callback){
var ENTER=13;
if((e.type==='keypress'?e.charCode:e.keyCode)===ENTER){
callback&&callback(e);
e.stopPropagation();
}
},

render:function render(){var _this=this;var _props=














this.props;var activeOpacity=_props.activeOpacity;var focusedOpacity=_props.focusedOpacity;var delayLongPress=_props.delayLongPress;var delayPressIn=_props.delayPressIn;var delayPressOut=_props.delayPressOut;var onLongPress=_props.onLongPress;var onPress=_props.onPress;var onPressIn=_props.onPressIn;var onPressOut=_props.onPressOut;var pressRetentionOffset=_props.pressRetentionOffset;var other=_objectWithoutProperties(_props,['activeOpacity','focusedOpacity','delayLongPress','delayPressIn','delayPressOut','onLongPress','onPress','onPressIn','onPressOut','pressRetentionOffset']);

return(
React.createElement(View,_extends({},
other,{
accessible:this.props.accessible!==false,
style:[styles.root,this.props.disabled&&styles.disabled,this.props.style],
onKeyDown:function onKeyDown(e){
_this._onKeyEnter(e,_this.touchableHandleActivePressIn);
},
onKeyPress:function onKeyPress(e){
_this._onKeyEnter(e,_this.touchableHandlePress);
},
onKeyUp:function onKeyUp(e){
_this._onKeyEnter(e,_this.touchableHandleActivePressOut);
},
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate}),

this.props.children,
Touchable.renderDebugView({color:'blue',hitSlop:this.props.hitSlop})));


}});


var styles=StyleSheet.create({
root:{
cursor:'pointer',
transitionProperty:'opacity',
transitionDuration:'0.15s',
userSelect:'none'},

disabled:{
cursor:'default'}});



module.exports=TouchableOpacity;