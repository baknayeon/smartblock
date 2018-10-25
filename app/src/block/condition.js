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


/**
 * Common HSV hue for all blocks in this category.
 */


Blockly.Blocks['operation'] = {
  /**
   * Block for logical operations: 'and', 'or'.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
         [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']];
    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
		.setCheck("Condition");
    this.appendValueInput('B')
		.setCheck("Condition")
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'AND': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
        'OR': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
      };
      return TOOLTIPS[op];
    });
    this.setColour(Block_colour_condition);
    this.setOutput(true, "Condition");
  },
  onchange: function(event) {
  	
  }
};


Blockly.Blocks['compare'] = {
  /**
   * Block for comparison operator.
   * @this Blockly.Block
   */
 init: function() {
    var OPERATORS = this.RTL ? [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['>', 'LT'],
          ['≥', 'LTQ'],
          ['<', 'GT'],
          ['≤', 'GTQ'],
          ['ϵ', 'EO'],
		  ['∉','NEO'],
        ] : [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['>', 'LT'],
          ['≥', 'LTQ'],
          ['<', 'GT'],
          ['≤', 'GTQ'],
          ['ϵ', 'EO'],
		  ['∉','NEO'],
        ];
    this.appendValueInput('A')
		.setCheck(["Inputc", "state"]);
    this.appendValueInput('B')
		.setCheck(["Inputc", "Attribute", "state", "data"])
		.appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.prevBlocks_ = [null, null];
    this.setOutput(true, "Condition");
	this.setTooltip("");
	this.setHelpUrl("");
    this.setColour(Block_colour_condition);
  }, 
  forgrouping_: function(device, attr) {
    var OPERATORS = this.RTL ? [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['>', 'LT'],
          ['≥', 'LTQ'],
          ['<', 'GT'],
          ['≤', 'GTQ'],
          ['ϵ', 'EO'],
		  ['∉','NEO'],
        ] : [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['>', 'LT'],
          ['≥', 'LTQ'],
          ['<', 'GT'],
          ['≤', 'GTQ'],
          ['ϵ', 'EO'],
		  ['∉','NEO'],
        ];
     this.removeInput('A');
     this.removeInput('B');
    this.appendDummyInput('A')
	     .appendField(device+"s");
    this.appendDummyInput('B')
		.appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
		 .appendField(new Blockly.FieldDropdown(attr), 'attribute');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.prevBlocks_ = [null, null];
    this.setOutput(true, "Condition");
	this.setTooltip("");
	this.setHelpUrl("");
    this.setColour(Block_colour_condition);
  },
 onchange: function(event) {
	var dropdown = this.getFieldValue('OP');

    var blockA = this.getInputTargetBlock('A');
    var blockB = this.getInputTargetBlock('B');

	if(this.id == event.blockId && event.element == "field"){
		if(dropdown == 'EO' || dropdown == 'NEO'){
			this.getInput('B').setCheck(["Device"]);
		}else if(dropdown =='EQ'|| dropdown =='LT' || dropdown =='GT' || dropdown =='LTQ'|| dropdown =='GTQ'){
			this.getInput('B').setCheck(["Inputc", "Attribute", "state", "data"]);
		}
	}else if(this.id == event.newParentId ){
		if(event.newInputName == "B" || event.newInputName == "A" )
		if(typeof event.element == "string"){
			}else{
				if(blockB && blockB.type == "dev_attr"){
						//if( blockA.type.includes("c_") && blockB.type == "dev_attr")
						var device
						var device_type
						if(blockA){
							device = returnName(blockA.getFieldValue("type"))
							device_type = blockA.getFieldValue('type');
						}else {
							device_type = this.getFieldText('type');
							device = returnName(this.getFieldText('type'))
							
						}
							var length = blockB.inputList.length
							if(length != 0)
								for(var i =0; i< length; i++)
									blockB.removeInput(blockB.inputList[i].name);

							if(attrMap.onlyInENUM(device)){
								var newAttr = attrMap.getENUM_vaules(device);

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
							}else if(attrMap.onlyInNUMBER(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldTextInput("0"), "attribute");
							}/*else if(attrMap.hasMultiTypeENUM(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
									  .appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");

							}else if(attrMap.hasMultiTypeNUMBER(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
									  .appendField(new Blockly.FieldTextInput("0"), "attribute");

							}*/
				}
			}

	}
	if(event.type=="create"){
		if(blockA && blockB){
			var device = blockB.getFieldValue("device")
			if(device === "device."){
				if(blockA.type.includes("c_")&& blockB.type == "dev_attr"){

					var device = returnName(blockA.getFieldValue("type"))
					var device_type = blockA.getFieldValue('type');
					var length = blockB.inputList.length
					if(length != 0)
						for(var i =0; i< length; i++)
							blockB.removeInput(blockB.inputList[i].name);

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
					}else if(attrMap.onlyInNUMBER(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldTextInput("0"), "attribute");
					}/*else if(attrMap.hasMultiTypeENUM(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
							  .appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");

					}else if(attrMap.hasMultiTypeNUMBER(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
							  .appendField(new Blockly.FieldTextInput("0"), "attribute");

					}*/
				}
			}
		}
	}


    // Disconnect blocks that existed prior to this change if they don't match.
    if (blockA && blockB ) {
      // Mismatch between two inputs.  Disconnect previous and bump it away.
      for (var i = 0; i < this.prevBlocks_.length; i++) {
        var block = this.prevBlocks_[i];
        if (block === blockA || block === blockB) {
          //block.setParent(null);
          //block.bumpNeighbours_();
        }
      }
    }
    this.prevBlocks_[0] = blockA;
    this.prevBlocks_[1] = blockB;
    this.setOutput(true, "Condition");
  
 }
};

