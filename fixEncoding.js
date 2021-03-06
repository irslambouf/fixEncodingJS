/*
	Fix double encoded strings in javascript
	UTF-8 strings decoded in Windows-1251 or Windows1252 and re-encoded in UTF-8
	Philippe Fisher
*/

// From https://www.i18nqa.com/debug/utf8-debug.html
// Scraped with
/*var dict = {};

var rows = document.getElementById("dbg").rows
for (rowIndex in rows) {
    // skip header
    if (rowIndex < 2) {
        continue;
    }

    var cells = rows[rowIndex].cells

    // First column
    // index 1 is value
    // index 4 is key
    dict["0x"+cells[4].innerText.replace(/( |%)/g, "")] = cells[1].innerText

    // Second Column
    // index 7 is value
    // index 10 is key
    dict["0x"+cells[10].innerText.replace(/( |%)/g, "")] = cells[7].innerText
}

var str="";
for(var v in dict){
	str+=v+" : "+dict[v]+",\n"
}
console.log(str)*/

var utfToWindows1252 = {
	0xC2A0 : 0xA0,
	0xC2A1 : 0xA1,
	0xC2A2 : 0xA2,
	0xC2A3 : 0xA3,
	0xC2A4 : 0xA4,
	0xC2A5 : 0xA5,
	0xC2A6 : 0xA6,
	0xC2A7 : 0xA7,
	0xC2A8 : 0xA8,
	0xC2A9 : 0xA9,
	0xC2AA : 0xAA,
	0xC2AB : 0xAB,
	0xC2AC : 0xAC,
	0xC2AD : 0xAD,
	0xC2AE : 0xAE,
	0xC2AF : 0xAF,
	0xC2B0 : 0xB0,
	0xC2B1 : 0xB1,
	0xC2B2 : 0xB2,
	0xC2B3 : 0xB3,
	0xC2B4 : 0xB4,
	0xC2B5 : 0xB5,
	0xC2B6 : 0xB6,
	0xC2B7 : 0xB7,
	0xC2B8 : 0xB8,
	0xC2B9 : 0xB9,
	0xC2BA : 0xBA,
	0xC2BB : 0xBB,
	0xC2BC : 0xBC,
	0xC2BD : 0xBD,
	0xC2BE : 0xBE,
	0xC2BF : 0xBF,
	0xC380 : 0xC0,
	0xC381 : 0xC1,
	0xC382 : 0xC2,
	0xC383 : 0xC3,
	0xC384 : 0xC4,
	0xC385 : 0xC5,
	0xC386 : 0xC6,
	0xC387 : 0xC7,
	0xC388 : 0xC8,
	0xC389 : 0xC9,
	0xC38A : 0xCA,
	0xC38B : 0xCB,
	0xC38C : 0xCC,
	0xC38D : 0xCD,
	0xC38E : 0xCE,
	0xC38F : 0xCF,
	0xC390 : 0xD0,
	0xC391 : 0xD1,
	0xC392 : 0xD2,
	0xC393 : 0xD3,
	0xC394 : 0xD4,
	0xC395 : 0xD5,
	0xC396 : 0xD6,
	0xC397 : 0xD7,
	0xC398 : 0xD8,
	0xC399 : 0xD9,
	0xC39A : 0xDA,
	0xC39B : 0xDB,
	0xC39C : 0xDC,
	0xC39D : 0xDD,
	0xC39E : 0xDE,
	0xC39F : 0xDF,
	0xC3A0 : 0xE0,
	0xC3A1 : 0xE1,
	0xC3A2 : 0xE2,
	0xC3A3 : 0xE3,
	0xC3A4 : 0xE4,
	0xC3A5 : 0xE5,
	0xC3A6 : 0xE6,
	0xC3A7 : 0xE7,
	0xC3A8 : 0xE8,
	0xC3A9 : 0xE9,
	0xC3AA : 0xEA,
	0xC3AB : 0xEB,
	0xC3AC : 0xEC,
	0xC3AD : 0xED,
	0xC3AE : 0xEE,
	0xC3AF : 0xEF,
	0xC3B0 : 0xF0,
	0xC3B1 : 0xF1,
	0xC3B2 : 0xF2,
	0xC3B3 : 0xF3,
	0xC3B4 : 0xF4,
	0xC3B5 : 0xF5,
	0xC3B6 : 0xF6,
	0xC3B7 : 0xF7,
	0xC3B8 : 0xF8,
	0xC3B9 : 0xF9,
	0xC3BA : 0xFA,
	0xC3BB : 0xFB,
	0xC3BC : 0xFC,
	0xC3BD : 0xFD,
	0xC3BE : 0xFE,
	0xC3BF : 0xFF,
	0xC592 : 0x8C,
	0xC593 : 0x9C,
	0xC5A0 : 0x8A,
	0xC5A1 : 0x9A,
	0xC5B8 : 0x9F,
	0xC5BD : 0x8E,
	0xC5BE : 0x9E,
	0xC692 : 0x83,
	0xCB86 : 0x88,
	0xCB9C : 0x98,
	0xE28093 : 0x96,
	0xE28094 : 0x97,
	0xE28098 : 0x91,
	0xE28099 : 0x92,
	0xE2809A : 0x82,
	0xE2809C : 0x93,
	0xE2809D : 0x94,
	0xE2809E : 0x84,
	0xE280A0 : 0x86,
	0xE280A1 : 0x87,
	0xE280A2 : 0x95,
	0xE280A6 : 0x85,
	0xE280B0 : 0x89,
	0xE280B9 : 0x8B,
	0xE280BA : 0x9B,
	0xE284A2 : 0x99,
	0xE282AC : 0x80
}


