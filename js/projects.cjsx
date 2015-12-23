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

        current: "untitled"
        projects: []

    new: ()->
        myapp = @
        if not myapp.props.codeloader.isEmpty()
            myapp.save()
        myapp.props.codeloader.cleanup()
        myapp.setState
            current: "untitled"

    update: ()->
        myapp = @
        myapp.props.localapi.list (projects)->
            myapp.setState
                projects: projects

    fork: ()->
        return

    save: ()->
        console.log "Saving ..."
        myapp = @
        state = myapp.props.codeloader.getState()
        console.log state
        name = myapp.state.current
        myapp.props.localapi.put name, state, (answer)->
            console.log answer
        myapp.update()
        return

    onNameEdit: (event)->
        myapp = @
        myapp.setState
            current: event.target.value

    render: ->
        myapp = @
        <div>
            Project:<br />
            <input type="text" value={myapp.state.current} onChange={myapp.onNameEdit}/>
            <button onClick={myapp.new}>New</button> <br />
            <button onClick={myapp.fork}>Fork</button> <br />
            <button onClick={myapp.save}>Save</button> <br />

            <ul>
              {for item in @state.projects
                <li><Project name={item} api={@api}/></li>
              }
            </ul>
        </div>

$(document).trigger "MyAppInited", [(api)=>
    React.renderComponent <MyApp localapi={api.localapi} codeloader={api.codeloader}/>, document.getElementById "testpanel"
]