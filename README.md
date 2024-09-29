# Commands used for "FFmpeg"


## Inspecting with ffprobe
```
ffprobe seagull.mp4
ffprobe -v error seagull.mp4 -show_format
ffprobe -v error seagull.mp4 -show_format -show_streams
ffprobe -v error seagull.mp4 -show_format -show_streams -print_format json
ffprobe -v error seagull.mp4 -show_streams -select_streams v
ffprobe -v error seagull.mp4 -show_streams -select_streams v -show_entries stream=codec_name
ffprobe -v error seagull.mp4 -select_streams v -show_entries stream=codec_name
ffprobe -v error seagull.mp4 -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1:nokey=1
ffprobe -v error seagull.mp4 -show_entries format=format_long_name -print_format default=noprint_wrappers=1:nokey=1
ffprobe -v error https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4 -show_format -show_streams -print_format json
```

## Playing with ffplay
```
ffplay -v error bullfinch.mp4
ffplay -v error bullfinch.mp4 -x 600 -y 600
ffplay -v error bullfinch.mp4 -x 600 -y 600 -noborder
ffplay -v error bullfinch.mp4 -y 600 -noborder
ffplay -v error bullfinch.mp4 -y 600 -noborder -top 0 -left 0
ffplay -v error bullfinch.mp4 -y 600 -noborder -fs
ffplay -v error bullfinch.mp4 -y 600 -noborder -an
ffplay -v error bullfinch.mp4 -y 600 -noborder -vn
ffplay -v error bullfinch.mp4 -y 600 -noborder -vn -showmode waves
ffplay -v error bullfinch.mp4 -y 600 -noborder -loop 0
ffplay -v error birds-forest.ogg -showmode waves
ffplay -v error kingfisher.jpg
ffplay -v error https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4 -noborder -y 600 
```

## Inputs and Outputs
```
ffmpeg -protocols
ffmpeg -devices
ffmpeg -formats
```

## Stream Selection
```
ffprobe multitrack.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 -map 0 multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 -map 0:v multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 -map 0:0 multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 -map 0:a multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -to 1 -map 0:a:0 multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
ffmpeg -v error -y -i multitrack.mp4 -i second-input.mp4 -to 1 -map 1:v:0 -map 0:a:1 multitrack-1s.mp4
ffprobe multitrack-1s.mp4 -v error -show_format -show_streams -print_format json
```

## Filter Graphs
```
ffmpeg -v error -y -i bullfinch.mp4 -vf "split[bg][ol];[bg]scale=width=1920:height=1080,format=gray[bg_out];[ol]scale=-1:480,hflip[ol_out];[bg_out][ol_out]overlay=x=W-w:y=(H-h)/2" ol.mp4
ffplay -v error ol.mp4
ffmpeg -y -i four_channel_stream.wav -af "asplit=2[voice][bg];[voice]volume=volume=2,pan=mono|c0=c0+c1[voice_out];[bg]volume=volume=0.5,pan=mono|c0=c2+c3[bg_out];[voice_out][bg_out]amerge=inputs=2" audio_out.wav
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -filter_complex "[1:v]scale=-1:200[small_logo];[0:v][small_logo]overlay=x=W-w-50:y=H-h-50,split=2[sd_in][hd_in];[sd_in]scale=-2:480[sd];[hd_in]scale=-2:1080[hd];[0:a]pan=stereo|FL=c0+c2|FR=c1+c3[stereo_mix]" -map "[sd]" sd.mp4 -map "[hd]" hd.mp4 -map "[stereo_mix]" stereo_mix.mp3
```
## Encoding Basics
```
ffprobe -v error bullfinch.mov -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov transcoded.mxf
ffprobe -v error transcoded.mxf -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov transcoded.mp4
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 transcoded.mxf
ffprobe -v error transcoded.mxf -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffmpeg -encoders
ffmpeg -v error -y -i bullfinch.mov -vcodec libvpx-vp9 transcoded.mxf
ffmpeg -v error -y -i bullfinch.mov -vcodec libvpx-vp9 transcoded.mp4
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffprobe -v error transcoded.mp4 -select_streams a -show_entries stream=codec_name -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov -vcodec libvpx-vp9 -acodec libmp3lame transcoded.mp4
ffprobe -v error transcoded.mp4 -select_streams a -show_entries stream=codec_name -print_format default=noprint_wrappers=1
```

