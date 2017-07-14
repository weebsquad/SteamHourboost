module.exports = { // Edit below
	
	//
	// Actual accounts to hourboost
	Accounts: {
		"username": "password",
	},
	
	//
	// If your account has Two Factor Authentication enabled,
	// Set your shared_secret below for it.
	TwofacSecrets: {
		"username": "shared_secret",
	},
	
	//
	// Games to idle, per-account
	GameDefs: {
		"Team Fortress 2": 440,
		"Hunie Pop": 339800,
		"Rising Storm/Red Orchestra 2 Multiplayer": 35450,
		"SpeedRunners": 207140,
		"Garry's Mod": 4000,
		"Dota 2": 570,
		"Terraria": 105600,
		"PAYDAY 2": 218620,
		"Counter-Strike: Global Offensive": 730,
		"Counter-Strike": 10,
		"Counter-Strike: Source": 240,
		"Factorio": 427520,
		"Borderlands 2": 49520,
		"Risk of Rain": 248820,
		"Just Cause 3": 225540,
		"Plague Inc: Evolved": 246620,
		"Insurgency": 222880,
		"Stellaris": 281990,
		"Battlefield: Bad Company™ 2": 24960,
	},
	
	//
	// A table containing steam app-ids for games, lazy to add more.
	//
	GameDefs: {
		"Team Fortress 2": 440,
		"Hunie Pop": 339800,
	},
	
	
	// Existent types of outputting log
	output_log: [ "warn", "info", "error", "success", "debug" ],
	
	// Types of output which will be printed on your console
	enabled_output: [ "warn", "info", "error", "success", "debug" ],
	
	// Path for the log file
	log_file: "log.txt",
	
	// Max file size in MB for the log file before it's cleared
	max_log_size: 50,
	
	
	
};
