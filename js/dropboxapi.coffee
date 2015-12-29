
class DropBoxApi

  constructor: (@datastore)->

  list: (callback)=>
    dropBoxApi = @

    projectsTable = dropBoxApi.datastore.getTable "projects"

    projects = projectsTable.query()

    results = []

    for project in projects
      results.push project.get('name')

    console.log projects
    console.log results

    if callback
      callback results
    else
      results

  get: (name, callback)=>
    dropBoxApi = @

    codeTable = dropBoxApi.datastore.getTable "code"

    code = codeTable.query name: name
    code = code[0]

    code = html: (code.get 'html'), css: (code.get 'css'), code: (code.get 'code')

    if callback
      callback code
    else
      code

  put: (name, state, callback)=>

    dropBoxApi = @

    projectsTable = dropBoxApi.datastore.getTable "projects"
    codeTable = dropBoxApi.datastore.getTable "code"

    if (projectsTable.query name: name).length == 0
      projectsTable.insert name: name

    codeRecord = codeTable.query name: name
    if codeRecord.length > 0
      codeRecord[0].deleteRecord()

    newrecord = codeTable.insert
      name: name
      html: state.html
      css: state.css
      code: state.code
      codeType: state.codeType
      date: new Date()

    if callback
      callback newrecord
    else
      return newrecord