## H.264 / AVC
```
ffprobe -v error bullfinch.mov -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 transcoded.mp4 
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
ffplay -v error -an transcoded.mp4
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -crf 10 transcoded.mp4 
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
ffplay -v error -an transcoded.mp4
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -crf 45 transcoded.mp4 
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
ffplay -v error -an transcoded.mp4
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -b:v 2M transcoded.mp4
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -b:v 2M -pass 1 -f null /dev/null
ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -b:v 2M -pass 2 transcoded.mp4
ffprobe -v error transcoded.mp4 -select_streams v -show_entries stream=codec_name,bit_rate -print_format default=noprint_wrappers=1
time ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 transcoded.mp4
du -sh transcoded.mp4
time ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -preset ultrafast transcoded.mp4
du -sh transcoded.mp4
time ffmpeg -v error -y -i bullfinch.mov -vcodec libx264 -preset slow transcoded.mp4
du -sh transcoded.mp4
```

## Streaming

File: unstreamable.mp4

Description: Same as nature.mp4. Non-fast-started.

Apache httpd.conf configuration for this file:
<Files "unstreamable.mp4">
  # Non-fast-started
  RequestHeader unset Range
</Files>

--
File: unseekable.mp4

Description: Can be generated from nature.mp4 by fast-starting it with the following command -
ffmpeg -y -i nature.mp4 -movflags +faststart -c copy unseekable.mp4

Apache httpd.conf configuration for this file:
```
<Files "unseekable.mp4">
  ## Fast-started
  RequestHeader unset Range
  Header unset "Accept-Ranges"
  Header always set "Accept-Ranges" "none"
</Files>
```
File: pseudo-seekable.mp4

Description: Can be generated from nature.mp4 by fast-starting it with the following command -
ffmpeg -y -i nature.mp4 -movflags +faststart -c copy pseudo-seekable.mp4

Apache httpd.conf configuration for this file:
```
<Files "pseudo-seekable.mp4">
  ## Fast-started
  RequestHeader unset Range
</Files>
```
--
File: random-seekable.mp4

Description: Can be generated from nature.mp4 by fast-starting it with the following command -
ffmpeg -y -i nature.mp4 -movflags +faststart -c copy random-seekable.mp4

Apache httpd.conf configuration for this file:
```
<Files "random-seekable.mp4">
  ## Fast-started
  ## No extra configuration needed
</Files>
```
--
File: adaptive.m3u8 (and related files)

Description: Can be generated from nature.mp4 with the following command -
ffmpeg.exe -y -i nature.mp4 -filter_complex "[0:v]split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" -map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a -map 0:a -map 0:a -b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k -b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k -b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k -b:a:0 128k  -b:a:1 128k  -b:a:2 128k -x264-params "keyint=60:min-keyint=60:scenecut=0"  -var_stream_map "v:0,a:0,name:720p-4M v:1,a:1,name:480p-2M v:2,a:2,name:240p-500k" -hls_list_size 0 -hls_time 2 -hls_segment_filename adaptive-%v-%03d.ts -master_pl_name adaptive.m3u8 adaptive-%v.m3u8

Apache httpd.conf configuration for this file:
```
<Files "adaptive.m3u8">
  ## No extra configuration needed
</Files>
```

## Streaming Protocols

ffplay -v quiet -y 200 "<the-http-url>"

ffmpeg -v quiet -i "<the-http-url>" -vf "scale=-2:200,drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=RTMP:fontsize=30:x=10:y=20:fontcolor=#000000:box=1:boxborderw=5:boxcolor=#ff888888" -vcodec libx264 -f flv rtmp://localhost:1935/live/rtmpdemo

ffplay -v quiet rtmp://localhost:1935/live/rtmpdemo

ffmpeg -v quiet -i rtmp://localhost:1935/live/rtmpdemo -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=SRT:fontsize=30:x=10:y=60:fontcolor=#000000:box=1:boxborderw=5:boxcolor=#ff888888" -vcodec libx264 -f mpegts srt://localhost:1935?streamid=input/live/srtdemo

ffplay -v quiet srt://localhost:1935?streamid=output/live/srtdemo

ffmpeg -v quiet -i srt://localhost:1935?streamid=output/live/srtdemo -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=HTTP:fontsize=30:x=10:y=100:fontcolor=#000000:box=1:boxborderw=5:boxcolor=#ff888888" -vcodec libx264 -f dash -method PUT http://localhost/live/httpdemo.mpd

ffplay -v quiet http://localhost/live/httpdemo.mpd


## Progressive Download

File: seekable-no-fast-started-no.mp4

Description: Same as nature.mp4. Non-fast-started.

