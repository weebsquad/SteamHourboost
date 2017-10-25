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
	Games: { // Games to boost per account
		
		"username1": "One Game Name",
		"username2": ["Game 1", "Game 2"],
	},
	
	//
	// A table containing steam app-ids for games, lazy to add more.
	//
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
		"DARK SOULS™ II: Scholar of the First Sin": 335300,
		"The Binding of Isaac: Rebirth": 250900,
		"Space Engineers": 244850,
		"Far Cry 3 - Blood Dragon": 233270,
		"AdVenture Capitalist": 346900,
		"Sid Meier's Civilization® V": 8930,
		"Saints Row IV": 206420,
		"Tom Clancy's Rainbow Six® Siege": 359550,
		"Plants vs. Zombies GOTY Edition": 3590,
		"Hollow Knight": 367520,
		"Crypt of the NecroDancer": 367520,
		"FTL: Faster Than Light": 212680,
		"Left 4 Dead 2": 550,
		"Prison Architect": 233450,
		"ARK: Survival Evolved": 346110,
		"NEKOPARA Vol. 2": 420110,
		"NEKOPARA Vol. 1": 333600,
		"Counter-Strike 1.6": 10,
		"ESEA": 479130,
		"EasyAntiCheat eSports": 505640,
		
		"Warframe": 230410,
		"Portal 2": 620,
		"Dungeon Defenders 2": 236110,
		"Rogue Legacy": 241600,
		"Audiosurf": 12900,
		"NEKOPARA Vol. 0": 385800,

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