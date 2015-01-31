$("document").ready(function() {
    // Get code from Save URL
    var code = getUrlVars()["code"];
    
    if (code) {
        var decrypted = CryptoJS.AES.decrypt(code, "secret_pass");
        var newCode = decrypted.toString(CryptoJS.enc.Utf8);
        var content = newCode.split("%%");
        
        var css = content[0];
        var script = content[1];
        var html = content[2];
        
        setContent(css, script, html);
        
        var modalSave = $("#modalSave");
        modalSave.find(".modal-body").html(window.location.href);
        modalSave.modal('show');
    }
    
    // RUN Button
    $("#btnRun").click(function(event) {  
        event.preventDefault();
        
        var preview = $("#preview").contents().find("body");
        preview.empty();
        
        preview.append(getContent());
    });
    
    // Preview code on page load
    $("#btnRun").click();
    
    // SAVE Button
    $("#btnSave").click(function(event) {
        event.preventDefault();
        
        var encrypted = CryptoJS.AES.encrypt(getSaveContent(), "secret_pass");
        
        window.location.replace(window.location.protocol  + "//" + window.location.host + "/?code=" + encrypted.toString());
    });
    
    // TIDYUP Button
    $("#btnTidyUp").click(function(event) {
        event.preventDefault();
        
        var html = ace.edit("html-editor").getSession().getValue();
        var html2 = style_html(html);
        
        ace.edit("html-editor").getSession().setValue(html2);
        
        var css = ace.edit("css-editor").getSession().getValue();
        var css2 = css_beautify(css);
        
        ace.edit("css-editor").getSession().setValue(css2);
        
        var js = ace.edit("js-editor").getSession().getValue();
        var js2 = js_beautify(js);
        
        ace.edit("js-editor").getSession().setValue(js2);
    });
    
    // HELPER Functions
    function getContent() {
        var css    = "<style>"  + ace.edit("css-editor").getSession().getValue() + "</style>";
        var script = "<script>" + ace.edit("js-editor").getSession().getValue()  + "</script>";
        var html   =              ace.edit("html-editor").getSession().getValue();
        
        return (css + script + html).toString();
    }
    
    function getSaveContent() {
        var css    = ace.edit("css-editor").getSession().getValue();
        var script = ace.edit("js-editor").getSession().getValue();
        var html   = ace.edit("html-editor").getSession().getValue();
        
        return (css + "%%" + script + "%%" + html).toString();
    }
    
    function setContent(css, script, html) {
        ace.edit("css-editor").getSession().setValue(css);
        ace.edit("js-editor").getSession().setValue(script);
        ace.edit("html-editor").getSession().setValue(html);
    }
    
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        
        return vars;
    }
});