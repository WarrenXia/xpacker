var host = window.location.host;
var firstconnect = true;

function connection() {
    if (firstconnect) {
        socket = io.connect(host);
        socket.on('connect', function(data) {
            console.log(socket);
        });
        socket.on('test', function(data) {
            console.log(data);
            // alert(data)
        })
    }
}
connection();
// io.on('connect',function(data){
//     console.log(data);
// })
// console.log($);
// $(document).ready(function($) {
//     $.ajax({
//         url: '/packer',
//         type: 'get',
//         dataType: 'json',
//         data: {param1: 'value1'},
//         success:function(data, status, xhr){
//             console.log(data);
//         },
//         error:function(xhr, errorType, error){
//             console.log(error);
//             console.log(errorType);
//         }
//     })
// });