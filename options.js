

// 확장기능 내에서 inline javascript가 동작하지 않으므로 직접 이벤트 리스너로 추가해야한다
document.addEventListener('DOMContentLoaded', function () {
    alertAndLog('searchDateLen: [options] DOMContentLoaded');
    
    loadStorage();

    var link = document.getElementById('doThing');
    // onClick's logic below:
    link.addEventListener('click', function () {
        alertAndLog('link clicked');
        
    });
});

function loadStorage(){
    alertAndLog('searchDateLen: [options] loadStorage()');
    //크롬 스토리지에 저장된 JSON값을 가져온다. 
    chrome.storage.sync.get(function (data) {
        datesJsonStr = data.dates;
        initData();
        populateList();
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
            case 'rel_from':
                visibleType = '해당 일수 부터';

                break;
            case 'rel_to':
                visibleType = '해당 일수 까지';

                break;
            case 'abs_from':
                isAbsoluteDate = true;
                visibleType = '특정 날짜 부터';

                break;
            case 'abs_to':
                isAbsoluteDate = true;
                visibleType = '특정 날짜 까지';

                break;
            case 'range':
                isAbsoluteDate = true;
                visibleType = '특정 기간';

                break;
        }

        // 데이터를 그대로 표시
        var divDateNoInternal = getClassedTag('div', 'dateNoInternal', dateListEntry.no);
        var divDateName = getClassedTag('div', 'dateName', dateListEntry.name);
        var divDateType = getClassedTag('div', 'dateType', visibleType);
        var divDateTypeInternal = getClassedTag('div', 'dateTypeInternal', dateListEntry.type);

        // 날짜 wrapper
        var divLabelFromYear = getClassedTag('div', 'label_from_year', 
            getClassedTag('span', 'from_year', dateListEntry.from_year));
        var divLabelFromMonth = getClassedTag('div', 'label_from_month',
            getClassedTag('span', 'from_month', dateListEntry.from_month));
        var divLabelFromDate = getClassedTag('div', 'label_from_date', 
            getClassedTag('span', 'from_date', dateListEntry.from_date));
        var divLabelToYear = getClassedTag('div', 'label_to_year', 
            getClassedTag('span', 'to_year', dateListEntry.to_year));
        var divLabelToMonth = getClassedTag('div', 'label_to_month',
            getClassedTag('span', 'to_month', dateListEntry.to_month));
        var divLabelToDate = getClassedTag('div', 'label_to_date', 
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