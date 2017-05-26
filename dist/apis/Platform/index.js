var Platform={
OS:'web',
select:function select(obj){return'web'in obj?obj.web:obj.default;}};


module.exports=Platform;