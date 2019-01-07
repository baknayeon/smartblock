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
		}else{ 
			if(checkbox_method == "TRUE"){
				var method = commMap.getMethod(device) //hard coding
				method.value = value_method

				smartAction.method = method
				smartAction.devname = device+variable_name;
				smartAction.device = device;	
			
		
			}else if(checkbox_method == "FALSE"){
				var method = commMap.getMethod(device)//inputa
					method.args = args
				if(args.constructor == API){
					method.value = args.value
				}else if(args.constructor == Inputa){
					method.value = args.devname
				}else if(args.constructor == String){
					if(isNaN(args))
						method.value = '\"'+args+ '\"'
					else
						method.value = args

				}
				smartAction.method = method
				smartAction.arginput.push(args)
				smartAction.devname = device+variable_name;
				smartAction.device = device;
				smartAction.input = 'input \"'+smartAction.devname+'\", \"capability.'+smartAction.device +'\", title:\"'+smartAction.devname+'\"' ;
		
			}
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
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "method_checkbox");
				var block = this.getInput(device)
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
						.setCheck(["Inputa", "dataa", "state"]);

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
	}
}

