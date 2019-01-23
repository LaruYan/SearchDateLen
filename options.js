

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

    // reset datesList;
    datesList.innerHTML = '';

    for(var entryNo = 0; entryNo < datesData.length; entryNo++){
        // 실제 데이터
        var dateEntry = datesData[entryNo];

        // 항목 컨테이너
        var liTag = getClassedTag('li', 'dateEntry clearfix', '');

        // 종류에 따라 표시방식 대음
        var isAbsoluteDate = false;
        var visibleType = '';
        switch(dateEntry[DLE_JSON_COL_TYPE]){
            case DLE_TYPE_REL_FROM: //'rel_from':
                visibleType = LABEL_DLE_TYPES_REL_FROM;

                break;
            case DLE_TYPE_REL_TO: //'rel_to':
                visibleType = LABEL_DLE_TYPES_REL_TO;

                break;
            case DLE_TYPE_REL_RANGE: //'rel_range':
                visibleType = LABEL_DLE_TYPES_REL_RANGE;

                break;
            case DLE_TYPE_ABS_FROM: //'abs_from':
                isAbsoluteDate = true;
                visibleType = LABEL_DLE_TYPES_ABS_FROM;

                break;
            case DLE_TYPE_ABS_TO: //'abs_to':
                isAbsoluteDate = true;
                visibleType = LABEL_DLE_TYPES_ABS_TO;

                break;
            case DLE_TYPE_ABS_RANGE: //'abs_range':
                isAbsoluteDate = true;
                visibleType = LABEL_DLE_TYPES_ABS_RANGE;

                break;
        }

        // 데이터를 그대로 표시
        var divDateNoInternal = getClassedTag('div', 'dateNoInternal', dateEntry.no);
        var divDateName = getClassedTag('div', 'dateName', dateEntry[DLE_JSON_COL_NAME]);
        var divDateType = getClassedTag('div', 'dateType', visibleType);
        var divDateTypeInternal = getClassedTag('div', 'dateTypeInternal', dateEntry[DLE_JSON_COL_TYPE]);

        // 날짜 wrapper
        var divLabelFromYear = getClassedTag('div', 'label_year', 
            getClassedTag('span', 'from_year', dateEntry[DLE_JSON_COL_FROM_YEAR]));
        var divLabelFromMonth = getClassedTag('div', 'label_month',
            getClassedTag('span', 'from_month', dateEntry[DLE_JSON_COL_FROM_MONTH]));
        var divLabelFromDate = getClassedTag('div', 'label_date', 
            getClassedTag('span', 'from_date', dateEntry[DLE_JSON_COL_FROM_DATE]));
        var divLabelToYear = getClassedTag('div', 'label_year', 
            getClassedTag('span', 'to_year', dateEntry[DLE_JSON_COL_TO_YEAR]));
        var divLabelToMonth = getClassedTag('div', 'label_month',
            getClassedTag('span', 'to_month', dateEntry[DLE_JSON_COL_TO_MONTH]));
        var divLabelToDate = getClassedTag('div', 'label_date', 
            getClassedTag('span', 'to_date', dateEntry[DLE_JSON_COL_TO_DATE]));
        
        
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

    var dateEntry = null;
    var submitBtnTxt = '';

    if(datesData && (0 <= entryNo && entryNo < datesData.length)){
        // datesData 가 있고 해당 원소가 범위 안
        dateEntry = datesData[entryNo];
        //버튼 텍스트 설정
        submitBtnTxt = '수정';
    }else{
        // datesData 가 비어있거나 해당 원소가 범위 밖
        // 생성하자
        dateEntry = {}; // new obj
        dateEntry['no'] = entryNo;
        dateEntry['name'] = 'new entry';
        dateEntry['type'] = DLE_TYPE_REL_FROM;
        dateEntry['from_year'] = 0;
        dateEntry['from_month'] = 0;
        dateEntry['from_date'] = 0;
        dateEntry['to_year'] = 0;
        dateEntry['to_month'] = 0;
        dateEntry['to_date'] = 0;

        // 버튼 텍스트 설정
        submitBtnTxt = '추가';
    }

    // input_no input
    var inputNo = getInputTextTag('input_no', true, entryNo);
    // 이름 레이블 div
    var divInputName = getClassedTag('div','label_input','이름');
    // input_name input
    var inputName = getInputTextTag('input_name', false, dateEntry[DLE_JSON_COL_NAME]);
    // 형식 레이블 div
    var divInputType = getClassedTag('div','label_input','형식');

    // input_type select
    var selectInputType = getClassedTag('select');
    selectInputType.setAttribute('name', 'input_type');
    selectInputType.setAttribute('id', 'input_type');
    // options
    for(var typeNo = 0; typeNo < DLE_TYPES.length; typeNo++){
        selectInputType.appendChild(getSelectedOptionTag(LABEL_DLE_TYPES[typeNo], DLE_TYPES[typeNo], dateEntry[DLE_JSON_COL_TYPE]));
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
        getInputNumberTag('input_rel_from_year',99,dateEntry[DLE_JSON_COL_FROM_YEAR]),'년'));
    // 시작개월 div+input
    divInputRelFrom.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_rel_from_month',99,dateEntry[DLE_JSON_COL_FROM_MONTH]),'개월'));
    // 시작개일 div+input
    divInputRelFrom.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_rel_from_date',99,dateEntry[DLE_JSON_COL_FROM_DATE]),'일'));
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
        getInputNumberTag('input_rel_to_year',99,dateEntry[DLE_JSON_COL_TO_YEAR]),'년'));
    // 종료개월 div+input
    divInputRelTo.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_rel_to_month',99,dateEntry[DLE_JSON_COL_TO_MONTH]),'개월'));
    // 종료개일 div+input
    divInputRelTo.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_rel_to_date',99,dateEntry[DLE_JSON_COL_TO_DATE]),'일'));
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
        submitDateEntry(entryNo);
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

