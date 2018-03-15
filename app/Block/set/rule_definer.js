
var Block_colour_eca = "#"+"1f215a"

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
    this.setColour(Block_colour_eca);
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
    this.setColour(Block_colour_eca);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};