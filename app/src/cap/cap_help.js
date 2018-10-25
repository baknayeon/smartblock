VerificationMap = function(){   
    this.conflictObject = new Object();
	this.conflictObject["on"] = "off"; 
	this.conflictObject["off"] = "on"; 
	this.conflictObject["locked"] = "unlocked"; 
	this.conflictObject["unlocked"] = "locked"; 
	this.conflictObject["stop"] = "play"; 
	this.conflictObject["play"] = "stop"; 
	this.conflictObject["present"] = "not present"; 
	this.conflictObject["not present"] = "present"; 

    this.influenceObject = new Object();
	this.influenceObject["lock"] = "locked"; 
	this.influenceObject["unlock"] = "unlocked"; 
	this.influenceObject["mute"] = "muted"; 
	this.influenceObject["unmute"] = "unmuted"; 
	this.influenceObject["close"] = "closed"; 
	this.influenceObject["play"] = "unmuted"; 
	this.influenceObject["stop"] = "muted"; 
};   
VerificationMap.prototype = {  
    conflict : function(attribute1, attribute2){ 
		if(this.conflictObject[attribute1] == attribute2)
			return true;
	},
    influence: function(action, event){
    	if(action.devname && event.devname)
		if(action.devname == event.devname){
			if(action.command_part == event.attr){
				return true
			}
			else if(this.influenceObject[action.command_part] == event.attr)
				return true;

		}
	}
};  
AttributeMap = function(){   
   // this.set1 = new Array();  //only one
   // this.set2 = new Array();  //
    this.ENUM = new Array(); 
    this.NUMBER = new Array(); 
};   
AttributeMap.prototype = {  
	putENUM : function(key, attr){  
		setDevice(key);
		if(attr.value != null){
			if(attr.constructor == Attributes){
				this.ENUM[key] = attr; 
			}
		}
    },  	
	putNUMBER : function(key, attr){   
		setDevice(key);
		if(attr.constructor == Attributes){
			this.NUMBER[key] = attr; 
		}
    }, 
    onlyInENUM : function(key){   
        return  this.ENUM[key] && !this.NUMBER[key]; 
    },  
    onlyInNUMBER : function(key){   
        return this.NUMBER[key] && !this.ENUM[key]; 
    },  
    inENUMandNUMBER : function(key){   
        return this.ENUM[key] && this.NUMBER[key]; 
    },  
    getENUM_vaulesById : function(key, id){
		var newAttr = [];
		if(this.set2[key]){
			var attrlist = this.ENUM[key];
			for(i in attrlist ){
				if(attrlist[i].id == id){
					var attr = attrlist[i];
					for(a in attr.value)
						newAttr.push([attr.value[a], attr.value[a]])
				}
			}
		}
    	 return newAttr
    },
    getENUM_vaules : function(key){   
		var newAttr = [];
		var attr = this.ENUM[key];
		for(var v of attr.value)
			newAttr.push([v, v])
		
		return newAttr
    },
    getENUM_id : function(key){
		var attr = this.ENUM[key];
		return attr.id
    },
    hasMultiTypeENUM : function(key){ 
	    return false; 
    },   
    hasMultiTypeNUMBER: function(key){ 
	    return false; 
    }, 
    getMultiType : function(key){
        return false; 
    },  
    getENUMById : function(key, id){
		var newAttr = [];
		if(this.set2[key]){
			var attrlist = this.ENUM[key];
			for(i in attrlist ){
				if(attrlist[i].id == id){
					var attr = attrlist[i];
					for(a in attr.value)
						newAttr.push(attr.value[a])
				}
			}
		}
    	 return new Attributes(id, newAttr)
    },  
    getENUM : function(key){   
        return this.ENUM[key]; 
    },    
	getNUMBER : function(key){   
        return this.NUMBER[key]; 
    },
	makeBlock : function(key){   
        return this.ENUM[key] || this.NUMBER[key]; 
    } 
}; 

CommandMap = function(){   
    this.commad = new Array(); 
    this.method = new Array(); 
};   
CommandMap.prototype = {  
	putCommand : function(key, c){  
		setDevice(key);
		this.commad[key] = c; 
    },
	putMethod : function(key, m){  
		setDevice(key);
		this.method[key] = m
		
    },
	makeBlock : function(key){   
        return this.commad[key] || this.method[key]; 
    }, 
    has1Commad : function(key){   
        return  this.commad[key] && !this.method[key]; 
    },  
    has1Method : function(key){   
		if(!this.commad[key] && this.method[key])
			return true;
		else
        	return false  
    }, 
	hasBoth : function(key){ 
    	if(this.commad[key] && this.method[key]){
				return true;
		}
        return false  
    },  
    getMethod: function(key){   
        return this.method[key]; 
    },
    getCommad: function(key){   
        return this.commad[key]; 
    },    
    getCommad_vaules : function(key){   
		var newCommd = new Array();

        var array = this.commad[key]; 
		for(a in array)
			newCommd.push([array[a], array[a]])
		return newCommd
    },
    getMethod_vaulesById : function(key, id){
		var newAttr = [];
		var method= this.method[key];
		//for(var method of methods){
			if(method.id == id){
				if(method.type =="ENUM"){
					var values = method.value
					for(var value of values){
						newAttr.push([value, value])
					}
				}else{
					newAttr = null
					
				}
			}
		//}
		
    	 return newAttr
    },
    getMethod_TypeById : function(key, id){
		var methods= this.method[key];
		for(var method of methods ){
			if(method.id == id){
    			return method.type
			}
		}
		
    	 return null
    },


    getMultiType: function(key){ 
		var list = new Array();
		var method = this.method[key];

		for(i in method){	
			list.push([method[i].id, method[i].id])
		}
        return list; 
    }
}; 

function Attributes(i, v){
	this.id = i;
	this.value = v;
	
}
function Commands(i, v){
	this.id = i;
	this.value = v;

}

function Command_method(i, t, v){
	this.id = i;
	this.type = t;
	this.value = v;

}

function setDevice(device){
		deviceCount.set(device, parseInt("1"))
		deviceSet.add(device)
}

		
CountMap = function(){   
    this.dev = new Array(); 
};   
CountMap.prototype = {  
	get : function(key){   

        var value = this.dev[key]; 
		if(goog.isNumber(value)){
			value = value.toString();
		}
		return value
    },
		
	up : function(key){   

        var value = this.dev[key]
		this.dev[key] = ++value;

    },
	set : function(key, value){   
		this.dev[key] = value
    }
}