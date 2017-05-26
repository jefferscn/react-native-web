var _requestAnimationFrame=require('fbjs/lib/requestAnimationFrame');var _requestAnimationFrame2=_interopRequireDefault(_requestAnimationFrame);
var _setValueForStyles=require('../../vendor/setValueForStyles');var _setValueForStyles2=_interopRequireDefault(_setValueForStyles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var getRect=function getRect(node){
var height=node.offsetHeight;
var width=node.offsetWidth;
var left=0;
var top=0;
while(node&&node.nodeType===1){
left+=node.offsetLeft;
top+=node.offsetTop;
node=node.offsetParent;
}
return{height:height,left:left,top:top,width:width};
};

var _measureLayout=function _measureLayout(node,relativeToNativeNode,callback){
(0,_requestAnimationFrame2.default)(function(){
var relativeNode=relativeToNativeNode||node&&node.parentNode;
if(node&&relativeNode){
var relativeRect=getRect(relativeNode);var _getRect=
getRect(node);var height=_getRect.height;var left=_getRect.left;var top=_getRect.top;var width=_getRect.width;
var x=left-relativeRect.left;
var y=top-relativeRect.top;
callback(x,y,width,height,left,top);
}
});
};

var UIManager={
blur:function blur(node){
try{
node.blur();
}catch(err){}
},

focus:function focus(node){
try{
node.focus();
}catch(err){}
},

measure:function measure(node,callback){
_measureLayout(node,null,callback);
},

measureInWindow:function measureInWindow(node,callback){
(0,_requestAnimationFrame2.default)(function(){
if(node){var _getRect2=
getRect(node);var height=_getRect2.height;var left=_getRect2.left;var top=_getRect2.top;var width=_getRect2.width;
callback(left,top,width,height);
}
});
},

measureLayout:function measureLayout(node,relativeToNativeNode,onFail,onSuccess){
_measureLayout(node,relativeToNativeNode,onSuccess);
},

updateView:function updateView(node,props,component){
for(var prop in props){
if(!Object.prototype.hasOwnProperty.call(props,prop)){
continue;
}

var value=props[prop];
switch(prop){
case'style':{
(0,_setValueForStyles2.default)(node,value,component._reactInternalInstance);
break;
}
case'class':
case'className':{
node.setAttribute('class',value);
break;
}
case'text':
case'value':

node.value=value;
break;
default:
node.setAttribute(prop,value);}

}
}};


module.exports=UIManager;