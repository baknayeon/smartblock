function action_block(device, type){
	Blockly.SmartThings['a_'+device+type] = function(block) {
		var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	    var dropdown_commands = block.getFieldValue('Command');
		var Command_id = block.getFieldValue("Command_id");
	    var checkbox_method = block.getFieldValue('method_checkbox');
	    var value_method = block.getFieldValue('method_vaules');
		var args = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
		// TODO: Assemble SmartThings into code variable.

		var smartAction = new Action();

		if(dropdown_commands){ //debice command
			if(commMap.hasCommad(device)){
				smartAction.devname = device+variable_name;
				smartAction.command= smartAction.devname+'.'+dropdown_commands+'()';
				smartAction.command_part= dropdown_commands;
				smartAction.device = device;	
				smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;
			}
		}else{ //method calling
			if(Command_id == null){
				if(checkbox_method == "TRUE"){
					var method = commMap.getMethod(device) //hard coding
					method.args = value_method

					smartAction.method = method
					smartAction.devname = device+variable_name;
					smartAction.device = device;	
					smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;


				}else if(checkbox_method == "FALSE"){

					if(args.constructor == Calculation){
						var arginput = args.inputs
						var method = commMap.getMethod(device)
							method.args = args
						smartAction.method = method
						smartAction.arginput = arginput
						smartAction.devname = device+variable_name;
						smartAction.device = device;
						smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;

					}else{
						var arginput = args
						var method = commMap.getMethod(device)
							method.args = args
						smartAction.method = method
						smartAction.arginput.push(arginput)
						smartAction.devname = device+variable_name;
						smartAction.device = device;
						smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;


					}

				}else if(!dropdown_commands && !Command_id && !checkbox_method){ // grouping
					if(commMap.hasCommad(device)){
						smartAction.devname = device+variable_name;
						smartAction.device = device;	
						smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;
					}

					
					return smartAction;

				}
			}else{
				if(checkbox_method == "TRUE"){
					var method = commMap.getMethodS_Byid(device, Command_id)//hard coding
					method.args = value_method

					smartAction.method = method
					smartAction.devname = device+variable_name;
					smartAction.device = device;	
					smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;


				}else if(checkbox_method == "FALSE"){

					if(args.constructor == Calculation){
						var arginput = args.inputs
						var method = commMap.getMethodS_Byid(device, Command_id)
							method.args = args
						smartAction.method = method
						smartAction.arginput = arginput
						smartAction.devname = device+variable_name;
						smartAction.device = device;
						smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;

					}else{
						var arginput = args
						var method = commMap.getMethodS_Byid(device, Command_id)
							method.args = args
						smartAction.method = method
						smartAction.arginput.push(arginput)
						smartAction.devname = device+variable_name;
						smartAction.device = device;
						smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;


					}

				}

				
			}
		}

		return [smartAction];

	};
	
	Blockly.Blocks['a_'+device+type] = {
		init: function() {
			var count = deviceCount.get(device)
			var shortdevice = shortName(device)
			if(type == "Command"){
				this.appendDummyInput(device)
					.appendField(shortdevice, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldDropdown(commMap.getCommad_vaules(device)), "Command");

			}else if(type == "Method"){
				
				this.appendDummyInput(device)
				.appendField(shortdevice, "device")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
				var block = this.getInput(device)
				setMethodField(block, device);

			}else if(type == "MethodS"){
				var method_id = commMap.getMethodS_method_id_vaules(device)

				this.appendDummyInput(device)
				.appendField(shortdevice, "device")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
				.appendField(new Blockly.FieldDropdown(method_id), "Command_id")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
				var block = this.getInput(device)
				setMethodSField(block, device, method_id[0][0]);
				

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
					var Command_id = this.getField("Command_id");
					var device = returnName(shortdevice)
					var count = deviceCount.get(device)
					this.removeInput(device)
					if(event.newValue == false){
						if(Command_id == null){
							this.appendValueInput(device) //connect with Inpute
							.appendField(shortdevice, "device")
							.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
							.appendField(new Blockly.FieldCheckbox("FALSE"), "method_checkbox")
							.setCheck(["Inputa", "dataa", "state", "math_action"]);

						}else{
								var method_id = commMap.getMethodS_method_id_vaules(device)
								this.appendValueInput(device)
								.appendField(shortdevice, "device")
								.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
								.appendField(new Blockly.FieldDropdown(method_id, Command_id.text_), "Command_id")
								.appendField(new Blockly.FieldCheckbox("FALSE"), "method_checkbox")
							    .setCheck(["Inputa", "dataa", "state", "math_action"]);

						}

					}else if(event.newValue == true){
						if(Command_id == null){
							this.appendDummyInput(device)
							.appendField(shortdevice, "device")
							.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
							.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
							var block = this.getInput(device)
							setMethodField(block, device);
						}else{
							var method_id = commMap.getMethodS_method_id_vaules(device)

							this.appendDummyInput(device)
							.appendField(shortdevice, "device")
							.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
							.appendField(new Blockly.FieldDropdown(method_id, Command_id.text_), "Command_id")
							.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
							var block = this.getInput(device)
							setMethodSField(block, device, method_id[0][0]);
						}
					}
				}
			}
		
		}
	};
}

function action_block2(device, type){
	Blockly.SmartThings['a_'+device+type] = function(block) {
	  var type = block.getFieldValue('type');
	  var dropdown_attribute_id = block.getFieldValue('attribute_id');
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  // TODO: Assemble SmartThings into code variable.
	  type = returnName(type);
	  var a = new Inputa();
	  a.device = type;
	  a.devname =device+variable_name;
	  a.input = 'input \"'+a.devname+'\", \"capability.'+type +'\", title:\"'+a.devname+'\"' ;
	  return a;

	};

	Blockly.Blocks['a_'+device+type] = {
	    init: function() {
			var new_devName = shortName(device)
			var count = deviceCount.get(device)

			if(type == "single"){
				this.appendDummyInput("device")
					.appendField(new Blockly.FieldLabel(new_devName), "type")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
			}else if(type == "multiple"){
				var attr = attrMap.getMultipleMethod_id_vaules(device)
				this.appendDummyInput("device")
					.appendField(new Blockly.FieldLabel(new_devName), "type")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldDropdown(attr),"attribute_id");

			}


			var block = this.getInput("device");

			this.setOutput(true, "Inputa");
			this.setColour(Block_colour_action);
			this.setTooltip("");
			this.setHelpUrl("");
	  },
		onchange: function(event) {

	 		 if(!this.squareBottomLeftCorner_ && event.element == "field" && event.name ==="attribute_id"){
				if(event.blockId == this.id){
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					block.removeField("attribute")
					var attribute_id = this.getField("attribute_id").text_;
					block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");
				}
			}
			

		}
	};
}

function setMethodField(block, device){
		
	if(commMap.hasMethod(device)){ // only one method
		var method_vaules = commMap.getMethod_vaules(device)
		if(method_vaules)
			block.appendField(new Blockly.FieldDropdown(method_vaules), "method_vaules");
		else{
			block.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox")
			block.appendField(new Blockly.FieldTextInput(""), "method_vaules");
		}
	}
}



function setMethodSField(block, device, id){
		
	if(commMap.hasMethodS(device)){ 
		var method_vaules = commMap.getMethodS_ENUMvaulesByid(device, id)
		if(method_vaules)
			block.appendField(new Blockly.FieldDropdown(method_vaules), "method_vaules");
		else{
			block.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox")
			block.appendField(new Blockly.FieldTextInput(""), "method_vaules");
		}
	}
}

