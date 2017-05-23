# MARQUEE3000

Marquees for the new millenium ✨

Super smooth and versatile javaScript plugin with no dependencies.

👄

Note: Marquees were a bit neglected, no? There are tons,
but they're slow and you can't really do much with them.
So much you can do with the inherently strong typographic
look of em. So this is me trying to update them for 2017.

## Features
- ~3kb minified with no dependencies
- Turn any element into a smooth-as-butter marquee
- Text, images++<sup>*</sup> it'll do it
- Style marquees as usual with CSS– get creative!
- Set speed and direction
- Have a ton without any slowdown
- Responsive!

## Demo
[MARQUEE3000 DEMO MARQUEE3000 DEMO MARQUEE3000 DEMO](https://ezekielaquino.github.io/Marquee3000/)

## Usage

1. Include Marquee3000 in your html file. Download zip or install via `bower install marquee3000` || `npm install marquee3000`

    ```html
        <script src="marquee3k.js"></script>
     ```
        
2. Create an element with a `.marquee3k` class. You can pass different options such as speed, orientation and direction (optional). See below for options.

    ```html
        <div class="marquee3k" 
            data-speed="0.25" → play around here
            data-reverse="bool" → default: R to L / T to B
            data-pausable="bool" → Pause marquee on hover>
            <!--you can even have inline images,
            or any kind of html -->
            <h1>Some marquee content</h2>
        </div>
    ```
        
3. Fill it up with text or images etc. (still finding out what you can do with it)

4. In your js file or `<script>` just call `Marquee3k.init()` and you're all set!

### Options

You can set additional configuration options.

    Marquee3k.init({
        selector: '.selector-name', // define a custom classname
        spacing: '30px' // number + units (rem, etc), space between copies - defaults to 30
    });

Marquee also adds a `is-init` selector. You can use this to add and toggle entrance transitions, for example.


### Questions

**Q: But it's slow, I have 150+ of them on the same page**

A: If you've got literally hundreds of them on one page, you've got
a marquee addiction problem. Contact a internet professional or
buy me a beer, I think we'd get along quite well.

**Q: Does it work on mobile?**

A: Yes it does and it works quite well! If you're going to be rotating
things and all that fancy stuff, just make sure to style it with CSS.

**Q: Can i make a marquee that's position fixed?**

A: Absolutely. You just have to wrap the marquee element inside another
container which gets the `position: fixed`. Namaste.

**Q: Can you make it spin?**

A: Umm, sure. Well you can do anything with it really *Demo coming soon*

**Q: I have more questions, what's your support hotline?**

A: 1-800-MARQUEE or you can just mention me on twitter (@the_ezekiel)

**Q: the callback does not work?

A: You have to pass in only the name of the function (must be defined in global scope). Still currently a very basic implementation. Suggestions welcome!


## Say hi!
The plugin is completely free but I'd love to know if you have used the plugin for something cool! Would love to see what you've made! Drop me a line at ezekielaquino@gmail.com or via @the_ezekiel on Twitter!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
