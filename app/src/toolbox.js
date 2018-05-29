Blockly.devicesFlyoutCallback_event = function(workspace) {
	var xmlList = [];
	
	selected_dev.forEach(function(itme){
		var device = itme
		event_block(device);
		xmlList.push(addXml("e_"+device))
	});

	if (Blockly.Blocks["e_location"]) {
		  var blockText = '<xml>' +
			  '<block type="e_location">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	add_eventHander_xml(xmlList);
	add_groupingBlock_xml("any", Block_colour_event, xmlList);
	add_schedule_xml(xmlList)

	return xmlList;
};


Blockly.devicesFlyoutCallback_condition = function(workspace) {

  var xmlList = [];

  selected_dev.forEach(function(itme){
		var device = itme;
	  condition_block(device);
	  xmlList.push(addXml("c_"+device));
	});
	
	add_groupingBlock_xml("all", Block_colour_condition, xmlList);
	add_groupingBlock_xml("exists", Block_colour_condition, xmlList);
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

	add_action_method_xml(xmlList);
	add_timer_xml(xmlList)
	add_groupingBlock_xml("map", Block_colour_action, xmlList);

  return xmlList;
};
function add_schedule_xml(xmlList){

	 if (Blockly.Blocks["e_time"]) {
		  var blockText = '<xml>' +
			  '<block type="e_time">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["e_day"]) {
		  var blockText = '<xml>' +
			  '<block type="e_day">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["e_week"]) {
		  var blockText = '<xml>' +
			  '<block type="e_week">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 /*if (Blockly.Blocks["e_year"]) {
		  var blockText = '<xml>' +
			  '<block type="e_year">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} */
	 if (Blockly.Blocks["input_time"]) {
		  var blockText = '<xml>' +
			  '<block type="input_time">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
}
function add_timer_xml(xmlList){
	 if (Blockly.Blocks["a_time"]) {
		  var blockText = '<xml>' +
			  '<block type="a_time">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_minutes"]) {
		  var blockText = '<xml>' +
			  '<block type="a_minutes">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_hours"]) {
		  var blockText = '<xml>' +
			  '<block type="a_hours">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_day"]) {
		  var blockText = '<xml>' +
			  '<block type="a_day">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_month"]) {
		  var blockText = '<xml>' +
			  '<block type="a_month">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_week"]) {
		  var blockText = '<xml>' +
			  '<block type="a_week">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["timer"]) {
		  var blockText = '<xml>' +
			  '<block type="timer">' +
			   '<statement name="groupingActions">'+
						'<block type="timer_actions"></block>'+
				'</statement>'+
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["stop"]) {
		  var blockText = '<xml>' +
			  '<block type="stop">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
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
}

function add_groupingBlock_xml(group, color, xmlList){
	  groupingBlock(color)	
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
					  '<statement name="group">'+
						'<block type="group"></block>'+
					  '</statement>'+
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
					  '<statement name="group">'+
						'<block type="group"></block>'+
					  '</statement>'+
				  '</block>' +
				  '</xml>';
			  var block = Blockly.Xml.textToDom(blockText).firstChild;
			  return block
		}

	}else if(b == "all" || b == "exists"){
		 if (Blockly.Blocks[b]) {
			  var blockText = '<xml>' +
				  '<block type="'+b+'">' +
					  '<statement name="group">'+
						'<block type="group"></block>'+
					  '</statement>'+
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

