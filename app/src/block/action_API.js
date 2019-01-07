
//Calculation
Blockly.Blocks['math_action'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["API","Inputc", "state", "data"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"]]), "OP");
    this.appendValueInput("B")
        .setCheck(["API","Inputa", "state", "data"]);
    this.setInputsInline(true);
    this.setOutput(true, "math_action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['math_action'] = function(block) {
  var value_a = Blockly.SmartThings.valueToCode(block, 'A', Blockly.SmartThings.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.SmartThings.valueToCode(block, 'B', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var left = value_a //data hard coding
  var right = value_b
  var inputList = new Array()

  if(value_a.constructor == Inputa){
  	inputList.push(value_a)
  	if(value_a.device)
		left = value_a.devname
  	else if(value_a.type)
		left = value_a.name
  }else if(value_a.constructor == API){
  	if (value_a.inputs) inputList = inputList.concat(value_a.inputs)
	left = value_a.value
  }
  
  if(value_b.constructor == Inputa){
  	inputList.push(value_b)
  	if(value_b.device)
		right = value_b.devname
  	else if(value_b.type)
		right = value_b.name
  }else if(value_b.constructor == API){
  	if (value_b.inputs) inputList = inputList.concat(value_b.inputs)
	right = value_b.value
  }


  var c = new Calculation()
  c.inputs = inputList
  c.operation = dropdown_op 
  c.left = left   // =  left+" "+dropdown_op+" "+right;
  c.right = right  
  // TODO: Change ORDER_NONE to the correct strength.
  return c;
};


//state

Blockly.Blocks['action_state_def'] = {
  init: function() {
  
	var count = deviceCount.get("state")


    this.appendValueInput("state")
		.appendField("box")
        .appendField(new Blockly.FieldVariable(count, null, null, "state"), "name")
        .appendField("=")
        .setCheck(["Action", "Inputa", "data","API", "math_action"]);

	this.setInputsInline(true);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
	 this.setTooltip("");
	 this.setHelpUrl("");
  }, onchange: function(event){
  	
		
  }
};

Blockly.SmartThings['action_state_def'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  var value_input = Blockly.SmartThings.valueToCode(block, 'state', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();
	if(value_input){
		if(value_input.constructor == String){
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;
			if(isNaN(value_input))
				smartAction.state_command = "state.box"+variable_name +" = " + '\"'+value_input+ '\"'
			else
				smartAction.state_command = "state.box"+variable_name +" = " + value_input
		}else if(value_input.constructor == API){
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = " + value_input.value
			
		}else if(value_input.constructor == Inputa){
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = " + value_input.devname
			
		}else if(value_input.constructor == Calculation){
			var experssion =  value_input.left+" "+value_input.operation+" "+ value_input.right;
			smartAction.valueinput = value_input.inputs
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = (" + experssion+")"
			
		}
	}
  // TODO: Change ORDER_NONE to the correct strength.
  return [smartAction]
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
Blockly.SmartThings['action_state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
 c.value = "state.box"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return c;
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
Blockly.SmartThings['dataa'] = function(block) {
  var text_= block.getFieldValue('data');

  return text_
};


Blockly.Blocks['inputa_data'] = {
  init: function() {
  		var device = "text"
		var count = deviceCount.get(device)
		this.appendDummyInput("device")
				 .appendField(new Blockly.FieldDropdown([["text","text"], ["bool","bool"], ["number","number"], ["phone","phone"], ["message","message"], ["email","email"], ["password","password"], ["time","time"], ["mode","mode"]]), "type")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
		this.setColour(Block_colour_action);
  this.setInputsInline(true);
    this.setOutput(true, "Inputa");
	 this.setTooltip("");
	 this.setHelpUrl("");
  },onchange: function(event) {
  	if(this.id == event.blockId){
			if(event.element == "field" && event.name == "type"){ //changing type 
				var device = event.newValue
				var count = deviceCount.get(device)
				this.getInput("device").removeField("name")
				this.getInput("device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name");

			}else if(event.type == Blockly.Events.BLOCK_MOVE){ //block connect
				if(event.newParentId && this.parentBlock_.id == event.newParentId ){
			
					var device = event.newInputName
					var commandMethod = commMap.getMethod(device)
					if(commandMethod && commMap.has1Method(device)){
						var type = commandMethod.type
						var count = deviceCount.get(type)
						this.getInput("device").removeField("type")
						this.getInput("device").removeField("name")

						this.getInput("device").appendField(type,"type")
						.appendField(new Blockly.FieldVariable(count, null, null, type), "name"); // , null, null, device)

					}else if(device == "state"){


					}else {
						var type = event.newInputName
						var count = deviceCount.get(type)
						this.getInput("device").removeField("type")
						this.getInput("device").removeField("name")
						this.getInput("device")
						.appendField(type,"type")
						.appendField(new Blockly.FieldVariable(count, null, null, type), "name"); // , null, null, device)

					}
				}else if(event.oldParentId && this.parentBlock_ == null){ //block disconnect
				
					this.getInput("device").removeField("type")
					this.getInput("device").removeField("name")
					var count = deviceCount.get("text")
					this.getInput("device")
				 	.appendField(new Blockly.FieldDropdown([["text","text"], ["bool","bool"], ["number","number"], ["phone","phone"], ["message","message"]]), "type")
					.appendField(new Blockly.FieldVariable(count, null, null, "text"), "name"); // , null, null, device)
		
				}
			}

		}
  	}

};


Blockly.SmartThings['inputa_data'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
   // TODO: Assemble SmartThings into code variable.

  var args = new Inputa();
  args.device = dropdown_type;
  args.devname = dropdown_type+variable_name
	args.input = 'input \"'+args.devname+'\", \"'+args.device +'\", title:\"'+args.devname+'\", required: false ' ;
  return args;
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


Blockly.SmartThings['sendpush'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action();

	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.devname
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendPush('+text_text+')';
  
	
  return [smartAction];
};

Blockly.SmartThings['sendsms'] = function(block) {
	var text_phone = block.getFieldValue('phone');
	var value_phone = Blockly.SmartThings.valueToCode(block, 'phone', Blockly.SmartThings.ORDER_ATOMIC);
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();

	if(value_phone == ""){
		text_phone = '\"'+text_phone+'\"'
	}else{	
		text_phone = value_phone.devname
		smartAction.arginput.push(value_phone)
	}

	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.devname
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendSms('+ text_phone + ', '+text_text +')';
  
	return [smartAction];
};

Blockly.SmartThings['sendnotification'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	var actionList = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action();

	
	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.devname
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendNotification('+text_text+')';

	return [smartAction];;
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

Blockly.SmartThings['function_invocation_a'] = function(block) {
	
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var action = new Action()
	action.functionhandler = "function_action"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return [action];
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
Blockly.SmartThings['getlocation_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getLocation()"
  return a;
};

Blockly.Blocks['getsunrise_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunrise");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunrise_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getSunriseAndSunset().sunrise"
  return a;
};

Blockly.Blocks['getsunset_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunset");
    this.setOutput(true, "API");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunset_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable. var a = new API();
  var a = new API();
  a.value ="getSunriseAndSunset().sunset"
  return a;
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
Blockly.SmartThings['getweatherfeature_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getWeatherFeature(\"forecast\", zipcode)"
  a.inputs = "input \"zipcode\", \"text\", title: \"Zipcode?\""
  return a;
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
Blockly.SmartThings['setlocationmode_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var value_mode= Blockly.SmartThings.valueToCode(block, 'mode', Blockly.SmartThings.ORDER_ATOMIC);
  var a = new Action()
  a.method = "if(location.modes?.find{it.name == "+value_mode.devname+"}) "+"setLocationMode("+value_mode.devname+")"
  a.arginput.push(value_mode)
  return a;
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
Blockly.SmartThings['now_a'] = function(block) {
  var a = new API();
  a.value ="now"
  return a;
};
