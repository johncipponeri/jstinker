class CodeLoader
  constructor: (@htmlEditor, @cssEditor, @codeEditor, @language)->

  getHTML: ()=>
    codeLoader = @
    codeLoader.htmlEditor.getSession().getValue()

  getCSS: ()=>
    codeLoader = @
    codeLoader.cssEditor.getSession().getValue()

  getCode: ()=>
    codeLoader = @
    codeLoader.codeEditor.getSession().getValue()

  setHTML: (html)=>
    codeLoader = @
    codeLoader.htmlEditor.getSession().setValue(html)
    return

  setCSS: (css)=>
    codeLoader = @
    codeLoader.cssEditor.getSession().setValue(css)
    return

  setCode: (code)=>
    codeLoader = @
    codeLoader.codeEditor.getSession().setValue(code)
    return

  getState: ()=>
    codeLoader = @

    html: codeLoader.getHTML()
    css: codeLoader.getCSS()
    code: codeLoader.getCode()
    codeType: codeLoader.getLanguage()

  setState: (state)=>
    codeLoader = @

    codeLoader.setHTML state.html
    codeLoader.setCSS state.css
    codeLoader.setCode state.code
    return

  isEmpty: ()=>
    codeLoader = @
    state = codeLoader.getState()
    if state.html == "" and state.css == "" and state.code == ""
      return true
    false

  cleanup: ()=>
    codeLoader = @
    codeLoader.setState
      html: ""
      css: ""
      code: ""
    return

  getLanguage: ()=>
    @language

  setLanguage: (language)=>
    @language = language
    return