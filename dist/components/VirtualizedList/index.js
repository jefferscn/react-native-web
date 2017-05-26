












'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var React=require('react');
var findNodeHandle=require('../../modules/findNodeHandle');
var ScrollView=require('../ScrollView');
var View=require('../View');var _require=
require('./VirtualizeUtils');var computeWindowedRenderLimits=_require.computeWindowedRenderLimits;
var FillRateHelper=require('./FillRateHelper');
var Batchinator=require('./Batchinator');
var ViewabilityHelper=require('./ViewabilityHelper');
var invariant=require('fbjs/lib/invariant');















































































































var _usedIndexForKey=false;var































VirtualizedList=function(_React$PureComponent){_inherits(VirtualizedList,_React$PureComponent);_createClass(VirtualizedList,[{key:'scrollToEnd',value:function scrollToEnd(



params){
var animated=params?params.animated:true;
var veryLast=this.props.getItemCount(this.props.data)-1;
var frame=this._getFrameMetricsApprox(veryLast);
var offset=frame.offset+frame.length+this._footerLength-
this._scrollMetrics.visibleLength;
this._scrollRef.scrollTo(
this.props.horizontal?{x:offset,animated:animated}:{y:offset,animated:animated});

}},{key:'scrollToIndex',value:function scrollToIndex(


params)

{var _props=
this.props;var data=_props.data;var horizontal=_props.horizontal;var getItemCount=_props.getItemCount;var getItemLayout=_props.getItemLayout;var
animated=params.animated;var index=params.index;var viewOffset=params.viewOffset;var viewPosition=params.viewPosition;
invariant(
index>=0&&index<getItemCount(data),'scrollToIndex out of range: '+
index+' vs '+(getItemCount(data)-1));

invariant(
getItemLayout||index<this._highestMeasuredFrameIndex,
'scrollToIndex should be used in conjunction with getItemLayout, '+
'otherwise there is no way to know the location of an arbitrary index.');

var frame=this._getFrameMetricsApprox(index);
var offset=Math.max(
0,
frame.offset-(viewPosition||0)*(this._scrollMetrics.visibleLength-frame.length))-(
viewOffset||0);
this._scrollRef.scrollTo(horizontal?{x:offset,animated:animated}:{y:offset,animated:animated});
}},{key:'scrollToItem',value:function scrollToItem(



params){var
item=params.item;var _props2=
this.props;var data=_props2.data;var getItem=_props2.getItem;var getItemCount=_props2.getItemCount;
var itemCount=getItemCount(data);
for(var _index=0;_index<itemCount;_index++){
if(getItem(data,_index)===item){
this.scrollToIndex(_extends({},params,{index:_index}));
break;
}
}
}},{key:'scrollToOffset',value:function scrollToOffset(

params){var
animated=params.animated;var offset=params.offset;
this._scrollRef.scrollTo(
this.props.horizontal?{x:offset,animated:animated}:{y:offset,animated:animated});

}},{key:'recordInteraction',value:function recordInteraction()

{
this._viewabilityHelper.recordInteraction();
this._updateViewableItems(this.props.data);
}},{key:'getScrollResponder',value:function getScrollResponder()






{
if(this._scrollRef&&this._scrollRef.getScrollResponder){
return this._scrollRef.getScrollResponder();
}
}},{key:'getScrollableNode',value:function getScrollableNode()

{
if(this._scrollRef&&this._scrollRef.getScrollableNode){
return this._scrollRef.getScrollableNode();
}else{
return findNodeHandle(this._scrollRef);
}
}}]);













































function VirtualizedList(props,context){_classCallCheck(this,VirtualizedList);var _this=_possibleConstructorReturn(this,(VirtualizedList.__proto__||Object.getPrototypeOf(VirtualizedList)).call(this,
props,context));_initialiseProps.call(_this);
invariant(
!props.onScroll||!props.onScroll.__isNative,
'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent '+
'to support native onScroll events with useNativeDriver');


_this._fillRateHelper=new FillRateHelper(_this._getFrameMetrics);
_this._updateCellsToRenderBatcher=new Batchinator(
_this._updateCellsToRender,
_this.props.updateCellsBatchingPeriod);

_this._viewabilityHelper=new ViewabilityHelper(_this.props.viewabilityConfig);
_this.state={
first:_this.props.initialScrollIndex||0,
last:Math.min(
_this.props.getItemCount(_this.props.data),
(_this.props.initialScrollIndex||0)+_this.props.initialNumToRender)-
1};return _this;

}_createClass(VirtualizedList,[{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;
if(this.props.initialScrollIndex){
this._initialScrollIndexTimeout=setTimeout(
function(){return _this2.scrollToIndex({animated:false,index:_this2.props.initialScrollIndex});},
0);

}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
this._updateViewableItems(null);
this._updateCellsToRenderBatcher.dispose();
this._viewabilityHelper.dispose();
this._fillRateHelper.deactivateAndFlush();
clearTimeout(this._initialScrollIndexTimeout);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

newProps){var
data=newProps.data;var extraData=newProps.extraData;var getItemCount=newProps.getItemCount;var maxToRenderPerBatch=newProps.maxToRenderPerBatch;


this.setState({
first:Math.max(0,Math.min(this.state.first,getItemCount(data)-1-maxToRenderPerBatch)),
last:Math.max(0,Math.min(this.state.last,getItemCount(data)-1))});

if(data!==this.props.data||extraData!==this.props.extraData){
this._hasDataChangedSinceEndReached=true;
}
this._updateCellsToRenderBatcher.schedule();
}},{key:'_pushCells',value:function _pushCells(


cells,
stickyHeaderIndices,
stickyIndicesFromProps,
first,
last)
{var _this3=this;var _props3=
this.props;var ItemSeparatorComponent=_props3.ItemSeparatorComponent;var data=_props3.data;var getItem=_props3.getItem;var getItemCount=_props3.getItemCount;var keyExtractor=_props3.keyExtractor;
var stickyOffset=this.props.ListHeaderComponent?1:0;
var end=getItemCount(data)-1;
var prevCellKey=void 0;
last=Math.min(end,last);var _loop=function _loop(
ii){
var item=getItem(data,ii);
invariant(item,'No item for index '+ii);
var key=keyExtractor(item,ii);
if(stickyIndicesFromProps.has(ii+stickyOffset)){
stickyHeaderIndices.push(cells.length);
}
cells.push(
React.createElement(CellRenderer,{
ItemSeparatorComponent:ii<end?ItemSeparatorComponent:undefined,
cellKey:key,
fillRateHelper:_this3._fillRateHelper,
index:ii,
item:item,
key:key,
prevCellKey:prevCellKey,
onUpdateSeparators:_this3._onUpdateSeparators,
onLayout:function onLayout(e){return _this3._onCellLayout(e,key,ii);},
onUnmount:_this3._onCellUnmount,
parentProps:_this3.props,
ref:function ref(_ref){_this3._cellRefs[key]=_ref;}}));


prevCellKey=key;};for(var ii=first;ii<=last;ii++){_loop(ii);
}
}},{key:'render',value:function render()








{var _props4=
this.props;var ListFooterComponent=_props4.ListFooterComponent;var ListHeaderComponent=_props4.ListHeaderComponent;var _props5=
this.props;var data=_props5.data;var disableVirtualization=_props5.disableVirtualization;var horizontal=_props5.horizontal;
var cells=[];
var stickyIndicesFromProps=new Set(this.props.stickyHeaderIndices);
var stickyHeaderIndices=[];
if(ListHeaderComponent){
var element=React.isValidElement(ListHeaderComponent)?
ListHeaderComponent:
React.createElement(ListHeaderComponent,null);
cells.push(
React.createElement(View,{key:'$header',onLayout:this._onLayoutHeader},
element));


}
var itemCount=this.props.getItemCount(data);
if(itemCount>0){
_usedIndexForKey=false;
var spacerKey=!horizontal?'height':'width';
var lastInitialIndex=this.props.initialScrollIndex?
-1:
this.props.initialNumToRender-1;var _state=
this.state;var _first=_state.first;var _last=_state.last;
this._pushCells(cells,stickyHeaderIndices,stickyIndicesFromProps,0,lastInitialIndex);
var firstAfterInitial=Math.max(lastInitialIndex+1,_first);
if(!disableVirtualization&&_first>lastInitialIndex+1){
var insertedStickySpacer=false;
if(stickyIndicesFromProps.size>0){
var stickyOffset=ListHeaderComponent?1:0;

for(var ii=firstAfterInitial-1;ii>lastInitialIndex;ii--){
if(stickyIndicesFromProps.has(ii+stickyOffset)){
var initBlock=this._getFrameMetricsApprox(lastInitialIndex);
var stickyBlock=this._getFrameMetricsApprox(ii);
var leadSpace=stickyBlock.offset-(initBlock.offset+initBlock.length);
cells.push(
React.createElement(View,{key:'$sticky_lead',style:_defineProperty({},spacerKey,leadSpace)}));

this._pushCells(cells,stickyHeaderIndices,stickyIndicesFromProps,ii,ii);
var trailSpace=this._getFrameMetricsApprox(_first).offset-(
stickyBlock.offset+stickyBlock.length);
cells.push(
React.createElement(View,{key:'$sticky_trail',style:_defineProperty({},spacerKey,trailSpace)}));

insertedStickySpacer=true;
break;
}
}
}
if(!insertedStickySpacer){
var _initBlock=this._getFrameMetricsApprox(lastInitialIndex);
var firstSpace=this._getFrameMetricsApprox(_first).offset-(
_initBlock.offset+_initBlock.length);
cells.push(
React.createElement(View,{key:'$lead_spacer',style:_defineProperty({},spacerKey,firstSpace)}));

}
}
this._pushCells(cells,stickyHeaderIndices,stickyIndicesFromProps,firstAfterInitial,_last);
if(!this._hasWarned.keys&&_usedIndexForKey){
console.warn(
'VirtualizedList: missing keys for items, make sure to specify a key property on each '+
'item or provide a custom keyExtractor.');

this._hasWarned.keys=true;
}
if(!disableVirtualization&&_last<itemCount-1){
var lastFrame=this._getFrameMetricsApprox(_last);



var end=this.props.getItemLayout?
itemCount-1:
Math.min(itemCount-1,this._highestMeasuredFrameIndex);
var endFrame=this._getFrameMetricsApprox(end);
var tailSpacerLength=
endFrame.offset+endFrame.length-(
lastFrame.offset+lastFrame.length);
cells.push(
React.createElement(View,{key:'$tail_spacer',style:_defineProperty({},spacerKey,tailSpacerLength)}));

}
}
if(ListFooterComponent){
var _element=React.isValidElement(ListFooterComponent)?
ListFooterComponent:
React.createElement(ListFooterComponent,null);
cells.push(
React.createElement(View,{key:'$footer',onLayout:this._onLayoutFooter},
_element));


}
var ret=React.cloneElement(
this.props.renderScrollComponent(this.props),
{
onContentSizeChange:this._onContentSizeChange,
onLayout:this._onLayout,
onScroll:this._onScroll,
onScrollBeginDrag:this._onScrollBeginDrag,
onScrollEndDrag:this._onScrollEndDrag,
onMomentumScrollEnd:this._onMomentumScrollEnd,
ref:this._captureScrollRef,
scrollEventThrottle:this.props.scrollEventThrottle,
stickyHeaderIndices:stickyHeaderIndices},

cells);

if(this.props.debug){
return React.createElement(View,{style:{flex:1}},ret,this._renderDebugOverlay());
}else{
return ret;
}
}},{key:'componentDidUpdate',value:function componentDidUpdate()

{
this._updateCellsToRenderBatcher.schedule();
}},{key:'_computeBlankness',value:function _computeBlankness()

























{
this._fillRateHelper.computeBlankness(
this.props,
this.state,
this._scrollMetrics);

}},{key:'_onCellLayout',value:function _onCellLayout(

e,cellKey,index){
var layout=e.nativeEvent.layout;
var next={
offset:this._selectOffset(layout),
length:this._selectLength(layout),
index:index,
inLayout:true};

var curr=this._frames[cellKey];
if(!curr||
next.offset!==curr.offset||
next.length!==curr.length||
index!==curr.index)
{
this._totalCellLength+=next.length-(curr?curr.length:0);
this._totalCellsMeasured+=curr?0:1;
this._averageCellLength=this._totalCellLength/this._totalCellsMeasured;
this._frames[cellKey]=next;
this._highestMeasuredFrameIndex=Math.max(this._highestMeasuredFrameIndex,index);
this._updateCellsToRenderBatcher.schedule();
}else{
this._frames[cellKey].inLayout=true;
}
this._computeBlankness();
}},{key:'_renderDebugOverlay',value:function _renderDebugOverlay()






















{
var normalize=this._scrollMetrics.visibleLength/this._scrollMetrics.contentLength;
var framesInLayout=[];
var itemCount=this.props.getItemCount(this.props.data);
for(var ii=0;ii<itemCount;ii++){
var frame=this._getFrameMetricsApprox(ii);
if(frame.inLayout){
framesInLayout.push(frame);
}
}
var windowTop=this._getFrameMetricsApprox(this.state.first).offset;
var frameLast=this._getFrameMetricsApprox(this.state.last);
var windowLen=frameLast.offset+frameLast.length-windowTop;
var visTop=this._scrollMetrics.offset;
var visLen=this._scrollMetrics.visibleLength;
var baseStyle={position:'absolute',top:0,right:0};
return(
React.createElement(View,{style:_extends({},baseStyle,{bottom:0,width:20,borderColor:'blue',borderWidth:1})},
framesInLayout.map(function(f,ii){return(
React.createElement(View,{key:'f'+ii,style:_extends({},
baseStyle,{
left:0,
top:f.offset*normalize,
height:f.length*normalize,
backgroundColor:'orange'})}));}),


React.createElement(View,{style:_extends({},
baseStyle,{
left:0,
top:windowTop*normalize,
height:windowLen*normalize,
borderColor:'green',
borderWidth:2})}),

React.createElement(View,{style:_extends({},
baseStyle,{
left:0,
top:visTop*normalize,
height:visLen*normalize,
borderColor:'red',
borderWidth:2})})));



}},{key:'_selectLength',value:function _selectLength(

metrics){
return!this.props.horizontal?metrics.height:metrics.width;
}},{key:'_selectOffset',value:function _selectOffset(

metrics){
return!this.props.horizontal?metrics.y:metrics.x;
}},{key:'_maybeCallOnEndReached',value:function _maybeCallOnEndReached()

{var _props6=
this.props;var data=_props6.data;var getItemCount=_props6.getItemCount;var onEndReached=_props6.onEndReached;var onEndReachedThreshold=_props6.onEndReachedThreshold;var _scrollMetrics=
this._scrollMetrics;var contentLength=_scrollMetrics.contentLength;var visibleLength=_scrollMetrics.visibleLength;var offset=_scrollMetrics.offset;
var distanceFromEnd=contentLength-visibleLength-offset;
if(onEndReached&&
this.state.last===getItemCount(data)-1&&
distanceFromEnd<onEndReachedThreshold*visibleLength&&(
this._hasDataChangedSinceEndReached||
this._scrollMetrics.contentLength!==this._sentEndForContentLength)){

this._hasDataChangedSinceEndReached=false;
this._sentEndForContentLength=this._scrollMetrics.contentLength;
onEndReached({distanceFromEnd:distanceFromEnd});
}
}},{key:'_updateViewableItems',value:function _updateViewableItems(




















































































































































data){var _props7=
this.props;var getItemCount=_props7.getItemCount;var onViewableItemsChanged=_props7.onViewableItemsChanged;
if(!onViewableItemsChanged){
return;
}
this._viewabilityHelper.onUpdate(
getItemCount(data),
this._scrollMetrics.offset,
this._scrollMetrics.visibleLength,
this._getFrameMetrics,
this._createViewToken,
onViewableItemsChanged,
this.state);

}}]);return VirtualizedList;}(React.PureComponent);VirtualizedList.defaultProps={disableVirtualization:false,getItem:function getItem(data,index){return data[index];},getItemCount:function getItemCount(data){return data?data.length:0;},horizontal:false,initialNumToRender:10,keyExtractor:function keyExtractor(item,index){if(item.key!=null){return item.key;}_usedIndexForKey=true;return String(index);},maxToRenderPerBatch:10,onEndReachedThreshold:2,renderScrollComponent:function renderScrollComponent(props){if(props.onRefresh){invariant(typeof props.refreshing==='boolean','`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `'+JSON.stringify(props.refreshing)+'`');return React.createElement(ScrollView,_extends({},props,{refreshControl:React.createElement(RefreshControl,{refreshing:props.refreshing,onRefresh:props.onRefresh})}));}else{return React.createElement(ScrollView,props);}},scrollEventThrottle:50,updateCellsBatchingPeriod:50,windowSize:21};var _initialiseProps=function _initialiseProps(){var _this5=this;this._onUpdateSeparators=function(keys,newProps){keys.forEach(function(key){var ref=key!=null&&_this5._cellRefs[key];ref&&ref.updateSeparatorProps(newProps);});};this._averageCellLength=0;this._cellRefs={};this._hasDataChangedSinceEndReached=true;this._hasWarned={};this._highestMeasuredFrameIndex=0;this._headerLength=0;this._initialScrollIndexTimeout=0;this._frames={};this._footerLength=0;this._scrollMetrics={contentLength:0,dOffset:0,dt:10,offset:0,timestamp:0,velocity:0,visibleLength:0};this._scrollRef=null;this._sentEndForContentLength=0;this._totalCellLength=0;this._totalCellsMeasured=0;this._captureScrollRef=function(ref){_this5._scrollRef=ref;};this._onCellUnmount=function(cellKey){var curr=_this5._frames[cellKey];if(curr){_this5._frames[cellKey]=_extends({},curr,{inLayout:false});}};this._onLayout=function(e){_this5._scrollMetrics.visibleLength=_this5._selectLength(e.nativeEvent.layout);_this5.props.onLayout&&_this5.props.onLayout(e);_this5._updateCellsToRenderBatcher.schedule();};this._onLayoutFooter=function(e){_this5._footerLength=_this5._selectLength(e.nativeEvent.layout);};this._onLayoutHeader=function(e){_this5._headerLength=_this5._selectLength(e.nativeEvent.layout);};this._onContentSizeChange=function(width,height){if(_this5.props.onContentSizeChange){_this5.props.onContentSizeChange(width,height);}_this5._scrollMetrics.contentLength=_this5._selectLength({height:height,width:width});_this5._updateCellsToRenderBatcher.schedule();_this5._maybeCallOnEndReached();};this._onScroll=function(e){if(_this5.props.onScroll){_this5.props.onScroll(e);}var timestamp=e.timeStamp;var visibleLength=_this5._selectLength(e.nativeEvent.layoutMeasurement);var contentLength=_this5._selectLength(e.nativeEvent.contentSize);var offset=_this5._selectOffset(e.nativeEvent.contentOffset);var dt=Math.max(1,timestamp-_this5._scrollMetrics.timestamp);if(dt>500&&_this5._scrollMetrics.dt>500&&contentLength>5*visibleLength&&!_this5._hasWarned.perf){console.log('VirtualizedList: You have a large list that is slow to update - make sure your '+'renderItem function renders components that follow React performance best practices '+'like PureComponent, shouldComponentUpdate, etc.',{dt:dt,prevDt:_this5._scrollMetrics.dt,contentLength:contentLength});_this5._hasWarned.perf=true;}var dOffset=offset-_this5._scrollMetrics.offset;var velocity=dOffset/dt;_this5._scrollMetrics={contentLength:contentLength,dt:dt,dOffset:dOffset,offset:offset,timestamp:timestamp,velocity:velocity,visibleLength:visibleLength};var _props9=_this5.props;var data=_props9.data;var getItemCount=_props9.getItemCount;var windowSize=_props9.windowSize;_this5._updateViewableItems(data);if(!data){return;}_this5._maybeCallOnEndReached();var _state2=_this5.state;var first=_state2.first;var last=_state2.last;if(velocity!==0){_this5._fillRateHelper.activate();}_this5._computeBlankness();var itemCount=getItemCount(data);if(first>0&&velocity<0||last<itemCount-1&&velocity>0){var distanceToContentEdge=Math.min(Math.abs(_this5._getFrameMetricsApprox(first).offset-offset),Math.abs(_this5._getFrameMetricsApprox(last).offset-(offset+visibleLength)));var hiPri=distanceToContentEdge<windowSize*visibleLength/4;if(hiPri){_this5._updateCellsToRenderBatcher.dispose({abort:true});_this5._updateCellsToRender();return;}}_this5._updateCellsToRenderBatcher.schedule();};this._onScrollBeginDrag=function(e){_this5._viewabilityHelper.recordInteraction();_this5.props.onScrollBeginDrag&&_this5.props.onScrollBeginDrag(e);};this._onScrollEndDrag=function(e){var velocity=e.nativeEvent.velocity;if(velocity){_this5._scrollMetrics.velocity=_this5._selectOffset(velocity);}_this5._computeBlankness();_this5.props.onScrollEndDrag&&_this5.props.onScrollEndDrag(e);};this._onMomentumScrollEnd=function(e){_this5._scrollMetrics.velocity=0;_this5._computeBlankness();_this5.props.onMomentumScrollEnd&&_this5.props.onMomentumScrollEnd(e);};this._updateCellsToRender=function(){var _props10=_this5.props;var data=_props10.data;var disableVirtualization=_props10.disableVirtualization;var getItemCount=_props10.getItemCount;var onEndReachedThreshold=_props10.onEndReachedThreshold;_this5._updateViewableItems(data);if(!data){return;}_this5.setState(function(state){var newState=void 0;if(!disableVirtualization){newState=computeWindowedRenderLimits(_this5.props,state,_this5._getFrameMetricsApprox,_this5._scrollMetrics);}else{var _scrollMetrics2=_this5._scrollMetrics;var contentLength=_scrollMetrics2.contentLength;var _offset=_scrollMetrics2.offset;var visibleLength=_scrollMetrics2.visibleLength;var _distanceFromEnd=contentLength-visibleLength-_offset;var renderAhead=_distanceFromEnd<onEndReachedThreshold*visibleLength?_this5.props.maxToRenderPerBatch:0;newState={first:0,last:Math.min(state.last+renderAhead,getItemCount(data)-1)};}return newState;});};this._createViewToken=function(index,isViewable){var _props11=_this5.props;var data=_props11.data;var getItem=_props11.getItem;var keyExtractor=_props11.keyExtractor;var item=getItem(data,index);invariant(item,'Missing item for index '+index);return{index:index,item:item,key:keyExtractor(item,index),isViewable:isViewable};};this._getFrameMetricsApprox=function(index){var frame=_this5._getFrameMetrics(index);if(frame&&frame.index===index){return frame;}else{var _getItemLayout=_this5.props.getItemLayout;invariant(!_getItemLayout,'Should not have to estimate frames when a measurement metrics function is provided');return{length:_this5._averageCellLength,offset:_this5._averageCellLength*index};}};this._getFrameMetrics=function(index){var _props12=_this5.props;var data=_props12.data;var getItem=_props12.getItem;var getItemCount=_props12.getItemCount;var getItemLayout=_props12.getItemLayout;var keyExtractor=_props12.keyExtractor;invariant(getItemCount(data)>index,'Tried to get frame for out of range index '+index);var item=getItem(data,index);var frame=item&&_this5._frames[keyExtractor(item,index)];if(!frame||frame.index!==index){if(getItemLayout){frame=getItemLayout(data,index);}}return frame;};};var


