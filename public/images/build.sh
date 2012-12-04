#!/bin/bash

echo "Creating robot spritesheet..."
rm -rf robot/compiled
mkdir robot/compiled
convert +append robot/idle/*.png robot/compiled/idle.png
convert +append robot/talking/*.png robot/compiled/talking.png
convert -append -resize 80% robot/compiled/*.png robot.png

echo "Creating yeti spritesheet..."
rm -rf yeti/compiled
mkdir yeti/compiled
convert +append yeti/idle/*.png yeti/compiled/idle.png
convert +append yeti/talking/*.png yeti/compiled/talking.png
convert -append -resize 30% yeti/compiled/*.png yeti.png

echo "Creating reindeer spritesheet..."
rm -rf rudy/compiled
mkdir rudy/compiled
convert +append rudy/idle/*.png rudy/compiled/idle.png
convert +append rudy/talking/*.png rudy/compiled/talking.png
convert -append -resize 30% rudy/compiled/*.png rudy.png

echo "Done!"
