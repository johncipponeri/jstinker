class LocalApi

  constructor: (@host, @port)->

  list: (callback)=>
    localApi = @
    $.ajax
      url: "/list"
      dataType: "json"
      success: (data)->
        callback data
    []

    get: (name, callback)=>
      localApi = @
      $.ajax
        dataType: "json"
        url: "/project/#{name}"
        success: (data)->
          callback data


