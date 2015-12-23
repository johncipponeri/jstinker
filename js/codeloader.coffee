class CodeLoader
  constructor: (@htmlEditor, @cssEditor, @codeEditor)->

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