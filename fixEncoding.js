/*
	Fix double encoded string in javascript
	UTF-8 strings decoded in Windows-1252 and re-encoded in UTF-8
	Philippe Fisher
*/

// Dictionary from https://github.com/nginx/nginx/blob/master/contrib/unicode2nginx/win-utf
function fixWinUtfEncoding(string){
	// Parsed with awk -F ; '{print $1}' utf_win.txt | awk -F " " '{print "0x"$2" : 0x"$1","}' | sort
	var utfToWindows = {
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
		0xE284A2 : 0x99,
	}

	// All header values that are in dict
	var headerToCheck = [0xC2, 0xD0, 0xD1, 0xD2, 0xE2]
	// Original data
	var utf8ByteArray = stringToUtf8ByteArray(string)	// Javascript encodes strings in UTF-16, convert to UTF-8
	// Return data
	var newUtf8ByteArray = [];
	// Return data index
	var newIndex = 0;

	for (var i=0; i<utf8ByteArray.length; i++){
		// We have a char that might be problematic
		if (headerToCheck.includes(utf8ByteArray[i])){
			var two, three = null;
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
		    	if (three != null && byteArrayToInt(three) in windowsToUtf){
		    		newUtf8ByteArray[newIndex++] = windowsToUtf[byteArrayToInt(three)];
		    		// We used three bytes skip over them in loop
		    		i += 2;
		    		continue;
		    	}

		    	if (two != null && byteArrayToInt(two) in windowsToUtf){
		    		newUtf8ByteArray[newIndex++] = windowsToUtf[byteArrayToInt(two)];
		    		// We used two bytes skip over them in loop
		    		i++;
		    		continue;
		    	}
			}
		}

		newUtf8ByteArray[newIndex++] = utf8ByteArray[i]
	}

	return utf8ByteArrayToString(newUtf8ByteArray)
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
	var multiply = 256 // 16^2
	// Reverse order
	for (var i=bytes.length-1; i>=0; i--){
		if (i == bytes.length-1){
			var value = bytes[i]
		}else{
			value += multiply * bytes[i]
			// Double exponent
			// 16^2->16^4->16^6->...
			multiply *= multiply;	
		}
	}

	return value
}