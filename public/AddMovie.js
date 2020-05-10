$(document).ready(function(){
    $('button').click(send);
    function send()
    {
        var button = this;
        var tdButton = this.closest("td");
        var id = tdButton.id;
        console.log(id)
        url="/selectMovie/"+id;
        $.ajax({
            type: 'post',
            url: url,
            data: id,
            dataType: 'text'
        })
        .done(function(data){
            console.log("success")
            tdButton.parentNode.removeChild(tdButton);//we remove the row
            var tr = document.getElementById(id);//we select the row we want to remove
            let td = document.createElement("trd");
            td.innerHTML = "This movies has been added";
            tr.append(td);
        });

    }
});