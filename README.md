# MARQUEE3000

Marquees for the new millenium ✨

Super smooth and versatile javaScript plugin with no dependencies.

👄

## Features
- ~3kb minified with no dependencies
- Turn any element into a smooth-as-butter marquee
- Text, images++<sup>*</sup> it'll do it
- Style marquees as usual with CSS– get creative!
- Set orientation, speed and direction
- Have hundreds without any slowdown
- Automatically adjusts if window is scaled up
- Marquee only animates if it's in the viewport

<sup>*</sup>we'll find out more

## Demo
[MARQUEE3000 DEMO MARQUEE3000 DEMO MARQUEE3000 DEMO](https://ezekielaquino.github.io/Marquee3000/)

## Usage

1. Include Marquee3000 in your html file.

    ``` html
        <script src="marquee3k.min.js"></script>
        
2. Create an element with a `.marquee3k` class. You can pass different options such as speed, orientation and direction (optional). See below for options.

    ``` html
        <div class="marquee3k" 
            data-speed="60" → speed in pixels/sec (default: 50)
            data-reverse="bool" → default: R to L / T to B
            data-direction="vertical" → horizontal or vertical
            data-delay="2" → Initial pause before animating (in sec)>
            MARQUEE3000
            <!--you can even have inline images,
            or any kind of html -->
            <img src="trumpet.jpg" />
        </div>
        
3. Fill it up with text or images etc. (still finding out what you can do with it)

4. In your js file or `<script>` just call `Marquee3k()` and you're all set!

### Options

You can set additional configuration options.

    ``` js
        Marquee3k({
            selector: '.selector-name', // define a custom classname
            randomSpeed: bool // if true, each marquee will be assigned a random speed between 10-50px/sec
        });

Marquee also adds a `is-ready` selector. You can use this to add and toggle entrance transitions, for example.

### To Do
- Make it play well with type plugins such as lettering.js or some other scripts
- Some basic implementation of callbacks

## Say hi!
The plugin is completely free but I'd love to know if you have used the plugin for something cool! Would love to see what you've made! Drop me a line at ezekielaquino@gmail.com or via @the_ezekiel on Twitter!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
