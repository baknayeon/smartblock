//Calculation
Blockly.SmartThings['math_action'] = function(block) {
  var value_a = Blockly.SmartThings.valueToCode(block, 'A', Blockly.SmartThings.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.SmartThings.valueToCode(block, 'B', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var left = value_a //data hard coding
  var right = value_b
  var inputList = new Array()

  if(value_a.constructor == Inputa){
  		inputList.push(value_a)
  }else if(value_a.constructor == API){
  		if (value_a.inputs) 
  			inputList = inputList.concat(value_a.inputs)
  }
  
  if(value_b.constructor == Inputa){
	inputList.push(value_b)
  }else if(value_b.constructor == API){
  		if (value_a.inputs) 
  			inputList = inputList.concat(value_a.inputs)
  }


  var c = new Calculation()
  c.inputs = inputList
  c.operation = dropdown_op 
  c.left = left   // =  left+" "+dropdown_op+" "+right;
  c.right = right  
  // TODO: Change ORDER_NONE to the correct strength.
  return c;
};


//state
Blockly.SmartThings['action_state_def'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  var value_input = Blockly.SmartThings.valueToCode(block, 'state', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();
	if(value_input){
		if(value_input.constructor == String){
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;

			if(isNaN(value_input) && value_input != 'null' && value_input != 'true' && value_input != 'false')
				smartAction.state_command = "state.box"+variable_name +" = " + '\"'+value_input+ '\"'
			else
				smartAction.state_command = "state.box"+variable_name +" = " + value_input
		}else if(value_input.constructor == API){
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = " + value_input.value
			
		}else if(value_input.constructor == Inputa){
			var right_input_value = "?" 
			var device = value_input.device
			var devname = value_input.devname 
			if(attrMap.onlyInNUMBER(device)){
				var attribute = attrMap.getNUMBER(value_input.device)
				right_input_value = devname + '.currentValue(\"'+attribute.id+'\")'
			}else if(attrMap.onlyInENUM(device)){
				var attribute = attrMap.getENUM(value_input.device)
				right_input_value = devname + '.currentState(\"'+attribute.id+'\")'
			}
			smartAction.valueinput.push(value_input)
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = " + right_input_value
			
		}else if(value_input.constructor == Calculation){
			var experssion =  generating_node(value_input.left)+" "+value_input.operation+" "+ generating_node(value_input.right);
			smartAction.valueinput = value_input.inputs
			smartAction.state = "state.box"+variable_name;
			smartAction.state_command = "state.box"+variable_name +" = (" + experssion+")"
			
		}
	}
  // TODO: Change ORDER_NONE to the correct strength.
  return [smartAction]
};
Blockly.SmartThings['action_state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
 c.value = "state.box"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return c;
};



//data- Sting
Blockly.SmartThings['dataa'] = function(block) {
  var text_= block.getFieldValue('data');

  return text_
};


Blockly.SmartThings['inputa_data'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
   // TODO: Assemble SmartThings into code variable.

  var args = new Inputa();
  args.type = dropdown_type;
  args.name = dropdown_type+variable_name
	args.input = 'input \"'+args.name+'\", \"'+args.type +'\", title:\"'+args.name+'\", required: false ' ;
  return args;
};




//send method
Blockly.SmartThings['send'] = function(block) {
	var string_phone = block.getFieldValue('phone');
	var block_phone = Blockly.SmartThings.valueToCode(block, 'phone', Blockly.SmartThings.ORDER_ATOMIC);
	var string_message = block.getFieldValue('text');
	var block_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();

	var message
	var phone
	var if_statement = ""

	var sendNotification
	var sendSms
	var sendPush
	
	if(string_phone){
		phone = '\"'+string_phone+'\"'
		if_statement =  'if(true)'
	}else{	
		phone = block_phone.name
		smartAction.arginput.push(block_phone)
		if_statement =  'if('+phone+')'
	}

	if(string_message){
		message = '\"'+string_message+'\"'
	}else{	
		message = block_message.name
		smartAction.arginput.push(block_message)
	}

	sendNotification = 'sendNotification('+message+')'
	sendPush = 'sendPush('+message+')'
	sendSms = 'sendSms('+ phone + ', '+message +')'



	smartAction.method = 'if(location.contactBookEnabled)\n'
						+'\t\t'+ '\t'+sendNotification+'\n'
						+'\t\t'+'else{\n'
						+'\t\t'+'\t'+if_statement+'\n'
						+'\t\t'+'\t\t '+ sendSms+'\n'
						+'\t\t'+'\t else\n'
						+'\t\t'+'\t\t '+sendPush +'\n'
						+'\t\t'+'}';
	

	return [smartAction];
};

Blockly.SmartThings['sendpush'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action();

	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.name
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendPush('+text_text+')';
  
	
  return [smartAction];
};

Blockly.SmartThings['sendsms'] = function(block) {
	var text_phone = block.getFieldValue('phone');
	var value_phone = Blockly.SmartThings.valueToCode(block, 'phone', Blockly.SmartThings.ORDER_ATOMIC);
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.

	var smartAction = new Action();

	if(value_phone == ""){
		text_phone = '\"'+text_phone+'\"'
	}else{	
		text_phone = value_phone.devname
		smartAction.arginput.push(value_phone)
	}

	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.name
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendSms('+ text_phone + ', '+text_text +')';
  
	return [smartAction];
};

Blockly.SmartThings['sendnotification'] = function(block) {
	var text_text = block.getFieldValue('text');
	var value_message = Blockly.SmartThings.valueToCode(block, 'message', Blockly.SmartThings.ORDER_ATOMIC);
	var actionList = Blockly.SmartThings.valueToCode(block, 'action', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	
	var smartAction = new Action();

	
	if(value_message == ""){
		text_text = '\"'+text_text+'\"'
	}
	else{
		text_text = value_message.name
		smartAction.arginput.push(value_message)
	}
	
	smartAction.method = 'sendNotification('+text_text+')';

	return [smartAction];;
};




//init method
Blockly.SmartThings['function_invocation_a'] = function(block) {
	
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var action = new Action()
	action.functionhandler = "function_action"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return [action];
};







//API - get
Blockly.SmartThings['getlocation_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getLocation()"
  return a;
};

Blockly.SmartThings['getsunrise_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getSunriseAndSunset().sunris.timee"
  return a;
};

Blockly.SmartThings['getsunset_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable. var a = new API();
  var a = new API();
  a.value ="getSunriseAndSunset().sunset.time"
  return a;
};


Blockly.SmartThings['getweatherfeature_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var a = new API();
  a.value ="getWeatherFeature(\"forecast\", zipcode)"
  a.inputs = "input \"zipcode\", \"text\", title: \"Zipcode?\""
  return a;
};




//API - set
Blockly.SmartThings['setlocationmode_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var value_mode= Blockly.SmartThings.valueToCode(block, 'mode', Blockly.SmartThings.ORDER_ATOMIC);
  var a = new Action()
  a.method = "if(location.mode != "+value_mode.name+" && location.modes?.find{it.name == "+value_mode.name+"})"
  +" setLocationMode("+value_mode.name+")" // "if(location.modes?.find{it.name == "+value_mode.devname+"}) "+
  a.arginput.push(value_mode)
  return a;
};


//API- now

Blockly.SmartThings['now_a'] = function(block) {
  var a = new API();
  a.value ="now()"
  return a;
};


//API - subscribe
Blockly.SmartThings['subscribe_method'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var dropdown_event = block.getFieldValue('attribute');
  var index = block.getFieldValue('index');
  var value_arg = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);

  var a = new Action()
  if(value_arg.constructor == Inputa) {
	var devname = value_arg.devname
	var device = value_arg.device
	var attr = ""
	if(dropdown_event != ".")
		attr = "."+dropdown_event
	if(attrMap.isSingle(device)){
		if(attrMap.onlyInENUM(device)){
			var attr_obj = attrMap.getENUM(device)
			a.method =  "subscribe("+devname+', \"'+ attr_obj.id + attr +'\", '+"subscribe"+index+"_handler"+")"
	 	    a.arginput.push(value_arg)
		}else if(attrMap.onlyInNUMBER(device)){
			var attr_obj = attrMap.getNUMBER(device)
			a.method = "subscribe("+devname+', \"'+ attr_obj.id+'\", '+"subscribe"+index+"_handler"+")"
	        a.arginput.push(value_arg)
		}
	}else if(attrMap.isMultiple(device)){


	}

  }else if(value_arg.constructor == API) {
		var attr = dropdown_event
		if(attr == "."){
			a.method = "subscribe("+value_arg.value+", "+"subscribe"+index+"_handler"+")"

		}else{
			a.method = "subscribe("+value_arg.value+', \"'+attr+'\", '+"subscribe"+index+"_handler"+")"

		}
  }
  return [a];
};


//API- subscribe location
Blockly.SmartThings['location_a'] = function(block) {
  var a = new API();
  a.value ="location"
  return a;
};


//API- subscribe app
Blockly.SmartThings['app_a'] = function(block) {
  var a = new API();
  a.value ="app"
  return a;
};


////dummy
Blockly.SmartThings['time_a'] = function(block) {
  // TODO: Assemble SmartThings into code variable. var a = new API();
  var value = Blockly.SmartThings.valueToCode(block, 'setTime', Blockly.SmartThings.ORDER_ATOMIC);
  
  var a = new API();
  if(value.constructor == API){
	 a.value =value.value+".time"
  }
  return a;
};