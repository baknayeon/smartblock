Blockly.Blocks['a_timer'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendDummyInput("actions")
		.appendField("set timer")
		.appendField(new Blockly.FieldVariable(time_num, null, null, "timer"), "NAME")
        .appendField("after")
    
    this.appendDummyInput("number")
        .appendField(new Blockly.FieldTextInput(3), "time_min");
    this.appendDummyInput("min_checkbox")
        .appendField("min")
		.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");
	this.setInputsInline(true);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_CHANGE)
	if(this.id == event.blockId && event.element == "field" && event.name == "min_checkbox"){//change checkbox
		this.removeInput("number")
		this.removeInput("min_checkbox")
		if(event.newValue == false){
			this.appendValueInput("number");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("False"), "min_checkbox");
		}else if(event.newValue == true){
			this.appendDummyInput("number")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}
	
  }
};

Blockly.SmartThings['a_timer'] = function(block) {
	var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE); //timer name
	var text_minute = block.getFieldValue('time_min');
    var value_min = Blockly.SmartThings.valueToCode(block, 'number', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action
	smartAction.time = text_minute? text_minute * 60 : value_min.devname
	smartAction.timerhandler = "timer"+variable_name;
	smartAction.arginput = [value_min]

  return [smartAction];
};

Blockly.Blocks['a_stop'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendDummyInput("stop ")
        .appendField("stop timer")
		.appendField(new Blockly.FieldVariable(time_num, null, null, "timer"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['a_stop'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
 
  // TODO: Change ORDER_NONE to the correct strength.
  var smartAction = new Action();
  smartAction.method = 'unschedule(timer'+variable_name+')';
	
	
	return [smartAction];
};
