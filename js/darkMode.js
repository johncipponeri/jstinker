function switchTheme () {
    if (document.getElementById('dark-theme').checked === true) {
        let darkCss = document.createElement('link');

        darkCss.setAttribute('rel', 'stylesheet');
        darkCss.setAttribute('type', 'text/css');
        darkCss.setAttribute('href', 'css/darkmode.css');
        darkCss.setAttribute('id', 'dark-css-link');
        
        document.head.appendChild(darkCss);
    } else {
        document.getElementById('dark-css-link').remove();
    }
}