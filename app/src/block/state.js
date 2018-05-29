
Blockly.SmartThings['put_state'] = function(block) {
  var value_value = Blockly.SmartThings.valueToCode(block, 'value', Blockly.SmartThings.ORDER_ATOMIC);
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_value = block.getFieldValue('value');
  // TODO: Assemble SmartThings into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_value = Blockly.SmartThings.valueToCode(block, 'value', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};
Blockly.SmartThings['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.SmartThings.ORDER_ATOMIC : 
              Blockly.SmartThings.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.SmartThings['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = [["+","ADD"], ["-","MINUS"], ["*","MULTIPLY"], ["/","DIVIDE"]]
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in SmartThings requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.SmartThings.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Blocks['math_arithmetic'] = {
  init: function() {
  var OPERATORS = [["+","ADD"], ["-","MINUS"], ["*","MULTIPLY"], ["/","DIVIDE"]]
    this.appendValueInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(OPERATORS), "OP");
    this.appendValueInput("B")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour("#303030");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['put_state'] = {
  init: function() {
    this.appendDummyInput() 
        .appendField("put");
	this.appendValueInput("value")
        .setCheck(["state", "text", "num"] );
    this.appendDummyInput()
        .appendField("in")
        .appendField(new Blockly.FieldVariable("box1", null, null, "box"), "NAME");
    this.setOutput(true, null);
    this.setColour("#303030");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['math_number'] = {
  init: function() {
    this.appendValueInput("value")
        .appendField("num")
        .appendField(new Blockly.FieldTextInput("0"), "NumNUM")
        .setCheck("num");
    this.setOutput(true, "num");
    this.setColour("#303030");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['math_text'] = {
  init: function() {
    this.appendValueInput("value")
		.appendField(new Blockly.FieldImage("../media/left-quote.png", 20, 16, "left"))
        .appendField(new Blockly.FieldTextInput(" "), "TEXT")
		.appendField(new Blockly.FieldImage("../media/right-quote.png", 20, 16, "right"))
        .setCheck("text");
    this.setOutput(true, "text");
    this.setColour("#303030");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['state'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("state")
        .appendField(new Blockly.FieldVariable("box1", null, null, "box"), "NAME");
    this.setOutput(true, "state");
    this.setColour("#303030");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};