Blockly.Blocks['a_timer_after'] = {
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
			this.appendValueInput("number")
				.setCheck(["Inputa", "state", "math_action"]);;
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
Blockly.Blocks['a_timer_every'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendDummyInput("actions")
		.appendField("set timer")
		.appendField(new Blockly.FieldVariable(time_num, null, null, "timer"), "timer_name")
        .appendField("every");
    
    this.appendDummyInput("time")
		.appendField("time")
		.appendField(new Blockly.FieldVariable(time_num, null, null, "time"), "time_name");

    this.appendDummyInput("min_checkbox")
		.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

	this.setInputsInline(true);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_CHANGE){
		
		var time_num = deviceCount.get("time")
		if(this.id == event.blockId && event.element == "field" && event.name == "min_checkbox"){//change checkbox
			this.removeInput("time")
			this.removeInput("min_checkbox")
			if(event.newValue == false){
				this.appendValueInput("time") 
					.setCheck(["a_time", "Inputa", "state", "math_action"]);
				this.appendDummyInput("min_checkbox")
					.appendField(new Blockly.FieldCheckbox("False"), "min_checkbox");
			}else if(event.newValue == true){
				this.appendDummyInput("time")
					.appendField("time")
					.appendField(new Blockly.FieldVariable(time_num, null, null, "time"), "name");
				this.appendDummyInput("min_checkbox")
					.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

			}
		}
	}
	
  }
};

Blockly.Blocks['a_stop'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendDummyInput("stop ")
        .appendField("stop timer")
		.appendField(new Blockly.FieldVariable(time_num, null, null, "timer"), "NAME")
		.appendField(new Blockly.FieldCheckbox("False"), "all_check");;
    this.setInputsInline(false);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['a_time'] = {
  init: function() {
	var time_num = deviceCount.get("schedule")
    this.appendValueInput("time")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput("0"), "hour")
        .appendField(":","c")
        .appendField(new Blockly.FieldTextInput("0"), "minute")
		.appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm")
        .setCheck(["day_a", "week_a"]);
    this.setOutput(true, "a_time");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['a_day'] = {
  init: function() {
	var d = new Date();
	var month = d.getMonth()
	var day = d.getDate()
	var months = [["Jan","Jan"], ["Feb","Feb"], ["Mar","Mar"], ["Apr","Apr"],
					["May","May"], ["Jun","Jun"], ["Jul","Jul"], ["Aug","Aug"],
					["Sept","Sept"], ["Oct","Oct"], ["Nov","Nov"], ["Dec","Dec"]]
    this.appendDummyInput("year")
        .appendField(new Blockly.FieldDropdown(months, months[month][0]), "month")
        .appendField(new Blockly.FieldTextInput(day), "day")
        .appendField("th","c");
    this.setOutput(true, "day_a");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_week'] = {
  init: function() {
    this.appendDummyInput("next")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week1")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week2")
        ;//.appendField("week");
    this.setInputsInline(false);
    this.setOutput(true, "week_a");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




Blockly.SmartThings['a_timer_after'] = function(block) {
	var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE); //timer name
	var text_minute = block.getFieldValue('time_min');
    var value_min = Blockly.SmartThings.valueToCode(block, 'number', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action
	smartAction.timer_type = "after"
	smartAction.time = text_minute? text_minute * 60 : value_min
	smartAction.timerhandler = "timer"+variable_name;
	smartAction.arginput = [value_min]

  return [smartAction];
};

Blockly.SmartThings['a_timer_every'] = function(block) {
	var timer_variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('timer_name'), Blockly.Variables.NAME_TYPE); //timer name
    var checkbox_min_checkbox = block.getFieldValue('min_checkbox') == 'TRUE';
	// TODO: Assemble SmartThings into code variable.

	var smartAction = new Action
	smartAction.timer_type = "every"
	smartAction.timerhandler = "timer"+timer_variable_name;
	if(checkbox_min_checkbox){
		var time_variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('time_name'), Blockly.Variables.NAME_TYPE); //time name
		var arg = new Inputa();
		arg.type = "time";
		arg.name = "time"+time_variable_name
		arg.input = 'input \"'+arg.name+'\", \"'+arg.type +'\", title:\"'+arg.name+'\", required: false ' ;

		smartAction.arginput = [arg]
	    smartAction.time = arg
	}else{
    	var time_schdule = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
	    smartAction.time = time_schdule
	
	}
  return [smartAction];
};
	


Blockly.SmartThings['a_stop'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);

  var checkbox_all_check = block.getFieldValue('all_check') == 'TRUE';
  // TODO: Assemble SmartThings into code variable.
 
  // TODO: Change ORDER_NONE to the correct strength.
  var smartAction = new Action();
  
  if(checkbox_all_check)
  	smartAction.method = 'unschedule()';
  else
  	smartAction.method = 'unschedule(\"timer'+variable_name+'\")';

	return [smartAction];
};

Blockly.SmartThings['a_day'] = function(block) {
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

Blockly.SmartThings['a_week'] = function(block) {
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

Blockly.SmartThings['a_time'] = function(block) {
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

	return time;
};

