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
          ['<', 'GT'],
          ['ϵ', 'EO'],
        ] : [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['<', 'LT'],
          ['>', 'GT'],
          ['ϵ', 'EO'],
        ];
    this.appendValueInput('A')
		.setCheck(["c_dev"]);
    this.appendValueInput('B')
		.setCheck(["c_dev", "attribute", "number"])
		.appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.prevBlocks_ = [null, null];
    this.setOutput(true, "Condition");
	this.setTooltip("");
	this.setHelpUrl("");
    this.setColour(Block_colour_condition);
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        //'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        'EO': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
      };
      return TOOLTIPS[op];
    });
  }, 
  forgrouping_: function(device, attr) {
    var OPERATORS = this.RTL ? [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['>', 'LT'],
          ['<', 'GT'],
          ['ϵ', 'EO'],
        ] : [
          ['=', 'EQ'],
          ['≠', 'NEQ'],
          ['<', 'LT'],
          ['>', 'GT'],
          ['ϵ', 'EO'],
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
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        //'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        'EO': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
      };
      return TOOLTIPS[op];
    });
  },
 onchange: function(event) {
	var dropdown = this.getFieldValue('OP');

    var blockA = this.getInputTargetBlock('A');
    var blockB = this.getInputTargetBlock('B');

	if(this.id == event.newParentId && event.newInputName == "B"){
		if(dropdown.value_ == 'EQ' || dropdown.value_ == 'NEQ' ){
			blockB.setCheck(["Device"]);
		}else if(dropdown =='EQ'|| dropdown =='LT' || dropdown =='GT' || dropdown == 'NEQ'){
			if(this.getInput('B'))
				this.getInput('B').setCheck(["c_dev","attribute", "number"]);
			if(typeof event.element == "string"){
			}else{
				if(blockA && blockB){
					var device = blockB.getFieldValue("device")
					if(device === "device."){
						if(blockA.type.includes("c_")&& blockB.type == "dev_attr"){

							var device = blockA.getFieldValue("type")
							var device_type = blockA.getFieldValue('type');
							var length = blockB.inputList.length
							if(length != 0)
								for(var i =0; i< length; i++)
									blockB.removeInput(blockB.inputList[i].name);

							if(attrMap.isOnlyENUM(device)){
								var newAttr = attrMap.getENUM_vaules(device);

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
							}else if(attrMap.isOnlyNUMBER(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldTextInput("0"), "attribute");
							}else if(attrMap.hasMultiTypeENUM(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
									  .appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");

							}else if(attrMap.hasMultiTypeNUMBER(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
									  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
									  .appendField(new Blockly.FieldTextInput("0"), "attribute");

							}
						}
					}
				}
			}
		}else{
			

		}
	}if(event.type=="create"){
		if(blockA && blockB){
			var device = blockB.getFieldValue("device")
			if(device === "device."){
				if(blockA.type.includes("c_")&& blockB.type == "dev_attr"){

					var device = blockA.getFieldValue("type")
					var device_type = blockA.getFieldValue('type');
					var length = blockB.inputList.length
					if(length != 0)
						for(var i =0; i< length; i++)
							blockB.removeInput(blockB.inputList[i].name);

					if(attrMap.isOnlyENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
					}else if(attrMap.isOnlyNUMBER(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldTextInput("0"), "attribute");
					}else if(attrMap.hasMultiTypeENUM(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
							  .appendField(new Blockly.FieldDropdown(attrMap.getENUM_vaules(device)), "attribute");

					}else if(attrMap.hasMultiTypeNUMBER(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type+".", "device"), "device")
							  .appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id")
							  .appendField(new Blockly.FieldTextInput("0"), "attribute");

					}
				}
			}
		}
	}


    // Disconnect blocks that existed prior to this change if they don't match.
    if (blockA && blockB &&
        !blockA.outputConnection.checkType_(blockB.outputConnection)) {
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
			if(goog.isNumber(count)){
				count = count.toString();
			}

			this.appendDummyInput("device")
				.appendField(new Blockly.FieldLabel(new_devName), "type")
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)

			var block = this.getInput("device");
			if(attrMap.hasMultiTypeENUM(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id");
			}else if(attrMap.hasMultiTypeNUMBER(device)){
				block.appendField(new Blockly.FieldDropdown(attrMap.getMultiType(device)), "attribute_id");
			}

			this.setOutput(true, "c_dev");
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
        this.setOutput(true, 'attribute');
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
    'LT': '<',
    'GT': '>',
	'EO': 'ϵ'
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?Blockly.SmartThings.ORDER_EQUALITY : Blockly.SmartThings.ORDER_RELATIONAL;
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order) || "%grouping";
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order) || 0;
  var argument12 = block.getFieldValue('attribute');
 
  if(argument0 != "%grouping"  && argument1 != 0 && argument12 == null){
	  //not grouping
	  var c = new Condition();
	  c.right = argument0;
	  c.left = argument1;
	  c.operator = operator;	
 
  }else if(argument0 == "%grouping"  && argument1 == 0 && argument12 != null){
	  //grouping
	  var c = new Condition();
	  c.right = argument0;
	  c.left = argument12;
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
		c.rigt = value_not;
		c.operator = "!";
	}
	
	return c;
};

Blockly.SmartThings['device_list'] = function(block) {
  var dropdown_name = block.getFieldValue('device');
  // TODO: Assemble SmartThings into code variable.
  var code = dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};

Blockly.SmartThings['dev_attr'] = function(block) {
  var dropdown_name = block.getFieldValue('device');
  var dropdown_attribute_id = block.getFieldValue('attribute_id');
  var dropdown_attribute = block.getFieldValue('attribute');
  // TODO: Assemble SmartThings into code variable.

  var dev_attr = new Device_attr();
  dev_attr.dev = dropdown_name
  dev_attr.attr_id = dropdown_attribute_id
  dev_attr.attr = returnName(dropdown_attribute)
  // TODO: Change ORDER_NONE to the correct strength.
  return dev_attr

};

Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("num")
        .appendField(new Blockly.FieldTextInput("0"), "number");
    this.setInputsInline(true);
    this.setOutput(true, "number");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.SmartThings['number'] = function(block) {
  var text_number = block.getFieldValue('number');
  // TODO: Assemble SmartThings into code variable.
  // TODO: Change ORDER_NONE to the correct strength.

  var dev_attr = new Device_attr();
  dev_attr.attr_id = "number"
  dev_attr.attr = text_number
  
  return dev_attr
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