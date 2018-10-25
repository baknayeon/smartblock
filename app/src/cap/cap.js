function mapInit(){ 
    try{ //한 디바이스당 attrMap의 enum과 number는 1개씩
        attrMap.putENUM("accelerationSensor", new Attributes("acceleration", ["active", "inactive"])); 
		//actuator
        attrMap.putENUM("airConditionerMode", new Attributes("airConditionerMode", ["auto", "cool", "dry", "coolClean", "dryClean", "fanOnly", "heat", "heatClean", "notSupported"])); 
		attrMap.putNUMBER("airQualitySensor", new Attributes("airQuality", null)); 
        attrMap.putENUM("alarm", new Attributes("alarm", ["both", "off", "siren", "strobe"])); 
        attrMap.putENUM("audioMute", new Attributes("mute", ["muted", "unmuted"])); 
		//audioNotification
		//audioTrackData
		attrMap.putNUMBER("audioVolume", new Attributes("volume", null)); 

		attrMap.putNUMBER("battery", new Attributes("battery", null)); 
		attrMap.putENUM("beacon", new Attributes("battery",["not present", "present"])); 
		//bridge
		attrMap.putENUM("bulb", new Attributes("switch", ["off", "on"])); 
		attrMap.putENUM("button", new Attributes("button", ["held", "pushed"])); 
		attrMap.putNUMBER("button", new Attributes("numberOfButtons", null)); 

        attrMap.putNUMBER("carbonDioxideMeasurement",  new Attributes("carbonDioxide", null));
        attrMap.putENUM("carbonMonoxideDetector", new Attributes("carbonMonoxide", ["clear", "detected", "tested"])); 
		attrMap.putNUMBER("colorTemperature", new Attributes("colorTemperature", null));
		//color
        attrMap.putENUM("colorMode", new Attributes("colorMode", ["color", "colorTemperature", "other"])); 
		//configuration
        attrMap.putENUM("consumable", new Attributes("consumableStatus", ["good", "maintenance_required", "missing", "order", "replace"])); 
		attrMap.putENUM("contactSensor", new Attributes("contact", ["closed", "open"])); 

		//demandResponseLoadControl
        attrMap.putENUM("dishwasherMode", new Attributes("dishwasherMode", ["auto", "quick", "rinse", "dry"]));
        attrMap.putENUM("dishwasherOperatingState", new Attributes("machineState", ["pause", "run", "stop"]));
		
		attrMap.putENUM("doorControl", new Attributes("door", ["closed", "closing", "open", "opening", "unknown"]));
        attrMap.putENUM("dryerMode", new Attributes("dryerMode", ["regular", "lowHeat", "highHeat"]));
		//dryerOperatingState
        //dustSensor

		attrMap.putNUMBER("energyMeter", new Attributes("energy", null));
		//estimatedTimeOfArrival
		//execute

		attrMap.putNUMBER("fanSpeed", new Attributes("fanSpeed", null));
        attrMap.putENUM("filterStatus", new Attributes("filterStatus", ["normal", "replace"]));
        attrMap.putENUM("garageDoorControl", new Attributes("door", ["closed", "closing", "open", "opening", "unknown"]));
		//geolocation
		//holdableButton
		attrMap.putNUMBER("illuminanceMeasurement", new Attributes("illuminance", null));
		//imageCapture
		//indicator
		//infraredLevel
        attrMap.putENUM("light", new Attributes("switch", ["off", "on"])); 
		//lockOnly
        attrMap.putENUM("lock", new Attributes("lock", ["locked", "unknown", "unlocked", "unlocked with timeout"])); 
		//mediaController
		//mediaInputSource
		//mediaPlaybackRepeat
		//mediaPlaybackShuffle
        attrMap.putENUM("mediaPlayback", new Attributes("playbackStatus", ["pause", "play", "stop"])); 
		//mediaPresets
		//mediaTrackControl
		//momentary
        attrMap.putENUM("motionSensor", new Attributes("motion", ["active", "inactive"])); 
        attrMap.putENUM("musicPlayer", new Attributes("mute", ["muted", "unmuted"])); 
		attrMap.putNUMBER("musicPlayer", new Attributes("level", null));
		//notification
		attrMap.putNUMBER("odorSensor", new Attributes("odorLevel", null));
        attrMap.putENUM("outlet", new Attributes("switch", ["off", "on"])); 
        attrMap.putENUM("ovenMode", new Attributes("ovenMode", ["heating", "grill", "warming", "defrosting"])); 
		//ovenOperatingState
		attrMap.putNUMBER("ovenSetpoint", new Attributes("ovenSetpoint", null));
		//pHMeasurement
		//polling
		//powerConsumptionReport
		attrMap.putNUMBER("powerMeter", new Attributes("power", null));
        attrMap.putENUM("powerSource", new Attributes("powerSource", ["battery", "dc", "mains", "unknown"]));
        attrMap.putENUM("presenceSensor", new Attributes("presence", ["present", "not present"]));
        attrMap.putENUM("rapidCooling", new Attributes("rapidCooling", ["off", "on"]));
		//refresh
		attrMap.putNUMBER("refrigerationSetpoint", new Attributes("refrigerationSetpoint", null));
		attrMap.putNUMBER("relativeHumidityMeasurement", new Attributes("humidity", null));
		//relaySwitch
        attrMap.putENUM("robotCleanerCleaningMode", new Attributes("robotCleanerCleaningMode", ["auto", "part", "repeat", "manual", "stop", "map"]));
        attrMap.putENUM("robotCleanerMovement", new Attributes("robotCleanerMovement", ["homing", "idle", "charging", "alarm", "powerOff", "reserve", "point", "after", "cleaning"]));
        //robotCleanerTurboMode
		//sensor
		//shockSensor
		//signalStrength
		//sleepSensor
		attrMap.putENUM("smokeDetector", new Attributes("smoke",  ["clear", "detected", "tested"])); 
		attrMap.putNUMBER("soundPressureLevel", new Attributes("soundPressureLevel"), null);
		attrMap.putENUM("soundSensor", new Attributes("smoke",  ["detected", "notdetected", ])); 
		attrMap.putNUMBER("stepSensor", new Attributes("steps"), null);
		//speechRecognition
		//speechSynthesis
		//here
		attrMap.putNUMBER("switchLevel", new Attributes("level"), null);
        attrMap.putENUM("switch", new Attributes("switch",["off", "on"])); 
		attrMap.putNUMBER("temperatureMeasurement", new Attributes("temperature"), null);

		attrMap.putNUMBER("thermostatCoolingSetpoint", new Attributes("coolingSetpoint"), null);
		attrMap.putNUMBER("thermostatHeatingSetpoint", new Attributes("heatingSetpoint"), null);
        attrMap.putENUM("thermostatFanMode", new Attributes("thermostatFanMode",["auto", "circulate", "followschedule", "on"])); 
        attrMap.putENUM("thermostatMode", new Attributes("thermostatMode", ["auto", "eco", "rushhour", "cool", "emergencyheat", "heat", "off"])); 
        attrMap.putENUM("thermostatOperatingState", new Attributes("thermostatOperatingState", ["cooling", "fan only", "heating", "idle", "pending cool", "pending heat", "vent economizer"])); 
		attrMap.putNUMBER("thermostatSetpoint", new Attributes("thermostatSetpoint"), null);
		//thermostat
		attrMap.putENUM("touchSensor", new Attributes("touch", ["touched"])); 
		
		attrMap.putENUM("tvChannel", new Attributes("tvChannel", ["channelDown", "channelUp"])); 
		attrMap.putNUMBER("ultravioletIndex", new Attributes("ultravioletIndex"), null);
		
		
		attrMap.putENUM("valve", new Attributes("valve", ["closed", "open"])); 
		//videoClips
		attrMap.putENUM("washerMode", new Attributes("washerMode", ["regular", "heavy", "rinse", "spinDry"])); 
		attrMap.putENUM("washerOperatingState", new Attributes("washerJobState", ["airWash", "cooling", "delayWash", "drying", "finish", "none", "preWash", "rinse", "spin", "wash", "weightSensing", "wrinklePrevent"])); 
		//attrMap.putENUM("washerOperatingState", new Attributes("machineState", ["pause", "run", "stop"]));         
		attrMap.putNUMBER("washerOperatingState", new Attributes("completionTime"), null);
		attrMap.putENUM("waterSensor", new Attributes("water", ["dry", "wet"])); 
		attrMap.putENUM("windowShade", new Attributes("windowShade", ["closed", "closing", "open", "opening", "unknown"])); 
		//44


        //putCommand
		//putMethod
		//한 디바이스당 commMap command와 method는 1개
        commMap.putCommand("alarm", ["both", "off", "siren", "strobe"]); 
        commMap.putMethod("airConditionerMode",  new Command_method("setDishwasherMode", "ENUM", ["auto", "cool", "dry", "coolClean", "dryClean", "fanOnly", "heat", "heatClean", "notSupported"]));

        commMap.putCommand("audioMute", ["mute", "unmute"]);
        commMap.putMethod("audioMute", new Command_method("setMute", "number", null));
		//audioNotification
        commMap.putCommand("audioVolume", ["volumeUp", "volumeDown"]);
        commMap.putMethod("audioVolume", new Command_method("setVolume", "number", null));
        commMap.putMethod("colorControl", new Command_method("setColor", "number", null));
        commMap.putMethod("colorControl", new Command_method("setHue", "number", null));
        commMap.putMethod("colorControl", new Command_method("setSaturation", "number", null));
        commMap.putMethod("colorTemperature", new Command_method("setColorTemperature", "number", null));
		//colorControl
        commMap.putMethod("dishwasherMode",  new Command_method("setDishwasherMode", "ENUM", ["auto", "quick", "rinse", "dry"]));
        commMap.putMethod("dishwasherOperatingState", new Command_method("setMachineState", "ENUM",  ["pause", "run", "stop"])); 
        commMap.putCommand("doorControl", ["close", "open"]); 
        commMap.putMethod("dryerMode", new Command_method("setDryerMode", "ENUM", ["regular", "lowHeat", "highHeat"])); 
        commMap.putMethod("dryerOperatingState", new Command_method("setMachineState", "ENUM", ["pause", "run", "stop"])); 

        commMap.putMethod("fanSpeed", new Command_method("setFanSpeed", "number", null));
        commMap.putCommand("garageDoorControl", ["close", "open"]); 

        commMap.putCommand("imageCapture", ["take"]); 

		commMap.putCommand("light", ["off", "on"]);  
        commMap.putCommand("lock", ["lock", "unlock"]);   

		commMap.putCommand("polling", ["poll"]);  
		//2개 다 musicPlayer
		commMap.putCommand("musicPlayer", ["mute", "nextTrack", "pause", "play", "stop", "unmute"]);  
		commMap.putMethod("musicPlayer", new Command_method("setTrack", "string", null)); 

       commMap.putCommand("mediaPlayback", ["play", "pause", "stop"]);   

        commMap.putCommand("outlet", ["off", "on"]);  
        commMap.putMethod("ovenMode", new Command_method("setOvenMode", "ENUM", ["heating", "grill", "warming", "defrosting"]));
        commMap.putMethod("ovenSetpoint", new Command_method("setOvenSetpoint", "number", null)); 
		//ovenOperatingState
        commMap.putMethod("robotCleanerCleaningMode", new Command_method("setRobotCleanerCleaningMode", "ENUM", ["auto", "part", "repeat", "manual", "stop"]));   
        commMap.putMethod("robotCleanerMovement",  new Command_method("setRobotCleanerMovement", "ENUM", ["homing"]));   
        commMap.putMethod("rapidCooling", new Command_method("setRapidCooling", "number", null)); 
		commMap.putMethod("refrigerationSetpoint", new Command_method("setRefrigerationSetpoint", "number", null)); 
		
		//signalStrength
        commMap.putMethod("switchLevel", new Command_method("setLevel", "number", null));
        commMap.putCommand("switch", ["off", "on"]);  

        commMap.putMethod("thermostatHeatingSetpoint", new Command_method("setHeatingSetpoint", "number", null));
        commMap.putMethod("thermostatCoolingSetpoint", new Command_method("setCoolingSetpoint", "number", null));
		commMap.putCommand("thermostatFanMode", ["fanAuto", "fanCirculate", "fanOn"]);
		commMap.putMethod("thermostatFanMode", new Command_method("setThermostatFanMode", "ENUM", ["auto", "circulate", "followschedule", "on"]));
        commMap.putCommand("thermostatMode", ["auto", "cool", "emergencyHeat", "heat", "off"]);
        commMap.putMethod("thermostatMode", new Command_method("thermostatMode", "ENUM", ["auto", "eco", "rush hour", "cool", "emergency heat", "heat", "off"]));
//thermostat


		commMap.putCommand("tvChannel", ["channelUp", "channelDown"]);  
        commMap.putMethod("tvChannel", new Command_method("setTvChannel", "STRING", null));


		commMap.putCommand("tone", ["beep"]);  
		commMap.putCommand("valve", ["close", "open"]);  
		//videoClips
		commMap.putCommand("videoStream", ["startStream", "stopStream"]);  
        commMap.putMethod("washerMode", new Command_method("setWasherMode", "ENUM", ["regular", "heavy", "rinse", "spinDry"]));
        commMap.putMethod("washerOperatingState", new Command_method("setMachineState", "ENUM", ["pause", "run", "stop"]));
		commMap.putCommand("windowShade", ["close", "open", "presetPosition"]);  
		//28
		

		deviceCount.set("timer", parseInt("1"))
		deviceCount.set("time", parseInt("1"))

		deviceCount.set("state", parseInt("1"))

		deviceCount.set("text", parseInt("1"))
		deviceCount.set("bool", parseInt("1"))
		deviceCount.set("number", parseInt("1"))
		deviceCount.set("message", parseInt("1"))
		deviceCount.set("phone", parseInt("1"))

    }catch(e){alert(e);}
} 