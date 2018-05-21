Blockly.SmartThings['eca'] = function(block) {
	var value_event = Blockly.SmartThings.valueToCode(block, 'Event', Blockly.SmartThings.ORDER_ATOMIC);
	var value_condition = Blockly.SmartThings.valueToCode(block, 'Condition', Blockly.SmartThings.ORDER_ATOMIC);
	var value_action = Blockly.SmartThings.valueToCode(block, 'Action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
		
	var rule = new ECA(value_event, value_condition, value_action);
	
	return rule;
};

Blockly.SmartThings['ea'] = function(block) {
	var value_event = Blockly.SmartThings.valueToCode(block, 'Event', Blockly.SmartThings.ORDER_ATOMIC);
	var value_action = Blockly.SmartThings.valueToCode(block, 'Action', Blockly.SmartThings.ORDER_ATOMIC);

  // TODO: Assemble SmartThings into code variable.

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
}


function Inputc(){
	this.device;
	this.devname;
	this.input;
}

function Device_attr(){
	this.dev;
	this.attr_id;
	this.attr;
}

function ECA(statements_event, value_condition, statements_action) {
	this.event = statements_event;
    this.condition = value_condition;
    this.actionList = statements_action.reverse();

	eca_num++;

    this.input_e_make = new Array(); // ;
    this.input_a_make = new Array();
    this.input_c_make = new Array();

	if(this.event.constructor != Grouping){
		this.input_e_make.push(new Inpute(this.event))
	}
	else{
		var device_list = this.event.list
		for(i in device_list){
			var event_dev = device_list[i]
			this.input_e_make.push(new Inpute(event_dev))
		}
	}

	if(statements_action.constructor == Grouping){
		statements_action = statements_action.list
	}


	for(i in statements_action){ // input for action generate
		if(statements_action[i].devname){
			var a = new Inputa(statements_action[i]);
			this.input_a_make.push(a);
		}
		else if(statements_action[i].method){
			var argument = statements_action[i].args
			if(argument){
				for(index in argument){
					var a = new Inputa(argument[index]);
					this.input_a_make.push(a);
				}
			}
		}else if(statements_action[i].constructor == Grouping){
			var device_list = statements_action[i].list
			if(device_list){
				for(index in device_list){
					var a = new Inputa(device_list[index]);
					this.input_a_make.push(a);
				}
			}
		}
	}

	var coditionList = new Array();

	
	if(value_condition.constructor == Grouping){
		this.input_c_make = value_condition.list
	}else{
		condition_input(value_condition, coditionList);

		for(i in coditionList){ // input for action generate
			if(coditionList[i].devname){
				var c = new Inputa(coditionList[i]);
				this.input_c_make.push(c);
			}
		}
	}
}  

function Inpute(e) {
	if(!e.time){
	
		this.name = e.devname;
		this.device = e.device;
		this.attr = e.attr;
		this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
		
		var handler_name = "rule"+eca_num+"_handler";
		this.handler = handler_name + "(evt)";

		if(e.event_handler){
			if(e.event_handler.to != '.')
				this.attr = e.event_handler.to
			else 
				this.attr = ""

		}

		if(attrMap.isOnlyENUM(this.device)){
			var attr_obj = attrMap.getENUM(this.device)
			this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id +"."+this.attr+'\", '+ handler_name+")";

		}else if(attrMap.isOnlyNUMBER(this.device)){
			var attr_obj = attrMap.getNUMBER(this.device)
			this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id+'\", '+ handler_name+")";
		}
	}else{
		var handler_name = "rule"+eca_num+"_handler";
		this.handler = handler_name + "(evt)";
		this.subscribe = 'schedule('+e.time+', '+ handler_name+")";

		if(e.devname)
			this.input = 'input \"'+e.devname+'\", \"'+e.device +'\", title:\"'+e.devname+'\"' ;
	}
}

function Inputa(a) {
	if(a.devname && a.device){
		this.name = a.devname;
		this.device = a.device;
		this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
	}else if(a.name && a.function){
		this.name = a.name;
		this.device = a.function;
		this.input = 'input \"'+this.name+'\", \"'+this.device +'\", title:\"'+this.name+'\"' ;
	}

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
    this.command;
	this.device;
	this.option;

	this.timer;
	this.timerhandler;

	this.method;
	this.args = new Array();
}


function Condition(name, device) {
	this.devname = name;
 	this.device = device;
}


function Args() {
	this.name;
	this.function;
}
