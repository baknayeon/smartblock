function verification(ecaLists){
	var result = true

	var flatecaLists = makeFlat(ecaLists)
	var face = generatingFace(flatecaLists)
	var faceflow = generatingFaceFlows(face)
	var ruleflow = generatingRuleFlows(faceflow, flatecaLists)
	/*var message =""
	
	if(ruleflow != "circularity"){
		message = inconsistency_redundancy(flatecaLists, ruleflow)
	}
	else if(ruleflow == "circularity"){
		message = "There is a circularity between rules!"
	}*/

	var IR = inconsistency_redundancy1(flatecaLists)
	//inconsistency_redundancy2(flatecaLists, ruleflow)
	
	if(IR[0].length + IR[1].length ){
		alert_verification(IR)
		result = false 
	}
	//if(message.length > 0){
	//	alert_verification(message);
	//	result = false
	//}
	return result
}

function alert_verification(IR){
	var inconsistency1List = IR[0]
	var redundancy1List = IR[1]
	
	var inconsistency1 = ""
	var redundancy1 = ""
	var error = 0
	var warning = 0


	for( ecas of inconsistency1List ){

		var eca1 = ecas[0]
		var eca2 = ecas[1]
		var event = eca1.event
		var condition = eca1.condition
		var action1 = eca1.actionList
		var action2 = eca2.actionList

		error = error+1
		inconsistency1 = inconsistency1+event.devname+"."+event.attr+"*"+
							action1.command+"*"+action2.command+"*/"
	}

	for( ecas of redundancy1List ){
		warning = warning+1
		
		var eca1 = ecas[0]
		var eca2 = ecas[1]
		var event = eca1.event
		var action1 = eca1.actionList
		var action2 = eca2.actionList
		redundancy1 = redundancy1+event.devname+"."+event.attr+"*"+
							action1.command+"*"+action2.command+"*/"
	}
	var height = 230 + (error+warning)*100
	var windowObj = window.open("support/alert_verification.html?error="+error+"&warning="+warning+"&inconsistency1="+inconsistency1+"&redundancy1="+redundancy1, 'myWindow', 'location=no , scrollbars=no,toolbar=no,resizable=no,width=430px,height='+height+'px,left=400,top=100');
			
}

function makeFlat(ecaLists){
	var result = new Array()

	for( eca of ecaLists){

		var actionList = eca.actionList
		for(action of actionList){

			var neweca = new simpleECA(eca.event, eca.condition, action);
			result.push(neweca)
		}
	}

	return result

}

function generatingFace(flatecaLists){

	var face = new Array;
	for(var index = 0; index < flatecaLists.length; index++){
		var action =  flatecaLists[index].actionList	

		for(var sub = 0; sub < flatecaLists.length; sub++){
			var event_sub = flatecaLists[sub].event	
			if(verificationMap.influence(action, event_sub)){
				/*fac[action.command] = {"event" : event_sub,
										"action" : action,
										"pair" : [index, sub]
										}*/
				face.push([index, sub])
				
			}
		}
	}
	return face
}


