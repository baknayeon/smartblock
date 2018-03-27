Blockly.Blocks['event_handler'] = {
  init: function() {
    this.appendDummyInput('from')
        .appendField("from")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "dropDownFrom");
    this.appendDummyInput('to')
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "dropDownTo");

    this.setOutput(true, "Event_Handler");
    this.setColour(Block_colour_event);
    this.setInputsInline(true);
 	this.setTooltip("");
 	this.setHelpUrl("");
  },
	onchange: function(event) {
			if(this.parentBlock_){ //this.squareTopLeftCorner_ && 
				var parentBlock = this.parentBlock_
				var fromBlock = this.getInput('from');
				var toBlock = this.getInput('to');
				if(event.type == Blockly.Events.BLOCK_MOVE){
					//init event_handler
					if(event.newParentId == parentBlock.id){
						var device = parentBlock.getField("device").text_
						var parentBlock_attr = parentBlock.getField("attribute").text_;
						parentBlock.getInput(device).removeField("attribute");

						if(attrMap.isOnlyENUM(device)){
							var newAttr = [[".","."]]
							newAttr = newAttr.concat(attrMap.getENUM_vaules(device));

							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");

						}else if(attrMap.hasMultiTypeENUM(device)){
							var attribute_id = parentBlock.getField("attribute_id").text_;
							var newAttr = [[".","."]]
							newAttr = newAttr.concat(attrMap.getENUM_vaulesById(device, attribute_id));

							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");


						}else if(attrMap.isOnlyNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldTextInput(""), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldTextInput(parentBlock_attr), "dropDownTo");
						}
					}
				}else if(event.element == "field" && event.name ==="attribute_id"){
					//event block attribute_id changed
					var device = parentBlock.getField("device").text_
					var attribute_id = event.newValue;

					if(attrMap.hasMultiTypeENUM(device)){
						var newAttr = [[".","."]]
						newAttr = newAttr.concat(attrMap.getENUM_vaulesById(device, attribute_id));

						fromBlock.removeField('dropDownFrom');
						fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
						toBlock.removeField("dropDownTo");
						toBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownTo");
					}else if(attrMap.hasMultiTypeNUMBER(device)){
						fromBlock.removeField('dropDownFrom');
						fromBlock.appendField(new Blockly.FieldTextInput(""), "dropDownFrom");
						toBlock.removeField("dropDownTo");
						toBlock.appendField(new Blockly.FieldTextInput(""), "dropDownTo");
					}

				}
				
			
		}
  }
};

Blockly.SmartThings['event_handler'] = function(block) {
  var dropdown_from = block.getFieldValue('dropDownFrom');
  var dropdown_to = block.getFieldValue('dropDownTo');
  // TODO: Assemble SmartThings into code variable.
  
  var smartevent = new Event();
  smartevent.event_handler = true;
  smartevent.from = dropdown_from;
  smartevent.to = dropdown_to; 
  return smartevent;
};

function event_block(device){
	Blockly.SmartThings['e_'+device] = function(block) {
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
	  var dropdown_attributes = block.getFieldValue('attribute');
	  var value_switch = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.
	  console.log("event_block"); 

	  var smartevent = new Event();
	  smartevent.devname = variable_name;
	  smartevent.device = device;
	  smartevent.event_handler = value_switch;
	  smartevent.attr = dropdown_attributes

	  
	  return smartevent;
	};

	Blockly.Blocks['e_'+device] = {
		
		init: function() {
			this.appendValueInput(device)
					.setCheck("Event_Handler")
					.appendField(device, "device")
					.appendField(new Blockly.FieldVariable(device+event_num, true, device), "name");

			var block = this.getInput(device);
			if(attrMap.isOnlyENUM(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");
			}else if(attrMap.isOnlyNUMBER(device)){
				block.appendField(new Blockly.FieldTextInput(""), "attribute");
			}else if(attrMap.hasMultiTypeENUM(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
					.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");
			}else if(attrMap.hasMultiTypeNUMBER(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
					.appendField(new Blockly.FieldTextInput(""), "attribute");
			}
			this.setOutput(true, "Event");
			this.setColour(Block_colour_event);
			this.setTooltip("");
			this.setHelpUrl("");
		},
		onchange: function(event) {
			if(event.blockId == this.id)		
				if(event.oldParentId == this.id){
					//disconneted
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					if(attrMap.isOnlyENUM(device)){
						block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");
					}else if(attrMap.hasMultiTypeENUM(device)){
						var attribute_id = this.getField("attribute_id").text_;
						block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");

					}else if(attrMap.isOnlyNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){
						block.appendField(new Blockly.FieldTextInput(""), "attribute");
					}
				}else if(!this.squareBottomLeftCorner_ && event.element == "field" && event.name ==="attribute_id"){
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
