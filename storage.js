//
//
//  검색 기간 스토리지 스크립트
//
//


// 저장된 데이터 (raw string)
var datesJsonStr = null;

// 저장된 데이터 (obj)
var datesData = null;

function checkDataAndForceDefault(){
    if(!datesJsonStr || datesJsonStr == undefined || datesJsonStr == null)
    {
        
        alertAndLog('searchDateLen: Json not found. force default');
        datesJsonStr = [
            '[',
                '{',
                    '"no": 0,',
                    '"name": "from_4d",',
                    '"type": "rel_from",',
                    '"from_year": 0,',
                    '"from_month": 0,',
                    '"from_date": 4,',
                    '"to_year": 0,',
                    '"to_month": 0,',
                    '"to_date": 0',
                '}',
                ',',
                '{',
                    '"no": 1,',
                    '"name": "4d_ago",',
                    '"type": "rel_to",',
                    '"from_year": 0,',
                    '"from_month": 0,',
                    '"from_date": 0,',
                    '"to_year": 0,',
                    '"to_month": 0,',
                    '"to_date": 4',
                '}',
                ',',
                '{',
                    '"no": 2,',
                    '"name": "after 20180114",',
                    '"type": "abs_from",',
                    '"from_year": 2018,',
                    '"from_month": 1,',
                    '"from_date": 14,',
                    '"to_year": 0,',
                    '"to_month": 0,',
                    '"to_date": 0',
                '}',
                ',',
                '{',
                    '"no": 3,',
                    '"name": "before 20180114",',
                    '"type": "abs_to",',
                    '"from_year": 0,',
                    '"from_month": 0,',
                    '"from_date": 0,',
                    '"to_year": 2018,',
                    '"to_month": 1,',
                    '"to_date": 14',
                '}',
                ',',
                '{',
                    '"no": 4,',
                    '"name": "18H1",',
                    '"type": "range",',
                    '"from_year": 2018,',
                    '"from_month": 1,',
                    '"from_date": 1,',
                    '"to_year": 2018,',
                    '"to_month": 6,',
                    '"to_date": 30',
                '}',
            ']'
        ].join('');
        saveStorage();
    }
}

/**
 * 크롬 스토리지에 JSON값을 저장한다. 
 */
function saveStorage(){
    chrome.storage.sync.set({
        dates: datesJsonStr
    });
}


/**
 * 불러온 JSON을 obj로 변환해 로드해둡니다
 */
function initData(){
    alertAndLog('searchDateLen: init');

    checkDataAndForceDefault();

    alertAndLog('searchDateLen: parsing Json');
    datesData = JSON.parse(datesJsonStr);
}
