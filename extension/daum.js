//
//
//  다음 PC 페이지용 검색 기간 inject 스크립트
//
//

/**
 * Daum 날짜 형식에 맞게 yyyy.mm.dd 꼴의 문자열을 반환
 * @param {*} year 년도
 * @param {*} month 월
 * @param {*} date 일
 */
function getDateStringDaum(year,month,date){
    return year + '.' + getTwoDigitNumber(month) + '.' + getTwoDigitNumber(date);
}

/**
 * 날짜 목록을 기간 설정에 집어넣습니다.
 * 
 * *공통 메소드*
 */
function injectDates(){

    var wrapper = document.createElement('div');

    // 다음은 빈 칸을 제시하면 오늘 날짜로 치환하고 입력한 날짜가 한개 뿐이면 종료일자로 생각합니다.
    // 이 때 시작일자가 오늘이 되는 문제를 방지하기 위해 오늘을 빈 칸에 채워넣어야 합니다.
    const today = new Date();

    for(var entry = 0; entry < datesData.length; entry++){
        var dateEntry = datesData[entry];

        

        var fromDate = '';
        var toDate = '';

        var desiredDates = getDesiredDates(dateEntry);
        
        if(desiredDates[DLE_JSON_COL_FROM_DATEOBJ]){
            var dateFromTarget = desiredDates[DLE_JSON_COL_FROM_DATEOBJ];
            fromDate = getDateStringDaum(dateFromTarget.getFullYear(), (dateFromTarget.getMonth() + 1), dateFromTarget.getDate());
        }else{
            fromDate = getDateStringDaum(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }
        if(desiredDates[DLE_JSON_COL_TO_DATEOBJ]){
            var dateToTarget = desiredDates[DLE_JSON_COL_TO_DATEOBJ];

            // 네이버는 미래를 지정하니 뱉어내기 시작했다.
            // 다음도 그럴 수 있으니 대비책을
            if(dateToTarget < today) {
                toDate = getDateStringDaum(dateToTarget.getFullYear(), (dateToTarget.getMonth() + 1), dateToTarget.getDate());
            }else{
                toDate = getDateStringDaum(today.getFullYear(), (today.getMonth() + 1), today.getDate());
            }
        }else{
            toDate = getDateStringDaum(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }

        // 큰따옴표를 안에다 넣어두면 DOM 삽입시 &quot;으로 자체 이스케이프된다.
        var contentString = [
            "var datesList = document.querySelector('.box_date');",
            "var inputDates = datesList.querySelectorAll('.item_date');",
            "var from = inputDates[0].querySelector('input');",
            "var to = inputDates[1].querySelector('input');",
            "from.value = '"+fromDate+"';",
            "to.value = '"+toDate+"';",
            "datesList.querySelector('.btn_confirm').click();"
        ].join(' ');
        var aTag = document.createElement('a');
        aTag.classList.add('tit_item');
        aTag.setAttribute('href', '#');
        aTag.setAttribute('onclick', contentString);
        aTag.innerHTML = dateEntry[DLE_JSON_COL_NAME];
        var liTag = document.createElement('li');
        liTag.appendChild(aTag);
        wrapper.appendChild(liTag);
    }

    if (wrapper.hasChildNodes) {
        var unescaped = (wrapper.innerHTML);
        document.querySelector('.layer_opt[data-so-wrapper="period"] .list_opt').insertAdjacentHTML('beforeend', unescaped);
    }

}


