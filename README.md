  jbarcode 
-----------------------------------------------

This plugin allow to catching barcode inputs without focusing any text area on your website and if a text element is already focused, this plugin prevents input characters, after the input sequence is finished, calls a function that you give to it!

Visit plugin home page: http://veysiertekin.github.io/jbarcode

<a href="https://plus.google.com/+VeysiErtekin?rel=author">&nbsp;</a>

## What is this for?

Imagine that you have a store (grocery, computer parts etc), and you have a barcode reader machine (like [Barcode Scanners - Amazon](https://www.amazon.co.uk/Barcode-Scanners/b?ie=UTF8&node=13017221) ).

Basically after you have added this plugin into your website and you have scanned a barcode with barcode scanner, it will catch the changes and trigger a function.

No matter focussed on a text field or not! It will detect barcode input from speed of the key inputs. If it decides that is a barcode reader input it will not paste on the text field even if it focussed! 

Barcode scanners basically are keyboard inputs, but they type faster than a humans!

## How it distinguish keyboard input from humans?

It uses a computer algorithm used in CPUs - [Branch Prediction](https://en.wikipedia.org/wiki/Branch_predictor). If input is a different source (branch) by tracking  changes, it activates another functionality.
