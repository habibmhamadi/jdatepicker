// Author: Habib Mhamadi
// Email: HabibMhamadi@gmail.com

// Index: in case of having multiple datepickers.
var index = 0
function jDatePicker(id, options = {headerColor: '#2196f1', bodyColor: '#fff', dariMonth: true}) {
    const datePicker = document.getElementById(id)
    // set initial value to estimated current date.
    const currentDate = new Date()
    var year =  currentDate.getFullYear() - 621
    if (currentDate.getMonth() < 2 || (currentDate.getMonth() == 2 && currentDate.getDate() < 21)) {
        year -= 1
    }
    var month = 0
    var day = 0
    // return either dari month names or iranian
    const monthNames = ((options.dariMonth || typeof options.dariMonth == 'undefined') && ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب',
            'قوس', 'جدی', 'دلو', 'حوت']) || 
            ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان',
            'آذر', 'دی', 'بهمن', 'اسفند']
    index += 1
    // modal body
    const divBody = document.createElement('div')
        divBody.id = 'divBody' + index
        divBody.style.display = 'none'
        divBody.style.position= 'fixed'
        divBody.style.zIndex= '10'
        divBody.style.left= '0'
        divBody.style.top= '0'
        divBody.style.width= '100%'
        divBody.style.height= '100%'
        divBody.style.overflow= 'auto'
        divBody.style.backgroundColor= 'rgba(0,0,0,0.4)'
    // datePicker container
    const dateContainer = document.createElement('div')
        dateContainer.id = "dateContainer" + index
        dateContainer.style.backgroundColor = 'white'
        dateContainer.style.margin = '10% auto'
        dateContainer.style.boxShadow = '3px 3px 6px #888'
        dateContainer.style.border = '1px solid #888'
        dateContainer.style.width = '300px'
    // datePicker modal
    dateContainer.innerHTML = `<div style="background: ${options.headerColor || '#2196f1'}; display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
        <svg id="prev-year${index}" style="height: 36px; color:white; padding:20px; cursor:pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <h2 id="year-title${index}" style="color: white !important;"></h2>
        <svg id="next-year${index}" style="height: 36px; color:white; padding:20px; cursor:pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    </div>
    <div style="background: ${options.bodyColor || '#fff'};">
        <div style="display: flex; justify-content: space-around; align-items: center;">
            <svg id="prev-month${index}" style="height: 20px; padding:20px; cursor:pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <h4 id = "month-title${index}"></h4>
            <svg id="next-month${index}" style="height: 20px; padding:20px; cursor:pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </div>
        <table style="padding: 4px 10px 10px; direction: rtl !important; width: 100%; text-align: center;">
            <thead>
                <tr>
                    <th>ش</th>
                    <th>ی</th>
                    <th>د</th>
                    <th>س</th>
                    <th>چ</th>
                    <th>پ</th>
                    <th>ج</th>
                </tr>
                <tr><td style="padding: 5px;"></td></tr>
            </thead>
            <tbody style="font-size: 15px;" id="tbl-body${index}"></tbody>
        </table>
    </div>`
    divBody.appendChild(dateContainer)
    document.body.appendChild(divBody)
    // show datePicker on focus
    datePicker.addEventListener('focus', function(e) {
        const dateValue = getDateValue()
        // check if valid solar date
        if (dateValue && dateValue[1] > 0 && dateValue[3] > 0 && dateValue[5] > 0 && dateValue[3] < 13 
            && ((dateValue[5] < 32 && dateValue[3] < 7) || (dateValue[5] < 31 && dateValue[3] > 6))) {
                year = parseInt(dateValue[1])
                month = parseInt(dateValue[3]) - 1
                day = parseInt(dateValue[5])
        }
        showDatePicker(year, month)
        yearTitle = document.querySelector('#year-title' + divBody.id.substr(7))
        yearTitle.textContent = year
        divBody.style.display = 'block'
    })
    document.querySelector('#next-month' + index).addEventListener('click', ()=>{
        if (month < 11) {
            month += 1
            showDatePicker(year, month);
        }
    })
    document.querySelector('#prev-month' + index).addEventListener('click', ()=>{
        if (month > 0) {
            month -= 1
            showDatePicker(year, month);
        }
    })
    document.querySelector('#next-year' + index).addEventListener('click', ()=>{
        if (year < 1480) {
            year+=1
            yearTitle.innerHTML = year
            showDatePicker(year, month);
        }
    })
    document.querySelector('#prev-year' + index).addEventListener('click', ()=>{
        if (year > 1201) {
            year -= 1
            yearTitle.innerHTML = year
            showDatePicker(year, month);
        }
    })
    // close datePicker modal and reset values on clicking of outside of the modal.
    divBody.addEventListener('click', function(e){
        if(!dateContainer.contains(e.target)){
            const dateValue = getDateValue()
            divBody.style.display = 'none'
            year = (dateValue && dateValue[1]) || new Date().getFullYear() - 621
            month = (dateValue && dateValue[3] - 1) || 0
            day = (dateValue && dateValue[5]) || 0
        }
    })
    // return validated datePicker value
    function getDateValue() {
        return datePicker.value && datePicker.value.match(/^(\d{4})([-\/]{1})(\d{1,2})([-\/]{1})(\d{1,2})$/)
    }
    // function to create datepicker component based on year & month
    function showDatePicker(yearValue, monthValue) {
        const divIndex = divBody.id.substr(7)
        const dateValue = getDateValue()
        // month lengths of the selected year
        const monthLengths = [31,31,31,31,31,31,30,30,30,30,30,(yearValue - 1095) % 4 != 0 ? 29 : 30]
        const dtTable = document.querySelector('#tbl-body' + divIndex);        
        document.querySelector('#month-title' + divIndex).innerHTML = monthNames[monthValue]
        dtTable.innerHTML = ''
        // convert to gregorian date in order to get the week day.
        const gDateValue = toGregorian(yearValue, monthValue+1, 1)
        const gDate = new Date(gDateValue[0], gDateValue[1]-1, gDateValue[2]);
        var offset = [1,2,3,4,5,6,0][gDate.getDay()]
        const monthLength = monthLengths[monthValue]
        var dayCount = 1;
        year = yearValue
        for (t = 0; t < 6; t++) {
            dtTable.innerHTML += "<tr id=row-" + t + "-" +divIndex+ ">"
            for (rw = 0; rw < 7; rw++) {
                if (offset == 0) {
                    var selected = ''
                    if (dateValue && parseInt(dateValue[1]) == year && parseInt(dateValue[3]) - 1 == month && parseInt(dateValue[5]) == dayCount ) {
                        selected = 'background:'+options.headerColor + '; color:white;'
                    }
                    document.querySelector('#row-' + t + '-' + divIndex).innerHTML += `<td  style="${selected}; padding: 2px 0;  cursor: pointer;" onClick="document.querySelector('#${datePicker.id}').value = ${year} + '/' +(${month}+1)+'/'+${dayCount};
                    document.querySelector('#divBody${divIndex}').style.display = 'none'; 
                    ">${dayCount}</td>`
           
                    if (dayCount >= monthLength) {
                        t = 7;
                        break;
                    }
                    dayCount++;
                } else {
                    document.querySelector('#row-' + t + '-' + divIndex).innerHTML +=  '<td style="padding: 2px 0; cursor: pointer;"> ' + '</td>'
                    offset--;
                }
            }
            dtTable.innerHTML += '</tr>'

        }
    }
    // function to convert solar date to gregorian date.
    function toGregorian(yearValue, monthValue, dayValue) {
        const d4 = (yearValue + 1) % 4
        if (monthValue < 7) 
            var jDay = ((monthValue - 1) * 31) + dayValue
        else
            var jDay = ((monthValue - 7) * 30) + dayValue + 186
        const d33 = parseInt((((yearValue - 55) % 132) * .0305)+'')
        var a = (d33 != 3 && d4 <= d33) ? 287 :  286
        if ((d33 == 1 || d33 == 2) && (d33 == d4 || d4 == 1))
            var b = 78
        else 
            var b = (d33 == 3 && d4 == 0) ? 80 : 79
        if (((yearValue - 19) / 63) == 20)
            a -= 1, b += 1
        if (jDay <= a) {
            var gYear = yearValue + 621; var gDay = jDay + b
        }
        else {
            var gYear = yearValue + 622; var gDay = jDay - a
        }       
        const arr = [0, 31, gYear % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var gMonth = 0
        for(gMonth = 0; gMonth < arr.length; gMonth++){
            if (gDay <= arr[gMonth])
                break
            gDay -= arr[gMonth]
        }
        return [gYear, gMonth, gDay]
    }
}

// No exports, in case of using via CDN
if (typeof exports != 'undefined') {
    module.exports.jDatePicker = jDatePicker
}

