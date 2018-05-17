Blockly.Blocks['schedule'] = {
  init: function() {
    this.appendValueInput("time")
        .setCheck("input_time")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput("0"), "hour")
        .appendField(":","c")
        .appendField(new Blockly.FieldTextInput("00"), "minute")
		 .appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
		if(event.newParentId == this.id){
			var scheduleBlock = this.getInput("time");
			scheduleBlock.removeField("hour");
			scheduleBlock.removeField("c");
			scheduleBlock.removeField("minute");
			scheduleBlock.removeField("apm");
		}
		if(event.oldParentId == this.id){
		    var scheduleBlock = this.getInput("time")
			scheduleBlock.appendField(new Blockly.FieldTextInput("0"), "hour");
			scheduleBlock.appendField(":","c");
			scheduleBlock.appendField(new Blockly.FieldTextInput("00"), "minute");
			scheduleBlock.appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm")
		}
  }
};

Blockly.SmartThings['schedule'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var dropdown_apm = block.getFieldValue('apm');
  var value_time = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
 
	var smartevent = new Event();
	if(value_time){
		smartevent.time = value_time 
	}else{
		var d = new Date();
		var year = d.getFullYear()
		var month = d.getMonth()+1
		var day = d.getDate()

		if(dropdown_apm == "PM")
			text_hour = (parseInt(text_hour)+12).toString()

		if(text_hour < d.getHours())
			day = day+1
		if(text_minute < d.getMinutes() && text_hour == d.getHours())
			day = day+1


		if(month < 10)
			month = "0"+month
		if(day < 10)
			day = "0"+day
		if(text_hour < 10)
			text_hour = "0"+text_hour
		if(text_minute < 10)
			text_minute = "0"+text_minute

		

		smartevent.time = year+'-'+month+'-'+day+'T'+text_hour+':'+text_minute+':00.000+0900';
	} // ��yyyy-MM-dd'T'HH:mm:ss.SSSZ�� 2001-07-04T12:08:56. 235-0700  http://mainia.tistory.com/174


	  return smartevent;

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.Blocks['input_time'] = {
  init: function() {
    this.appendDummyInput("type")
        .appendField("time");
	this.setInputsInline(true);
	this.setOutput(true, "input_time");
    this.setColour(Block_colour_event);
	this.setTooltip("");
	this.setHelpUrl("");
  }
};
var time_num = 1;
Blockly.SmartThings['input_time'] = function(block) {
  var code = "time"+time_num;
  time_num++
  return code;
};

Blockly.Blocks['timer'] = {
  init: function() {
    this.appendValueInput("timer")
        .setCheck("Action")
		.appendField(new Blockly.FieldVariable("timerA", null, null, "timer"), "NAME")
		.appendField(" : ")
        .appendField(new Blockly.FieldDropdown([["after","after"], ["every","every"]]), "kind")
        .appendField(new Blockly.FieldTextInput("0"), "time")
        .appendField(new Blockly.FieldDropdown([["hour","hour"], ["minute","minute"], ["second","second"]]), "unit");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['timer'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_tiemr = block.getFieldValue('kind');
  var text_time = block.getFieldValue('time');
  var dropdown_unit = block.getFieldValue('unit');
  var value_after = Blockly.SmartThings.valueToCode(block, 'timer', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.

  return code;
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.appendValueInput("stop ")
        .setCheck("Action")
        .appendField("stop")
		.appendField(new Blockly.FieldVariable("timerA", null, null, "timer"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['stop'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_stop_ = Blockly.SmartThings.valueToCode(block, 'stop', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};