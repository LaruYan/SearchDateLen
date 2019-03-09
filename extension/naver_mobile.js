//
//
//  네이버 모바일 페이지용 검색 기간 inject 스크립트
//
//

/**
 * 날짜 목록을 기간 설정에 집어넣습니다.
 * 
 * *공통 메소드*
 */
function injectDates(){

    var wrapper = document.createElement('div');

    // 네이버 모바일 페이지는 a.spnew_bf.ico_calendar._start_trigger 를 수정해도
    // 지정된 날짜가 submit시 적용되지 않음.
    // UI 요소를 하나하나 클릭해야 합니다.

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

            // 날짜선택: 펼침 UI
            // 열려있는건 not으로 제한해 다시 닫지 않습니다.
            "var calendarTrigger = datesFilter.querySelector('._calendar_csb_trigger:not(.opened)');",
            "if(calendarTrigger){",
            "   calendarTrigger.click();",
            "}",
            "var dateSetUi = datesFilter.querySelector('.set_calendar');",

            // 전체 목록
            "var wholeList = datesFilter.querySelectorAll('._wholeList ._eachList');",

            // UI상 일자 선택 부분
            "var selectYears;",
            "var selectMonths;",
            "var selectDays;",

            // 시작일 설정
            // 매번 querySelectorAll을 돌려야 바뀐 년월에 대한 일을 표시해줄 수 있습니다.
            // 찾았을 때 내부 a 태그를 클릭해야 함
            "var clickableFromDate = dateSetUi.querySelector('._start_trigger');",
            "clickableFromDate.click();",
            "console.log('year');",
            "selectYears = wholeList[0].querySelectorAll('ul li');",
            "for(var yearRow = 0; yearRow < selectYears.length; yearRow++){",            
            "    console.log(selectYears[yearRow].getAttribute('data-value') +' trying');",
            "    if(selectYears[yearRow].getAttribute('data-value') == "+fromYear+"){",
            "        selectYears[yearRow].querySelector('a').click();",
            "        break;",
            "    } ",
            "}",
            "selectMonths = wholeList[1].querySelectorAll('ul li');",
            "for(var monthRow = 0; monthRow < selectMonths.length; monthRow++){",
            "    if(selectMonths[monthRow].getAttribute('data-value') == "+fromMonth+"){",
            "        selectMonths[monthRow].querySelector('a').click();",
            "        break;",
            "    } ",
            "}",
            "selectDays = wholeList[2].querySelectorAll('ul li');",
            "for(var dayRow = 0; dayRow < selectDays.length; dayRow++){",
            "    if(selectDays[dayRow].getAttribute('data-value') == "+fromDay+"){",
            "        selectDays[dayRow].querySelector('a').click();",
            "        break;",
            "    } ",
            "}",

            // 종료일 설정
            // querySelectorAll을 더 돌려야하는건 같음.
            "var clickableToDate = dateSetUi.querySelector('._end_trigger');",
            "clickableToDate.click();",
            "selectYears = wholeList[0].querySelectorAll('ul li');",
            "for(var yearRow = 0; yearRow < selectYears.length; yearRow++){",
            "    if(selectYears[yearRow].getAttribute('data-value') == "+toYear+"){",
            "        selectYears[yearRow].querySelector('a').click();",
            "        break;",
            "    } ",
            "}",
            "selectMonths = wholeList[1].querySelectorAll('ul li');",
            "for(var monthRow = 0; monthRow < selectMonths.length; monthRow++){",
            "    if(selectMonths[monthRow].getAttribute('data-value') == "+toMonth+"){",
            "        selectMonths[monthRow].querySelector('a').click();",
            "        break;",
            "    } ",
            "}",
            "selectDays = wholeList[2].querySelectorAll('ul li');",
            "for(var dayRow = 0; dayRow < selectDays.length; dayRow++){",
            "    if(selectDays[dayRow].getAttribute('data-value') == "+toDay+"){",
            "        selectDays[dayRow].querySelector('a').click();",
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


