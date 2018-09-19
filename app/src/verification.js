function verification(ecaLists){
	var result = [false, false, false]
	var fac = generatingFac(ecaLists)
	var ruleflow = generatingRuleFlows(fac)
	
	for(var index = 0; index < ecaLists.length; index++){
		var ecaList = ecaLists[index]
		
		for(var sub = index+1; sub < ecaLists.length; sub++){
			var ecaList_sub = ecaLists[sub]

			result[0] = inconsistency(ecaList, ecaList_sub)
			result[1] = redundancy(ecaList, ecaList_sub)

		}
	}

	result[2] =circularity(fac, ruleflow)
	
	return result
}

function generatingFac(ecaLists){

	var FlatecaLists = makeFlat(ecaLists)

	var fac = new Array;
	for(var index = 0; index < FlatecaLists.length; index++){
		var action =  FlatecaLists[index].actionList	

		for(var sub = 0; sub < FlatecaLists.length; sub++){
			var event_sub = FlatecaLists[sub].event	
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

	if(init.length > 0){
		ruleflow = extendingFlow(fac, init)
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

function inconsistency(ecaList, ecaList_sub){
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

function redundancy(ecaList, ecaList_sub){
	var action = ecaList.actionList	
	var action_sub = ecaList_sub.actionList	
	
	if(intersection(action, action_sub)){//Check the Actions has redundancy
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
	for(a of action){
		for(a2 of action_sub){
			if(a.devname == a2.devname){
				if(verificationMap.conflict(a.command_part, a2.command_part))
					return true
			}
		}
	}
	return false
}

function intersection(action, action_sub){
	//check same name
	for(a of action){
		for(a2 of action_sub){
			if(a.command == a2.command){
				return true
			}
		}
	}
	return false
}