// Dictionary from https://github.com/nginx/nginx/blob/master/contrib/unicode2nginx/win-utf
// Parsed with awk -F ; '{print $1}' utf_win.txt | awk -F " " '{print "0x"$2" : 0x"$1","}' | sort
var utfToWindows1251 = {
	0xC2A0 : 0xA0,
	0xC2A4 : 0xA4,
	0xC2A6 : 0xA6,
	0xC2A7 : 0xA7,
	0xC2A9 : 0xA9,
	0xC2AB : 0xAB,
	0xC2AC : 0xAC,
	0xC2AD : 0xAD,
	0xC2AE : 0xAE,
	0xC2B0 : 0xB0,
	0xC2B1 : 0xB1,
	0xC2B5 : 0xB5,
	0xC2B6 : 0xB6,
	0xC2B7 : 0xB7,
	0xC2BB : 0xBB,
	0xD081 : 0xA8,
	0xD082 : 0x80,
	0xD083 : 0x81,
	0xD084 : 0xAA,
	0xD085 : 0xBD,
	0xD086 : 0xB2,
	0xD087 : 0xAF,
	0xD088 : 0xA3,
	0xD089 : 0x8A,
	0xD08A : 0x8C,
	0xD08B : 0x8E,
	0xD08C : 0x8D,
	0xD08E : 0xA1,
	0xD08F : 0x8F,
	0xD090 : 0xC0,
	0xD091 : 0xC1,
	0xD092 : 0xC2,
	0xD093 : 0xC3,
	0xD094 : 0xC4,
	0xD095 : 0xC5,
	0xD096 : 0xC6,
	0xD097 : 0xC7,
	0xD098 : 0xC8,
	0xD099 : 0xC9,
	0xD09A : 0xCA,
	0xD09B : 0xCB,
	0xD09C : 0xCC,
	0xD09D : 0xCD,
	0xD09E : 0xCE,
	0xD09F : 0xCF,
	0xD0A0 : 0xD0,
	0xD0A1 : 0xD1,
	0xD0A2 : 0xD2,
	0xD0A3 : 0xD3,
	0xD0A4 : 0xD4,
	0xD0A5 : 0xD5,
	0xD0A6 : 0xD6,
	0xD0A7 : 0xD7,
	0xD0A8 : 0xD8,
	0xD0A9 : 0xD9,
	0xD0AA : 0xDA,
	0xD0AB : 0xDB,
	0xD0AC : 0xDC,
	0xD0AD : 0xDD,
	0xD0AE : 0xDE,
	0xD0AF : 0xDF,
	0xD0B0 : 0xE0,
	0xD0B1 : 0xE1,
	0xD0B2 : 0xE2,
	0xD0B3 : 0xE3,
	0xD0B4 : 0xE4,
	0xD0B5 : 0xE5,
	0xD0B6 : 0xE6,
	0xD0B7 : 0xE7,
	0xD0B8 : 0xE8,
	0xD0B9 : 0xE9,
	0xD0BA : 0xEA,
	0xD0BB : 0xEB,
	0xD0BC : 0xEC,
	0xD0BD : 0xED,
	0xD0BE : 0xEE,
	0xD0BF : 0xEF,
	0xD180 : 0xF0,
	0xD181 : 0xF1,
	0xD182 : 0xF2,
	0xD183 : 0xF3,
	0xD184 : 0xF4,
	0xD185 : 0xF5,
	0xD186 : 0xF6,
	0xD187 : 0xF7,
	0xD188 : 0xF8,
	0xD189 : 0xF9,
	0xD18A : 0xFA,
	0xD18B : 0xFB,
	0xD18C : 0xFC,
	0xD18D : 0xFD,
	0xD18E : 0xFE,
	0xD18F : 0xFF,
	0xD191 : 0xB8,
	0xD192 : 0x90,
	0xD193 : 0x83,
	0xD194 : 0xBA,
	0xD195 : 0xBE,
	0xD196 : 0xB3,
	0xD197 : 0xBF,
	0xD198 : 0xBC,
	0xD199 : 0x9A,
	0xD19A : 0x9C,
	0xD19B : 0x9E,
	0xD19C : 0x9D,
	0xD19E : 0xA2,
	0xD19F : 0x9F,
	0xD290 : 0xA5,
	0xD291 : 0xB4,
	0xE28093 : 0x96,
	0xE28094 : 0x97,
	0xE28098 : 0x91,
	0xE28099 : 0x92,
	0xE2809A : 0x82,
	0xE2809C : 0x93,
	0xE2809D : 0x94,
	0xE2809E : 0x84,
	0xE280A0 : 0x86,
	0xE280A1 : 0x87,
	0xE280A2 : 0x95,
	0xE280A6 : 0x85,
	0xE280B0 : 0x89,
	0xE280B9 : 0x8B,
	0xE280BA : 0x9B,
	0xE282AC : 0x88,
	0xE28496 : 0xB9,
	0xE284A2 : 0x99
}

