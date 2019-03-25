// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {

    // 언어 적용
    document.title = chrome.i18n.getMessage("popupName");
    document.querySelector(".title").innerHTML = chrome.i18n.getMessage("popupName");
    document.querySelector("#openOptionsPage a").innerHTML = chrome.i18n.getMessage("settings");
    document.querySelector("#openGitHub a").innerHTML = chrome.i18n.getMessage("github");

    // 버전 번호 적용
    document.getElementById('versionNo').innerHTML = chrome.runtime.getManifest().version;

    // 클릭 리스너 적용
    document.getElementById('openOptionsPage').addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });
    document.getElementById('openGitHub').addEventListener('click', function () {
        chrome.tabs.create({ url: "https://github.com/SD810/SearchDateLen" });
    });
});