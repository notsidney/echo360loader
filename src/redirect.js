const iframe = document.getElementsByTagName('iframe')[0];
let url = iframe.getAttribute('src')
    .replace('echo.htm', 'echo_files/echo_ipad.htm')
    .replace('https', 'http');
location.href = url;
