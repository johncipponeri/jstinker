class LocalApi

  constructor: (@host, @port)->

  list: (callback)=>
    localApi = @
    if callback
      $.ajax
        url: "/list"
        dataType: "json"
        success: (data)->
          callback data
    else
      data = $.ajax
        async: false
        dataType: "json"
        url: "/list"
        success: (data)->
          data = data
          console.log data
          return
      data

    get: (name, callback)=>
      localApi = @
      $.ajax
        dataType: "json"
        url: "/project/#{name}"
        success: (data)->
          callback data


