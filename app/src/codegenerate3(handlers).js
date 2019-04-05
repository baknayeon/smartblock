
var condition_functionhandlerSet = new Set();
var action_functionhandlerSet = new Set();

function generating_Handler(ecaLists, devList){
	var handler_methods = "";

	var devList = new Array;

	for(var ecaList of ecaLists){
		devList = devList.concat(ecaList.event, ecaList.actionList)
	}

	var timerHandlerMethod = new Map();
	var predefinedMethods = new Map();
	var subscribeMethods = new Map();
	var anyGrouingHandlers =  new Map();

	//handlerMethod
	for(var ecaList of ecaLists){

		var event = ecaList.event;
		var condition = ecaList.condition;
		var actionList = ecaList.actionList;
		var input_e = ecaList.input_e_make[0]
		if(event.timerhandler){ //timer
			var key_handler = input_e.timerhandler
			if(timerHandlerMethod.has(key_handler)){
				var ecaLists = timerHandlerMethod.get(key_handler)
				ecaLists = ecaLists.concat(ecaList)
				timerHandlerMethod.set(key_handler,ecaLists)

			}else{
				timerHandlerMethod.set(key_handler, [ecaList])
			}

		}else if(event.predefined_method){ // predefined_method
			var key_handler = input_e.handler
			if(predefinedMethods.has(key_handler)){
				var ecaLists = predefinedMethods.get(key_handler)
				ecaLists = ecaLists.concat(ecaList)
				predefinedMethods.set(key_handler,ecaLists)
			}else{
				predefinedMethods.set(key_handler, [ecaList])
			}

		}else if(event.device || event.time || event.abstract_ || event.constructor == Grouping ){// event from dev and schedule and location, app

			//handlerMethod
			var eventHandler = "def "+input_e.handler+"{\n" ;

			//event handler for specified
			var eh_condition= generating_eventHandler_condition(event)
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
		}else if(event.handler){// event from dev and schedule and location, app
			var key_handler = event.handler
			if(subscribeMethods.has(key_handler)){
				var ecaLists = subscribeMethods.get(key_handler)
				ecaLists = ecaLists.concat(ecaList)
				subscribeMethods.set(key_handler,ecaLists)
			}else{
				subscribeMethods.set(key_handler, [ecaList])
			}
		}
	}



	handler_methods += generating_handlerFromMap(subscribeMethods, devList)
	handler_methods += generating_handlerFromMap(predefinedMethods, devList)
	handler_methods += generating_handlerFromMap(timerHandlerMethod, devList)
	handler_methods += generating_condition_functionhandler(condition_functionhandlerSet)
	handler_methods += generating_action_functionhandler(action_functionhandlerSet)

	return handler_methods;	
}


