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
  * A. Name : A name of entry. On search pages, only displays this name.
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

* A. Name : A name of entry. On search pages, only displays this name. if it's too long, it can squeezed out.
* B. Type of entry : This rules how C and D is calculated and show or hide those. refer section *'Type of entry'*.
* C. **Start** period : Here to set this date range **starts with** how many years(y), months(m) or days(d) from today to calculate. You can set this up to 99 years, 999months, and 9999 days from today but can't be set to future.
* D. **End** period : Here to set this date range **ends with** how many years(y), months(m) or days(d) from today to calculate. You can set this up to 99 years, 999months, and 9999 days from today but can't be set to future.
* E. Cancel button : Discards these changes.
* F. Add/Modify button : Submit these changes.




## Add an entry or modify it (Absolute)

![searchDateLen add or modify, absolute](https://github.com/SD810/SearchDateLen/blob/master/document/imgs/AddOrModify_abs.png?raw=true "searchDateLen add or modify, absolute")

* A. Name : A name of entry. On search pages, only displays this name. if it's too long, it can squeezed out.
* B. Type of entry : This rules how C and D is calculated and show or hide those. refer section *'Type of entry'*.
* C. **Start** date : Here to set this date range **starts with** specific year(yyyy), month(mm), date(dd). You can set minus down to -99 for setting some years ago. If set one of those to 0, those will be filled as today and if this becomes future, can be pulled back up to 1 year. When no 0s specified, won't be pulled back and stay in future.
* D. **End** date : Here to set this date range **ends with** specific year(yyyy), month(mm), date(dd). You can set minus down to -99 for setting some years ago. If set one of those to 0, those will be filled as today. Can be set to future.
* E. Cancel button : Discards these changes.
* F. Add/Modify button : Submit these changes.



## Type of entry

* a. 해당 일수 부터 = From days ago : Use this to set date range **starts with** how many years, months or days from today to calculate. You can set date range up to 99 years, 999months, and 9999 days from today but can't be set to future.
* b. 해당 일수 까지 = Until days ago: Use this to set date range **ends with** how many years, months or days from today to calculate. You can set date range up to 99 years, 999months, and 9999 days from today but can't be set to future.
* c. 해당 기간 (상대적) = Specific date range (relative) : Use this to set both a and b, pick results within range.
* d. 특정 날짜 부터 = From specific date : Use this to set date range **starts with** specific year, month, date. You can set minus down to -99 for setting some years ago. If set one of those to 0, those will be filled as today and if this becomes future, can be pulled back up to 1 year. When no 0s specified, won't be pulled back and stay in future.
* e. 특정 날짜 까지 = Until specific date : Use this to set date range **ends with** specific year, month, date. You can set minus down to -99 for setting some years ago. If set one of those to 0, those will be filled as today. Can be set to future.
* f. 특정 기간 (절대적) = Specific date range (absolute) : Use this to set both a and b, pick results within range. According to specs of d, both d and e can pulled back up to 1 year.
