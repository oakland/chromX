# chromX
A chrome extension that can extract IOCs (indicator of compromise) on a web page, and make them easy to search in X platform of Threatbook.
Inspired by [IOC Extractor](https://chrome.google.com/webstore/detail/ioc-extractor/nbmkglllnbachmojpjnbhadihcdjghfa)

## install
- git clone git@github.com:oakland/chromX.git
- Navigate to chrome://extensions in your browser.
- Check the box next to **Developer Mode**.
- Click **Load Unpacked Extension** and select the directory **x_extension** in this git repository.

Congratulations! You can now use this popup-based extension by clicking the X icon in your chrome.

## current IOC support
- ipv4
- domain
- sha256

## features in coming
- show sum of all IOCs and numbers of corresponding IOC
- open a window of IOC result in X