var accessibilityComponentTypeToRole={
button:'button',
none:'presentation'};


var accessibilityTraitsToRole={
adjustable:'slider',
button:'button',
header:'heading',
image:'img',
link:'link',
none:'presentation',
search:'search',
summary:'region'};


var propsToAriaRole=function propsToAriaRole(_ref)



{var accessibilityComponentType=_ref.accessibilityComponentType;var accessibilityRole=_ref.accessibilityRole;var accessibilityTraits=_ref.accessibilityTraits;
if(accessibilityRole){
return accessibilityRole;
}
if(accessibilityTraits){
var trait=Array.isArray(accessibilityTraits)?accessibilityTraits[0]:accessibilityTraits;
return accessibilityTraitsToRole[trait];
}
if(accessibilityComponentType){
return accessibilityComponentTypeToRole[accessibilityComponentType];
}
};

module.exports=propsToAriaRole;