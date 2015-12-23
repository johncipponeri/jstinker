$('document').ready ->
  libs = {}
  # List of Frameworks & Extensions
  frameworks =
    'jQuery 2.1.0(LOCAL)': '/js/local/jquery-2.1.0.js'
    'jQuery 1.11.3(LOCAL)': '/js/local/jquery-1.11.3.js'
    'fabricJS 1.5.0 (LOCAL)': '/js/local/fabric.js'
    'intercom (LOCAL)': '/js/local/intercom.js'
    'lovefield(LOCAL)': '/js/local/lovefield.js'
    'CamanJS(LOCAL)': '/js/local/caman.full.min.js'
    'jQuery Compat (edge)': 'http://code.jquery.com/jquery-git.js'
    'jQuery (edge)': 'http://code.jquery.com/jquery-compat-git.js'
    'jQuery 2.1.0': 'http://code.jquery.com/jquery-2.1.0.js'
    'jQuery 2.0.2': 'http://code.jquery.com/jquery-2.0.2.js'
    'jQuery 1.10.1': 'http://code.jquery.com/jquery-1.10.1.js'
    'jQuery 1.9.1': 'http://code.jquery.com/jquery-1.9.1.js'
    'jQuery 1.8.3': 'http://code.jquery.com/jquery-1.8.3.js'
    'jQuery 1.7.2': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
    'jQuery 1.6.4': 'http://code.jquery.com/jquery-1.6.4.js'
    'Prototype 1.7.1': 'https://ajax.googleapis.com/ajax/libs/prototype/1.7.1/prototype.js'
    'Prototype 1.6.1.0': 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js'
    'YUI 3.17.2': 'http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js'
    'YUI 3.16.0': 'http://fiddle.jshell.net/_display/yui.yahooapis.com/3.16.0/build/yui/yui-min.js'
    'YUI 3.14.0': 'http://yui.yahooapis.com/3.14.0/build/yui/yui-min.js'
    'YUI 3.10.1': 'http://yui.yahooapis.com/3.10.1/build/yui/yui.js'
    'YUI 3.8.0': 'http://yui.yahooapis.com/3.8.0/build/yui/yui-min.js'
    'YUI 3.7.3': 'http://yui.yahooapis.com/3.7.3/build/yui/yui-min.js'
    'YUI 3.6.0': 'http://yui.yahooapis.com/3.6.0/build/yui/yui.js'
    'YUI 3.5.0': 'http://yui.yahooapis.com/3.5.0/build/yui/yui-min.js'
    'YUI 2.8.0r4': 'http://ajax.googleapis.com/ajax/libs/yui/2.8.0r4/build/yuiloader/yuiloader-min.js'
    'Dojo Nightly': 'http://archive.dojotoolkit.org/nightly/dojotoolkit/dojo/dojo.js'
    'Dojo 1.10.1': 'http://ajax.googleapis.com/ajax/libs/dojo/1.10.1/dojo/dojo.js'
    'Dojo 1.9.4': 'http://ajax.googleapis.com/ajax/libs/dojo/1.9.4/dojo/dojo.js'
    'Dojo 1.8.7': 'http://ajax.googleapis.com/ajax/libs/dojo/1.8.7/dojo/dojo.js'
    'Dojo 1.7.6': 'http://ajax.googleapis.com/ajax/libs/dojo/1.7.6/dojo/dojo.js'
    'Dojo 1.6.2': 'http://ajax.googleapis.com/ajax/libs/dojo/1.6.2/dojo/dojo.xd.js'
    'Dojo 1.5.3': 'http://ajax.googleapis.com/ajax/libs/dojo/1.5.3/dojo/dojo.xd.js'
    'Processing.js 1.4.7': 'http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.7/processing.min.js'
    'Processing.js 1.4.1': 'http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing.min.js'
    'Processing.js 1.3.6': 'http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.3.6/processing.min.js'
    'Processing.js 1.2.3': 'http://processingjs.org/content/download/processing-js-1.2.3/processing-1.2.3.js'
    'ExtJS 4.2.0': 'http://cdn.sencha.io/ext-4.2.0-gpl/ext-all.js'
    'ExtJS 4.1.1': 'http://cdn.sencha.io/ext-4.1.1-gpl/ext-all.js'
    'ExtJS 4.1.0': 'http://fiddle.jshell.net/js/lib/extjs-4.1.0/ext-all.js'
    'ExtJS 3.4.0': 'http://cdn.sencha.io/ext-3.4.0/adapter/ext/ext-base.js'
    'ExtJS 3.1.0': 'http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core-debug.js'
    'Raphael 2.1.0': 'http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js'
    'Raphael 1.5.2 (min)': 'http://fiddle.jshell.net/js/lib/raphael-1.5.2-min.js'
    'Raphael 1.4': 'http://fiddle.jshell.net/js/lib/raphael1.4.js'
    'RightJS 2.3.1': 'http://cdn.rightjs.org/right-2.3.1.js'
    'RightJS 2.1.1': 'http://fiddle.jshell.net/js/lib/right.js'
    'Three.js r54': 'http://cdnjs.cloudflare.com/ajax/libs/three.js/r54/three.min.js'
    'Zepto 1.0rc1': 'http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0rc1/zepto.min.js'
    'Shipyard (nightly)': 'http://static.seanmonstar.com/shipyard/shipyard-nightly.js'
    'Shipyard 0.2': 'http://static.seanmonstar.com/shipyard/shipyard-all-v0.2.0.js'
    'Knockout.js 3.0.0': 'http://knockoutjs.com/downloads/knockout-3.0.0.js'
    'Knockout.js 2.3.0': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js'
    'Knockout.js 2.2.1': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.2.1/knockout-min.js'
    'Knockout.js 2.1.0': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.1.0/knockout-min.js'
    'Knockout.js 2.0.0': 'http://cdnjs.cloudflare.com/ajax/libs/knockout/2.0.0/knockout-min.js'
    'The X Toolkit edge': 'http://get.goxtk.com/xtk_edge.js'
    'AngularJS 1.2.1': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.js'
    'AngularJS 1.1.1': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.1/angular.min.js'
    'Ember 1.3.1': 'http://http//builds.emberjs.com/tags/v1.3.1/ember.prod.js'
    'Underscore 1.4.4': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js'
    'Underscore 1.4.3': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js'
    'Underscore 1.3.3': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js'
    'Bonsai 0.4.1': 'http://cdnjs.cloudflare.com/ajax/libs/bonsai/0.4.1/bonsai.min.js'
    'KineticJS 4.3.1': 'http://cdnjs.cloudflare.com/ajax/libs/kineticjs/4.3.1/kinetic.min.js'
    'KineticJS 4.0.5': 'http://www.kineticjs.com/download/v4.0.5/kinetic-v4.0.5.min.js'
    'FabricJS 1.4.0': 'http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.4.0/fabric.min.js'
    'FabricJS 1.2.0': 'http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.2.0/fabric.all.min.js'
    'FabricJS 0.9': 'http://fabricjs.com/lib/fabric.js'
    'qooxdoo 2.1': 'http://cdnjs.cloudflare.com/ajax/libs/qooxdoo/2.1/q.min.js'
    'qooxdoo 2.0.3': 'http://cdnjs.cloudflare.com/ajax/libs/qooxdoo/2.0.3/q.min.js'
    'D3 3.0.4': 'http://d3js.org/d3.v3.min.js'
    'CreateJS 2013.09.25': 'http://code.createjs.com/createjs-2013.09.25.combined.js'
    'WebApp Install 0.1': 'http://fiddle.jshell.net/js/lib/webapp_install.js'
    'Thorax 2.0.0rc6': 'http://cdnjs.cloudflare.com/ajax/libs/thorax/2.0.0rc6/thorax.js'
    'Thorax 2.0.0rc3': 'http://cdnjs.cloudflare.com/ajax/libs/thorax/2.0.0rc3/thorax.js'
    'Paper.js 0.22': 'http://cdnjs.cloudflare.com/ajax/libs/paper.js/0.22/paper.js'
    'React 0.9.0': 'http://cdnjs.cloudflare.com/ajax/libs/react/0.9.0/react.js'
    'React 0.8.0': 'http://cdnjs.cloudflare.com/ajax/libs/react/0.8.0/react.js'
    'React 0.4.0': 'http://fb.me/react-0.4.0.js'
    'React 0.3.2': 'http://dragon.ak.fbcdn.net/hphotos-ak-ash3/851559_337624843031740_50442_n.js'
    'svg.js 0.x (latest)': 'http://s3-eu-west-1.amazonaws.com/svgjs/svg.js'
    'Minified 1.0 beta1': 'http://minifiedjs.com/download/minified-web-src.js'
    'jTypes 2.1.0': 'http://cdn.jtypes.com/jtypes-2.1.0.js'
    'Lo-Dash 2.2.1': 'http://cdn.jsdelivr.net/lodash/2.1.0/lodash.compat.js'
    'Brick edge': 'http://mozbrick.github.io/dist/brick.js'
    'RactiveJS Latest': 'http://cdn.ractivejs.org/latest/ractive.js'
    'RactiveJS Edge': 'http://cdn.ractivejs.org/edge/ractive.js'
    'Vue (edge)': 'http://vuejs.org/js/vue.js'
    'Vue 0.11.0': 'http://cdnjs.cloudflare.com/ajax/libs/vue/0.11.0/vue.min.js'
  frameworks_css = 
    'jQuery UI 1.10.3': 'http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/css/base/jquery-ui.css'
    'Bootstrap 3.2.0': 'http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'
    'Bootstrap 2.3.2': 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css'
    'jQuery UI 1.9.2': 'http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css'
  frameworks_extras = 
    'jQuery Compat (edge)':
      'QUnit 1.12.0': 'http://code.jquery.com/qunit/qunit-1.12.0.js'
      'jQuery UI 1.10.3': 'http://code.jquery.com/jquery-git.js'
      'Firebug Lite 1.4.0': 'http://cdnjs.cloudflare.com/ajax/libs/firebug-lite/1.4.0/firebug-lite.js'
      'jQuery Lint (edge)': 'http://fiddle.jshell.net/js/lib/jquery.lint.js'
    'jQuery (edge)':
      'jQuery UI 1.8.5': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.js'
      'QUnit': 'http://github.com/jquery/qunit/raw/master/qunit/qunit.js'
      'Firebug Lite': 'https://getfirebug.com/firebug-lite-debug.js'
      'jQuery UI 1.8.9': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.js'
      'jQuery Lint': 'http://fiddle.jshell.net/js/lib/jquery.lint.js'
    'jQuery 2.1.0':
      'Bootstrap 3.2.0': 'http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'
      'Bootstrap 2.3.2': 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js'
    'jQuery 2.0.2':
      'Migrate 1.2.1': 'http://code.jquery.com/jquery-migrate-1.2.1.js'
      'jQuery UI 1.10.3': 'http://code.jquery.com/ui/1.10.3/jquery-ui.js'
    'jQuery 1.9.1':
      'Migrate 1.1.0': 'http://code.jquery.com/jquery-migrate-1.1.0.js'
      'jQuery UI 1.9.2': 'http://code.jquery.com/ui/1.9.2/jquery-ui.js'
    'jQuery 1.8.3': 'jQuery UI 1.9.2': 'http://code.jquery.com/ui/1.9.2/jquery-ui.js'
    'jQuery 1.7.2':
      'jQuery UI 1.8.18': 'http://code.jquery.com/ui/1.8.18/jquery-ui.min.js'
      'jQuery Lint (13 June \'11)': 'http://fiddle.jshell.net/js/lib/jquery.lint-11-06.js'
      'Bootstrap 2.0.2 (js only)': 'http://fiddle.jshell.net/js/lib/bootstrap-2.0.2.js'
    'Prototype 1.7.1':
      'script.aculo.us 1.9': 'http://fiddle.jshell.net/js/lib/scriptaculous-js-1.9.0/src/scriptaculous.js'
      'Scripty 2.0b1': 'http://fiddle.jshell.net/js/lib/s2-b.js'
    'Prototype 1.6.1.0':
      'script.aculo.us 1.8.3': 'http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/scriptaculous.js'
      'Scripty2 2.0.0-a5': 'http://fiddle.jshell.net/js/lib/s2.js'
    'ExtJS 3.4.0': 'Ext All Debug': 'http://cdn.sencha.io/ext-3.4.0/ext-all-debug.js'
    'Underscore 1.4.4':
      'Backbone LocalStorage': 'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.0/backbone.localStorage-min.js'
      'Backbone ModelBinder': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.modelbinder/0.1.3/Backbone.ModelBinder-min.js'
      'Backbone 1.0': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone.js'
    'Undersocre 1.4.3':
      'Backbone 0.9.10': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js'
      'Backbone LocalStorage': 'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.0/backbone.localStorage-min.js'
      'Backbone ModelBinder': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.modelbinder/0.1.3/Backbone.ModelBinder-min.js'
    'Underscore 1.3.3':
      'Backbone 0.9.2': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js'
      'Backbone LocalStorage': 'http://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.0/backbone.localStorage-min.js'
      'Backbone ModelBinder': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.modelbinder/0.1.3/Backbone.ModelBinder-min.js'
    'React 0.8.0': 'JSXTransformer.js 0.8.0': 'http://cdnjs.cloudflare.com/ajax/libs/react/0.8.0/JSXTransformer.js'
    'React 0.4.0': 'JSXTransformer.js 0.4.0': 'http://fb.me/JSXTransformer-0.4.0.js'
    'React 0.3.2': 'JSXTransformer.js 0.3.2': 'http://dragon.ak.fbcdn.net/hphotos-ak-prn1/851582_580035725361422_42012_n.js'
    'Brick edge': 'Brick CSS': 'http://mozbrick.github.io/dist/brick.css'
  # Frameworks & Extensions Dropdown
  language = "js"

  $('#dropdownMenu1 li a').click (event) ->
    event.preventDefault()
    $('.extra').remove()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    lib_extras = frameworks_extras[selText]
    for extra of lib_extras
      dropdown.append '<div class=\'extra checkbox\'><label><input type=\'checkbox\'></input><span class=\'chk_lbl\'>' + extra + '</span></label></div>'
    return
  # Script Injection Dropdown
  $('#dropdownMenu2 li a').click (event) ->
    event.preventDefault()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    return
  # Doctype Dropdown
  $('#dropdownMenu3 li a').click (event) ->
    event.preventDefault()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    return
  # HTML Dropdown
  $('#dropdownMenu4 li a').click (event) ->
    event.preventDefault()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    return
  # CSS Dropdown
  $('#dropdownMenu5 li a').click (event) ->
    event.preventDefault()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    return
  # Javascript Dropdown
  $('#dropdownMenu6 li a').click (event) ->
    event.preventDefault()
    dropdown = $(this).parents('.btn-group')
    selText = $(this).text()
    if selText == "CoffeeScript"
      language = "cs"
    else if selText == "CJSX"
      language = "cjsx"
    else
      language = "js"
    console.log language
    dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
    return
  # RUN Button
  $('#btnRun').click (event) ->
    event.preventDefault()
    previewDoc = window.frames[0].document
    css = ace.edit('css-editor').getSession().getValue()
    script = ace.edit('js-editor').getSession().getValue()
    if language == "cs"
      console.log "converting ..."
      script = CoffeeScript.compile script,
        bare: "on"
      console.log script
    else if language == "cjsx"
      console.log ""
      #console.log createScript

    html = ace.edit('html-editor').getSession().getValue()
    dropdownMenu1Sel = $('#dropdownMenu1').parents('.btn-group').find('.dropdown-toggle').text().trim()
    lib = frameworks[dropdownMenu1Sel]
    extra_libs = []
    $('#dropdownMenu1').parents('.btn-group').find('input:checked').parent().each ->
      extra_libs.push $(this).text().trim()
      return
    dropdownMenu2Sel = $('#dropdownMenu2').parents('.btn-group').find('.dropdown-toggle').text().trim()
    previewDoc.write '<!DOCTYPE html>'
    previewDoc.write '<html>'
    previewDoc.write '<head>'
    previewDoc.write '<style type=\'text/css\'>' + css + '</style>'
    if lib
      previewDoc.write '<script src=' + lib + ' type=\'text/javascript\'></script>'
    for i of extra_libs
      if extra_libs[i] of frameworks_css
        previewDoc.write '<style type=\'text/css\' src=' + frameworks_css[extra_libs[i]] + '></style>'
      if lib of frameworks_extras
        previewDoc.write '<script src=' + frameworks_extras[lib][extra_libs[i]] + ' type=\'text/javascript\'></script>'
    if dropdownMenu2Sel == 'onLoad'
      previewDoc.write '<script type=\'text/javascript\'>window.onload = function() {' + script + '}</script>'
    else if dropdownMenu2Sel == 'No wrap - in head'
      previewDoc.write '<script type=\'text/javascript\'>' + script + '</script>'
    previewDoc.write '</head>'
    previewDoc.write '<body>'
    previewDoc.write html
    if dropdownMenu2Sel == 'No wrap - in body'
      previewDoc.write '<script type=\'text/javascript\'>' + script + '</script>'
    previewDoc.write '</body>'
    previewDoc.write '</html>'
    previewDoc.close()
    return
  # Preview code on page load
  $('#btnRun').click()
  # TIDYUP Button
  $('#btnTidyUp').click (event) ->
    event.preventDefault()
    html = ace.edit('html-editor').getSession().getValue()
    html2 = style_html(html)
    ace.edit('html-editor').getSession().setValue html2
    css = ace.edit('css-editor').getSession().getValue()
    css2 = css_beautify(css)
    ace.edit('css-editor').getSession().setValue css2
    js = ace.edit('js-editor').getSession().getValue()
    js2 = js_beautify(js)
    ace.edit('js-editor').getSession().setValue js2
    return
  # Together Button
  $('#btnTogether').click (event) ->
    event.preventDefault()
    TogetherJS this
    false

  localapi = new LocalApi window.location.host, window.location.port
  codeloader = new CodeLoader
  api = localapi: localapi, codeloader: codeloader
  $(document).on "MyAppInited", (event, callback) ->
    callback(api)

  scripts = document.querySelectorAll "script[type='text/cjsx']"
  console.log "Script: #{scripts.length}, #{scripts.item(0).src} , #{scripts.item(0)}"
  for script in scripts
    path = script.src.split('/js/')
    path = '/js/'+path.slice(1)
    console.log "Processing script #{path}"
    $.get(path)
    .done (script)->
      console.log "script was got"
      processCJSX script
      return
    .fail (jqxhr, settings, exception)->
      console.log "#{jqxhr}, #{settings} #{exception}"

  #script = document.createElement 'script'
  #script.src = "/js/cjsx-in-browser.js"
  #document.body.appendChild script

  return