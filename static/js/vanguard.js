$(function() {
    $("#generate").click(function(){
        $(this).prop("disabled",true);
        // if radio button, add value to form data
        if ($( "#options" ).length) {
            var value = $("input[name='radio_type']:checked").val();
            var form = {"vanguard": $(this).attr('name'), "option": value};
        } else{
            var form = {"vanguard": $(this).attr('name')};
        }
        $.ajax({
            url: '/getCard',
            data: form,
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                cards = response.cards;
                if(cards.length == 1){
                    image_url = cards[0].image_url;
                    name = cards[0].name;
                    draw_image(image_url, name);
                } else{
                    choose_card(cards);
                }

            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

function draw_image(image_url, name){
    // Add image to image_list
    var img = document.createElement("img");
    img.src = image_url;
    img.alt = name;
    img.className = "classic_card";
    $("#image_list").prepend(img);
    $("#generate").prop("disabled",false);
}

function choose_card(images){
    // Create a div to choose one card to add to image_list
    var div = document.createElement("div");
    div.setAttribute("id", "card_choice");
    div.setAttribute("class", "center");
    var h = document.createElement("h3");
    h.innerHTML = "Choose a card";

    for(var i=0; i < images.length; i++){
        var img = document.createElement("img");
        image_url = images[i].image_url;
        name = images[i].name;
        img.src = image_url;
        img.alt = name;
        img.className = "classic_card";
        // On image click, add image to image_list
        $(img).click(function(){
            draw_image(this.src, this.alt);
            $("#card_choice").remove();
            $("#generate").prop("disabled",false);
            });
        div.prepend(img);
    }
    div.prepend(h);
    $('#main').after(div);
}