function shortName(device){
	var new_devName = ""
	if(device == "carbonDioxideMeasurement") new_devName = "carbonDioxideMeas"
	else if(device == "carbonMonoxideDetector")  new_devName = "carbonMonoxideDet"
	else if(device == "dishwasherOperatingState") new_devName = "dishwasherOper"
	else if(device == "illuminanceMeasurement") new_devName = "illuminanceMeas"
	else if(device == "relativeHumidityMeasurement") new_devName = "relativeHumidityMeas"
	else if(device == "temperatureMeasurement") new_devName = "temperature"
	else if(device == "thermostatCoolingSetpoint") new_devName = "thermostatCoolSet"
	else if(device == "thermostatHeatingSetpoint") new_devName = "thermostatHeatSet"
	else if(device == "thermostatOperatingState") new_devName = "thermostatOper"
	else new_devName = device

	return new_devName
}

function returnName(device){
	var new_devName = ""
	if(device == "carbonDioxideMeas") new_devName = "carbonDioxideMeasurement"
	else if(device == "carbonMonoxideDet")  new_devName = "carbonMonoxideDetector"
	else if(device == "dishwasherOper") new_devName = "dishwasherOperatingState"
	else if(device == "illuminanceMeas") new_devName = "illuminanceMeasurement"
	else if(device == "relativeHumidityMeas") new_devName = "relativeHumidityMeasurement"
	else if(device == "temperature") new_devName = "temperatureMeasurement"
	else if(device == "thermostatCoolSet") new_devName = "thermostatCoolingSetpoint"
	else if(device == "thermostatHeatSet") new_devName = "thermostatHeatingSetpoint"
	else if(device == "thermostatOper") new_devName = "thermostatOperatingState"
	else new_devName = device

	return new_devName
}

Blockly.Blocks['already_enum'] = {
  init: function() {
    this.appendValueInput("device")
        .setCheck("Inputc");
     this.appendDummyInput("attribute")
    this.appendDummyInput()
        .appendField("since")
        .appendField(new Blockly.FieldTextInput(3), "time_min")
        .appendField("min");
    this.setInputsInline(true);
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type==Blockly.Events.BLOCK_MOVE){
		if(event.newParentId == this.id){
			if(event.newInputName == "device"){

				var block_device = this.getInputTargetBlock('device');
				if(block_device){
					var device =  returnName(block_device.getFieldValue('type'))
					var attrBlock = this.getInput("attribute")

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);
						attrBlock.appendField(new Blockly.FieldDropdown(newAttr), 'value');
					}
				}
			}	
		}else if(event.oldParentId == this.id){
			if(event.oldInputName == "device"){
					var attrBlock = this.getInput("attribute")
						attrBlock.removeField('value');
			}
			
		}

	}
	
  }
};
Blockly.SmartThings['already_enum'] = function(block) {
  var value_device = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  var attr_value = block.getFieldValue('value');
  var time_min = block.getFieldValue('time_min');
  // TODO: Assemble SmartThings into code variable.
   var type = value_device.device
   var devname = value_device.devname
   var attr_id = attrMap.getENUM_id(value_device.device)
   var condition = "("+devname+'.eventsSince(new Date(now() - (1000 * '+time_min+')))?.findAll { it.name == \"'+attr_id+'\" }).count { it.value && it.value == \"'+attr_value+'\" } > 1' 

   var a = new Already();
   a.condition = condition;
   a.input = value_device; 
 
   var c = new Condition();
   c.already = a

  return c;
};

