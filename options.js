//
//
//  options.html 에서 사용할 설정 관련 스크립트
//
//


// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {
    alertAndLog('searchDateLen: [options] DOMContentLoaded');
    
    loadStorage();
});


/**
 * 스토리지에 저장된 값을 읽어와 options.html 초기화
 */
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


/**
 * dates 목록을 꾸린다.
 */
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


/**
 * 입력/수정 란을 준비한다.
 * @param {*} entryNo 항목 번호. 있는 항목이라면 수정 상태로 값을 읽어온다
 */
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
        dateEntry[DLE_JSON_COL_NAME] = 'new entry';
        dateEntry[DLE_JSON_COL_TYPE] = DLE_TYPE_REL_FROM;
        dateEntry[DLE_JSON_COL_FROM_YEAR] = 0;
        dateEntry[DLE_JSON_COL_FROM_MONTH] = 0;
        dateEntry[DLE_JSON_COL_FROM_DATE] = 0;
        dateEntry[DLE_JSON_COL_TO_YEAR] = 0;
        dateEntry[DLE_JSON_COL_TO_MONTH] = 0;
        dateEntry[DLE_JSON_COL_TO_DATE] = 0;

        // 버튼 텍스트 설정
        submitBtnTxt = '추가';
    }

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
    selectInputType.addEventListener('change', function () {
        //항목 변경시 표시 설정
    });

    // 상대적 기간 컨테이너 div
    var divInputDateRel = getClassedTag('div');
    divInputDateRel.setAttribute('id', 'input_date_relative');

    // 시작기간 컨테이너 div
    var divInputRelFrom = getClassedTag('div','clearfix');
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
        getInputNumberTag('input_rel_from_date',99,dateEntry[DLE_JSON_COL_FROM_DATE]),'일 전부터'));
    // 시작기간 clear div
    divInputRelFrom.appendChild(getClassedTag('div','clear'));
    // 시작기간을 상대기간 DOM에 추가
    divInputDateRel.appendChild(divInputRelFrom);

    // 종료기간 컨테이너 div
    var divInputRelTo = getClassedTag('div','clearfix');
    divInputRelTo.setAttribute('id','input_date_to');
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
        getInputNumberTag('input_rel_to_date',99,dateEntry[DLE_JSON_COL_TO_DATE]),'일 전까지'));
    // 종료기간 clear div
    divInputRelTo.appendChild(getClassedTag('div','clear'));    
    // 종료기간을 상대기간 DOM에 추가
    divInputDateRel.appendChild(divInputRelTo);

    // 상대적 기간 설명
    var divInputRelLabel = getClassedTag('div', 'label_input','입력 범위: 년(99~0), 개월(999~0), 일(9999~0). 미래 설정 불가');
    divInputDateRel.appendChild(divInputRelLabel);



    // 절대적 기간 컨테이너 div
    var divInputDateAbs = getClassedTag('div');
    divInputDateAbs.setAttribute('id', 'input_date_absolute');

    // 시작날짜 컨테이너 div
    var divInputAbsFrom = getClassedTag('div','clearfix');
    divInputAbsFrom.setAttribute('id','input_date_from');
    // 시작날짜 레이블 div
    divInputAbsFrom.appendChild(getClassedTag('div','label_input','시작일자'));
    // 시작년도 div+input
    divInputAbsFrom.appendChild(getClassedTag('div','label_year',
        getInputNumberTag('input_abs_from_year',9999,dateEntry[DLE_JSON_COL_FROM_YEAR]),'년'));
    // 시작월 div+input
    divInputAbsFrom.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_abs_from_month',12,dateEntry[DLE_JSON_COL_FROM_MONTH]),'월'));
    // 시작일 div+input
    divInputAbsFrom.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_abs_from_date',31,dateEntry[DLE_JSON_COL_FROM_DATE]),'일부터'));
    // 시작일자 clear div
    divInputAbsFrom.appendChild(getClassedTag('div','clear'));
    // 시작일자을 절대기간 DOM에 추가
    divInputDateAbs.appendChild(divInputAbsFrom);


    // 종료일자 컨테이너 div
    var divInputAbsTo = getClassedTag('div','clearfix');
    divInputAbsTo.setAttribute('id','input_date_to');
    // 종료일자 레이블 div
    divInputAbsTo.appendChild(getClassedTag('div','label_input','종료일자'));
    // 종료개년 div+input
    divInputAbsTo.appendChild(getClassedTag('div','label_year',
        getInputNumberTag('input_abs_to_year',9999,dateEntry[DLE_JSON_COL_TO_YEAR]),'년'));
    // 종료개월 div+input
    divInputAbsTo.appendChild(getClassedTag('div','label_month',
        getInputNumberTag('input_abs_to_month',12,dateEntry[DLE_JSON_COL_TO_MONTH]),'월'));
    // 종료개일 div+input
    divInputAbsTo.appendChild(getClassedTag('div','label_date',
        getInputNumberTag('input_abs_to_date',31,dateEntry[DLE_JSON_COL_TO_DATE]),'일까지'));
    // 종료기간 clear div
    divInputAbsTo.appendChild(getClassedTag('div','clear'));    
    // 종료기간을 상대기간 DOM에 추가
    divInputDateAbs.appendChild(divInputAbsTo);


    // 절대적 기간 설명
    var divInputAbsLabel = getClassedTag('div', 'label_input','날짜에 0이 입력되어 있으면 계산시 오늘을 기준으로 0 대신 채웁니다.');
    divInputDateAbs.appendChild(divInputAbsLabel);

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
    inputEntry.appendChild(divInputName);
    inputEntry.appendChild(inputName);
    inputEntry.appendChild(divInputType);
    inputEntry.appendChild(selectInputType);
    inputEntry.appendChild(divInputDateRel);
    inputEntry.appendChild(divInputDateAbs);
    inputEntry.appendChild(btnInputSubmit);   

    alertAndLog('searchDateLen: [options] finished preparing input area.');
}


