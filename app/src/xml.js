Blockly.devicesFlyoutCallback_condition = function(workspace) {

  var xmlList = [];

  selected_dev.forEach(function(itme){
		var device = itme;
	  condition_block(device);
	  xmlList.push(addXml("c_"+device));
	});
	

  add_logic_xml(xmlList)

  return xmlList;
};


Blockly.devicesFlyoutCallback_event = function(workspace) {
	var xmlList = [];

	add_eventHander_xml(xmlList);


	selected_dev.forEach(function(itme){
		var device = itme
		event_block(device);
		xmlList.push(addXml("e_"+device))
	});
	
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
	

	add_action_method_xml(xmlList);
  return xmlList;
};

function addXml(device){
	 if (Blockly.Blocks[device]) {
			  var blockText = '<xml>' +
				  '<block type="'+device+'">' +
				  '</block>' +
				  '</xml>';
			  var block = Blockly.Xml.textToDom(blockText).firstChild;
		return block
	}
	
}

function add_eventHander_xml(xmlList){
	 if (Blockly.Blocks["event_handler"]) {
		  var blockText = '<xml>' +
			  '<block type="event_handler">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	/*if (Blockly.Blocks["e_schedule"]) {
		  var blockText = '<xml>' +
			  '<block type="e_schedule">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}*/
}

function add_action_method_xml(xmlList){
	 if (Blockly.Blocks["variable"]) {
		  var blockText = '<xml>' +
			   //'<block type="type">'+
				 '<block type="variable">'+
				   '<field name="type">number</field>'+
				   '<value name="type"></value>'+
				 '</block>'+
			 // '</block>'+
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

	/*if (Blockly.Blocks["number"]) {
		  var blockText = '<xml>' +
			  '<block type="number">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}*/
}
