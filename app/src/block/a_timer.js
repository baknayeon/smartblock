Blockly.Blocks['a_minutes'] = {
  init: function() {
    this.appendValueInput("next")
         .setCheck(["after", "every"])
        .appendField(new Blockly.FieldTextInput("0"), "minute")
        .appendField("min");
    this.setInputsInline(false);
     this.setOutput(true, ["after", "every"]);
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_hours'] = {
  init: function() {
    this.appendValueInput("next")
         .setCheck(["after", "every"])
        .appendField(new Blockly.FieldTextInput("0"), "hour")
        .appendField("hrs");
    this.setInputsInline(false);
      this.setOutput(true, ["after", "every"]);
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_day'] = {
  init: function() {
	var d = new Date();
	var day = d.getDate()
    this.appendValueInput("next")
        .setCheck("every")
        .appendField(new Blockly.FieldTextInput(day), "day")
        .appendField("th");
    this.setInputsInline(false);
    this.setOutput(true, "every");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_month'] = {
  init: function() {
	var d = new Date();
	var month = d.getMonth()
	var months = [["Jan","Jan"], ["Feb","Feb"], ["Mar","Mar"], ["Apr","Apr"],
					["May","May"], ["Jun","Jun"], ["Jul","Jul"], ["Aug","Aug"],
					["Sept","Sept"], ["Oct","Oct"], ["Nov","Nov"], ["Dec","Dec"]]
    this.appendValueInput("next")
        .setCheck("every")
        .appendField(new Blockly.FieldDropdown(months, months[month][0]), "month")
        .appendField(".");
    this.setInputsInline(false);
    this.setOutput(true, "every");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_week'] = {
  init: function() {
    this.appendValueInput("next")
        .setCheck("every")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week1")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["Mon","Mon"], ["Tue","Tue"], ["Wed","Wed"], ["Thu","Thu"], ["Fri","Fri"], ["Sat","Sat"], ["Sun","Sun"]]), "week2")
        ;//.appendField("week");
    this.setInputsInline(false);
    this.setOutput(true, "every");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_time'] = {
  init: function() {
	var d = new Date();
	var minute = d.getMinutes()
	var hour = d.getHours()
    this.appendValueInput("time")
        .setCheck("every")
        .appendField("at")
        .appendField(new Blockly.FieldTextInput(hour), "hour")
        .appendField(":","c")
        .appendField(new Blockly.FieldTextInput(minute), "minute")
		.appendField(new Blockly.FieldDropdown([["AM","AM"], ["PM","PM"]]), "apm");
    this.setOutput(true, "every");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['a_minutes'] = function(block) {
  var text_time = block.getFieldValue('minute');
  var value_ = Blockly.SmartThings.valueToCode(block, 'next', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

  var cron = ""

  if(value_ != ""){
	cron = value_.replace("minutes", text_time)
  }else{
	if(text_time)
		cron = "0 "+text_time+" hours day month week"
  }

  return cron;
};

Blockly.SmartThings['a_hours'] = function(block) {
  var text_time = block.getFieldValue('hour');
  var value_ = Blockly.SmartThings.valueToCode(block, 'next', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

  var cron = ""

  if(value_ != ""){
	cron = value_.replace("hours", text_time)
  }else{
	if(text_time)
		cron = "0 minutes "+text_time+" day month week"
  }

  return cron;
};

Blockly.SmartThings['a_day'] = function(block) {
  var text_time = block.getFieldValue('day');
  var value_ = Blockly.SmartThings.valueToCode(block, 'next', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
 
  var cron = ""

  if(value_ != ""){
	cron = value_.replace("day", text_time)
  }else{
	if(text_time)
		cron = "0 minutes hours "+text_time+" month week"
  }

  return cron;
};
Blockly.SmartThings['a_month'] = function(block) {
  var dropdown_month = block.getFieldValue('month');
  var value_ = Blockly.SmartThings.valueToCode(block, 'next', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var months = ["Jan", "Feb","Mar","Apr", "May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  var text_month = months.indexOf(dropdown_month)+1
  var cron = ""

  if(value_ != ""){
	cron = value_.replace("month", text_month)
  }else{
	
	if(text_month)
		cron = "0 minutes hours day "+ text_month+" week"
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
		cron = "0 minutes hours day month "+ dropdown_week1.toUpperCase()
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
 	var cron =""
	if(value_month_day_year != ""){
		cron = value_month_day_year	
	}else{
		cron = "0 minutes hours day month week"
	}
	
	if(dropdown_apm == "PM")
		text_hour = (parseInt(text_hour)+12).toString()

	cron = cron.replace("minutes", text_minute)
	cron = cron.replace("hours", text_hour)

	return cron;
};

Blockly.Blocks['timer'] = {
  init: function() {
	var time_num = deviceCount.get("timer")
    this.appendValueInput("actions")
		.appendField("start")
		.appendField(new Blockly.FieldVariable("timer"+time_num, null, null, "timer"), "NAME")
		.setCheck("Action");
	  this.appendValueInput("time")
		.appendField(new Blockly.FieldDropdown([["after","after"], ["every","every"]]), "kind")
		 .setAlign(Blockly.ALIGN_RIGHT)
		.setCheck(["after", "option"]);
	this.appendStatementInput("groupingActions")
		.setCheck("groupingActions");
	this.setInputsInline(false);
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  onchange: function(event) {
	if(event.element == "field" && event.blockId == this.id){
		if(event.newValue == "after"){
			this.getInput("time").setCheck("after");
		}else if(event.newValue == "every"){
			this.getInput("time").setCheck("every");
		}
	}
  
  }
};

Blockly.SmartThings['timer'] = function(block) {
  
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE); //timer name
  var value_kind_value = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  var dropdown_timer = block.getFieldValue('kind'); //after of every
  var statements_groupingActions = Blockly.SmartThings.statementToCode(block, 'groupingActions');
  // TODO: Assemble SmartThings into code variable.
  
  if(dropdown_timer == "after"){
  	var time 

	if(value_kind_value.constructor == Args){ //after time input time
		var smartAction = new Action
		smartAction.name = value_kind_value.name
		smartAction.device = "number";
		statements_groupingActions.push(smartAction)
		time = (value_kind_value.name+"*60");
	}else{
	
		time = value_kind_value
		time = time.replace("minutes", "0")
		time = time.replace("hours", "0")
		var time_string = time.split(' ');
		var minute = parseInt(time_string[1]);
		var hour = parseInt(time_string[2]);
		time = minute*60 + hour*60*60
	}

	for(var action of statements_groupingActions){
		if(!action.timer)	
			if(!action.timerhandler){
				action.timer = time
				action.timerhandler = variable_name
			}
	}

	/*if(dropdown_unit == "hour"){
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
	}*/

  }else if(dropdown_timer == "every"){
	var time = value_kind_value
	time = time.replace("minutes", "*")
	time = time.replace("hours", "*")
	time = time.replace("day", "*")
	time = time.replace("month", "*")
	time = time.replace("week", "?")
	
	var time_string = time.split(' ');
	if(time_string[1] != "*")
		time_string[1] = "*/"+time_string[1]
	if(time_string[2] != "*")
		time_string[2] = "*/"+time_string[2]
  	for(var action of statements_groupingActions){
		if(!action.timer)	
			if(!action.timerhandler){
				action.timer = time_string[0] +" "+ time_string[1] +" "+ time_string[2] +" "+ time_string[3] +" "+ time_string[4] +" "+ time_string[5]
				action.timerhandler = variable_name
			}
	}
  }

  return statements_groupingActions;
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

Blockly.SmartThings['timer_actions'] = function(block) {
	
	var i = 0;
	var length = block.inputList.length
	var list = new Array();
	
	while(i < length){
	 	var device = Blockly.SmartThings.valueToCode(block, 'ADD'+i, Blockly.SmartThings.ORDER_ATOMIC);
	 	list = list.concat(device)
		i++;
	}

  return list;
};
Blockly.Blocks["timer_actions"] = {
	  /**
	   * Block for creating a list with any number of elements of any type.
	   * @this Blockly.Block
	   */
	  init: function() { 
		 this.appendValueInput("ADD0")
			.setCheck("Action");
		this.setPreviousStatement(true, "groupingActions");
		this.setColour(Block_colour_action);
		this.itemCount_ = 1;
		this.updateShape_();
		this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
		this.setTooltip("");
		this.setHelpUrl("");
	  },
	  /**
	   * Create XML to represent list inputs.
	   * @return {!Element} XML storage element.
	   * @this Blockly.Block
	   */
	  mutationToDom: function() {
		var container = document.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	  },
	  /**
	   * Parse XML to restore the list inputs.
	   * @param {!Element} xmlElement XML storage element.
	   * @this Blockly.Block
	   */
	  domToMutation: function(xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
		this.updateShape_();
	  },
	  /**
	   * Populate the mutator's dialog with this block's components.
	   * @param {!Blockly.Workspace} workspace Mutator's workspace.
	   * @return {!Blockly.Block} Root block in mutator.
	   * @this Blockly.Block
	   */
	  decompose: function(workspace) {
	  	color = this.colour_
		var containerBlock = workspace.newBlock('lists_create_with_container');
		containerBlock.initSvg();
		var connection = containerBlock.getInput('STACK').connection;
		for (var i = 0; i < this.itemCount_; i++) {
		  var itemBlock = workspace.newBlock('lists_create_with_item');
		  itemBlock.initSvg();
		  connection.connect(itemBlock.previousConnection);
		  connection = itemBlock.nextConnection;
		}
		return containerBlock;
	  },
	  /**
	   * Reconfigure this block based on the mutator dialog's components.
	   * @param {!Blockly.Block} containerBlock Root block in mutator.
	   * @this Blockly.Block
	   */
	  compose: function(containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		// Count number of inputs.
		
		var connections = [];
		while (itemBlock) {
		  connections.push(itemBlock.valueConnection_);
		  itemBlock = itemBlock.nextConnection &&
			  itemBlock.nextConnection.targetBlock();
		}
		// Disconnect any children that don't belong.
		for (var i = 0; i < this.itemCount_; i++) {
		  var connection = this.getInput('ADD' + i).connection.targetConnection;
		  if (connection && connections.indexOf(connection) == -1) {
			connection.disconnect();
		  }
		}
		this.itemCount_ = connections.length;
		this.updateShape_();
		// Reconnect any child blocks.
		for (var i = 0; i < this.itemCount_; i++) {
		  Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
		}
	  },
	  /**
	   * Store pointers to any connected child blocks.
	   * @param {!Blockly.Block} containerBlock Root block in mutator.
	   * @this Blockly.Block
	   */
	  saveConnections: function(containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (itemBlock) {
		  var input = this.getInput('ADD' + i);
		  itemBlock.valueConnection_ = input && input.connection.targetConnection;
		  i++;
		  itemBlock = itemBlock.nextConnection &&
			  itemBlock.nextConnection.targetBlock();
		}
	  },
	  /**
	   * Modify this block to have the correct number of inputs.
	   * @private
	   * @this Blockly.Block
	   */
	  updateShape_: function() {
		if (this.itemCount_ && this.getInput('EMPTY')) {
		  this.removeInput('EMPTY');
		} else if (!this.itemCount_ && !this.getInput('EMPTY')) {
				 this.appendDummyInput('EMPTY');
		}
		// Add new inputs.
		for (var i = 1; i < this.itemCount_; i++) {
		  if (!this.getInput('ADD' + i)) {
			var input = this.appendValueInput('ADD' + i);
			input.setCheck("Action");

		  }
		}
		// Remove deleted inputs.
		while (this.getInput('ADD' + i)) {
		  this.removeInput('ADD' + i);
		  i++;
		}
	  }
	};