/**
 * 입력/수정 값을 란에서 읽고 스토리지에 저장한다
 * @param {*} entryNo 항목 번호. -1은 신규 아이템으로 삽입
 */
function submitDateEntry(entryNo = -1){
    alertAndLog('searchDateLen: [options] submitting dateEntry into storage.');

    // inputEntry div
    var inputEntry = document.querySelector('#inputEntry');
    
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
    dateEntry[DLE_JSON_COL_NAME] = inputName.value;
    dateEntry[DLE_JSON_COL_TYPE] = selectInputType.value;

    switch(dateEntry[DLE_JSON_COL_TYPE]){
        case DLE_TYPE_REL_FROM:
        case DLE_TYPE_REL_TO:
        case DLE_TYPE_REL_RANGE:
            dateEntry[DLE_JSON_COL_FROM_YEAR] = inputRelFromYear.value;
            dateEntry[DLE_JSON_COL_FROM_MONTH] = inputRelFromMonth.value;
            dateEntry[DLE_JSON_COL_FROM_DATE] = inputRelFromDate.value;
            dateEntry[DLE_JSON_COL_TO_YEAR] = inputRelToYear.value;
            dateEntry[DLE_JSON_COL_TO_MONTH] = inputRelToMonth.value;
            dateEntry[DLE_JSON_COL_TO_DATE] = inputRelToDate.value;
            break;
        case DLE_TYPE_ABS_FROM:
        case DLE_TYPE_ABS_TO:
        case DLE_TYPE_ABS_RANGE:
            dateEntry[DLE_JSON_COL_FROM_YEAR] = 2018;
            dateEntry[DLE_JSON_COL_FROM_MONTH] = 1;
            dateEntry[DLE_JSON_COL_FROM_DATE] = 14;
            dateEntry[DLE_JSON_COL_TO_YEAR] = 2018;
            dateEntry[DLE_JSON_COL_TO_MONTH] = 1;
            dateEntry[DLE_JSON_COL_TO_DATE] = 20;
            break;
    }
    
    // 신규 항목은 맨 아래쪽에 넣는다.
    if(entryNo < 0){
        entryNo = datesData.length;
    }

    // 데이터에 반영
    datesData[entryNo] = dateEntry;
    
    saveAndReload();
}


/**
 * 해당 index의 항목을 datesData에서 삭제
 * @param {*} index 항목 번호
 */
function removeDateEntry(index){    
    // index자리 1칸을 기존 배열에서 따로 뽑아내고 빈 공간은 합쳐 갯수 1 감소.
    datesData.splice(index, 1);
}


/**
 * 해당 index에 item 항목을 datesData에 삽입
 * @param {*} index 항목 번호
 * @param {*} item 각 개별 dateEntry
 */
function insertDateEntry(index, item){
    // 아무 칸도 뽑아내지 않고 index 자리에 끼워 넣는다. 갯수 1 증가
    datesData.splice(index, 0, item);
}


/**
 * 스토리지에 저장하고 페이지를 새로고침합니다.
 */
function saveAndReload(){
    prepareStorage();
    saveStorage();

    // 새로고침
    loadStorage();
}