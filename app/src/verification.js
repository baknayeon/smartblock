function verification(ecaLists){
	
	var simpleECA = simplifyAST(ecaLists)

	var result = new VerficationResult(simpleECA)

	var relation_ECA = getRelation(simpleECA)

	var ruleFlows = getRuleFlows(relation_ECA)

	if(ruleFlows.doesIthaveCircularity())
		result.reportCircularityError(ruleFlows.getCircularity())
		
	else{

		result.reportInconsistency_Redundancy(
			inconsistency_redundancy(simpleECA, ruleFlows))
	}
	

	return result;

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
	var windowObj = window.open("support/alert_verification.html?error="+error+"&warning="+warning, 'myWindow', 'location=no , scrollbars=no,toolbar=no,resizable=no,width=430px,height='+height+'px,left=400,top=100');
			
}

function simplifyAST(ecaLists){
	var result = new Array()

	for(var eca of ecaLists){
		var actionList = eca.actionList
		for(var action of actionList){
			var neweca = new simpleECA(eca.event, eca.condition, action);
			result.push(neweca)
		}
	}

	return result
}


function getRelation(simplyECAs){

	var relation = new Array;
	for(var index = 0; index < simplyECAs.length; index++){
		var action =  simplyECAs[index].action	

		for(var sub_index = 0; sub_index < simplyECAs.length; sub_index++){
			if(index != sub_index){
				var event_sub = simplyECAs[sub_index].event	
				if(verificationMap.influence(action, event_sub)){
					relation.push([index, sub_index])
					
				}
			}
		}
	}
	return relation
}

function getRuleFlows(relation_ECA){

	var pairs = relation_ECA
	var flow = new Flow(pairs[0])
	var loop = true
	while(loop){
		loop = false
		for(var pair of pairs){
			var result = flow.setNewFlows(pair)
			if(result == -1){
				return flow // circularity_error
			}else if(result == 1)
				loop = true // this pair donot occure error, next~
		}
		// if no more connection, loop will end...
	}
	
		
	return flow
}


