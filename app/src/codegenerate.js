function smartApp(ecaList){
	var code;
	var name = document.getElementById("name").value;

	if(name){
	
		//definition
		var definition = generating_definition()
		
		//preferences
		var preferences = generating_pref(ecaList)

		//predefined_callback
		var subscribe = generating_subscribe(ecaList)
		var method_atinstalled = generating_method_atinstalled(ecaList)
		var installed = "def installed() {\n" + subscribe + method_atinstalled+"}";
		var updated = "def updated() {\n\tunsubscribe()\n" +subscribe +"}";
		var predefined_callback= installed+"\n"+updated;
		
		//eventHandler
		var eventHandlers = generating_Handler(ecaList)
	
		//combining 4 section 
		code = definition +"\n\n"+ preferences +"\n\n"+ predefined_callback +"\n\n"+ eventHandlers;
	}else{
		alert("plz write the App name");
	}

	return code;
}


function generating_definition(){
	var name = document.getElementById("name").value;
	var author = document.getElementById("author").value;
	var namespace = document.getElementById("namespace").value
	var description = document.getElementById("description").value
	var iconUrl = document.getElementById("iconUrl").value
		
	var definition ='definition( '+'\n'+'name: \"'+name+'\",'+"\n"
	if(author)
		definition +=  'author: "'+ author +'"'+"\n"
	else
		definition += 'author: "SmartBlock",'+"\n"
	if(namespace)
		definition += 'namespace: "'+ namespace +'",'+"\n"
	else
		definition += 'namespace: "SmartBlock",'+"\n"
	if(description)
		definition += 'description: "'+ description +'",'+"\n"
	else 
		definition += 'description: "this app is made by SmartBlock",\n'
	if(iconUrl)
		definition +='iconUrl: \"'+iconUrl+'",'+"\n"
		+'iconX2Url: \"'+iconUrl+'"'+"\n"
	else
		definition +='iconUrl: "http://cs.sookmyung.ac.kr/~uslab/snowblock/logo1.png",'+"\n"
		+'iconX2Url: "http://cs.sookmyung.ac.kr/~uslab/snowblock/logo1.png"'+"\n"
	definition +=')';

	return definition
}

function generating_pref(ecaList){

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

	if(typeof prferences != "string"){ //ruel ->
		var event_input ="";
		var action_input ="";
		var codition_input ="";

		for(i in ecaList){
			var input_e = ecaList[i].input_e_make;
			var input_a = ecaList[i].input_a_make;
			var input_c = ecaList[i].input_c_make;

			//eliminate dutulicate
			for(e in input_e){
				var cSt_e = codition_input.indexOf(input_e[e].input);
				var eSt_e = event_input.indexOf(input_e[e].input);
				var aSt_e = action_input.indexOf(input_e[e].input);
				if(cSt_e == -1 && eSt_e == -1 && aSt_e == -1)
					if(input_e[e].input)
						event_input += "\n\t\t\t"+input_e[e].input;

			}

			for(j in input_a){
				var cSt_a = codition_input.indexOf(input_a[j].input);
				var eSt_a = event_input.indexOf(input_a[j].input);
				var aSt_a = action_input.indexOf(input_a[j].input);
				if(cSt_a == -1 && eSt_a == -1 && aSt_a == -1)
					if(input_a[j].input)
						action_input += "\n\t\t\t"+input_a[j].input;

			}

			for(c in input_c){
				var cSt_c = codition_input.indexOf(input_c[c].input);
				var eSt_c = event_input.indexOf(input_c[c].input);
				var aSt_c = action_input.indexOf(input_c[c].input);
				if(cSt_c == -1 && eSt_c == -1 && aSt_c == -1)
					if(input_c[c])
						codition_input += "\n\t\t\t"+input_c[c].input;

			}

		}

		prferences = 'preferences{ \n'+
								'\tsection(title : "When...(event)"){'+
								event_input + '\n'+
								'\t}\n'+
								'\tsection(title : "If...(condition)"){'+
								 codition_input + '\n'+
								'\t}\n'+
								'\tsection(title : "Then...(action)"){'+
								 action_input + '\n'+
								'\t}\n'+
							'}';
	}
	return prferences;
}


var condition_functionhandlerSet = new Set();
var action_functionhandlerSet = new Set();

