Blockly.Blocks['e_schedule'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("schedule")
        .appendField(new Blockly.FieldTextInput("?"), "hour")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("?"), "minute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("repeat")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "NAME");
    this.appendStatementInput("actions")
        .setCheck("Event");
    this.setPreviousStatement(true, "Event");
    this.setNextStatement(true, "Event");
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['a_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("schedule")
        .appendField(new Blockly.FieldTextInput(""), "hour")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput(""), "minute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("repeat")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "NAME");
    this.appendStatementInput("actions")
        .setCheck("Action");
    this.setPreviousStatement(true, "Action");
    this.setNextStatement(true, "Action");
    this.setColour(285);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.SmartThings['e_schedule'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var checkbox_name = block.getFieldValue('NAME') == 'TRUE';
  var statements_actions = Blockly.SmartThings.statementToCode(block, 'actions');
  // TODO: Assemble SmartThings into code variable.
  var code = '...;\n';
  return code;
};

Blockly.SmartThings['a_timer'] = function(block) {
  var text_hour = block.getFieldValue('hour');
  var text_minute = block.getFieldValue('minute');
  var checkbox_name = block.getFieldValue('NAME') == 'TRUE';
  var statements_actions = Blockly.SmartThings.statementToCode(block, 'actions');
  // TODO: Assemble SmartThings into code variable.
  var code = '...;\n';
  return code;
};