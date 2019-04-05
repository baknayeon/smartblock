/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.logic');

goog.require('Blockly.Blocks');


Blockly.SmartThings['operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.SmartThings.ORDER_LOGICAL_AND :
      Blockly.SmartThings.ORDER_LOGICAL_OR;
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order);
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  
  var c = new Condition();
  c.right = argument1;
  c.left = argument0 ;
  c.operator = operator;
  return c;
};

Blockly.SmartThings['compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '>',
    'LTQ': '>=',
    'GT': '<',
    'GTQ': '<=',
	'EO': 'ϵ',
	'NEO': '∉'
	
  };

  
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?Blockly.SmartThings.ORDER_EQUALITY : Blockly.SmartThings.ORDER_RELATIONAL;
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order) || "%grouping";
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order) || "";
  
  if(argument0 != "%grouping" ){
	  //not grouping
	  var c = new Condition();
	  c.right = argument0;
	  c.left = argument1;
	  c.operator = operator;	
 
  }else if(argument0 == "%grouping"){
	  //grouping
	  var c = new Condition();
	  c.right = argument0;
	  c.left = argument1;
	  c.operator = operator;	

  }
  
  return c;
};

Blockly.SmartThings['boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  
  var c = new Condition();
  c.result = code;
  return c;
};

Blockly.SmartThings['negate'] = function(block) {
	// Negation.
	var value_not = Blockly.SmartThings.valueToCode(block, 'not', Blockly.SmartThings.ORDER_ATOMIC);
	// TODO: Assemble SmartThings into code variable.
	var c = new Condition();
	if(value_not.result == 'true'){//if result have a value it is boolean
		c.result = 'false';
	}else if(value_not.result == 'false'){
			c.result = 'true';
	}else{
		c.right = value_not;
		c.operator = "!";
	}
	
	return c;
};




