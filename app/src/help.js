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


function device_table(){

	var alphabet = ["Things", "A","B","C","D", "E","FG","H","IJ","KL","M","NO","P","QR","S", "T", "UV","WXYZ"]
	
	var index = 0;
	/*if (!deviceMap.keys) {
	  deviceMap.keys = function(obj) {
		var keys = [];

		for (var i in obj) {
		  if (obj.hasOwnProperty(i)) {
			keys.push(i);
		  }
		}

		return keys;
	  };
	}*/

	var deviceList = Array.from(deviceSet);

	var table = ""

	for(var i =0; i < alphabet.length; i++){	
		var alphabet_i = alphabet[i]
		table += '<div class="share-btn" id = "'+alphabet_i +'" >'

		if(alphabet_i == "Things"){
			table += things_table();
		}else{
			table +='<strong><p class="cta">'+ alphabet_i +'</p></strong>'+
					'<button class= "close"></button> '+
					'<div class="social">';
			for(var s = 0; s < alphabet_i.length; s++ ){
				var word = alphabet_i.charAt(s).toLowerCase()
					
 				while(index < deviceList.length){
					var device =  deviceList[index];
					if(device.startsWith(word)){
						table += '<button onClick="change_devbutton_color(this)" id ="'+device+'">'+ device+'</button>';
						index++;
					}else
						break;
				}
			}
			table += '</div>'
		}
		table += '</div>\n';

	}

	return table;
}

function things_table(){
	var table = '<strong><p class="cta">Things</p></strong>'+
				'<button class= "close"></button> '+
				'<div class="social" id = "Things">';
	for(var c = 0; c < comman_uesed.length; c++){
		
		table += '<button onClick = change_devbutton_color(this) id ="'+comman_uesed[c]+'">'+ comman_uesed[c]+'</button>'
	}
	table += '<button onClick = "setting_things(this)" id ="setting_things_open"></button>'
	table += '</div>'

	return table

}
function setting_things(x){
	
	var div = document.getElementById('device_setting');
	if(div){
		_("device_setting").style.display = "block"
	}else{
		var div = document.createElement('div');
		div.setAttribute("id", "device_setting");
		div.innerHTML = '<div>' +
						'<strong><p>Setting</p></strong>'+
						'<button id= "setting_close" onClick = "setting_close()"></button> '
						
		var deviceList = Array.from(deviceSet);
		var subdiv = document.createElement('div');
		subdiv.setAttribute("class", "setting_list");
		subdiv.innerHTML += '<div> ';
		for(var c = 0; c < deviceList.length; c++)
				subdiv.innerHTML += '<button onClick = change_setbutton_color(this) id ="'+deviceList[c]+'">'+ deviceList[c]+'</button>'
		subdiv.innerHTML += '</div> ';
		
		div.appendChild(subdiv)
		div.innerHTML += '</div> ';
		document.body.appendChild(div);
			
	}

}

function setting_close(){
	
	_("device_setting").style.display = "none"
	
	var things = document.getElementById("Things");
	things.innerHTML = things_table();
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
	
	toolbox_pre += '  <category name="input" >\n';
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

function change_setbutton_color(x){
	if( x.style.background == 'rgb(255, 255, 255)' || x.style.background == '' ){
		comman_uesed.push(x.id)
		x.style.background = 'rgb(238, 238, 238)';
	}else if(x.style.background == 'rgb(238, 238, 238)'){
		var index = comman_uesed.indexOf(x.id);
		if (index > -1) {
			comman_uesed.splice(index, 1);
			x.style.background = 'rgb(255, 255, 255)';
		}
	}

}
function change_devbutton_color(x){

	if( x.style.background == 'rgb(255, 255, 255)' || x.style.background == '' ){
		selected_dev.set(x.id, x.id)
		x.style.background = 'rgb(205, 239, 244)';
	}else if(x.style.background == 'rgb(205, 239, 244)'){
		selected_dev.delete(x.id)
		x.style.background = 'rgb(255, 255, 255)';
	}
}


function app_info(x){
	var openWin = window.open("./app_info.html", 'myWindow', 'scrollbars=no,toolbar=no,resizable=no,width=430px,height=450px,left=400,top=100');
}

function change_connted_color(block){

	if(block.type != "eca" && block.type != "ea"){
		if(colour)
			if(block.colour_ == Block_colour_event_disconnted)
				block.setColour(Block_colour_event)
			else if(block.colour_ == Block_colour_condition_disconnted)
				block.setColour(Block_colour_condition)
			else if(block.colour_ == Block_colour_action_disconnted)
				block.setColour(Block_colour_action)		
			else if(block.colour_ == Block_colour_section_disconnted)
				block.setColour(Block_colour_section)
			else if(block.colour_ == Block_colour_option_disconnted)
				block.setColour(Block_colour_option)
	}
}

function change_disconnted_color(block){

	if(block.type != "eca" && block.type != "ea"){
		if(colour)
			if(block.colour_ == Block_colour_event)
				block.setColour(Block_colour_event_disconnted)
			else if(block.colour_ == Block_colour_condition)
				block.setColour(Block_colour_condition_disconnted)
			else if(block.colour_ == Block_colour_action)
				block.setColour(Block_colour_action_disconnted)
			else if(block.colour_ == Block_colour_section)
				block.setColour(Block_colour_section_disconnted)
			else if(block.colour_ == Block_colour_option)
				block.setColour(Block_colour_option_disconnted)
			
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

