function changInput(event, block){

	if(block.id == event.blockId){
		if(event.element == "field"&& event.name == "type"){
		
			var device = event.newValue
			var count = deviceCount.get(device)
			block.getInput("device").removeField("name")
			block.getInput("device")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name");
		
		}else if(event.type == Blockly.Events.BLOCK_MOVE){ //block connect
			if(event.newParentId && block.parentBlock_.id == event.newParentId){

					
				if(isit_data(event.newInputName) ){
						var type = event.newInputName
						var count = deviceCount.get(type)
						block.getInput("device").removeField("type")
						block.getInput("device").removeField("name")
						block.getInput("device").appendField(type,"type")
							 .appendField(new Blockly.FieldVariable(count, null, null, type), "name"); // , null, null, device)
					}else if(commMap.haveMethod(event.newInputName)){
						var commandMethod = commMap.getMethod(event.newInputName)
				
						var type = commandMethod.type
						var count = deviceCount.get(type)
						block.getInput("device").removeField("type")
						block.getInput("device").removeField("name")
						block.getInput("device").appendField(type,"type")
							 .appendField(new Blockly.FieldVariable(count, null, null, type), "name"); // , null, null, device)
					}
			
			}else if(event.oldParentId && block.parentBlock_ == null){ //block disconnect
			//변했는지 확인하기
				var fieldRows = block.getInput("device")
				var type = fieldRows.fieldRow[0].text_
				if(isit_data(type) ){
					block.getInput("device").removeField("type")
					block.getInput("device").removeField("name")
					var count = deviceCount.get("text")
					block.getInput("device")
						 .appendField(new Blockly.FieldDropdown(input_data_type), "type")
						 .appendField(new Blockly.FieldVariable(count, null, null, "text"), "name"); // , null, null, device)
				}
			}
		}

	}

}


var input_data_type = [["text","text"], ["bool","bool"], ["number","number"], ["phone","phone"], ["message","message"], ["email","email"], ["password","password"], ["time","time"], ["mode","mode"]]

function isit_data(type){

	for(var d_type of input_data_type){
		if(d_type[0] == type)
			return true
	}
	return false
}