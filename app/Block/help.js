function generat_codition_input(c){
	var right = c.right;
	var left = c. left;
	var input = new Array
	if(!right)
		return ""
	else if(right.constructor == Condition){
		var i = generat_codition_input(right);
		input = input.concat(i);
	}else if (right.constructor == inputc){
		input.push(right.input);
	}

	if(!left)
		return ""
	else if(left.constructor == Condition){
		var i = generat_codition_input(right);
		input = input.concat(i);
	}else if (left.constructor == inputc){
		input.push(left.input);
	}

	return input
}

function smartApp(){
		var code
		eca_num = 0;
		var fileName = document.getElementById("name").value;
		if(fileName){
			var ecaList = Blockly.SmartThings.workspaceToCode(demoWorkspace);
			var prferences = null

			if(demoWorkspace2 != null){
				ecaList_g = ecaList
				var page_list = Blockly.SmartThings.workspaceToCode(demoWorkspace2);
				
				if(page_list){
					prferences = 'preferences{';
					  if(page_list.length === 1){
						 var section = page_list[0].section
						 prferences += section
					  }else{
						for(i in page_list){
							prferences +='\n\t'

							var page = page_list[i]
							var page_name = page.name
							var page_option = page.option
							var section = page.section

							if(page_option)
								prferences += 'page(name :"'+page_name+'", '+page_option+')' +'{\n'+section+'\n\t}';
							else
								prferences += 'page(name :"'+page_name+'")' +'{\n'+section+'\n\t}';
						}
					  }
					  prferences +='\n}';
				}
			}

			if(typeof prferences == "string"){ //ruel -> pre ->
				//pref is made
			}else{ //ruel ->
				var event_input ="";
				var action_input ="";
				var codition_input ="";

				for(i in ecaList){
					var input_e = ecaList[i].input_e_make;
					var input_a = ecaList[i].input_a_make;
					var input_c = generat_codition_input(ecaList[i].condition)

					//eliminate dutulicate
					var cSt_e = codition_input.indexOf(input_e.input);
					var eSt_e = event_input.indexOf(input_e.input);
					var aSt_e = action_input.indexOf(input_e.input);

					if(cSt_e == -1 && eSt_e == -1 && aSt_e == -1)
						event_input += "\n\t\t\t"+input_e.input;

					for(j in input_a){
						var cSt_a = codition_input.indexOf(input_a[j].input);
						var eSt_a = event_input.indexOf(input_a[j].input);
						var aSt_a = action_input.indexOf(input_a[j].input);
						if(cSt_a == -1 && eSt_a == -1 && aSt_a == -1)
							action_input += "\n\t\t\t"+input_a[j].input;

					}

					for(c in input_c){
						var cSt_a = codition_input.indexOf(input_c[c]);
						var eSt_a = event_input.indexOf(input_c[c]);
						var aSt_a = action_input.indexOf(input_c[c]);
						if(cSt_a == -1 && eSt_a == -1 && aSt_a == -1)
							codition_input += "\n\t\t\t"+input_c[c];

					}
				}

				prferences = 'preferences{ \n'+
										'\tsection(title : "event"){'+
										event_input + '\n'+
										'\t}\n'+
										'\tsection(title : "codition"){'+
										 codition_input + '\n'+
										'\t}\n'+
										'\tsection(title : "action"){'+
										 action_input + '\n'+
										'\t}\n'+
									'}';
			}

			//4 section combaine
			var subscribe = generating_subscribe(ecaList)
			var installed = "def installed() {\n" + subscribe +"}";
			var updated = "def updated() {\n\tunsubscribe()\n" +subscribe +"}";
			var predefined_callback= installed+"\n"+updated;

			var name = fileName;
			var author = document.getElementById("author").value;
			var category = document.getElementById("category").value;
			var category_text = document.getElementById("category").value;
			var description = document.getElementById("description").value;

			var definition ='definition( '+'\n'
			+'name: \"'+name+'\",'+"\n"
			+'namespace: \"Blockly\",'+"\n"
			+'author: \"'+author+'\",'+"\n"
			+'description: \"'+description+'\",'+"\n"
			+'category: \"'+category_text+'\",'+"\n"
			+'iconUrl: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqp6tX_F2iTdI8cOTCroeBQEfEnXphwWN3KnyOfDt1I8rr9-APiuotKc\",'+"\n"
			+'iconX2Url: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqp6tX_F2iTdI8cOTCroeBQEfEnXphwWN3KnyOfDt1I8rr9-APiuotKc\"'+"\n"+')';

			code = definition +"\n\n"+ prferences +"\n\n"+ predefined_callback +"\n\n"+ generating_eventHandler(ecaList);
		}else{
			alert("plz write the App name");
		}

	return code;
}

