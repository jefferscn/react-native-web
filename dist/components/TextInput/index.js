var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _applyLayout=require('../../modules/applyLayout');var _applyLayout2=_interopRequireDefault(_applyLayout);
var _applyNativeMethods=require('../../modules/applyNativeMethods');var _applyNativeMethods2=_interopRequireDefault(_applyNativeMethods);
var _react=require('react');
var _NativeMethodsMixin=require('../../modules/NativeMethodsMixin');var _NativeMethodsMixin2=_interopRequireDefault(_NativeMethodsMixin);
var _createDOMElement=require('../../modules/createDOMElement');var _createDOMElement2=_interopRequireDefault(_createDOMElement);
var _findNodeHandle=require('../../modules/findNodeHandle');var _findNodeHandle2=_interopRequireDefault(_findNodeHandle);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);
var _StyleSheetPropType=require('../../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);
var _TextInputStylePropTypes=require('./TextInputStylePropTypes');var _TextInputStylePropTypes2=_interopRequireDefault(_TextInputStylePropTypes);
var _TextInputState=require('./TextInputState');var _TextInputState2=_interopRequireDefault(_TextInputState);
var _ViewPropTypes=require('../View/ViewPropTypes');var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);
var _propTypes=require('prop-types');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var emptyObject={};




var normalizeEventHandler=function normalizeEventHandler(handler){return function(e){
if(handler){
e.nativeEvent.text=e.target.value;
return handler(e);
}
};};





var isSelectionStale=function isSelectionStale(node,selection){
if(node&&selection){var
selectionEnd=node.selectionEnd;var selectionStart=node.selectionStart;var
start=selection.start;var end=selection.end;
return start!==selectionStart||end!==selectionEnd;
}
return false;
};





var setSelection=function setSelection(node,selection){
try{
if(isSelectionStale(node,selection)){var
start=selection.start;var end=selection.end;
node.setSelectionRange(start,end||start);
}
}catch(e){}
};var

TextInput=function(_Component){_inherits(TextInput,_Component);function TextInput(){var _ref;var _temp,_this,_ret;_classCallCheck(this,TextInput);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=TextInput.__proto__||Object.getPrototypeOf(TextInput)).call.apply(_ref,[this].concat(args))),_this),_this.












































































































































































_handleBlur=function(e){var
onBlur=_this.props.onBlur;
if(onBlur){
onBlur(e);
}
},_this.

_handleChange=function(e){var _this$props=
_this.props;var onChange=_this$props.onChange;var onChangeText=_this$props.onChangeText;var
text=e.nativeEvent.text;
if(onChange){
onChange(e);
}
if(onChangeText){
onChangeText(text);
}
},_this.

_handleFocus=function(e){var _this$props2=
_this.props;var clearTextOnFocus=_this$props2.clearTextOnFocus;var onFocus=_this$props2.onFocus;var selectTextOnFocus=_this$props2.selectTextOnFocus;
var node=_this._node;
if(onFocus){
onFocus(e);
}
if(clearTextOnFocus){
_this.clear();
}
if(selectTextOnFocus){
node&&node.select();
}
},_this.

_handleKeyPress=function(e){var _this$props3=
_this.props;var blurOnSubmit=_this$props3.blurOnSubmit;var multiline=_this$props3.multiline;var onKeyPress=_this$props3.onKeyPress;var onSubmitEditing=_this$props3.onSubmitEditing;
var blurOnSubmitDefault=!multiline;
var shouldBlurOnSubmit=blurOnSubmit==null?blurOnSubmitDefault:blurOnSubmit;
if(onKeyPress){
onKeyPress(e);
}
if(!e.isDefaultPrevented()&&e.which===13){
if(onSubmitEditing){
onSubmitEditing(e);
}
if(shouldBlurOnSubmit){
_this.blur();
}
}
},_this.

_handleSelectionChange=function(e){var _this$props4=
_this.props;var onSelectionChange=_this$props4.onSelectionChange;var _this$props4$selectio=_this$props4.selection;var selection=_this$props4$selectio===undefined?emptyObject:_this$props4$selectio;
if(onSelectionChange){
try{
var node=e.target;
if(isSelectionStale(node,selection)){var
selectionStart=node.selectionStart;var selectionEnd=node.selectionEnd;
e.nativeEvent.selection={
start:selectionStart,
end:selectionEnd};

onSelectionChange(e);
}
}catch(e){}
}
},_this.

