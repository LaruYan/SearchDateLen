//
//
//  검색 기간 스토리지 스크립트
//
//


// 저장된 데이터 (raw string)
var datesJsonStr = null;

// 저장된 데이터 (obj)
var datesData = null;

/**
 * 스토리지로부터 불러온 값을 확인하고 없으면 기본 값으로 초기화
 */
function checkDataAndForceDefault(){
    if(!datesJsonStr || datesJsonStr == undefined || datesJsonStr == null)
    {
        
        alertAndLog('searchDateLen: [storage] Json not found. force default');
        datesJsonStr = '[{"name":"3M","type":"rel_from","from_year":"0","from_month":"3","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"6M","type":"rel_from","from_year":"0","from_month":"6","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"H1","type":"abs_range","from_year":"0","from_month":"1","from_date":"1","to_year":"0","to_month":"6","to_date":"30"},{"name":"H2","type":"abs_range","from_year":"0","from_month":"7","from_date":"1","to_year":"0","to_month":"12","to_date":"31"},{"name":"1Q","type":"abs_range","from_year":"0","from_month":"1","from_date":"1","to_year":"0","to_month":"3","to_date":"31"},{"name":"2Q","type":"abs_range","from_year":"0","from_month":"4","from_date":"1","to_year":"0","to_month":"6","to_date":"30"},{"name":"3Q","type":"abs_range","from_year":"0","from_month":"7","from_date":"1","to_year":"0","to_month":"9","to_date":"30"},{"name":"4Q","type":"abs_range","from_year":"0","from_month":"10","from_date":"1","to_year":"0","to_month":"12","to_date":"31"}]';
        saveStorage();
    }
}

/**
 * datesJsonStr에서 JSON 을 준비합니다.
 */
function prepareStorage(){
    datesJsonStr = JSON.stringify(datesData);
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
    alertAndLog('searchDateLen: [storage] init');

    checkDataAndForceDefault();

    alertAndLog('searchDateLen: [storage] parsing Json');
    datesData = JSON.parse(datesJsonStr);
}