function fixWin1251Utf8Encoding(string){
    // All header values that are in dict above
	var headerToCheck = [0xC2, 0xD0, 0xD1, 0xD2, 0xE2];

	return fixEncoding(utfToWindows1251, headerToCheck, string);
}

function fixWin1252Utf8Encoding(string){
    // All header values that are in dict above
	var headerToCheck = [0xC2, 0xC3, 0xC5, 0xC6, 0xCB, 0xE2];
	
    return fixEncoding(utfToWindows1252, headerToCheck, string);
}

function fixWin1251Utf8EncodingBase64(base64){
    // All header values that are in dict above
	var headerToCheck = [0xC2, 0xD0, 0xD1, 0xD2, 0xE2];

	return fixEncodingBae64(utfToWindows1251, headerToCheck, base64);
}

function fixWin1252Utf8EncodingBase64(base64){
    // All header values that are in dict above
	var headerToCheck = [0xC2, 0xC3, 0xC5, 0xC6, 0xCB, 0xE2];
	
    return fixEncodingBae64(utfToWindows1252, headerToCheck, base64);
}

function fixEncodingBae64(dict, headerToCheck, base64){
	// Original data
	var utf8ByteArray = base64js.toByteArray(base64);

	if (utf8ByteArray == null){
		// We failed to decode return original
		return base64;
	}

	// Return data
	var newUtf8ByteArray = [];
	// Return data index
	var newIndex = 0;

	for (var i=0; i<utf8ByteArray.length; i++){
		// We have a char that might be problematic
		if (headerToCheck.includes(utf8ByteArray[i])){
			var two, three = null;	// Some utf chars in dict are two bytes others are three bytes
			var gotWhatWeNeed = false;

			// We have space for three and two bytes
			if (i+2 < utf8ByteArray.length){
				two = [utf8ByteArray[i], utf8ByteArray[i+1]];
				three = [utf8ByteArray[i], utf8ByteArray[i+1], utf8ByteArray[i+2]];
				gotWhatWeNeed = true;
			}

			// We have space for two bytes only
			if (!gotWhatWeNeed && i+1 < utf8ByteArray.length){
				two = [utf8ByteArray[i], utf8ByteArray[i+1]];
			}

			if (two != null || three != null){
				if (three != null && byteArrayToInt(three) in dict){
					newUtf8ByteArray[newIndex++] = dict[byteArrayToInt(three)];
					// We used three bytes skip over them in loop
					i += 2;
					continue;
				}

				if (two != null && byteArrayToInt(two) in dict){
					newUtf8ByteArray[newIndex++] = dict[byteArrayToInt(two)];
					// We used two bytes skip over them in loop
					i++;
					continue;
				}
			}
		}

		// Only reach this if we dont find a match in two or three
		newUtf8ByteArray[newIndex++] = utf8ByteArray[i];
	}
	
	return utf8ByteArrayToString(newUtf8ByteArray);
}

