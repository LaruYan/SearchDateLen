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
const DLE_JSON_COL_NAME = 'name';
const DLE_JSON_COL_TYPE = 'type';
const DLE_JSON_COL_FROM_DATEOBJ = 'from_dateobj';
const DLE_JSON_COL_FROM_YEAR = 'from_year';
const DLE_JSON_COL_FROM_MONTH = 'from_month';
const DLE_JSON_COL_FROM_DATE = 'from_date';
const DLE_JSON_COL_FROM_DOW = 'from_dow';
const DLE_JSON_COL_TO_DATEOBJ = 'to_dateobj';
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

// 상대적 기간 설정시 한계
const LIMIT_YEARS_REL_MINIMUM = 0;
const LIMIT_YEARS_REL_MAXIMUM = +99;
const LIMIT_MONTHS_REL_MINIMUM = 0;
const LIMIT_MONTHS_REL_MAXIMUM = +999;
const LIMIT_DAYS_REL_MINIMUM = 0;
const LIMIT_DAYS_REL_MAXIMUM = +9999;

const LIMIT_YEARS_HBD_MINIMUM = -1 * LIMIT_YEARS_REL_MAXIMUM;
const LIMIT_YEARS_HBD_MAXIMUM = 0;
const LIMIT_YEARS_HBD_MINUS = LIMIT_YEARS_HBD_MINIMUM - 1;
const LIMIT_YEARS_HBD_PLUS = LIMIT_YEARS_HBD_MAXIMUM + 1;

const LIMIT_YEARS_ABS_MINIMUM = LIMIT_YEARS_HBD_PLUS;
const LIMIT_YEARS_ABS_MAXIMUM = +9999;
const LIMIT_MONTHS_ABS_MINIMUM = 0;
const LIMIT_MONTHS_ABS_MAXIMUM = +12;
const LIMIT_DAYS_ABS_MINIMUM = 0;
const LIMIT_DAYS_ABS_MAXIMUM = +31;



// 입력받은 날짜로 현재 날짜를 조정
function setDateFromNow(year, month, date){
    var dateTarget = fixDateTimeResidue(new Date());
    alertAndLog("searchDateLen: [commons] setting "+year+"years "+month+"months "+date+"days from "+
        dateTarget.getFullYear()+"-"+getTwoDigitNumber(dateTarget.getMonth() + 1)+"-"+getTwoDigitNumber(dateTarget.getDate()));
    dateTarget.setFullYear(dateTarget.getFullYear() - year);
    dateTarget.setMonth(dateTarget.getMonth() - month);
    dateTarget.setDate(dateTarget.getDate() - date);
    
    dateTarget = makeDateSupported(dateTarget, year, month, date);
    return dateTarget;
}

// 입력받은 날짜 그대로 현재날짜로. 단, 0인건 현재날짜를 기준으로
function setDateExactTry(year, month, date){
    return setDateHybrid(year, month, date);
    // var dateTarget = fixDateTimeResidue(new Date());
    // alertAndLog("searchDateLen: [utils] trying to set "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date)+" into "+
    //     dateTarget.getFullYear()+"-"+getTwoDigitNumber(dateTarget.getMonth() + 1)+"-"+getTwoDigitNumber(dateTarget.getDate()));
    // if(year > 0) {
    //     dateTarget.setFullYear(year);
    // }
    // if(month > 0) {
    //     dateTarget.setMonth(month-1);
    // }
    // if(date > 0 ){
    //     dateTarget.setDate(date);
    // }
    
    // dateTarget = makeDateSupported(dateTarget, year, month, date);
    // return dateTarget;
}

// 입력받은 날짜 그대로 현재날짜로.
// 단, 오늘로부터 -99 ~ +99년으로 조절할 수 있게 하자
function setDateHybrid(year, month, date){
    var dateTarget = fixDateTimeResidue(new Date());
    alertAndLog("searchDateLen: [commons] trying to set "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date)+" into "+
        dateTarget.getFullYear()+"-"+(dateTarget.getMonth() + 1)+"-"+dateTarget.getDate());
    
    if(year >= LIMIT_YEARS_HBD_PLUS) {
        alertAndLog('searchDateLen: [commons] got year '+LIMIT_YEARS_HBD_PLUS+' <= '+ year +'. trying as-is.');
        dateTarget.setFullYear(year);
    }else if(year > LIMIT_YEARS_HBD_MINUS){
        alertAndLog('searchDateLen: [commons] got year '+LIMIT_YEARS_HBD_MINUS+' < '+ year + '. using this as relative year in hybrid mode.');
        dateTarget.setFullYear(dateTarget.getFullYear() + parseInt(year));
        year = dateTarget.getFullYear();
    }

    if(month > 0) {
        dateTarget.setMonth(month-1);
    }

    if(date > 0) {
        dateTarget.setDate(date);
    }

    dateTarget = makeDateSupported(dateTarget, year, month, date);

    return dateTarget;
}


