# SearchDateLen Help (English)


## Popup page

![searchDateLen popup page](https://github.com/SD810/SearchDateLen/blob/master/document/imgs/popup.png?raw=true "searchDateLen popup page")

* A. To see this popup, push this button.
* B. Shows version infomation.
* C. Opens 'Manage page'. refer section *Manage page*.
* D. Opens [this GitHub page](https://github.com/SD810/SearchDateLen).


## Manage Page

![searchDateLen option page](https://github.com/SD810/SearchDateLen/blob/master/document/imgs/OptionsPage.png?raw=true "searchDateLen option page")

1. Information area of each entry.
  * A. Name : A name of entry. On search pages, only shows this name.
  * B. Set Period/date : The period or date you have set.
  * C. Type of entry : This rules how B is calculated. refer section *'Type of entry'*.
  * D. Calculated B on today : Prints how B is calculated on today. Good to check you've set it right.
2. Management area of each entry
  * E. Move up : Move this entry one row up.
  * F. Move down : Move this entry one row down.
  * G. Modify : Expand this entry to point I, to modify it. 
  * H. Delete : Delete this entry without a confirmation.
3. Other area
  * I. The area how an entry is added or modified. refer section *'Add an entry or modify it'*.
  * J. Shows version information.



## Add an entry or modify it (Relative)

![searchDateLen add or modify, relative](https://github.com/SD810/SearchDateLen/blob/master/document/imgs/AddOrModify_rel.png?raw=true "searchDateLen add or modify, relative")

* A. 항목 이름 : 항목의 이름입니다. 검색 페이지에 나오는 이름이며, 너무 길면 밖으로 삐져나갈 수 있습니다.
* B. 항목의 날짜 형식 : C와 D를 어떻게 계산할지 규정하는 설정이며 C와 D 둘 중 하나를 때에 따라 숨깁니다. *'항목의 날짜 형식'* 섹션을 참고하세요.
* C. **시작** 기간 : 몇 년(y), 몇 개월(m) 또는 며칠 전(d) **부터**인지를 설정하는 곳입니다. 최대 99년 999개월 9999일까지 가능하며 미래로 설정할 수 없습니다.
* D. **종료** 기간 : 몇 년(y), 몇 개월(m) 또는 며칠 전(d) **까지**인지를 설정하는 곳입니다. 최대 99년 999개월 9999일까지 가능하며 미래로 설정할 수 없습니다.
* E. 취소 버튼 : 작성된 내용을 버립니다.
* F. 추가/수정 버튼 : 작성된 내용을 반영합니다.




## Add an entry or modify it (Absolute)

![searchDateLen add or modify, absolute](https://github.com/SD810/SearchDateLen/blob/master/document/imgs/AddOrModify_abs.png?raw=true "searchDateLen add or modify, absolute")

* A. 항목 이름 : 항목의 이름입니다. 검색 페이지에 나오는 이름이며, 너무 길면 밖으로 삐져나갈 수 있습니다.
* B. 항목의 날짜 형식 : C와 D를 어떻게 계산할지 규정하는 설정이며 C와 D 둘 중 하나를 때에 따라 숨깁니다. *'항목의 날짜 형식'* 섹션을 참고하세요.
* C. **시작** 일자 : 특정년도(yyyy), 특정월(mm), 특정일(dd) **부터**인지를 설정하는 곳입니다. 년도에 한해 -99년의 과거로 설정할 수 있습니다. 각 항목을 0으로 설정하면 오늘 날짜를 기준으로 채워지며 이 때 미래가 된다면 1년 이내의 과거로 계산될 수 있습니다. 0으로 설정되지 않은 항목은 그대로 유지되고 세 값 모두 0이 아니면 미래로 유지됩니다.
* D. **종료** 일자 : 특정년도(yyyy), 특정월(mm), 특정일(dd) **까지**인지를 설정하는 곳입니다. 년도에 한해 -99년의 과거로 설정할 수 있습니다. 각 항목을 0으로 설정하면 오늘 날짜를 기준으로 채워집니다. 미래로 설정할 수 있습니다.
* E. 취소 버튼 : 작성된 내용을 버립니다.
* F. 추가/수정 버튼 : 작성된 내용을 반영합니다.



## Type of entry

* a. 해당 일수 부터 : 몇 년, 몇 개월 또는 며칠 전 **부터**인지를 설정할 때 사용합니다. 최대 99년 999개월 9999일까지 가능하며 미래로 설정할 수 없습니다.
* b. 해당 일수 까지 : 몇 년, 몇 개월 또는 며칠 전 **까지**인지를 설정할 때 사용합니다. 최대 99년 999개월 9999일까지 가능하며 미래로 설정할 수 없습니다.
* c. 해당 기간 (상대적) : a와 b가 동시에 설정된 것으로 해당 기간 동안의 결과만 추릴 때 사용합니다.
* d. 특정 날짜 부터 : 특정년도, 특정월, 특정일 **부터**인지를 설정할 때 사용합니다. 년도에 한해 -99년의 과거로 설정할 수 있습니다. 각 항목을 0으로 설정하면 오늘 날짜를 기준으로 채워지며 이 때 미래가 된다면 1년 이내의 과거로 계산될 수 있습니다. 0으로 설정되지 않은 항목은 그대로 유지되고 세 값 모두 0이 아니면 미래로 유지됩니다.
* e. 특정 날짜 까지 : 특정년도, 특정월, 특정일 **까지**인지를 설정할 때 사용합니다. 년도에 한해 -99년의 과거로 설정할 수 있습니다. 각 항목을 0으로 설정하면 오늘 날짜를 기준으로 채워집니다. 미래로 설정할 수 있습니다.
* f. 특정 기간 (절대적) : d와 e가 동시에 설정된 것으로 특정 기간의 결과만 추릴 때 사용합니다. d의 기준에 따라 d와 e 모두 1년 이내의 과거가 될 수 있습니다.
