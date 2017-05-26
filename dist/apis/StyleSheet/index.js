var _flattenStyle=require('./flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);
var _registry=require('./registry');var _registry2=_interopRequireDefault(_registry);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var absoluteFillObject={
position:'absolute',
left:0,
right:0,
top:0,
bottom:0};

var absoluteFill=_registry2.default.register(absoluteFillObject);

module.exports={
absoluteFill:absoluteFill,
absoluteFillObject:absoluteFillObject,
create:function create(styles){
var result={};
Object.keys(styles).forEach(function(key){
if(process.env.NODE_ENV!=='production'){
require('./StyleSheetValidation').validateStyle(key,styles);
}
result[key]=_registry2.default.register(styles[key]);
});
return result;
},
hairlineWidth:1,
flatten:_flattenStyle2.default,
renderToString:function renderToString(){
return _registry2.default.getStyleSheetHtml();
}};