// 유효한 Date 객체로 변환
function makeDateSupported(dateObj, year, month, date){
    var isOverrideOccured = false;
    if( ! isDateSupported(dateObj, year, month, date) ){
        isOverrideOccured = true;
        
        if(year < LIMIT_YEARS_ABS_MINIMUM){
            // -99 ~ +99는 상대값 매핑을 위해 사용되므로 100부터 있어야 한다.
            dateObj.setFullYear(LIMIT_YEARS_ABS_MINIMUM);
        }else if( year > LIMIT_YEARS_ABS_MAXIMUM){
            // iso8601 표현에는 년도를 상호간 동의 없이 0~9999를 초과할 수 없다.
            dateObj.setFullYear(LIMIT_YEARS_ABS_MAXIMUM);
        }
    }

    if(isOverrideOccured){
        alertAndLog("searchDateLen: [commons] date override occured: "+dateObj.getFullYear()+"-"+getTwoDigitNumber(dateObj.getMonth() + 1)+"-"+getTwoDigitNumber(dateObj.getDate())+" was "+year+"-"+getTwoDigitNumber(month)+"-"+getTwoDigitNumber(date));
    }

    return dateObj;
}


//
function getDesiredDates(dateEntry){
    var desiredDates = {};
    
    switch(dateEntry[DLE_JSON_COL_TYPE]){
        case DLE_TYPE_REL_FROM: // 'rel_from': // 며칠전 부터 
            {
                var dateFromTarget = setDateFromNow(dateEntry[DLE_JSON_COL_FROM_YEAR], dateEntry[DLE_JSON_COL_FROM_MONTH], dateEntry[DLE_JSON_COL_FROM_DATE]);
                desiredDates[DLE_JSON_COL_FROM_DATEOBJ] = dateFromTarget;
            }
            break;

        case DLE_TYPE_REL_TO: // 'rel_to': // 며칠전 까지
            {
                var dateToTarget = setDateFromNow(dateEntry[DLE_JSON_COL_TO_YEAR], dateEntry[DLE_JSON_COL_TO_MONTH], dateEntry[DLE_JSON_COL_TO_DATE]);
                desiredDates[DLE_JSON_COL_TO_DATEOBJ] = dateToTarget;
            }
            break;
        case DLE_TYPE_REL_RANGE: // 'rel_range': // 정해진 기간 (상대적)
            {
                var dateRgFrmTarget = setDateFromNow(dateEntry[DLE_JSON_COL_FROM_YEAR], dateEntry[DLE_JSON_COL_FROM_MONTH], dateEntry[DLE_JSON_COL_FROM_DATE]);
                var dateRgToTarget = setDateFromNow(dateEntry[DLE_JSON_COL_TO_YEAR], dateEntry[DLE_JSON_COL_TO_MONTH], dateEntry[DLE_JSON_COL_TO_DATE]);
                
                desiredDates[DLE_JSON_COL_FROM_DATEOBJ] = dateRgFrmTarget;
                desiredDates[DLE_JSON_COL_TO_DATEOBJ] = dateRgToTarget;
            }
            break;

        case DLE_TYPE_ABS_FROM: // 'abs_from': // 특정일 부터
            {
                var dateAFrmTarget = setDateExactTry(dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);
                
                // 현재날짜 보다 미래'부터'로 되어있다면 과거가 되도록 년월일을 내려본다.
                var dateAFrmFixed = pullDatesToFitPast(dateAFrmTarget,dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);

                desiredDates[DLE_JSON_COL_FROM_DATEOBJ] = dateAFrmFixed;
            }
            break;

        case DLE_TYPE_ABS_TO: // 'abs_to': // 특정일 까지
            {
                var dateAToTarget = setDateExactTry(dateEntry[DLE_JSON_COL_TO_YEAR],dateEntry[DLE_JSON_COL_TO_MONTH],dateEntry[DLE_JSON_COL_TO_DATE]);
                
                // 특정일 까지이긴 한데 미래여도 된다.
                desiredDates[DLE_JSON_COL_TO_DATEOBJ] = dateAToTarget;
            }
            break;
            
        case DLE_TYPE_ABS_RANGE: // 'abs_range': // 정해진 기간 (절대적)
            {
                var dateAgFrmTarget = setDateExactTry(dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);
                var dateAgToTarget = setDateExactTry(dateEntry[DLE_JSON_COL_TO_YEAR],dateEntry[DLE_JSON_COL_TO_MONTH],dateEntry[DLE_JSON_COL_TO_DATE]);
                

                // 기간이 후자가 더 큰지 공고히
                if(dateAgFrmTarget > dateAgToTarget){
                    var temp = dateAgFrmTarget;
                    dateAgFrmTarget = dateAgToTarget;
                    dateAgToTarget = temp;
                }
                
                // 현재날짜 보다 미래'부터'로 되어있다면 과거가 되도록 년월일을 내려본다.
                var dateAgFrmFixed = pullDatesToFitPast(dateAgFrmTarget,dateEntry[DLE_JSON_COL_FROM_YEAR],dateEntry[DLE_JSON_COL_FROM_MONTH],dateEntry[DLE_JSON_COL_FROM_DATE]);
                var dateAgToFixed = null;

                if(dateAgFrmFixed != dateAgFrmTarget){
                    //
                    dateAgToFixed = pullDatesToFitPast(dateAgToTarget,dateEntry[DLE_JSON_COL_TO_YEAR],dateEntry[DLE_JSON_COL_TO_MONTH],dateEntry[DLE_JSON_COL_TO_DATE]);
                }else{
                    dateAgToFixed = dateAgToTarget;
                }

                desiredDates[DLE_JSON_COL_FROM_DATEOBJ] = dateAgFrmFixed;
                desiredDates[DLE_JSON_COL_TO_DATEOBJ] = dateAgToFixed;
            }
            break;
    }
    return desiredDates;
}