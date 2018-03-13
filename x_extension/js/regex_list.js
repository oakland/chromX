var regex = {
    "IP": /\b(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/g,
    "Domain" : /\b([a-zA-Z0-9\-]{2,}\.)+[a-zA-Z]{2,}\b/g,
    "MD5": /[a-fA-F0-9]{32}\b/g,
    "SHA1": /[a-fA-F0-9]{40}\b/g,
    "SHA256": /[a-fA-F0-9]{64}\b/g
}


// function isDomain(val) {
//   return /^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,12}$/.test(val)
// }
// function isHash(val) {
// 	return /^[a-fA-F0-9]{64}|[a-fA-F0-9]{40}|[a-fA-F0-9]{32}$/.test(val)
// }
// function isValidIP(val) {
//   // return /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/.test(val)
//   var reg = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
//   var parts = val.split(":");
//   var ip = parts[0];
//   var port = parts[1];
//   if (!port) {
//     return reg.test(ip);
//   } else {
//     return reg.test(ip) && validatePort(port);
//   }
// }