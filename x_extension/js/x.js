document.addEventListener('DOMContentLoaded', function() {
  var searchBtn = document.getElementById('search');
  var queryInput = document.getElementById('query');

  searchBtn.addEventListener('click', function() {
    queryIocInX();
  }, false);

  queryInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      queryIocInX();
    }
  }, false);

  function queryIocInX() {
    var query = queryInput.value;
    var preUrl = 'https://x.threatbook.cn/query/'
    var reqUrl = preUrl + query;

    window.open(reqUrl);
  }
}, false);

$(function () {
    chrome.runtime.onMessage.addListener(function (request, sender) {
        if (request.action == "getSource") {
            var pageText = $(request.source).find('*:not(script):not(style):not(noscript)').text();

            var outputMarkup = '';

            var matchedIP = pageText.match(regex.IP);
            var uniqueIP = uniqueFiltered(matchedIP, filters.ioc.ip);
            var uniqueIPEle = uniqueIP.map((ip, index) => {
                return `${index + 1}. <a target="_blank" href="https://x.threatbook.cn/query/${ip}">${ip}</a>`
            });
            if (uniqueIP.length > 0) {
                outputMarkup += `<div> <h3>IPs (${uniqueIPEle.length})</h3> ${uniqueIPEle.join("</br>")} </div>`;
            }

            var matchedDomain = pageText.match(regex.Domain);
            var uniqueDomain = uniqueFilteredDomains(matchedDomain, (filters.ioc.domain + filters.alexa));
            var uniqueDomainEle = uniqueDomain.map((domain, index) => {
                return `${index + 1}. <a target="_blank" href="https://x.threatbook.cn/query/${domain}">${domain}</a>`
            });
            console.log(uniqueDomainEle);
            if (uniqueDomain.length > 0) {
                outputMarkup += `<div><h3>Domains (${uniqueDomainEle.length})</h3>${uniqueDomainEle.join("</br>")}</div>`;
            }

            var matchedSha256 = pageText.match(regex.SHA256);
            var uniqueSha256 = uniqueFiltered(matchedSha256, []);
            var uniqueSha256Ele = uniqueSha256.map((sha256, index) => {
                return `${index + 1}. <a target="_blank" href="https://x.threatbook.cn/query/${sha256}">${sha256}</a>`
            });
            if (uniqueSha256.length > 0) {
                outputMarkup += `<div><h3>SHA-256 Hashes (${uniqueSha256Ele.length})</h3>${uniqueSha256Ele.join("</br>")}</div>`;
            }

            // var matchedSha1 = pageText.match(regex.SHA1);
            // var uniqueSha1 = uniqueFiltered(matchedSha1, []);
            // if (uniqueSha1.length > 0) {
            //     outputMarkup += '<h3>SHA-1 Hashes</h3><pre>' + uniqueSha1.join("\n") + '</pre></div>';
            // }

            // var matchedMd5 = pageText.match(regex.MD5);
            // var uniqueMd5 = uniqueFiltered(matchedMd5, []);
            // if (uniqueMd5.length > 0) {
            //     outputMarkup += '<h3>MD5 Hashes</h3><pre>' + uniqueMd5.join("\n") + '</pre></div>';
            // }

            // var matchedCve = pageText.match(regex.CVE);
            // var uniqueCve = uniqueFiltered(matchedCve, []);
            // if (uniqueCve.length > 0) {
            //     outputMarkup += '<h3>CVEs</h3><pre>' + uniqueCve.join("\n") + '</pre></div>';
            // }

            if (!outputMarkup) {
                outputMarkup = 'No indicators found on this page.';
            }

            // 这里得到的结果要再过滤一遍
            // MD5, SHA1 的结果要每个拿出来看一下是不是 SHA256 中某个字符串的内容，如果是就删除掉，如果不是则保留
            // 通过上面的办法只能实现不在 SHA256 中提取 MD5 和 SHA1，但是无法实现 SHA256 自身可能会由于和其他数字字母组合而导致的

            IndicatorList.innerHTML = outputMarkup;
        }
    });

    function onWindowLoad() {
        var IndicatorList = document.querySelector('#IndicatorList');

        chrome.tabs.executeScript(null, {
            file: "js/getPagesSource.js"
        }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.runtime.lastError) {
                IndicatorList.innerText = 'There was an error reading url : \n' + chrome.runtime.lastError.message;
            }
        });
    }

    function uniqueValues(value, index, self) {
        return self.indexOf(value) === index;
    }

    function uniqueFilteredDomains(inputArray, filterList) {
        var validDomains = [];
        var domains = uniqueFiltered(inputArray, filterList);
        $.each(domains, function (i, v) {
            var splits = v.split('.');
            if (splits.length >= 2) {
                if (tlds.indexOf(splits[splits.length - 1].toLowerCase()) !== -1) {
                    // Match tlds with single got
                    validDomains.push(v);
                } else if (splits.length >= 3 && tlds.indexOf((splits[splits.length - 2] + '.' + splits[splits.length - 1]).toLowerCase()) !== -1) {
                    // Match tlds with two got
                    validDomains.push(v);
                } else if (splits.length >= 4 && tlds.indexOf((splits[splits.length - 3] + '.' + splits[splits.length - 2] + '.' + splits[splits.length - 1]).toLowerCase()) !== -1) {
                    // Match tlds with two got
                    validDomains.push(v);
                }
            }
        });

        return validDomains;
    }

    function uniqueFiltered(inputArray, filterList) {
        var uniqueFiltered = [];

        if (inputArray) {
            var uniqueItems = inputArray.filter(uniqueValues);

            uniqueFiltered = uniqueItems.filter(function (value) {
                var splits = value.split('.');
                if (splits.length >= 3) {
                    if (filterList.indexOf((splits[splits.length - 2] + '.' + splits[splits.length - 1]).toLowerCase()) == -1) {
                        return true;
                    }
                } else {
                    return filterList.indexOf(value.toLowerCase()) == -1;
                }
            });
        }

        return uniqueFiltered;
    }

    window.onload = onWindowLoad;
  });