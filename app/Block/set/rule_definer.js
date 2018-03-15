Blockly.Blocks['eca'] = {
  init: function() {
    this.appendStatementInput("Event")
        .setCheck("Event")
        .appendField("Event");
    this.appendValueInput("Condition")
        .setCheck("Condition")
        .appendField("Condition");
    this.appendStatementInput("Action")
        .setCheck("Action")
        .appendField("Action");
    this.setPreviousStatement(true, ["ECA", "EA"]);
    this.setNextStatement(true, ["ECA", "EA"]);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ea'] = {
  init: function() {
    this.appendStatementInput("Event")
        .setCheck("Event")
        .appendField("Event");
    this.appendStatementInput("Action")
         .setCheck("Action")
        .appendField("Action");
    this.setPreviousStatement(true, ["ECA", "EA"]);
    this.setNextStatement(true, ["ECA", "EA"]);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};