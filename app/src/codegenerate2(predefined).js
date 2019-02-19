function generating_subscribes(ecaList){

	var subscribes = "";

	for(var eca of ecaList){
		var event = eca.event
		var inputes = eca.input_e_make;
		for(var input_e of inputes){
			if(event.device || (input_e.device && event.constructor == Grouping)){// event from dev
				var subSt_e = subscribes.indexOf(input_e.subscribe);
				if(subSt_e == -1 )
					subscribes += "\t"+input_e.subscribe+"\n";

			}else if(event.abstract_){ //locate, app

				var subSt_e = subscribes.indexOf(input_e.subscribe);
				if(subSt_e == -1 )
					subscribes += "\t"+input_e.subscribe+"\n";
				
			}else if(event.time){ //schedule
				var subSt_e = subscribes.indexOf(input_e.subscribe);
				if(subSt_e == -1 )
					subscribes += "\t"+input_e.subscribe+"\n";
			}
		}
	}

	return subscribes;
}

function generating_atinstalled(ecaList){

	var predefined_method = "";

	for(var eca of ecaList){
		var event = eca.event
		var inputes = eca.input_e_make;
		for(var input_e of inputes){
			if(event.predefined_ && event.predefined_ == "installed"){ //init method

				var init_e = predefined_method.indexOf(input_e.handler);
				if(init_e == -1 )
					predefined_method += "\t"+input_e.handler+"\n";
			
			}
		}
	}

	return predefined_method;
}
function generating_atupdated(ecaList){

	var predefined_method = "";

	for(var eca of ecaList){
		var event = eca.event
		var inputes = eca.input_e_make;
		for(var input_e of inputes){
			if(event.predefined_ && event.predefined_ == "updated"){ //init method

				var init_e = predefined_method.indexOf(input_e.handler);
				if(init_e == -1 )
					predefined_method += "\t"+input_e.handler+"\n";
			
			}
		}
	}

	return predefined_method;
}


