//
//
//  네이버 PC 페이지용 검색 기간 inject 스크립트
//
//

/**
 * NAVER 날짜 형식에 맞게 yyyy.mm.dd 꼴의 문자열을 반환
 * @param {*} year 년도
 * @param {*} month 월
 * @param {*} date 일
 */
function getDateStringNaver(year,month,date){
    return year + '.' + getTwoDigitNumber(month) + '.' + getTwoDigitNumber(date);
}

/**
 * 날짜 목록을 기간 설정에 집어넣습니다.
 * 
 * *공통 메소드*
 */
function injectDates(){

    var wrapper = document.createElement('div');

    // 네이버는 값을 입력하지 않으면 진행되지 않습니다. 따라서 빈 칸을 오늘로 채워야 합니다.

    // 오늘 날짜
    const today = fixDateTimeResidue(new Date());

    for(var entry = 0; entry < datesData.length; entry++){
        var dateEntry = datesData[entry];
        
        var fromDate = '';
        var toDate = '';

        var desiredDates = getDesiredDates(dateEntry);
        
        if(desiredDates[DLE_JSON_COL_FROM_DATEOBJ]){
            var dateFromTarget = desiredDates[DLE_JSON_COL_FROM_DATEOBJ];
            fromDate = getDateStringNaver(dateFromTarget.getFullYear(), (dateFromTarget.getMonth() + 1), dateFromTarget.getDate());
        }else{
            fromDate = getDateStringNaver(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }
        if(desiredDates[DLE_JSON_COL_TO_DATEOBJ]){
            var dateToTarget = desiredDates[DLE_JSON_COL_TO_DATEOBJ];
            
            // 네이버는 미래를 지정하니 뱉어내기 시작했다.
            if(dateToTarget < today) {
                toDate = getDateStringNaver(dateToTarget.getFullYear(), (dateToTarget.getMonth() + 1), dateToTarget.getDate());
            }else{
                toDate = getDateStringNaver(today.getFullYear(), (today.getMonth() + 1), today.getDate());
            }
        }else{
            toDate = getDateStringNaver(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }

        // 큰따옴표를 안에다 넣어두면 DOM 삽입시 &quot;으로 자체 이스케이프된다.
        var contentString = [
            "var inputDates = document.querySelector('#_nx_option_date');",
            "var from = inputDates.querySelector('._input_box_start input');",
            "var to = inputDates.querySelector('._input_box_end input');",
            "from.value = '"+fromDate+"';",
            "to.value = '"+toDate+"';",
            //"nx_searchOptionSelect('p', 'direct');",
            //"return false;",

            //https://stackoverflow.com/a/13333988
            // Content Script에 접근하는 방법 backtick 으로 3-depth 따옴표 달성
            //"location.href = 'javascript:nx_searchOptionSelect(`p`, `direct`); void 0';"
            "inputDates.querySelector('._btn_submit').click();"
        ].join(' ');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', '#');
        aTag.classList.add('txt');
        aTag.setAttribute('onclick', contentString);
        aTag.innerHTML = dateEntry[DLE_JSON_COL_NAME];
        wrapper.appendChild(aTag);
    }

    if (wrapper.hasChildNodes) {
        //var sendHtml = escapeHtml(wrapper.innerHTML);
        var unescaped = (wrapper.innerHTML);
        document.querySelector('.term .bx_inner div.option').insertAdjacentHTML('beforeend', unescaped);
    }

}


