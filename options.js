
// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {
    alertAndLog('DOMContentLoaded');
    var link = document.getElementById('doThing');
    // onClick's logic below:
    link.addEventListener('click', function () {
        alertAndLog('link clicked');
        
    });
});