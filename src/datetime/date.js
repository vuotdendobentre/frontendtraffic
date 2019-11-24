exports.getDay = function () {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

exports.getTomorrow = function () {
    let today = new Date()
    let tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let dd = String(tomorrow.getDate()).padStart(2, '0');
    let mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = tomorrow.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    return tomorrow;
}

exports.getYesterday = function () {
    let today = new Date()
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() + 1)
    let dd = String(yesterday.getDate()).padStart(2, '0');
    let mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = yesterday.getFullYear();
    yesterday = yyyy + '/' + mm + '/' + dd;
    return yesterday;
}