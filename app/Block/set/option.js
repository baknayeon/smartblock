Blockly.Blocks['option_required'] = {
  init: function() {
    this.appendValueInput("required")
        .setCheck("Option_input")
        .appendField("required")
	this.setInputsInline(false);
    this.setOutput(true, "Option_input");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.Blocks['option_multiple'] = {
  init: function() {
    this.appendValueInput("multiple")
        .setCheck("Option_input")
        .appendField("multiple");
	this.setInputsInline(false);
    this.setOutput(true, "Option_input");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.Blocks['option_title'] = {
  init: function() {
    this.appendValueInput("title")
        .setCheck("Option_input")
        .appendField("title")
        .appendField(new Blockly.FieldTextInput(""), "title");
	 this.setInputsInline(false);
    this.setOutput(true, ["Option_input", "Option"]);
   this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.Blocks['option_name'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("Option")
        .appendField("name")
        .appendField(new Blockly.FieldTextInput(""), "name");
    this.setInputsInline(false);
    this.setOutput(true, "Option_input");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};



Blockly.Blocks['option_nextpage'] = {
  init: function() {
    this.appendValueInput("nextPage")
        .setCheck("Option")
        .appendField("nextPage")
        .appendField(new Blockly.FieldTextInput(""), "nextPage");
    this.setInputsInline(false);
    this.setOutput(true, "Option");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.Blocks['option_install'] = {
  init: function() {
    this.appendValueInput("install")
        .setCheck("Option")
        .appendField("install")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "true");
    this.setInputsInline(false);
    this.setOutput(true, "Option");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.Blocks['option_uninstall'] = {
  init: function() {
    this.appendValueInput("uninstall")
        .setCheck("Option")
        .appendField("uninstall")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "true");
    this.setInputsInline(false);
    this.setOutput(true, "Option");
    this.setColour(Block_colour_option);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
	}
};

Blockly.SmartThings['option_required'] = function(block) {
  var value_required = Blockly.SmartThings.valueToCode(block, 'required', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_required)
    var code = 'required : \"true\", ' +value_multiple;
  else
    var code = 'required : \"true\"';
  // TODO: Change ORDER_NONE to the correct strength.
   return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_multiple'] = function(block) {
  var value_multiple = Blockly.SmartThings.valueToCode(block, 'multiple', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_multiple)
    var code = 'multiple : \"true\", ' +value_multiple;
  else 
    var code = 'multiple : \"true\"';
  // TODO: Change ORDER_NONE to the correct strength.
   return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_title'] = function(block) {
  var text_title = block.getFieldValue('title');
  var value_title = Blockly.SmartThings.valueToCode(block, 'title', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_title)
    var code = 'title : \"'+ text_title+'\", ' + value_title;
  else
     var code = 'title : \"'+ text_title+'\"';
  // TODO: Change ORDER_NONE to the correct strength.
 return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_name'] = function(block) {
  var text_name = block.getFieldValue('name');
  var value_name = Blockly.SmartThings.valueToCode(block, 'name', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_name)
    var code = 'name : \"'+ text_name+'\", ' + value_name;
  else
     var code = 'name : \"'+ text_name+'\"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};


Blockly.SmartThings['option_title_pre'] = function(block) {
  var text_title = block.getFieldValue('title');
  var value_title = Blockly.SmartThings.valueToCode(block, 'title', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  
  if(value_title)
    var code = 'title : \"'+ text_title+'\", ' + value_title;
  else
     var code = 'title : \"'+ text_title+'\"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_nextpage'] = function(block) {
  var text_nextpage = block.getFieldValue('nextPage');
  var value_nextpage = Blockly.SmartThings.valueToCode(block, 'nextPage', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_nextpage)
	  var code = 'nextPage : \"'+ text_nextpage+'\", ' + value_nextpage;
  else
     var code = 'nextPage : \"'+ text_nextpage+'\"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_install'] = function(block) {
  var checkbox_true = block.getFieldValue('true') == 'TRUE';
  var value_install = Blockly.SmartThings.valueToCode(block, 'install', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_install)
	  var code = 'install : '+ checkbox_true+', ' + value_install;
  else
     var code = 'install : '+ checkbox_true+'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['option_uninstall'] = function(block) {
  var checkbox_true = block.getFieldValue('true') == 'TRUE';
  var value_uninstall = Blockly.SmartThings.valueToCode(block, 'uninstall', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  if(value_uninstall)
	  var code = 'uninstall : '+ checkbox_true+', ' + value_uninstall;
  else
     var code = 'uninstall : '+ checkbox_true+'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};
