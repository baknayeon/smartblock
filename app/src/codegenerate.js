function smartApp(){
	var code;
	var name = document.getElementById("name").value;

	if(name){

		var ecaList = Blockly.SmartThings.workspaceToCode(demoWorkspace);
	
		//definition
		var definition = generating_definition()
		
		//prferences
		var prferences = generating_pref(ecaList)

		//predefined_callback
		var subscribe = generating_subscribe(ecaList)
		var installed = "def installed() {\n" + subscribe +"}";
		var updated = "def updated() {\n\tunsubscribe()\n" +subscribe +"}";
		var predefined_callback= installed+"\n"+updated;
		
		//eventHandler
		var eventHandler = generating_eventHandler(ecaList)
	
		//4 section combaine
		code = definition +"\n\n"+ prferences +"\n\n"+ predefined_callback +"\n\n"+ eventHandler;
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
			var input_c 

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

			if(ecaList[i].condition.constructor == Grouping){
				input_c = ecaList[i].condition.list
				for(c in input_c){
					var cSt_c = codition_input.indexOf(input_c[c].input);
					var eSt_c = event_input.indexOf(input_c[c].input);
					var aSt_c = action_input.indexOf(input_c[c].input);
					if(cSt_c == -1 && eSt_c == -1 && aSt_c == -1)
						if(input_c[c])
							codition_input += "\n\t\t\t"+input_c[c];

				}
			}else{
				input_c = generat_codition_input(ecaList[i].condition)
				for(c in input_c){
					var cSt_c = codition_input.indexOf(input_c[c]);
					var eSt_c = event_input.indexOf(input_c[c]);
					var aSt_c = action_input.indexOf(input_c[c]);
					if(cSt_c == -1 && eSt_c == -1 && aSt_c == -1)
						if(input_c[c])
							codition_input += "\n\t\t\t"+input_c[c];

				}
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
						handlerMethod += "\t\trunIn("+time+", "+timerhandler+")\n"	
					}
						
				}else if(action.method)
					handlerMethod += "\t\t"+action.method+"\n"			
				else if(action.command)
					handlerMethod += "\t\t"+action.command+"\n"			
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
				if(right.constructor == Inputc){
					if(left.constructor == Inputc){ // field =< field
						var field_right = right
						var field_left = left

						if(attrMap.isOnlyENUM(field_right.device)){
							var right_attr = attrMap.getENUM(field_right.device)
							var left_attr = attrMap.getENUM(field_left.device)
							if_condition = field_right.devname+'.currentState("'+left_attr.id+'").value ' + operator +" "+field_left.devname+'.currentState("'+right_attr.id+'").value'
						}else if(attrMap.isOnlyNUMBER(field_right.device)){
							var right_attr = attrMap.getNUMBER(field_right.device)
							var left_attr = attrMap.getNUMBER(field_left.device)
							if_condition = right.devname+'.currentValue("'+left_attr.id+'")' + operator +field_left.devname+'.currentValue("'+right_attr.id+'")'
						}

					}else if (left.constructor == Device_attr){// field =< n(attr)
						var field = right
						var dev_attr = left


						if(attrMap.isOnlyENUM(field.device)){
							var field_attr = attrMap.getENUM(field.device)
							if_condition = field.devname+'.currentState("'+field_attr.id+'").value '+ operator+' "'+dev_attr.attr+'"';

						}else if(attrMap.isOnlyNUMBER(field.device)){
							var field_attr = attrMap.getNUMBER(field.device)
							if_condition = field.devname+'.currentValue("'+field_attr.id+'") '+ operator+' "'+dev_attr.attr+'"';
						}


					}else if (!isNaN(left)){// field =< n(num)
						var field_attr = attrMap.getNUMBER(right.device)
						if_condition = right.devname+'.currentValue("'+field_attr.id+'") '+ operator+" "+left;
					}
					// currentState와 currentValue 구분 필요
				}else if(right == "%grouping"){ // grouping
					var i = ""
					for(var inputc of devList){
						var device = inputc.device
						var devname = inputc.devname
						var dev_attr = left


						if(attrMap.isOnlyENUM(device)){
							var field_attr = attrMap.getENUM(device)
							i = i + '(' + devname+'.currentState("'+field_attr.id+'").value '+ operator+' "'+dev_attr+'") % ';

						}else if(attrMap.isOnlyNUMBER(device)){
							var field_attr = attrMap.getNUMBER(device)
							i = i + '(' + devname+'.currentValue("'+field_attr.id+'") '+ operator+' "'+dev_attr+'")  %';
						}
					}
					i = i+"%"
					if_condition = i.replace(" % %","")
					
				}

			}else if(operator == 'ϵ'){//field ϵ device
				var field = right
				if_condition = field.devname+'.hasCapability("'+left+'")'

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

