
//Calculation
Blockly.Blocks['math_action'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["API","Inputa", "state", "data", "math_action"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"]]), "OP");
    this.appendValueInput("B")
        .setCheck(["API","Inputa", "state", "data", "math_action"]);
    this.setInputsInline(true);
    this.setOutput(true, "math_action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//state

Blockly.Blocks['action_state_def'] = {
  init: function() {
  
	var count = deviceCount.get("state")

    this.appendValueInput("state")
		.appendField("box")
        .appendField(new Blockly.FieldVariable(count, null, null, "state"), "name")
        .appendField("=")
        .setCheck(["Action", "Inputa", "data","API", "math_action", "state"]);

	this.setInputsInline(true);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
	 this.setTooltip("");
	 this.setHelpUrl("");
  }
};

Blockly.Blocks['action_state'] = {
  init: function() {
  
		var count = deviceCount.get("state")
	 this.appendDummyInput()
		.appendField("box")
        .appendField(new Blockly.FieldVariable(count, null, null, "state"), "name");
    this.setInputsInline(true);
    this.setOutput(true, "state");
    this.setColour(Block_colour_action);
	 this.setTooltip("");
	 this.setHelpUrl("");
  }, onchange: function(event){


  }
};

//data- Sting
Blockly.Blocks['dataa'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldTextInput("0"), "data");
    this.setInputsInline(true);
    this.setOutput(true, "data");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['inputa_data'] = {
  init: function() {
  		var device = "text"
		var count = deviceCount.get(device)
		this.appendDummyInput("device")
				 .appendField(new Blockly.FieldDropdown(input_data_type), "type") // definder_helper
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
		this.setColour(Block_colour_action);
		this.setInputsInline(true);
		this.setOutput(true, "Inputa");
		this.setTooltip("");
		this.setHelpUrl("");
  },onchange: function(event) {
	changInput(event, this)
			
  }
};



//send method
Blockly.Blocks['sendpush'] = {
  init: function() {
    this.appendDummyInput("action")
        .appendField("sendPush");
    this.appendValueInput("message")
        .setCheck("Inputa")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.type == Blockly.Events.BLOCK_MOVE){
		if(event.newParentId == this.id)
			if(event.newInputName == "message")
				this.getInput("message").removeField("text");
		if(event.oldParentId == this.id)
			if(event.oldInputName == "message")
				this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
  	}else if(event.type == Blockly.Events.BLOCK_CREATE){
  		if(event.blockId == this.id){
  			var block = this.getInput("message")
  		}
  	}
  }
};

Blockly.Blocks['sendsms'] = {
  init: function() {
    this.appendDummyInput("action")
        .appendField("sendSms");
    this.appendValueInput("message")
		.setCheck("Inputa")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.appendValueInput("phone")
		.setCheck("Inputa")
        .appendField("phone")
        .appendField(new Blockly.FieldTextInput("+8210"), "phone");
    this.setOutput(true,  "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.type == Blockly.Events.BLOCK_MOVE){
		if(event.newParentId == this.id)
			if(event.newInputName == "message")
				this.getInput("message").removeField("text");
			else if(event.newInputName == "phone")
				this.getInput("phone").removeField("phone");

		if(event.oldParentId == this.id)
			if(event.oldInputName == "message")
				this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
			else if(event.oldInputName == "phone")
				this.getInput("phone").appendField(new Blockly.FieldTextInput("+8210"), "phone");
	  }else if ( event.type == Blockly.Events.BLOCK_CREATE ){
		if(event.blockId == this.id){
  			var block = this.getInput("message")
  		}

	  }
  }
};

Blockly.Blocks['sendnotification'] = {
  init: function() {
    this.appendDummyInput("action")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("sendNotification");
    this.appendValueInput("message")
        .setCheck("Inputa")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.type == Blockly.Events.BLOCK_MOVE){
  	if(event.newParentId == this.id)
  		if(event.newInputName == "message")
  			this.getInput("message").removeField("text");
  		
  	if(event.oldParentId == this.id)
  		if(event.oldInputName == "message"){
  	
  			this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
  		}
  			
  	}else if ( event.type == Blockly.Events.BLOCK_CREATE ){
		if(event.blockId == this.id){
  			var block = this.getInput("message")
  			var block2 =this.getInputTargetBlock("message")
  		}

	  }
  }
};


//init method
Blockly.Blocks['function_invocation_a'] = {
  init: function() {
	var count = deviceCount.get("function")
    this.appendDummyInput()
        .appendField("function")
		.appendField(new Blockly.FieldVariable(count, null, null, "function"), "NAME");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




//API - get
Blockly.Blocks['getlocation_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getLocation");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getsunrise_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunriseTime");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getsunset_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunsetTime");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_a'] = {
  init: function() {
    this.appendValueInput("setTime")
        .appendField("time")
        .setCheck(["API"]);
    this.setInputsInline(true);
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['getweatherfeature_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getWeatherFeature");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



//API - set
Blockly.Blocks['setlocationmode_a'] = {
  init: function() {
    this.appendValueInput("mode")
        .setCheck(["Inputa"])
        .appendField("setLocationMode");
    this.setInputsInline(true);
    this.setOutput(true, "setAPI");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//API- now
Blockly.Blocks['now_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("now");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



var subscribes_fromaction = new Map();

//API- subscribe
Blockly.Blocks['subscribe_method'] = {
  init: function() {
	var count = deviceCount.get("subscribe")
    this.appendValueInput("device")
        .appendField("subscribe")
        .setCheck(["Inputa", "subscribe_arg"]);
    this.appendDummyInput("attribute")
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
 this.setInputsInline(true);
  }, onchange: function(event){

  	var childBlock = this.childBlocks_["0"]
  	if(event.type==Blockly.Events.BLOCK_MOVE && childBlock && childBlock.id == event.blockId && event.newInputName  == "device"){
		//connect
		var index = subscribes_fromaction.size+1
	    var input_device = this.getInputTargetBlock("device");
		var input_type = input_device.getField('type').text_
		var input_name = input_device.getField('name')? input_device.getField('name').text_: null

		if(attrMap.onlyInENUM(input_type)){
			var newAttr = attrMap.getENUM_vaules(input_type);
			this.getInput("attribute").appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
		}else if(input_type == "location"){
			this.getInput("attribute").appendField(new Blockly.FieldDropdown(location_attr), 'attribute');
		}
		var attr = this.getFieldValue('attribute')
		if(this.type == "subscribe_method"){
			this.getInput("device").appendField(new Blockly.FieldLabel(index), "index")
			subscribes_fromaction.set(this.id, [input_type, input_name, attr, index])

		}

	}else if(event.type == Blockly.Events.BLOCK_MOVE && !childBlock && event.oldInputName == "device" ){
		//disconnect
		this.getInput("attribute").removeField('attribute');
		this.getInput("device").removeField('index');
		if(subscribes_fromaction.has(this.id) && this.type == "subscribe_method")
			subscribes_fromaction.delete(this.id)

	}else if(this.id == event.blockId && event.type == Blockly.Events.BLOCK_CHANGE && event.name == "attribute" && event.element == "field" ){
		//chang 
	    var index = thie.getInput("device").getField("index")
	     var input_device = this.getInputTargetBlock("device")
		var input_type = input_device.getField('type').text_
		var input_name = input_device.getField('name')? input_device.getField('name').text_: null
		var attr = this.getField('attribute').text_
		
		if(subscribes_fromaction.has(this.id) && this.type == "subscribe_method"){
			subscribes_fromaction.set(this.id, [input_type, input_name, attr, index])

		}
	}
  }
};

//API- subscribe location
Blockly.Blocks['location_a'] = {
  init: function() {
    this.appendDummyInput("device")
        .appendField("location", 'type');
    this.setOutput(true, "subscribe_arg");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//API- subscribe app
Blockly.Blocks['app_a'] = {
  init: function() {
    this.appendDummyInput("device")
        .appendField("app", 'type');
    this.setOutput(true, "subscribe_arg");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
