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
		 this.input_c_make = condition_input(this.condition);
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

			if(action.method){
				for(var input of action.arginput){
					if(input.constructor == Inputa){
						var a = new Inputa(input);
						this.input_a_make.push(a);
					}
				}
			}
			if(action.state){
				for(var input of action.valueinput){
					var a = new Inputa(input);
					this.input_a_make.push(a);
				}
			}

		}


	}

}  

function condition_input(condition){
	var array = new Array()
	if(condition.operator == "!"){ //!p
		array = condition_input(condition.right)
			
	}else if(condition.operator == "is_null"){ //!p
		array.push(condition.result);
			
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
			var array_right = condition_input(right)
			var array_left = condition_input(left)
			array = array.concat(array_right)
			array = array.concat(array_left)
		}
		else if(operator == '==' || operator == '<'|| operator == '>' || operator == '!=' || operator == '>='|| operator == '=<'){
			//smartDevice
			
			if(right.constructor == Inputc) // f =< f
				array.push(right);
			else if(right.constructor == API && right.inputs) 
				array = array.concat(right.inputs);
			
			if(left.constructor == Inputc) // f =< f
				array.push(left);
			else if(left.constructor == API && left.inputs) 
				array = array.concat(left.inputs);
			
		
		}
	}
	return array
}

function Inpute(e) {

	if(e.device){// event from dev

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
		}

	}else if(e.api){ //locate, app, init method

		this.api = e.api;
		this.attr = e.attr;
			
	
		if(this.api == "installed"){
			
			this.handler = e.initmethod + "()";
		}else{
		
			var handler_name = "rule"+eca_num+"_handler";
			this.handler = handler_name + "(evt)";
			if(e.event_handler){
				if(e.event_handler.to != '.')
					this.attr = e.event_handler.to
				else 
					this.attr = ""

			}

			if(this.api == "location" && this.attr != "."){
				this.subscribe = "subscribe("+this.api+', \"'+ this.attr+'\", '+ handler_name+")";
			}else if(this.api == "location" && this.attr == "."){
				this.subscribe = "subscribe("+this.api+', '+ handler_name+")";
			}else if(this.api == "app"){
				this.subscribe = "subscribe("+this.api+', '+ handler_name+")";
			} 

		}
	}else if(e.timerhandler){ //timer

	}else if(e.time){ //schedule
		var handler_name = "rule"+eca_num+"_handler";
		this.handler = handler_name + "(evt)";

		if(e.timevar){
			this.input = 'input \"'+e.timevar+'\", \"time\", title:\"'+e.timevar+'\"' ;
			this.subscribe = 'schedule('+e.time+', '+ handler_name+")";
		}else{
			this.subscribe = 'schedule(\"'+e.time+'\", '+ handler_name+")";
			
		}
	}
}

function Event() {
	this.device;
	this.devname;
    this.attr;
	this.event_handler = false;

	this.from;
	this.to;

	this.api;
	this.initmethod;

	this.time;
	this.timerhandler;
	this.timevar;
	
}

function Condition(){
	this.right;
	this.left;
	this.operator;	
	this.result;
	
	this.functionhandler;
}

function Action() {
	this.devname;
	this.device;

    this.command;
    this.command_part;

	this.time;
	this.timerhandler;

	this.method;
	this.arginput = new Array;;

	this.functionhandler;

	this.state
	this.state_command
	this.valueinput = new Array;

}


function Grouping() {
	this.type;
	this.p;
	this.list = new Array();
}


function Inputa(a) {
	this.devname
	this.device 
	this.input

	if(a){
		this.devname = a.devname
		this.device  = a.device
		this.input = a.input
	}
}