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


function inputc(){
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
    this.actionList = statements_action;

	eca_num++;

    this.input_e_make = new Array(); // ;
    this.input_a_make = new Array();
    this.input_c_make = new Array();

	if(this.event.constructor != Grouping){
		this.input_e_make.push(new inpute(this.event))
	}else {
		var device_list = this.event.list
		for(i in device_list){
			var event_dev = device_list[i]
			this.input_e_make.push(new inpute(event_dev))
		}
	}

	if(statements_action.constructor == Grouping){
		statements_action = statements_action.list
	}


	for(i in statements_action){ // input for action generate
		if(statements_action[i].devname){
			var a = new inputa(statements_action[i]);
			this.input_a_make.push(a);
		}
		else if(statements_action[i].method){
			var argument = statements_action[i].args
			if(argument){
				for(index in argument){
					var a = new inputa(argument[index]);
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
				var c = new inputa(coditionList[i]);
				this.input_c_make.push(c);
			}
		}
	}
}  

function inpute(e) {
	this.name = e.devname;
	this.device = e.device;
	this.attr = e.attr;
	this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
	
	var handler_name = "rule"+eca_num+"_handler";
	this.handler = handler_name + "(evt)";

	if(e.event_handler){
		this.attr = e.event_handler.to
	}

	if(attrMap.isOnlyENUM(this.device)){
		var attr_obj = attrMap.getENUM(this.device)
		this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id +'.'+this.attr+'\", '+ handler_name+")";

	}else if(attrMap.isOnlyNUMBER(this.device)){
		var attr_obj = attrMap.getNUMBER(this.device)
		this.subscribe = "subscribe("+this.name+', \"'+ attr_obj.id+'\", '+ handler_name+")";
	}
}

function inputa(a) {
	if(a.devname && a.device){
		this.name = a.devname;
		this.device = a.device;
		this.input = 'input \"'+this.name+'\", \"capability.'+this.device +'\", title:\"'+this.name+'\"' ;
	}else if(a.capname && a.capbility){
		this.name = a.capname;
		this.device = a.capbility;
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
}

function Action() {
	this.devname;
    this.command;
	this.device;
	this.option;

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
