var metullfuncs = new Array();

// Libs
const config = require("../cfg/settings.js");
const fs      = require('fs');
const dateformat = require("dateformat");
const colors = require('colors');
const chalk = require('chalk');

// Vars
const os = process.platform;
const nl = (os === 'win32' ? '\r\n' : '\n')

// Defs
metullfuncs.os = os;
metullfuncs.nl = nl;


// Funcs

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}
metullfuncs.pause = pause;


function getFilesizeInBytes(filename) {
	if(fs.existsSync(filename) !== true) return 0;
	
	var stats = fs.statSync(filename)
	var fileSizeInBytes = stats["size"]
	return fileSizeInBytes
	 
}
metullfuncs.getFilesizeInBytes = getFilesizeInBytes;


function isArray (ar) {
  return ar instanceof Array
      || Array.isArray(ar)
      || (ar && ar !== Object.prototype && isArray(ar.__proto__));
}
metullfuncs.isArray = isArray;


var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};
metullfuncs.randomProperty = randomProperty;



Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
metullfuncs.getRandomInt = getRandomInt;

function print(mode, text)
{
	if(text == "undefined" || typeof(text) == "undefined") {
		text = mode;
		mode = "debug";
	}
	var bytes = getFilesizeInBytes(config.log_file);
	var kb = bytes/1000;
	var mb = kb/1000;
	if(mb >= config.max_log_size) {
		fs.writeFile(config.log_file, "LOG FILE CLEARED");
	}
	var stamp = new Date().valueOf();
	stamp = dateformat(stamp, "h:MM:ss");
	var format = "[" + stamp + "]_[" + mode + "]  " + text;
	var neededlen = 0;
	config.enabled_output.forEach(function(val) {
		if(val.length > neededlen) {
			neededlen = val.length;
		}
	});
	neededlen = neededlen+1;
	var spacecount=neededlen;
	spacecount = neededlen-mode.length;
	var _spaces = "";
	var _coloredmode = mode;
	if(mode == "success") {
		_coloredmode = mode.green;
	} else if(mode == "debug") {
		_coloredmode = mode.black.bgWhite;
	} else if(mode == "warn") {
		_coloredmode = mode.magenta;
	} else if(mode == "info") {
		_coloredmode = mode.cyan;
	} else if(mode == "error") {
		_coloredmode = mode.red.bold;
	} else if(mode == "chat" || mode == "dm" || mode == "chat-cleverbot") {
		_coloredmode = mode.black.bgWhite;
	} else if(mode == "chat-mention") {
		_coloredmode = mode.white.bgRed;
	} else if(mode == "chat-command") {
		_coloredmode = mode.white.bgMagenta;
	} else if(mode == "chat-failed-command" || mode == "dm-failed-command") {
		_coloredmode = mode.magenta.bgCyan;
	}
	_spaces = _spaces + _coloredmode;
	if(spacecount > 1) {
		for(var i = 0; i < spacecount; i = i+2) {
			if(i >= (spacecount-2)) {
				_spaces = " " + _spaces;
			} else {
				_spaces = " " + _spaces + " ";
			}
		}
	} else {
		_spaces = _spaces + " ";
	}
	
	config.output_log.forEach(function(value) {
		if(value && value == mode) {
			if(fs.existsSync(config.log_file) !== true) {
				fs.writeFileSync(config.log_file, nl);
			}
			fs.appendFile(config.log_file, nl + format, function (err)
			{
				if(err) {
					console.error("Error while saving to " + config.log_file + " : " + err);
				}
			});
		}
	});
	_spaces = " " + _spaces + " ";
	if(spacecount == 0) {
		_spaces = " " + _spaces;
	}

	config.enabled_output.forEach(function(value) {
		if(value && value == mode) {
			var finalprint = "[".blue.bold + stamp.cyan + "]".blue.bold + _spaces + "  ".red.bgCyan + " " + text;
			console.log(finalprint);
			return;
		}
	});
}
metullfuncs.print = print;



function repeatEvery(func, interval) {
    // Check current time and calculate the delay until next interval
    var now = new Date,
        delay = interval - now % interval;

    function start() {
        // Execute function now...
        func();
        // ... and every interval
        setInterval(func, interval);
    }

    // Delay execution until it's an even interval
    setTimeout(start, delay);
}
metullfuncs.repeatEvery = repeatEvery;


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
metullfuncs.replaceAll = replaceAll;








module.exports = metullfuncs;