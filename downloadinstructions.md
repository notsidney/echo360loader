# Downloading an M3U8 stream using ffmpeg
1. Copy the playlist link below the video

2. Download ffmpeg

    a. Windows: http://adaptivesamples.com/how-to-install-ffmpeg-on-windows

    b. macOS, using Homebrew: `brew install ffmpeg`

    c. Linux: Use your package manager of choice

3. Open a command line and use this command, replacing `PLAYLIST URL`:

    ```ffmpeg -i "PLAYLIST URL" -c copy -bsf:a aac_adtstoasc "output.mp4"```
