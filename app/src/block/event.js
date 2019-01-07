
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
			
				if((event.type == Blockly.Events.BLOCK_MOVE && event.newParentId == parentBlock.id) 
				 ||(event.type ==Blockly.Events.BLOCK_CREATE &&  event.blockId == parentBlock.id )){
						var fromBlock = this.getInput('from');
						var toBlock = this.getInput('to');
						var device = parentBlock.getFieldValue("device")
						var parentBlock_attr = parentBlock.getFieldValue("attribute");
						parentBlock.getInput(device).removeField("attribute");
						var newAttr = [[".","."]]
						if(attrMap.onlyInENUM(device)){
							newAttr = newAttr.concat(attrMap.getENUM_vaules(device));
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");
						}else if(attrMap.onlyInNUMBER(device)){ //|| attrMap.hasMultiTypeNUMBER(device)
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldTextInput(""), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldTextInput(parentBlock_attr), "dropDownTo");
						}/*else if(attrMap.hasMultiTypeENUM(device)){
							var attribute_id = parentBlock.getField("attribute_id").text_;
							newAttr = newAttr.concat(attrMap.getENUM_vaulesById(device, attribute_id));
							fromBlock.removeField('dropDownFrom');
							fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
							toBlock.removeField("dropDownTo");
							toBlock.appendField(new Blockly.FieldDropdown(newAttr,parentBlock_attr), "dropDownTo");
						}*/
					
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


function event_block(device, type){
	Blockly.SmartThings['e_'+device+type] = function(block) {
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  var dropdown_attributes = block.getFieldValue('attribute');
	  //var dropdown_attributes_type = block.getFieldType('attribute');
	  var value_switch = Blockly.SmartThings.valueToCode(block, device, Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.

	  var smartevent = new Event();
	  smartevent.devname = device+variable_name;
	  smartevent.device = device;
	  smartevent.event_handler = value_switch;
	  smartevent.attr = dropdown_attributes
	//  smartevent.attrtype = dropdown_attributes_type
	  
	  return smartevent;
	};

	Blockly.Blocks['e_'+device+type] = {
		
		init: function() {
			var new_devName = shortName(device)
			var count = deviceCount.get(device)

			if(type == "ENUM"){
				this.appendValueInput(device)
					.appendField(new_devName, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute")
					.setCheck("specific_event");
			}else if(type == "NUMBER"){
				this.appendValueInput(device)
					.appendField(new_devName, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldCheckbox("TRUE"), "attribute_checkbox")
					.appendField(new Blockly.FieldTextInput(""), "attribute")
					.setCheck("specific_event");
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
			}else if(event.type == Blockly.Events.BLOCK_CREATE && this.id == event.blockId){ //copy with specific_event
				if(this.childBlocks_.length == 1){
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					block.removeField("attribute")
				}
			}else if(event.type == Blockly.Events.BLOCK_CHANGE && event.element == "field" && event.name == "attribute_checkbox"){//change checkbox
				var shortdevice = this.getField("device").text_;
				var device = returnName(shortdevice)
				var count = deviceCount.get(device)
				this.removeInput(device)
				if(event.newValue == false){
					this.appendValueInput(device) //connect with Inpute
					.appendField(shortdevice, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldCheckbox("FALSE"), "attribute_checkbox")
					.setCheck("Inpute");

				}else if(event.newValue == true){
					this.appendDummyInput(device)
					.appendField(shortdevice, "device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldCheckbox("TRUE"), "attribute_checkbox")
					.appendField(new Blockly.FieldTextInput(""), "attribute");


				}
			}
		}
	};
}

function appendAttr(device, block){
	if(attrMap.onlyInENUM(device)){
		block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");
	}else if(attrMap.onlyInNUMBER(device)){
		block.appendField(new Blockly.FieldTextInput(""), "attribute")
			.appendField(new Blockly.FieldCheckbox("TRUE"), "attribute_checkbox");
	}

}

Blockly.Blocks['inpute_data'] = {
  init: function() {
	  var device = "text"
	  var count = deviceCount.get(device);
	  this.appendDummyInput("device")
		  .appendField(new Blockly.FieldDropdown([["text","text"], ["bool","bool"], ["number","number"], ["phone","phone"], ["message","message"]]), "type")
		  .appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
	  this.setColour(Block_colour_event);
	  this.setInputsInline(false);
	  this.setOutput(true, "Inpute");
	  this.setTooltip("");
	  this.setHelpUrl("");
  },onchange: function(event) {
  	if(this.id == event.blockId){
			if(event.element == "field"){ //changing type 
				var device = event.newValue
				var count = deviceCount.get(device)
				this.getInput("device").removeField("name")
				this.getInput("device")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name");

			}else if(event.type == Blockly.Events.BLOCK_MOVE){ //block connect
				if(event.newParentId && this.parentBlock_.id == event.newParentId ){
					var device = event.newInputName
					var attribute = attrMap.getNUMBER(device)
					if(attribute && attrMap.onlyInNUMBER(device)){
						var type = "number"
						var count = deviceCount.get(type)
						this.getInput("device").removeField("type")
						this.getInput("device").removeField("name")

						this.getInput("device").appendField(type,"type")
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

Blockly.Blocks['e_location'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("location")
        .appendField(new Blockly.FieldDropdown([[".","."], ["mode","mode"], ["position","position"], ["sunset","sunset"], ["sunrise","sunrise"], ["sunriseTime","sunriseTime"], ["sunsetTime","sunsetTime"]]), "attr");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['e_app'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("app")
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['e_installed'] = {
  init: function() {
			var count = deviceCount.get("installed")

  	this.appendDummyInput()
  		.appendField("installed")
  		.appendField(new Blockly.FieldVariable(count, null, null, "installed"), "name");
  		this.setOutput(true, "Event");
		this.setColour(Block_colour_event);
		this.setTooltip("");
		this.setHelpUrl("");
  }
};


Blockly.SmartThings['e_installed'] = function(block) {
	 var dropdown_attr = block.getFieldValue('attr');
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	// TODO: Assemble SmartThings into code variable.

	var smartevent = new Event();
	smartevent.api = "installed";
	smartevent.initmethod = "init_method"+variable_name;

	// TODO: Change ORDER_NONE to the correct strength.
	return smartevent;
};

Blockly.SmartThings['e_location'] = function(block) {
	 var dropdown_attr = block.getFieldValue('attr');
	// TODO: Assemble SmartThings into code variable.

	var smartevent = new Event();
	smartevent.api = "location";
	smartevent.attr = dropdown_attr	

	// TODO: Change ORDER_NONE to the correct strength.
	return smartevent;
};

Blockly.SmartThings['e_app'] = function(block) {
	// TODO: Assemble SmartThings into code variable.

	var smartevent = new Event();
	smartevent.api = "app";	

	// TODO: Change ORDER_NONE to the correct strength.
	return smartevent;
};