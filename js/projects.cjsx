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
        $(document).trigger "MyAppInited", [myapp.setApi]

        current: "untitled"
        projects: []

    setApi: (api)->
        myapp = @
        myapp.setState
            localapi: api.localapi
            codeloader: api.codeloader
            projects: api.localapi.list (projects)->
                myapp.setState
                    projects: projects

    new: ()->
        return

    fork: ()->
        return

    save: ()->
        return

    render: ->
        <div>
            Project:<br />
            <input type="text" />
            <button>New</button> <br />
            <button>Fork</button> <br />
            <button>Save</button> <br />

            <ul>
              {for item in @state.projects
                <li><Project name={item} api={@api}/></li>
              }
            </ul>
        </div>

React.renderComponent <MyApp />, document.getElementById "testpanel"