function generating_Handler(ecaLists, devList){
	var handler_methods = "";

	var devList = new Array;

	for(var ecaList of ecaLists){
		devList = devList.concat(ecaList.event, ecaList.actionList)
	}

	var timerHandlerMethod = new Map();
	//handlerMethod
	for(var ecaList of ecaLists){
		if(ecaList.input_e_make[0].handler){  //event handler

			var event = ecaList.event;
			var condition = ecaList.condition;
			var actionList = ecaList.actionList;

			//handlerMethod
			var eventHandler = "def "+ecaList.input_e_make[0].handler+"{\n" ;
			
			//event handler for specified
			var eh_condition= generating_eventHandler_condition(ecaList.event)
			if(eh_condition)
				eventHandler +="\tif("+eh_condition+")\n"


			//predicate
			var predicate = generating_condition(condition, devList)
			eventHandler +="\tif("+predicate+"){\n"
			
			//action
			eventHandler += generating_action(actionList)

			eventHandler += "\t}\n";
			eventHandler += "}\n";

			handler_methods += eventHandler

		}else if(ecaList.event.timerhandler){ //timer handler
			var key_handler = ecaList.event.timerhandler
			if(timerHandlerMethod.has(key_handler)){
				var ecaLists = timerHandlerMethod.get(key_handler)
				ecaLists = ecaLists.concat(ecaList)
				timerHandlerMethod.set(key_handler,ecaLists)

			}else{
				timerHandlerMethod.set(key_handler, [ecaList])
			}
		}
	}

	handler_methods += generating_timerHandler(timerHandlerMethod, devList)
	handler_methods += generating_condition_functionhandler(condition_functionhandlerSet)
	handler_methods += generating_action_functionhandler(action_functionhandlerSet)

	return handler_methods;	
}


function generating_condition_functionhandler(functionhandlerSet){
	
	var functionhandler = ""
	for (var handler of functionhandlerSet) {
		functionhandler += "\ndef "+handler+"(){\n\tdef result = true \n\treturn result \n}";
	}
	return functionhandler

}
function generating_action_functionhandler(functionhandlerSet){
	
	var functionhandler = ""
	for (var handler of functionhandlerSet) {
		functionhandler += "\ndef "+handler+"(){\n\n}";
	}
	return functionhandler

}
function generating_timerHandler(timerHandlerMap, devList){
	var timerHandler = ""
	
	timerHandlerMap.forEach(function (item, key, mapObj) {
		var handler = key
		var ecaLists = item

		var timerHandlerMethod = "def "+handler+"(){\n";

		for(var ecaList of ecaLists){
			var event = ecaList.event;
			var condition = ecaList.condition;
			var actionList = ecaList.actionList;

			//handlerMethod
			//predicate
			var predicate = generating_condition(condition, devList)
			timerHandlerMethod +="\tif("+predicate+"){\n"

			//action
			timerHandlerMethod += generating_action(actionList)

			timerHandlerMethod += "\t}\n";
			
		}
		
		timerHandlerMethod += "}\n";

		timerHandler += timerHandlerMethod
	});

	return timerHandler
}

function generating_action(actionList){
	var actions = ""
	//action
	for(var action of actionList){
		if(action.timerhandler){
			var time = action.time
			var timerhandler = action.timerhandler
			actions += "\t\trunIn("+time+", "+timerhandler+")\n"	
				
		}else if(action.command && typeof action.command == "string"){ //device command
			actions += "\t\t"+action.command+"\n"		
		}else if(action.method){ 
			if(action.method.constructor == String){ //send method
				actions += "\t\t"+action.method+"\n"		
			}else{	//device method
				var action_method = action.devname + "."+action.method.id+"("+ action.method.value +")"
				actions += "\t\t"+action_method+"\n"		
				
			}	
		}else if(action.state){ //state
			actions += "\t\t"+action.state_command+"\n"		
		}else if(action.functionhandler){ //function call
			actions += "\t\t"+action.functionhandler+"\n"
			action_functionhandlerSet.add(action.functionhandler)
		}
	}
	return actions
}

function generating_timerhandler(eca){
	var timerhandler = "" 

	var event = eca.event;
	var condition = eca.condition;
	var actionList = eca.actionList;

	if(event.timerhandler){
		timerhandler += "def "+event.timerhandler+"(){\n"	
		for(var action of actionList){
			if(action.method)
				timerhandler += "\t"+action.method+"\n"			
			else if(action.command)
				timerhandler += "\t"+action.command+"\n"		
		}
		timerhandler += "}\n"	
	}

	return timerhandler
}

