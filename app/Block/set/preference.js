function pre_block(devname, colour){
	Blockly.SmartThings['input '+devname] = function(block) {
	var text_name = block.getFieldValue('name');
	var value_name = Blockly.SmartThings.valueToCode(block, 'NAME', Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.
	  var input = ""; 
	  
	  for(i in ecaList_g){
	  	if(input ==""){
	  		var input_e = ecaList_g[i].input_e_make;
			var input_a = ecaList_g[i].input_a_make;

			if(text_name === input_e.name){
				if(value_name)
					input += "\n\t\t\t"+input_e.input+", "+value_name;
				else
					input += "\n\t\t\t"+input_e.input;
				break
			}

			for(j in input_a){
				if(text_name === input_a[j].name){
					if(value_name)
						input += "\n\t\t\t"+input_a[j].input+", "+value_name;
					else
						input += "\n\t\t\t"+input_a[j].input;
				}

			 }
		  }
		
	  }
	  return input;
	};

	Blockly.Blocks['input '+devname] = {
	  init: function() {
		this.appendValueInput("NAME")
			.setCheck("Option_input")
			.appendField("input")
			.appendField(new Blockly.FieldLabel(devname, "name"), "name");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(colour);
	 this.setTooltip("");
	 this.setHelpUrl("");
	  }
	};
}

Blockly.Blocks['page'] = {
  init: function() {
    this.appendValueInput("Option")
        .setCheck("Option")
        .appendField("page");
    this.appendDummyInput()
        .appendField("name")
        .appendField(new Blockly.FieldTextInput(""), "name");
    this.appendStatementInput("section")
        .setCheck("Section");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "Page");
    this.setNextStatement(true, "Page");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['section'] = {
  init: function() {
    this.appendValueInput("option")
        .setCheck("Option")
        .appendField("section");
    this.appendStatementInput("input")
        .setCheck("Input");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "Section");
    this.setNextStatement(true, "Section");
    this.setColour(225);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dynamicpage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dynamicPage")
        .appendField(new Blockly.FieldTextInput(""), "name")
        .appendField("nextPage")
        .appendField(new Blockly.FieldTextInput(""), "nextPage");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "dynamicPage");
    this.setNextStatement(true, "dynamicPage");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.SmartThings['page'] = function(block) {
  var value_option = Blockly.SmartThings.valueToCode(block, 'Option', Blockly.SmartThings.ORDER_ATOMIC);
  var text_name = block.getFieldValue('name');
  //var text_title = block.getFieldValue('title');
  var statements_section = Blockly.SmartThings.statementToCode(block, 'section');
  // TODO: Assemble SmartThings into code variable.
  
  var page = new Page();
  page.name = text_name;
  page.option = value_option;
  page.section = statements_section;

  return page;
};

Blockly.SmartThings['section'] = function(block) {
  var value_option = Blockly.SmartThings.valueToCode(block, 'option', Blockly.SmartThings.ORDER_ATOMIC);
  var statements_input = Blockly.SmartThings.statementToCode(block, 'input');
  // TODO: Assemble SmartThings into code variable.

  var code = '\n\t\t';
  if(value_option)
	  code += 'section('+value_option+'){'+statements_input+'\n\t\t}';
  else{
	  code += 'section{'+statements_input+'\n\t\t}';
  }

  return code;
};

Blockly.SmartThings['dynamicpage'] = function(block) {
  var text_name = block.getFieldValue('name');
  var text_nextpage = block.getFieldValue('nextPage');
  // TODO: Assemble SmartThings into code variable.

  var code = '...;\n';
  return code;
};
