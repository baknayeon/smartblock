function verification(ecaLists){
	var result = true

	var flatecaLists = makeFlat(ecaLists)
	var fac = generatingFac(flatecaLists)
	var ruleflow = generatingRuleFlows(fac)

	var message =""
	
	if(ruleflow != "circularity"){
		message = inconsistency_redundancy(flatecaLists, ruleflow)
	}
	else if(ruleflow == "circularity"){
		message = "There is circularity between rules!"
	}

	if(message.length > 0){
		alert(message);
	}
	return result
}


function generatingFac(flatecaLists){

	var fac = new Array;
	for(var index = 0; index < flatecaLists.length; index++){
		var action =  flatecaLists[index].actionList	

		for(var sub = 0; sub < flatecaLists.length; sub++){
			var event_sub = flatecaLists[sub].event	
			if(verificationMap.influence(action, event_sub)){
				/*fac[action.command] = {"event" : event_sub,
										"action" : action,
										"pair" : [index, sub]
										}*/
				fac.push([index, sub])
				
			}
		}
	}
	return fac
}
function makeFlat(ecaLists){
	var result = new Array()

	for( eca of ecaLists){

		var actionList = eca.actionList
		for(action of actionList){

			var neweca = new ECA(eca.event, eca.condition, action);
			result.push(neweca)
		}
	}

	return result

}

function generatingRuleFlows(fac){
	var ruleflow = new Array()
	var init = new Array()

	for(pair1 of fac){
		for(pair2 of fac){
			if(pair1[1] == pair2[0]){
				var flow3 = [pair1[0], pair1[1], pair2[1]]	
				init.push(flow3)

			}
		}
	}
	ruleflow = ruleflow.concat(fac)

	if(init.length > 0){
		var flowResult = extendingFlow(fac, init)
		if(extendingFlow != "circularity")
			ruleflow = ruleflow.concat(flowResult)
		else
			ruleflow = flowResult
	}

	return ruleflow
}

function extendingFlow(fac, flows){
	var result = new Array()
	result = result.concat(flows)
	var loop = true
	while(loop){
		loop = false
		var newflow = new Array()
		for(flow of flows){
			for(pair of fac){
				var last_index = flow.length-1
				if(flow[last_index] == pair[0]){
					if(flow[0] != pair[1]){
						newflow.push(flow.concat(pair[1]))
						loop = true
					}else if(flow[0] == pair[1]){
						return "circularity"
					
					}
				}
			}
		}
		flows = newflow
		result = result.concat(newflow)
	}
	return result

}


function inconsistency_redundancy(flatecaLists, flowsList){
	
	var alert = ""

	for(var index = 0; index < flatecaLists.length; index++){ //eca vs eca
		var flatecaList = flatecaLists[index]
		
		for(var sub = index+1; sub < flatecaLists.length; sub++){
			var action = flatecaLists[index].actionList	
			var action_sub = flatecaLists[sub].actionList	
			
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event = flatecaLists[index].event	
				var event_sub = flatecaLists[sub].event	
				var condition = flatecaLists[index].condition	
				var condition_sub = flatecaLists[sub].condition	
				if(same_event(event, event_sub) && same_condition(condition, condition_sub))
					alert = alert+ "case 1 inconsistency\n"
			}
			else if(action.command == action_sub.command){//Check the Actions has redundancy
				var event = flatecaLists[index].event	
				var event_sub = flatecaLists[sub].event	
				var condition = flatecaLists[index].condition	
				var condition_sub = flatecaLists[sub].condition	
				if(same_event(event, event_sub)){
					if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 1 redundancy\n"
				}
			}
		}
	}
	
	for(var index = 0; index < flowsList.length; index++){
		var flow = flowsList[index]
		var action = flatecaLists[flow[flow.length-1]].actionList

		for(ecaList_sub of flatecaLists){  // eca vs flow
			var action_sub = ecaList_sub.actionList	
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event = flatecaLists[flow[0]].event	
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))\
					alert = alert+ "case 2 inconsistency\n"
				}
			}
			else if(action.command == action_sub.command){//Check the Actions has redundancy
				var event = flatecaLists[flow[0]].event	
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 2 redundancy\n"
				}
			}
		}
		for(var sub = index+1; sub < flowsList.length; sub++){// flow vs flow
			var flow_sub = flowsList[sub]
			var action_sub = flatecaLists[flow_sub[flow_sub.length-1]].actionList	
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event = flatecaLists[flow[0]].event		
				var event_sub = flatecaLists[flow_sub[0]].event		
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 3 inconsistency\n"
				}
			}
			else if(action.command == action_sub.command){//Check the Actions has redundancy
				var event = flatecaLists[flow[0]].event		
				var event_sub = flatecaLists[flow_sub[0]].event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 3 redundancy\n"
				}
			}
		}
	}

	return alert

}



function same_event(event, event_sub){
	if(event.devname == event_sub.devname){
		var handler1 = [".", "."]
		var handler2 = [".", "."]
		
		if(event.attr)
			handler1[1] = event.attr
		else{
			handler1[0] = event.event_handler.from
			handler1[1] = event.event_handler.to
		}
		
		
		if(event_sub.attr)
			handler2[1] = event_sub.attr
		else{
			handler2[0] = event_sub.event_handler.from
			handler2[1] = event_sub.event_handler.to
		}


		if(handler1[1] == handler2[1] && handler1[0] == handler2[0])
			return true
		else
			return false
	}
}

function same_condition(condition, condition_sub){
	condition
	return true
}

function opposite_condition(condition, condition_sub){
	condition
	return true
}

function conflict(action, action_sub){
	//check same name
	//for(a of action){
	//	for(a2 of action_sub){
			if(action.devname == action_sub.devname){
				if(verificationMap.conflict(action.command_part, action_sub.command_part))
					return true
			}
	///	}
	//}
	return false
}
