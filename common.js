//
//
//  공용 사용 스크립트
//
//

// 디버그 플래그
var isDebug = false;

/**
 * 디버그 플래그 true일 때만 다이얼로그를 띄우고
 * 디버그 플래그와 무관하게 콘솔에 로그
 * @param {*} msg 
 */
function alertAndLog(msg){
    if(isDebug){
        alert(msg);
    }
    console.log(msg);
}

// JSON 컬럼 이름
const DLE_JSON_COL_NO = 'no';
const DLE_JSON_COL_NAME = 'name';
const DLE_JSON_COL_TYPE = 'type';
const DLE_JSON_COL_FROM_YEAR = 'from_year';
const DLE_JSON_COL_FROM_MONTH = 'from_month';
const DLE_JSON_COL_FROM_DATE = 'from_date';
const DLE_JSON_COL_FROM_DOW = 'from_dow';
const DLE_JSON_COL_TO_YEAR = 'to_year';
const DLE_JSON_COL_TO_MONTH = 'to_month';
const DLE_JSON_COL_TO_DATE = 'to_date';
const DLE_JSON_COL_TO_DOW = 'to_dow';

// 타입 형식들
const DLE_TYPE_REL_FROM = 'rel_from';
const DLE_TYPE_REL_TO = 'rel_to';
const DLE_TYPE_REL_RANGE = 'rel_range';
const DLE_TYPE_ABS_FROM = 'abs_from';
const DLE_TYPE_ABS_TO = 'abs_to';
const DLE_TYPE_ABS_RANGE = 'abs_range';
const DLE_TYPES = [DLE_TYPE_REL_FROM, DLE_TYPE_REL_TO, DLE_TYPE_REL_RANGE, DLE_TYPE_ABS_FROM, DLE_TYPE_REL_TO, DLE_TYPE_ABS_RANGE];

// 타입 형식들 표시용
const LABEL_DLE_TYPES_REL_FROM = '해당 일수 부터';
const LABEL_DLE_TYPES_REL_TO = '해당 일수 까지';
const LABEL_DLE_TYPES_REL_RANGE = '해당 기간 (상대적)';
const LABEL_DLE_TYPES_ABS_FROM = '특정 날짜 부터';
const LABEL_DLE_TYPES_ABS_TO = '특정 날짜 까지';
const LABEL_DLE_TYPES_ABS_RANGE = '특정 기간 (절대적)';
const LABEL_DLE_TYPES = [LABEL_DLE_TYPES_REL_FROM, LABEL_DLE_TYPES_REL_TO, LABEL_DLE_TYPES_REL_RANGE, LABEL_DLE_TYPES_ABS_FROM, LABEL_DLE_TYPES_ABS_TO, LABEL_DLE_TYPES_ABS_RANGE];

// 요일 -1 지정 안 함
// 0일 1월 2화 3수 4목 5금 6토
const DAY_OF_WEEK_NAN = -1;
const DAY_OF_WEEK_SUN = 0;
const DAY_OF_WEEK_MON = 1;
const DAY_OF_WEEK_TUE = 2;
const DAY_OF_WEEK_WED = 3;
const DAY_OF_WEEK_THU = 4;
const DAY_OF_WEEK_FRI = 5;
const DAY_OF_WEEK_SAT = 6;

//요일 표시용
const LABEL_DAY_OF_WEEK_NAN = '지정 안 함';
const LABEL_DAY_OF_WEEK_SUN = '일요일';
const LABEL_DAY_OF_WEEK_MON = '월요일';
const LABEL_DAY_OF_WEEK_TUE = '화요일';
const LABEL_DAY_OF_WEEK_WED = '수요일';
const LABEL_DAY_OF_WEEK_THU = '목요일';
const LABEL_DAY_OF_WEEK_FRI = '금요일';
const LABEL_DAY_OF_WEEK_SAT = '토요일';