# IMPORTANT
This repo is abandoned. There is an official chrome extension [here](https://chrome.google.com/webstore/detail/threatbook-intelligence-s/mmaealgfcimgjjbiekfjmikfajoopacg). The official extension has more functionality and is powerful than this test extension.
# chromX
A chrome extension that can extract IOCs (indicator of compromise) on a web page, and make them easy to search in X platform of [Threatbook](https://x.threatbook.cn).

Inspired by another chrome extension: [IOC Extractor](https://chrome.google.com/webstore/detail/ioc-extractor/nbmkglllnbachmojpjnbhadihcdjghfa)

## install
- git clone `git@github.com:oakland/chromX.git`.
- Navigate to **chrome://extensions** in your browser.
- Check the box next to **Developer Mode**.
- Click **Load Unpacked Extension** and select the directory **x_extension** in this git repository.

Congratulations! You can now use this popup-based extension by clicking the X icon in your chrome.

## current IOC support
- ipv4
- domain
- sha256

## features in coming
- support MD5, SHA1
- make other IOC types optional, like email, phone, url, CVE, Bitcoin and others
- show sum of all IOCs

## issues and demands
- change reg
