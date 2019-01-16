// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('openOptionsPage').addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });

    document.getElementById('openGitHub').addEventListener('click', function () {
        chrome.tabs.create({ url: "https://github.com/SD810/SearchDateLen" });
    });
});