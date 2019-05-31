Blockly.devicesFlyoutCallback_event = function(workspace) {
	var xmlList = [];
	
	selected_dev.forEach(function(itme){
		var device = itme
	   if(attrMap.makeBlock(device)){
			if(attrMap.isSingle(device)){
				var attr = attrMap.getSingle(device)
				var id = attr.id
				var type = attr.type
	
				event_block(device, "Single", type, id);
				xmlList.push(addXml("e_"+device+"Single"+type+id))
			}else if(attrMap.isMultiple(device)){
				var attr_map = attrMap.getMultiple(device)
							
				attr_map.forEach(function (item, key, mapObj) {
					var attr = item
					var id = attr.id
					var type = attr.type
					event_block(device, "Multiple", type, id);
					xmlList.push(addXml("e_"+device+"Multiple"+type+id))
				});
			
				
			}
		}
	});
	
	
	if (Blockly.Blocks["e_installed"]) {
		  var blockText = '<xml>' +
			  '<block type="e_installed">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
		 

	subscribes_fromaction.forEach(function (item, key, mapObj) {
		var method_blockId = key
		var input_block = item; //subscribes_fromaction.set(this.id, [input_type, input_name, attr])

		//var sub_block = workspace.getBlockById(method_blockId)
		
		event_block2(method_blockId, input_block)
		xmlList.push(addXml('e_sub'+input_block[3]))
	});

		 
	if (Blockly.Blocks["inpute_data"]) {
		  var blockText = '<xml>' +
			  '<block type="inpute_data">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
		 
	if (Blockly.Blocks["specific_event"]) {
		  var blockText = '<xml>' +
			  '<block type="specific_event">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 

	if (Blockly.Blocks["e_location"]) {
		  var blockText = '<xml>' +
			  '<block type="e_location">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	if (Blockly.Blocks["e_app"]) {
		  var blockText = '<xml>' +
			  '<block type="e_app">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	add_groupingBlock_xml("any", Block_colour_event, xmlList);
	add_schedule_xml(xmlList)

	
	if (Blockly.Blocks["e_updated"]) {
		  var blockText = '<xml>' +
			  '<block type="e_updated">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
		 
	return xmlList;
};


Blockly.devicesFlyoutCallback_condition = function(workspace) {
	var xmlList = [];
	selected_dev.forEach(function(itme){
		var device = itme;

		if(attrMap.isSingle(device)){
			condition_block(device, "single");
			xmlList.push(addXml("c_"+device+"single"));
		}else if(attrMap.isMultiple(device)){			
			condition_block(device,"multiple");
			xmlList.push(addXml("c_"+device+"multiple"));


		}
	});

	
	add_logic_xml(xmlList)

		
	if (Blockly.Blocks["inputc_data"]) {
		  var blockText = '<xml>' +
			  '<block type="inputc_data">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["datac"]) {
		  var blockText = '<xml>' +
			  '<block type="datac">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["condition_state"]) {
		 var blockText = '<xml>' +
			  '<block type="condition_state">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["math_condition"]) {
		 var blockText = '<xml>' +
			  '<block type="math_condition">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["is_null"]) {
		 var blockText = '<xml>' +
			  '<block type="is_null">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}


	if (Blockly.Blocks["last_event_data"]) {
		 var blockText = '<xml>' +
			  '<block type="last_event_data">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	//already
	if (Blockly.Blocks["already_enum"]) {
		 var blockText = '<xml>' +
			  '<block type="already_enum">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["already_num"]) {
		 var blockText = '<xml>' +
			  '<block type="already_num">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["happen_enum_dropdown"]) {
		 var blockText = '<xml>' +
			  '<block type="happen_enum_dropdown">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	
	if (Blockly.Blocks["now_c"]) {
		 var blockText = '<xml>' +
			  '<block type="now_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["function_invocation_c"]) {
		 var blockText = '<xml>' +
			  '<block type="function_invocation_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["getsunrise_c"]) {
		 var blockText = '<xml>' +
			  '<block type="getsunrise_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["getsunset_c"]) {
		 var blockText = '<xml>' +
			  '<block type="getsunset_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
		 

	if (Blockly.Blocks["getlocation_c"]) {
		 var blockText = '<xml>' +
			  '<block type="getlocation_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["getlocationmode_c"]) {
		 var blockText = '<xml>' +
			  '<block type="getlocationmode_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["getweatherfeature_c"]) {
		 var blockText = '<xml>' +
			  '<block type="getweatherfeature_c">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
		 
	add_groupingBlock_xml("all", Block_colour_condition, xmlList);
	add_groupingBlock_xml("exists", Block_colour_condition, xmlList);
		 

  return xmlList;
};

Blockly.devicesFlyoutCallback_action = function(workspace) {
	var xmlList = [];
	
	selected_dev.forEach(function(itme){
		var device = itme
	   if(commMap.makeBlock(device)){
			if(commMap.hasCommad(device)){
				action_block(device, "Command");
				xmlList.push(addXml("a_"+device+"Command"))
			}
			if(commMap.hasMethod(device)){
				action_block(device, "Method");
				xmlList.push(addXml("a_"+device+"Method"))
			}
			if(commMap.hasMethodS(device)){
				action_block(device, "MethodS");
				xmlList.push(addXml("a_"+device+"MethodS"))
			}
			
		}

	});



	selected_dev.forEach(function(itme){
		var device = itme;

		if(attrMap.isSingle(device)){
			action_block2(device, "single");
			xmlList.push(addXml("a_"+device+"single"));
		}else if(attrMap.isMultiple(device)){			
			action_block2(device,"multiple");
			xmlList.push(addXml("a_"+device+"multiple"));


		}


	});



	if (Blockly.Blocks["action_group"]) {
		 var blockText = '<xml>' +
			  '<block type="action_group">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["inputa_data"]) {
		 var blockText = '<xml>' +
			  '<block type="inputa_data">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["dataa"]) {
		 var blockText = '<xml>' +
			  '<block type="dataa">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["action_state"]) {
		 var blockText = '<xml>' +
			  '<block type="action_state">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["action_state_def"]) {
		 var blockText = '<xml>' +
			  '<block type="action_state_def">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	 if (Blockly.Blocks["math_action"]) {
		 var blockText = '<xml>' +
			  '<block type="math_action">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	
	if (Blockly.Blocks["send"]) {
		var blockText = '<xml>' +
		  '<block type="send">' +
		  '<field name="phone">+8210</field>'+
		  '<field name="mes"></field>'+
		  '</block>' +
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

	add_timer_xml(xmlList)
	add_groupingBlock_xml("map", Block_colour_action, xmlList);

	if (Blockly.Blocks["now_a"]) {
		 var blockText = '<xml>' +
			  '<block type="now_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	 if (Blockly.Blocks["function_invocation_a"]) {
		 var blockText = '<xml>' +
			  '<block type="function_invocation_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["subscribe_method"]) {
		 var blockText = '<xml>' +
			  '<block type="subscribe_method">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["location_a"]) {
		 var blockText = '<xml>' +
			  '<block type="location_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
	if (Blockly.Blocks["app_a"]) {
		 var blockText = '<xml>' +
			  '<block type="app_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
		
		 

	if (Blockly.Blocks["getlocation_a"]) {
		 var blockText = '<xml>' +
			  '<block type="getlocation_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["getsunrise_a"]) {
		 var blockText = '<xml>' +
			  '<block type="getsunrise_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["getsunset_a"]) {
		 var blockText = '<xml>' +
			  '<block type="getsunset_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
		 

	if (Blockly.Blocks["getweatherfeature_a"]) {
		 var blockText = '<xml>' +
			  '<block type="getweatherfeature_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}

	if (Blockly.Blocks["setlocationmode_a"]) {
		 var blockText = '<xml>' +
			  '<block type="setlocationmode_a">' +
			  '</block>' +
			  '</xml>';
		 var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
		 

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
	 if (Blockly.Blocks["input_time"]) {
		  var blockText = '<xml>' +
			  '<block type="input_time">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["e_timer"]) {
		  var blockText = '<xml>' +
			  '<block type="e_timer">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
}
function add_timer_xml(xmlList){

	 if (Blockly.Blocks["a_timer_after"]) {
		  var blockText = '<xml>' +
			  '<block type="a_timer_after">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_timer_every"]) {
		  var blockText = '<xml>' +
			  '<block type="a_timer_every">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_time"]) {
		  var blockText = '<xml>' +
			  '<block type="a_time">' +
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
	 if (Blockly.Blocks["a_week"]) {
		  var blockText = '<xml>' +
			  '<block type="a_week">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	} 
	 if (Blockly.Blocks["a_stop"]) {
		  var blockText = '<xml>' +
			  '<block type="a_stop">' +
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

}

function addXml(b){
	if(b == "any"){
		 if (Blockly.Blocks["any"]) {
			  var blockText = '<xml>' +
				  '<block type="any">' +
					  '<value name="p">'+
						  '<block type="specific_event">'+
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

