// Steam Multi-user Multi-game hourboost by MetalRuller

// Dont edit below.



const utils = require("../bin/util.js");
const SteamUser = require("steam-user");
const config = require("../cfg/settings.js");
const configChecker = require("../bin/configChecker.js");
const SteamTotp = require("steam-totp");

const test_config = configChecker.checkConfig(config);
if(test_config !== "fine") {
	utils.print("error", "Got configuration errors:" + test_config);
	return;
}
delete test_config;
utils.print("success", "Started!");

var action_todo = {};
var users = new Array();

function ResetTodoList() {
	action_todo = {};
	for(var key in config.Accounts) {
		action_todo[key] = config.Accounts[key];
	}
}

function GetGameId(gamename) {
	for(var key in config.GameDefs) {
		if(key.toLowerCase() == gamename.toLowerCase()) {
			return config.GameDefs[key];
		}
	}
	return 0;
}

function DoNext(step, obj) {
	if(Object.keys(action_todo).length > 0) {
		var _username, _password;
		for(var key in action_todo) {
			if(typeof(_username) == "undefined" && typeof(_password) == "undefined") {
				_username = key;
				_password = action_todo[key];
			}
		}
		if(typeof(step) === "undefined") {
			DoUserLogin(_username, _password);
		} else {
			if(typeof(obj) !== "undefined") {
				if(step == "startGame") {
					if(typeof(obj.publicIP) !== "undefined" && typeof(obj.cellID) !== "undefined") {
						var usersGame = config.Games[_username];
						if(typeof(usersGame) !== "string") {
							utils.print("error", "No game defined for user " + _username);
							return;
						}
						obj.setPersona(SteamUser.EPersonaState.Offline);
						obj.gamesPlayed(GetGameId(usersGame));
						delete action_todo[_username];
						utils.print("success", "Account <" + _username + "> is now playing " + usersGame);
						setTimeout(function() {
							DoNext();
						}, 60000);
					}
				}
			}
		}
	}
}




function DoUserLogin(username, password) {
	utils.print("info", "Logging into steam as " + username);
	var _c = {
		"accountName": username,
		"password": password,
		"machineName": "HourBooster Bot(MetalRuller)"
	};
	var client = new SteamUser();
	client.options.autoRelogin = true;
	
	if(typeof(config.TwofacSecrets[username]) === "string") {
		client.options.promptSteamGuardCode = false;
		client.on('steamGuard', function(domain, callback, lastCodeWrong) {
			if(lastCodeWrong == true) {
				utils.print("error", "Failed to generate steamguard code for " + username + ", skipping");
				setTimeout(function() {
					delete action_todo[username];
					client.logOff();
					delete client;
					DoNext();
				}, 120000);
				return;
			}
			var code = SteamTotp.generateAuthCode(config.TwofacSecrets[username])
			callback(code);
		});
	}
	
	client.on('loggedOn', function(details) {
		users.push(client);
		utils.print("success", "Logged into Steam as " + username);
		client.setPersona(SteamUser.EPersonaState.Online);
		setTimeout(function() {
			if(typeof(action_todo[username]) !== "string") {
				action_todo[username] = password;
			}
			
			DoNext("startGame", client);
		}, 2500);
	});
	
	client.on("playingState", function(blocked) {
		if(blocked == true) {
			utils.print("warn", "Stopped botting on " + username + ", started game elsewhere, skipping in 2m");
			client.setPersona(SteamUser.EPersonaState.Online);
			client.logOff();
			delete client;
			delete action_todo[username];
			setTimeout(function() {
				action_todo[username] = password;
				DoNext();
			}, 120000);
		}
	});
	
	client.on('error', function(e) {
		utils.print("error", String(e));
		// Some error occurred during logon
		if(String(e).toLowerCase() == "Error: RateLimitExceeded".toLowerCase()) {
			utils.print("warn", "Rate limit exceeded... waiting 45mins");
			utils.pause(2700000);
			utils.print("warn", "exiting");
			process.exit();
		} else if(String(e).toLowerCase() == "Error: LoggedInElsewhere".toLowerCase() || String(e).toLowerCase() == "Error: LogonSessionReplaced".toLowerCase()) {
			utils.print("warn", "Logged in elsewhere... trying to login again in 2m");
			client.logOff();
			delete client;
			delete action_todo[username];
			setTimeout(function() {
				client.logOff();
				action_todo[username] = password;
				DoNext();
			}, 120000);
		}
	});
	client.logOn(_c);
}


utils.print("Resetting action list");
ResetTodoList();
utils.pause(10000);
utils.print("Starting bot");
DoNext();