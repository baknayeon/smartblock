
Blockly.Blocks['eca'] = {
	init: function() {
		this.appendValueInput("Event")
			.setCheck("Event")
			.appendField("Event");
		this.appendValueInput("Condition")
			.setCheck("Condition")
			.appendField("Condition");
		this.appendValueInput("Action")
			.setCheck("Action")
			.appendField("Action");
		this.setPreviousStatement(true, ["ECA", "EA"]);
		this.setNextStatement(true, ["ECA", "EA"]);
		this.setColour(Block_colour_eca);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};


Blockly.Blocks['ca'] = {
	init: function() {
		this.appendValueInput("Condition")
			.setCheck("Condition")
			.appendField("Condition");
		this.appendValueInput("Action")
			.setCheck("Action")
			.appendField("Action");
		this.setPreviousStatement(true, ["ECA", "EA", "CA"]);
		this.setNextStatement(true, ["ECA", "EA", "CA"]);
		this.setColour(Block_colour_eca);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};


Blockly.Blocks['ea'] = {
  init: function() {
    this.appendValueInput("Event")
        .setCheck("Event")
        .appendField("Event");
    this.appendValueInput("Action")
         .setCheck("Action")
        .appendField("Action");
    this.setPreviousStatement(true, ["ECA", "EA"]);
    this.setNextStatement(true, ["ECA", "EA"]);
    this.setColour(Block_colour_eca);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
