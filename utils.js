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

// div/span 태그에 클래스를 정해둔 DOM 객체를 반환
// inner를 내부에 넣음, appendStr를 뒤에 붙임
function getClassedTag(tagType, className = '', inner = '', appendStr = null){
    var tag = document.createElement(tagType);
    tag.setAttribute('class', className);

    if(isNode(inner) || isElement(inner)){
        tag.appendChild(inner);
    }else{
        tag.innerHTML = inner;
    }

    if(appendStr){
        tag.innerHTML = tag.innterHTML + appendStr;
    }
    return tag;
}



//https://stackoverflow.com/a/384380
// DOM Node는 true
function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}  
// DOM Element는 true    
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

// 입력받은 날짜로 현재 날짜를 조정
function setDateFromNow(year, month, date){
    var dateTarget = new Date();
    dateTarget.setFullYear(dateTarget.getFullYear() - year);
    dateTarget.setMonth(dateTarget.getMonth() - month);
    dateTarget.setDate(dateTarget.getDate() - date);
    return dateTarget;
}

// checkVal 값과 value가 같으면 selected 를 붙여 나오는 option 태그 생성
function getSelectedOptionTag(value, checkVal){
    var optionTag = document.createElement('option');
    optionTag.setAttribute('value', value);
    
    if(checkVal == value){
        optionTag.setAttribute('selected','selected');
    }

    return optionTag;
}

// number 입력칸 생성
function getInputNumberTag(nameAndId, maxValue = 9999, value = 0){

    var inputTag = document.createElement('input');
    inputTag.setAttribute('type', 'number');
    inputTag.setAttribute('name', nameAndId);
    inputTag.setAttribute('id', nameAndId);
    inputTag.setAttribute('min', 0);
    inputTag.setAttribute('max', maxValue);
    inputTag.setAttribute('value', value);

    return inputTag;
}

// 일반 입력칸 생성
function getInputTextTag(nameAndId, isHidden = false, value = ''){

    var inputTag = document.createElement('input');
    inputTag.setAttribute('type', isHidden ? 'hidden' : 'text');
    inputTag.setAttribute('name', nameAndId);
    inputTag.setAttribute('id', nameAndId);
    inputTag.setAttribute('value', value);

    return inputTag;
}