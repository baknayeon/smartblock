function pre_block(devname, colour){
	Blockly.SmartThings['input '+devname] = function(block) {
	var text_name = block.getFieldValue('name');
	var value_name = Blockly.SmartThings.valueToCode(block, 'NAME', Blockly.SmartThings.ORDER_ATOMIC);
	  // TODO: Assemble SmartThings into code variable.
	  var input = ""; 
	  
	  for(i in ecaList_g){
	  	if(input ==""){
	  		var input_e = ecaList_g[i].input_e_make;
			var input_a_list = ecaList_g[i].input_a_make;
			var input_c_list = ecaList_g[i].input_c_make;
			
			if(text_name === input_e.name){
				input = hi(input, input_e.input, value_name)
				break
			}

			for(a in input_a_list){
				if(text_name === input_a_list[a].name){
					input = hi(input, input_a_list[a].input, value_name)
				}

			 }

			for(c in input_c_list){
				if(text_name === input_c_list[c].name){
					input = hi(input, input_c_list[c].input, value_name)
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
function hi(string_input, input, value_name){
	if(string_input.indexOf(input) == -1)
		if(value_name)
			string_input += "\n\t\t\t"+input+", "+value_name;
		else
			string_input += "\n\t\t\t"+input;
	return string_input
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
    this.setColour(Block_colour_page);
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
    this.setColour(Block_colour_section);
 this.setTooltip("");
 this.setHelpUrl("");
  },
	onchange: function(event) {
		change(event,this)
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
    this.setColour(Block_colour_page);
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