Apache httpd.conf configuration for this file:
```
<Files "seekable-no-fast-started-no.mp4">
  RequestHeader unset Range
  Header set "Accept-Ranges" "none"
</Files>
```

File: seekable-no-fast-started-yes.mp4

Description: Can be generated from nature.mp4 by fast-starting it with the following command -
ffmpeg -y -i nature.mp4 -movflags +faststart -c copy seekable-no-fast-started-yes.mp4

Apache httpd.conf configuration for this file:
```
<Files "seekable-no-fast-started-yes.mp4">
  RequestHeader unset Range
  Header set "Accept-Ranges" "none"
</Files>
```
File: seekable-yes-fast-started-no.mp4

Description: Same as nature.mp4. Non-fast-started.

Apache httpd.conf configuration for this file:
```
<Files "seekable-yes-fast-started-no.mp4">
  ## No extra configuration needed
</Files>
``
--
File: seekable-yes-fast-started-yes.mp4

Description: Can be generated from nature.mp4 by fast-starting it with the following command -
ffmpeg -y -i nature.mp4 -movflags +faststart -c copy seekable-yes-fast-started-yes.mp4

Apache httpd.conf configuration for this file:
```
<Files "seekable-yes-fast-started-yes.mp4">
  ## No extra configuration needed
</Files>
```
ffmpeg -f lavfi -i testsrc=duration=5 test.mp4
ffmpeg -v trace -i test.mp4
ffmpeg -v trace -i test.mp4 2>&1 | grep -e type:\'mdat\' -e type:\'moov\'
ffmpeg -i test.mp4 -movflags +faststart -c copy test-fast-started.mp4
ffmpeg -v trace -i test-fast-started.mp4 2>&1 | grep -e type:\'mdat\' -e type:\'moov\'
ffmpeg -y -f lavfi -i testsrc=duration=5 -movflags +faststart test-2.mp4
ffmpeg -v trace -i test-2.mp4 2>&1 | grep -e type:\'mdat\' -e type:\'moov\'



## Adaptive Streaming

ffprobe -v error seekable-yes-fast-started-yes.mp4 -print_format default=noprint_wrappers=1:nokey=1 -show_entries format=bit_rate
File: adaptive.m3u8 (and related files)

Description: Can be generated from nature.mp4 with the following command -
ffmpeg.exe -y -i nature.mp4 -filter_complex "[0:v]split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" -map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a -map 0:a -map 0:a -b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k -b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k -b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k -b:a:0 128k  -b:a:1 128k  -b:a:2 128k -x264-params "keyint=60:min-keyint=60:scenecut=0"  -var_stream_map "v:0,a:0,name:720p-4M v:1,a:1,name:480p-2M v:2,a:2,name:240p-500k" -hls_list_size 0 -hls_time 2 -hls_segment_filename adaptive-%v-%03d.ts -master_pl_name adaptive.m3u8 adaptive-%v.m3u8



## HLS & DASH with FFmpeg

HLS, TS, A+V:
ffmpeg.exe -y -i ../nature.mp4 -to 10 \
-filter_complex "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" \
-map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a -map 0:a -map 0:a \
-b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k \
-b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k \
-b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k \
-b:a:0 128k \
-b:a:1 96k \
-b:a:2 64k \
-x264-params "keyint=60:min-keyint=60:scenecut=0" \
-var_stream_map "v:0,a:0,name:720p-4M v:1,a:1,name:480p-2M v:2,a:2,name:240p-500k" \
-hls_time 2 \
-hls_list_size 0 \
-hls_segment_filename adaptive-%v-%03d.ts \
-master_pl_name adaptive.m3u8 \
adaptive-%v.m3u8 

## HLS, TS:

ffmpeg.exe -y -i ../nature.mp4 -to 10 \
-filter_complex "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" \
-map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a \
-b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k \
-b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k \
-b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k \
-b:a:0 128k \
-x264-params "keyint=60:min-keyint=60:scenecut=0" \
-var_stream_map "a:0,agroup:a128,name:audio-128k v:0,agroup:a128,name:720p-4M v:1,agroup:a128,name:480p-2M v:2,agroup:a128,name:240p-500k" \
-hls_time 2 \
-hls_list_size 0 \
-hls_segment_filename adaptive-%v-%03d.ts \
-master_pl_name adaptive.m3u8 \
adaptive-%v.m3u8 

## HLS, fMP4:
ffmpeg.exe -y -i ../nature.mp4 -to 10 \
-filter_complex "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" \
-map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a \
-b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k \
-b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k \
-b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k \
-b:a:0 128k \
-x264-params "keyint=60:min-keyint=60:scenecut=0" \
-var_stream_map "a:0,agroup:a128,name:audio-128k v:0,agroup:a128,name:720p-4M v:1,agroup:a128,name:480p-2M v:2,agroup:a128,name:240p-500k" \
-hls_segment_type fmp4 \
-hls_time 2 \
-hls_list_size 0 \
-hls_fmp4_init_filename adaptive-%v-init.m4s \
-hls_segment_filename adaptive-%v-%03d.m4s \
-master_pl_name adaptive.m3u8 \
adaptive-%v.m3u8 


## DASH, fMP4:
ffmpeg.exe -y -i ../nature.mp4 -to 10 \
-filter_complex "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" \
-map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a \
-b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k \
-b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k \
-b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k \
-b:a:0 128k \
-x264-params "keyint=60:min-keyint=60:scenecut=0" \
-seg_duration 2 \
adaptive.mpd


## HLS+DASH, fMP4:
ffmpeg.exe -y -i ../nature.mp4 -to 10 \
-filter_complex "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]" \
-map "[720_out]" -map "[480_out]" -map "[240_out]" -map 0:a \
-b:v:0 3500k -maxrate:v:0 3500k -bufsize:v:0 3500k \
-b:v:1 1690k -maxrate:v:1 1690k -bufsize:v:1 1690k \
-b:v:2 326k -maxrate:v:2 326k -bufsize:v:2 326k \
-b:a:0 128k \
-x264-params "keyint=60:min-keyint=60:scenecut=0" \
-hls_playlist 1 \
-hls_master_name adaptive.m3u8 \
-seg_duration 2 \
adaptive.mpd

## Trimming

ffmpeg -y -v error -i nature.mp4 -ss 00:03:55.000 -to 240.0 squirrel.mp4 
ffmpeg -y -v error -i nature.mp4 -ss 00:03:55.000 -t 5 squirrel2.mp4 

## Merging

vim list.txt
file 'bullfinch-5s.mp4'
file 'seagull-5s.mp4'
file 'squirrel.mp4'
ffmpeg -y -v error -f concat -i list.txt merged.mp4

## Generating Thumbnails

ffmpeg -v error -i bullfinch.mp4 -vframes 1 bullfinch-poster-frame.jpg
ffprobe bullfinch-poster-frame.jpg -v error -select_streams v -show_entries stream=width,height
ffmpeg -v error -i bullfinch.mp4 -vframes 1 -vf scale=320:180 bullfinch-thumbnail.jpg
ffprobe bullfinch-thumbnail.jpg -v error -select_streams v -show_entries stream=width,height
ffmpeg -v error -i bullfinch.mp4 -ss 5 -vframes 1 -vf scale=320:180 bullfinch-thumbnail-at-5s.jpg
ffmpeg -v error -i bullfinch.mp4 -vf fps=1,scale=320:180 bullfinch-thumbnail-%02d.jpg
ls

## Scaling

ffplay -v error cow_4k.mp4 -an
ffprobe cow_4k.mp4 -v error -select_streams v -show_entries stream=width,height
ffmpeg -v error -y -i cow_4k.mp4 -vf scale=1280:720 cow_720p.mp4
ffprobe cow_720p.mp4 -v error -select_streams v -show_entries stream=width,height
ffplay -v error cow_720p.mp4 -an
ffmpeg -v error -y -i cow_4k.mp4 -vf scale=640:480 cow_480p.mp4
ffplay -v error cow_480p.mp4 -an
ffmpeg -v error -y -i cow_4k.mp4 -vf scale=-1:480 cow_480_aspect_preserved.mp4
ffmpeg -v error -y -i cow_4k.mp4 -vf scale=-2:480 cow_480_aspect_preserved.mp4
ffprobe -v error cow_480_aspect_preserved.mp4 -v error -select_streams v -show_entries stream=width,height 
ffplay -v error cow_480_aspect_preserved.mp4 -an
ffmpeg -v error -y -i cow_4k.mp4 -vf scale=640:480:force_original_aspect_ratio=decrease cow_480_aspect_forced.mp4
ffprobe -v error cow_480_aspect_forced.mp4 -v error -select_streams v -show_entries stream=width,height 
ffmpeg -v error -y -i cow_4k.mp4 -vf "scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2" cow_480_aspect_forced_and_padded.mp4
ffplay -v error cow_480_aspect_forced_and_padded.mp4 -an


## Overlay

ffplay bullfinch.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -filter_complex "overlay" out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -filter_complex "overlay=x=main_w-overlay_w-50:y=50" out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -filter_complex "[1:v]colorchannelmixer=aa=0.4[transparent_logo];[0:v][transparent_logo]overlay=x=main_w-overlay_w-50:y=50" out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -filter_complex "[1:v]scale=-1:100[smaller_logo];[0:v][smaller_logo]overlay=x=main_w-overlay_w-50:y=50"  out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -i tux.png -filter_complex "[1:v]scale=-1:100[smaller_logo];[0:v][smaller_logo]overlay=x=main_w-overlay_w-50:y=50[after_one_logo];[after_one_logo][2:v]overlay=W-w-50:H-h-50" out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875
ffmpeg -v error -y -i bullfinch.mp4 -i ffmpeg-logo.png -i squirrel.mp4 -filter_complex "[1:v]scale=-1:100[smaller_logo];[0:v][smaller_logo]overlay=x=main_w-overlay_w-50:y=50[after_one_logo];[2:v]scale=-1:400[smaller_squirrel];[after_one_logo][smaller_squirrel]overlay=W-w-50:H-h-50" out.mp4 && ffplay out.mp4 -v error -an -top 0 -y 875


## Drawing Text or Timecode

ffplay bullfinch.mp4 -v error -an -top 240 -y 835
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=48:x=100:y=100"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=h/2:x=(w-text_w)/2:y=(h-text_h)/2"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=h/2:x=(w-text_w)/2:y=(h-text_h)/2:fontcolor=green"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=h/2:x=(w-text_w)/2:y=(h-text_h)/2:fontcolor=#000000AA"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=h/2:x=(w-text_w)/2:y=(h-text_h)/2:fontcolor=#000000AA:enable='between(t,1,3)'"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=Birds:fontsize=h/2:x=(w-text_w)/2:y=(h-t*200):fontcolor=#000000AA"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=:fontsize=60:x=(w-text_w)/2:y=(h-100):fontcolor=#000000:timecode='10\:00\:00\:00':rate=30000/1001"
ffplay bullfinch.mp4 -v error -an -top 240 -y 835 -vf "drawtext=fontfile='c\:/Windows/Fonts/courbd.ttf':text=:fontsize=60:x=(w-text_w)/2:y=(h-100):fontcolor=#000000:timecode='10\:00\:00\:00':rate=30000/1001:box=1:boxborderw=15:boxcolor=#ffffff44"

## Separating Channels

ffprobe -v error two-stereo-tracks.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -y -v error -i two-stereo-tracks.m4a -filter_complex "amerge=inputs=2" four-channels-one-stream.m4a
ffprobe -v error four-channels-one-stream.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -y -v error -i two-stereo-tracks.m4a -filter_complex "amerge=inputs=2,asplit=4[all0][all1][all2][all3];[all0]pan=mono|c0=c0[ch0];[all1]pan=mono|c0=c1[ch1];[all2]pan=mono|c0=c2[ch2];[all3]pan=mono|c0=c3[ch3]" -map "[ch0]" ch0.m4a -map "[ch1]" ch1.m4a -map "[ch2]" ch2.m4a -map "[ch3]" ch3.m4a
ffprobe -v error ch0.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json


## Mixing Channels

ffprobe -v error ch0.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -v error -y -i ch0.m4a -i ch1.m4a -i ch2.m4a -i ch3.m4a -filter_complex "amerge=inputs=4" one-stream-four-channels.m4a
ffprobe -v error one-stream-four-channels.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -v error -y -i ch0.m4a -i ch1.m4a -i ch2.m4a -i ch3.m4a -filter_complex "amix=inputs=4" one-stream-one-channel.m4a
ffprobe -v error one-stream-one-channel.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -v error -y -i ch0.m4a -i ch1.m4a -i ch2.m4a -i ch3.m4a -filter_complex "amerge=inputs=4,pan=mono|c0=c0+c1+c2+c3" pan-mono.m4a
ffprobe -v error pan-mono.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
ffmpeg -v error -y -i ch0.m4a -i ch1.m4a -i ch2.m4a -i ch3.m4a -filter_complex "amerge=inputs=4,pan=mono|c0=0.5*c0+2*c1+0.5*c2+2*c3" pan-mono-weighted.m4a
ffmpeg -v error -y -i ch0.m4a -i ch1.m4a -i ch2.m4a -i ch3.m4a -filter_complex "amerge=inputs=4,pan=stereo|FL=c0+c2|FR=c1+c3" pan-stereo.m4a
ffprobe -v error pan-stereo.m4a -select_streams a -show_entries stream=index,codec_name,channels -print_format json
