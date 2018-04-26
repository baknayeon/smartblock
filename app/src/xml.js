Blockly.devicesFlyoutCallback_event = function(workspace) {
	var xmlList = [];

	add_eventHander_xml(xmlList);
	add_grouping("any", Block_colour_event, xmlList);

	selected_dev.forEach(function(itme){
		var device = itme
		event_block(device);
		xmlList.push(addXml("e_"+device))
	});
	
	return xmlList;
};


Blockly.devicesFlyoutCallback_condition = function(workspace) {

  var xmlList = [];

  selected_dev.forEach(function(itme){
		var device = itme;
	  condition_block(device);
	  xmlList.push(addXml("c_"+device));
	});
	

	add_grouping("all", Block_colour_condition, xmlList);
	add_grouping("exists", Block_colour_condition, xmlList);
  add_logic_xml(xmlList)

  return xmlList;
};

Blockly.devicesFlyoutCallback_action = function(workspace) {
	var xmlList = [];
	
	selected_dev.forEach(function(itme){
		var device = itme
	   if(commMap.makeBlock(device)){
			action_block(device);
			xmlList.push(addXml("a_"+device));
		}
	});
	add_grouping("map", Block_colour_action, xmlList);
	

	add_action_method_xml(xmlList);
  return xmlList;
};

