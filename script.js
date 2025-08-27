// گرفتن المنت های html
const clock = document.getElementById("clock") ;
const date = document.getElementById("date") ;
const jalaliDate = document.getElementById("jalali") ;
const toggleThemeBtn = document.getElementById("toggle-theme") ;
const toggleFormatBtn = document.getElementById("toggle-format") ;

// ساعت اولش به صورت پیش فرض ۲۴ساعته باشه
let is24Hour = true ;

// تابع نمایش ساعت
function updateClock() {
  // گرفتن تاریخ همین لحظه
  const now = new Date() ;
  // گرفتن ساعت ، دقیقه ، ثانیه
  let hours = now.getHours() ;
  let minutes = now.getMinutes() ;
  let seconds = now.getSeconds() ;
  
  // اگر فرمت ۱۲ ساعته انتخاب شد
  let ampm = "" ;
  if(!is24Hour) {
    // ساعت بزرگتر یا مساوی ۱۲ بود بزار PM
    ampm = hours >= 12 ? "PM" : "AM" ;
    // کمتر از ۱۲ بزار AM
    hours = hours % 12 ;
    // و ساعت رو از حالت ۲۴ ساعته به ۱۲ ساعته تبدیل کن
    hours = hours ? hours : 12 ;
  }
  
  // اضافه کردن صفر جلوی عددهای تک رقمی
  hours = String(hours).padStart(2 , "0") ;
  minutes = String(minutes).padStart(2 , "0") ;
  seconds = String(seconds).padStart(2 , "0") ;
  
  // نمایش ساعت روی صفحه
  clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}` ;
}

// تابع نمایش تاریخ میلادی
function updateDate() {
  // گرفتن تاریخ همین لحظه
  const now = new Date() ;
  // تنظیم این که تاریخ چجوری نمایش داده بشه که long یعنی کامل و numeric یعنی به صورت عدد نشون داده بشه
  const options = {
    weekday : "long" ,
    year : "numeric" ,
    month : "long" ,
    day : "numeric" ,
  } ;
  // تاریخ رو با زبان انگلیسی en-US با همون تنظیمات بالا نشون بده 
  date.textContent = now.toLocaleDateString("en-US" , options) ;
} 

// نمایش تاریخ شمسی جلالی
function updateJalaliDate() {
  // گرفتن تاریخ همین لحظه
  const now = new Date() ;
  // تنظیم اینکه تاریخ چجور نمایش داده بشه long کامل و numeric به صورت عدد
  const options = {
    weekday : "long" ,
    year : "numeric" ,
    month : "long" ,
    day : "numeric" ,
  } ;
  // نمایش تاریخ به صورت فارسی
  jalaliDate.textContent = now.toLocaleDateString("fa-IR" , options) ;
}

// تابع تغییر تم 
function toggleTheme() {
  // اگر کلاس dark-theme نبود اضافه کن اگه بود حذف کن
  document.body.classList.toggle("dark-theme") ;
  
  // ذخیره در لوکال استورج
  if(document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme" , "dark") ;
  } else {
    localStorage.setItem("theme" , "light") ;
  }
}

// تابع بارگزاری تم ذخیره شده 
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") ;
  if(savedTheme === "dark") {
    document.body.classList.add("dark-theme") ;
  }
}

// تغیبر تم ۲۴ ساعت و ۱۲ ساعت یعنی هربار که روی تغییر فرمت بزنیم تغییر میکند
function toggleFormat() {
  is24Hour = !is24Hour ;
}

// اجرای توابع 
// هر ثانیه ساعت اپدیت میشه
setInterval(updateClock , 1000) ;
// نمایش تاریخ میلادی
updateDate() ;
// نمایش تاریخ شمسی جلالی 
updateJalaliDate() ;
// تم ذخیره شده را لود کن
loadTheme() ;

// رویداد کلیک روی دکمه ها
toggleThemeBtn.addEventListener("click" , toggleTheme) ;
toggleFormatBtn.addEventListener("click" , toggleFormat) ;