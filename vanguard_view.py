from flask import Flask, render_template, request
import config
import json
import vanguard_model as vm


app = Flask(__name__)


@app.route('/vanguard/')
def index():
    return render_template('index.html', title="Choose a Vanguard", vanguards=config.vanguards)


@app.route('/vanguard/<vanguard_name>')
def vanguard_view(vanguard_name):
    print(vanguard_name)
    v = [item for item in config.vanguards if item["name"] == vanguard_name][0]
    return render_template('vanguard.html', image_url=v["image_url"], title=v["name"])


@app.route('/getCard', methods=['POST'])
def get_card():
    v = request.form['vanguard']
    cards = vm.get_card_image_for_vanguard(v, request.form.get("option", None))
    response = {'status': 'OK', 'cards': cards}
    return json.dumps(response)


if __name__ == '__main__':
    app.run(debug=True)
