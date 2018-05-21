
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
			.appendField("Action")
		this.setPreviousStatement(true, ["ECA", "EA"]);
		this.setNextStatement(true, ["ECA", "EA"]);
		this.setColour(Block_colour_eca);
		this.setTooltip("");
		this.setHelpUrl("");
	  }
}


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

Blockly.Blocks['lists_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
	this.setColour(color);
	this.appendDummyInput()
		.appendField("grouping");
	this.appendStatementInput('STACK');
	this.setTooltip("");
	this.contextMenu = false;
  }
};

Blockly.Blocks['lists_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
	this.setColour(color);
	this.appendDummyInput()
		.appendField("deivce");
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setTooltip("");
	this.contextMenu = false;
  }
};
