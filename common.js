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
const LABEL_DATELIST_ENTRY_TYPES = ['해당 일수 부터', '해당 일수 까지', '해당 기간 (상대적)','특정 날짜 부터','특정 날짜 까지','특정 기간 (절대적)'];