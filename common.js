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

// 타입 형식들
const DATELIST_ENTRY_TYPES = ['rel_from', 'rel_to', 'rel_range', 'abs_from', 'abs_to', 'abs_range'];