function fixEncoding(dict, headerToCheck, string){
	// Original data
	var utf8ByteArray = stringToUtf8ByteArray(string);	// Javascript encodes strings in UTF-16, convert to UTF-8
	
	if (utf8ByteArray == null){
		// We failed to decode return original
		return string;
	}

	// Return data
	var newUtf8ByteArray = [];
	// Return data index
	var newIndex = 0;

	for (var i=0; i<utf8ByteArray.length; i++){
		// We have a char that might be problematic
		if (headerToCheck.includes(utf8ByteArray[i])){
			var two, three = null;	// Some utf chars in dict are two bytes others are three bytes
			var gotWhatWeNeed = false;

			// We have space for three and two bytes
			if (i+2 < utf8ByteArray.length){
				two = [utf8ByteArray[i], utf8ByteArray[i+1]];
				three = [utf8ByteArray[i], utf8ByteArray[i+1], utf8ByteArray[i+2]];
				gotWhatWeNeed = true;
			}

			// We have space for two bytes only
			if (!gotWhatWeNeed && i+1 < utf8ByteArray.length){
				two = [utf8ByteArray[i], utf8ByteArray[i+1]];
			}

			if (two != null || three != null){
				if (three != null && byteArrayToInt(three) in dict){
					newUtf8ByteArray[newIndex++] = dict[byteArrayToInt(three)];
					// We used three bytes skip over them in loop
					i += 2;
					continue;
				}

				if (two != null && byteArrayToInt(two) in dict){
					newUtf8ByteArray[newIndex++] = dict[byteArrayToInt(two)];
					// We used two bytes skip over them in loop
					i++;
					continue;
				}
			}
		}

		// Only reach this if we dont find a match in two or three
		newUtf8ByteArray[newIndex++] = utf8ByteArray[i];
	}
	
	return utf8ByteArrayToString(newUtf8ByteArray);
}

// From https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js
function utf8ByteArrayToString(bytes) {
  var out = [], pos = 0, c = 0;
  while (pos < bytes.length) {
	var c1 = bytes[pos++];
	if (c1 < 128) {
	  out[c++] = String.fromCharCode(c1);
	} else if (c1 > 191 && c1 < 224) {
	  var c2 = bytes[pos++];
	  out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
	} else if (c1 > 239 && c1 < 365) {
	  // Surrogate Pair
	  var c2 = bytes[pos++];
	  var c3 = bytes[pos++];
	  var c4 = bytes[pos++];
	  var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
		  0x10000;
	  out[c++] = String.fromCharCode(0xD800 + (u >> 10));
	  out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
	} else {
	  var c2 = bytes[pos++];
	  var c3 = bytes[pos++];
	  out[c++] =
		  String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
	}
  }
  return out.join('');
};

