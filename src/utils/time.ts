export const getNowTime = () => {
    var date = new Date();//年 getFullYear()：四位数字返回年份
    var year = date.getFullYear();  //getFullYear()代替getYear()
    var month = date.getMonth() + 1;//月 getMonth()：0 ~ 11
    var day = date.getDate();//日 getDate()：(1 ~ 31)
    var hour = date.getHours(); //时 getHours()：(0 ~ 23)
    var minute = date.getMinutes(); //分 getMinutes()： (0 ~ 59)
    var second = date.getSeconds();//秒 getSeconds()：(0 ~ 59)
    var time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}

function addZero(s: number) {
    return s < 10 ? ('0' + s) : s;
}   

export const getCorrectTime = (date: string) => {
    return Date.parse(date) - new Date(new Date().toLocaleDateString()).getTime() < 0 ?
        date.split(' ')[0].slice(5) : date.split(' ')[1].slice(0, 5)
} 