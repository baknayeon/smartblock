Blockly.SmartThings['eca'] = function(block) {
	var value_event = Blockly.SmartThings.valueToCode(block, 'Event', Blockly.SmartThings.ORDER_ATOMIC);
	var value_condition = Blockly.SmartThings.valueToCode(block, 'Condition', Blockly.SmartThings.ORDER_ATOMIC);
	var value_action = Blockly.SmartThings.valueToCode(block, 'Action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into ECA node.
		
	var rule = new ECA(value_event, value_condition, value_action);
	
	return rule;
};

Blockly.SmartThings['ea'] = function(block) {
	var value_event = Blockly.SmartThings.valueToCode(block, 'Event', Blockly.SmartThings.ORDER_ATOMIC);
	var value_action = Blockly.SmartThings.valueToCode(block, 'Action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into EA node.

	var condition = new Condition()
	condition.result = 'true'

	var rule = new ECA(value_event, condition, value_action);
	return rule;
};

function Page(){
  this.name;
  this.option;
  this.section;
}

function Condition(){
	this.right;
	this.left;
	this.operator;	
	this.result;

	this.already;
}

function Already(){
	this.input;
	this.condition;
	
}



function Inputc(){
	this.device;
	this.devname;
	this.input;
	
	this.type;
	this.name;
}


function Attribute(){
	this.dev;
	this.attr_id;
	this.attr;
}
function number(){
	this.value;
}

function simpleECA(statements_event, value_condition, statements_action) {
	this.event = statements_event;
    this.condition = value_condition;
    this.actionList = statements_action;
}

function ECA(statements_event, value_condition, statements_action) {
	this.event = statements_event;
    this.condition = value_condition;
    this.actionList = statements_action;

	eca_num++;

    this.input_e_make = new Array(); // ;
    this.input_a_make = new Array();
    this.input_c_make = new Array();




	if(this.event.constructor == Grouping){
		var device_list = this.event.list
		for(i in device_list){
			var event_dev = device_list[i]
			this.input_e_make.push(new Inpute(event_dev))
		}
	}else{
		this.input_e_make.push(new Inpute(this.event))
	}



	if(this.condition.constructor == Grouping){
		this.input_c_make = this.condition.list
	}else{
		condition_input(this.condition, this.input_c_make);
	}




	for(var action of this.actionList){ // input for action generate
		
		if(action.constructor == Grouping){
			var device_list = action.list
			if(device_list){
				for(index in device_list){
					var a = new Inputa(device_list[index]);
					this.input_a_make.push(a);
				}
			}
		}else{
			if(action.devname){
				var a = new Inputa(action);
				this.input_a_make.push(a);
			}

			if(action.arginput){
				var a = new Inputa(action.arginput);
				this.input_a_make.push(a);
			}
			if(action.state){
				var a = new Inputa(action.valueinput);
				this.input_a_make.push(a);
			}

		}


	}

}  

function condition_input(condition, array){
	
	if(condition.result){ //true, false, !p
		if(condition.result != 'true' && condition.result != 'false')
			condition_input(condition, array)
			
	}else if(condition.already){
		var a = condition.already
		array.push(a.input);
	
	}else if(condition.constructor == Grouping){
		for(var inputc of condition.list){
			var input = inputc.input
			array.push(input);
		}
	}else{ // p&&p, p||p, f <= fn, m <= n, fϵd  
		var operator = condition.operator
		var right = condition.right;
		var left = condition.left;

		if(operator == '&&' || operator == '||'){
			condition_input(right, array)
			condition_input(left, array)
		}
		else if(operator == '==' || operator == '<'|| operator == '>' || operator == '!=' || operator == '≤'|| operator == '≥'){
			//smartDevice
			
			if(right.constructor == Inputc) // f =< f
				array.push(right);
			
			if(left.constructor == Inputc) // f =< f
				array.push(left);
		
		}
	}
}
function Inpute(e) {

	if(!e.time){
	
		this.name = e.devname;
		this.device = e.device;
		this.attr = e.attr;
		
		var handler_name = "rule"+eca_num+"_handler";
		this.handler = handler_name + "(evt)";

		if(e.event_handler){
			if(e.event_handler.to != '.')
				this.attr = e.event_handler.to
			else 
				this.attr = ""

		}

		if(attrMap.onlyInENUM(this.device)){
			this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
			var attr_obj = attrMap.getENUM(this.device)
			this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id +"."+this.attr+'\", '+ handler_name+")";
		}else if(attrMap.onlyInNUMBER(this.device)){
			this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
			var attr_obj = attrMap.getNUMBER(this.device)
			this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id+'\", '+ handler_name+")";
		}else if(this.device == "location" && this.attr != "."){
			this.subscribe = "subscribe("+this.device+', \"'+ this.attr+'\", '+ handler_name+")";
		}else if(this.device == "location" && this.attr == "."){
			this.subscribe = "subscribe("+this.device+', '+ handler_name+")";
		}else if(this.device == "app"){
			this.subscribe = "subscribe("+this.device+', '+ handler_name+")";
		}
	}else{
		var handler_name = "rule"+eca_num+"_handler";
		this.handler = handler_name + "(evt)";

		if(e.devname){
			this.input = 'input \"'+e.devname+'\", \"'+e.device +'\", title:\"'+e.devname+'\"' ;
			this.subscribe = 'schedule('+e.time+', '+ handler_name+")";
		}else{
			this.subscribe = 'schedule(\"'+e.time+'\", '+ handler_name+")";
			
		}
	}
}

function Inputa(a) {
	this.devname = a.devname;
	this.device = a.device;
	this.input = a.input;
}

function Grouping() {
	this.type;
	this.p;
	this.list = new Array();
}

function Event() {
	this.devname;
    this.attr;
	this.device;
	this.option;
	this.event_handler = false;
	this.from;
	this.to;

	this.time;
	
}

function Action() {
	this.devname;
	this.device;

    this.command;
    this.command_part;

	this.timer;
	this.timerhandler;

	this.method;
	this.arginput;

	this.state
	this.state_command
	this.valueinput

}

function Args() {
	this.devname;
	this.device;
}


function state() {
	this.devname;
	this.device;
}
