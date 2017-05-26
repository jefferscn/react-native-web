var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Clipboard=function(){function Clipboard(){_classCallCheck(this,Clipboard);}_createClass(Clipboard,null,[{key:'isSupported',value:function isSupported()
{
return(
typeof document.queryCommandSupported==='function'&&document.queryCommandSupported('copy'));

}},{key:'getString',value:function getString()

{
return Promise.resolve('');
}},{key:'setString',value:function setString(

text){
var success=false;


var node=document.createElement('span');
node.textContent=text;
node.style.position='absolute';
node.style.opacity='0';
document.body.appendChild(node);


var selection=window.getSelection();
selection.removeAllRanges();
var range=document.createRange();
range.selectNodeContents(node);
selection.addRange(range);


try{
document.execCommand('copy');
success=true;
}catch(e){}


selection.removeAllRanges();
document.body.removeChild(node);

return success;
}}]);return Clipboard;}();


module.exports=Clipboard;