function generating_condition(condition, devList){
	var if_condition = "?";

	if(condition.constructor == Grouping){
		var i = generating_condition(condition.p, condition.list)
		if(condition.type == "all")
			if_condition = i.replace(/%/gi, "&&")
		else if (condition.type == "exists")
			if_condition = i.replace(/%/gi, "||")
		
	}else{
		if(condition.result == 'true')
			if_condition = 'true';
		else if(condition.result == 'false')
			if_condition = 'false';
		else if(condition.operator == "!" && condition.right){
			var predicate = generating_condition(condition.right, devList)
			if_condition = '!('+predicate+")";
		}else if(condition.operator == "is_null"){ 
			var value = condition.result

		  if(value.constructor == Inputc){
			if_condition = condition.result.devname
		  }else if(value.constructor == API){
			if_condition = condition.result.value
		  }

		}else if(condition.result && condition.result.constructor == Already){ //already
			var already = condition.result
			var input = already.input
			var time = already.time
			var attr_value = already.attr_value
			var operator = already.operator

			var devname = input.devname
			if(already.type == "already_enum"){
				var attr_id = attrMap.getENUM_id(input.device)
				if_condition = "("+devname+'.eventsSince(new Date(now() - (1000 * 60 * '+time+')))?.findAll { it.name == \"'+attr_id+'\" }).count { it.value && it.value == \"'+attr_value+'\" } > 1' 
			}
			else if(already.type == "already_num"){
				var attr_id = attrMap.getNUM_id(input.device)
				if_condition = "("+devname+'.eventsSince(new Date(now() - (1000 * 60 * '+time+')))?.findAll { it.name == \"'+attr_id+'\" }).count { it.doubleValue '+operator+' '+attr_value+' } > 1' 
			}
			else if(already.type == "happen_enum_dropdown"){ // it is happen?
				var attr_id = attrMap.getENUM_id(input.device)
				if_condition = devname+'.'+time+'.count { it.value && it.value == \"'+attr_value+'\" } > 0' 
			}
			else if(already.type == "already_num_dropdown"){
				var attr_id = attrMap.getNUM_id(input.device)
				if_condition = devname+'.'+time+'.count { it.value && it.value == \"'+attr_value+'\" } > 0' 
			}
				
		}else if(condition.functionhandler){ //functionhandler
			condition_functionhandlerSet.add(condition.functionhandler)
			if_condition = condition.functionhandler+"()"
		}else{ // p&&p, p||p, f <= fn, m <= n, fϵd  
			var operator = condition.operator
			var right = condition.right;
			var left = condition.left;

			if(operator == '&&' || operator == '||'){
				var pre_right = generating_condition(right, devList)
				var pre_left = generating_condition(left, devList)
				if_condition = " ("+pre_left+") "+operator+" ("+pre_right+") "
			}else if(operator == '==' || operator == '<'|| operator == '>' || operator == '!=' || operator == '>='|| operator == '=<'){
				//smartDevice
				if(right == "%grouping"){ // grouping
					var i = ""
					for(var inputc of devList){
						var device = inputc.device
						var devname = inputc.devname
						var dev_attr = left


						if(attrMap.onlyInENUM(device)){
							var field_attr = attrMap.getENUM(device)
							i = i + '(' + devname+'.currentState("'+field_attr.id+'").value '+ operator+' "'+dev_attr.attr+'") % ';

						}else if(attrMap.onlyInNUMBER(device)){
							var field_attr = attrMap.getNUMBER(device)
							i = i + '(' + devname+'.currentValue("'+field_attr.id+'") '+ operator+' "'+dev_attr+'")  %';
						}
					}
					i = i+"%"
					if_condition = i.replace(" % %","")
					
				}else{ //node
					
					if_condition = generating_node(right)
					if_condition = if_condition +" "+ operator+" "
					if_condition = if_condition+ generating_node(left)
				}
			
			}else if(operator == 'ϵ'){//field ϵ device
				var field = right
				if_condition = field.devname+'.hasCapability("'+left+'")'

			}else if(operator == '∉'){//field ∉ device
				var field = right
				if_condition = "!("+field.devname+'.hasCapability("'+left+'"))'

			}
		}
	}

	return if_condition
}
function generating_node(field){

	var if_condition = "?"

	if(field.constructor == Inputc){
		if(attrMap.onlyInENUM(field.device)){//device 
			var right_attr = attrMap.getENUM(field.device)
			if_condition = field.devname+'.currentState("'+right_attr.id+'").value ' //+ operator +" "+field_left.devname+'.currentState("'+left_attr.id+'").value'
		}else if(attrMap.onlyInNUMBER(field.device)){ //device 
			var right_attr = attrMap.getNUMBER(field.device)
			if_condition = field.devname+'.currentValue("'+right_attr.id+'")' 
		}else if(field.name){
			if_condition = field.name
		}
	}else if (field.constructor == Attribute){// device field =< n(attr)	
		if(attrMap.onlyInENUM(field.device)){
			var field_attr = attrMap.getENUM(field.device)
			if_condition = ' "'+field.attr+'"';

		}else if(attrMap.onlyInNUMBER(field.device)){
			var field_attr = attrMap.getNUMBER(field.device)
			if_condition =' '+field.attr;
		}else if(attrMap.hasMultiTypeNUMBER(field.device)){
			var field_attr = attrMap.getNUMBER(field.device)
			if_condition = ' "'+field.attr+'"';
		}
	}else if (field.constructor == Calculation){// Calculation	

		if_condition =  field.left+" "+field.operation+" "+field.right;

	}else if(field.constructor == String){
	  //hard coding data
		if(isNaN(field) && field != 'null') //hard coding data
			if_condition = '\"'+field+ '\"'//string
		else
			if_condition = field
		
	}else if(field.constructor == API && field.value){
		if_condition = field.value
	}

	return if_condition
}

