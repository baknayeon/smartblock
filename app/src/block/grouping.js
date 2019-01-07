Blockly.SmartThings['group'] = function(block) {
	
	var i = 0;
	var length = block.inputList.length
	var list = new Array();
	
	while(i < length){
	 	var device = Blockly.SmartThings.valueToCode(block, 'ADD'+i, Blockly.SmartThings.ORDER_ATOMIC);
	 	list.push(device)
		i++;
	}

  return list;
};

Blockly.SmartThings['any'] = function(block) {
	var p = Blockly.SmartThings.valueToCode(block, 'p', Blockly.SmartThings.ORDER_ATOMIC);
	var device_list = Blockly.SmartThings.statementToCode(block, 'group');


	var groupingDevice = new Grouping();
	groupingDevice.type = "any"
	groupingDevice.p = p
	for(var device of device_list){
		device.event_handler =p 
	}
	groupingDevice.list = device_list

  return groupingDevice;
};


Blockly.SmartThings['all'] = function(block) {
	var p = Blockly.SmartThings.valueToCode(block, 'p', Blockly.SmartThings.ORDER_ATOMIC);
	var device_list = Blockly.SmartThings.statementToCode(block, 'group');

	p.device = device_list["0"].device
	
	var groupingDevice = new Grouping();
	groupingDevice.type = "all"
	groupingDevice.p = p
	groupingDevice.list = device_list

		
	return groupingDevice;
};


Blockly.SmartThings['exists'] = function(block) {
	var p = Blockly.SmartThings.valueToCode(block, 'p', Blockly.SmartThings.ORDER_ATOMIC);
	var device_list = Blockly.SmartThings.statementToCode(block, 'group');
 
	var groupingDevice = new Grouping();
	groupingDevice.type = "exists"
	groupingDevice.p = p
	groupingDevice.list = device_list
		
	return groupingDevice;
};

Blockly.SmartThings['map'] = function(block) {
	var p = Blockly.SmartThings.valueToCode(block, 'p', Blockly.SmartThings.ORDER_ATOMIC);
	var device_list = Blockly.SmartThings.statementToCode(block, 'group');
 

	var groupingDevice = new Array();

	for(var action of device_list){
		var device = action.device
		if(commMap.has1Commad(device)){
			action.command= action.devname+'.'+ p.device+'()';
		}else if(commMap.has1Method(device)){
			var command = commMap.getMethod(action)
		}
		groupingDevice.push(action)
	}
	
	if(goog.isArray(actionList)){
		var result = actionList.concat(groupingDevice);
	}else{
		var result = groupingDevice;

	}
		
	var groupingDevice = new Grouping();
	groupingDevice.type = "map"
	groupingDevice.p = p
	groupingDevice.list = device_list
		
	return groupingDevice;
};

