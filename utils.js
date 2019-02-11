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
        tag.innerHTML = tag.innerHTML + appendStr;
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
    alertAndLog("searchDateLen: [utils] setting "+year+"years "+month+"months "+date+"days from "+
        dateTarget.getFullYear()+"-"+getTwoDigitNumber(dateTarget.getMonth() + 1)+"-"+getTwoDigitNumber(dateTarget.getDate()));
    dateTarget.setFullYear(dateTarget.getFullYear() - year);
    dateTarget.setMonth(dateTarget.getMonth() - month);
    dateTarget.setDate(dateTarget.getDate() - date);
    
    dateTarget = makeDateSupported(dateTarget, year, month, date);
    return dateTarget;
}

// 입력받은 날짜 그대로 현재날짜로. 단, 0인건 현재날짜를 기준으로
function setDateExactTry(year, month, date){
    return setDateHybrid(year, month, date);
    // var dateTarget = new Date();
    // alertAndLog("searchDateLen: [utils] trying to set "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date)+" into "+
    //     dateTarget.getFullYear()+"-"+getTwoDigitNumber(dateTarget.getMonth() + 1)+"-"+getTwoDigitNumber(dateTarget.getDate()));
    // if(year > 0) {
    //     dateTarget.setFullYear(year);
    // }
    // if(month > 0) {
    //     dateTarget.setMonth(month-1);
    // }
    // if(date > 0 ){
    //     dateTarget.setDate(date);
    // }
    
    // dateTarget = makeDateSupported(dateTarget, year, month, date);
    // return dateTarget;
}

// 입력받은 날짜 그대로 현재날짜로.
// 단, 오늘로부터 -99 ~ +99년으로 조절할 수 있게 하자
function setDateHybrid(year, month, date){
    var dateTarget = new Date();
    alertAndLog("searchDateLen: [utils] trying to set "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date)+" into "+
        dateTarget.getFullYear()+"-"+(dateTarget.getMonth() + 1)+"-"+dateTarget.getDate());
    
    if(year >= LIMIT_YEARS_HBD_PLUS) {
        alertAndLog('searchDateLen: [utils] got year '+LIMIT_YEARS_HBD_PLUS+' <= '+ year +'. trying as-is.');
        dateTarget.setFullYear(year);
    }else if(year > LIMIT_YEARS_HBD_MINUS){
        alertAndLog('searchDateLen: [utils] got year '+LIMIT_YEARS_HBD_MINUS+' < '+ year + '. using this as relative year in hybrid mode.');
        dateTarget.setFullYear(dateTarget.getFullYear() + year);
        year = dateTarget.getFullYear();
    }

    if(month > 0) {
        dateTarget.setMonth(month-1);
    }

    if(date > 0) {
        dateTarget.setDate(date);
    }

    dateTarget = makeDateSupported(dateTarget, year, month, date);

    return dateTarget;
}


// 년월일이 미래인 경우 조건에 맞게 당긴다.
// <예1>
// 오늘 2019-02-11
// from    0-07-01 -> 2018-07-01
// to      0-12-31 -> 2018-12-31
// <예2>
// 오늘 2019-08-11
// from    0-07-01 -> 2019-07-01
// to      0-12-31 -> 2019-12-31
function pullDateMonthOrYear(dateObj, year, month, date, forceShot = false){
    var today = new Date();

    if(dateObj <= today || (year != 0 && month != 0 && date != 0)){
        // 이미 과거나 오늘이거나 모든게 고정된 날짜. 고칠 필요 없음
        return dateObj;
    }

    // // 일이 지정되어 있음, 월을 고쳐본다
    // if(date != 0){
    //     while(dateObj > today){
    //         // 월이 지정되어 있음, 지나친다.
    //         if(month != 0){
    //             break;
    //         }
    //         dateObj.setMonth(dateObj.getMonth() - 1);
    //     }
    // }

    // // 월이 지정되어 있음, 년을 고쳐본다
    // if(month != 0){
    //     while(dateObj > today){
    //         // 년이 지정되어 있음, 지나친다
    //         if(year != 0){
    //             break;
    //         }
    //         dateObj.setFullYear(dateObj.getFullYear() - 1);
    //     }
    // }

    // // 년이 지정되어 있음.
    // if(year != 0){
    //     if(month != 0){

    //     }
    // }

    while(dateObj > today){
        if(year == 0){
            dateObj.setFullYear(dateObj.getFullYear() - 1);
            continue;
        }

        if(month == 0){
            dateObj.setMonth(dateObj.getMonth() - 1);
            continue;
        }

        if(date == 0){
            dateObj.setDate(dateObj.getDate() - 1);
            continue;
        }
    }

    return dateObj;
}

// Date 객체가 유효한지 검사
function isDateSupported(dateObj, year, month, date){
    
    if(Boolean(+dateObj)){
        // dateObj.getDate() == date만 해도 된다고
        // https://medium.com/@esganzerla/simple-date-validation-with-javascript-caea0f71883c
        // 에 적혀있지만, 로깅 기능이 있으니 빡빡하게 해볼까.
        //if(dateObj.getDate() == date){
        if(dateObj.getFullYear() == year && (dateObj.getMonth() + 1) == month && dateObj.getDate() == date){
            alertAndLog("searchDateLen: [utils] Supported and desired date: "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date));
        } else {
            alertAndLog("searchDateLen: [utils] Supported but calibrated date: "+dateObj.getFullYear()+"-"+getTwoDigitNumber(dateObj.getMonth() + 1)+"-"+getTwoDigitNumber(dateObj.getDate()));
        }
        return true;
    } else {
        alertAndLog("searchDateLen: [utils] This is not supported date: "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date));
        return false;
    }
}

