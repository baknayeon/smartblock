function action_block(device, type){
	Blockly.SmartThings['a_'+device+type] = function(block) {
		var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	    var dropdown_commands = block.getFieldValue('Command');
	    var checkbox_method = block.getFieldValue('method_checkbox');
	    var value_method = block.getFieldValue('method_vaules');
		var args = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
		// TODO: Assemble SmartThings into code variable.

		var smartAction = new Action();
		if(dropdown_commands){
			if(commMap.has1Commad(device)){
				smartAction.devname = device+variable_name;
				smartAction.command= smartAction.devname+'.'+dropdown_commands+'()';
				smartAction.command_part= dropdown_commands;
				smartAction.device = device;	
				smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;
			}
		}else if(checkbox_method == "TRUE"){
			var method = commMap.getMethod(device) //hard coding
			method.args = value_method
			smartAction.method = method
			smartAction.devname = device+variable_name;
			smartAction.device = device;	
		
	
		}else if(checkbox_method == "FALSE"){
			var method = commMap.getMethod(device)//inputa
			method.args = args.devname
			smartAction.method = method
			smartAction.arginput = args
			smartAction.devname = device+variable_name;
			smartAction.device = device;
		smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;
	
		}else{ // groupig
			smartAction.devname = device+variable_name;
			smartAction.device = device;	

			if(goog.isArray(actionList))
				result = actionList.concat(smartAction);
			else
				result = smartAction;
		}
		return [smartAction];

	};
	
	Blockly.Blocks['a_'+device+type] = {
		init: function() {
			var count = deviceCount.get(device)
			var new_devName = shortName(device)
			if(type == "Command"){
				this.appendDummyInput(device)
					.appendField(new_devName, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldDropdown(commMap.getCommad_vaules(device)), "Command");

			}else if(type == "Method"){
				this.appendDummyInput(device)
					.appendField(new_devName, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name");
				
				var block = this.getInput(device);
				setMethodField(block, device);

			}

			this.setInputsInline(true);
			this.setOutput(true, "Action");
			this.setColour(Block_colour_action);
			this.setTooltip("");
			this.setHelpUrl("");
		},
		onchange: function(event) {
			var device = this.getField("device").text_;
			var block = this.getInput(device);
			
		   if(event.type == Blockly.Events.BLOCK_MOVE){
				if(this.id == event.blockId){
					if(this.parentBlock_ && this.parentBlock_.type =="group")
						block.removeField("Command")
					else if(event.oldInputName && event.oldInputName.includes("ADD"))
						block.appendField(new Blockly.FieldDropdown(commMap.getCommad_vaules(device)), "Command");

				}
			}else if(event.type == Blockly.Events.BLOCK_CHANGE && event.element == "field" && event.name == "method_checkbox"){//change checkbox
				if(this.id == event.blockId){
					var shortdevice = this.getField("device").text_;
					var device = returnName(shortdevice)
					var count = deviceCount.get(device)
					this.removeInput(device)
					if(event.newValue == false){
						this.appendValueInput(device) //connect with Inpute
						.appendField(shortdevice, "device")
						.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
						.appendField(new Blockly.FieldCheckbox("FALSE"), "method_checkbox")
						.setCheck("Inputa");

					}else if(event.newValue == true){
						this.appendDummyInput(device)
						.appendField(shortdevice, "device")
						.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
						.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
						var block = this.getInput(device)
						setMethodField(block, device);


					}
				}
			}
		
		}
	};
}

function setMethodField(block, device){
		
	var method = commMap.getMethod(device);
	if(method){ // only one method
		//var method = methods[0]
		if(method.type == "ENUM")
			block.appendField(new Blockly.FieldDropdown(commMap.getMethod_vaulesById(device, method.id)), "method_vaules");
		else{
			block.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox")
			block.appendField(new Blockly.FieldTextInput(""), "method_vaules");
		}
	}/*else if(methods.length > 1 ){ // method >= 2 later
		var ids = new Array()
		var types = new Array()
		var values = new Array()

		for(var method of methods){
			ids.push(method.id) 
			types.push(method.type) 
			values.push(method.value) 	
		}
		block.appendField(new Blockly.FieldDropdown(ids), "method");

		var method= methods[0]
		if(method.type == "ENUM")
			block.appendField(new Blockly.FieldDropdown(commMap.getMethod_vaulesById(device, method.id)), "method_vaules");
		else{
			block.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox")
			block.appendField(new Blockly.FieldTextInput(""), "method_vaules");
		}
	
	}*/
	
}





Blockly.Blocks['action_state'] = {
  init: function() {
  
	var count = deviceCount.get("state")


    this.appendValueInput("state")
		.appendField("box")
        .appendField(new Blockly.FieldVariable(count, null, null, "state"), "name")
        .appendField("=")
        .setCheck(["Action", "Inputa", "data"]);

	this.setInputsInline(true);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
	 this.setTooltip("");
	 this.setHelpUrl("");
  }, onchange: function(event){
  	
		
  }
};

Blockly.SmartThings['action_state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  var value_input = Blockly.SmartThings.valueToCode(block, 'state', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();
	if(value_input ){
		if(typeof value_input == "string"){
			smartAction.state = "state.box"+variable_name;
			smartAction.valueinput = value_input
			if(isNaN(value_input))
				smartAction.state_command = "state.box"+variable_name +" = " + '\"'+value_input+ '\"'
			else
				smartAction.state_command = "state.box"+variable_name +" = " + value_input
		}else if(value_input.constructor && value_input.constructor == Inputc){
			smartAction.state = "state.box"+variable_name;
			smartAction.valueinput = value_input
			smartAction.state_command = "state.box"+variable_name +" = " + value_input.devname
			
		}else if(value_input.constructor && value_input.constructor == Args){
			smartAction.state = "state.box"+variable_name;
			smartAction.valueinput = value_input
			smartAction.state_command = "state.box"+variable_name +" = " + value_input.devname
		}
	}
  // TODO: Change ORDER_NONE to the correct strength.
  return [smartAction]
};


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
  // TODO: Assemble SmartThings into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  
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

Blockly.SmartThings['inputa_data'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
   // TODO: Assemble SmartThings into code variable.

  	//  var c = new Inputc();
	//  c.type = dropdown_type;
	//  c.name = dropdown_type+variable_name;
	//  c.input = 'input \"'+c.name+'\", \"'+ c.type +'\", title:\"'+c.name+'\"' ;
	//  return c;
	  //var code =

  var args = new Args();
  args.device = dropdown_type;
  args.devname = dropdown_type+variable_name
	args.input = 'input \"'+args.devname+'\", \"'+args.device +'\", title:\"'+args.devname+'\"' ;
  return args;
};


Blockly.Blocks['getlocation_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getLocation");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getlocation_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getlocation";
};

Blockly.Blocks['getsunrise_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunrise");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunrise_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getsunrise";
};

Blockly.Blocks['getsunset_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunset");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunset_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getsunset";
};

Blockly.Blocks['getweatherfeature_a'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getWeatherFeature");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getweatherfeature_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getWeatherFeature";
};


Blockly.Blocks['setlocationmode_a'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
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
  return "setLocationMode";
};











Blockly.Blocks['action_group'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Block_colour_action);
    this.itemCount_ = 3;
    this.updateShape_();  
	this.setInputsInline(true);
    this.setOutput(true, 'Action');
    this.setMutator(new Blockly.Mutator(['lists_create_with_action']));
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_action_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_action');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Blocks['lists_create_with_action_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Block_colour_action);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_create_with_action'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Block_colour_action);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};




Blockly.SmartThings['action_group'] = function(block) {
	
	var i = 0;
	var length = block.inputList.length
	var actionList = new Array();
	
	while(i < length){
	 	var device = Blockly.SmartThings.valueToCode(block, 'ADD'+i, Blockly.SmartThings.ORDER_ATOMIC);
	 	actionList = actionList.concat(device)
		i++;
	}

  return actionList;
};