// From https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js
function stringToUtf8ByteArray(str) {
  if (str == null){
  	return null;
  }

  var out = [], p = 0;
  for (var i = 0; i < str.length; i++) {
	var c = str.charCodeAt(i);
	if (c < 128) {
	  out[p++] = c;
	} else if (c < 2048) {
	  out[p++] = (c >> 6) | 192;
	  out[p++] = (c & 63) | 128;
	} else if (
		((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
		((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
	  // Surrogate Pair
	  c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
	  out[p++] = (c >> 18) | 240;
	  out[p++] = ((c >> 12) & 63) | 128;
	  out[p++] = ((c >> 6) & 63) | 128;
	  out[p++] = (c & 63) | 128;
	} else {
	  out[p++] = (c >> 12) | 224;
	  out[p++] = ((c >> 6) & 63) | 128;
	  out[p++] = (c & 63) | 128;
	}
  }
  return out;
};


function byteArrayToInt(bytes){
	var multiply = 256; // 16^2
	var currentMultiply = multiply;
	// Reverse order
	for (var i=bytes.length-1; i>=0; i--){
		if (i == bytes.length-1){
			var value = bytes[i];
		}else{
			value += currentMultiply * bytes[i]
			// Double exponent
			// 16^2->16^4->16^6->...
			currentMultiply *= multiply;	
		}
	}

	return value;
}

//TODO
//add recursive call for multilevel encoding fix

// Base64decode base64.js.min
(function(r){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=r()}else if(typeof define==="function"&&define.amd){define([],r)}else{var e;if(typeof window!=="undefined"){e=window}else if(typeof global!=="undefined"){e=global}else if(typeof self!=="undefined"){e=self}else{e=this}e.base64js=r()}})(function(){var r,e,n;return function(){function r(e,n,t){function o(f,i){if(!n[f]){if(!e[f]){var u="function"==typeof require&&require;if(!i&&u)return u(f,!0);if(a)return a(f,!0);var v=new Error("Cannot find module '"+f+"'");throw v.code="MODULE_NOT_FOUND",v}var d=n[f]={exports:{}};e[f][0].call(d.exports,function(r){var n=e[f][1][r];return o(n||r)},d,d.exports,r,e,n,t)}return n[f].exports}for(var a="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}return r}()({"/":[function(r,e,n){"use strict";n.byteLength=d;n.toByteArray=h;n.fromByteArray=p;var t=[];var o=[];var a=typeof Uint8Array!=="undefined"?Uint8Array:Array;var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,u=f.length;i<u;++i){t[i]=f[i];o[f.charCodeAt(i)]=i}o["-".charCodeAt(0)]=62;o["_".charCodeAt(0)]=63;function v(r){var e=r.length;if(e%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}var n=r.indexOf("=");if(n===-1)n=e;var t=n===e?0:4-n%4;return[n,t]}function d(r){var e=v(r);var n=e[0];var t=e[1];return(n+t)*3/4-t}function c(r,e,n){return(e+n)*3/4-n}function h(r){var e;var n=v(r);var t=n[0];var f=n[1];var i=new a(c(r,t,f));var u=0;var d=f>0?t-4:t;for(var h=0;h<d;h+=4){e=o[r.charCodeAt(h)]<<18|o[r.charCodeAt(h+1)]<<12|o[r.charCodeAt(h+2)]<<6|o[r.charCodeAt(h+3)];i[u++]=e>>16&255;i[u++]=e>>8&255;i[u++]=e&255}if(f===2){e=o[r.charCodeAt(h)]<<2|o[r.charCodeAt(h+1)]>>4;i[u++]=e&255}if(f===1){e=o[r.charCodeAt(h)]<<10|o[r.charCodeAt(h+1)]<<4|o[r.charCodeAt(h+2)]>>2;i[u++]=e>>8&255;i[u++]=e&255}return i}function s(r){return t[r>>18&63]+t[r>>12&63]+t[r>>6&63]+t[r&63]}function l(r,e,n){var t;var o=[];for(var a=e;a<n;a+=3){t=(r[a]<<16&16711680)+(r[a+1]<<8&65280)+(r[a+2]&255);o.push(s(t))}return o.join("")}function p(r){var e;var n=r.length;var o=n%3;var a=[];var f=16383;for(var i=0,u=n-o;i<u;i+=f){a.push(l(r,i,i+f>u?u:i+f))}if(o===1){e=r[n-1];a.push(t[e>>2]+t[e<<4&63]+"==")}else if(o===2){e=(r[n-2]<<8)+r[n-1];a.push(t[e>>10]+t[e>>4&63]+t[e<<2&63]+"=")}return a.join("")}},{}]},{},[])("/")});
