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

var Block_colour_condition = "#"+"BCBC01"


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.logic.HUE = 210;

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
    this.setColour(Blockly.Blocks.logic.HUE);
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
          ['>', 'LT'],
          //['<', 'GT'],
          ['ϵ', 'EO'],
        ] : [
          ['=', 'EQ'],
          ['<', 'LT'],
          //['>', 'GT'],
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
    this.setColour(Block_colour_condition);
	this.setTooltip("");
	this.setHelpUrl("");
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

  /**
   * Called whenever anything on the workspace changes.
   * Prevent mismatched types from being compared.
   * @this Blockly.Block
   */
 onchange: function(event) {
	var dropdown = this.getInput('B').fieldRow[0];

    var blockA = this.getInputTargetBlock('A');
    var blockB = this.getInputTargetBlock('B');

	if(dropdown.value_ =='EO'){
		this.getInput('B').setCheck(["Device"]);
	}else if(dropdown.value_ =='EQ'|| dropdown.value_ =='LT' || dropdown.value_ =='GT'){
		this.getInput('B').setCheck(["c_dev","attribute", "number"]);
		if(typeof event.element == "string"){
		}else{
			if(blockA && blockB){
				if(blockA.inputList.length > 0 && blockB.inputList.length > 0){
					if(blockA.type.includes("c_")&& blockB.type == "dev_attr"){
						
						var device_Name = blockA.inputList["0"].fieldRow[1].text_;
						var device_type = blockA.inputList["0"].fieldRow[1].variableTypes;


						blockB.removeInput('dropDownDevice');
						blockB.appendDummyInput('dropDownDevice')
							  .appendField(new Blockly.FieldLabel(device_type.toLowerCase(), "device"), "device");
						blockB.removeInput('dropDownField');
						blockB.appendDummyInput('dropDownField')
							  .appendField(setAttrField(device_type), 'attribute');
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
    this.setColour(Block_colour_condition);
    this.setOutput(true, "Condition");
  }
};


function condition_block(devname){
	Blockly.SmartThings['c_'+devname] = function(block) {
	  var type = block.getFieldValue('type');
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
	  // TODO: Assemble SmartThings into code variable.
	  
	  var c = new inputc();
	  c.device = type;
	  c.devname =variable_name;
	  c.input = 'input \"'+variable_name+'\", \"capability.'+type +'\", title:\"'+variable_name+'\"' ;
	  return c;
	  //var code = 
	  // TODO: Change ORDER_NONE to the correct strength.
	  //return [code, Blockly.SmartThings.ORDER_NONE];
	};

	Blockly.Blocks['c_'+devname] = {
	    init: function() {    
			this.appendDummyInput()
				.appendField(new Blockly.FieldLabel(devname), "type")
				.appendField(new Blockly.FieldVariable(devname+event_num, true, devname), "name");
			this.setOutput(true, "c_dev");
			this.setColour(Block_colour_condition);
			this.setTooltip("");
			this.setHelpUrl("");
	  }
	};
}


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
    this.setColour(Blockly.Blocks.logic.HUE);
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
        this.appendDummyInput('dropDownField')
		.appendField(new Blockly.FieldDropdown(deviceList), 'device')
        .appendField("Device");
		this.setInputsInline(true);
		this.setColour(Block_colour_condition);
        this.setOutput(true, 'Device');
        var thisBlock = this;
    }
};

Blockly.Blocks['dev_attr'] = {
    init : function() {
        this.appendDummyInput('dropDownDevice')
        .appendField(new Blockly.FieldLabel("device.", "device"), "device");
        this.appendDummyInput('dropDownField')
		.appendField(new Blockly.FieldDropdown([[ "field", "field" ]]), 'attribute');
		this.setInputsInline(true);
		this.setColour(Block_colour_condition);
        this.setOutput(true, 'attribute');
        var thisBlock = this;
    }
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

function setDeviceField(){
	var list = new Array();

	for(i in deviceList)
		list.push([deviceList[i],deviceList[i]]);

	return list
}


/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating SmartThings for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
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
    'LT': '<',
    'GT': '>',
	'EO': 'ϵ'
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.SmartThings.ORDER_EQUALITY : Blockly.SmartThings.ORDER_RELATIONAL;
  var argument0 = Blockly.SmartThings.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.SmartThings.valueToCode(block, 'B', order) || '0';
  
  var c = new Condition();
  c.right = argument0;
  c.left = argument1;
  c.operator = operator;
  
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
  var dropdown_name2 = block.getFieldValue('attr');
  // TODO: Assemble SmartThings into code variable.

  var dev_attr = new Device_attr();
  dev_attr.dev = dropdown_name
  dev_attr.attr = dropdown_name2
  // TODO: Change ORDER_NONE to the correct strength.
  return dev_attr

};

Blockly.SmartThings['number'] = function(block) {
  var text_number = block.getFieldValue('number');
  // TODO: Assemble SmartThings into code variable.
  var code = text_number;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.SmartThings.ORDER_NONE];
};