Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _CSSTransitionGroup=require('react-transition-group/CSSTransitionGroup');var _CSSTransitionGroup2=_interopRequireDefault(_CSSTransitionGroup);
var _ModalPropTypes=require('./ModalPropTypes');var _ModalPropTypes2=_interopRequireDefault(_ModalPropTypes);
var _RenderToTopLayer=require('./RenderToTopLayer');var _RenderToTopLayer2=_interopRequireDefault(_RenderToTopLayer);
var _View=require('../View');var _View2=_interopRequireDefault(_View);
var _StyleSheet=require('../../apis/StyleSheet');var _StyleSheet2=_interopRequireDefault(_StyleSheet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var StyleComponent=function StyleComponent(){return(
_react2.default.createElement('style',{
dangerouslySetInnerHTML:{
__html:'\n        .slide-enter {\n          transform: translate(100%);\n        }\n\n        .slide-enter.slide-enter-active {\n          transform: translate(0%);\n          transition: transform 500ms ease-in-out;\n        }\n\n        .slide-leave {\n          transform: translate(0%);\n        }\n\n        .slide-leave.slide-leave-active {\n          transform: translate(-100%);\n          transition: transform 300ms ease-in-out;\n        }\n\n        .fade-enter {\n          opacity: 0.01;\n        }\n\n        .fade-enter.fade-enter-active {\n          opacity: 1;\n          transition: opacity 500ms ease-in;\n        }\n\n        .fade-leave {\n          opacity: 1;\n        }\n\n        .fade-leave.fade-leave-active {\n          opacity: 0.01;\n          transition: opacity 300ms ease-in;\n        }\n      '}}));};var








































Modal=function(_Component){_inherits(Modal,_Component);function Modal(){_classCallCheck(this,Modal);return _possibleConstructorReturn(this,(Modal.__proto__||Object.getPrototypeOf(Modal)).apply(this,arguments));}_createClass(Modal,[{key:'render',value:function render()









{var _props=
this.props;var animationType=_props.animationType;var transparent=_props.transparent;var visible=_props.visible;var onShow=_props.onShow;
var contentStyles=[styles.modalConent];
contentStyles.push(transparent?styles.transparent:styles.noTransparent);
return(
_react2.default.createElement(_RenderToTopLayer2.default,{
closeTimeout:animationType==='none'?0:300,
onShow:onShow,
showTimeout:animationType==='none'?0:500,
transparent:transparent,
visible:visible},

_react2.default.createElement(_View2.default,null,
_react2.default.createElement(StyleComponent,null),
_react2.default.createElement(_CSSTransitionGroup2.default,{component:'div',
transitionEnter:animationType!=='none',
transitionEnterTimeout:500,
transitionLeave:animationType!=='none',
transitionLeaveTimeout:300,
transitionName:animationType},

visible&&_react2.default.Children.map(this.props.children,function(child){
return _react2.default.createElement(_View2.default,{style:contentStyles},child);
})))));



}}]);return Modal;}(_react.Component);Modal.displayName='Modal';Modal.defaultProps={animationType:'none',visible:true};Modal.propTypes=process.env.NODE_ENV!=="production"?_ModalPropTypes2.default:{};


var styles=_StyleSheet2.default.create({
modalConent:{
flexDirection:'column',
display:'flex',
position:'fixed',
top:0,
left:0,
bottom:0,
right:0},

transparent:{
backgroundColor:'transparent'},

noTransparent:{
backgroundColor:'white'}});exports.default=



Modal;