function generating_eventHandler_condition(event){
	
	var from_condition = "true"
	if(event.constructor == Event){
		var handler = event.event_handler
		if(handler)
			if(handler.from != ".")
				return '(' + event.devname+'.events(max: 2)[1].value) == ' +'\"'+ handler.from +'\"'                       
		
	}else if(event.constructor == Grouping){
		var handler = event.p
		if(handler)
			if(handler.from != ".")
				return '(evt.getDevice().events(max: 2)[1].value == \"'+ handler.from +'\")'
	}
	return null
}

function generating_subscribe(ecaList){

	var subscribe = "";

	for(i in ecaList){
		var input_list = ecaList[i].input_e_make;
		for(e in input_list){
			var input_e = input_list[e]
			var subSt_e = subscribe.indexOf(input_e.subscribe);
			if(subSt_e == -1 && input_e.subscribe)
				subscribe += "\t"+input_e.subscribe+"\n";
		}

	}
	return subscribe;
}

function generating_method_atinstalled(ecaList){

	var method_atinstalled = "";

	for(i in ecaList){
		var input_list = ecaList[i].input_e_make;
		for(e in input_list){
			var input_e = input_list[e]
			var subSt_e = method_atinstalled.indexOf(input_e.handler);
			if(subSt_e == -1 && input_e.handler)
				method_atinstalled += "\t"+input_e.handler+"\n";
		}

	}
	return method_atinstalled;
}




/*

function generat_codition_input(c){
	var right = c.right;
	var left = c. left;
	var input = new Array
	if(!right)
		return ""
	else if(right.constructor == Condition){
		var i = generat_codition_input(right);
		input = input.concat(i);
	}else if (right.constructor == Inputc){
		input.push(right.input);
	}

	if(!left)
		return ""
	else if(left.constructor == Condition){
		var i = generat_codition_input(right);
		input = input.concat(i);
	}else if (left.constructor == Inputc){
		input.push(left.input);
	}

	return input
}

	
function generating_eventHandler(ecaList, devList){

	var event = ecaList.event;
	var condition = ecaList.condition;
	var actionList = ecaList.actionList;

	//handlerMethod
	var eventHandler = "def "+ecaList.input_e_make[0].handler+"(){\n" ;
	
	//event handler
	var eh_condition= generating_eventHandler_condition(ecaList.event)
	if(eh_condition)
		eventHandler +="\tif("+eh_condition+")\n"


	//predicate
	var predicate = generating_condition(condition, devList)
	eventHandler +="\tif("+predicate+"){\n"

	//action
	eventHandler += generating_action(actionList)

	eventHandler += "\t}\n";
	eventHandler += "}\n";
	
	return eventHandler;	
}
*/