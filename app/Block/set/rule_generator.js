Blockly.SmartThings['eca'] = function(block) {
	var statements_event = Blockly.SmartThings.statementToCode(block, 'Event');
	var value_condition = Blockly.SmartThings.valueToCode(block, 'Condition', Blockly.SmartThings.ORDER_ATOMIC);
	var statements_action = Blockly.SmartThings.statementToCode(block, 'Action');
  // TODO: Assemble SmartThings into code variable.
		
	var rule = new ECA(statements_event, value_condition, statements_action);
	
	return rule;
};

Blockly.SmartThings['ea'] = function(block) {
  var statements_event = Blockly.SmartThings.statementToCode(block, 'Event');
  var statements_action = Blockly.SmartThings.statementToCode(block, 'Action');

  // TODO: Assemble SmartThings into code variable.
	console.log("ea^^");

	var c = new Condition()
	c.result = 'true'

	var rule = new ECA(statements_event, c,statements_action);
	
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

    this.input_e_make = new inpute(this.event);
    this.input_a_make = new Array();

	for(i in this.actionList){ // input for action generate
		if(this.actionList[i].devname){
			var a = new inputa(this.actionList[i]);
			this.input_a_make.push(a);
		}
		else if(this.actionList[i].method){
			var argument = this.actionList[i].args
			if(argument){
				for(index in argument){
					var a = new inputa(argument[index]);
					this.input_a_make.push(a);
				}
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

	if(this.device == "battery")
		this.subscribe = "subscribe("+this.name+', \"'+ this.device+'\", '+ handler_name+")";
	else
		this.subscribe = "subscribe("+this.name+', \"'+ this.device +'.'+this.attr+'\", '+ handler_name+")";
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


function Args() {
	this.capname;
	this.capbility;
}