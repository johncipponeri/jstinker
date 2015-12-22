import bottle
from bs4 import BeautifulSoup

@bottle.get("/js/<filename:path>")
def serve_js(filename):
    return bottle.HTTPResponse(open('js/'+filename, 'rt'))

@bottle.get("/css/<filename:re:.*\.css>")
def serve_css(filename):
    return bottle.static_file(filename, root='css')

@bottle.get("/fonts/<filename:path>")
def serve_fonts(filename):
    return bottle.static_file(filename, root='fonts')
@bottle.get('/favicon.ico')
def puticon():
	return bottle.static_file('favicon.ico', root='.')

@bottle.get('/')
def index():
    raw_html = open('index.html', 'rt').read()
    return bottle.HTTPResponse(raw_html)

bottle.run()