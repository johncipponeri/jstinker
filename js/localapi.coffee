class LocalApi

  constructor: (@host, @port)->

  list: (callback)=>
    localApi = @
    $.ajax
      url: "/list"
      dataType: "json"
      success: (data)->
        console.log "Get data from list request #{data}"
        console.log data
        callback data.projects
    []

  get: (name, callback)=>
    localApi = @
    $.ajax
      method: 'get'
      dataType: "json"
      url: "/project/#{name}"
      success: (data)->
        callback data

  put: (name, state, callback)=>
    localApi = @
    $.ajax
      url: "/project"
      method: 'put'
      type: 'put'
      dataType: "json"
      data:
        name: name
        html: state.html
        css: state.css
        code: state.code
        codeType: state.codeType
      success: (data)->
        callback data


