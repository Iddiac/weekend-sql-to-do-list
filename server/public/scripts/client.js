/* TODO
1.set up the page(clickhandlers ect)
2.make GET AND POST
3.DELETE AND PUT
4.Jump for joy because its completed
*/


$(document).ready(()=>{
console.log("jQuery works")
$('#addTaskButton').on('click', submitHandler);
$('#unfinishedTasks').on('click', ".complete", completetask);
// $('#unfinishedTasks').on('click', ".complete", deletetask);
gettask();

});

function submitHandler(){
console.log('new task')
newtask();
}

function newtask(){
    $.ajax({
        method:'POST',
        url:'list',
        data:{
        task:$('#task').val(),
        task_date:$('#date').val()},
     }).then((response)=>{
         console.log('post from server', response);
         gettask(response);
     }).catch((err)=>{
         console.log('error in post', err);
         alert('can not add book');
     })
}


function gettask(){
    $.ajax({
        method:'GET',
        url:'list',
    }).then((response =>{
        console.log('i recieved in GET', response);
        viewerlist(response);
    })).catch((err)=>{
        console.log('error in GET', err);
    })
}


function viewerlist(list){
$('#unfinishedTasks').empty();
for(let i=0; i<list.length; i++){
let listitems=list[i];
$('#unfinishedTasks').append(`
<tr>
    <td>${listitems.task}</td>
    <td>${listitems.task_date}</td>
    <td>
    <button class="complete" data-listitemsid="${listitems.id}"> complete </button>
    </td>
</tr>
`);
}
}


function completetask(event){
    let taskid= $(event.target).data("listitemsid")
    $.ajax({
        method:"PUT",
        url:`list/${taskid}/status`
    }).then(response =>{
        alert('task completed');
        gettask();

    }).catch(err =>{
        console.log('error in', err);
    })
    $.ajax({
        method:"delete",
        url:`list/${taskid}`
    }).then(response =>{
        gettask();
    }).catch(err =>{
        console.log('error in', err);
    })

}


function deletetask(event){
    if(listitems.status === true){
    $.ajax({
        method:"delete",
        url:`list/${taskid}`
    }).then(response =>{
        gettask();

    }).catch(err =>{
        console.log('error in', err);
    })
}
}