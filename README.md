# wordHex

Converts inputted word or phrase into hexadecimal color groups. Inspired by
Numberphile's YouTube video on Illegal Numbers. Works wellish (for someone with
a little experience writing in python), probably could be done better.

## Execution

**This program requires GhostScript**

Fairly straight forward, just execute like any other python3 program.

```
python3 wordHex.py
```

User will be prompted to enter a word to convert to hex. Type in word or phrase
(no real limit but after a certain point colors are not visible with current
implementation). After this Turtle will take over and draw each Hexcolor on the
canvas and will write out the extra hexcode that was not 6 characters long if
one exists. Then the user will be prompted if they want to save the canvas
(simple yes/no question). If yes, then the user will be asked to enter a file
name, the canvas will then be saved in a .ps file with that name, if a file with
that name already exists, the old file will be overwritten. This file is then
converted to a .png by gs and then deleted.

## Improvements

If don't end up getting bored with this I'll probably try and improve it myself.
However, on the off chance that someone stumbled upon this, one- what are you
doing here?, and on the even smaller chance that you want to improve on this
system (which probably won't be hard to do), go right ahead. I'm definitely not
the first person to do this, so take it, modify it, make it hundreds of times
better. Just let me know if you do, I want to see where I could have done
something different/better cause its all just about learning and getting better.
