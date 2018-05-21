Blockly.Blocks['time'] = {
  init: function() {
    this.appendValueInput("time")
        .setCheck("day")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput("0"), "hour")
        .appendField(":","c")
        .appendField(new Blockly.FieldTextInput("00"), "minute")
		 .appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['day'] = {
  init: function() {
	var d = new Date();
	var month = d.getMonth()
	var day = d.getDate()
	var months = [["Jan","Jan"], ["Feb","Feb"], ["Mar","Mar"], ["Apr","Apr"],
					["May","May"], ["Jun","Jun"], ["Jul","Jul"], ["Aug","Aug"],
					["Sept","Sept"], ["Oct","Oct"], ["Nov","Nov"], ["Dec","Dec"]]
    this.appendValueInput("year")
        .setCheck("year")
        .appendField(new Blockly.FieldDropdown(months, months[month][0]), "month")
        .appendField(new Blockly.FieldTextInput(day), "day")
        .appendField("th","c");
    this.setOutput(true, "day");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['day'] = function(block) {
	var dropdown_month = block.getFieldValue('month');
	var text_day = block.getFieldValue('day');
	var value_year = Blockly.SmartThings.valueToCode(block, 'year', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.

	var months = ["Jan", "Feb","Mar","Apr", "May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
	var month = months.indexOf(dropdown_month)+1
	dropdown_month = "0"+ month
	
	if(text_day < 10)
			text_day = "0"+text_day
		
	if(value_year){
		var code =  value_year+'-'+dropdown_month+'-'+text_day;
	}else{
		var d = new Date();
		var year = d.getFullYear()
		var code =  year+'-'+dropdown_month+'-'+text_day;
	}
  return code;
};

Blockly.Blocks['year'] = {
  init: function() {
	var d = new Date();
	var year = d.getFullYear()
    this.appendDummyInput("day")
        .appendField(new Blockly.FieldTextInput(year), "year")
    this.setOutput(true, "year");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['year'] = function(block) {
  var text_year = block.getFieldValue('year');
  // TODO: Assemble SmartThings into code variable.
  var code = text_year;
  return code;
};

Blockly.SmartThings['time'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var dropdown_apm = block.getFieldValue('apm');
  var value_month_day_year = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
 
	var smartevent = new Event();
	if(value_month_day_year){
		var d = new Date();
		var year = d.getFullYear()
		var month = d.getMonth()+1
		var day = d.getDate()

		if(dropdown_apm == "PM")
			text_hour = (parseInt(text_hour)+12).toString()
		if(text_hour < 10)
			text_hour = "0"+text_hour
		if(text_minute < 10)
			text_minute = "0"+text_minute

		smartevent.time = value_month_day_year+'T'+text_hour+':'+text_minute+':00.000+0900';
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


		if(text_hour < 10)
			text_hour = "0"+text_hour
		if(text_minute < 10)
			text_minute = "0"+text_minute

		
		if(month < 10)
			month = "0"+month
		if(day < 10)
			day = "0"+day

		smartevent.time = year+'-'+month+'-'+day+'T'+text_hour+':'+text_minute+':00.000+0900';
	} // ��yyyy-MM-dd'T'HH:mm:ss.SSSZ�� 2001-07-04T12:08:56. 235-0700  http://mainia.tistory.com/174
	return smartevent;
};

Blockly.Blocks['input_time'] = {
  init: function() {
    this.appendDummyInput("type")
        .appendField("at time");
	this.setInputsInline(true);
	this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
	this.setTooltip("");
	this.setHelpUrl("");
  }
};

Blockly.SmartThings['input_time'] = function(block) {

	var time_num = deviceCount.get("time")
	var smartevent = new Event();
	smartevent.devname = "time"+time_num
	smartevent.device = "time"
	smartevent.time = "time"+time_num
	deviceCount.up("time")
	
  return smartevent;
};

Blockly.Blocks['timer'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendValueInput("timer")
        .setCheck("Action")
		.appendField(new Blockly.FieldVariable("timer"+time_num, null, null, "timer"), "NAME")
		.appendField(" : ")
		.appendField(new Blockly.FieldDropdown([["after","after"], ["every","every"]]), "kind")
		.appendField(new Blockly.FieldTextInput("0"), "time")
        .appendField(new Blockly.FieldDropdown([["hour","hour"], ["minute","minute"]]), "unit");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  after_init: function() {
	this.getInput("timer")
		.appendField(new Blockly.FieldTextInput("0"), "time")
        .appendField(new Blockly.FieldDropdown([["hour","hour"], ["minute","minute"]]), "unit");
  
  
  },
  every_init: function() {
	this.getInput("timer")
		.appendField(new Blockly.FieldDropdown([["1Minute","1Minute"], ["5Minutes","5Minutes"], ["10Minutes","10Minutes"],
		["15Minutes", "15Minutes"], ["30Minutes", "30Minutes"], ["1Hour", "1Hour"], ["3Hours", "3Hours"]]), "run");
  
  },
  
  
  onchange: function(event) {
	if(event.element == "field" && event.blockId == this.id){
		if(event.oldValue == "after"){
			this.getInput("timer").removeField("time")
			this.getInput("timer").removeField("unit")
			this.every_init();
		}else if(event.oldValue == "every"){
			this.getInput("timer").removeField("run")
			this.after_init();
		}
	}
  
  }
};

Blockly.SmartThings['timer'] = function(block) {
  
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);var dropdown_timer = block.getFieldValue('kind');
  var dropdown_unit = block.getFieldValue('unit');
  var text_time = block.getFieldValue('time');

  var dropdown_run = block.getFieldValue('run');

  var value_actions = Blockly.SmartThings.valueToCode(block, 'timer', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  
  if(dropdown_timer == "after"){
	if(dropdown_unit == "hour"){
		for(var action of value_actions)
			if(!action.timerhandler){
				action.timer = text_time*60*60
				action.timerhandler = variable_name
			}
	}else if (dropdown_unit == "minute"){
		for(var action of value_actions)
			if(!action.timer)	
			if(!action.timerhandler){
				action.timer = text_time*60
				action.timerhandler = variable_name
			}
	}

  }

  return value_actions;
};

Blockly.Blocks['stop'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendValueInput("stop ")
        .setCheck("Action")
        .appendField("stop")
		.appendField(new Blockly.FieldVariable("timer"+time_num, null, null, "timer"), "NAME");
    this.setInputsInline(false);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['stop'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);
  var actionList = Blockly.SmartThings.valueToCode(block, 'stop', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
 
  // TODO: Change ORDER_NONE to the correct strength.


	var smartAction = new Action();
	smartAction.method = 'unschedule('+variable_name+')';
	
	if(goog.isArray(actionList) || actionList.constructor == Grouping){
		var result = actionList.concat(smartAction);
	}else{
		var result = [smartAction];

	}
	
	return result;
  
};