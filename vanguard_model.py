import random
import scryfallModel as scf


def get_card_image_for_vanguard(vanguard, option):
    """Return tuple(image_url, name) of a random card for Vanguards
       option arg for Jhoira and Maelstrom Archangel
       num arg for maelstrom is the number of cards to returned"""
    cards = []
    if vanguard == "Momir Vig, Simic Visionary Avatar":
        query = "t:creature+cmc:{}".format(option)
        print(query)
        # cards = scf.search_cards(unique="cards", q="t:creature")
        # random_card = random.choice(cards)
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    elif vanguard == "Jhoira of the Ghitu":
        # option is instant or sorcery
        query = "t:{}".format(option)
        print(query)
        for i in range(3):
            # cards = scf.search_cards(unique="cards", q=query)
            # random_card = random.choice(cards)
            random_card = scf.get_random_card()
            cards.append({"name": random_card["name"],
                          "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    elif vanguard == "Stonehewer Giant":
        query = "t:equipment+cmc<{}".format(option)
        print(query)
            # cards = scf.search_cards(unique="cards", q="t:equipment")
            # random_card = random.choice(cards)
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    elif vanguard == "Maelstrom Archangel":
        # Maelstrom Archangel
        # option is int for ccm
        query = "cmc:{}".format(option)
        print(query)
        # cards = scf.search_cards(unique="cards", q=query)
        # random_card = random.choice(cards)
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    return cards