//Calculation
Blockly.SmartThings['math_condition'] = function(block) {
  var value_a = Blockly.SmartThings.valueToCode(block, 'A', Blockly.SmartThings.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_b = Blockly.SmartThings.valueToCode(block, 'B', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var left = value_a //data hard coding
  var right = value_b
  var inputList = new Array()

  if(value_a.constructor == Inputc){
  	inputList.push(value_a)
  }else if(value_a.constructor == API){
  	if (value_a.inputs) 
  		inputList = inputList.concat(value_a.inputs)
  }else if(value_a.constructor == Calculation){
  	if (value_a.inputs) 
  		inputList = inputList.concat(value_a.inputs)
  }
  
  if(value_b.constructor == Inputc){
  	inputList.push(value_b)

  }else if(value_b.constructor == API){
  	if (value_b.inputs) 
  		inputList = inputList.concat(value_b.inputs)

  }else if(value_a.constructor == Calculation){
  	if (value_a.inputs) 
  		inputList = inputList.concat(value_a.inputs)
  }


  var c = new Calculation()
  c.inputs = inputList
  c.operator = dropdown_op 
  c.left = left   // =  left+" "+dropdown_op+" "+right;
  c.right = right  
  // TODO: Change ORDER_NONE to the correct strength.
  return c;
};


//device attribute (String)
Blockly.SmartThings['device_list'] = function(block) {
  var dropdown_name = block.getFieldValue('device');
  // TODO: Assemble SmartThings into code variable.
  var code = dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return code
};

Blockly.SmartThings['dev_attr'] = function(block) {
  var dropdown_name = block.getFieldValue('device');
  var dropdown_attribute_id = block.getFieldValue('attribute_id');
  var dropdown_attribute = block.getFieldValue('attribute');
  // TODO: Assemble SmartThings into code variable.

  var dev_attr = new Attribute();
  dev_attr.device = returnName(dropdown_name)
  dev_attr.attr = dropdown_attribute
  dev_attr.attribute_id = block.attribute_id
  // TODO: Change ORDER_NONE to the correct strength.
  return dev_attr

};


//String and Number (String)

Blockly.SmartThings['datac'] = function(block) {
  var data = block.getFieldValue('data');
  // TODO: Assemble SmartThings into code variable.
  // TODO: Change ORDER_NONE to the correct strength.

  return data
};



//input
Blockly.SmartThings['inputc_data'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
   // TODO: Assemble SmartThings into code variable.

  	  var c = new Inputc();
	  c.type = dropdown_type;
	  c.name = dropdown_type+variable_name;
	  c.input = 'input \"'+c.name+'\", \"'+ c.type +'\", title:\"'+c.name+'\"' ;
	  return c;
	  //var code =


  return code;
};







//API - function call 
Blockly.SmartThings['function_invocation_c'] = function(block) {
	
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var condition = new Condition()
	  condition.functionhandler = "function_condition"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return condition;
};

//API - is_null
Blockly.SmartThings['is_null'] = function(block) {
  var arg = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  var c = new Condition();
   c.operator = "is_null"
    c.result = arg


  // TODO: Change ORDER_NONE to the correct strength.
  return c;
};


//API- alreay
Blockly.SmartThings['already_enum'] = function(block) {
  var device_input = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  var event_value = block.getFieldValue('event_value');

  var time_input = Blockly.SmartThings.valueToCode(block, 'number', Blockly.SmartThings.ORDER_ATOMIC);
  var time_min = block.getFieldValue('time_min');
  // TODO: Assemble SmartThings into code variable.
 
   var a = new Occurrences();
   a.type = "already_enum"; 
   a.input = device_input; 
   a.event_value = event_value

   if(time_input){
		a.time = time_input 
		a.arginput = time_input 
   }else if(time_min){
		a.time =time_min*1000

   }
   var c = new Condition();
   c.result = a
   c.operator = "already"


  return a;
};

Blockly.SmartThings['already_num'] = function(block) {
    var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '>',
    'LTQ': '>=',
    'GT': '<',
    'GTQ': '<=',
	'EO': 'ϵ',
	'NEO': '∉'
  };


  var device_input = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  var event_number = Blockly.SmartThings.valueToCode(block, 'number_operator', Blockly.SmartThings.ORDER_ATOMIC);
  
  var operator = OPERATORS[block.getFieldValue('operator')];

  var time_input = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  var time_min = block.getFieldValue('time_min');



   var a = new Occurrences();
   a.type = "already_num";
   a.input = device_input;	 
   a.operator = operator;

   if(event_number.constructor == Inputc){
  	 a.compare = event_number
     a.input2 = event_number;

   }else if(event_number.constructor == String)
  	 a.compare = value_attribute
   else if(event_number.constructor == Calculation)
  	 a.compare = value_attribute
  
   if(time_input){
		a.time = time_input 
		a.arginput = time_input 
   }else if(time_min){
		a.time =time_min
   }
   
   var c = new Condition();
   c.result = a
   c.operator = "already"

  return a;
};


//API- happen
Blockly.SmartThings['happen_enum_dropdown'] = function(block) {
  var device_input = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  var event_value = block.getFieldValue('value'); 
  var dropdown_a = block.getFieldValue('A');
  var dropdown_b = block.getFieldValue('B');
  // TODO: Assemble SmartThings into code variable.
 
 if(dropdown_a == "cleartime")
	dropdown_a = "(new Date()).clearTime()"
 else if(dropdown_a == "present")
	dropdown_a = "new Date()"

 
 if(dropdown_b == "cleartime")
	dropdown_b = "(new Date()).clearTime()"
 else  if(dropdown_b == "present")
	dropdown_b = "new Date()"


   var a = new Occurrences();
   a.event_value = event_value
   a.time = "eventsBetween("+ dropdown_a +", "+ dropdown_b +")"
   a.input = device_input; 
   a.type = "happen_enum_dropdown"; 
 
   var c = new Condition();
   c.result = a
   c.operator = "already"
  return a;
};





//API - get (String)

Blockly.SmartThings['getlocation_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
  c.value =  "getlocation";
  return c;
};


Blockly.SmartThings['getsunrise_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
  c.value =  "getSunriseAndSunset().sunrise.time";
  return c;
};


Blockly.SmartThings['getsunset_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
  c.value =  "getSunriseAndSunset().sunset.time";
  return c;
};


Blockly.SmartThings['getweatherfeature_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
  c.value =  "getWeatherFeature()";
  return c;
};
Blockly.SmartThings['getlocationmode_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  var c = new API()
  c.value =  "location.mode";
  return c;
};



//API - now (String)
Blockly.SmartThings['now_c'] = function(block) {
  var c = new API()
  c.value =  "now()";
  return c;
};



//API - state (String)
Blockly.SmartThings['condition_state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var api = new API()
  api.type = "state"
  api.value = "state.box"+variable_name
  // TODO: Change ORDER_NONE to the correct strength.
  return api;
};



//API- last time (String)
Blockly.SmartThings['last_event_data'] = function(block) {
  var value_device = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  	var device = value_device.device
  	var devname = value_device.devname
	var api = new API()
	api.inputs = [value_device]
	api.type = "last_event_data"

	if(attrMap.isSingle(device)){
		if(attrMap.onlyInENUM(device)){
			var attr_id = attrMap.getENUM_id(device)
			api.value = devname +".currentState(\""+ attr_id+"\").rawDateCreated.time"
		}else if(attrMap.onlyInNUMBER(device)){
			var attr_id = attrMap.getNUM_id(device)
			api.value = devname +".currentValue(\""+ attr_id+"\").rawDateCreated.time"
		}
	}else if(attrMap.isMultiple(device)){
	
	}
  
  // TODO: Change ORDER_NONE to the correct strength.
  return api;
};



//API- last time (String)
Blockly.SmartThings['toDateTime'] = function(block) {
  var time = Blockly.SmartThings.valueToCode(block, 'time', Blockly.SmartThings.ORDER_ATOMIC);
  // TODO: Assemble SmartThings into code variable.
  	 var api = new API()
	
	if(time.constructor == Inputc){
		api.inputs = [time]
		api.value = "toDateTime("+time.name+", location.timeZone).getTime()"
	}else if(time.constructor == String){
		api.value = time * 1000
	}
  // TODO: Change ORDER_NONE to the correct strength.
  return api;
};




//class


function Occurrences(){
	this.input;
	this.attr_value;
	this.time;
	this.type;
	this.operator;

}

function Calculation() {
	this.inputs;
	this.operator;
	this.left;
	this.right;
}

function Args() {
	this.devname;
	this.device;
}



function Inputc(){
	this.device;
	this.devname;
	this.input;
	
	this.type;
	this.name;
}


function Attribute(){
	this.dev;
	this.attr_id;
	this.attr;
}

function state() {
	this.devname;
	this.device;
}


function API() {
	this.value;
	this.inputs;
	this.type;
}


