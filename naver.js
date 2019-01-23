//
//
//  네이버 PC 페이지용 검색 기간 inject 스크립트
//
//


function getDateStringNaver(year,month,date){
    return year + '.' + getTwoDigitNumber(month) + '.' + getTwoDigitNumber(date);
}

function injectDates(){

    var wrapper = document.createElement('div');

    for(var entry = 0; entry < datesData.length; entry++){
        var dateEntry = datesData[entry];
        
        var fromDate = '';
        var toDate = '';

        switch(dateEntry[DLE_JSON_COL_TYPE]){
            case DLE_TYPE_REL_FROM: // 'rel_from': // 며칠전 부터 
                {
                    var dateFromTarget = setDateFromNow(dateEntry[DLE_JSON_COL_FROM_YEAR], dateEntry[DLE_JSON_COL_FROM_MONTH], dateEntry[DLE_JSON_COL_FROM_DATE]);
                    fromDate = getDateStringNaver(dateFromTarget.getFullYear(), (dateFromTarget.getMonth() + 1), dateFromTarget.getDate());
                }
                break;

            case DLE_TYPE_REL_TO: // 'rel_to': // 며칠전 까지
                {
                    var dateToTarget = setDateFromNow(dateEntry[DLE_JSON_COL_TO_YEAR], dateEntry[DLE_JSON_COL_TO_MONTH], dateEntry[DLE_JSON_COL_TO_DATE]);
                    toDate = getDateStringNaver(dateToTarget.getFullYear(), (dateToTarget.getMonth() + 1), dateToTarget.getDate());
                }
                break;
            case DLE_TYPE_REL_RANGE: // 'rel_range': // 정해진 기간 (상대적)
                {
                    var dateRgFrmTarget = setDateFromNow(dateEntry[DLE_JSON_COL_FROM_YEAR], dateEntry[DLE_JSON_COL_FROM_MONTH], dateEntry[DLE_JSON_COL_FROM_DATE]);
                    fromDate = getDateStringNaver(dateRgFrmTarget.getFullYear(), (dateRgFrmTarget.getMonth() + 1), dateRgFrmTarget.getDate());
                    var dateRgToTarget = setDateFromNow(dateEntry[DLE_JSON_COL_TO_YEAR], dateEntry[DLE_JSON_COL_TO_MONTH], dateEntry[DLE_JSON_COL_TO_DATE]);
                    toDate = getDateStringNaver(dateRgToTarget.getFullYear(), (dateRgToTarget.getMonth() + 1), dateRgToTarget.getDate());
                }
                break;

            case DLE_TYPE_ABS_FROM: // 'abs_from': // 특정일 부터
                fromDate = getDateStringNaver(dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);
                break;

            case DLE_TYPE_ABS_TO: // 'abs_to': // 특정일 까지
                toDate = getDateStringNaver(dateEntry[DLE_JSON_COL_TO_YEAR],dateEntry[DLE_JSON_COL_TO_MONTH],dateEntry[DLE_JSON_COL_TO_DATE]);
                break;
                
            case DLE_TYPE_ABS_RANGE: // 'abs_range': // 정해진 기간 (절대적)
                fromDate = getDateStringNaver(dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);
                toDate = getDateStringNaver(dateEntry[DLE_JSON_COL_TO_YEAR],dateEntry[DLE_JSON_COL_TO_MONTH],dateEntry[DLE_JSON_COL_TO_DATE]);
                break;
        }

        // 큰따옴표를 안에다 넣어두면 DOM 삽입시 &quot;으로 자체 이스케이프된다.
        var contentString = [
            "var from = document.getElementById('_nx_date_from');",
            "var to = document.getElementById('_nx_date_to');",
            "from.value = '"+fromDate+"';",
            "to.value = '"+toDate+"';",
            //"nx_searchOptionSelect('p', 'direct');",
            //"return false;",

            //https://stackoverflow.com/a/13333988
            // Content Script에 접근하는 방법 backtick 으로 3-depth 따옴표 달성
            "location.href = 'javascript:nx_searchOptionSelect(`p`, `direct`); void 0';"
        ].join(' ');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', '#');
        aTag.setAttribute('onclick', contentString);
        aTag.innerHTML = dateEntry[DLE_JSON_COL_NAME];
        var liTag = document.createElement('li');
        liTag.appendChild(aTag);
        wrapper.appendChild(liTag);
    }

    if (wrapper.hasChildNodes) {
        //var sendHtml = escapeHtml(wrapper.innerHTML);
        var unescaped = (wrapper.innerHTML);
        document.querySelector('#_nx_option_date .lst_choice').insertAdjacentHTML('beforeend', unescaped);

        // DOM 객체를 result로 받아오진 못하는 것 같다. HTML로 넘깁니다.
        // 자바스크립트 코드를 전달해야하므로 따옴표를 코드 속 문자열로 넣으려면
        // 이스케이프 처리된 슬래시와 따옴표가 필요하다 
        //chrome.tabs.executeScript({
        //    code: [
        //        "var unescaped = '"+sendHtml+"'",
        //        ".replace(/&amp;/g, '&')",
        //        ".replace(/&lt;/g, '<')",
        //        ".replace(/&gt;/g, '>')",
        //        ".replace(/&quot;/g, '"+'\\"'+"')",
        //        ".replace(/&#039;/g, '\\'');",
        //        "document.querySelector('#_nx_option_date .lst_choice').insertAdjacentHTML('beforeend', unescaped);"
        //    ].join('')
        //}, function (result) {
        //
        //});
    }

}