function groupingBlock(color){
	Blockly.Blocks["group"] = {
	  /**
	   * Block for creating a list with any number of elements of any type.
	   * @this Blockly.Block
	   */
	  init: function() {
	  if(color == Block_colour_event){	 
		 this.appendValueInput("ADD0")
        .setCheck("Event");
	  }else if(color == Block_colour_condition){	 
		 this.appendValueInput("ADD0")
        .setCheck("Inputc");
	  }else if(color == Block_colour_action){	 
		 this.appendValueInput("ADD0")
        .setCheck("Action");
	  }
		 this.setPreviousStatement(true, "group");
		this.setColour(color);
		this.itemCount_ = 2;
		this.updateShape_();
		this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
		this.setTooltip("");
		this.setHelpUrl("");
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
	  	color = this.colour_
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
			
			/*if(color == Block_colour_event){
				this.appendValueInput("p")
					.setCheck("Event_Handler")
				this.setOutput(true, "Event");
			}else if(color == Block_colour_condition ){
				this.appendValueInput("p")
					.setCheck("Condition")
				this.setOutput(true, "Condition");
			}else if(color == Block_colour_action ){
				this.appendValueInput("p")
					.setCheck("option")
				this.setOutput(true, "Action");
			}
*/
			if(color == Block_colour_event)
				 this.appendDummyInput('EMPTY');
			else if(color == Block_colour_condition)
				 this.appendDummyInput('EMPTY');
			else if(color == Block_colour_action)
				 this.appendDummyInput('EMPTY');
		}
		// Add new inputs.{
		for (var i = 1; i < this.itemCount_; i++) {
		  if (!this.getInput('ADD' + i)) {
			var input = this.appendValueInput('ADD' + i);
			if(color == Block_colour_event)
				 input.setCheck("Event");
			else if(color == Block_colour_condition)
				input.setCheck("Inputc");
			else if(color == Block_colour_action)
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

Blockly.Blocks['any'] = {
  init: function() {
    this.appendValueInput("p")
        .setCheck("specific_event")
        .appendField("any");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_MOVE){
		
		var p_block = this.getInputTargetBlock("p")
		var block_group = this.getInputTargetBlock('group');
		if((p_block && event.blockId == p_block.id) || (block_group && event.newParentId == block_group.id))
			if(this.type=="any"  ){ //connection group to deveice
					var children_blocks = block_group.childBlocks_
					if(p_block.type == "specific_event"){
						//event
						var deviceList = new Set()
						for(var childBlocks_ of children_blocks){
							var device = childBlocks_.getField("device").text_
							deviceList.add(device)
						}

						var fromBlock = p_block.getInput('from');
						var toBlock = p_block.getInput('to');
						var attrs = new Set();
						for(var device of deviceList){
							if(attrMap.onlyInENUM(device)){
								var newAttr = attrMap.getENUM(device);
								for(let new_a of newAttr.value){
									attrs.add(new_a)

								}
							}else if(attrMap.hasMultiTypeENUM(device)){
								var attribute_id = parentBlock.getField("attribute_id").text_;
								var newAttr = attrMap.getENUMById(device, attribute_id);
								for(let new_a of newAttr.value){
									attrs.add(new_a)

								}

							}else if(attrMap.onlyInNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){

							}

						}

						var newAttr = [[".","."]]
						for(let attr of attrs){
							newAttr.push([attr, attr])
						}
						fromBlock.removeField('dropDownFrom');
						fromBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownFrom");
						toBlock.removeField("dropDownTo");
						toBlock.appendField(new Blockly.FieldDropdown(newAttr), "dropDownTo");

					}

			}
	}
  }
};

Blockly.Blocks['all'] = {
  init: function() {
    this.appendValueInput("p")
        .setCheck("Condition")
        .appendField("all");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_MOVE){
		var p_block = this.getInputTargetBlock("p")
		var block_group = this.getInputTargetBlock('group');
		if((p_block && event.blockId == p_block.id) || (block_group && event.newParentId == block_group.id))
			if(this.type=="all" ){ //connection group to deveice

				var block_group = this.getInputTargetBlock('group');
				var block_group_childBlocks = block_group.childBlocks_
				if(block_group_childBlocks.length > 0){
					var childBlock1 = block_group_childBlocks[0]
					var child_type = childBlock1.type.split("_")[1]

					var blockP = this.getInputTargetBlock('p');
					settingA(blockP, child_type)

				}
			}
  	}
  }
};
Blockly.Blocks['exists'] = {
  init: function() {
    this.appendValueInput("p")
        .setCheck("Condition")
        .appendField("exists");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_MOVE){
		var p_block = this.getInputTargetBlock("p")
		var block_group = this.getInputTargetBlock('group');
		if((p_block && event.blockId == p_block.id) || (block_group && event.newParentId == block_group.id))
		if(this.type=="exists"){ //connection group to deveice
			
			var block_group = this.getInputTargetBlock('group');
			var block_group_childBlocks = block_group.childBlocks_
			if(block_group_childBlocks.length > 0){
				var childBlock1 = block_group_childBlocks[0]
				var child_type = childBlock1.type.split("_")[1]

   				var blockP = this.getInputTargetBlock('p');
				settingA(blockP, child_type)
				
			}
		}
  	}
  }
};

function settingA(blockP, child_type){
	if(blockP){
		if(blockP.type == "compare"){
			blockP.removeInput("A")
			blockP.appendDummyInputAtFrist('A')
					  .appendField(new Blockly.FieldLabel(child_type), "type")
		}else if(blockP.type == "operation"){
			var child1 = blockP.childBlocks_[0]
			var child2 = blockP.childBlocks_[1]
			if(child1){
				settingA(child1, child_type)
			}
			if(child2){
				settingA(child2, child_type)
			}
		}
	}


}

Blockly.Blocks['map'] = {
  init: function() {
    this.appendDummyInput("p")
        .appendField("map")
        .appendField(new Blockly.FieldDropdown([[".","."]]), "type");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Action");
	this.setInputsInline(false);
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type == Blockly.Events.BLOCK_MOVE){
		
		var block_group = this.getInputTargetBlock('group');
		var children_blocks = block_group.childBlocks_
		if(block_group && event.newParentId == block_group.id){ //input
			//action
				
			this.getInput("p").removeField("type")
			this.getInput("p").appendField(new Blockly.FieldDropdown(getCommandInMap(children_blocks)), "type");

		}else if(event.oldParentId == block_group.id){ //output
			
			if(children_blocks.length == 0){
				this.getInput("p").removeField("type")
				this.getInput("p").appendField(new Blockly.FieldDropdown([[".","."]]), "type");
			}else{
				this.getInput("p").removeField("type")
				this.getInput("p").appendField(new Blockly.FieldDropdown(getCommandInMap(children_blocks)), "type");

			}
		}
  	}
  }
};

function getCommandInMap(children_blocks){

	var deviceList = new Set()
	for(var childBlock of children_blocks){
		var device = childBlock.getField("device").text_
		deviceList.add(device)

	}

	var newComm = new Set()

	for(let device of deviceList){
		if(commMap.has1Commad(device)){
			for(let comm of commMap.getCommad(device))
			{
				newComm.add(comm)
			}
		}
	}

	var command = []
	for(let c of newComm){
		command.push([c, c])
	}

	return command
}