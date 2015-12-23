import os
import sys

import re

import datetime
now = datetime.datetime.now

import json

import bottle

from bs4 import BeautifulSoup

filesdir = None

def setfilesdir(dirrectory):
    global filesdir
    filesdir = dirrectory

def Answer(**kwargs):
    kwargs['status'] = "Ok"
    return bottle.HTTPResponse(
        json.dumps(kwargs)
    )

def Error(**kwargs):
    kwargs['status'] = "Error"
    return bottle.HTTPResponse(
        json.dumps(kwargs)
    )

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

@bottle.get('/list')
def list_files():
    projects = os.listdir(filesdir)
    projects = filter(lambda x: x.endswith(".json"), projects)
    print projects
    return Answer(projects=projects)


@bottle.get('/project/<name>')
def get_project(name):
    answer = json.load(os.path.join(filesdir, name))
    return Answer(data=answer)

@bottle.put('/project')
def create_project():
    name = bottle.request.get('name', None)
    html = bottle.request.get('html', None)
    css = bottle.request.get('css', None)
    script = bottle.request.get('script', None)
    script_type = bottle.request.get('script_type', "js")
    if not name or name:
        return Error(message="Not name parameter")
    data = dict(
        name="name",
        html=[html],
        css=[css],
        script=[dict(script_type=script_type, script=script)],
        history=[now()]
    )
    json.dump(data, os.path.join(filesdir, name+".json"))
    return Answer(data=data)

@bottle.get('/')
def index():
    raw_html = open('index.html', 'rt').read()
    return bottle.HTTPResponse(raw_html)


def main():
    setfilesdir(".")
    bottle.run()


if __name__ == "__main__":
    main()