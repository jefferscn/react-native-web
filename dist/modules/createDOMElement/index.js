require('../injectResponderEventPlugin');

var _AccessibilityUtil=require('../AccessibilityUtil');var _AccessibilityUtil2=_interopRequireDefault(_AccessibilityUtil);
var _createDOMProps=require('../createDOMProps');var _createDOMProps2=_interopRequireDefault(_createDOMProps);
var _modality=require('../modality');var _modality2=_interopRequireDefault(_modality);
var _normalizeNativeEvent=require('../normalizeNativeEvent');var _normalizeNativeEvent2=_interopRequireDefault(_normalizeNativeEvent);
var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

(0,_modality2.default)();

var eventHandlerNames={
onClick:true,
onClickCapture:true,
onMoveShouldSetResponder:true,
onMoveShouldSetResponderCapture:true,
onResponderGrant:true,
onResponderMove:true,
onResponderReject:true,
onResponderRelease:true,
onResponderTerminate:true,
onResponderTerminationRequest:true,
onStartShouldSetResponder:true,
onStartShouldSetResponderCapture:true,
onTouchCancel:true,
onTouchCancelCapture:true,
onTouchEnd:true,
onTouchEndCapture:true,
onTouchMove:true,
onTouchMoveCapture:true,
onTouchStart:true,
onTouchStartCapture:true};


var wrapEventHandler=function wrapEventHandler(handler){return function(e){
e.nativeEvent=(0,_normalizeNativeEvent2.default)(e.nativeEvent);
return handler(e);
};};

var createDOMElement=function createDOMElement(component,props){

var accessibilityComponent=_AccessibilityUtil2.default.propsToAccessibilityComponent(props);
var Component=accessibilityComponent||component;
var domProps=(0,_createDOMProps2.default)(props);



for(var prop in domProps){
if(Object.prototype.hasOwnProperty.call(domProps,prop)){
var isEventHandler=typeof prop==='function'&&eventHandlerNames[prop];
if(isEventHandler){
domProps[prop]=wrapEventHandler(prop);
}
}
}

return _react2.default.createElement(Component,domProps);
};

module.exports=createDOMElement;