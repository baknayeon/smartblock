VerificationMap = function(){   
    this.set1 = new Object();
	this.set1["on"] = "off"; 
	this.set1["off"] = "on"; 
};   
VerificationMap.prototype = {  
    conflict : function(attribute1, attribute2){ 
		if(this.set1[attribute1] == attribute2)
			return true;
	}
};  
AttributeMap = function(){   
    this.set1 = new Array();  //only one
    this.set2 = new Array();  //
    this.ENUM = new Array(); 
    this.NUMBER = new Array(); 
};   
AttributeMap.prototype = {  
	generateGroup : function(){ 

		for (let key of deviceSet.values()) {
			var e = this.ENUM[key];
			var n = this.NUMBER[key];
			if(e && n){
				this.set2[key] = [e,n]
			}else if(e){
				if(goog.isArray(e))
					this.set2[key] = [e, null]
				else
					this.set1[key] = e
			}else if(n){				
				if(goog.isArray(n))
					this.set2[key] = [null, n]
				else
					this.set1[key] = n
			}
		}
    },  	
	
	putENUM : function(key, attr){  
		setDevice(key);
		if(attr.value != null){
			if(attr.constructor == Attribute){
				this.ENUM[key] = attr; 
			}else if(goog.isArray(attr)){
				this.ENUM[key] = attr; 

			}
		}
    },  	
	putNUMBER : function(key, attr){   
		setDevice(key);
		if(attr.value == null){
			if(attr.constructor == Attribute){
				this.NUMBER[key] = attr; 
			}else if(goog.isArray(attr)){
				this.NUMBER[key] = attr; 
			}
		}
    }, 
    isOnlyENUM : function(key){   
        return  this.ENUM[key] && this.set1[key]; 
    },  
    isOnlyNUMBER : function(key){   
        return this.NUMBER[key] && this.set1[key]; 
    },  
    hasMultiTypeENUM : function(key){ 
    	var list = this.set2[key]  
    	if(list && list[0] && !list[1])
	        return true;
	    else
	    	return false; 
    },   
    hasMultiTypeNUMBER: function(key){ 
    	var list = this.set2[key]  
    	if(list && !list[0] && list[1])
	        return true;
	    else
	    	return false; 
    }, 
    getMultiType : function(key){
		var type = this.set2[key];
		var e_list = type[0];
		var n_list = type[1];
		var arrytype =[];

		for(e in e_list){
			arrytype.push([e_list[e].id, e_list[e].id]);
		}
		for(n in n_list){
			arrytype.push([n_list[n].id, n_list[n].id]);
		}
        return arrytype; 
    },    
    getENUM : function(key){   
        return this.ENUM[key]; 
    },    
	getNUMBER : function(key){   
        return this.NUMBER[key]; 
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
    	 return new Attribute(id, newAttr)
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
		if(this.set1[key]){
			var attr = this.ENUM[key];
			for(a in attr.value)
				newAttr.push([attr.value[a], attr.value[a]])

		}else if(this.set2[key]){
			var attrlist = this.ENUM[key];
			var attr = attrlist[0];
			for(a in attr.value)
				newAttr.push([attr.value[a], attr.value[a]])

		}
		return newAttr
    },
	makeBlock : function(key){   
        return this.set1[key] || this.set1[key]; 
    } 
}; 

CommandMap = function(){   
    this.commad = new Array(); 
    this.method = new Array(); 
};   
CommandMap.prototype = {  
	put : function(key, c, m){  
		setDevice(key);
		this.commad[key] = c; 
		this.method[key] = m; 
    },
	makeBlock : function(key){   
        return this.commad[key] || this.method[key]; 
    }, 
    isSingleCommad : function(key){   
        return  this.commad[key] && !this.method[key]; 
    },  
    isSingleMethod : function(key){   
		if(!this.commad[key] && this.method[key]){
			var list = this.method[key];
			if(!goog.isArray(list))
				return true;
		}
        return false  
    }, 
	isMultiple : function(key){ 
    	if(this.commad[key] && this.method[key]){
			var list = this.method[key];
			if(goog.isArray(list))
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
    getMultiType: function(key){ 
		var list = new Array();
		var method = this.method[key];

		for(i in method){	
			list.push([method[i].id, method[i].id])
		}
        return list; 
    },
    getMethod_vaulesById : function(key, id){
		var newAttr = [];
		var method_list= this.method[key];
		for(i in method_list ){
			if(method_list[i].id == id){
				var method = method_list[i];
				var value = method.value
				for(j in value){
					var arg = value[j];
					for(v in arg){
					newAttr.push([arg[v], arg[v]])
					}
				}
			}
		}
		
    	 return newAttr
    },
    getCommad_vaules : function(key){   
		var newCommd = new Array();

        var array = this.commad[key]; 
		for(a in array)
			newCommd.push([array[a], array[a]])
		return newCommd
    }
}; 

function Attribute(i, v){
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