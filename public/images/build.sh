#!/bin/bash

echo "Creating robot spritesheet..."
rm -rf robot/compiled
mkdir robot/compiled
convert +append robot/idle/*.png robot/compiled/idle.png
convert +append robot/talking/*.png robot/compiled/talking.png
convert -append -resize 80% robot/compiled/*.png images/robot.png

echo "Creating yeti spritesheet..."
rm -rf yeti/compiled
mkdir yeti/compiled
convert +append yeti/idle/*.png yeti/compiled/idle.png
convert +append yeti/talking/*.png yeti/compiled/talking.png
convert -append -resize 30% yeti/compiled/*.png images/yeti.png

echo "Done!"
