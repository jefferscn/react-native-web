var Linking={
addEventListener:function addEventListener(){},
removeEventListener:function removeEventListener(){},
canOpenURL:function canOpenURL(){
return Promise.resolve(true);
},
getInitialURL:function getInitialURL(){
return Promise.resolve('');
},
openURL:function openURL(url){
try{
iframeOpen(url);
return Promise.resolve();
}catch(e){
return Promise.reject(e);
}
}};












var iframeOpen=function iframeOpen(url){
var noOpener=url.indexOf('mailto:')!==0;
var iframe=document.createElement('iframe');
iframe.style.display='none';
document.body.appendChild(iframe);

var iframeDoc=iframe.contentDocument||iframe.contentWindow.document;
var script=iframeDoc.createElement('script');
script.text='\n    window.parent = null; window.top = null; window.frameElement = null;\n    var child = window.open("'+

url+'"); '+(noOpener&&'child.opener = null')+';\n  ';

iframeDoc.body.appendChild(script);
document.body.removeChild(iframe);
};

module.exports=Linking;