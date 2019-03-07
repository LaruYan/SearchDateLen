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
 * 초기 값을 설정합니다.
 * @param {function} callback
 */
function initializeSearchDateLen(callback = null){
    datesJsonStr = '[{"name":"3M","type":"rel_from","from_year":"0","from_month":"3","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"6M","type":"rel_from","from_year":"0","from_month":"6","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"9M","type":"rel_from","from_year":"0","from_month":"9","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"1Y6M","type":"rel_from","from_year":"1","from_month":"6","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"2Y","type":"rel_from","from_year":"2","from_month":"0","from_date":"0","to_year":"0","to_month":"0","to_date":"0"},{"name":"H1","type":"abs_range","from_year":"0","from_month":"1","from_date":"1","to_year":"0","to_month":"6","to_date":"30"},{"name":"H2","type":"abs_range","from_year":"0","from_month":"7","from_date":"1","to_year":"0","to_month":"12","to_date":"31"},{"name":"1Q","type":"abs_range","from_year":"0","from_month":"1","from_date":"1","to_year":"0","to_month":"3","to_date":"31"},{"name":"2Q","type":"abs_range","from_year":"0","from_month":"4","from_date":"1","to_year":"0","to_month":"6","to_date":"30"},{"name":"3Q","type":"abs_range","from_year":"0","from_month":"7","from_date":"1","to_year":"0","to_month":"9","to_date":"30"},{"name":"4Q","type":"abs_range","from_year":"0","from_month":"10","from_date":"1","to_year":"0","to_month":"12","to_date":"31"}]';
    saveStorage(callback);
}

/**
 * 스토리지로부터 불러온 값을 확인하고 없으면 기본 값으로 초기화
 */
function checkDataAndForceDefault(){
    if(!datesJsonStr || datesJsonStr == undefined || datesJsonStr == null)
    {
        alertAndLog('searchDateLen: [storage] Json not found. force default');
        initializeSearchDateLen();
    }
}

/**
 * datesJsonStr에서 JSON 을 준비합니다.
 */
function prepareStorage(){
    datesJsonStr = JSON.stringify(datesData);
}

/**
 * 크롬 스토리지에 JSON값을 저장한다. 콜백 실행 가능
 * @param {function} callback 
 */
function saveStorage(callback){
    alertAndLog('searchDateLen: [storage] saveStorage()');
    alertAndLog(datesJsonStr);

    //크롬 스토리지에 JSON값을 저장한다.
    chrome.storage.sync.set({
        dates: datesJsonStr,
        debug_mode: isDebug
    }, function() {
        if(callback){
            alertAndLog('searchDateLen: [storage] calling callback after saveStorage()');
            callback.call();
        }
    });
}

/**
 * 스토리지에 저장된 값을 읽어와 콜백 실행
 * @param {function} callback 
 */
function loadStorage(callback){
    alertAndLog('searchDateLen: [storage] loadStorage()');
    //크롬 스토리지에 저장된 JSON값을 가져온다. 
    chrome.storage.sync.get(function (data) {
        datesJsonStr = data.dates;
        isDebug = data.debug_mode;
        if(callback){
            alertAndLog('searchDateLen: [storage] calling callback after loadStorage()');
            callback.call();
        }
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
