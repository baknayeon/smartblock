function smartApp(ecaList){
	var code;
	var name = document.getElementById("name").value;
	
	//init
	condition_functionhandlerSet = new Set();
	action_functionhandlerSet = new Set();

	if(name){
	
		//definition
		var definition = generating_definition()
		
		//preferences
		var preferences = generating_pref(ecaList)

		//predefined_callback
		var subscribes = generating_subscribes(ecaList)
		var initmethods = generating_atinstalled(ecaList)
		var installed = "def installed() {\n" + subscribes + initmethods+"}";
		var updatedmethods = generating_atupdated(ecaList)
		var updated = "def updated() {\n\tunsubscribe()\n\tunschedule()\n" +subscribes + updatedmethods+"}";
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
						if(input_c[c].constructor == Inputc)
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

