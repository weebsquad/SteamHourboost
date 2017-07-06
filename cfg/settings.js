module.exports = { // Edit below
	
	
	Accounts: { // Accounts to hourboost
		"username": "password",
	},
	
	TwofacSecrets: { // Secrets for accounts for 2factor generation (only needed if using 2factor for your account. // DO NOT FILL THIS IN IF NOT USING 2factor)
		"username": "shared_secret",
	},
	
	Games: { // Games to boost per account
		"username": "Team Fortress 2",
	},
	
	GameDefs: {
		"Team Fortress 2": 440,
		"Hunie Pop": 339800,
	},
	
	// Logging
	enabled_output: ["failed-command", "warn", "info", "error", "success", "chat-mention", "chat-command", "debug"],
	output_log: ["failed-command", "warn", "info", "error", "success", "chat-mention", "chat-command", "debug"],
	log_file: "log.txt",
	max_log_size: 50, // In Mb
	
	
	
};