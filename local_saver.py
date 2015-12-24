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
    projects = map(lambda x: x[:-5], projects)
    print projects
    return Answer(projects=projects)


@bottle.get('/project/<name>')
def get_project(name):
    answer = json.load(open(os.path.join(filesdir, name+'.json')))
    return Answer(data=answer)

@bottle.put('/project')
def create_project():
    print bottle.request.POST.allitems()
    name = bottle.request.POST.get('name', "aaa")
    html = bottle.request.POST.get('html', None)
    css = bottle.request.POST.get('css', None)
    script = bottle.request.POST.get('code', None)
    codeType = bottle.request.POST.get('codeType', "js")
    if not name or name == "aaa":
        return Error(message="Not name parameter")
    data = dict(
        html=[html],
        css=[css],
        script=[dict(codeType=codeType, script=script)],
        history=[now().isoformat()]
    )
    print data
    if os.path.exists(os.path.join(filesdir, name+".json")):
        print "exists..."
        olddata = json.load(open(os.path.join(filesdir, name+".json")))
    else:
        olddata = dict(
            html=[],
            css=[],
            script=[],
            history=[]
        )
    print olddata
    result = dict(
        name=name,
        html=olddata['html']+data['html'],
        css=olddata['css']+data['css'],
        script=olddata['script']+data['script'],
        history=olddata['history']+data['history']
    )
    print result
    json.dump(result, open(os.path.join(filesdir, name+".json"), 'wt'))
    return Answer(data=result)

@bottle.get('/')
def index():
    raw_html = open('index.html', 'rt').read()
    return bottle.HTTPResponse(raw_html)


def main():
    setfilesdir(".")
    bottle.run(reloader=True)


if __name__ == "__main__":
    main()