class Flow{
	constructor(pair){
		this.ecaflows = new Array()
		this.ecaflows.push(pair)
		this.circularity_error = new Array()
	}
	setNewFlows(pair){
		var result = 0 //there is no relation
		for(var index in this.ecaflows){
			var ecaflow = this.ecaflows[index]
			var last_index = ecaflow.length-1
			if(ecaflow[last_index] == pair[0]){ //have a relation
				if(ecaflow[0] == pair[1]){ 
					this.input_CircularityInfo(ecaflow, pair)
					return -1; //circularity error
				}else{
					// no circularity 
					var new_ecaflow = ecaflow.slice()
					new_ecaflow.push(pair[1])
					if (this.checkDuplicate(new_ecaflow) == false){
						this.ecaflows.push(new_ecaflow);
						result = 1
					} 
					  //set New Flows 
				}
			}
		}

		return result
	}
	checkDuplicate(new_ecaflow){
		var result = true
		for(var ecaflow of this.ecaflows){
			if(ecaflow.length == new_ecaflow.length){
				var a = ecaflow.toString();
				var b = new_ecaflow.toString();
				if (a === b)
					return true
			}
		}
		return false
	}
	input_CircularityInfo(ecaflow, pair){
		this.circularity_error.push([ecaflow, pair])
	}
	doesIthaveCircularity(){
		if(this.circularity_error.length == 0)
			return false
		else
			return true
	}
	getCircularity(){
		return this.circularity_error
	}

}
class VerficationResult{
	constructor(eca){
		this.simpleECA = eca
		
		this.inconsistency1 = new Array()
		this.redundancy1 = new Array()
		this.inconsistency2= new Array()
		this.redundancy2 = new Array()
		this.inconsistency3= new Array()
		this.redundancy3 = new Array()

		this.circularity = new Array()
	}
	reportInconsistency_Redundancy(error){
		this.inconsistency1 = error[0]
		this.inconsistency2 = error[1]
		this.inconsistency3 = error[2]
		this.redundancy1 = error[3]
		this.redundancy2 = error[4]
		this.redundancy3 = error[5]
	}
	reportCircularityError(error){
		this.circularity = error
	}
	getInconsistency1(){
		return this.inconsistency1
	}
	getRedundancy1(){
		return this.redundancy1
	}
	getCircularity(){
		return this.circularity
	}
	isReliable(){
		if(this.inconsistency1.length == 0 && 
			this.redundancy1.length == 0 && 
			this.circularity.length == 0 )

			return true
		else
			return false
		
	}
	getInconsistencyErrorMessage(){
		var message = ""

		//inconsistency error
		if(this.inconsistency1.length > 0){
			for(var error_pairs of this.inconsistency1){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}
		if(this.inconsistency2.length > 0){
			for(var error_pairs of this.inconsistency2){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}
		if(this.inconsistency3.length > 0){
			for(var error_pairs of this.inconsistency3){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}

		return message
	} 
	getRedundancyErrorMessage(){
		var message = ""

		//Redundancy error
		if(this.redundancy1.length > 0){
			for(var error_pairs of this.redundancy11){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}
		if(this.redundancy2.length > 0){
			for(var error_pairs of this.redundancy2){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}
		if(this.redundancy3.length > 0){
			for(var error_pairs of this.redundancy3){
				var eca1 = error_pairs[0]
				var eca2 = error_pairs[1]

				message += "("+ this.getEventString(eca1.event) +" + "+ this.getActionString(eca1.action) +")"
				message += " vs "
				message += "("+ this.getEventString(eca2.event) +" + "+ this.getActionString(eca2.action) +")\n"
			
			}
		}

		return message
	}
	getCircularityErrorMessage(){
		var message = ""

		//circularity error
		if(this.circularity.length > 0){
			for(var error_pairs of this.circularity){
				var ecaflows_index = error_pairs[0]
				var eca2_index = error_pairs[1][1]

				for(var eca_index of ecaflows_index){
					//action -> event
					var event = this.simpleECA[eca_index].event
					var action = this.simpleECA[eca_index].action

					message += "("+ this.getEventString(event) +" + "+ this.getActionString(action) +")"
									+" -> "
				}

				var event = this.simpleECA[eca2_index].event
				var action = this.simpleECA[eca2_index].action
				message += "\n\tfrist rule will repeat("+ this.getEventString(event) +" + "+ this.getActionString(action) +")"
			}
		}

		return message


	}
	getEventString(e){

		var eventString = "?"

		if(e.device){// event from dev
			if(attrMap.isSingle(e.device)){
				if(attrMap.onlyInENUM(e.device)){

					var enum_event = "."+e.attr
					if(e.event_handler != "")
						if(e.event_handler.to != '.')
							enum_event = "."+e.event_handler.to
					
					eventString = e.devname+enum_event

				}else if(attrMap.onlyInNUMBER(e.device)){
					eventString = e.devname+"."+e.attr
				}
			}else if(attrMap.isMultiple(e.device)){
				var attr_obj = attrMap.getMultipleMethod_byid(e.device, e.attrtype)
				if(attr_obj.type == "ENUM"){

				
					var enum_event = "."+e.attr
					if(e.event_handler != "")
						if(e.event_handler.to != '.')
							enum_event = "."+e.event_handler.to
					
					eventString = e.devname+enum_event

				}else if(attr_obj.type == "NUMBER"){

				}
			}
		}else if(e.abstract_){ //locate, app

			e.abstract_;

			
			var enum_event = "."+e.attr
			if(e.event_handler != "")
				if(e.event_handler.to != '.')
					enum_event = "."+e.event_handler.to
			eventString = e.abstract_+enum_event

		}else if(e.predefined_){ //init method
			eventString = e.handler + "()"

		}else if(e.timerhandler){ //timer
			eventString = e.timerhandler + "()"

		}else if(e.time){ //schedule
			eventString = "at "+ time
		}else if(e.handler){ //schedule

			eventString = e.handler + "()";
		}

		return eventString
	}
	getActionString(action){

		var actionString = "?"

		if(action.command){
			actionString = action.command

		}else if(action.method){
			actionString = action.method

		}else if(action.timerhandler){
			actionString = action.timerhandler
		}


		return actionString

	}alert_(){
		var circularityErrorMessage = this.getCircularityErrorMessage()
		var inconsistencyErrorMessage = this.getInconsistencyErrorMessage()
		var redundancyErrorMessage = this.getRedundancyErrorMessage()
 
		var windowObj = window.open("support/alert_verification.html?CircularityError="+circularityErrorMessage+"&inconsistencyError="+inconsistencyErrorMessage+"&redundancyError="+redundancyErrorMessage+", 'myWindow', 'location=no , scrollbars=no,toolbar=no,resizable=no,width=800px,height='+500+'px,left=400,top=100");
				
	}
}
	
function inconsistency_redundancy(ecaLists, ruleFlows){
	var inconsistency1 = new Array()
	var redundancy1 = new Array()
	var inconsistency2= new Array()
	var redundancy2 = new Array()
	var inconsistency3= new Array()
	var redundancy3 = new Array()

	//eca vs eca
	for(var index = 0; index < ecaLists.length; index++){ 
		for(var sub_index = index+1; sub_index < ecaLists.length; sub_index++){

			var eca1 = ecaLists[index]
			var eca2 = ecaLists[sub_index]

			if(redundancy(eca1, eca2))
				redundancy1.push(eca1, eca2)
			

			if(inconsistency(eca1, eca2))
				inconsistency1.push(eca1, eca2)
			
		}
	}

	var ecaflows = ruleFlows.ecaflows
	//eca vs eca flow
	for(var eca1 of ecaLists){ 
		for(var flow of ecaflows){
			var eca2 = getECAofFlow(ecaLists, flow)

			if(redundancy(eca1, eca2))
				redundancy2.push(eca1, eca2)
			

			if(inconsistency(eca1, eca2))
				inconsistency2.push(eca1, eca2)
			
		}
	}

	for(var index = 0; index < ecaflows.length; index++){ 
		var flow1 = ecaflows[index]
		var eca1 = getECAofFlow(ecaLists, flow1)
		for(var sub_index = index+1; sub_index < ecaflows.length; sub_index++){ 
			var flow2 = ecaflows[index]
			var eca1 = getECAofFlow(ecaLists, flow1)

			if(redundancy(eca1, eca2))
				redundancy3.push(eca1, eca2)

			if(inconsistency(eca1, eca2))
				inconsistency3.push(eca1, eca2)
			
		}
	}



	return [inconsistency1, inconsistency2, inconsistency3, 
			redundancy1, redundancy2, redundancy3]
}


function getECAofFlow(ecaLists, flow){
	var star = flow[0]
	var last = flow[flow.length-1]

	var eca_event = ecaLists[star].event
	var eca_condition1 = ecaLists[star].condition
	var eca_condition2 = ecaLists[last].condition
	var eca_action = ecaLists[last].action	
	
	var newECA = new simpleECA_flow(eca_event, eca_condition1, eca_condition2, eca_action)

	return newECA

}

function redundancy(eca1, eca2){

	var event1 = eca1.event	
	var event2 = eca2.event	
	var condition1 = eca1.condition	
	var condition2 = eca2.condition	
	var action1 = eca1.action
	var action2 = eca2.action	

	if(conflictAction(action1, action2))//Check Redundancy
		if(sameEvent(event1, event2) && sameCondition(condition1, condition2))
			return true
	return false
}

function inconsistency(eca1, eca2){

	var event1 = eca1.event	
	var event2 = eca2.event	
	var condition1 = eca1.condition	
	var condition2 = eca2.condition	
	var action1 = eca1.action
	var action2 = eca2.action	

	if(sameAction(action1, action2))//Check Inconsistency
		if(sameEvent(event1, event2) && sameCondition(condition1, condition2))
			return true
	return false
}

function sameEvent(event, event_sub){

	if(event.device && event_sub.device && event.devname == event_sub.devname){// event from dev

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

	}else if(event.abstract_ && event_sub.abstract_ 
		&& event.abstract_ == event_sub.abstract_ && event.attr == event_sub.attr){ //locate, app
		
		return true
		
	}else if(event.predefined_ && event_sub.predefined_ && event.predefined_ == event_sub.predefined_){ //init method

		return true
		
	}else if(event.timerhandler && event_sub.timerhandler && event.timerhandler == event_sub.timerhandler){ //timer
		
		return true

	}else if(event.time && event_sub.time && event.time == event_sub.time){ //schedule
		return true
		
	}else if(event.handler && event_sub.handler && event.handler == event_sub.handler){ //subscribe
		return true
	}

	return false
}


function sameCondition(condition, condition_sub){
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
					var right = sameCondition(condition.right, condition_sub.right)
					var left = sameCondition(condition.left, condition_sub.left)
					if(right > 0 && left > 0){
						result = right + left 	
					}else{ // swap
						right = sameCondition(condition.right, condition_sub.left)
						left = sameCondition(condition.left, condition_sub.right)
						if(right > 0 && left > 0)
							result = right + left 	
					}
				
				}else if(operator == '||'){
					var right2right = sameCondition(condition.right, condition_sub.right)
					if(right2right > 0){
						result = right2right 		
					}else{
						var left2left = sameCondition(condition.left, condition_sub.left)
						if(left2left > 0){
							result = left2left 		
						}else{
							var right2left = sameCondition(condition.right, condition_sub.left)
							if(right2left > 0){
								result = right2left 		
							}else{
								var left2right = sameCondition(condition.left, condition_sub.right)
								if(left2right > 0)
									result = left2right 		
							}
						}
					}
				
				}else if(operator == '!'){
					result = sameCondition(condition.right, condition_sub.right)
					
				}else if(right.devname == right_sub.devname && right.constructor == Inputc){// alway be f(inputc) in right ;f < f, f <= n, m <= n, fϵd   
					if(left.constructor == Inputc && left_sub.constructor == Inputc){ // f ? f
						if(left.devname == left_sub.devname){
							result = 1
						}
					}else if(left.constructor == Attribute && left_sub.constructor == Attribute){ // f ? n(attribute)
						if(left.attr == left_sub.attr && left.dev == left_sub.dev)
							result = 1
							
					}else if(left.constructor == Data && left_sub.constructor == Data){  // f ? n(number)
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
		if(left.constructor == Data && left_sub.constructor == Data){

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
					result = sameCondition(right, condition_sub)
				}else if(operator != "!" && operator_sub == "!"){//the other and not
					result = sameCondition(condition, right_sub)
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
					}else if(left.constructor == Data && left_sub.constructor == Data){  // f ? n(number)
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
function conflictAction(action, action_sub){

	if(action.devname && action_sub.devname && action.devname == action_sub.devname){
		if(verificationMap.conflict(action.command_part, action_sub.command_part))
			return true
	}else if(action.method && action_sub.method){
		;
	}else if(action.state && action_sub.state){
		;
	}else if(action.timerhandler && action_sub.timerhandler){
		;
	}	
	return false
}

function sameAction(action, action_sub){

	if(action.devname && action_sub.devname && action.devname == action_sub.devname){
		
		if(action.command && action_sub.command && action.command == action_sub.command)
			return true
		else if(action.method && action_sub.method && action.method.id == action_sub.method.id ){
			if(action.method.args && action_sub.method.args && action.method.args == action_sub.method.args )
				return true
		}
	}else if(action.functionhandler && action_sub.functionhandler){
		return true;
	}else if(action.state && action_sub.state){
		;
	}else if(action.timerhandler && action_sub.timerhandler){
		;
	}	
	return false
}
