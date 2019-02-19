function condition_block(device, type){
	Blockly.SmartThings['c_'+device+type] = function(block) {
	  var type = block.getFieldValue('type');
	  var attribute_id = block.getFieldValue('attribute_id');
	  var variable_name = Blockly.SmartThings.variableDB_.getName(block.getFieldText('name'), Blockly.Variables.NAME_TYPE);
	  // TODO: Assemble SmartThings into code variable.
	  type = returnName(type);
	  var c = new Inputc();
	  c.device = type;
	  c.devname =device+variable_name;
	  c.input = 'input \"'+c.devname+'\", \"capability.'+type +'\", title:\"'+c.devname+'\"' ;
	  c.attribute_id = attribute_id;
	  return c;
	 
	};

	Blockly.Blocks['c_'+device+type] = {
	    init: function() {
			var new_devName = shortName(device)
			var count = deviceCount.get(device)
			if(type == "single"){
				this.appendDummyInput("device")
					.appendField(new Blockly.FieldLabel(new_devName), "type")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name"); // , null, null, device)
			}else if(type == "multiple"){
				var attr = attrMap.getMultipleMethod_id_vaules(device)
				this.appendDummyInput("device")
					.appendField(new Blockly.FieldLabel(new_devName), "type")
					.appendField(new Blockly.FieldVariable(count, null, null, device), "name")
					.appendField(new Blockly.FieldDropdown(attr),"attribute_id");

			}
			var block = this.getInput("device");
		
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
