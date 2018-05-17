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
 	var actionList = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
	

	var groupingDevice = new Array();

	for(var action of device_list){
		var device = action.device
		if(commMap.isSingleCommad(device)){
			action.command= action.devname+'.'+ p.function+'()';
		}else if(commMap.isSingleMethod(device)){
			var command = commMap.getMethod(action)
		}
		groupingDevice.push(action)
	}
	
	if(goog.isArray(actionList)){
		var result = actionList.concat(groupingDevice);
	}else{
		var result = groupingDevice;

	}
		
	return result;
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
        .setCheck("c_dev");
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
	  onchange: function(event) {
		if(event.type == Blockly.Events.BLOCK_MOVE){
			if(this.type=="group" ){ //connection group to deveice
				if(event.newParentId == this.id || event.oldParentId == this.id){
					var parentBlock = this.parentBlock_
					var p_block = parentBlock.getInputTargetBlock("p")
					var children_block = this.getChildren()
					
					if(p_block.type == "event_handler"){
						//event
						var length = children_block.length
						var deviceList = new Set()
						for(var i = 0; i< length; i++){
							var block = this.childBlocks_[i]
							if(block){
								var device = block.getField("device").text_
								deviceList.add(device)
							}
						}
						
						var fromBlock = p_block.getInput('from');
						var toBlock = p_block.getInput('to');
						var attrs = new Set();

						for(let device of deviceList){
							if(attrMap.isOnlyENUM(device)){
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

							}else if(attrMap.isOnlyNUMBER(device) || attrMap.hasMultiTypeNUMBER(device)){

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

					}else if(p_block.type == "option"){
						//action
						var parentBlock = this.parentBlock_
						var p_block = parentBlock.getInputTargetBlock("p")
						var children_block = this.getChildren()

						var length = children_block.length
						var deviceList = new Set()

						for(var i = 0; i< length; i++){
							var block = this.childBlocks_[i]
							if(block){
								var device = block.getField("device").text_
								deviceList.add(device)
							}
						}

						if(p_block){
							var newComm = new Set()

							for(let device of deviceList){
								if(commMap.isSingleCommad(device)){
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
							p_block.getInput("type").removeField("type")
							p_block.getInput("type").appendField(new Blockly.FieldDropdown(command), "type");
						}
					}else{
						//condition
						// operator with all and exists
						
						var parentBlock = this.parentBlock_
						var p_block = parentBlock.getInputTargetBlock("p")
						var children_block = this.getChildren()
						
						if(parentBlock.type =="all" || parentBlock.type=="exists" ){
					
							if("ADD".indexOf(event.newInputName) || "ADD".indexOf(event.oldInputName)){		
								var length = children_block.length
								var attrs = new Set()
								var device
								for(var i = 0; i< length; i++){
									var block = this.childBlocks_[i]
									if(block){
										device = block.getField("type").text_
										if(attrMap.isOnlyENUM(device)){
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

										}
									}
									
								}
								var newAttr = []
								for(let attr of attrs){
									newAttr.push([attr, attr])
								}
								if(event.newInputName)
									p_block.forgrouping_(device, newAttr);
								else if(event.oldInputName && p_block  && length == 0){
									p_block.removeInput('A');
									p_block.removeInput('B');
									p_block.init();
								}
								if(p_block){
									var blockB = p_block.getInputTargetBlock("B")
									if(blockB && blockB.type == 'dev_attr'){
										blockB.getInput("dev_attr").removeField('attribute');
										blockB.getInput("dev_attr").appendField(new Blockly.FieldDropdown(newAttr), "attribute");
										
									}
								}
							}

						}
					


					}
				}


			}
			if(event.newInputName == "p"){ //connection at p of group
				
			}
		

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
		// Add new inputs.
		for (var i = 1; i < this.itemCount_; i++) {
		  if (!this.getInput('ADD' + i)) {
			var input = this.appendValueInput('ADD' + i);
			if(color == Block_colour_event)
				 input.setCheck("Event");
			else if(color == Block_colour_condition)
				input.setCheck("c_dev");
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
        .setCheck("Event_Handler")
        .appendField("any");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Event");
    this.setColour(Block_colour_event);
 this.setTooltip("");
 this.setHelpUrl("");
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
  }
};

Blockly.Blocks['map'] = {
  init: function() {
    this.appendValueInput("action")
        .setCheck("Action");
    this.appendValueInput("p")
        .appendField("map")
        .setCheck("option");
    this.appendStatementInput("group")
        .setCheck("group");
    this.setOutput(true, "Action");
    this.setColour(Block_colour_action);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};