CellRenderer=function(_React$Component){_inherits(CellRenderer,_React$Component);function CellRenderer(){var _ref6;var _temp,_this4,_ret2;_classCallCheck(this,CellRenderer);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret2=(_temp=(_this4=_possibleConstructorReturn(this,(_ref6=CellRenderer.__proto__||Object.getPrototypeOf(CellRenderer)).call.apply(_ref6,[this].concat(args))),_this4),_this4.
















state={
separatorProps:{
highlighted:false,
leadingItem:_this4.props.item}},_this4.





_separators={
highlight:function highlight(){var _this4$props=
_this4.props;var cellKey=_this4$props.cellKey;var prevCellKey=_this4$props.prevCellKey;
_this4.props.onUpdateSeparators([cellKey,prevCellKey],{highlighted:true});
},
unhighlight:function unhighlight(){var _this4$props2=
_this4.props;var cellKey=_this4$props2.cellKey;var prevCellKey=_this4$props2.prevCellKey;
_this4.props.onUpdateSeparators([cellKey,prevCellKey],{highlighted:false});
},
updateProps:function updateProps(select,newProps){var _this4$props3=
_this4.props;var cellKey=_this4$props3.cellKey;var prevCellKey=_this4$props3.prevCellKey;
_this4.props.onUpdateSeparators([select==='leading'?prevCellKey:cellKey],newProps);
}},_temp),_possibleConstructorReturn(_this4,_ret2);}_createClass(CellRenderer,[{key:'updateSeparatorProps',value:function updateSeparatorProps(


newProps){
this.setState(function(state){return{separatorProps:_extends({},state.separatorProps,newProps)};});
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
this.props.onUnmount(this.props.cellKey);
}},{key:'render',value:function render()

{var _props8=
this.props;var ItemSeparatorComponent=_props8.ItemSeparatorComponent;var fillRateHelper=_props8.fillRateHelper;var item=_props8.item;var index=_props8.index;var parentProps=_props8.parentProps;var
renderItem=parentProps.renderItem;var getItemLayout=parentProps.getItemLayout;
invariant(renderItem,'no renderItem!');
var element=renderItem({
item:item,
index:index,
separators:this._separators});

var onLayout=getItemLayout&&!parentProps.debug&&!fillRateHelper.enabled()?
undefined:
this.props.onLayout;


return(
React.createElement(View,{onLayout:onLayout},
element,
ItemSeparatorComponent&&React.createElement(ItemSeparatorComponent,this.state.separatorProps)));


}}]);return CellRenderer;}(React.Component);


module.exports=VirtualizedList;