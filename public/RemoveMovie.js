$(document).ready(function(){
    $('.buttonR').click(remove);
    

function remove(){
    button = this;
    id = button.id;
    var idtr = "tr"+id;
    console.log(idtr)
    var trButton = document.getElementById(idtr);
    url="/RemoveMovie/"+id;
        $.ajax({
            type: 'post',
            url: url,
            data: id,
            dataType: 'text'
        })
        .done(function(data){
            console.log("success")
            trButton.parentNode.removeChild(trButton);//we remove the row
        });
}
});