// 유효한 Date 객체로 변환
function makeDateSupported(dateObj, year, month, date){
    var isOverrideOccured = false;
    if( ! isDateSupported(dateObj, year, month, date) ){
        isOverrideOccured = true;
        
        if(year < LIMIT_YEARS_ABS_MINIMUM){
            // -99 ~ +99는 상대값 매핑을 위해 사용되므로 100부터 있어야 한다.
            dateObj.setFullYear(LIMIT_YEARS_ABS_MINIMUM);
        }else if( year > LIMIT_YEARS_ABS_MAXIMUM){
            // iso8601 표현에는 년도를 상호간 동의 없이 0~9999를 초과할 수 없다.
            dateObj.setFullYear(LIMIT_YEARS_ABS_MAXIMUM);
        }
    }

    if(isOverrideOccured){
        alertAndLog("searchDateLen: [utils] date override occured: "+dateObj.getFullYear()+"-"+getTwoDigitNumber(dateObj.getMonth() + 1)+"-"+getTwoDigitNumber(dateObj.getDate())+" was "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date));
    }

    return dateObj;
}


// checkVal 값과 value가 같으면 selected 를 붙여 나오는 option 태그 생성
function getSelectedOptionTag(label, value, checkVal){
    var optionTag = document.createElement('option');
    optionTag.setAttribute('value', value);
    
    if(checkVal == value){
        optionTag.setAttribute('selected','selected');
    }

    optionTag.innerHTML = label;

    return optionTag;
}

// number 입력칸 생성
function getInputNumberTag(nameAndId, maxValue = 9999, value = 0){
    return getInputNumberTag(nameAndId, 0, maxValue, value);
}

function getInputNumberTag(nameAndId, minValue = 0, maxValue = 9999, value = 0){

    var inputTag = document.createElement('input');
    inputTag.setAttribute('type', 'number');
    inputTag.setAttribute('name', nameAndId);
    inputTag.setAttribute('id', nameAndId);

    // 최소와 최대 값이 반대면 뒤집는다
    if(minValue > maxValue){
        var temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }

    inputTag.setAttribute('min', minValue);
    inputTag.setAttribute('max', maxValue);

    // 여기는 문자열을 처리하지 않으므로 parseInt 없이도 괜찮을 것
    if(value < minValue){
        value = minValue;
    }else if( value > maxValue){
        value= maxValue;
    }
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

/**
 * 입력 수가 범위 내인지 확인하도록 이벤트리스너에 연결합니다.
 * min과 max 속성을 활용
 * 
 * @param {*} inputNumber 숫자 입력을 받는 input 태그의 HtmlNode
 */
function bindValidateInputNumber(inputNumber){
    var success = false;
    if(isNode(inputNumber) || isElement(inputNumber)){
        var minVal = inputNumber.getAttribute('min');
        var maxVal = inputNumber.getAttribute('max');

        // 수를 비교해야하므로 미리 수로 변환해둔다.
        if(!isNaN(minVal)){
            minVal = parseInt(minVal,10);
        }
        if(!isNaN(maxVal)){
            maxVal = parseInt(maxVal,10);
        }

        inputNumber.addEventListener('focusout', function () {
            validateInputNumber(inputNumber, minVal, maxVal);
        });
        success = true;
    }
    if(success){
        alertAndLog('searchDateLen: [utils] bindValidateInputNumber(#'+inputNumber.getAttribute('id')+')');
    }else{
        alertAndLog('searchDateLen: [utils] bindValidateInputNumber failed as this is not Node or Element');
    }
}

/**
 * 입력 수가 범위 내인지 확인하고 초과하는 값은 minVal 또는 maxVal로 대체합니다.
 * 
 * @param {*} inputNumber 숫자 입력을 받는 input 태그의 HtmlNode
 * @param {*} minVal 최소값
 * @param {*} maxVal 최대값
 */
function validateInputNumber(inputNumber, minVal, maxVal){
    
    var elementId = inputNumber.getAttribute('id');
    var value = inputNumber.value;
    alertAndLog('searchDateLen: [utils] validating input number area (#'+elementId+') as : ' + minVal + ' <= ' + value + ' <= ' + maxVal);

    // 수가 아니면 0으로 설정 후 종료.
    if(isNaN(value))
    {
        alertAndLog('searchDateLen: [utils] input number area (#'+elementId+') value is NaN');

        // 숫자 입력 input 태그에 value로 값 추출시 + 기호는 무시된다. - 기호는 음수.
        value = 0;
    }else{
        //문자열을 수로 변환하지 않으면 99 > 11111 이 성립하게 된다.
        value = parseInt(value,10);
    }

    // 최소값 미만시 minVal 값으로, 최대값 초과시 maxVal 값으로. 
    if(value < minVal){
        alertAndLog('searchDateLen: [utils] input number area (#'+elementId+') value is under ' + minVal);
        value = minVal;
    }else if(value > maxVal){
        alertAndLog('searchDateLen: [utils] input number area (#'+elementId+') value is over ' + maxVal);
        value = maxVal;
    }else{
        alertAndLog('searchDateLen: [utils] input number area (#'+elementId+') value is satisfying condition');
    }

    inputNumber.value = value;
}