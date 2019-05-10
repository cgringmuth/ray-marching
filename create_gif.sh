#!/usr/bin/env bash

# src: https://askubuntu.com/a/837574/169671

vid="vid.mp4"

# sudo apt-get install ffmpeg imagemagick

ffmpeg -i $vid -vf scale=400:-1 -r 10 -f image2pipe -vcodec ppm - | \
  convert -delay 5 -loop 0 - output.gif