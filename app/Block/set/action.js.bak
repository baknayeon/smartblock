
var Block_colour_action = "#"+"61abcb"


function action_block(devname){
	Blockly.SmartThings['a_'+devname] = function(block) {
		var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
		var dropdown_commands = block.getFieldValue('Command');
		var value = Blockly.SmartThings.valueToCode(block, devname, Blockly.SmartThings.ORDER_ATOMIC);
		// TODO: Assemble SmartThings into code variable.
		
		var smartAction = new Action();
		smartAction.devname = variable_name;
		smartAction.command= smartAction.devname+'.'+dropdown_commands+'()';
		smartAction.device = devname;

		return smartAction;
	};
	
	Blockly.Blocks['a_'+devname] = {
		init: function() {
			this.appendValueInput(devname)
				.setCheck("Action")
				.appendField(devname, "device")
				.appendField(new Blockly.FieldVariable(devname+action_num, true, devname), "name");
			 this.setInputsInline(false);
			var block = this.getInput(devname);
			if(commMap.isSingleCommad(devname)){
				block.appendField(new Blockly.FieldDropdown(commMap.getCommad_vaules(devname)), "Command");
			}else if(commMap.isSingleMethod(devname)){
				setMethodField(block, devname);
			}else if(commMap.isMultiMethod(devname)){
				block.appendField(new Blockly.FieldDropdown(commMap.getMultiType(devname)), "Command_id");
				setMethodField(block, devname);
			}

			this.setOutput(true, "Action");
			this.setColour(Block_colour_action);
			this.setTooltip("");
			this.setHelpUrl("");
		},
		onchange: function(event) {

			if(event.element == "field" && event.name ==="Command_id"){
				var device = this.getField("device").text_;
				var id = this.getField("Command_id").text_;
				var block = this.getInput(device);
				block.removeField("Command");
				var list = commMap.getMethod_vaulesById(device, id);
				if(list.length != 0)
					block.appendField(new Blockly.FieldDropdown(list), "Command");
				else
					block.appendField(new Blockly.FieldTextInput(""), "Command");
									
			}

		}
	};
}

function setMethodField(block, device){
		
	var method = commMap.getMethod(device);
	
	if(goog.isArray(method))
		method = method[0]

	var types = method.type;
	var values = method.value;
	
	var type = types[0];
	if(values)
		var value = values[0];
		
	if(type.toLowerCase() == "enum"){
		var list = new Array();
		for(i in value)
			list.push([value[i],value[i]]);
		block.appendField(new Blockly.FieldDropdown(list), "Command");
	}else if(type.toLowerCase() == "number"){
		block.appendField(new Blockly.FieldTextInput(""), "Command");
	}
	

}

Blockly.Blocks['variable'] = {
  init: function() {
    this.appendDummyInput("type")
        .appendField(new Blockly.FieldDropdown([["number","number"], ["phone","phone"], ["password","password"], ["time","time"], ["text","text"]]), "type");
	this.setInputsInline(true);
	this.setOutput(true, "number");
    this.setColour(Block_colour_action);
	this.setTooltip("");
	this.setHelpUrl("");
  }, onchange: function(event) {
  	if(event.element == "field" && event.blockId == this.id){
  		this.setOutput(true, event.newValue);
  	}
  }
};
Blockly.Blocks['sendpush'] = {
  init: function() {
    this.appendValueInput("action")
        .setCheck("Action")
        .appendField("sendPush");
    this.appendValueInput("message")
        .setCheck("text")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.newParentId == this.id)
  		if(event.newInputName == "message")
  			this.getInput("message").removeField("text");
  		
  	if(event.oldParentId == this.id)
  		if(event.oldInputName == "message")
  			this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
  }
};

Blockly.Blocks['sendsms'] = {
  init: function() {
    this.appendValueInput("action")
		.setCheck("Action")
        .appendField("sendSms");
    this.appendValueInput("message")
		.setCheck("text")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.appendValueInput("phone")
		.setCheck("phone")
        .appendField("phone")
        .appendField(new Blockly.FieldTextInput("+82010"), "phone");
    this.setOutput(true,  "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.newParentId == this.id)
  		if(event.newInputName == "message")
  			this.getInput("message").removeField("text");
  		else if(event.newInputName == "phone")
  			this.getInput("phone").removeField("phone");
  		
  	if(event.oldParentId == this.id)
  		if(event.oldInputName == "message")
  			this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
  		else if(event.oldInputName == "phone")
  			this.getInput("phone").appendField(new Blockly.FieldTextInput("+82010"), "phone");
  }
};

Blockly.Blocks['sendnotification'] = {
  init: function() {
    this.appendValueInput("action")
		.setCheck("Action")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("sendNotification");
    this.appendValueInput("message")
        .setCheck("text")
        .appendField("message")
        .appendField(new Blockly.FieldTextInput(""), "text");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }, onchange: function(event){
  	if(event.newParentId == this.id)
  		if(event.newInputName == "message")
  			this.getInput("message").removeField("text");
  		
  	if(event.oldParentId == this.id)
  		if(event.oldInputName == "message")
  			this.getInput("message").appendField(new Blockly.FieldTextInput(""), "text");
  }
};

Blockly.SmartThings['sendpush'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	var nextAction = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  console.log("sendPush");

  if(text_text && !value_message){
	  var smartAction = new Action();
	  smartAction.method = 'sendPush(\"'+text_text+'\")';
  }else if(!text_text && value_message){
	  var smartAction = new Action();
	  smartAction.method = 'sendPush('+value_message.capname+')';
	  smartAction.args.push(value_message)
  }
  return smartAction;
};

Blockly.SmartThings['sendsms'] = function(block) {
	var text_phone = block.getFieldValue('phone');
	var value_phone = Blockly.SmartThings.valueToCode(block, 'phone', Blockly.SmartThings.ORDER_ATOMIC);
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	var nextAction = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  console.log("sendSms");

  var smartAction = new Action();
  smartAction.method = 'sendSms(\"'+ text_phone + '\", \"'+text_text +'\")';

  return smartAction;
};

Blockly.SmartThings['sendnotification'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	var nextAction = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
   var smartAction = new Action();
  smartAction.method = 'sendNotification(\"'+text_text+'\")';

  return smartAction;
};

Blockly.SmartThings['variable'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble SmartThings into code variable.

  var args = new Args();
  args.capbility = dropdown_type;
  args.capname = dropdown_type+variable_num++;

  // TODO: Change ORDER_NONE to the correct strength.
  return args;
};