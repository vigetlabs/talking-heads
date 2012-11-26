/**
 * @name Cinemagraph
 * @desc A keyframe animation library for canvas with background-image fallback
 */

(function() {

    "use strict";

    var Cinemagraph = window.Cinemagraph = function (canvas, start) {

        var self = this;

        this.current = start || canvas.querySelector("[data-animation]").getAttribute("data-animation");
        this.canvas  = canvas;

        // Set the background of the canvas to the first frame of the sheet in
        // case canvas is not supported
        this.engageFallback();

        // If canvas isn't supported, we'll return -- electing to only show the
        // first frame
        this.canvasSupport = canvas.getContext;

        if (this.canvasSupport) {
            this.fullscreen();
            this.ctx = canvas.getContext('2d');
        }

        this.animations = this.getAnimations();
        this.timestamp  = Date.now();
        this.current_frame = 0;

        this.loadSpritesheet(canvas.getAttribute('data-src'), function() {
            self.play(self.current);
        });

    };

    Cinemagraph.prototype.loadSpritesheet = function(src, callback) {

        var spritesheet = new Image(),
            self = this;

        spritesheet.src = src;

        spritesheet.onload = function() {
            self.src = spritesheet;
            callback();
        };

    };

    Cinemagraph.prototype.engageFallback = function(offsetX, offsetY) {

        var src = this.canvas.getAttribute("data-src");

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        this.canvas.style.background = "transparent url(" + src + ") "
            + offsetX + "px " + offsetY + "px no-repeat";
    };

    Cinemagraph.prototype.fullscreen = function() {
        this.canvas.style.width = (window.innerWidth) + "px";
        this.canvas.style.height = (window.innerHeight) + "px";
    };

    Cinemagraph.prototype.getAnimations = function() {

        var elements = this.canvas.querySelectorAll("[data-animation]"),
            i = 0,
            len = elements.length,
            animations = {},
            current, name, offset;

        for (i; i < len; i++) {

            current = elements[i];
            name    = current.getAttribute("data-animation"),
            offset  = current.getAttribute("data-offset").split(",");

            animations[name] = {
                type      : name,
                frames    : current.getAttribute('data-frames'),
                duration  : current.getAttribute('data-duration'),
                offset    : {
                    x: parseInt(offset[0]),
                    y: parseInt(offset[1])
                }
            };

        }

        return animations;

    };

    Cinemagraph.prototype.update = function() {

        window.requestAnimationFrame(this.update.bind(this));

        var canvas = this.canvas,
            ctx    = this.ctx,
            src    = this.src,
            anim   = this.animations[this.current];

        var frame_length  = anim.duration / anim.frames,
            time_elapsed  = Date.now() - this.timestamp;

        if ( time_elapsed > frame_length) {
            this.current_frame++;
            this.timestamp = Date.now();
        }

        if (this.current_frame > anim.frames) {
            this.current_frame = 0;
        }

        var x = -(anim.offset.x + (canvas.width * this.current_frame)),
            y = -anim.offset.y;

        if (this.canvasSupport) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(src, x, y);
        } else {
            this.engageFallback(x, y);
        }

    };

    Cinemagraph.prototype.play = function (keyframe) {

        if (!this.animations[keyframe]) {
            throw new Error('Animation "' + keyframe + '" does not exist');
        }

        this.timestamp = Date.now();
        this.current = keyframe;

        window.requestAnimationFrame(this.update.bind(this));

    };

}());


/*
 * Polyfills
 */

(function() {

    "use strict";

    // Add canvas to older browsers
    var canvasPolyfill = document.createElement("canvas");

    // Request Animation Frame

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                       timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

}());
