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

    //네이버 모바일은 1990년 1월 1일부터 선택 가능
    const minDate = fixDateTimeResidue(new Date("1990-01-01"));

    for(var entry = 0; entry < datesData.length; entry++){
        var dateEntry = datesData[entry];
        
        // 시작일
        var fromYear = '';
        var fromMonth = '';
        var fromDay = '';
        // 종료일
        var toYear = '';
        var toMonth = '';
        var toDay = '';

        var desiredDates = getDesiredDates(dateEntry);
        
        if(desiredDates[DLE_JSON_COL_FROM_DATEOBJ]){
            var dateFromTarget = desiredDates[DLE_JSON_COL_FROM_DATEOBJ];

            if(dateFromTarget < minDate) {
                //네이버 모바일은 1990년 1월 1일부터 선택 가능
                fromYear = minDate.getFullYear();
                fromMonth = minDate.getMonth() + 1;
                fromDay = minDate.getDate();
            }else{
                fromYear = dateFromTarget.getFullYear();
                fromMonth = dateFromTarget.getMonth() + 1;
                fromDay = dateFromTarget.getDate();
            }
        }else{
            fromYear = today.getFullYear();
            fromMonth = today.getMonth() + 1;
            fromDay = today.getDate();
        }
        if(desiredDates[DLE_JSON_COL_TO_DATEOBJ]){
            var dateToTarget = desiredDates[DLE_JSON_COL_TO_DATEOBJ];

            
            if(dateToTarget < minDate) {
                // 네이버 모바일은 1990년 1월 1일부터 선택 가능
                toYear = minDate.getFullYear();
                toMonth = minDate.getMonth() + 1;
                toDay = minDate.getDate();
            }else if(dateToTarget < today) {
                toYear = dateToTarget.getFullYear();
                toMonth = dateToTarget.getMonth() + 1;
                toDay = dateToTarget.getDate();
            }else{
                // 네이버 모바일에서는 오늘 날짜 이후를 고를 수 없을 것
                toYear = today.getFullYear();
                toMonth = today.getMonth() + 1;
                toDay = today.getDate();
            }
        }else{
            toYear = today.getFullYear();
            toMonth = today.getMonth() + 1;
            toDay = today.getDate();
        }

        // 큰따옴표를 안에다 넣어두면 DOM 삽입시 &quot;으로 자체 이스케이프된다.
        var contentString = [
            "var datesFilter = document.querySelector('.lst_option .term');",
            // UI 선택일자
            "var selectYears;",
            "var selectMonths;",
            "var selectDays;",

            // 날짜선택: 펼침 UI
            // 열려있는건 not으로 제한해 다시 닫지 않습니다.
            "datesFilter.querySelector('._calendar_csb_trigger:not(.opened)').click();",
            "var dateSetUi = datesFilter.querySelector('.set_calendar');",
            // 시작일 설정
            "var clickableFromDate = dateSetUi.querySelector('span.set ._start_trigger');",
            "clickableFromDate.click();",
            "selectYears = datesFilter.querySelectorAll('.date_opt ul[data-type=years] li');",
            "for(var yearRow = 0; yearRow < selectYears.length; yearRow++){",
            "    if(selectYears[yearRow].getAttribute('data-value') == "+fromYear+"){",
            "        selectYears[yearRow].click();",
            "        break;",
            "    } ",
            "}",
            "selectMonths = datesFilter.querySelectorAll('.date_opt ul[data-type=months] li');",
            "for(var monthRow = 0; monthRow < selectMonths.length; monthRow++){",
            "    if(selectMonths[monthRow].getAttribute('data-value') == "+fromMonth+"){",
            "        selectMonths[monthRow].click();",
            "        break;",
            "    } ",
            "}",
            "selectDays = datesFilter.querySelectorAll('.date_opt ul[data-type=days] li');",
            "for(var dayRow = 0; dayRow < selectDays.length; dayRow++){",
            "    if(selectDays[dayRow].getAttribute('data-value') == "+fromDay+"){",
            "        selectDays[dayRow].click();",
            "        break;",
            "    } ",
            "}",
            // 종료일 설정. 종료일은 한 번만 클릭해도 된다.
            // 아마도 펼치는 과정이 없어서 그런듯
            // querySelectorAll을 더 돌려야하는건 같음.
            //"datesList.querySelector('.btn_ed').click();"
            "var clickableToDate = dateSetUi.querySelector('.btn_ed');",
            "clickableToDate.click();",
            "selectYears = datesFilter.querySelectorAll('.date_opt ul[data-type=years] li');",
            "for(var yearRow = 0; yearRow < selectYears.length; yearRow++){",
            "    if(selectYears[yearRow].getAttribute('data-value') == "+toYear+"){",
            "        selectYears[yearRow].click();",
            "        break;",
            "    } ",
            "}",
            "selectMonths = datesFilter.querySelectorAll('.date_opt ul[data-type=months] li');",
            "for(var monthRow = 0; monthRow < selectMonths.length; monthRow++){",
            "    if(selectMonths[monthRow].getAttribute('data-value') == "+toMonth+"){",
            "        selectMonths[monthRow].click();",
            "        break;",
            "    } ",
            "}",
            "selectDays = datesFilter.querySelectorAll('.date_opt ul[data-type=days] li');",
            "for(var dayRow = 0; dayRow < selectDays.length; dayRow++){",
            "    if(selectDays[dayRow].getAttribute('data-value') == "+toDay+"){",
            "        selectDays[dayRow].click();",
            "        break;",
            "    } ",
            "}",
            
            // 적용하기
            "datesFilter.querySelector('.btn_area .btn_apply').click();"
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
        var dateOption = document.querySelector('.lst_option .term');
        dateOption.querySelector('.bx_inner div.option').insertAdjacentHTML('beforeend', unescaped);
    }

}


