$(function() {
    $("#generate").click(function(){
        $(this).prop("disabled",true);
        // if radio button, add value to form data
        if ($( "#vanguard_image" ).attr("alt") == "Jhoira of the Ghitu") {
            var value = $("input[name='radio_type']:checked").val();
            var form = {"vanguard": $(this).attr('name'), "option": value};
        } else {
            var value = $("#cmc_input").val();
            var form = {"vanguard": $(this).attr('name'), "option": value};
        }
        $.ajax({
            url: '/getCard',
            data: form,
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                cards = response.cards;
                if ($( "#vanguard_image" ).attr("alt") == "Jhoira of the Ghitu") {
                    choose_card(cards);
                } else if ($( "#vanguard_image").attr("alt") == "Maelstrom Archangel"){
                    image_url = cards[0].image_url;
                    name = cards[0].name;
                    create_choice_title();
                    img = draw_image(image_url, name, $("#card_choice"));
                    $(img).click(function(){
                        draw_image(this.src, this.alt, $("#image_list"));
                        $("#card_choice").empty();
                    });
                } else{
                    image_url = cards[0].image_url;
                    name = cards[0].name;
                    create_choice_title();
                    draw_image(image_url, name, $("#image_list"));
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

function create_choice_title(){
    if(!$( "#h3_choice" ).length){
        var h = document.createElement("h3");
        h.innerHTML = "Choose a card";
        h.setAttribute("id", "h3_choice");
        $("#card_choice").prepend(h);
    }
}

function draw_image(image_url, name, element){
    // Add image to image_list
    var img = document.createElement("img");
    img.src = image_url;
    img.alt = name;
    img.className = "classic_card";
    element.append(img);
    $("#generate").prop("disabled",false);

    return img;
}

function choose_card(images){
    // Create a div to choose one card to add to image_list
    for(var i=0; i < images.length; i++){
        image_url = images[i].image_url;
        name = images[i].name;
        img = draw_image(image_url, name, $("#card_choice"));
        // On image click, add image to image_list
        $(img).click(function(){
            draw_image(this.src, this.alt, $("#image_list"));
            $("#card_choice").empty();
            $("#generate").prop("disabled",false);
        });
    }
}