_setNode=function(component){
_this._node=(0,_findNodeHandle2.default)(component);
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(TextInput,[{key:'blur',value:function blur(){_TextInputState2.default.blurTextInput(this._node);}},{key:'clear',value:function clear(){this._node.value='';}},{key:'focus',value:function focus(){_TextInputState2.default.focusTextInput(this._node);}},{key:'isFocused',value:function isFocused(){return _TextInputState2.default.currentlyFocusedField()===this._node;}},{key:'setNativeProps',value:function setNativeProps(props){_NativeMethodsMixin2.default.setNativeProps.call(this,props);}},{key:'componentDidMount',value:function componentDidMount(){setSelection(this._node,this.props.selection);}},{key:'componentDidUpdate',value:function componentDidUpdate(){setSelection(this._node,this.props.selection);}},{key:'render',value:function render(){var _props=this.props;var autoCorrect=_props.autoCorrect;var editable=_props.editable;var keyboardType=_props.keyboardType;var multiline=_props.multiline;var numberOfLines=_props.numberOfLines;var secureTextEntry=_props.secureTextEntry;var style=_props.style;var blurOnSubmit=_props.blurOnSubmit;var caretHidden=_props.caretHidden;var clearButtonMode=_props.clearButtonMode;var clearTextOnFocus=_props.clearTextOnFocus;var dataDetectorTypes=_props.dataDetectorTypes;var enablesReturnKeyAutomatically=_props.enablesReturnKeyAutomatically;var keyboardAppearance=_props.keyboardAppearance;var onChangeText=_props.onChangeText;var onContentSizeChange=_props.onContentSizeChange;var onEndEditing=_props.onEndEditing;var onLayout=_props.onLayout;var onSelectionChange=_props.onSelectionChange;var onSubmitEditing=_props.onSubmitEditing;var placeholderTextColor=_props.placeholderTextColor;var returnKeyType=_props.returnKeyType;var selection=_props.selection;var selectionColor=_props.selectionColor;var selectTextOnFocus=_props.selectTextOnFocus;var textBreakStrategy=_props.textBreakStrategy;var underlineColorAndroid=_props.underlineColorAndroid;var otherProps=_objectWithoutProperties(_props,['autoCorrect','editable','keyboardType','multiline','numberOfLines','secureTextEntry','style','blurOnSubmit','caretHidden','clearButtonMode','clearTextOnFocus','dataDetectorTypes','enablesReturnKeyAutomatically','keyboardAppearance','onChangeText','onContentSizeChange','onEndEditing','onLayout','onSelectionChange','onSubmitEditing','placeholderTextColor','returnKeyType','selection','selectionColor','selectTextOnFocus','textBreakStrategy','underlineColorAndroid']);var type=void 0;switch(keyboardType){case'email-address':type='email';break;case'number-pad':case'numeric':type='number';break;case'phone-pad':type='tel';break;case'search':case'web-search':type='search';break;case'url':type='url';break;default:type='text';}if(secureTextEntry){type='password';}var component=multiline?'textarea':'input';_extends(otherProps,{autoCorrect:autoCorrect?'on':'off',dir:'auto',onBlur:normalizeEventHandler(this._handleBlur),onChange:normalizeEventHandler(this._handleChange),onFocus:normalizeEventHandler(this._handleFocus),onKeyPress:normalizeEventHandler(this._handleKeyPress),onSelect:normalizeEventHandler(this._handleSelectionChange),readOnly:!editable,ref:this._setNode,style:[styles.initial,style]});if(multiline){otherProps.rows=numberOfLines;}else{otherProps.type=type;}return(0,_createDOMElement2.default)(component,otherProps);}}]);return TextInput;}(_react.Component);TextInput.displayName='TextInput';TextInput.defaultProps={autoCapitalize:'sentences',autoComplete:'on',autoCorrect:true,editable:true,keyboardType:'default',multiline:false,numberOfLines:2,secureTextEntry:false,style:emptyObject};TextInput.State=_TextInputState2.default;TextInput.propTypes=process.env.NODE_ENV!=="production"?_extends({},_ViewPropTypes2.default,{autoCapitalize:(0,_propTypes.oneOf)(['characters','none','sentences','words']),autoComplete:_propTypes.string,autoCorrect:_propTypes.bool,autoFocus:_propTypes.bool,blurOnSubmit:_propTypes.bool,clearTextOnFocus:_propTypes.bool,defaultValue:_propTypes.string,editable:_propTypes.bool,keyboardType:(0,_propTypes.oneOf)(['default','email-address','number-pad','numeric','phone-pad','search','url','web-search']),maxLength:_propTypes.number,multiline:_propTypes.bool,numberOfLines:_propTypes.number,onBlur:_propTypes.func,onChange:_propTypes.func,onChangeText:_propTypes.func,onFocus:_propTypes.func,onKeyPress:_propTypes.func,onSelectionChange:_propTypes.func,onSubmitEditing:_propTypes.func,placeholder:_propTypes.string,placeholderTextColor:_propTypes.string,secureTextEntry:_propTypes.bool,selectTextOnFocus:_propTypes.bool,selection:(0,_propTypes.shape)({start:_propTypes.number.isRequired,end:_propTypes.number}),style:(0,_StyleSheetPropType2.default)(_TextInputStylePropTypes2.default),value:_propTypes.string}):{};


var styles=_StyleSheet2.default.create({
initial:{
appearance:'none',
backgroundColor:'transparent',
borderColor:'black',
borderRadius:0,
borderWidth:0,
boxSizing:'border-box',
color:'inherit',
font:'inherit',
padding:0,
resize:'none'}});



module.exports=(0,_applyLayout2.default)((0,_applyNativeMethods2.default)(TextInput));