function add_eventHander_xml(xmlList){
	 if (Blockly.Blocks["event_handler"]) {
		  var blockText = '<xml>' +
			  '<block type="event_handler">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
}

function add_grouping(group, color, xmlList){
	  grouping(group, color)	
	  xmlList.push(addXml(group))
}

function add_logic_xml(xmlList){

	 if (Blockly.Blocks["operation"]) {
		  var blockText = '<xml>' +
			  '<block type="operation">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["negate"]) {
		  var blockText = '<xml>' +
			  '<block type="negate">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["boolean"]) {
		  var blockText = '<xml>' +
			  '<block type="boolean">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["compare"]) {
		  var blockText = '<xml>' +
			  '<block type="compare">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["dev_attr"]) {
		  var blockText = '<xml>' +
			  '<block type="dev_attr">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["device_list"]) {
		  var blockText = '<xml>' +
			  '<block type="device_list">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["number"]) {
		  var blockText = '<xml>' +
			  '<block type="number">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
}

function add_action_method_xml(xmlList){
	 if (Blockly.Blocks["option"]) {
		  var blockText = '<xml>' +
				 '<block type="option">'+
				 '</block>'+
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["sendpush"]) {
		  var blockText = '<xml>' +
			  '<block type="sendpush">' +
			  '<field name="mes"></field>'+
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["sendsms"]) {
		var blockText = '<xml>' +
		  '<block type="sendsms">' +
		  '<field name="phone">+82010</field>'+
		  '<field name="mes"></field>'+
		  '</block>' +
		  '</xml>';
		var block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block)
	}
	if (Blockly.Blocks["sendnotification"]) {
		var blockText = '<xml>' +
		  '<block type="sendnotification">' +
		  '<field name="mes"></field>'+
		  '</block>' +
		  '</xml>';
		var block = Blockly.Xml.textToDom(blockText).firstChild;
		xmlList.push(block)
	}
	/*if (Blockly.Blocks["a_timer"]) {
		  var blockText = '<xml>' +
			  '<block type="a_timer">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}*/
}

function addXml(b){
	if(b == "any"){
		 if (Blockly.Blocks["any"]) {
			  var blockText = '<xml>' +
				  '<block type="any">' +
					  '<value name="p">'+
						  '<block type="event_handler">'+
						  '</block>'+
					  '</value>' +
				  '</block>' +
				  '</xml>';
			  var block = Blockly.Xml.textToDom(blockText).firstChild;
			  return block
		}

	}else if(b == "map"){
		 if (Blockly.Blocks["map"]) {
			  var blockText = '<xml>' +
				  '<block type="map">' +
					  '<value name="p">'+
						  '<block type="option">'+
						  '</block>'+
					  '</value>' +
				  '</block>' +
				  '</xml>';
			  var block = Blockly.Xml.textToDom(blockText).firstChild;
			  return block
		}

	}
	else{
		 if (Blockly.Blocks[b]) {
			  var blockText = '<xml>' +
				  '<block type="'+b+'">' +
				  '</block>' +
				  '</xml>';
			  var block = Blockly.Xml.textToDom(blockText).firstChild;
			  return block
		}
	}
}
function eliminate_A(pblock){
	if(pblock)
		if(pblock.type == "operation"){
			var blockA = pblock.getInputTargetBlock('A');
			var blockB = pblock.getInputTargetBlock('B');
			eliminate_A(blockA)
			eliminate_A(blockB)
		}
		else if(pblock.type == "compare"){
			pblock.removeInput('A');
			pblock.appendDummyInput_n_th('A', 0).appendField("grouping");
		}	
}

function append_A(pblock){
	if(pblock)
		if(pblock.type == "operation"){
			var blockA = pblock.getInputTargetBlock('A');
			var blockB = pblock.getInputTargetBlock('B');
			append_A(blockA)
			append_A(blockB)
		}
		else if(pblock.type == "compare"){
			pblock.removeInput('A');
			pblock.appendValueInput_n_th('A', 0)
		}	
}
function grouping(name, color){
	Blockly.Blocks[name] = {
	  /**
	   * Block for creating a list with any number of elements of any type.
	   * @this Blockly.Block
	   */
	  init: function() {

		if(name == "any"){
			this.appendValueInput("p")
				.setCheck("Event_Handler")
				.appendField(name);
			this.setOutput(true, "Event");
		}else if(name == "all" || name == "exists" ){
			this.appendValueInput("p")
				.setCheck("Condition")
				.appendField(name);
			this.setOutput(true, "Condition");
		}else if(name == "map" ){
			this.appendValueInput("p")
				.setCheck("option")
				.appendField(name);
			this.setOutput(true, "Action");
		}

		this.setColour(color);
		this.itemCount_ = 2;
		this.updateShape_();
		//this.setOutput(true, 'Array');
		this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
		this.setTooltip("");
		this.setHelpUrl("");
	  },
	  onchange: function(event) {
		if(event.type == Blockly.Events.BLOCK_MOVE){
		

		if(this.type=="map" && event.oldParentId == this.id)  // action init
  			if(this.childBlocks_.length == 1){
				if(this.childBlocks_["0"].type == "option"){
					var action = this.getInputTargetBlock("p")
					action.getInput("type").removeField("type")
				}
			}

		}
			
	},
	  /**
	   * Create XML to represent list inputs.
	   * @return {!Element} XML storage element.
	   * @this Blockly.Block
	   */
	  mutationToDom: function() {
		var container = document.createElement('mutation');
		container.setAttribute('items', this.itemCount_);
		return container;
	  },
	  /**
	   * Parse XML to restore the list inputs.
	   * @param {!Element} xmlElement XML storage element.
	   * @this Blockly.Block
	   */
	  domToMutation: function(xmlElement) {
		this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
		this.updateShape_();
	  },
	  /**
	   * Populate the mutator's dialog with this block's components.
	   * @param {!Blockly.Workspace} workspace Mutator's workspace.
	   * @return {!Blockly.Block} Root block in mutator.
	   * @this Blockly.Block
	   */
	  decompose: function(workspace) {
		var containerBlock = workspace.newBlock('lists_create_with_container');
		containerBlock.initSvg();
		var connection = containerBlock.getInput('STACK').connection;
		for (var i = 0; i < this.itemCount_; i++) {
		  var itemBlock = workspace.newBlock('lists_create_with_item');
		  itemBlock.initSvg();
		  connection.connect(itemBlock.previousConnection);
		  connection = itemBlock.nextConnection;
		}
		return containerBlock;
	  },
	  /**
	   * Reconfigure this block based on the mutator dialog's components.
	   * @param {!Blockly.Block} containerBlock Root block in mutator.
	   * @this Blockly.Block
	   */
	  compose: function(containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		// Count number of inputs.
		var connections = [];
		while (itemBlock) {
		  connections.push(itemBlock.valueConnection_);
		  itemBlock = itemBlock.nextConnection &&
			  itemBlock.nextConnection.targetBlock();
		}
		// Disconnect any children that don't belong.
		for (var i = 0; i < this.itemCount_; i++) {
		  var connection = this.getInput('ADD' + i).connection.targetConnection;
		  if (connection && connections.indexOf(connection) == -1) {
			connection.disconnect();
		  }
		}
		this.itemCount_ = connections.length;
		this.updateShape_();
		// Reconnect any child blocks.
		for (var i = 0; i < this.itemCount_; i++) {
		  Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
		}
	  },
	  /**
	   * Store pointers to any connected child blocks.
	   * @param {!Blockly.Block} containerBlock Root block in mutator.
	   * @this Blockly.Block
	   */
	  saveConnections: function(containerBlock) {
		var itemBlock = containerBlock.getInputTargetBlock('STACK');
		var i = 0;
		while (itemBlock) {
		  var input = this.getInput('ADD' + i);
		  itemBlock.valueConnection_ = input && input.connection.targetConnection;
		  i++;
		  itemBlock = itemBlock.nextConnection &&
			  itemBlock.nextConnection.targetBlock();
		}
	  },
	  /**
	   * Modify this block to have the correct number of inputs.
	   * @private
	   * @this Blockly.Block
	   */
	  updateShape_: function() {
		if (this.itemCount_ && this.getInput('EMPTY')) {
		  this.removeInput('EMPTY');
		} else if (!this.itemCount_ && !this.getInput('EMPTY')) {
			
			if(name == "any")
				 this.appendDummyInput('EMPTY');
			else if(name == "all" || name == "exists" )
				 this.appendDummyInput('EMPTY');
			else if(name == "map" )
				 this.appendDummyInput('EMPTY');
		}
		// Add new inputs.
		for (var i = 0; i < this.itemCount_; i++) {
		  if (!this.getInput('ADD' + i)) {
			var input = this.appendValueInput('ADD' + i);
			if(name == "any")
				 input.setCheck("Event");
			else if(name == "all" || name == "exists" )
				input.setCheck("c_dev");
			else if(name == "map" )
				input.setCheck("Action");

		  }
		}
		// Remove deleted inputs.
		while (this.getInput('ADD' + i)) {
		  this.removeInput('ADD' + i);
		  i++;
		}
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

}