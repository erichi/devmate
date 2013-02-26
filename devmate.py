from flask import Flask
from flask import render_template
from jinja2.exceptions import TemplateNotFound
app = Flask(__name__)
app.jinja_env.add_extension('jinja2htmlcompress.SelectiveHTMLCompress')

@app.route('/')
@app.route('/<page>/')
def any_page(page='home'):
    try:
        return render_template(page + '.html', url=page)
    except TemplateNotFound:
        return render_template('404.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)