Project = React.createClass
    getInitialState: ->
        closed: true

    handleClick: ->
        console.log "clicked"
        if @state.closed == true
            #load project ....
            @setState
                closed: false
        else
            @setState
                closed: true

    render: ->
        <div>
            <button onClick={@handleClick}>{@props.name}</button>
        </div>

MyApp = React.createClass
    getInitialState: ->
        myapp = @
        $(document).trigger "MyAppInited", [myapp.setLocalApi]

        woo: 'nah'
        projects: []

    setLocalApi: (api)->
        myapp = @
        api.list (projects)->
            console.log projects
            if projects.status == "Ok"
                myapp.setState
                    api: api
                    projects: projects.projects

    doSomething: ->
        @setState woo: 'yeah'

    render: ->
        <div>
          <h3>Hello, world!</h3>
          <div>Woo {@state.woo}</div>
          <button onClick={@doSomething}>Do something awesome</button>
            <ul>
              {for item in @state.projects
                <li><Project name={item} api={@api}/></li>
              }
            </ul>
        </div>

React.renderComponent <MyApp />, document.getElementById "testpanel"