Blockly.Blocks['already_num'] = {
  init: function() {
	  var OPERATORS = [
						  ['=', 'EQ'],
						  ['≠', 'NEQ'],
						  ['>', 'LT'],
						  ['≥', 'LTQ'],
						  ['<', 'GT'],
						  ['≤', 'GTQ']
						] ;
    this.appendValueInput("device")
        .setCheck("Inputc");
     this.appendDummyInput("attribute")
		 .appendField(new Blockly.FieldDropdown(OPERATORS), 'operator')
		.appendField(new Blockly.FieldTextInput(" "), 'value');
    this.appendDummyInput()
        .appendField("since")
        .appendField(new Blockly.FieldTextInput(3), "time_min")
        .appendField("min");
    this.setInputsInline(true);
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['already_num'] = function(block) {
  var value_device = Blockly.SmartThings.valueToCode(block, 'device', Blockly.SmartThings.ORDER_ATOMIC);
  var attr_value = block.getFieldValue('value');
  var time_min = block.getFieldValue('time_min');
  // TODO: Assemble SmartThings into code variable.
   var c = new Condition();
   c.right = argument0;
   c.left = "1"; // 
   c.operator = ">";	
   
   var attr_id = attrMap.getENUM_id(value_device.device)
  "("+value_device+".eventsSince(new Date(now() - (1000 * deltaSeconds)))?.findAll { it.name == "+attr_id+" }).count { it.value && it.value == "+attr_value+" } "


  var code = '...;\n';
  return code;
};

function condition_block(device){
	Blockly.SmartThings['c_'+device] = function(block) {
	  var type = block.getFieldValue('type');
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  // TODO: Assemble SmartThings into code variable.
	  type = returnName(type);
	  var c = new Inputc();
	  c.device = type;
	  c.devname =device+variable_name;
	  c.input = 'input \"'+c.devname+'\", \"capability.'+type +'\", title:\"'+c.devname+'\"' ;
	  return c;
	  //var code = 
	  // TODO: Change ORDER_NONE to the correct strength.
	  //return [code, Blockly.SmartThings.ORDER_NONE];
	};

	Blockly.Blocks['c_'+device] = {
	    init: function() {
			var new_devName = shortName(device)
			var count = deviceCount.get(device)

			this.appendDummyInput("device")
				.appendField(new Blockly.FieldLabel(new_devName), "type")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)

			var block = this.getInput("device");
			/*if(attrMap.hasMultiTypeENUM(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id");
			}else if(attrMap.hasMultiTypeNUMBER(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id");
			}*/

			this.setOutput(true, "Inputc");
			this.setColour(Block_colour_condition);
			this.setTooltip("");
			this.setHelpUrl("");
	  },
		onchange: function(event) {

	 		 if(!this.squareBottomLeftCorner_ && event.element == "field" && event.name ==="attribute_id"){
				if(event.blockId == this.id){
					var device = this.getField("device").text_;
					var block = this.getInput(device);
					block.removeField("attribute")
					var attribute_id = this.getField("attribute_id").text_;
					block.appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaulesById(device, attribute_id)),"attribute");
				}
			}
			

		}
	};
}


Blockly.Blocks['dev_attr'] = {
    init : function() {
        this.appendDummyInput('dev_attr')
        .appendField(new Blockly.FieldLabel("device.", "device"), "device")
		.appendField(new Blockly.FieldDropdown([[ "field", "field" ]]), 'attribute');
		this.setInputsInline(true);
		this.setColour(Block_colour_condition);
        this.setOutput(true, 'Attribute');
        var thisBlock = this;
    },
	onchange: function(event) {
		if( this.type == "dev_attr" && event.type && event.type == "create"){
			var device = this.getField("device");
			var attribute = this.getField("attribute");
			if(device.text_ == "device."){

			}
		}
		 
	}

};

