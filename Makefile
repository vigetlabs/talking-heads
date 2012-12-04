all:
	make robot
	make yeti
	make reindeer

robot:
	echo "Creating robot spritesheet..."
	rm -rf public/images/robot/compiled
	mkdir public/images/robot/compiled
	convert +append public/images/robot/idle/*.png public/images/robot/compiled/idle.png
	convert +append public/images/robot/talking/*.png public/images/robot/compiled/talking.png
	convert -append -resize 80% public/images/robot/compiled/*.png public/images/robot.png
	echo "Done!"

yeti:
	echo "Creating yeti spritesheet..."
	rm -rf public/images/yeti/compiled
	mkdir public/images/yeti/compiled
	convert +append public/images/yeti/idle/*.png public/images/yeti/compiled/idle.png
	convert +append public/images/yeti/talking/*.png public/images/yeti/compiled/talking.png
	convert -append -resize 30% public/images/yeti/compiled/*.png public/images/yeti.png
	echo "Done!"

reindeer:
	echo "Creating reindeer spritesheet..."
	rm -rf public/images/rudy/compiled
	mkdir public/images/rudy/compiled
	convert +append public/images/rudy/idle/*.png public/images/rudy/compiled/idle.png
	convert +append public/images/rudy/talking/*.png public/images/rudy/compiled/talking.png
	convert -append -resize 35% public/images/rudy/compiled/*.png public/images/rudy.png
	echo "Done!"

default:
	make all
