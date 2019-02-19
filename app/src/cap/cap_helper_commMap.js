CommandMap = function(){   
    this.commad = new Array(); 
    this.method = new Array(); 
    this.methodS = new Array(); 
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
	putMethodS : function(key, m){  
		setDevice(key);
		if(this.methodS[key]){
			var map = this.methodS[key]	
			map.set(m.id, m)
		}else{
			var map = new Map();
			map.set(m.id, m)	
			this.methodS[key] = map
		}
    },
	makeBlock : function(key){   
        return this.commad[key] || this.method[key] || this.methodS[key]; 
    }, 
    hasCommad : function(key){   
        return  this.commad[key]; 
    },  
    hasMethod : function(key){   
		return this.method[key] 
    }, 
    hasMethodS : function(key){   
		return this.methodS[key] 
    }, 

    haveMethod: function(key){ 
    	if(this.method[key])
    		return true
    	else
    		return false 
    },
    getCommad: function(key){   
        return this.commad[key]; 
    },  
    getMethod: function(key){   
    	return jQuery.extend(true, new Command_method(), this.method[key]);

    },  
    getMethodS: function(key){   
    	return  this.methodS[key]
    },    
    getCommad_vaules : function(key){   
		var newCommd = new Array();

        var array = this.commad[key]; 
		for(a in array)
			newCommd.push([array[a], array[a]])
		return newCommd
    },
    getMethod_vaules : function(key){
		var newCommd = [];
		var method= this.method[key];
		if(method.type =="ENUM"){
			var values = method.value
			for(var value of values){
				newCommd.push([value, value])
			}
		}else{
			newCommd = null
		}
		return newCommd
    },
    getMethodS_method_id_vaules : function(key){   
		var newCommds = new Array();
        var map =  this.methodS[key];

		map.forEach(function (item, key, mapObj) {
			newCommds.push([key,key])
		});
			
		return newCommds
    },
    getMethodS_ENUMvaulesByid : function(device, id){   
		var newCommds = new Array();

        var map =  this.methodS[device];
		var method = map.get(id)
		if(method.type =="ENUM"){
			var values = method.value
			for(var value of values){
				newCommds.push([value, value])
			}
		}else{
			newCommds = null
		}

		return newCommds
    },

    getMethodS_Byid : function(device, id){   
        var map =  this.methodS[device];
		var method = map.get(id)
		return jQuery.extend(true, new Command_method(), method);
    }
}; 
function Commands(i, v){
	this.id = i;
	this.value = v;

}

function Command_method(i, t, v){
	this.id = i;
	this.type = t;
	this.value = v; // enum
	this.args; //number

}
