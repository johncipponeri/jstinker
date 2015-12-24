Project = React.createClass
    getInitialState: ->
        {}

    handleClick: ->
        console.log "clicked"
        @props.opener()
        return


    render: ->
        <div>
            <button onClick={@handleClick}>{@props.name}</button>
        </div>

MyApp = React.createClass
    getInitialState: ->
        myapp = @

        myapp.update()

        current: "untitled"
        projects: []

    new: ()->
        myapp = @
        if not myapp.props.codeloader.isEmpty()
            $.confirm
                title: "save project changes?"
                confirm: ()->
                    myapp.save()
                    return

        myapp.props.codeloader.cleanup()
        myapp.setState
            current: "untitled"

    open: (name)->
        myapp = @
        console.log "Opening ... #{name}"
        myapp.save()
        myapp.props.localapi.get name, (data)->
            console.log "Data is :"
            console.log data
            lastIndex = data.history.length-1
            newState = {
                html: data.html[lastIndex]
                css: data.css[lastIndex]
                code: data.script[lastIndex].script
            }
            console.log newState
            myapp.props.codeloader.setState newState
            myapp.setState
                current: name
            console.log "was set"
            return
        return

    getOpener: (name)->
        myapp = @
        ()->
            myapp.open(name)
            return

    update: ()->
        myapp = @
        console.log "updating projects list ..."
        myapp.props.localapi.list (projects)->
            console.log "projects were gotten...#{projects.length}"
            myapp.setState
                projects: projects
        []

    fork: ()->
        myapp = @
        name = prompt "Forking project", "Enter new name"
        state = myapp.props.codeloader.getState()
        myapp.props.localapi.put name, state, (answer)->
            console.log answer
            if answer.status == "Ok"
                myapp.setState
                    current: name
                    projects: myapp.update()

        return

    save: ()->
        console.log "Saving ..."
        myapp = @
        state = myapp.props.codeloader.getState()
        console.log state
        name = myapp.state.current
        if name == "untitled"
            $.confirm
                title: "project name was not set"
                content: "Keep the project name untitled ?"
                confirm: ()->
                    myapp.props.localapi.put name, state, (answer)->
                        console.log answer
                        myapp.update()
                        return
            return
        myapp.props.localapi.put name, state, (answer)->
            console.log answer
            myapp.update()
            return
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
            <button onClick={myapp.new}>New</button>
            <button onClick={myapp.fork}>Fork</button>
            <button onClick={myapp.save}>Save</button> <br />

            <ul>
              {for item in @state.projects
                <li><Project name={item} opener={myapp.getOpener(item)}/></li>
              }
            </ul>
        </div>

$(document).trigger "MyAppInited", [(api)=>
    React.renderComponent <MyApp localapi={api.localapi} codeloader={api.codeloader}/>, document.getElementById "testpanel"
]