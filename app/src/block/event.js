Blockly.Blocks['specific_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("from")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "from");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "to");
    this.setInputsInline(true);
    this.setOutput(true, "specific_event");
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




Blockly.Blocks['specific_event'] = {
  init: function() {
    this.appendDummyInput('from')
        .appendField("from")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "dropDownFrom");
    this.appendDummyInput('to')
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "dropDownTo");
    this.setOutput(true, "specific_event");
    this.setColour(Block_colour_event);
    this.setInputsInline(true);
 	this.setTooltip("");
 	this.setHelpUrl("");
  },
	onchange: function(event) {
			if(this.parentBlock_){ 
				var parentBlock = this.parentBlock_
			
				if(event.type == Blockly.Events.BLOCK_MOVE ){
					if((event.newParentId == parentBlock.id && parentBlock.type.includes("e_") )){
						var fromBlock = this.getInput('from');
						var toBlock = this.getInput('to');
						var device = parentBlock.getFieldValue("device")
						var parentBlock_attr = parentBlock.getFieldValue("attribute");
						parentBlock.getInput(device).removeField("attribute");
						var newAttr = [[".","."]]
						if(attrMap.isOnlyENUM(device)){
							newAttr = newAttr.concat(attrMap.getENUM_vaules(device));
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");
						}else if(attrMap.hasMultiTypeENUM(device)){
							var attribute_id = parentBlock.getField("attribute_id").text_;
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


Blockly.SmartThings['specific_event'] = function(block) {
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
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  var dropdown_attributes = block.getFieldValue('attribute');
	  var value_switch = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.

	  var smartevent = new Event();
	  smartevent.devname = device+variable_name;
	  smartevent.device = device;
	  smartevent.event_handler = value_switch;
	  smartevent.attr = dropdown_attributes

	  
	  return smartevent;
	};

	Blockly.Blocks['e_'+device] = {
		
		init: function() {
			var new_devName = shortName(device)
			var count = deviceCount.get(device)
			if(goog.isNumber(count)){
				count = count.toString();
			}
			this.appendValueInput(device)
					.setCheck("specific_event")
					.appendField(new_devName, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name");

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
			if(event.type == Blockly.Events.BLOCK_MOVE){
				var device = this.getField("device").text_;
				var block = this.getInput(device);
				if(event.oldParentId == this.id){
					//event - specific_event
					//disconneted
					appendAttr(device, block);
					
				}else if(!this.squareBottomLeftCorner_ && event.element == "field" && event.name ==="attribute_id"){
					if(event.blockId == this.id){
						block.removeField("attribute")
						var attribute_id = this.getField("attribute_id").text_;
						block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");
					}
				}else if(this.id == event.blockId){
					if(this.parentBlock_ && this.parentBlock_.type =="group")
						block.removeField("attribute")
					else if(event.oldInputName && event.oldInputName.includes("ADD"))
						appendAttr(device, block)
					
				}
			}
			else if(event.type == Blockly.Events.BLOCK_CREATE && this.id == event.blockId){
				if(this.childBlocks_.length == 1){
					
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					block.removeField("attribute")
				}
			}else if(this.childBlocks_.length == 1){
				var childBlocks_ = this.childBlocks_["0"]
				if(childBlocks_.type == "specific_event"){
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					block.removeField("attribute")
				}
			}
			
		}
	};
}

function appendAttr(device, block){
	if(attrMap.isOnlyENUM(device)){
		block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");
	}else if(attrMap.hasMultiTypeENUM(device)){
		var attribute_id = this.getField("attribute_id").text_;
		block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");

	}else if(attrMap.isOnlyNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){
		block.appendField(new Blockly.FieldTextInput(""), "attribute");
	}

}

Blockly.Blocks['e_location'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("location")
        .appendField(new Blockly.FieldDropdown([["mode","mode"], ["position","position"], ["sunset","sunset"], ["sunrise","sunrise"], ["sunriseTime","sunriseTime"], ["sunsetTime","sunsetTime"]]), "attr");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['e_location'] = function(block) {
	 var dropdown_attr = block.getFieldValue('attr');
	// TODO: Assemble SmartThings into code variable.

	var smartevent = new Event();
	smartevent.device = "location";
	smartevent.attr = dropdown_attr	

	// TODO: Change ORDER_NONE to the correct strength.
	return smartevent;
};