//
//
//  공통으로 사용되는 유틸리티 함수들
//
//

function getTwoDigitNumber(number){
    return ((number < 10) ? '0' + number : number);
}

//https://stackoverflow.com/a/22279245
// 따옴표, 태그 & 탈출요법
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
function unescapeHtml(safe) {
    return safe
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}