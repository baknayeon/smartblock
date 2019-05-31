function device_table(){

	var alphabet = ["Things", "A","B","C","D", "E","FG","H","IJ","KL","M","NO","P","QR","S", "T", "UV","WXYZ"]
	
	var index = 0;

	var deviceList = Array.from(deviceSet);
	deviceList.sort()
	var table = ""

	for(var i =0; i < alphabet.length; i++){	
		var alphabet_i = alphabet[i]
		table += '<div class="share-btn" id = "'+alphabet_i +'" onclick= "share_btn(this)">'

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
						table += '<button onClick="change_devbutton_color(this)" id ="'+device+'" class = "device_but">'+ shortName(device)+'</button>';
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
				'<div class="social" id = "Things"> \n';
	for(var c = 0; c < comman_uesed.length; c++){
		var device = comman_uesed[c]
	
		if(selected_dev.has(device))
			table += '<button onClick = change_devbutton_color(this) id ="'+device+'" style = "background:rgb(205, 239, 244)" class = "device_but">'+ device+'</button>\n'
		else	
			table += '<button onClick = change_devbutton_color(this) id ="'+device+'" class = "device_but">'+ device+'</button>\n'
	}
	table += '\n<button onClick = "setting_things(this)" id ="setting_things_open"></button>'
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

function change_setbutton_color(x){
	if(!comman_uesed.includes(x.id)){
		comman_uesed.push(x.id)
		insertData(x.id)
		x.style.background = 'rgb(238, 238, 238)';
	}else if(comman_uesed.includes(x.id)){
		var index = comman_uesed.indexOf(x.id);
		if (index > -1) {
			comman_uesed.splice(index, 1);
			x.style.background = 'rgb(255, 255, 255)';
			deleteData(x.id)
		}
	}

}
function change_devbutton_color(x){
	var but = document.getElementById(x.id)
	if(!selected_dev.has(x.id)){
		selected_dev.set(x.id, x.id)
		x.style.background = 'rgb(205, 239, 244)';
	}else if(selected_dev.has(x.id)){
		selected_dev.delete(x.id)
		x.style.background = 'rgb(255, 255, 255)';
		
	}
}


function share_btn(x){
	var childNodes = document.getElementsByClassName("device_but")
	for(let childNode of childNodes){
		var but = childNode
		if(selected_dev.has(but.id)) 
			but.style.background = 'rgb(205, 239, 244)';
		else 
			but.style.background = 'rgb(255, 255, 255)';
		
	}

}

function app_info(x){
	var openWin = window.open("support/app_info.html", 'myWindow', 'scrollbars=no,toolbar=no,resizable=no,width=430px,height=450px,left=400,top=100');
}

function change_connted_color(block){

	if(block.type != "eca" && block.type != "ea"){
		if(colourBlock)//colour
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
		if(colourBlock)//colour
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

function set2blocksMap(blocks){
	blocks
	blocksMap
}

function countLines() {
   var text =_("smartApp_code").textContent
   var lines = text.split("\n").length -1;
   alert("Lines: " + lines);
}