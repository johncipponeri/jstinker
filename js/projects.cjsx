Project = React.createClass
    getInitialState: ->
        indexes: @getIndexes()
        opened: false

    getIndexes: ->
        project = @
        @props.localapi.get @props.name, (data)->
            project.setState
                indexes: data.history
        []

    handleClick: ->
        console.log "clicked"
        project = @
        if not project.state.opened
            @props.opener()
            project.setState
                opened: true
        else
            project.setState
                opened: false
        return

    getIndexOpener: (index)->
        project = @
        ()->
            project.props.opener(index)
            return

    render: ->
        <div>
            <button onClick={@handleClick}>{@props.name}</button>
            {if @state.opened == true
                <ul>
                    {for indexValue, index in @state.indexes
                        <li>
                            <button onClick={@getIndexOpener(index)}>
                                {indexValue}
                            </button>
                        </li>
                    }
                </ul>
            }
        </div>

DropBoxProject = React.createClass

    selectHandler: ->
        dropBoxProject = @
        dropBoxProject.props.opener()

    render: ->
        dropBoxProject = @
        <div>
            <button onClick={dropBoxProject.selectHandler}>{dropBoxProject.props.name}</button>
        </div>

MyApp = React.createClass
    getInitialState: ->
        myapp = @

        myapp.update()

        current: "untitled"
        projects: []
        dropboxprojects: []

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

    open: (name, lastIndex)->
        myapp = @
        console.log "Opening ... #{name}"
        #myapp.save()
        myapp.props.localapi.get name, (data)->
            console.log "Data is :"
            console.log data
            lastIndex ?= data.history.length-1
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
        (lastIndex)->
            myapp.open(name, lastIndex)
            return

    update: ()->
        myapp = @
        console.log "updating projects list ..."
        myapp.props.localapi.list (projects)->
            console.log "projects were gotten...#{projects.length}"
            myapp.setState
                projects: projects
        if myapp.props.hasDropBox == true
            console.log "getting dropbox projects"
            myapp.props.dropboxapi.list (projects)->
                console.log "dbprojects were gotten ... #{projects.length}"
                console.log projects
                myapp.setState
                    dropboxprojects: projects
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

    saveToDropBox: ()->
        console.log "Saving to DropBox ..."
        myapp = @
        state = myapp.props.codeloader.getState()
        name = myapp.state.current
        if name == "untitled"
            alert "Error - need to name a project"
            return
        myapp.props.dropboxapi.put name, state, (answer)->
            console.log answer
            myapp.update()
            return
        return

    getDropBoxOpener: (name)->
        console.log "Opening dropbox project #{name}"
        myapp = @
        ()->
            myapp.new()
            state = myapp.props.dropboxapi.get name
            myapp.props.codeloader.setState state
            myapp.setState
                current: name

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
            <button onClick={myapp.save}>Save</button>
            {if myapp.props.hasDropBox == true
                <button onClick={myapp.saveToDropBox}>Save to DropBox</button>
            }
            <br/>
            <ul>
              {for item in myapp.state.projects
                <li><Project
                    name={item}
                    localapi={myapp.props.localapi}
                    codeloader={myapp.props.codeloader}
                    opener={myapp.getOpener(item)}
                /></li>
              }
              {if myapp.props.hasDropBox
                  for item in myapp.state.dropboxprojects
                        <li><DropBoxProject name={item} opener={myapp.getDropBoxOpener(item)}/></li>
              }
            </ul>
        </div>

$(document).trigger "MyAppInited", [(api)=>
    React.renderComponent <MyApp localapi={api.localapi} codeloader={api.codeloader} hasDropBox={api.hasDropBox} dropboxapi={api.dropboxapi}/>, document.getElementById "testpanel"
]