

// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {
    alertAndLog('searchDateLen: [options] DOMContentLoaded');
    
    loadStorage();
});

function loadStorage(){
    alertAndLog('searchDateLen: [options] loadStorage()');
    //크롬 스토리지에 저장된 JSON값을 가져온다. 
    chrome.storage.sync.get(function (data) {
        datesJsonStr = data.dates;
        initData();
        populateList();
        prepareInput();
    });
}

function populateList(){
    alertAndLog('searchDateLen: [options] preparing datesList for '+datesData.length+' item(s).');
    // datesList ul
    var datesList = document.querySelector('.datesList');

    for(var entryNo = 0; entryNo < datesData.length; entryNo++){
        // 실제 데이터
        var dateListEntry = datesData[entryNo];

        // 항목 컨테이너
        var liTag = getClassedTag('li', 'dateEntry clearfix', '');

        // 종류에 따라 표시방식 대음
        var isAbsoluteDate = false;
        var visibleType = '';
        switch(dateListEntry.type){
            case DATELIST_ENTRY_TYPES[0]: //'rel_from':
                visibleType = LABEL_DATELIST_ENTRY_TYPES[0];

                break;
            case DATELIST_ENTRY_TYPES[1]: //'rel_to':
                visibleType = LABEL_DATELIST_ENTRY_TYPES[1];

                break;
            case DATELIST_ENTRY_TYPES[2]: //'rel_range':
                visibleType = LABEL_DATELIST_ENTRY_TYPES[2];

                break;
            case DATELIST_ENTRY_TYPES[3]: //'abs_from':
                isAbsoluteDate = true;
                visibleType = LABEL_DATELIST_ENTRY_TYPES[3];

                break;
            case DATELIST_ENTRY_TYPES[4]: //'abs_to':
                isAbsoluteDate = true;
                visibleType = LABEL_DATELIST_ENTRY_TYPES[4];

                break;
            case DATELIST_ENTRY_TYPES[5]: //'abs_range':
                isAbsoluteDate = true;
                visibleType = LABEL_DATELIST_ENTRY_TYPES[5];

                break;
        }

        // 데이터를 그대로 표시
        var divDateNoInternal = getClassedTag('div', 'dateNoInternal', dateListEntry.no);
        var divDateName = getClassedTag('div', 'dateName', dateListEntry.name);
        var divDateType = getClassedTag('div', 'dateType', visibleType);
        var divDateTypeInternal = getClassedTag('div', 'dateTypeInternal', dateListEntry.type);

        // 날짜 wrapper
        var divLabelFromYear = getClassedTag('div', 'label_year', 
            getClassedTag('span', 'from_year', dateListEntry.from_year));
        var divLabelFromMonth = getClassedTag('div', 'label_month',
            getClassedTag('span', 'from_month', dateListEntry.from_month));
        var divLabelFromDate = getClassedTag('div', 'label_date', 
            getClassedTag('span', 'from_date', dateListEntry.from_date));
        var divLabelToYear = getClassedTag('div', 'label_year', 
            getClassedTag('span', 'to_year', dateListEntry.to_year));
        var divLabelToMonth = getClassedTag('div', 'label_month',
            getClassedTag('span', 'to_month', dateListEntry.to_month));
        var divLabelToDate = getClassedTag('div', 'label_date', 
            getClassedTag('span', 'to_date', dateListEntry.to_date));
        
        
        if( ! isAbsoluteDate){
            // 상대적인 기간 (1년 6개월 전 등)
            divLabelFromYear.innerHTML = divLabelFromYear.innerHTML + '년';
            divLabelFromMonth.innerHTML = divLabelFromMonth.innerHTML + '개월';
            divLabelFromDate.innerHTML = divLabelFromDate.innerHTML + '일';
            divLabelToYear.innerHTML = divLabelToYear.innerHTML + '년';
            divLabelToMonth.innerHTML = divLabelToMonth.innerHTML + '개월';
            divLabelToDate.innerHTML = divLabelToDate.innerHTML + '일';
        }else{
            // 절대적인 기간 (2018년 6월 이전 등)
            divLabelFromYear.innerHTML = divLabelFromYear.innerHTML + '년';
            divLabelFromMonth.innerHTML = divLabelFromMonth.innerHTML + '월';
            divLabelFromDate.innerHTML = divLabelFromDate.innerHTML + '일';
            divLabelToYear.innerHTML = divLabelToYear.innerHTML + '년';
            divLabelToMonth.innerHTML = divLabelToMonth.innerHTML + '월';
            divLabelToDate.innerHTML = divLabelToDate.innerHTML + '일';
        }

        // 항목에 내용 삽입
        liTag.appendChild(divDateNoInternal);
        liTag.appendChild(divDateName);
        liTag.appendChild(divDateType);
        liTag.appendChild(divDateTypeInternal);
        liTag.appendChild(divLabelFromYear);
        liTag.appendChild(divLabelFromMonth);
        liTag.appendChild(divLabelFromDate);
        liTag.appendChild(getClassedTag('div','label_tick','~'));
        liTag.appendChild(divLabelToYear);
        liTag.appendChild(divLabelToMonth);
        liTag.appendChild(divLabelToDate);

        // 목록에 항목 삽입
        datesList.appendChild(liTag);
    }

    alertAndLog('searchDateLen: [options] finished datesList for '+datesData.length+' item(s).');
}

