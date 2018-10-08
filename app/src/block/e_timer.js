Blockly.Blocks['e_time'] = {
  init: function() {
    this.appendValueInput("time")
        .setCheck("day")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput("0"), "hour")
        .appendField(":","c")
        .appendField(new Blockly.FieldTextInput("0"), "minute")
		 .appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['e_day'] = {
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
Blockly.Blocks['e_week'] = {
  init: function() {
    this.appendValueInput("next")
        .setCheck("every")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week1")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week2")
        ;//.appendField("week");
    this.setInputsInline(false);
    this.setOutput(true, "every");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['e_year'] = {
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


Blockly.SmartThings['e_day'] = function(block) {
	var dropdown_month = block.getFieldValue('month');
	var text_day = block.getFieldValue('day');
	var value_ = Blockly.SmartThings.valueToCode(block, 'year', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.

	var months = ["Jan", "Feb","Mar","Apr", "May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
	var text_month = months.indexOf(dropdown_month)+1
	var cron = ""

	if(value_ != ""){
		cron = value_.replace("day", text_day)
		cron = cron.replace("month", text_month)
	}else{
		if(text_day)
			cron = "0 minutes hours "+text_day+" month week"
		if(text_month)
			cron = cron.replace("month", text_month)
	}

	return cron;
};

Blockly.SmartThings['e_week'] = function(block) {
  var dropdown_week1 = block.getFieldValue('week1');
  var dropdown_week2 = block.getFieldValue('week2');
  var value_ = Blockly.SmartThings.valueToCode(block, 'next', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

   var cron = ""

  if(value_ != ""){
	  if(dropdown_week1 == dropdown_week2)
		cron = value_.replace("week", dropdown_week1)
	  else if(dropdown_week1 != dropdown_week2){
		var week = dropdown_week1+"-"+dropdown_week2
		cron = value_.replace("week", week)
	  }
  }else{
	if(dropdown_week1 == dropdown_week2)
		cron = "0 minutes hours day month "+ dropdown_week1.toUpperCase();
	else if(dropdown_week1 != dropdown_week2)
		cron = "0 minutes hours day month "+ dropdown_week1.toUpperCase()+"-"+dropdown_week2.toUpperCase()
  }

  return cron;
};
Blockly.SmartThings['e_year'] = function(block) {
  var text_year = block.getFieldValue('year');
  // TODO: Assemble SmartThings into code variable.
  var code = text_year;
  return code;
};

Blockly.SmartThings['e_time'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var dropdown_apm = block.getFieldValue('apm');
  var value_month_day_year = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
    var time
	if(value_month_day_year != "")
		time = value_month_day_year
	else  time ="0 minutes hours day month week"


	if(dropdown_apm == "PM")
		text_hour = (parseInt(text_hour)+12).toString()

	time = time.replace("minutes", text_minute)
	time = time.replace("hours", text_hour)
	
	time = time.replace("minutes", "*")
	time = time.replace("hours", "*")
	time = time.replace("day", "*")
	time = time.replace("month", "*")
	time = time.replace("week", "?")

	var smartevent = new Event();
	smartevent.time = time;
	return smartevent;
};

Blockly.Blocks['input_time'] = {
  init: function() {
	var time_num = deviceCount.get("time")
    this.appendDummyInput("type")
        .appendField("at")
		.appendField(new Blockly.FieldVariable("time"+time_num, null, null, "time"), "name");
	this.setInputsInline(true);
	this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
	this.setTooltip("");
	this.setHelpUrl("");
  }
};

Blockly.SmartThings['input_time'] = function(block) {
	
	var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);

	var smartevent = new Event();
	smartevent.devname = variable_name
	smartevent.device = "time"
	smartevent.time = variable_name
	
  return smartevent;
};
