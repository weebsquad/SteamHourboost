
const utils = require("../bin/util.js");
const SteamUser = require("steam-user");
const config = require("../cfg/settings.js");
const configChecker = require("../bin/configChecker.js");
const SteamTotp = require("steam-totp");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const testConfig = configChecker.checkConfig(config);
if(testConfig !== "fine") {
	utils.print("error", "Got configuration errors:" + testConfig);
	return;
}



var actionTodo = {};
var users = new Array();







function ResetTodoList() {
	actionTodo = {};
	for(var key in config.Accounts) {
		if({}.hasOwnProperty.call(config.Accounts, key)) {
			actionTodo[key] = config.Accounts[key];
		}
	}
}

function GetGameId(gamename) {
	for(var key in config.GameDefs) {
		if(key.toLowerCase() === gamename.toLowerCase()) {
			return config.GameDefs[key];
		}
	}
	return 0;
}

function doNext(step, obj) {
	if(Object.keys(actionTodo).length > 0) {
		var _username, _password;
		for(var key in actionTodo) {
			if(typeof(_username) === "undefined" && typeof(_password) === "undefined") {
				_username = key;
				_password = actionTodo[key];
			}
		}
		if(typeof(step) === "undefined") {
			doUserLogin(_username, _password);
		} else {
			if(typeof(obj) !== "undefined") {
				if(step === "startGame") {
					if(typeof(obj.publicIP) !== "undefined" && typeof(obj.cellID) !== "undefined") {
						var usersGame = config.Games[_username];
						if(typeof(usersGame) !== "string" && typeof(usersGame) !== "object" && utils.isArray(usersGame) !== true) {
							utils.print("error", "No game defined for user " + _username);
							return;
						}
						obj.setPersona(SteamUser.EPersonaState.Offline);
						var _rapps = new Array();
						if(typeof(usersGame) === "string") {
							if(usersGame === "tons") {
								var _all = obj.getOwnedPackages();
								for(var i = 0; i < 30; i++) {
									var _i = _all[utils.getRandomInt(0, _all.length)];
									while (_rapps.contains(_i)) {
										_i = _all[utils.getRandomInt(0, _all.length)];
									}
									_rapps.push(_i);
								}
							}
						}
						if(typeof(usersGame) === "object" && utils.isArray(usersGame) === true) {
							var ids = new Array();
							usersGame.forEach(function(gamen) {
								ids.push(GetGameId(gamen));
							});
							obj.gamesPlayed(ids);
						} else {
							if(usersGame !== "tons") {
								obj.gamesPlayed(GetGameId(usersGame));
							} else {
								obj.gamesPlayed(_rapps);
							}
						}
						delete actionTodo[_username];
						if(typeof(usersGame) === "string") {
							if(usersGame !== "tons") {
								utils.print("success", "Account <" + _username + "> is now playing " + usersGame);
							} else {
								utils.print("success", "Account <" + _username + "> is now playing " + _rapps.length + " games!");
							}
						} else {
							var _gamespl = "";
							for(var i = 0; i < usersGame.length; i++) {
								_gamespl = _gamespl + usersGame[i];
								if(i !== usersGame.length-1) {
									_gamespl = _gamespl + ", ";
								}
							}
							utils.print("success", "Account <" + _username + "> is now playing : " + _gamespl);
						}
						setTimeout(function() {
							doNext();
						}, 60000);
					}
				}
			}
		}
	}
}




function doUserLogin(username, password) {
	utils.print("info", "Logging into steam as " + username);
	var _c = {
		"accountName": username,
		"password": password,
		"machineName": "HourBooster Bot(MetalRuller)",
	};
	var client = new SteamUser();
	client.options.autoRelogin = true;
	if(typeof(config.Games[username]) === "string") {
		if(config.Games[username] === "tons") {
			client.options.enablePicsCache = true;
		}
	}
	
	client.options.promptSteamGuardCode = false;
	
	client.on('steamGuard', function(domain, callback, lastCodeWrong) {
		if(lastCodeWrong == true) {
			utils.print("error", "Failed to generate steamguard code for " + username + ", skipping");
			setTimeout(function() {
				delete actionTodo[username];
				client.logOff();
				delete client;
				doNext();
			}, 120000);
			return;
		}
		var code;
		if(typeof(config.TwofacSecrets[username]) !== "string") {
			var tm = setTimeout(function() {
				rl.close();
				console.log("\n");
				utils.print('error', 'Couldnt get SteamGuard code for ${username}. skipping entirely');
				delete actionTodo[username];
				client.logOff();
				delete client;
				doNext();
			}, 180*1000);
			rl.question(`Enter SteamGuard code for ${username} > ${domain} : `, (answer) => {
			  rl.close();
			  clearTimeout(tm);
			  code = answer;
			  callback(code);
			});
		} else { code = SteamTotp.generateAuthCode(config.TwofacSecrets[username]); callback(code); }
	});
	
	client.on('loggedOn', function(details) {
		users.push(client);
		utils.print("success", "Logged into Steam as " + username);
		client.setPersona(SteamUser.EPersonaState.Online);
		setTimeout(function() {
			if(typeof(actionTodo[username]) !== "string") {
				actionTodo[username] = password;
			}
			
			doNext("startGame", client);
		}, 2500);
	});
	
	client.on("playingState", function(blocked) {
		if(blocked === true) {
			utils.print("warn", "Stopped botting on " + username + ", started game elsewhere, skipping in 30m");
			client.setPersona(SteamUser.EPersonaState.Online);
			client.logOff();
			delete client;
			delete actionTodo[username];
			setTimeout(function() {
				actionTodo[username] = password;
				doNext();
			}, 1000*60*30);
		}
	});
	
	client.on("error", function(e) {
		utils.print("error", String(e));
		// Some error occurred during logon
		if(String(e).toLowerCase() === "Error: RateLimitExceeded".toLowerCase()) {
			utils.print("warn", "Rate limit exceeded... waiting 45mins");
			utils.pause(2700000);
			utils.print("warn", "exiting");
			process.exit();
		} else if(String(e).toLowerCase() === "Error: LoggedInElsewhere".toLowerCase() || String(e).toLowerCase() === "Error: LogonSessionReplaced".toLowerCase()) {
			utils.print("warn", "Logged in elsewhere... trying to login again in 2m");
			client.logOff();
			delete client;
			delete actionTodo[username];
			setTimeout(function() {
				client.logOff();
				actionTodo[username] = password;
				doNext();
			}, 120000);
		} else if(String(e).toLowerCase() === "Error: InvalidAuthCode".toLowerCase()) {
			utils.print("warn", "Ignoring. can't login");
			client.logOff();
			delete client;
			delete actionTodo[username];
			setTimeout(function() { doNext(); }, 5000);
		}
	});
	client.logOn(_c);
}




utils.print("success", "Started!");
utils.print("Resetting action list");
ResetTodoList();
utils.pause(10000);
utils.print("Starting bot");
doNext();