Blockly.Blocks['condition_state'] = {
  init: function() {
  
		var count = deviceCount.get("state")
	 this.appendDummyInput()
		.appendField("box")
        .appendField(new Blockly.FieldVariable(count, null, null, "state"), "name");
    this.setInputsInline(true);
    this.setOutput(true, "state");
    this.setColour(Block_colour_condition);
	 this.setTooltip("");
	 this.setHelpUrl("");
  }, onchange: function(event){


  }
};
Blockly.SmartThings['condition_state'] = function(block) {
  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble SmartThings into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return "state.box"+variable_name;
};



'use strict';

goog.provide('Blockly.SmartThings.logic');

goog.require('Blockly.SmartThings');

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
  c.right = argument0;
  c.left = argument1;
  c.operator = operator;
  return c;
};

Blockly.SmartThings['compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '>',
    'LTQ': '≥',
    'GT': '<',
    'GTQ': '≤',
	'EO': 'ϵ',
	'NEO': '∉'
	
  };

  
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?Blockly.SmartThings.ORDER_EQUALITY : Blockly.SmartThings.ORDER_RELATIONAL;
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order) || "%grouping";
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order) || 0;
  
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
	if(value_not.result){//if result have a value it is boolean
		if(value_not.result == 'true')
			c.result = 'false';
		else if(value_not.result == 'false')
			c.result = 'true';
	}else{
		c.right = value_not;
		c.operator = "!";
	}
	
	return c;
};

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
  dev_attr.dev = dropdown_name
  dev_attr.attr_id = dropdown_attribute_id
  dev_attr.attr = returnName(dropdown_attribute)
  // TODO: Change ORDER_NONE to the correct strength.
  return dev_attr

};

Blockly.Blocks['datac'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldTextInput("0"), "data");
    this.setInputsInline(true);
    this.setOutput(true, "data");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['datac'] = function(block) {
  var text_number = block.getFieldValue('data');
  // TODO: Assemble SmartThings into code variable.
  // TODO: Change ORDER_NONE to the correct strength.

  var number = new Number();
  number.value = text_number
  
  return number
};

Blockly.Blocks['inputc_data'] = {
  init: function() {
  		var device = "text"
		var count = deviceCount.get(device)
		this.appendDummyInput("device")
				 .appendField(new Blockly.FieldDropdown([["text","text"], ["bool","bool"], ["number","number"], ["phone","phone"], ["message","message"], ["email","email"], ["password","password"], ["time","time"], ["mode","mode"]]), "type")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
		this.setColour(Block_colour_condition);
    this.setInputsInline(true);
    this.setOutput(true, "Inputc");
	 this.setTooltip("");
	 this.setHelpUrl("");
  },onchange: function(event) {
		if(this.id == event.blockId && event.element == "field"){
		
			var device = event.newValue
			var count = deviceCount.get(device)
			this.getInput("device").removeField("name")
			this.getInput("device")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name");
		
		}
		 
	}

};
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

Blockly.Blocks['getlocation_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getLocation");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getlocation_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getlocation";
};

Blockly.Blocks['getsunrise_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunrise");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunrise_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getsunrise";
};

Blockly.Blocks['getsunset_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunset");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getsunset_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getsunset";
};

Blockly.Blocks['getweatherfeature_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getWeatherFeature");
    this.setOutput(true, "getAPI");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['getweatherfeature_c'] = function(block) {
  // TODO: Assemble SmartThings into code variable.
  return "getWeatherFeature";
};


Blockly.Blocks['boolean'] = {
  /**
   * Block for boolean data type: true and false.
   * @this Blockly.Block
   */
  init: function() {
    var BOOLEANS =
        [[Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
         [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']];
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
    this.setColour(Block_colour_condition);
    this.setOutput(true, "Condition");
  }
};

Blockly.Blocks['negate'] = {
	init: function() {
    this.appendValueInput("not")
		.setCheck("Condition")
        .appendField("not");
    this.setInputsInline(true);
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['device_list'] = {
    init : function() {
        this.appendDummyInput('device_list')
		.appendField(new Blockly.FieldDropdown(Array.from(deviceSet.entries())), 'device')
        .appendField("Device");
		this.setInputsInline(true);
		this.setColour(Block_colour_condition);
        this.setOutput(true, 'Device');
        var thisBlock = this;
    }
};