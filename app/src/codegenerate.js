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
		var installed = "def installed() {\n" + subscribe +"}";
		var updated = "def updated() {\n\tunsubscribe()\n" +subscribe +"}";
		var predefined_callback= installed+"\n"+updated;
		
		//eventHandler
		var eventHandlers = generating_eventHandler(ecaList)
	
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

		var input_e_make = ecaList[i].input_e_make;

		//for(var input_e of input_e_make){
		
			var event_condition_battery= generating_event_condition(ecaList[i].event)
			var eh_condition= generating_eventHandler_condition(ecaList[i].event)
			var predicate = generating_condition(condition, devList)

			//handlerMethod
			var handlerMethod = "def "+input_e_make[0].handler+"{\n"

			if(event_condition_battery)
				handlerMethod +="\tif("+event_condition_battery+")\n"

			//event handler
			if(eh_condition)
				handlerMethod +="\tif("+eh_condition+")\n"

			//predicate
			handlerMethod +="\tif("+predicate+"){\n"

			//action
			var timer = new Map();
			for(var action of actionList){
				if(action.timerhandler){
					
					var time = action.timer
					var timerhandler = action.timerhandler
					if(timer.has(timerhandler)){
						var timer_actions = timer.get(timerhandler)
						timer_actions = timer_actions.concat(action)
						timer.set(timerhandler,timer_actions)

					}else{
						timer.set(timerhandler,[action])
						if(time[0] == "0"){
							time[0] = 0
							handlerMethod += '\t\tschedule(\"'+time+'\", '+timerhandler+")\n"	

						}
						else
							handlerMethod += "\t\trunIn("+time+", "+timerhandler+")\n"	
					}
						
				}else if(action.method && typeof action.method == "string" ){ //send method
					handlerMethod += "\t\t"+action.method+"\n"		
				}	
				else if(action.command && typeof action.command == "string") //device command
					handlerMethod += "\t\t"+action.command+"\n"		
				else if(action.method && action.method.constructor && action.method.constructor == Command_method){ //device method
					var action_method = action.devname + "."+action.method.id+"("+ action.method.args +")"
					handlerMethod += "\t\t"+action_method+"\n"		
				}else if(action.state){ //state
					handlerMethod += "\t\t"+action.state_command+"\n"		
				}
			}

			handlerMethod += "\t}\n";
			handlerMethod += "}\n";

			eventHandler += handlerMethod;
			eventHandler += generating_timerhandler(timer)

		//}
	}
	return eventHandler;	
}

