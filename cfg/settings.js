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
		"username": "Team Fortress 2",
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