function generatingFaceFlows(face){
	var faceflow = new Array()
	var flows = face
	var loop = true

	while(loop){
		loop = false
		var newflow = new Array()
		for(flow of flows){
			for(pair of face){
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
		faceflow = faceflow.concat(newflow)
	}
	faceflow = faceflow.concat(face)

	return faceflow
}


function generatingRuleFlows(faceflows, flatecaLists){
	var ruleflows = new Array()

	for(faceflow of faceflows){
		var ruleflow = new Array()
		for(face of faceflow){
			var eca = flatecaLists[face]
			ruleflow.push(eca)
		}
		ruleflows.push(ruleflow)

	}

	return ruleflows
}


function inconsistency_redundancy1(flatecaLists){
	
	var alert = ""
	var inconsistency1 = new Array()
	var redundancy1 = new Array()
	var inconsistency2 = new Array()
	var redundancy2 = new Array()
	var inconsistency3 = new Array()
	var redundancy3 = new Array()


	//eca vs eca
	for(var index = 0; index < flatecaLists.length; index++){ 
		var flatecaList = flatecaLists[index]
		
		for(var sub = index+1; sub < flatecaLists.length; sub++){
			var action = flatecaLists[index].actionList	
			var action_sub = flatecaLists[sub].actionList	
			
			if(conflict(action, action_sub)){//Check Inconsistency
				var event = flatecaLists[index].event	
				var event_sub = flatecaLists[sub].event	
				var condition = flatecaLists[index].condition	
				var condition_sub = flatecaLists[sub].condition	
				if(same_event(event, event_sub) && same_condition(condition, condition_sub)){
					inconsistency1.push([flatecaLists[index], flatecaLists[sub]])
				}
			}
			else if( (action.command == action_sub.command 
					&& action.devname== action_sub.devname
					&& action.timer == action_sub.timer)
				|| 
					action.method && action_sub.method
					&& action.method.id == action_sub.method.id
					&& action.method.args == action_sub.method.args

				){//Check Redundancy
				if(action.method )
				var event = flatecaLists[index].event	
				var event_sub = flatecaLists[sub].event	
				var condition = flatecaLists[index].condition	
				var condition_sub = flatecaLists[sub].condition	
				if(same_event(event, event_sub)){
					if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						redundancy1.push([flatecaLists[index], flatecaLists[sub]])
				}
			}
		}
	}
	
	/*for(var index = 0; index < flowsList.length; index++){ //flow
		var flow = flowsList[index]
		var first_index = flow[0]
		var last_index = flow[flow.length-1]

		var event = flatecaLists[first_index].event	
		var action = flatecaLists[last_index].actionList

		// eca vs flow
		for(ecaList_sub of flatecaLists){   //eca
			var action_sub = ecaList_sub.actionList	
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					var conditions = getConditions(flow, flatecaLists)
					var condition_sub = ecaList_sub.condition	
					if(same_condition_s(conditions, condition_sub))
					alert = alert+ "case 2 inconsistency\n"
				}
			}
			else if(action.command == action_sub.command){//Check the Actions has redundancy
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 2 redundancy\n"
				}
			}
		}

		// flow vs flow
		for(var sub = index+1; sub < flowsList.length; sub++){
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
	}*/

	return [inconsistency1, redundancy1]

}


function inconsistency_redundancy2(flatecaLists, ecaflowsList){
	
	var alert = ""
	var inconsistency2 = new Array()
	var redundancy2 = new Array()

	for(var index = 0; index < flowsList.length; index++){ //flow
		var flow = flowsList[index]
		var first_index = flow[0]
		var last_index = flow[flow.length-1]

		var event = flatecaLists[first_index].event	
		var action = flatecaLists[last_index].actionList

		// eca vs flow
		for(ecaList_sub of flatecaLists){   //eca
			var action_sub = ecaList_sub.actionList	
			if(conflict(action, action_sub)){//Check the Actions has Conflict
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					//var conditions = getConditions(flow, flatecaLists)
					//var condition_sub = ecaList_sub.condition	
					if(same_condition_s(ecaList_sub, flatecaLists, flow))
					 alert = alert+ "case 2 inconsistency\n"
				}
			}
			else if(action.command == action_sub.command){//Check the Actions has redundancy
				var event_sub = ecaList_sub.event	
				if(same_event(event, event_sub)){
					//if(same_condition(condition, condition_sub) || opposite_condition(condition, condition_sub))
						alert = alert+ "case 2 redundancy\n"
				}
			}
		}
	}

	return [inconsistency2, redundancy2]

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

function getConditions(flow, flatecaLists){
	var conditions = new Array()

	for( index of flow ){
		var condition = flatecaLists[index].condition
		conditions.push(condition)
	}

	return conditions

}

function same_condition_s(eca, flatecaLists, flow){
		
	
}

function same_condition(condition, condition_sub){
	var result = 0


	if(condition.constructor == Grouping && condition_sub.constructor == Grouping){

		
	}else if(condition.constructor != Grouping && condition_sub.constructor != Grouping){

		if(condition.result && condition_sub.result){ //true, false
			if(condition.result == condition_sub.result){
				if(condition.result == 'true' || condition.result == 'false'){
					result = 1
				}
			}
		}else if( !condition.result && !condition_sub.result){  // p&&p, p||p, !p, f <= fn, m <= n, fϵd  
			var operator = condition.operator;
			var right = condition.right;
			var left = condition.left;
			
			var operator_sub = condition_sub.operator;
			var right_sub = condition_sub.right;
			var left_sub = condition_sub.left;

			if(operator == operator_sub){
				if(operator == '&&'){
					var right = same_condition(condition.right, condition_sub.right)
					var left = same_condition(condition.left, condition_sub.left)
					if(right > 0 && left > 0){
						result = right + left 	
					}else{ // swap
						right = same_condition(condition.right, condition_sub.left)
						left = same_condition(condition.left, condition_sub.right)
						if(right > 0 && left > 0)
							result = right + left 	
					}
				
				}else if(operator == '||'){
					var right2right = same_condition(condition.right, condition_sub.right)
					if(right2right > 0){
						result = right2right 		
					}else{
						var left2left = same_condition(condition.left, condition_sub.left)
						if(left2left > 0){
							result = left2left 		
						}else{
							var right2left = same_condition(condition.right, condition_sub.left)
							if(right2left > 0){
								result = right2left 		
							}else{
								var left2right = same_condition(condition.left, condition_sub.right)
								if(left2right > 0)
									result = left2right 		
							}
						}
					}
				
				}else if(operator == '!'){
					result = same_condition(condition.right, condition_sub.right)
					
				}else if(right.devname == right_sub.devname && right.constructor == Inputc){// alway be f(inputc) in right ;f < f, f <= n, m <= n, fϵd   
					if(left.constructor == Inputc && left_sub.constructor == Inputc){ // f ? f
						if(left.devname == left_sub.devname){
							result = 1
						}
					}else if(left.constructor == Attribute && left_sub.constructor == Attribute){ // f ? n(attribute)
						if(left.attr == left_sub.attr && left.dev == left_sub.dev)
							result = 1
							
					}else if(left.constructor == Number && left_sub.constructor == Number){  // f ? n(number)
						if(left.value == left_sub.value)
							result = 1
						else if(Math.abs(left.value - left_sub.value) <= 5)
							result = 0.5 //warning
					}else{ //f ? d 
						if(left == left_sub)
							result = 1
							
						
					}
				}
			}else if(overlap(condition, condition_sub)){
				result = 1
			}
		}
	}
	return result
}

function overlap(condition, condition_sub){
	var operator = condition.operator;
	var right = condition.right;
	var left = condition.left;
	var minmum = -20
	var maxmum = 100

	var operator_sub = condition_sub.operator;
	var right_sub = condition_sub.right;
	var left_sub = condition_sub.left;
	var minmum_sub = -20
	var maxmum_sub = 100

	if(right.devname == right_sub.devname && right.constructor == Inputc){// f ? n
		if(left.constructor == Number && left_sub.constructor == Number){

			if(operator == "≤" && operator_sub == "≥" || operator_sub == "≤" && operator == "≥"){
				if(left.value == left_sub.value)
					return true
			}

			if(operator == "<" || operator == "≤"){
				maxmum = left.value
				minmum = -20 // minmum temp
			}else if(operator == ">" || operator == "≥"){
				maxmum = 100 //maxmum battery
				minmum = left.value
			}

			if(operator_sub == "<" || operator_sub == "≤"){
				maxmum_sub = left_sub.value
				minmum_sub = -20 // minmum temp
			}else if(operator_sub == ">" || operator_sub == "≥"){
				maxmum_sub = 100 //maxmum battery
				minmum_sub = left_sub.value
			}
			
			if(minmum < minmum_sub && minmum_sub < maxmum){
				return true
			}else if(minmum < maxmum_sub && maxmum_sub < maxmum){
				return true
			}if(minmum_sub < minmum && minmum < maxmum_sub){
				return true
			}else if(minmum_sub < maxmum && maxmum < maxmum_sub){
				return true
			}
		}
	}
}

function opposite_condition(condition, condition_sub){
	var result = 0


	if(condition.constructor == Grouping && condition_sub.constructor == Grouping){

		
	}else if(condition.constructor != Grouping && condition_sub.constructor != Grouping){

		if(condition.result && condition_sub.result){ //true, false
			if( (condition.result == 'true' && condition_sub.result== 'false') || 
				(condition.result == 'false' && condition_sub.result== 'true')		){
					result = 1
			}
		}else if( !condition.result && !condition_sub.result){  // p&&p, p||p, !p, f <= fn, m <= n, fϵd  
			var operator = condition.operator;
			var right = condition.right;
			var left = condition.left;
			
			var operator_sub = condition_sub.operator;
			var right_sub = condition_sub.right;
			var left_sub = condition_sub.left;

			if(operator == "!" || operator_sub == "!"){//not and the other
				if(operator == "!" && operator_sub != "!"){ //not and the other fϵd  
					result = same_condition(right, condition_sub)
				}else if(operator != "!" && operator_sub == "!"){//the other and not
					result = same_condition(condition, right_sub)
				}else{//not and not 
					result = opposite_condition(right, right_sub)
				}
			}else{// p&&p, p||p, f <= fn, m <= n, fϵd 
				if(opposite_Logicaloperator(operator, operator_sub)){// p&&p, p||p
					//if(operator == '&&' || operator == '||'){
						var right = opposite_condition(condition.right, condition_sub.right)
						var left = opposite_condition(condition.left, condition_sub.left)
						if(right == 1 && left == 1){
							result = 1	
						}else{ // swap
							right = opposite_condition(condition.right, condition_sub.left)
							left = opposite_condition(condition.left, condition_sub.right)
							if(right == 1 && left == 1)
								result = 1
						}
					//}
				}else if(right.devname == right_sub.devname && right.constructor == Inputc){// alway be f(inputc) in right ;f < f, f <= n, m <= n, fϵd  
					if(left.constructor == Inputc && left_sub.constructor == Inputc){ // f ? f
						if(left.devname == left_sub.devname){
							if(opposite_operator(operator, operator_sub)){ 
								result = 1
							}
						}
					}else if(left.constructor == Attribute && left_sub.constructor == Attribute){ // f ? n(attribute)
						if(left.attr == left_sub.attr && left.dev == left_sub.dev){ 
							if(opposite_operator(operator, operator_sub))
									result = 1
							
					  	}else if(verificationMap.conflict(left.attr, left_sub.attr)){ //semantic
					  		if(operator == operator_sub)
					  			result = 1
					  	}
					}else if(left.constructor == Number && left_sub.constructor == Number){  // f ? n(number)
						if(left.value == left_sub.value)
							if(opposite_operator(operator, operator_sub)){ 
									result = 1
							}
					}else{ //f ? d 
						if(left == left_sub)
							if(opposite_operator(operator, operator_sub)){ 
									result = 1
							}
						
					}
					
				}

			}
		}
	}
	return result
}

function opposite_Logicaloperator(operator, operator_sub){

	if(operator == "&&" && operator_sub == "||")
		return true
	else if(operator == "||" && operator_sub == "&&")
		return true
	return false
}

function opposite_operator(operator, operator_sub){

	if(operator == "<" && operator_sub == "≥")
		return true
	else if(operator == "≥" && operator_sub == "<")
		return true
	else if(operator == ">" && operator_sub == "≤")
		return true
	else if(operator == "≤" && operator_sub == ">")
		return true
	else if(operator == "==" && operator_sub == "!=")
		return true
	else if(operator == "!=" && operator_sub == "==")
		return true
	else if(operator == "ϵ" && operator_sub == "∉")
		return true
	else if(operator == "∉" && operator_sub == "ϵ")
	return false
}
function conflict(action, action_sub){
	//check same name
	//for(a of action){
	//	for(a2 of action_sub){
			if(action.devname == action_sub.devname && action.timer == action_sub.timer ){
				if(verificationMap.conflict(action.command_part, action_sub.command_part))
					return true
			}
	///	}
	//}
	return false
}
