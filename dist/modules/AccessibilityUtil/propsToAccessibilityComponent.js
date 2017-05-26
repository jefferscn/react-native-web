var _propsToAriaRole=require('./propsToAriaRole');var _propsToAriaRole2=_interopRequireDefault(_propsToAriaRole);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var roleComponents={
article:'article',
banner:'header',
button:'button',
complementary:'aside',
contentinfo:'footer',
form:'form',
link:'a',
list:'ul',
listitem:'li',
main:'main',
navigation:'nav',
region:'section'};


var emptyObject={};

var propsToAccessibilityComponent=function propsToAccessibilityComponent(){var props=arguments.length>0&&arguments[0]!==undefined?arguments[0]:emptyObject;
var role=(0,_propsToAriaRole2.default)(props);
if(role==='heading'){
var level=props['aria-level']||1;
return'h'+level;
}
return roleComponents[role];
};

module.exports=propsToAccessibilityComponent;