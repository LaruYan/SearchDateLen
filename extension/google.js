//
//
//  다음 PC 페이지용 검색 기간 inject 스크립트
//
//

/**
 * Google 날짜 형식에 맞게 mm/dd/yyyy 꼴의 문자열을 반환
 * @param {*} year 년도
 * @param {*} month 월
 * @param {*} date 일
 */
function getDateStringGoogle(year,month,date){
    return month + '/' + date + '/' + year;
}

/**
 * 날짜 목록을 기간 설정에 집어넣습니다.
 * 
 * *공통 메소드*
 */
function injectDates(){

    var wrapper = document.createElement('div');

    // 구글은 빈 칸을 제시하면 오늘 날짜로 치환합니다. 빈 칸 그대로여도 됩니다.
    // UI 상으로는 미래 선택을 금지하고 있기 때문에 미래는 오늘로 치환해줍니다.
    const today = fixDateTimeResidue(new Date());

    for(var entry = 0; entry < datesData.length; entry++){
        var dateEntry = datesData[entry];

        // 구글은 빈 날짜를 '오늘'로 인식합니다. today 계산할 필요가 없음
        var fromDate = '';
        var toDate = '';

        var desiredDates = getDesiredDates(dateEntry);
        
        if(desiredDates[DLE_JSON_COL_FROM_DATEOBJ]){
            var dateFromTarget = desiredDates[DLE_JSON_COL_FROM_DATEOBJ];
            fromDate = getDateStringGoogle(dateFromTarget.getFullYear(), (dateFromTarget.getMonth() + 1), dateFromTarget.getDate());
        }else{
            fromDate = getDateStringGoogle(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }
        if(desiredDates[DLE_JSON_COL_TO_DATEOBJ]){
            var dateToTarget = desiredDates[DLE_JSON_COL_TO_DATEOBJ];

            // 네이버는 미래를 지정하니 뱉어내기 시작했다.
            // 다음도 그럴 수 있으니 대비책을
            if(dateToTarget < today){
                toDate = getDateStringGoogle(dateToTarget.getFullYear(), (dateToTarget.getMonth() + 1), dateToTarget.getDate());
            }else{
                toDate = getDateStringGoogle(today.getFullYear(), (today.getMonth() + 1), today.getDate());
            }
        }else{
            toDate = getDateStringGoogle(today.getFullYear(), (today.getMonth() + 1), today.getDate());
        }

        // 큰따옴표를 안에다 넣어두면 DOM 삽입시 &quot;으로 자체 이스케이프된다.
        var contentString = [
            "var inputDates = document.querySelector('.cdr_frm');",
            "var wholeInput = inputDates.querySelector('.ctbs');",
            "wholeInput.value = 'cdr:1,cd_min:"+fromDate+",cd_max:"+toDate+"';",
            "document.querySelector('.cdr_go').click();"
        ].join(' ');
        var aTag = document.createElement('a');
        aTag.classList.add('q');
        aTag.classList.add('qs');
        aTag.setAttribute('href', '#');
        aTag.setAttribute('onclick', contentString);
        aTag.innerHTML = dateEntry[DLE_JSON_COL_NAME];
        var liTag = document.createElement('li');
        liTag.classList.add('hdtbItm');
        liTag.appendChild(aTag);
        wrapper.appendChild(liTag);
    }

    if (wrapper.hasChildNodes) {
        var unescaped = (wrapper.innerHTML);

        // 구글은 각 검색 옵션을 hdtb-mn-c/o 로 통일시켜 클래스만으로는 선택할 수 없다
        // 소속된 객체의 id를 넣고 이것의 상위 객체를 얻자.
        var dateOptions = document.querySelector('#qdr_').parentNode;
        dateOptions.insertAdjacentHTML('beforeend', unescaped);        
    }

}


