AttributeMap = function(){   
    this.single = new Array(); 
    this.multiple = new Array(); 
};   
AttributeMap.prototype = {  
	putSingle : function(key, attr){  
		setDevice(key);
		if(attr.constructor == Attributes){
			this.single[key] = attr; 
		}
		
    },  
	putMultiple : function(key, attr){  
		setDevice(key);

		if(this.multiple[key]){
			var map = this.multiple[key]	
			map.set(attr.id, attr)
		}else{
			var map = new Map();
			map.set(attr.id, attr)	
			this.multiple[key] = map
		}
    },  
    isSingle : function(key){   
		return this.single[key];
    },
    isMultiple : function(key){   
		return this.multiple[key];
    },
    onlyInENUM : function(key){   
		var attr = this.single[key];
		if(attr && attr.type == "ENUM")
			return true
		else
			return false
    },  
    onlyInNUMBER : function(key){   
		var attr = this.single[key];
		if(attr)
			if(attr.type == "NUMBER" || attr.type == "STRING")
				return true
			else
				return false
    },  
    getENUM_vaules : function(key){   
		var newAttr = [];
		var attr = this.single[key];
		if(attr.type == "ENUM")
			for(var v of attr.value)
				newAttr.push([v, v])
			
		return newAttr
    },
    getENUM_id : function(key){
		var attr = this.single[key];
		
		if(attr.type == "ENUM")
			return attr.id
		else
			return null
    },
    getNUM_id : function(key){
		var attr = this.single[key];
		if(attr.type == "NUMBER")
			return attr.id
		else
			return null
    },
    getENUM : function(key){   
		var attr = this.single[key];
		if(attr.type == "ENUM")
			return attr
		else
			return null
    },    
	getNUMBER : function(key){   
		var attr = this.single[key];
		if(attr.type == "NUMBER")
			return attr
		else
			return null
    },
	getSTRING : function(key){   
		var attr = this.single[key];
		if(attr.type == "STRING")
			return attr
		else
			return null
    },
	getMultiple : function(key){   
		var attr = this.multiple[key];
		return attr
    },

	getSingle : function(key){   
		var attr = this.single[key];
		return attr
    },
	getMultipleMethod_id_vaules : function(key){   
		var newAttr = new Array();
        var map =  this.multiple[key];

		map.forEach(function (item, key, mapObj) {
			newAttr.push([key,key])
		});
			
		return newAttr
    },
				
	getMultipleMethod_byid : function(devcei, method_id){   
		var methods = this.multiple[devcei];
		var attr = methods.get(method_id)
		return attr
    },
	getMultipleMethod_vaules_byid : function(devcei, method_id){   
		var newAttr = new Array();
		var methods = this.multiple[devcei];
		var attrs = methods.get(method_id)
		for(var attr of attrs.value)
			newAttr.push([attr, attr])
		return newAttr
    },
	getMultipleMethod_type_byid : function(devcei, method_id){   
		var methods = this.multiple[devcei];
		var attrs = methods.get(method_id)
		return attrs.type
    },
	makeBlock : function(key){   
        return this.single[key] || this.multiple[key]; 
    } 
}; 


function Attributes(i, t, v){
	this.id = i;
	this.type = t;
	this.value = v;
	
}
