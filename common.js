//
//
//  공용 사용 스크립트
//
//

// 디버그 플래그
var isDebug = false;

/**
 * 디버그 플래그 true일 때만 다이얼로그를 띄우고
 * 디버그 플래그와 무관하게 콘솔에 로그
 * @param {*} msg 
 */
function alertAndLog(msg){
    if(isDebug){
        alert(msg);
    }
    console.log(msg);
}