function generating_handlerFromMap(map, devList){

	var methods = "";
	
	map.forEach(function (item, key, mapObj) {
		var method_name = key
		var ecaLists = item
		var handler = ecaLists["0"].input_e_make[0].handler
		var method = "def "+handler+"{\n";

		for(var ecaList of ecaLists){
			var event = ecaList.event;
			var condition = ecaList.condition;
			var actionList = ecaList.actionList;

			//predicate
			var predicate = generating_condition(condition, devList)
			 method +="\tif("+predicate+"){\n"

			//action
			method += generating_action(actionList)
			method += "\t}\n";
		}

		method += "}\n";
		methods += method
	});

	return methods
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

function generating_action(actionList){
	var exprs = ""
	for(var action of actionList){
		var expr = "?"
		//action
		if(action.timerhandler){
			if(action.timer_type == "after"){
				var time = generating_node(action.time)
				var timerhandler = action.timerhandler
				expr = "\t\trunIn("+time+", "+timerhandler+")\n"	
			}else if(action.timer_type == "every"){
				var time = generating_node(action.time)
				var timerhandler = action.timerhandler
				expr = "\t\tschedule("+time+", "+timerhandler+")\n"	

			}

		}else if(action.command && typeof action.command == "string"){ //device command
			expr =  "\t\t"+action.command+"\n"		
		}else if(action.method){ 
			if(action.method.constructor == String){ //send method
				expr =  "\t\t"+action.method+"\n"		
			}else{	//device method
				var args = generating_node(action.method.args)
				var method = action.method.id

				/*if(method == "setColor")
					args = "[color: "+args+"]"
				else if(method == "setHue")
					args = "[hue: "+args+"]"
				else if(method == "setSaturation")
					args = "[saturation: "+args+"]"	*/

				var action_method = action.devname + "."+method+"("+ args +")"
				expr =  "\t\t"+action_method+"\n"		

			}	
		}else if(action.state){ //state
			expr =  "\t\t"+action.state_command+"\n"		
		}else if(action.functionhandler){ //function call
			expr =  "\t\t"+action.functionhandler+"()\n"
			action_functionhandlerSet.add(action.functionhandler)
		}else if(action.constructor == Grouping){
			var list = action.list
			for(var a of list)
				expr = "\t\t"+a.command+"\n"	
		}
		exprs += expr
	}

	return exprs
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

			var field = condition.result
			if(field.constructor == Inputc){
				if(field.device)
					if_condition = field.devname
				else if(field.type)
					if_condition = field.name
				
			}else if(field.constructor == String){
				if(isNaN(field) && field != 'null') //hard coding data
					if_condition = '\"'+field+ '\"'//string
				else
					if_condition = field

			}else if(field.constructor == API && field.value){
				if_condition = field.value
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
			}else if(operator == '==' || operator == '<'|| operator == '>' || operator == '!=' || operator == '>='|| operator == '<='){
				//smartDevice
				if(right == "%grouping"){ // grouping
					var expr= ""
					for(var inputc of devList){
						var device = returnName(inputc.device)
						var devname = inputc.devname
						var dev_attr = left

						expr = expr + generating_node(inputc)
						expr = expr + " " + operator+ " "
						expr = expr + generating_node(left)
						expr = expr +' % ';
						
					}
					expr = expr+"%"
					if_condition = expr.replace(" % %","")
					
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

	var if_condition = "?generating_node"

	if(field.constructor == Inputc || field.constructor == Inputa){
		if(attrMap.onlyInENUM(field.device)){//device 
			var right_attr = attrMap.getENUM(field.device)
			if_condition = field.devname+'.currentState("'+right_attr.id+'").value ' //+ operator +" "+field_left.devname+'.currentState("'+left_attr.id+'").value'
		}else if(attrMap.onlyInNUMBER(field.device)){ //device 
			var right_attr = attrMap.getNUMBER(field.device)
			if_condition = field.devname+'.currentValue("'+right_attr.id+'")' 
		}else if(attrMap.isMultiple(field.device)){ //device 
			var right_attr = attrMap.getMultipleMethod_byid(field.device, field.attribute_id)
			if(right_attr.type == "ENUM")
				if_condition = field.devname+'.currentState("'+right_attr.id+'").value ' 
			else if(right_attr.type == "NUMBER")
				if_condition = field.devname+'.currentValue("'+right_attr.id+'")' 
		}else {
			if(field.type)
				if_condition = field.name
			else if(field.device)
				if_condition = field.devname
		}
	}else if (field.constructor == Attribute){// device field <= n(attr)	
		if(attrMap.onlyInENUM(field.device)){
			var field_attr = attrMap.getENUM(field.device)
			if_condition = ' "'+field.attr+'"';

		}else if(attrMap.onlyInNUMBER(field.device)){
			var field_attr = attrMap.getNUMBER(field.device)
			if_condition =' '+field.attr;
		}else if(attrMap.isMultiple(field.device)){
			var attr_type = attrMap.getMultipleMethod_type_byid(field.device, field.attribute_id) 
			if(attr_type == "ENUM")
				if_condition = ' "'+field.attr+'"';
			else if(attr_type == "NUMBER")
				if_condition = field.attr;
		}
	}else if (field.constructor == Calculation){// Calculation	
		var lefe = generating_node(field.left)
		var right = generating_node(field.right)
		if_condition = "("+ lefe +" "+field.operator+" "+right + ")";

	}else if(field.constructor == String){
	  //hard coding data
		if(isNaN(field) && field != 'null' && field != 'true' && field != 'false'  && field == "") //hard coding data
			if_condition = '\"'+field+ '\"'//string
		if(field == "") //hard coding data
			if_condition = '\"\"'//string
		else		
			if_condition = field
		
	}else if(field.constructor == Number ){
	  //hard coding data
		if_condition = field
		
	}else if(field.constructor == API && field.value != null){
		if_condition = field.value
	}else if(field.constructor == Occurrences){ //Occurrences
			
			var input = field.input
			var devname = input.devname

			if(field.type == "already_enum"){
				var time = field.time
				var event_value = field.event_value
				var attr_id = attrMap.getENUM_id(input.device)
				if(time.constructor == Inputc){
					if(time.device)
						time = time.devname
					else if(time.type)
						time = time.name

					if_condition = "("+devname+'.eventsSince(new Date(now() - (1000 * 60 * '+time+'))).findAll { it.name == \"'+attr_id+'\" }).count { it.value && it.value == \"'+event_value+'\" }' 

				}else if(time.constructor != Inputc){
					time = generating_node(time)
					if_condition = "("+devname+'.eventsSince(new Date(now() - ('+time+'))).findAll { it.name == \"'+attr_id+'\" }).count { it.value && it.value == \"'+event_value+'\" }' 

				}
					
							}
			else if(field.type == "already_num"){
				var time = field.time
				var operator = field.operator
				var compare = field.compare
				if(time.constructor == Inputc){
					if(time.device)
						time = time.devname
					else if(time.type)
						time = time.name
				}else{
					time = generating_node(time)
				}

			   if(compare.constructor == Inputc){
					if(compare.device)
						compare = compare.devname
					else if(compare.type)
						compare = compare.name
			   }else if(compare.constructor == Calculation){
					compare = generating_node(compare)
			   }
  

				var attr_id = attrMap.getNUM_id(input.device)
				if_condition = "("+devname+'.eventsSince(new Date(now() - (1000 * 60 * '+time+')))?.findAll { it.name == \"'+attr_id+'\" }).count { it.doubleValue '+operator+' '+compare+' } ' 
			}
			else if(field.type == "happen_enum_dropdown"){ // it is happen?

				var time = field.time
				var event_value = field.event_value

				var attr_id = attrMap.getENUM_id(input.device)
				if_condition = devname+'.'+time+'.count { it.value && it.value == \"'+event_value+'\" } ' 
			}
			else if(field.type == "already_num_dropdown"){
				var attr_id = attrMap.getNUM_id(input.device)
				if_condition = devname+'.'+time+'.count { it.value && it.value == \"'+event_value+'\" } ' 
			}
				
		}

	return if_condition
}

function generating_condition_functionhandler(functionhandlerSet){
	
	var functionhandler = ""
	for (var handler of functionhandlerSet) 
		functionhandler += "\ndef "+handler+"(){\n\tdef result = true \n\treturn result \n}";
	
	return functionhandler
}

function generating_action_functionhandler(functionhandlerSet){
	
	var functionhandler = ""
	for (var handler of functionhandlerSet) 
		functionhandler += "\ndef "+handler+"(){\n\n}";
	
	return functionhandler
}