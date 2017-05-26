var _normalizeCssColor=require('normalize-css-color');var _normalizeCssColor2=_interopRequireDefault(_normalizeCssColor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var processColor=function processColor(color){var opacity=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;
if(
color===undefined||
color===null||
opacity===1&&typeof color==='string'&&color.charAt(0)!=='#')
{
return color;
}


var int32Color=(0,_normalizeCssColor2.default)(color);
if(int32Color===null){
return undefined;
}


var rgba=_normalizeCssColor2.default.rgba(int32Color);
rgba.a=rgba.a.toFixed(1);var
r=rgba.r;var g=rgba.g;var b=rgba.b;var a=rgba.a;
return'rgba('+r+','+g+','+b+','+a*opacity+')';
};

module.exports=processColor;