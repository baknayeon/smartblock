function mapInit(){ 
    try{ 
        attrMap.putENUM("alarm", new Attribute("alarm", ["both", "off", "siren", "strobe"])); 
		attrMap.putNUMBER("battery", new Attribute("battery", null)); 
        attrMap.putENUM("beacon", new Attribute("presence", ["present", "not present"]));
		attrMap.putENUM("button", new Attribute("button", ["held", "pushed"])); 
		//attrMap.putNUMBER("button", new Attribute("numberOfButtons", null));
		attrMap.putNUMBER("colorTemperature", new Attribute("colorTemperature", null));
        attrMap.putENUM("doorControl", new Attribute("door", ["closed", "closing", "open", "opening", "unknown"]));
        attrMap.putENUM("light", new Attribute("switch", ["off", "on"])); 
        attrMap.putENUM("lock", new Attribute("lock", ["locked", "unknown", "unlocked", "unlocked with timeout"])); 
        attrMap.putENUM("motion", new Attribute("motion", ["active", "inactive"])); 

        attrMap.putENUM("outlet", new Attribute("switch", ["off", "on"])); 
        attrMap.putENUM("ovenMode", new Attribute("ovenMode", ["heating", "grill", "warming", "defrosting"])); 
        attrMap.putENUM("presenceSensor", new Attribute("presence", ["present", "not present"]));
        attrMap.putENUM("smokeDetector", new Attribute("smoke",  ["clear", "detected", "tested"])); 
		attrMap.putNUMBER("switchLevel", new Attribute("level"), null);
        attrMap.putENUM("switch", new Attribute("switch",["off", "on"])); 
		 attrMap.putNUMBER("stepSensor", [new Attribute("goal"), new Attribute("steps")], null);
        
		
		attrMap.putENUM("water", new Attribute("water",  ["dry", "wet"])); 
       
       attrMap.putENUM("thermostat", 
									[new Attribute("thermostatFanMode",["auto", "circulate", "on"]), 
										new Attribute("thermostatMode",["auto", "cool", "emergency", "heat", "heat", "off"]),  
										new Attribute("thermostatOperatingState",["cooling", "fan only", "heating", "idle", "pending cool", "pending heat", "vent economizer"])
									]); 

		attrMap.generateGroup();
        
        commMap.put("alarm", ["both", "off", "siren", "strobe"], null); ;  
        commMap.put("doorControl", ["close"], null); 
        commMap.put("light", ["off", "on"], null);  
        commMap.put("lock", ["lock", "unlock"], null);   
		commMap.put("musicPlayer", ["mute", "nextTrack", "pause", "play", "stop", "unmute"], null);  

        commMap.put("outlet", ["off", "on"], null);  
        commMap.put("switch", ["off", "on"], null);  
        commMap.put("thermostat", ["auto", "cool", "emergencyHeat", "fanAuto", "fanOn", "heat", "off"], null);   

        commMap.put("colorTemperature", null, new Command_method("setColorTemperature", ["number"], null));
        commMap.put("switchLevel", null, new Command_method("setLevel", ["number", "number"], null));
        commMap.put("ovenMode", null, new Command_method("setOvenMode", ["ENUM"], [["heating", "grill", "warming", "defrosting"]]));
 
		commMap.put("thermostat", null, 
			[new Command_method("setCoolingSetpoint",["number"], null),
			new Command_method("setHeatingSetpoint", ["number"], null),
			new Command_method("setThermostatFanMode", ["ENUM"], [["auto", "circulate", "on"]]),
			new Command_method("setThermostatMode", ["ENUM"], [["auto", "cool",  "emergency heat", "heat", "off"]])
			]);
		

    }catch(e){alert(e);}
} 