function prepareInput(entryNo = -1){
    alertAndLog('searchDateLen: [options] preparing input area.');

    // inputEntry div
    var inputEntry = document.querySelector('#inputEntry');

    // reset inputEntry;
    inputEntry.innerHTML = '';

    var dateListEntry = null;
    var submitBtnTxt = '';

    if(datesData && (0 <= entryNo && entryNo < datesData.length)){
        // datesData 가 있고 해당 원소가 범위 안
        dateListEntry = datesData[entryNo];
        submitBtnTxt = '수정';
    }else{
        // datesData 가 비어있거나 해당 원소가 범위 밖
        // 임의의 json을 넣어줌
        dateListEntry = JSON.parse(['{',
                '"no": '+entryNo+',',
                '"name": "new entry",',
                '"type": "'+DATELIST_ENTRY_TYPES[0]+'",',
                '"from_year": 0,',
                '"from_month": 0,',
                '"from_date": 0,',
                '"to_year": 0,',
                '"to_month": 0,',
                '"to_date": 0',
            '}'].join(''));
        submitBtnTxt = '추가';
    }

    // input_no input
    var inputNo = getInputTextTag('input_no', true, entryNo);
    // 이름 레이블 div
    var divInputName = getClassedTag('div','label_input','이름');
    // input_name input
    var inputName = getInputTextTag('input_name', false, dateListEntry.name);
    // 형식 레이블 div
    var divInputType = getClassedTag('div','label_input','형식');

    // input_type select
    var selectInputType = getClassedTag('select');
    selectInputType.setAttribute('name', 'input_type');
    selectInputType.setAttribute('id', 'input_type');
    // options
    for(var typeNo = 0; typeNo < DATELIST_ENTRY_TYPES.length; typeNo++){
        selectInputType.appendChild(getSelectedOptionTag(LABEL_DATELIST_ENTRY_TYPES[typeNo], DATELIST_ENTRY_TYPES[typeNo], dateListEntry.type));
    }



    // 상대적 기간 컨테이너 div
    var divInputDateRel = getClassedTag('div');
    divInputDateRel.setAttribute('id', 'input_date_relative');

    // 시작기간 컨테이너 div
    var divInputRelFrom = getClassedTag('div','clearfix',);
    divInputRelFrom.setAttribute('id','input_date_from');
    // 시작기간 레이블 div
    divInputRelFrom.appendChild(getClassedTag('div','label_input','시작기간'));
    // 시작개년 div+input
    divInputRelFrom.appendChild(getClassedTag('div','label_year',
        getInputNumberTag('input_rel_from_year',99,dateListEntry.from_year),'년'));
    // 시작개월 div+input
    divInputRelFrom.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_rel_from_month',99,dateListEntry.from_month),'개월'));
    // 시작개일 div+input
    divInputRelFrom.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_rel_from_date',99,dateListEntry.from_date),'일'));
    // 시작기간 clear div
    divInputRelFrom.appendChild(getClassedTag('div','clear'));
    // 시작기간을 상대기간 DOM에 추가
    divInputDateRel.appendChild(divInputRelFrom);

    // 종료기간 컨테이너 div
    var divInputRelTo = getClassedTag('div','clearfix',);
    divInputRelTo.setAttribute('id','input_date_from');
    // 종료기간 레이블 div
    divInputRelTo.appendChild(getClassedTag('div','label_input','종료기간'));
    // 종료개년 div+input
    divInputRelTo.appendChild(getClassedTag('div','label_year',
        getInputNumberTag('input_rel_to_year',99,dateListEntry.to_year),'년'));
    // 종료개월 div+input
    divInputRelTo.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_rel_to_month',99,dateListEntry.to_month),'개월'));
    // 종료개일 div+input
    divInputRelTo.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_rel_to_date',99,dateListEntry.to_date),'일'));
    // 종료기간 clear div
    divInputRelTo.appendChild(getClassedTag('div','clear'));    
    // 종료기간을 상대기간 DOM에 추가
    divInputDateRel.appendChild(divInputRelTo);

    // 절대적 기간 컨테이너 div
    var divInputDateAbs = getClassedTag('div');
    divInputDateAbs.setAttribute('id', 'input_date_absolute');
    var divDummyInputAbs = getClassedTag('div','','시작일자 calendar 종료일자 calendar');
    divInputDateAbs.appendChild(divDummyInputAbs);

    var btnInputSubmit = document.createElement('button');
    btnInputSubmit.setAttribute('type','button');
    btnInputSubmit.innerHTML = submitBtnTxt;
    // 아래 방법은 content security policy에서 inline javascript를 제한하는 정책을 위배 - 작동 안됨
    //btnInputSubmit.setAttribute('onclick','submitDateEntry();');
    // 대신 addEventListener를 사용하세요
    btnInputSubmit.addEventListener('click', function () {
        submitDateEntry();
    });
    

    // 페이지에 적용
    inputEntry.appendChild(inputNo);
    inputEntry.appendChild(divInputName);
    inputEntry.appendChild(inputName);
    inputEntry.appendChild(divInputType);
    inputEntry.appendChild(selectInputType);
    inputEntry.appendChild(divInputDateRel);
    inputEntry.appendChild(divInputDateAbs);
    inputEntry.appendChild(btnInputSubmit);   

    alertAndLog('searchDateLen: [options] finished preparing input area.');
}

function submitDateEntry(){
    alertAndLog('searchDateLen: [options] submitting dateEntry into storage.');
}