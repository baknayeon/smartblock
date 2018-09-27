function mapInit(){ 
    try{ 
        attrMap.putENUM("accelerationSensor", new Attribute("acceleration", ["active", "inactive"])); 
		//actuator
        attrMap.putENUM("airConditionerMode", new Attribute("airConditionerMode", ["auto", "cool", "dry", "coolClean", "dryClean", "fanOnly", "heat", "heatClean", "notSupported"])); 
		attrMap.putNUMBER("airQualitySensor", new Attribute("airQuality", null)); 
        attrMap.putENUM("alarm", new Attribute("alarm", ["both", "off", "siren", "strobe"])); 
        attrMap.putENUM("audioMute", new Attribute("mute", ["muted", "unmuted"])); 
		//audioNotification
		//audioTrackData
		attrMap.putNUMBER("audioVolume", new Attribute("volume", null)); 

		attrMap.putNUMBER("battery", new Attribute("battery", null)); 
		attrMap.putENUM("beacon", new Attribute("battery",["not present", "present"])); 
		//bridge
		attrMap.putENUM("bulb", new Attribute("switch", ["off", "on"])); 
		attrMap.putENUM("button", new Attribute("button", ["held", "pushed"])); 
		attrMap.putNUMBER("button", new Attribute("numberOfButtons", null)); 

        attrMap.putNUMBER("carbonDioxideMeasurement",  new Attribute("carbonDioxide", null));
        attrMap.putENUM("carbonMonoxideDetector", new Attribute("carbonMonoxide", ["clear", "detected", "tested"])); 
		attrMap.putNUMBER("button", new Attribute("numberOfButtons", null)); 
		attrMap.putNUMBER("colorTemperature", new Attribute("colorTemperature", null));
		//color
        attrMap.putENUM("colorMode", new Attribute("colorMode", ["color", "colorTemperature", "other"])); 
		//configuration
        attrMap.putENUM("consumable", new Attribute("consumableStatus", ["good", "maintenance_required", "missing", "order", "replace"])); 
		attrMap.putENUM("contactSensor", new Attribute("contact", ["closed", "open"])); 

		//demandResponseLoadControl
        attrMap.putENUM("dishwasherMode", new Attribute("dishwasherMode", ["auto", "quick", "rinse", "dry"]));
		//dishwasherOperatingState
		attrMap.putENUM("doorControl", new Attribute("door", ["closed", "closing", "open", "opening", "unknown"]));
        attrMap.putENUM("dryerMode", new Attribute("dryerMode", ["regular", "lowHeat", "highHeat"]));
		//dryerOperatingState
        //dustSensor

		attrMap.putNUMBER("energyMeter", new Attribute("energy", null));
		//estimatedTimeOfArrival
		//execute

		attrMap.putNUMBER("fanSpeed", new Attribute("fanSpeed", null));
        attrMap.putENUM("filterStatus", new Attribute("filterStatus", ["normal", "replace"]));
        attrMap.putENUM("garageDoorControl", new Attribute("door", ["closed", "closing", "open", "opening", "unknown"]));
		//geolocation
		//holdableButton
		attrMap.putNUMBER("illuminanceMeasurement", new Attribute("illuminance", null));
		//imageCapture
		//indicator
		//infraredLevel
        attrMap.putENUM("light", new Attribute("switch", ["off", "on"])); 
		//lockOnly
        attrMap.putENUM("lock", new Attribute("lock", ["locked", "unknown", "unlocked", "unlocked with timeout"])); 
		//mediaController
		//mediaInputSource
		//mediaPlaybackRepeat
		//mediaPlaybackShuffle
        attrMap.putENUM("mediaPlayback", new Attribute("playbackStatus", ["pause", "play", "stop"])); 
		//mediaPresets
		//mediaTrackControl
		//momentary
        attrMap.putENUM("motionSensor", new Attribute("motion", ["active", "inactive"])); 
        attrMap.putENUM("musicPlayer", new Attribute("mute", ["muted", "unmuted"])); 
		//notification
		attrMap.putNUMBER("odorSensor", new Attribute("odorLevel", null));
        attrMap.putENUM("outlet", new Attribute("switch", ["off", "on"])); 
        attrMap.putENUM("ovenMode", new Attribute("ovenMode", ["heating", "grill", "warming", "defrosting"])); 
		//ovenOperatingState
		attrMap.putNUMBER("ovenSetpoint", new Attribute("ovenSetpoint", null));
		//pHMeasurement
		//polling
		//powerConsumptionReport
		attrMap.putNUMBER("powerMeter", new Attribute("power", null));
        attrMap.putENUM("powerSource", new Attribute("powerSource", ["battery", "dc", "mains", "unknown"]));
        attrMap.putENUM("presenceSensor", new Attribute("presence", ["present", "not present"]));
        attrMap.putENUM("rapidCooling", new Attribute("rapidCooling", ["off", "on"]));
		//refresh
		attrMap.putNUMBER("refrigerationSetpoint", new Attribute("refrigerationSetpoint", null));
		attrMap.putNUMBER("relativeHumidityMeasurement", new Attribute("humidity", null));
		//relaySwitch
        attrMap.putENUM("robotCleanerCleaningMode", new Attribute("robotCleanerCleaningMode", ["auto", "part", "repeat", "manual", "stop", "map"]));
        attrMap.putENUM("robotCleanerMovement", new Attribute("robotCleanerMovement", ["homing", "idle", "charging", "alarm", "powerOff", "reserve", "point", "after", "cleaning"]));
        //robotCleanerTurboMode
		//sensor
		//shockSensor
		//signalStrength
		//sleepSensor
		attrMap.putENUM("smokeDetector", new Attribute("smoke",  ["clear", "detected", "tested"])); 
		//soundPressureLevel
		attrMap.putENUM("soundSensor", new Attribute("smoke",  ["detected", "notdetected", ])); 
		//speechRecognition
		//speechSynthesis
		//here
		attrMap.putNUMBER("switchLevel", new Attribute("level"), null);
        attrMap.putENUM("switch", new Attribute("switch",["off", "on"])); 
		attrMap.putNUMBER("temperatureMeasurement", new Attribute("temperature"), null);
		//thermostatCoolingSetpoint
		//thermostatHeatingSetpoint
        attrMap.putENUM("thermostatFanMode", new Attribute("thermostatFanMode",["auto", "circulate", "followschedule", "on"])); 
        attrMap.putENUM("thermostatMode", new Attribute("thermostatMode", ["auto", "eco", "rushhour", "cool", "emergencyheat", "heat", "off"])); 
        attrMap.putENUM("thermostatOperatingState", new Attribute("thermostatOperatingState", ["cooling", "fan only", "heating", "idle", "pending cool", "pending heat", "vent economizer"])); 
		attrMap.putNUMBER("thermostatSetpoint", new Attribute("thermostatSetpoint"), null);
		attrMap.putENUM("valve", new Attribute("valve", ["closed", "open"])); 
		attrMap.putENUM("washerMode", new Attribute("washerMode", ["regular", "heavy", "rinse", "spinDry"])); 
		attrMap.putENUM("washerOperatingState", new Attribute("machineState", ["pause", "run", "stop"])); 
		attrMap.putENUM("waterSensor", new Attribute("water", ["dry", "wet"])); 
		//44
		attrMap.generateGroup();


        
        commMap.put("alarm", ["both", "off", "siren", "strobe"], null); 
        commMap.put("airConditionerMode", ["auto", "cool", "dry", "coolClean", "dryClean", "fanOnly", "heat", "heatClean", "notSupported"], null);
        commMap.put("audioVolume", ["volumeUp", "volumeDown"], new Command_method("setVolume", ["number"], null));
		//colorControl
        commMap.put("dishwasherMode", ["auto", "quick", "rinse", "dry"], null); 
        commMap.put("dishwasherOperatingState", ["pause", "run", "stop"], null); 
        commMap.put("doorControl", ["close", "open"], null); 
        commMap.put("dryerMode", ["regular", "lowHeat", "highHeat"], null); 
        commMap.put("dryerOperatingState", ["pause", "run", "stop"], null); 

        commMap.put("fanSpeed", null, new Command_method("setFanSpeed", ["number"], null));
		commMap.put("light", ["off", "on"], null);  
        commMap.put("lock", ["lock", "unlock"], null);   
		commMap.put("musicPlayer", ["mute", "nextTrack", "pause", "play", "stop", "unmute"], null);  
       commMap.put("mediaPlayback", ["play", "pause", "stop"], new Command_method("setPlaybackStatus", ["ENUM"], [["pause", "play", "stop"]]) );   

        commMap.put("outlet", ["off", "on"], null);  
        commMap.put("ovenMode", null, new Command_method("setOvenMode", ["ENUM"], [["heating", "grill", "warming", "defrosting"]]));
		//ovenOperatingState
        commMap.put("rapidCooling", ["off", "on"], null);   
        commMap.put("refrigerationSetpoint", null, new Command_method("setRefrigerationSetpoint", ["number"], null));
        commMap.put("robotCleanerCleaningMode", ["auto", "part", "repeat", "manual", "stop"], null);   
        commMap.put("robotCleanerMovement", ["homing"], null);   
        //signalStrength
        commMap.put("switchLevel", null, new Command_method("setLevel", ["number"], null));
        commMap.put("switch", ["off", "on"], null);  
		//thermostatCoolingSetpoint
		//thermostatHeatingSetpoint
        
		commMap.put("thermostatFanMode", ["fanAuto", "fanCirculate", "fanOn"], new Command_method("setThermostatFanMode", ["ENUM"], [["auto", "circulate", "followschedule", "on"]]));
        commMap.put("thermostatMode", ["auto", "cool", "emergencyHeat", "heat", "off"] ,null);
		commMap.put("tone", ["beep"], null);  
		commMap.put("valve", ["close", "open"], null);  
        commMap.put("washerMode", ["regular", "heavy", "rinse", "spinDry"], null);
        commMap.put("washerOperatingState", ["pause", "run", "stop"], null);
		//28
		

		deviceCount.set("timer", parseInt("1"))
		deviceCount.set("time", parseInt("1"))
		deviceCount.set("message", parseInt("1"))
		deviceCount.set("phone", parseInt("1"))
		deviceCount.set("box", parseInt("1"))
		deviceCount.set("number", parseInt("1"))

    }catch(e){alert(e);}
} 