function generating_timerhandler(timer){
	var timerhandler = "" 

	for (var [key, actionList] of timer) {	
		timerhandler += "def "+key+"(){\n"	
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

function generating_event_condition(event){
	var attr = attrMap.getNUMBER(event.device)
	if(attr && event.attr){
		var if_condition = event.devname+'.currentValue("'+attr.id+'") == '+event.attr;
		return if_condition;
	}
	
	return null
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
		if(condition.result){ //true, false
			if(condition.result == 'true')
				if_condition = 'true';
			else if(condition.result == 'false')
				if_condition = 'false';
		}else if(condition.operator == "!"){ //!p
			var predicate = generating_condition(condition.right, devList)
			if_condition = '!('+predicate+")";
		}else if(condition.already){
			var already = condition.already
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
				
		}else{ // p&&p, p||p, f <= fn, m <= n, fϵd  
			var operator = condition.operator
			var right = condition.right;
			var left = condition.left;

			if(operator == '&&' || operator == '||'){
				var pre_right = generating_condition(right, devList)
				var pre_left = generating_condition(left, devList)
				if_condition = " ("+pre_left+") "+operator+" ("+pre_right+") "
			}
			else if(operator == '==' || operator == '<'|| operator == '>' || operator == '!=' || operator == '≤'|| operator == '≥'){
				//smartDevice
				if(right.constructor == Inputc){
					if(left.constructor == Inputc){ // device field =< Inputc field
						var field_right = right

						if(attrMap.onlyInENUM(field_right.device)){//device 
							var right_attr = attrMap.getENUM(field_right.device)
							if_condition = field_right.devname+'.currentState("'+right_attr.id+'").value ' //+ operator +" "+field_left.devname+'.currentState("'+left_attr.id+'").value'
						}else if(attrMap.onlyInNUMBER(field_right.device)){ //device 
							var right_attr = attrMap.getNUMBER(field_right.device)
							if_condition = right.devname+'.currentValue("'+right_attr.id+'")' //+ operator +field_left.devname+'.currentValue("'+left_attr.id+'")'
						}else if(field_left.name){
							if_condition = if_condition +field_right.name
						}

						if_condition = if_condition + operator

						var field_left = left
						if(attrMap.onlyInENUM(field_left.device)){//device =< device
							var left_attr = attrMap.getENUM(field_left.device)
							if_condition =  if_condition+" "+field_left.devname+'.currentState("'+left_attr.id+'").value'
						}else if(attrMap.onlyInNUMBER(field_left.device)){ //device 
							var left_attr = attrMap.getNUMBER(field_left.device)
							if_condition = if_condition+" "+field_left.devname+'.currentValue("'+left_attr.id+'")'
						}else if(field_left.name){
							if_condition = if_condition +field_left.name
						}

					}else if (left.constructor == Attribute){// device field =< n(attr)
						var field = right
						var dev_attr = left


						if(attrMap.onlyInENUM(field.device)){
							var field_attr = attrMap.getENUM(field.device)
							if_condition = field.devname+'.currentState("'+field_attr.id+'").value '+ operator+' "'+dev_attr.attr+'"';

						}else if(attrMap.onlyInNUMBER(field.device)){
							var field_attr = attrMap.getNUMBER(field.device)
							if_condition = field.devname+'.currentValue("'+field_attr.id+'") '+ operator+' '+dev_attr.attr;
						}else if(attrMap.hasMultiTypeNUMBER(field.device)){
							var field_attr = attrMap.getNUMBER(field.device)
							if_condition = field.devname+'.currentValue("'+field_attr.id+'") '+ operator+' "'+dev_attr.attr+'"';
						}


					}else if (!isNaN(left.value)){// device field =< n(num)
						var field = right
						
						if(field.constructor == Inputc){
							if(attrMap.onlyInNUMBER(field.device)){
								var field_attr = attrMap.getNUMBER(field.device)
								if_condition = field.devname+'.currentValue("'+field_attr.id+'") '
							}else if(field.name){ //input data
								if_condition = field.name
							}
						}else if(field.constructor == Number){
							if(field.value){ //hard coding data
								if_condition =  '\"'+field.value+ '\"'
							}
						}

						if_condition = if_condition + " "+ operator +" "


						field = left
						if(field.constructor == Inputc){
							if(attrMap.onlyInNUMBER(field.device)){
								var field_attr = attrMap.getNUMBER(field.device)
								if_condition = if_condition + field.devname+'.currentValue("'+field_attr.id+'") '
							}else if(field.name){//input data
								if_condition = if_condition + field.name
							}
						}else if(field.constructor == Number){
							if(field.value){  //hard coding data
								if_condition = if_condition + field.value 
							}
						}

					}
					// currentState와 currentValue 구분 필요
				}else if(right == "%grouping"){ // grouping
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
					
				}else if(right.constructor == String || left.constructor == String ){ //inputc data
					if(right.constructor == String){
						if_condition = right 
					}else if(right.constructor == Inputc){ // inputc data
							if(attrMap.onlyInNUMBER(right.device)){
								var field_attr = attrMap.getNUMBER(right.device)
								if_condition = right.devname+'.currentValue("'+field_attr.id+'") '
							}else if(right.name){ //input data
								if_condition = right.name
							}
					}else if(right.constructor == Number){
						if(isNaN(right.value)){ //hard coding 
							if_condition = '\"'+right.value+ '\"'
						}else
							if_condition = right.value
					}

					if_condition = if_condition +" "+ operator+" "

					if(left.constructor == String){
						if_condition = if_condition + left 
					}else if(left.constructor == Inputc){ //inputc data
							if(attrMap.onlyInNUMBER(left.device)){
								var field_attr = attrMap.getNUMBER(left.device)
								if_condition = if_condition + left.devname+'.currentValue("'+field_attr.id+'") '
							}else if(left.name){ //input data
								if_condition = if_condition + left.name
							}
					}else if(left.constructor == Number){
						if(isNaN(left.value)){ //hard coding data
							if_condition = if_condition +'\"'+left.value+ '\"'//string
						}else
							if_condition = if_condition + left.value
					}
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
			if(subSt_e == -1)
				subscribe += "\t"+input_e.subscribe+"\n";
		}

	}
	return subscribe;
}

