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


//https://stackoverflow.com/a/26426761
// is leap year
function dateHasLeapYear(year) {
    // 111(2)와 AND 연산을 진행해 000(2)인지 확인하면 4로 나누어떨어지는지 알 수 있다
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};
// Get Day of Year
Date.prototype.getDOY = function() {
    // 각 월별 누적 일수
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    // 지난달까지의 누적일수 + 현재 월에서의 일수
    var dayOfYear = dayCount[mn] + dn;
    // 윤년이고 2월 이후라면 일 수를 1 증가
    if(mn > 1 && dateHasLeapYear(this.getFullYear())) dayOfYear++;

    return dayOfYear;
};


// 년월일이 미래인 경우 조건에 맞게 당긴다.
// <예1>
// 오늘 2019-02-11
// from    0-07-01 -> 2018-07-01
// to      0-12-31 -> 2018-12-31
// <예2>
// 오늘 2019-08-11
// from    0-07-01 -> 2019-07-01
// to      0-12-31 -> 2019-12-31
function pullDatesToFitPast(dateOrig, year, month, date){
    var today = fixDateTimeResidue(new Date());

    if(dateOrig > today){
        // 날짜가 미래다.
        alertAndLog('searchDateLen: [utils] '+dateOrig.getFullYear()+"-"+getTwoDigitNumber(dateOrig.getMonth())+"-"+getTwoDigitNumber(dateOrig.getDate())+' is future than '+today.getFullYear()+"-"+getTwoDigitNumber(today.getMonth())+"-"+getTwoDigitNumber(today.getDate())+'.');
        if(year != 0 && month != 0 && date != 0){
            // 모든게 고정된 날짜. 고칠 수 없음
            alertAndLog('searchDateLen: [utils] input was '+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date)+' so all immutable.');
            return dateOrig;
        }
    } else {
        // 이미 과거나 오늘. 고칠 필요 없음
        alertAndLog('searchDateLen: [utils] date is today or before today.');
        return dateOrig;
    }
    
    // 기존 객체 오염을 막기 위해 새 객체를 만들어 진행
    var dateObj = new Date(dateOrig.getTime());

    var yearChanged = 0;
    var monthChanged = 0;
    var dayChanged = 0;
    var dateChangeGaveUp = false;
    while(dateObj > today && !dateChangeGaveUp){

        if ( year == 0 && yearChanged == 0 ){
            // <예>
            // 0000-07-01
            // 2018-07-01
            // 0은 올해를 뜻하고 나머지 날짜로 인해 미래가 되더라도
            // 한 해만 내려가야 합니다.
            dateObj.setFullYear(dateObj.getFullYear() - 1);
            yearChanged ++;
            continue;
        }

        // dateCalc.setTime(dateObj.getTime());
        if( month == 0 ){
            // <예>
            // 2019-00-21
            // 2019-01-21
            // 0은 이번달을 뜻하고 나머지 날짜로 인해 미래가 될 수 있다
            // 여러달 내려서 지난달 XX일까지 내려갈 수 있다.
            // 년도 설정이 무시되지 않게 올해로 설정된 경우만 내릴 수 있게하고
            // 1월까지 내려오면 더 내려가지 않게 함
            if(year == 0 || dateObj.getMonth() > 0){
                dateObj.setMonth(dateObj.getMonth() - 1);
                monthChanged++;
                continue;
            }
        }

        // dateCalc.setTime(dateObj.getTime());
        if( date == 0 ){
            // <예>
            // 2019-07-00
            // 2019-02-14
            // 0은 오늘을 뜻하고 나머지 날짜로 인해 미래가 되더라도
            // 일은 여러일 내려서 오늘까지 내려올 수 있다.
            // 년도/월 설정이 무시되지 않게
            // 1월 1일(년지정)이거나 X월 1일(월지정)이면 내리지 못하게 함
            var dayMutable = true;
            if(year != 0){
                if(dateObj.getMonth() <= 0 && dateObj.getDate <= 1){
                    dayMutable = false;
                }
            }
            if(month != 0){
                if(dateObj.getDate() <= 1){
                    dayMutable = false;
                }
            }

            if(dayMutable){
                dayChanged++;
                dateObj.setDate(dateObj.getDate() - 1);
                continue;
            }else{
                // 더 이상 일을 내릴 수 없다.: 포기, 반복을 빠져나간다.
                dateChangeGaveUp = true;
                break;
            }
        }else{
            // 일을 내려야할 만큼 년도 빼고 월도 빼서 내려왔지만
            // 일이 고정되어 있다: 포기, 반복을 빠져나간다
            dateChangeGaveUp = true;
            break;
        }
    }

    if(dateChangeGaveUp){
        alertAndLog("searchDateLen: [utils] gave up pulling dates");
    }

    alertAndLog("searchDateLen: [utils] changed dates to "+dateObj.getFullYear()+"-"+getTwoDigitNumber(dateObj.getMonth())+"-"+getTwoDigitNumber(dateObj.getDate())+" to fit. "+yearChanged+" year(s) "+monthChanged+" month(s) "+dayChanged+" day(s) changed.");

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


// 날짜에서 시간을 12:00:00.000으로 고정
function fixDateTimeResidue(dateObj){

    dateObj.setMilliseconds(0);
    dateObj.setSeconds(0);
    dateObj.setMinutes(0);
    dateObj.setHours(12);

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