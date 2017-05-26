var _propsToAriaRole=require('./propsToAriaRole');var _propsToAriaRole2=_interopRequireDefault(_propsToAriaRole);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var propsToTabIndex=function propsToTabIndex(props){
var ariaRole=(0,_propsToAriaRole2.default)(props);
var focusable=
props.disabled!==true&&
props.importantForAccessibility!=='no'&&
props.importantForAccessibility!=='no-hide-descendants';
var focusableRole=ariaRole==='button'||ariaRole==='link';

if(focusableRole){
if(props.accessible===false||!focusable){
return'-1';
}
}else{
if(props.accessible===true&&focusable){
return'0';
}
}
};

module.exports=propsToTabIndex;