function submitDateEntry(entryNo = -1){
    alertAndLog('searchDateLen: [options] submitting dateEntry into storage.');

    // inputEntry div
    var inputEntry = document.querySelector('#inputEntry');
    
    // input_no input
    var inputNo = inputEntry.querySelector('#input_no');
    // input_name input
    var inputName = inputEntry.querySelector('#input_name');
    // input_type select
    var selectInputType = inputEntry.querySelector('#input_type');


    // 시작기간
    // 시작개년 div+input
    var inputRelFromYear = inputEntry.querySelector('#input_rel_from_year');
    // 시작개월 div+input
    var inputRelFromMonth = inputEntry.querySelector('#input_rel_from_month');
    // 시작개일 div+input
    var inputRelFromDate = inputEntry.querySelector('#input_rel_from_date');


    // 종료기간
    // 종료개년 div+input
    var inputRelToYear = inputEntry.querySelector('#input_rel_to_year');
    // 종료개월 div+input
    var inputRelToMonth = inputEntry.querySelector('#input_rel_to_month');
    // 종료개일 div+input
    var inputRelToDate = inputEntry.querySelector('#input_rel_to_date');

    // 절대적 기간 컨테이너 div
    // to be continued....


    // 객체에 반영
    dateEntry = {}; // new obj
    dateEntry['no'] = entryNo;
    dateEntry['name'] = inputName.value;
    dateEntry['type'] = selectInputType.value;

    switch(dateEntry[DLE_JSON_COL_TYPE]){
        case DLE_TYPE_REL_FROM:
        case DLE_TYPE_REL_TO:
        case DLE_TYPE_REL_RANGE:
            dateEntry['from_year'] = inputRelFromYear.value;
            dateEntry['from_month'] = inputRelFromMonth.value;
            dateEntry['from_date'] = inputRelFromDate.value;
            dateEntry['to_year'] = inputRelToYear.value;
            dateEntry['to_month'] = inputRelToMonth.value;
            dateEntry['to_date'] = inputRelToDate.value;
            break;
        case DLE_TYPE_ABS_FROM:
        case DLE_TYPE_ABS_TO:
        case DLE_TYPE_ABS_RANGE:
            dateEntry['from_year'] = 2018;
            dateEntry['from_month'] = 1;
            dateEntry['from_date'] = 14;
            dateEntry['to_year'] = 2018;
            dateEntry['to_month'] = 1;
            dateEntry['to_date'] = 20;
            break;
    }
    
    // 신규 항목은 맨 아래쪽에 넣는다.
    if(entryNo < 0){
        entryNo = datesData.length;
    }

    // 데이터에 반영
    datesData[entryNo] = dateEntry;
    prepareStorage();
    saveStorage();

    // 새로고침
    loadStorage();
}