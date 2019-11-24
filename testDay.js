// // var today = new Date();
// // var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
// // var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
// // utc = yesterday.toJSON().slice(0,10).replace(/-/g,'/');
// // console.log(utc)

// function getDay(){
//     let today = new Date()
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//     today = yyyy+'/'+mm+'/'+dd;
//     return today;
// }

// // var today = new Date();




// // const tomorrow = new Date(today)
// // tomorrow.setDate(tomorrow.getDate() - 1)

// console.log(getDay())



// // function get ()


let today = new Date()
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() + 1)
    let dd = String(yesterday.getDate()).padStart(2, '0');
    let mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = yesterday.getFullYear();
    yesterday = yyyy + '/' + mm + '/' + dd;
    console.log(yesterday);