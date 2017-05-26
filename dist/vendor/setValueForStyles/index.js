











'use strict';

var _unitlessNumbers=require('../../modules/unitlessNumbers');var _unitlessNumbers2=_interopRequireDefault(_unitlessNumbers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

if(process.env.NODE_ENV!=='production'){
var camelizeStyleName=require('fbjs/lib/camelizeStyleName');
var warning=require('fbjs/lib/warning');


var badVendoredStyleNamePattern=/^(?:webkit|moz|o)[A-Z]/;


var badStyleValueWithSemicolonPattern=/;\s*$/;

var warnedStyleNames={};
var warnedStyleValues={};
var warnedForNaNValue=false;

var warnHyphenatedStyleName=function warnHyphenatedStyleName(name,owner){
if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){
return;
}

warnedStyleNames[name]=true;
process.env.NODE_ENV!=='production'?
warning(
false,
'Unsupported style property %s. Did you mean %s?%s',
name,
camelizeStyleName(name),
checkRenderMessage(owner)):

void 0;
};

var warnBadVendoredStyleName=function warnBadVendoredStyleName(name,owner){
if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){
return;
}

warnedStyleNames[name]=true;
process.env.NODE_ENV!=='production'?
warning(
false,
'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',
name,
name.charAt(0).toUpperCase()+name.slice(1),
checkRenderMessage(owner)):

void 0;
};

var warnStyleValueWithSemicolon=function warnStyleValueWithSemicolon(name,value,owner){
if(warnedStyleValues.hasOwnProperty(value)&&warnedStyleValues[value]){
return;
}

warnedStyleValues[value]=true;
process.env.NODE_ENV!=='production'?
warning(
false,
"Style property values shouldn't contain a semicolon.%s "+'Try "%s: %s" instead.',
checkRenderMessage(owner),
name,
value.replace(badStyleValueWithSemicolonPattern,'')):

void 0;
};

var warnStyleValueIsNaN=function warnStyleValueIsNaN(name,value,owner){
if(warnedForNaNValue){
return;
}

warnedForNaNValue=true;
process.env.NODE_ENV!=='production'?
warning(
false,
'`NaN` is an invalid value for the `%s` css style property.%s',
name,
checkRenderMessage(owner)):

void 0;
};

var checkRenderMessage=function checkRenderMessage(owner){
if(owner){
var name=owner.getName();
if(name){
return' Check the render method of `'+name+'`.';
}
}
return'';
};






var warnValidStyle=function warnValidStyle(name,value,component){
var owner;
if(component){
owner=component._currentElement._owner;
}
if(name.indexOf('-')>-1){
warnHyphenatedStyleName(name,owner);
}else if(badVendoredStyleNamePattern.test(name)){
warnBadVendoredStyleName(name,owner);
}else if(badStyleValueWithSemicolonPattern.test(value)){
warnStyleValueWithSemicolon(name,value,owner);
}

if(typeof value==='number'&&isNaN(value)){
warnStyleValueIsNaN(name,value,owner);
}
};
}

var styleWarnings={};










function dangerousStyleValue(name,value,component){










var isEmpty=value==null||typeof value==='boolean'||value==='';
if(isEmpty){
return'';
}

var isNonNumeric=isNaN(value);
if(
isNonNumeric||
value===0||
_unitlessNumbers2.default.hasOwnProperty(name)&&_unitlessNumbers2.default[name])
{
return''+value;
}

if(typeof value==='string'){
if(process.env.NODE_ENV!=='production'){
var warning=require('fbjs/lib/warning');



if(component&&value!=='0'){
var owner=component._currentElement._owner;
var ownerName=owner?owner.getName():null;
if(ownerName&&!styleWarnings[ownerName]){
styleWarnings[ownerName]={};
}
var warned=false;
if(ownerName){
var warnings=styleWarnings[ownerName];
warned=warnings[name];
if(!warned){
warnings[name]=true;
}
}
if(!warned){
process.env.NODE_ENV!=='production'?
warning(
false,
'a `%s` tag (owner: `%s`) was passed a numeric string value '+
'for CSS property `%s` (value: `%s`) which will be treated '+
'as a unitless number in a future version of React.',
component._currentElement.type,
ownerName||'unknown',
name,
value):

void 0;
}
}
}
value=value.trim();
}
return value+'px';
}









var setValueForStyles=function setValueForStyles(node,styles,component){
var style=node.style;
for(var styleName in styles){
if(!styles.hasOwnProperty(styleName)){
continue;
}
if(process.env.NODE_ENV!=='production'){
warnValidStyle(styleName,styles[styleName],component);
}
var styleValue=dangerousStyleValue(styleName,styles[styleName],component);
if(styleName==='float'||styleName==='cssFloat'){
styleName='cssFloat';
}
if(styleValue){
style[styleName]=styleValue;
}else{
style[styleName]='';
}
}
};

module.exports=setValueForStyles;