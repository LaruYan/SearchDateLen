//
//
//  다음 모바일 페이지용 검색 기간 inject 스크립트
//
//

/**
 * 날짜 목록을 기간 설정에 집어넣습니다.
 * 
 * *공통 메소드*
 */
function injectDates(){

    var wrapper = document.createElement('div');
        
    // 다음 모바일 페이지는 span.txt_date 를 수정해도
    // 지정된 날짜가 submit시 적용되지 않음.
    // UI 요소를 하나하나 클릭해야 합니다.
    // form 구성요소에서 제출될 sd 와 ed 또한 찾을 수 없음

    // POST  request body 예시
    //w: tot
    //q: 검색어
    //DA: STC
    //period: u
    //sd: 20190205000000 <= 수정되야하는 값
    //ed: 20190307235959 <=  //
    //C.VO2.meta.filters (이건 아님)

    // 오늘 날짜
    const today = fixDateTimeResidue(new Date());

    //다음 모바일은 1990년 1월 1일부터 선택 가능
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
                //다음 모바일은 1990년 1월 1일부터 선택 가능
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
                // 다음 모바일은 1990년 1월 1일부터 선택 가능
                toYear = minDate.getFullYear();
                toMonth = minDate.getMonth() + 1;
                toDay = minDate.getDate();
            }else if(dateToTarget < today) {
                toYear = dateToTarget.getFullYear();
                toMonth = dateToTarget.getMonth() + 1;
                toDay = dateToTarget.getDate();
            }else{
                // 다음 모바일에서는 오늘 날짜 이후를 고를 수 없을 것
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
            "var datesFilter = document.querySelector('.d_filter');",
            "var datesList = datesFilter.querySelector('.date_selected');",

            // UI상 일자 선택 부분
            "var selectYears;",
            "var selectMonths;",
            "var selectDays;",

            // 시작일 설정
            // 시작일 버튼을 한 번만 클릭하면 날짜가 한 번에 적용되지 않는다
            // 클릭 후 다시 querySelectorAll 을 돌려야 년월일이 적용된다.
            "var clickableFromDate = datesList.querySelector('.btn_sd');",
            "clickableFromDate.click();",
            "clickableFromDate.click();",
            //"console.log('year');",
            "selectYears = datesFilter.querySelectorAll('.date_opt ul[data-type=years] li');",
            "for(var yearRow = 0; yearRow < selectYears.length; yearRow++){",
            //"    console.log(selectYears[yearRow].getAttribute('data-value') +' trying');",
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
            "var clickableToDate = datesList.querySelector('.btn_ed');",
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
            "datesFilter.querySelector('.date_opt .btn_apply').click();"
        ].join(' ');
        var aTag = document.createElement('a');
        aTag.classList.add('tit_opt');
        aTag.setAttribute('href', '#');
        aTag.setAttribute('onclick', contentString);
        aTag.innerHTML = dateEntry[DLE_JSON_COL_NAME];
        var liTag = document.createElement('li');
        liTag.appendChild(aTag);
        wrapper.appendChild(liTag);
    }

    if (wrapper.hasChildNodes) {
        var unescaped = (wrapper.innerHTML);
        document.querySelector('.d_filter .menu_opt').insertAdjacentHTML('beforeend', unescaped);
    }

}


