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
	return prferences;
}
function smartApp(){
		var code
		eca_num = 0;
		var name = document.getElementById("name").value;
		if(name){

			var ecaList = Blockly.SmartThings.workspaceToCode(demoWorkspace);
			
			//definition

			var definition ='definition( '+'\n'+'name: \"'+name+'\",'+"\n"
			
			var author = document.getElementById("author").value;
			var namespace = document.getElementById("namespace").value
			var description = document.getElementById("description").value
			var iconUrl = document.getElementById("iconUrl").value

			if(author)
				definition +=  'author: "'+ author +'"'+"\n"
			if(namespace)
				definition += 'namespace: "'+ namespace +'",'+"\n"
			if(description)
				definition += 'description: "'+ description +'",'+"\n"
			if(iconUrl)
				definition +='iconUrl: \"'+iconUrl+'",'+"\n"
				+'iconX2Url: \"'+iconUrl+'"'+"\n"+')';
			else
				//definition +='iconUrl: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqp6tX_F2iTdI8cOTCroeBQEfEnXphwWN3KnyOfDt1I8rr9-APiuotKc\",'+"\n"
				//+'iconX2Url: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqp6tX_F2iTdI8cOTCroeBQEfEnXphwWN3KnyOfDt1I8rr9-APiuotKc\"'+"\n"
			definition +=')';
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
		var if_condition = event.devname+'.currentValue("'+attr.id+'") == '+event.attr;
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


				if(attrMap.isOnlyENUM(field_right.device)){
					var right_attr = attrMap.getENUM(field_right.device)
					var left_attr = attrMap.getENUM(field_left.device)
					if_condition = field_right.devname+'.currentState("'+left_attr.id+'").value' + operator +field_left.devname+'.currentState("'+right_attr.id+'").value'
				}else if(attrMap.isOnlyNUMBER(field_right.device)){
					var right_attr = attrMap.getNUMBER(field_right.device)
					var left_attr = attrMap.getNUMBER(field_left.device)
					if_condition = right.devname+'.currentValue("'+left_attr.id+'").value' + operator +field_left.devname+'.currentValue("'+right_attr.id+'").value'
				}

			}else if (right.constructor == inputc && left.constructor == Device_attr){// field =< n(attr)
				var field = right
				var dev_attr = left


				if(attrMap.isOnlyENUM(field.device)){
					var field_attr = attrMap.getENUM(field.device)
					if_condition = field.devname+'.currentState("'+field_attr.id+'").value'+ operator+'"'+dev_attr.attr+'"';
				
				}else if(attrMap.isOnlyNUMBER(field.device)){
					var field_attr = attrMap.getNUMBER(field.device)
					if_condition = field.devname+'.currentValue("'+field_attr.id+'").value'+ operator+'"'+dev_attr.attr+'"';
				}


			}else if (right.constructor == inputc && !isNaN(left)){// field =< n(num)
				var field_attr = attrMap.getNUMBER(right.device)
				if_condition = right.devname+'.currentValue("'+field_attr.id+'").value'+ operator+left;
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

	if(event.event_handler){
		handler = event.event_handler
		if(handler.from != ".")
			return from_condition = '(\"'+ handler.from +'\" == ' + event.devname+".events(max: 2)[1].value)"
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


function change_block_color(block){

	if(block.type != "eca" && block.type != "ea"){
		if(colour)
			if(block.colour_ == Block_colour_event)
				block.setColour(Block_colour_event_disconnted)
			else if(block.colour_ == Block_colour_event_disconnted)
				block.setColour(Block_colour_event)
			else if(block.colour_ == Block_colour_condition)
				block.setColour(Block_colour_condition_disconnted)
			else if(block.colour_ == Block_colour_condition_disconnted)
				block.setColour(Block_colour_condition)

			else if(block.colour_ == Block_colour_action)
				block.setColour(Block_colour_action_disconnted)
			else if(block.colour_ == Block_colour_action_disconnted)
				block.setColour(Block_colour_action)

				
			else if(block.colour_ == Block_colour_section)
				block.setColour(Block_colour_section_disconnted)
			else if(block.colour_ == Block_colour_section_disconnted)
				block.setColour(Block_colour_section)

				
			else if(block.colour_ == Block_colour_option)
				block.setColour(Block_colour_option_disconnted)
			else if(block.colour_ == Block_colour_option_disconnted)
				block.setColour(Block_colour_option)
	}
}

function change(event, block){
	if(event.type == Blockly.Events.BLOCK_CREATE && event.group){
		if(event.ids.length > 1){
			var block_array = event.ids
			var length = block_array.length
			for(var i =0; i < length; i++){
				if(block.id == block_array[i]){
					change_block_color(block)
					break;
				}
			}
		
		}
	}
}


function condition_input(condition, array){
	
	if(condition.result){ //true, false, !p
		if(condition.result != 'true' && condition.result != 'false')
			condition_input(condition, array)
			
	}else{ // p&&p, p||p, f <= fn, m <= n, fϵd  
		var operator = condition.operator
		var right = condition.right;
		var left = condition.left;

		if(operator == '&&' || operator == '||'){
			condition_input(right, array)
			condition_input(left, array)
		}
		else if(operator == '==' || operator == '<'|| operator == '>' || operator == 'ϵ'){
			//smartDevice
			
			var field_right = right
			array.push(new Condition(field_right.devname, field_right.device));
			
			if(left.constructor == inputc){ // field =< field
				var field_left = left
				array.push(new Condition(field_right.devname, field_right.device));
			}

		}
	}
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

	/*if (Blockly.Blocks["number"]) {
		  var blockText = '<xml>' +
			  '<block type="number">' +
			  '</block>' +
			  '</xml>';
		  var block = Blockly.Xml.textToDom(blockText).firstChild;
		 xmlList.push(block)
	}*/
}


function device_table(){

	var alphabet = ["Things", "A","B","C","D", "E","FG","H","IJ","KL","M","NO","P","QR","S", "T", "UV","WXYZ"]
	var comman_uesed = ["alarm", "button", "light", "lock", "motion", "outlet", "presenceSensor",
	"smokeDetector",  "switch"]
	
	var index = 0;
	if (!deviceMap.keys) {
	  deviceMap.keys = function(obj) {
		var keys = [];

		for (var i in obj) {
		  if (obj.hasOwnProperty(i)) {
			keys.push(i);
		  }
		}

		return keys;
	  };
	}

	var deviceList = Array.from(deviceMap.keys());

	var table = ""

	for(var i =0; i < alphabet.length; i++){	
		var alphabet_i = alphabet[i]
			
		table += '<div class="share-btn" id = "'+alphabet_i +'" >'+
				'<strong><p class="cta">'+ alphabet_i +'</p></strong>'+
				'<button class= "close"></button> '+
				'<div class="social">';

		if(alphabet_i == "Things")
			for(var c = 0; c < comman_uesed.length; c++)
				table += '<button onClick = change_button_color(this) id ="'+comman_uesed[c]+'">'+ comman_uesed[c]+'</button>'
		else{
			for(var s = 0; s < alphabet_i.length; s++ ){
				var word = alphabet_i.charAt(s).toLowerCase()
					
 				while(index < deviceList.length){
					var device =  deviceList[index];
					if(device.startsWith(word)){
						table += '<button onClick = change_button_color(this) id ="'+device+'">'+ device+'</button>';
						index++;
					}else
						break;

				}
			}
		}
		table += '</div>'+
				 '</div>\n';

	}

	return table;
}

function toolbox_pre(){
		
	var toolbox_pre = '<xml>\n';
	toolbox_pre += sample();
	toolbox_pre += preference();
	toolbox_pre += preference_option();

	var ecaList = Blockly.SmartThings.workspaceToCode(demoWorkspace);
	var event_block ="";
	var action_block ="";
	var condition_block ="";
	
	toolbox_pre += '  <category name="input">\n';
	if(ecaList){
		for(i in ecaList){
			var event = ecaList[i].event;
			var actionList = ecaList[i].actionList;
			var coditionList = new Array();

			var e_devname = event.devname;
			
			//eliminate dutulicate
			var eSt_e = event_block.indexOf(e_devname);
			var aSt_e = action_block.indexOf(e_devname);
			var cSt_e = condition_block.indexOf(e_devname);

			if(eSt_e == -1 && aSt_e == -1 && cSt_e == -1){
				pre_block(e_devname, Block_colour_event)
				event_block += '    <block type="input '+e_devname+'">'+ ' </block> \n';
			}


			condition_input(ecaList[i].condition, coditionList);

			for(c in coditionList){
				var c_devname = coditionList[c].devname
				if(c_devname){
					var eSt_a = event_block.indexOf(c_devname);
					var aSt_a = action_block.indexOf(c_devname);
					var cSt_e = condition_block.indexOf(c_devname);
					if(eSt_a == -1 && aSt_a == -1 && cSt_e == -1){
						pre_block(c_devname, Block_colour_condition)
						condition_block += '    <block type="input '+c_devname+'">'+ ' </block> \n';
					}
				}
			}

			for(a in actionList){
				var a_devname = actionList[a].devname
				if(a_devname){
					var eSt_a = event_block.indexOf(a_devname);
					var aSt_a = action_block.indexOf(a_devname);
					var cSt_e = condition_block.indexOf(a_devname);
					if(eSt_a == -1 && aSt_a == -1 && cSt_e == -1){
						pre_block(a_devname, Block_colour_action)
						action_block += '    <block type="input '+a_devname+'">'+ ' </block> \n';
					}
				}
			}
		}
	}

	toolbox_pre += event_block + condition_block + action_block;
	toolbox_pre += '  </category>\n';
	toolbox_pre += '</xml>\n';

	return toolbox_pre;

}

function change_button_color(x){

	if( x.style.background == 'rgb(255, 255, 255)' || x.style.background == '' ){
		selected_dev.set(x.id, x.id)
		x.style.background = 'rgb(205, 239, 244)';
	}else if(x.style.background == 'rgb(205, 239, 244)'){
		selected_dev.delete(x.id)
		x.style.background = 'rgb(255, 255, 255)';
	}
}


var openWin;
function app_info(x){
	openWin = window.open("./app_info.html", 'myWindow', 'scrollbars=no,toolbar=no,resizable=no,width=400px,height=400px,left=400,top=100');
}