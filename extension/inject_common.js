//
//
//  공통 검색 기간 inject 스크립트
//
//


//크롬 스토리지에 저장된 JSON값을 가져온다. 
loadStorage(function () {
    getVersionNo();
    initData();
    injectDates();
});