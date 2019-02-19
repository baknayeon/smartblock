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
		.setCheck(["Inputc",  "state", "data", "API", "math_condition", "OCC"]);
    this.appendValueInput('B')
		.setCheck(["Inputc", "Attribute", "state", "data", "API", "math_condition", "OCC"])
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
		}else if(dropdown =='EQ'|| dropdown =='NEQ'|| dropdown =='LT' || dropdown =='GT' || dropdown =='LTQ' || dropdown =='GTQ' ){
			this.getInput('B').setCheck(["Inputc", "Attribute", "state", "data", "API", "math_condition", "OCC"]);
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
									  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
									  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
							}else if(attrMap.onlyInNUMBER(device)){

								blockB.appendDummyInput('dev_attr')
									  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
									  .appendField(new Blockly.FieldTextInput("0"), "attribute");
							}else if(attrMap.isMultiple(device)){
								var attribute_id = blockA.getFieldValue('attribute_id');

								var typeAttr  = attrMap.getMultipleMethod_type_byid(device, attribute_id)
								if(typeAttr == "ENUM"){
									var newAttr = attrMap.getMultipleMethod_vaules_byid(device, attribute_id)
									blockB.appendDummyInput('dev_attr')
										  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
										  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
									blockB.attribute_id = attribute_id

								}else if(typeAttr == "NUMBER"){
									blockB.appendDummyInput('dev_attr')
										 .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
									  	 .appendField(new Blockly.FieldTextInput("0"), "attribute");
									blockB.attribute_id = attribute_id
								}
							}
				}
			}

	}
	if(event.type=="create"){
		if(blockA && blockB){
			var device = blockB.getFieldValue("device")
			if(device === "device"){
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
							  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
							  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
					}else if(attrMap.onlyInNUMBER(device)){

						blockB.appendDummyInput('dev_attr')
							  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
							  .appendField(new Blockly.FieldTextInput("0"), "attribute");
					}else if(attrMap.isMultiple(device)){
						var attribute_id = blockA.getFieldValue('attribute_id');

						var typeAttr  = attrMap.getMultipleMethod_type_byid(device, attribute_id)
						if(typeAttr == "ENUM"){
							var newAttr = attrMap.getMultipleMethod_vaules_byid(device, attribute_id)
							blockB.appendDummyInput('dev_attr')
								  .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
								  .appendField(new Blockly.FieldDropdown(newAttr), 'attribute');
							blockB.attribute_id = attribute_id

						}else if(typeAttr == "NUMBER"){
							blockB.appendDummyInput('dev_attr')
								 .appendField(new Blockly.FieldLabel(device_type, "device"), "device")
								 .appendField(new Blockly.FieldTextInput("0"), "attribute");
							blockB.attribute_id = attribute_id
						}
					}
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









Blockly.Blocks['math_condition'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(["API","Inputc", "state", "data", "OCC", "math_condition"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"]]), "OP");
    this.appendValueInput("B")
        .setCheck(["API","Inputc", "state", "data", "OCC", "math_condition"]);
    this.setInputsInline(true);
    this.setOutput(true, "math_condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




//device attribute
Blockly.Blocks['dev_attr'] = {
    init : function() {
        this.appendDummyInput('dev_attr')
        .appendField(new Blockly.FieldLabel("device", "device"), "device")
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
			if(device.text_ == "device "){

			}
		}
		 
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



//String and Number

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



//input
Blockly.Blocks['inputc_data'] = {
  init: function() {
  		var device = "text"
		var count = deviceCount.get(device)
		this.appendDummyInput("device")
				 .appendField(new Blockly.FieldDropdown(input_data_type), "type") // definder_helper
				.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
		this.setColour(Block_colour_condition);
    this.setInputsInline(true);
    this.setOutput(true, "Inputc");
	 this.setTooltip("");
	 this.setHelpUrl("");
  },onchange: function(event) {
	changInput(event, this)
  }

};



//API - function call 
Blockly.Blocks['function_invocation_c'] = {
  init: function() {
	var count = deviceCount.get("function")
    this.appendDummyInput()
        .appendField("function")
		.appendField(new Blockly.FieldVariable(count, null, null, "function"), "NAME");
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//API - is_null 
Blockly.Blocks['is_null'] = {
  init: function() {
    this.appendValueInput("device")
        .setCheck(["Inputc", "state"]);
    this.appendDummyInput()
        .appendField("set up or not ?");
    this.setInputsInline(true);
    this.setOutput(true, "Condition");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
 }
}



//API- OCC
Blockly.Blocks['already_enum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("num of occ");

    this.appendValueInput("device")
        .setCheck("Inputc");
    this.appendDummyInput("attribute");

    this.appendDummyInput()
        .appendField("during last");

    this.appendDummyInput("number")
        .appendField(new Blockly.FieldTextInput(3), "time_min");
    this.appendDummyInput("min_checkbox")
        .appendField("min")
		.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

    this.setInputsInline(true);
    this.setOutput(true, "OCC");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.type==Blockly.Events.BLOCK_MOVE ){
		if(event.newParentId == this.id){
			if(event.newInputName == "device"){

				var block_device = this.getInputTargetBlock('device');
				if(block_device){
					var device =  returnName(block_device.getFieldValue('type'))
					var attrBlock = this.getInput("attribute")

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);
						attrBlock.appendField(new Blockly.FieldDropdown(newAttr), 'event_value');
					}
				}
			}	
		}else if(event.oldParentId == this.id){
			if(event.oldInputName == "device"){
					var attrBlock = this.getInput("attribute")
						attrBlock.removeField('event_value');
			}
			
		}

	}else if(event.type == Blockly.Events.BLOCK_CHANGE &&  event.blockId == this.id &&event.element == "field" && event.name == "min_checkbox"){//change checkbox
		this.removeInput("number")
		this.removeInput("min_checkbox")
		if(event.newValue == false){
			this.appendValueInput("number")
				.setCheck(["API","Inputc", "state", "data", "math_condition"]);
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "min_checkbox");
		}else if(event.newValue == true){
			this.appendDummyInput("number")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}/*else if(this.type = "already_enum" && event.type == Blockly.Events.BLOCK_CREATE && event.blockId == this.id){
	
		var block_device = this.getInputTargetBlock('device');
				if(block_device){
					var device =  returnName(block_device.getFieldValue('type'))
					var attrBlock = this.getInput("attribute")

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);
						attrBlock.appendField(new Blockly.FieldDropdown(newAttr), 'event_value');
					}
				}
		var b = this.getFieldValue("min_checkbox")



		if(b == "FALSE"){

			this.removeInput("number")
			this.removeInput("min_checkbox")
			this.appendValueInput("number")
				.setCheck("Inputc");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "min_checkbox");
	
		}else if(b == "TRUE"){
			
			this.removeInput("number")
			this.removeInput("min_checkbox")
			this.appendDummyInput("number")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}*/
	
  }
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
	  
    this.appendDummyInput()
        .appendField("num of occ");

    this.appendValueInput("device")
        .setCheck("Inputc");
     this.appendValueInput("number_operator")
		 .appendField(new Blockly.FieldDropdown(OPERATORS), 'operator')
        .setCheck(["data","Inputc","math_condition" ]);

    this.appendDummyInput()
        .appendField("during last");

    this.appendDummyInput("number")
        .appendField(new Blockly.FieldTextInput(3), "time_min");
    this.appendDummyInput("min_checkbox")
        .appendField("min")
		.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

    this.setInputsInline(true);
    this.setOutput(true, "OCC");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  },onchange: function(event) {
	if(event.blockId == this.id && event.type == Blockly.Events.BLOCK_CHANGE && event.element == "field" && event.name == "min_checkbox"){//change checkbox
		this.removeInput("number")
		this.removeInput("min_checkbox")
		if(event.newValue == false){
			this.appendValueInput("number");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("False"), "min_checkbox");
		}else if(event.newValue == true){
			this.appendDummyInput("number")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}/*else if(this.type = "already_num" && event.type == Blockly.Events.BLOCK_CREATE && event.blockId == this.id){
	
		var block_device = this.getInputTargetBlock('device');
				if(block_device){
					var device =  returnName(block_device.getFieldValue('type'))
					var attrBlock = this.getInput("attribute")

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);
						attrBlock.appendField(new Blockly.FieldDropdown(newAttr), 'event_value');
					}
				}
		var b = this.getFieldValue("min_checkbox")



		if(b == "FALSE"){

			this.removeInput("number")
			this.removeInput("min_checkbox")
			this.appendValueInput("number")
				.setCheck("Inputc");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "min_checkbox");
	
		}else if(b == "TRUE"){
			
			this.removeInput("number")
			this.removeInput("min_checkbox")
			this.appendDummyInput("number")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}*/
	
  }
};


Blockly.Blocks['happen_enum_dropdown'] = {
  init: function() {
	  
    this.appendDummyInput()
        .appendField("num of occ");

	this.appendValueInput("device")
        .setCheck("Inputc");
    this.appendDummyInput("attribute");
    this.appendDummyInput()
        .appendField("during time between");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["present","present"], ["clear time","cleartime"]]), "A");
    this.appendDummyInput()
        .appendField("and")
        .appendField(new Blockly.FieldDropdown([["present","present"], ["clear time","cleartime"]]), "B");
   
    this.setInputsInline(true);
    this.setOutput(true, "OCC");
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

	}else if(event.type == Blockly.Events.BLOCK_CREATE && event.blockId == this.id){
	
		var block_device = this.getInputTargetBlock('device');
				if(block_device){
					var device =  returnName(block_device.getFieldValue('type'))
					var attrBlock = this.getInput("attribute")

					if(attrMap.onlyInENUM(device)){
						var newAttr = attrMap.getENUM_vaules(device);
						attrBlock.appendField(new Blockly.FieldDropdown(newAttr), 'event_value');
					}
				}
		var b = this.getFieldValue("min_checkbox")



		if(b == "FALSE"){

			this.removeInput("time")
			this.removeInput("min_checkbox")
			this.appendValueInput("time")
				.setCheck("Inputc");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "min_checkbox");
	
		}else if(b == "TRUE"){
			
			this.removeInput("time")
			this.removeInput("min_checkbox")
			this.appendDummyInput("time")
				.appendField(new Blockly.FieldTextInput(3), "time_min");
			this.appendDummyInput("min_checkbox")
				.appendField("min")
				.appendField(new Blockly.FieldCheckbox("TRUE"), "min_checkbox");

		}
	}
  }
};







//API - get 

Blockly.Blocks['getlocation_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getLocation");
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getsunrise_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunriseTime");
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getsunset_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getSunsetTime");
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getweatherfeature_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getWeatherFeature");
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//API - now 
Blockly.Blocks['now_c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("now");
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


//API - state 
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


//API- last time
Blockly.Blocks['last_event_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("last event time of ");
    this.appendValueInput("device")
        .setCheck("Inputc");
    this.setInputsInline(true);
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



//API- timeTodayAfter
Blockly.Blocks['toDateTime'] = {
  init: function() {
    this.appendValueInput("number")
        .appendField("time of")
        .setCheck(["Inputc","data"]);
    this.setInputsInline(true);
    this.setOutput(true, "API");
    this.setColour(Block_colour_condition);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};