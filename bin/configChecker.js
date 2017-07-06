var configChecker = new Array();


const utils = require("../bin/util.js");





configChecker.CheckConfig = function(obj) {
	if(typeof(obj) !== "object" || utils.isArray(obj) !== false) {
		return "Invalid cfg object";
	}
	var err = "";
	
	if(typeof(obj["Accounts"]) !== "object" || utils.isArray(obj["Accounts"]) !== false) {
		err = err + "\nAccounts not defined or wrongly defined";
	} else {
		if(obj["Accounts"].length < 1) {
			err = err + "\nNo accounts defined";
		}
	}
	
	if(typeof(obj["Games"]) !== "object" || utils.isArray(obj["Games"]) !== false) {
		err = err + "\nAccounts not defined or wrongly defined";
	}
	
	if(typeof(obj["TwofacSecrets"]) !== "object" || utils.isArray(obj["TwofacSecrets"]) !== false) {
		err = err + "\nTwofacSecrets not defined or wrongly defined";
	}
	
	if(typeof(obj["GameDefs"]) !== "object" || utils.isArray(obj["GameDefs"]) !== false) {
		err = err + "\nGameDefs not defined or wrongly defined";
	}
	
	if(typeof(obj["enabled_output"]) !== "object" || utils.isArray(obj["enabled_output"]) !== true) {
		err = err + "\nenabled_output not defined or wrongly defined";
	}
	
	if(typeof(obj["output_log"]) !== "object" || utils.isArray(obj["output_log"]) !== true) {
		err = err + "\noutput_log not defined or wrongly defined";
	}
	
	if(typeof(obj["log_file"]) !== "string") {
		err = err + "\nlog_file not defined or wrongly defined";
	}
	
	if(typeof(obj["max_log_size"]) !== "number") {
		err = err + "\nmax_log_size not defined or wrongly defined";
	}
	
	
	
	
	
	
	if(err == "") {
		err = "fine";
	}
	return err;
	
}


















module.exports = configChecker;