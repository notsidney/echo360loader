const url = document.getElementsByTagName('iframe')[0]
    .getAttribute('src')
    .replace('echo.htm', 'echo_files/echo_ipad.htm')
    .replace(/https/g, 'http');
location.href = url;
