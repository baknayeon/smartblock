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
			
				if(event.type == Blockly.Events.BLOCK_MOVE ){
				
					if((event.newParentId == parentBlock.id && parentBlock.type.includes("e_") )){
						//init event_handler with event
						var fromBlock = this.getInput('from');
						var toBlock = this.getInput('to');

						var device = parentBlock.getFieldValue("device")
						var parentBlock_attr = parentBlock.getFieldValue("attribute");
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
					}else if(parentBlock.type.includes("any") ){
						if(event.newParentId === this.parentBlock_.id || event.oldParentId === this.parentBlock_.id){
							//init event_handler with any
							var length = parentBlock.inputList.length-1
							var deviceList = new Set()
							for(var i = 0; i< length; i++){
								var block = parentBlock.getInputTargetBlock("ADD"+i)
								if(block){
									var device = block.getField("device").text_
									deviceList.add(device)
								}
							}
							var event_handler = parentBlock.getInputTargetBlock("p")
							var fromBlock = event_handler.getInput('from');
							var toBlock = event_handler.getInput('to');
							var attrs = new Set();

							for(let device of deviceList){
								if(attrMap.isOnlyENUM(device)){
									var newAttr = attrMap.getENUM(device);
									for(let new_a of newAttr.value){
										attrs.add(new_a)

									}
								}else if(attrMap.hasMultiTypeENUM(device)){
									var attribute_id = parentBlock.getField("attribute_id").text_;
									var newAttr = attrMap.getENUMById(device, attribute_id);
									for(let new_a of newAttr.value){
										attrs.add(new_a)

									}

								}else if(attrMap.isOnlyNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){

								}

							}
							var newAttr = [[".","."]]
							for(let attr of attrs){
								newAttr.push([attr, attr])
							}
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");
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


Blockly.SmartThings['any'] = function(block) {

	var length = block.inputList.length-1
	var i = 0;
	var groupingDevice = new Grouping();
	
	groupingDevice.type = "any"

	var event_handler = Blockly.SmartThings.valueToCode(block, 'p', Blockly.SmartThings.ORDER_ATOMIC);
	groupingDevice.p = event_handler

	while(i < length){
	 	var device = Blockly.SmartThings.valueToCode(block, 'ADD'+i, Blockly.SmartThings.ORDER_ATOMIC);
	 	groupingDevice.list.push(device)
		i++;
	}

  return groupingDevice;
};

function event_block(device){
	Blockly.SmartThings['e_'+device] = function(block) {
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  var dropdown_attributes = block.getFieldValue('attribute');
	  var value_switch = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.
	  console.log("event_block"); 

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
					.setCheck("Event_Handler")
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
					//event - event_handler
					//disconneted
					appendAttr(device, block);
					
				}else if(!this.squareBottomLeftCorner_ && event.element == "field" && event.name ==="attribute_id"){
					if(event.blockId == this.id){
						block.removeField("attribute")
						var attribute_id = this.getField("attribute_id").text_;
						block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");
					}
				}
				/*else if(this.parentBlock_ && event.newParentId == this.parentBlock_.id){
					//any - event
					block.removeField("attribute");
				}
				else if(event.oldParentId){
					if(this.id == event.blockId){
						//any - event
						//disconneted
						appendAttr(device, block);
					}
				}*/
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