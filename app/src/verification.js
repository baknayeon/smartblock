function verification(ecaLists){
	var result = [false, false, false, false, false]

	var flatecaLists = makeFlat(ecaLists)
	var fac = generatingFac(flatecaLists)
	var ruleflow = generatingRuleFlows(fac)

	var inconsistencyList = new Array()
	var redundancyPair = new Array()
	for(var index = 0; index < flatecaLists.length; index++){
		var flatecaList = flatecaLists[index]
		
		for(var sub = index+1; sub < flatecaLists.length; sub++){
			var flatecaList_sub = flatecaLists[sub]

			if(inconsistency_1(flatecaList, flatecaList_sub))
				result[0] = true//inconsistencyList.push([index, sub])
			if(redundancy_1(flatecaList, flatecaList_sub))
				result[2] = true//redundancyPair.push([index, sub])
		}
	}

	if(inconsistency_2(ruleflow, flatecaLists))
		result[1] = true
	if(redundancy_2(ruleflow, flatecaLists))
		result[3] = true


	

	result[4] = circularity(fac, ruleflow)
	
	return result
}

function generatingFac(flatecaLists){

	var fac = new Array;
	for(var index = 0; index < flatecaLists.length; index++){
		var action =  flatecaLists[index].actionList	

		for(var sub = 0; sub < flatecaLists.length; sub++){
			var event_sub = flatecaLists[sub].event	
			if(action.devname == event_sub.devname){
				if(action.command_part == event_sub.attr){
					/*fac[action.command] = {"event" : event_sub,
											"action" : action,
											"pair" : [index, sub]
											}*/
					fac.push([index, sub])
				}
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
		ruleflow = ruleflow.concat(extendingFlow(fac, init))
	}

	return ruleflow
}

function extendingFlow(fac, flows){
	var result = []
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
					}
				}
			}
		}
		flows = newflow
		result = result.concat(newflow)
	}
	return result

}

function circularity(fac, ruleflows){
	ruleflows = ruleflows.reverse()

	for(flow of ruleflows){
		for(pair of fac){
			var last_index = flow.length-1
			if(flow[last_index] == pair[0]){
				if(flow[0] == pair[1]){
					return true
					
				}
			}
		}
	}
	return false
}

function inconsistency_1(ecaList, ecaList_sub){
	var action = ecaList.actionList	
	var action_sub = ecaList_sub.actionList	
	
	if(conflict(action, action_sub)){//Check the Actions has Conflict
		var event = ecaList.event	
		var event_sub = ecaList_sub.event	
		var condition = ecaList.condition	
		var condition_sub = ecaList_sub.condition	
		if(same_event(event, event_sub) && same_condition(condition, condition_sub))
			return true
	}

	return false
}

function redundancy_1(ecaList, ecaList_sub){
	var action = ecaList.actionList	
	var action_sub = ecaList_sub.actionList	
	
	if(action.command == action_sub.command){//Check the Actions has redundancy
		var event = ecaList.event	
		var event_sub = ecaList_sub.event	
		var condition = ecaList.condition	
		var condition_sub = ecaList_sub.condition	
		if(same_event(event, event_sub)){
			if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
				return true
		}
	}

	return false
}


function inconsistency_2(flowsList, flatecaLists){

	for(ecaList of flatecaLists){ // eca vs flow

		var action = ecaList.actionList	
		for(flow of flowsList){
			var action_sub = flatecaLists[flow[flow.length-1]].actionList
	
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event = ecaList.event	
				var event_sub = flatecaLists[flow[0]].event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						return true
				}
			}
		}

	}

	for(flow of flowsList){  // flow vs flow
		var action = flatecaLists[flow[flow.length-1]].actionList
		for(flow_sub of flowsList){
			var action_sub = flatecaLists[flow_sub[flow_sub.length-1]].actionList
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event = flatecaLists[flow[0]].event		
				var event_sub = flatecaLists[flow_sub[0]].event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						return true
				}
			}
		}
	}

	return false

}
function redundancy_2(flowsList, flatecaLists){

	for(ecaList of flatecaLists){ // eca vs flow

		var action = ecaList.actionList	
		for(flow of flowsList){
			var action_sub = flatecaLists[flow[flow.length-1]].actionList
			if(action.command == action_sub.command){//Check the Actions has redundancy
				var event = ecaList.event	
				var event_sub = flatecaLists[flow[0]].event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						return true
				}
			}
		}

	}

	for(flow of flowsList){  // flow vs flow
		var action = flatecaLists[flow[flow.length-1]].actionList
		for(flow_sub of flowsList){
			var action_sub = flatecaLists[flow_sub[flow_sub.length-1]].actionList
			if(action.command == action_sub.command){//Check the Actions has redundancy
				var event = flatecaLists[flow[0]].event		
				var event_sub = flatecaLists[flow_sub[0]].event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						return true
				}
			}
		}
	}

	return false
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
