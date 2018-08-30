import random
import scryfallModel as scf


def get_card_image_for_vanguard(vanguard, option):
    """Return tuple(image_url, name) of a random card for Vanguards"""
    print(option)
    cards = []
    if vanguard == "Momir Vig, Simic Visionary Avatar":
        # cards = scf.search_cards(unique="cards", q="t:creature")
        # random_card = random.choice(cards)
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    elif vanguard == "Jhoira of the Ghitu":
        for i in [1, 2, 3]:
            random_card = scf.get_random_card()
            cards.append({"name": random_card["name"],
                          "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    elif vanguard == "stonehewer":
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})
    else:
        random_card = scf.get_random_card()
        cards.append({"name": random_card["name"],
                      "image_url": scf.get_image_urls(random_card, size="normal")[0]})

    return cards
