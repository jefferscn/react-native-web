











'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};













var _createReactClass=require('create-react-class');var _createReactClass2=_interopRequireDefault(_createReactClass);
var _propTypes=require('prop-types');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var ColorPropType=require('../../propTypes/ColorPropType');var NativeMethodsMixin=require('../../modules/NativeMethodsMixin');var React=require('react');var StyleSheet=require('../../apis/StyleSheet');var StyleSheetPropType=require('../../propTypes/StyleSheetPropType');var TimerMixin=require('react-timer-mixin');var Touchable=require('./Touchable');var TouchableWithoutFeedback=require('./TouchableWithoutFeedback');var View=require('../View');var ViewStylePropTypes=require('../View/ViewStylePropTypes');

var ensureComponentIsNative=require('./ensureComponentIsNative');
var ensurePositiveDelayProps=require('./ensurePositiveDelayProps');



var DEFAULT_PROPS={
activeOpacity:0.85,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};




























var TouchableHighlight=(0,_createReactClass2.default)({
propTypes:_extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:_propTypes.number,




underlayColor:ColorPropType,
style:StyleSheetPropType(ViewStylePropTypes),



onShowUnderlay:_propTypes.func,



onHideUnderlay:_propTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function getDefaultProps(){return DEFAULT_PROPS;},


computeSyntheticState:function computeSyntheticState(props){var
activeOpacity=props.activeOpacity;var style=props.style;var underlayColor=props.underlayColor;
return{
activeProps:{
style:{
opacity:activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:underlayColor}},


underlayStyle:[INACTIVE_UNDERLAY_PROPS.style,props.style]};

},

getInitialState:function getInitialState(){
return _extends({},
this.touchableGetInitialState(),
this.computeSyntheticState(this.props));

},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);
this._isMounted=true;
},

componentDidUpdate:function componentDidUpdate(){
ensureComponentIsNative(this.refs[CHILD_REF]);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
if(
nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style)
{
this.setState(this.computeSyntheticState(nextProps));
}
},

componentWillUnmount:function componentWillUnmount(){
this._isMounted=false;
},










touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);
},

touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._hideUnderlay();
}
this.props.onPressOut&&this.props.onPressOut(e);
},

touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,this.props.delayPressOut||100);
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
return this.props.delayPressIn;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;
},

_showUnderlay:function _showUnderlay(){
if(!this._isMounted||!this._hasPressHandler()){
return;
}

this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();
},

_hideUnderlay:function _hideUnderlay(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(_extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();
}
},

_hasPressHandler:function _hasPressHandler(){
return!!(this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);
},

_onKeyEnter:function _onKeyEnter(e,callback){
var ENTER=13;
if((e.type==='keypress'?e.charCode:e.keyCode)===ENTER){
callback&&callback(e);
e.stopPropagation();
}
},

render:function render(){var _this=this;var _props=
















this.props;var activeOpacity=_props.activeOpacity;var onHideUnderlay=_props.onHideUnderlay;var onShowUnderlay=_props.onShowUnderlay;var underlayColor=_props.underlayColor;var delayLongPress=_props.delayLongPress;var delayPressIn=_props.delayPressIn;var delayPressOut=_props.delayPressOut;var onLongPress=_props.onLongPress;var onPress=_props.onPress;var onPressIn=_props.onPressIn;var onPressOut=_props.onPressOut;var pressRetentionOffset=_props.pressRetentionOffset;var other=_objectWithoutProperties(_props,['activeOpacity','onHideUnderlay','onShowUnderlay','underlayColor','delayLongPress','delayPressIn','delayPressOut','onLongPress','onPress','onPressIn','onPressOut','pressRetentionOffset']);

return(
React.createElement(View,_extends({},
other,{
accessible:this.props.accessible!==false,
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
onResponderTerminate:this.touchableHandleResponderTerminate,
ref:UNDERLAY_REF,
style:[styles.root,this.props.disabled&&styles.disabled,this.state.underlayStyle]}),

React.cloneElement(React.Children.only(this.props.children),{
ref:CHILD_REF}),

Touchable.renderDebugView({color:'green',hitSlop:this.props.hitSlop})));


}});


var CHILD_REF='childRef';
var UNDERLAY_REF='underlayRef';

var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


var styles=StyleSheet.create({
root:{
cursor:'pointer',
userSelect:'none'},

disabled:{
cursor:'default'}});



module.exports=TouchableHighlight;