function generating_eventHandler(ecaList){
	var eventHandler = "";

	var devList = new Array;

	for(i in ecaList){
		devList = devList.concat(ecaList[i].event, ecaList[i].actionList)
	}

	for(i in ecaList){
		var event = ecaList[i].event;
		var condition = ecaList[i].condition;
		var actionList = ecaList[i].actionList;

		var input_e = ecaList[i].input_e_make;
		var input_a = ecaList[i].input_a_make;

		var predicate = generating_condition(condition, devList)
		var eh_condition= generating_eventHandler_condition(ecaList[i].event)
		var event_condition_battery= generating_event_condition(ecaList[i].event)

		//handlerMethod
		var handlerMethod = "def "+input_e.handler+"{\n"

		if(event_condition_battery)
			handlerMethod +="\tif("+event_condition_battery+")\n"

		//event handler
		if(eh_condition)
			handlerMethod +="\tif("+eh_condition+")\n"

		//predicate
		handlerMethod +="\tif("+predicate+"){\n"
		handlerMethod += ""

		//action
		for(a in actionList){
			if(actionList[a].method)
				handlerMethod += "\t\t"+actionList[a].method+"\n"			
			else if(actionList[a].command)
				handlerMethod += "\t\t"+actionList[a].command+"\n"			
		}

		handlerMethod += "\t}\n";
		handlerMethod += "}\n";

		eventHandler += handlerMethod;
	}
	return eventHandler;	
}

function generating_event_condition(event){
	var attr = attrMap.getNUMBER(event.device)
	if(attr){
		var if_condition = event.devname+'.currentValue("'+attr.device+'") == '+event.attr;
		return if_condition;
	}
	
	return null
}

function generating_condition(condition, devList){
	var if_condition = "?";

	if(condition.result){ //true, false, !p
		if(condition.result == 'true')
			if_condition = 'true';
		else if(condition.result == 'false')
			if_condition = 'false';
		else{
			var predicate = generating_condition(condition, devList)
			if_condition = '!'+predicate;
		}
	}else{ // p&&p, p||p, f <= fn, m <= n, fϵd  
		var operator = condition.operator
		var right = condition.right;
		var left = condition.left;

		if(operator == '&&' || operator == '||'){
			var pre_right = generating_condition(right, devList)
			var pre_left = generating_condition(left, devList)
			if_condition = " ("+pre_left+") "+operator+" ("+pre_right+") "
		}
		else if(operator == '==' || operator == '<'|| operator == '>'){
			//smartDevice
			
			if(right.constructor == inputc && left.constructor == inputc){ // field =< field
				var field_right = right
				var field_left = left

				if(field_right.device == field_left.device){
					if_condition = field_right.devname+'.currentState("'+field_right.device+'").value' + operator +field_left.devname+'.currentState("'+field_left.device+'").value'
				}else
					if_condition = "error1"

			}else if (right.constructor == inputc && left.constructor == Device_attr){// field =< n(attr)
				var field = right
				var dev_attr = left
				if_condition = field.devname+'.currentState("'+field.device+'").value'+ operator+'"'+dev_attr.attr+'"';

			}else if (right.constructor == inputc && !isNaN(left)){// field =< n(num)
				if_condition = right.devname+'.currentValue("'+right.device+'")'+ operator+left;
			}
			// currentState와 currentValue 구분 필요

		}else if(operator == 'ϵ'){//field ϵ device
			var field = right
			if_condition = field.devname+'.hasCapability("'+left+'")'
			
		}
	}

	return if_condition
}

function generating_eventHandler_condition(event){
	var from_condition = "true";
	//var to_condition = "true";

	if(event.event_handler){
		handler = event.event_handler
		if(handler.from != ".")
			return from_condition = '(\"'+ handler.from +'\" == ' + event.devname+".events(max: 2)[1].value)"
		//if(handler.to != ".")
			//to_condition =  '(\"'+ handler.to +'\" == evt.value)'	
		 //return from_condition;+ " && " + to_condition;

	}else
		return null
}

function generating_subscribe(ecaList){

	var subscribe = "";

	for(i in ecaList){
		var input_e = ecaList[i].input_e_make;
		subscribe += "\t"+input_e.subscribe+"\n";
	}
	return subscribe;
}

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

		  if (Blockly.Blocks["number"]) {
		  var blockText = '<xml>' +
			  '<block type="number">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}
}


