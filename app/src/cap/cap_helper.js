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