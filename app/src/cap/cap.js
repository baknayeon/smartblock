function mapInit(){ 
    try{ //한 디바이스당 attrMap의 enum과 number는 1개씩
        attrMap.putSingle("accelerationSensor", new Attributes("acceleration", "ENUM", ["active", "inactive"])); 
		//actuator
        attrMap.putSingle("airConditionerMode", new Attributes("airConditionerMode",  "ENUM", ["auto", "cool", "dry", "coolClean", "dryClean", "fanOnly", "heat", "heatClean", "notSupported"])); 
		attrMap.putSingle("airQualitySensor", new Attributes("airQuality", "NUMBER", null)); 
        attrMap.putSingle("alarm", new Attributes("alarm", "ENUM",["both", "off", "siren", "strobe"])); 
        attrMap.putSingle("audioMute", new Attributes("mute", "ENUM",["muted", "unmuted"])); 
		//audioNotification
		//audioTrackData
		attrMap.putSingle("audioVolume", new Attributes("volume", "NUMBER", null)); 

		attrMap.putSingle("battery", new Attributes("battery", "NUMBER", null)); 
		attrMap.putSingle("beacon", new Attributes("battery", "ENUM",["not present", "present"])); 
		//bridge
		attrMap.putSingle("bulb", new Attributes("switch", "ENUM", ["off", "on"])); 
		attrMap.putMultiple("button", new Attributes("button", "ENUM", ["held", "pushed"])); 
		attrMap.putMultiple("button", new Attributes("numberOfButtons", "NUMBER", null)); 

        attrMap.putSingle("carbonDioxideMeasurement",  new Attributes("carbonDioxide", "NUMBER", null));
        attrMap.putSingle("carbonMonoxideDetector", new Attributes("carbonMonoxide", "ENUM", ["clear", "detected", "tested"])); 
		attrMap.putMultiple("colorControl", new Attributes("color", "STRING", null));
		attrMap.putMultiple("colorControl", new Attributes("hue", "NUMBER", null));
		attrMap.putMultiple("colorControl", new Attributes("saturation", "NUMBER", null));
		attrMap.putSingle("colorTemperature", new Attributes("colorTemperature", "NUMBER", null));
		//color
        attrMap.putSingle("colorMode", new Attributes("colorMode", "ENUM", ["color", "colorTemperature", "other"])); 
		//configuration
        attrMap.putSingle("consumable", new Attributes("consumableStatus", "ENUM", ["good", "maintenance_required", "missing", "order", "replace"])); 
		attrMap.putSingle("contactSensor", new Attributes("contact", "ENUM", ["closed", "open"])); 

		//demandResponseLoadControl
        attrMap.putSingle("dishwasherMode", new Attributes("dishwasherMode", "ENUM", ["auto", "quick", "rinse", "dry"]));
        attrMap.putSingle("dishwasherOperatingState", new Attributes("machineState", "ENUM", ["pause", "run", "stop"]));
		
		attrMap.putSingle("doorControl", new Attributes("door", "ENUM", ["closed", "closing", "open", "opening", "unknown"]));
        attrMap.putSingle("dryerMode", new Attributes("dryerMode", "ENUM", ["regular", "lowHeat", "highHeat"]));
		//dryerOperatingState
        //dustSensor

		attrMap.putSingle("energyMeter", new Attributes("energy", "NUMBER", null));
		//estimatedTimeOfArrival
		//execute

		attrMap.putSingle("fanSpeed", new Attributes("fanSpeed", "NUMBER", null));
        attrMap.putSingle("filterStatus", new Attributes("filterStatus", "ENUM", ["normal", "replace"]));
        attrMap.putSingle("garageDoorControl", new Attributes("door", "ENUM", ["closed", "closing", "open", "opening", "unknown"]));
		//geolocation
		//holdableButton
		attrMap.putSingle("illuminanceMeasurement", new Attributes("illuminance", "NUMBER", null));
		//imageCapture
		//indicator
		//infraredLevel
        attrMap.putSingle("light", new Attributes("switch", "ENUM", ["off", "on"])); 
		//lockOnly
        attrMap.putSingle("lock", new Attributes("lock", "ENUM", ["locked", "unknown", "unlocked", "unlocked with timeout"])); 
		//mediaController
		//mediaInputSource
		//mediaPlaybackRepeat
		//mediaPlaybackShuffle
        attrMap.putSingle("mediaPlayback", new Attributes("playbackStatus", "ENUM", ["pause", "play", "stop"])); 
		//mediaPresets
		//mediaTrackControl
		//momentary
        attrMap.putSingle("motionSensor", new Attributes("motion", "ENUM", ["active", "inactive"])); 
        attrMap.putMultiple("musicPlayer", new Attributes("mute", "ENUM", ["muted", "unmuted"])); 
		attrMap.putMultiple("musicPlayer", new Attributes("level", "NUMBER", null));
		//notification
		attrMap.putSingle("odorSensor", new Attributes("odorLevel", "NUMBER", null));
        attrMap.putSingle("outlet", new Attributes("switch", "ENUM", ["off", "on"])); 
        attrMap.putSingle("ovenMode", new Attributes("ovenMode", "ENUM", ["heating", "grill", "warming", "defrosting"])); 
		//ovenOperatingState
		attrMap.putSingle("ovenSetpoint", new Attributes("ovenSetpoint", "NUMBER", null));
		//pHMeasurement
		//polling
		//powerConsumptionReport
		attrMap.putSingle("powerMeter", new Attributes("power", "NUMBER", null));
        attrMap.putSingle("powerSource", new Attributes("powerSource", "ENUM", ["battery", "dc", "mains", "unknown"]));
        attrMap.putSingle("presenceSensor", new Attributes("presence", "ENUM", ["present", "not present"]));
        attrMap.putSingle("rapidCooling", new Attributes("rapidCooling", "ENUM", ["off", "on"]));
		//refresh
		attrMap.putSingle("refrigerationSetpoint", new Attributes("refrigerationSetpoint", "NUMBER", null));
		attrMap.putSingle("relativeHumidityMeasurement", new Attributes("humidity", "NUMBER", null));
		//relaySwitch
        attrMap.putSingle("robotCleanerCleaningMode", new Attributes("robotCleanerCleaningMode", "ENUM", ["auto", "part", "repeat", "manual", "stop", "map"]));
        attrMap.putSingle("robotCleanerMovement", new Attributes("robotCleanerMovement", "ENUM", ["homing", "idle", "charging", "alarm", "powerOff", "reserve", "point", "after", "cleaning"]));
        //robotCleanerTurboMode
		//sensor
		//shockSensor
		//signalStrength
		//sleepSensor
		attrMap.putSingle("smokeDetector", new Attributes("smoke", "ENUM", ["clear", "detected", "tested"])); 
		attrMap.putSingle("soundPressureLevel", new Attributes("soundPressureLevel", "NUMBER", null));
		attrMap.putSingle("soundSensor", new Attributes("smoke", "ENUM",  ["detected", "notdetected", ])); 
		attrMap.putSingle("stepSensor", new Attributes("steps", "NUMBER", null));
		//speechRecognition
		//speechSynthesis
		//here
		attrMap.putSingle("switchLevel", new Attributes("level", "NUMBER", null));
        attrMap.putSingle("switch", new Attributes("switch",  "ENUM",["off", "on"])); 
		attrMap.putSingle("temperatureMeasurement", new Attributes("temperature", "NUMBER", null));

		attrMap.putSingle("thermostatCoolingSetpoint", new Attributes("coolingSetpoint", "NUMBER", null));
		attrMap.putSingle("thermostatHeatingSetpoint", new Attributes("heatingSetpoint", "NUMBER", null));
        attrMap.putSingle("thermostatFanMode", new Attributes("thermostatFanMode", "ENUM", ["auto", "circulate", "followschedule", "on"])); 
        attrMap.putSingle("thermostatMode", new Attributes("thermostatMode", "ENUM", ["auto", "eco", "rushhour", "cool", "emergencyheat", "heat", "off"])); 
        attrMap.putSingle("thermostatOperatingState", new Attributes("thermostatOperatingState", "ENUM", ["cooling", "fan only", "heating", "idle", "pending cool", "pending heat", "vent economizer"])); 
		attrMap.putSingle("thermostatSetpoint", new Attributes("thermostatSetpoint", "NUMBER", null));
		//thermostat
		attrMap.putSingle("touchSensor", new Attributes("touch", "ENUM", ["touched"])); 
		
		attrMap.putSingle("tvChannel", new Attributes("tvChannel", "ENUM", ["channelDown", "channelUp"])); 
		attrMap.putSingle("ultravioletIndex", new Attributes("ultravioletIndex", "NUMBER", null));
		
		
		attrMap.putSingle("valve", new Attributes("valve", "ENUM", ["closed", "open"])); 
		//videoClips
		attrMap.putSingle("washerMode", new Attributes("washerMode", "ENUM", ["regular", "heavy", "rinse", "spinDry"])); 
		attrMap.putMultiple("washerOperatingState", new Attributes("washerJobState", "ENUM", ["airWash", "cooling", "delayWash", "drying", "finish", "none", "preWash", "rinse", "spin", "wash", "weightSensing", "wrinklePrevent"])); 
		//attrMap.putENUM("washerOperatingState", new Attributes("machineState", ["pause", "run", "stop"]));         
		attrMap.putMultiple("washerOperatingState", new Attributes("completionTime", "NUMBER", null));
		attrMap.putSingle("waterSensor", new Attributes("water", "ENUM", ["dry", "wet"])); 
		attrMap.putSingle("windowShade", new Attributes("windowShade", "ENUM", ["closed", "closing", "open", "opening", "unknown"])); 
		//65

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

        commMap.putMethodS("colorControl", new Command_method("setColor", "number", null));
        commMap.putMethodS("colorControl", new Command_method("setHue", "number", null));
        commMap.putMethodS("colorControl", new Command_method("setSaturation", "number", null));

        commMap.putMethod("colorTemperature", new Command_method("setColorTemperature", "number", null));

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
		//commMap.putMethod("musicPlayer", new Command_method("setTrack", "string", null)); 

       commMap.putCommand("mediaPlayback", ["play", "pause", "stop"]);   
	   commMap.putCommand("momentary", ["push"]);   

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
		//46
		

		deviceCount.set("timer", parseInt("1"))
		deviceCount.set("time", parseInt("1"))
		deviceCount.set("schedule", parseInt("1"))
		deviceCount.set("unschedule", parseInt("1"))

		deviceCount.set("state", parseInt("1"))

		deviceCount.set("text", parseInt("1"))
		deviceCount.set("bool", parseInt("1"))
		deviceCount.set("number", parseInt("1"))
		deviceCount.set("message", parseInt("1"))
		deviceCount.set("phone", parseInt("1"))
		deviceCount.set("mode", parseInt("1"))


			
		deviceCount.set("function", parseInt("1"))
		deviceCount.set("installed", parseInt("1"))
		deviceCount.set("updated", parseInt("1"))
		deviceCount.set("subscribe", parseInt("1"))

    }catch(e){alert(e);}
} 