$('document').ready ->
  codeloader = new CodeLoader htmlEditor, cssEditor, jsEditor, "js"
  libs = {}
  $.getJSON "/data/scripts.json", (data)->
    console.log data
    frameworks = data.local

    appendItem = (element, key)->
      element.append "<li role='presentation'><a role='menuitem' tabindex='-1' href=''>#{key}</a></li>"

    dropDownElement = $("ul#dropdownMenu1")

    for key, value of frameworks
      appendItem dropDownElement, key

    for key, value of data.frameworks
      frameworks[key] = value
      appendItem dropDownElement, key

    frameworks_css = data.frameworks_css
    frameworks_extras = data.frameworks_extras

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
      console.log "SelText = #{selText}"
      if selText == "CoffeeScript"
        codeloader.setLanguage("cs")
      else if selText == "CJSX"
        codeloader.setLanguage("cjsx")
      else
        codeloader.setLanguage("js")
      console.log codeloader.getLanguage()
      dropdown.find('.dropdown-toggle').html selText + ' <span class="caret"></span>'
      return
    # RUN Button
    $('#btnRun').click (event) ->
      event.preventDefault()
      previewDoc = window.frames[0].document
      css = ace.edit('css-editor').getSession().getValue()
      script = ace.edit('js-editor').getSession().getValue()
      if codeloader.getLanguage() == "cs"
        console.log "converting ..."
        script = CoffeeScript.compile script,
          bare: "on"
        console.log script
      else if codeloader.getLanguage() == "cjsx"
        console.log ""
        #console.log createScript

      html = ace.edit('html-editor').getSession().getValue()
      dropdownMenu1Sel = $('#dropdownMenu1').parents('.btn-group').find('.dropdown-toggle').text().trim()
      lib = frameworks[dropdownMenu1Sel]
      console.log "lib = #{lib}"
      console.log "dropdownMenu1Sel = #{dropdownMenu1Sel}"
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

    dbclient = new Dropbox.Client
      key: "1kj721jed8kz15x"
    window.dbclient = dbclient
    dbclient.authenticate interactive: true, (error)->
      console.log error

    console.log dbclient.isAuthenticated()
    dsm = dbclient.getDatastoreManager()
    dsm.openDefaultDatastore (error, datastore)->
      if error
        console.log "Error while get DS manager #{error}"
      if datastore
        console.log "Datastore #{datastore}"
        projectsTable = datastore.getTable "projectsTable"
        console.log "projectsTable #{projectsTable}"
        projectsTable.insert
          name: "test"
          data: new Date()

    return