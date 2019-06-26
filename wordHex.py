import turtle
import subprocess
import os
# dictionary of 4 digit binary numbers and their hex equivalent
hex_keys = {
    "0000":"0","0001":"1","0010":"2","0011":"3","0100":"4","0101":"5","0110":"6",
    "0111":"7","1000":"8","1001":"9","1010":"A","1011":"B","1100":"C","1101":"D",
    "1110":"E","1111":"F"}

if __name__ == "__main__":
    word = list(str(input("Enter the word you would like to convert to hex\n")))
    binary = ""
    # convert word/phrase to binary equivalent
    for letter in word:
        print("'" + letter + "'= 0" + format(ord(letter),'b'))
        binary += "0"+ format(ord(letter),'b')
    print("Decimal Number: " + str(int(binary,2)))
    print("Binary Number: " + binary)
    # breaks up binary string into groups of 4 digits
    binary = [binary[i:i + 4] for i in range(0, len(binary), 4)]
    # adds 0s to beginning of any groups that have less than 4 digits
    for x in range(len(binary)):
        if len(binary[x]) < 4:
            while len(binary[x]) < 4:
                binary[x] = "0" + binary[x]
    print("Binary Groups", end=': ')
    print(binary)
    hex_dec = ""
    # converts binary groups into their hex equivalents
    for letter in binary:
        hex_dec += hex_keys[letter]
    print("Hex Number: "+hex_dec)
    # breaks hex letters into groups of 6 (hexcolors)
    hex_dec = [hex_dec[i:i + 6] for i in range(0, len(hex_dec), 6)]
    print("Hex Groups", end=': ')
    print(hex_dec)
    # turtle operations for drawing each color onto the canvas
    display = turtle.Screen()
    pen = turtle.Turtle()
    pen.speed(0)
    display.tracer(0,0)
    pen.up()
    pen.goto(-300,-100)
    cell_length = 100
    width = (int)(display.screensize()[1])
    display.screensize(cell_length*len(hex_dec),width)
    for color in hex_dec:
        if len(color) is 6:
            pen.fillcolor('#'+color)
            pen.down()
            pen.begin_fill()
            pen.forward(cell_length)
            pen.left(90)
            pen.forward(width)
            pen.left(90)
            pen.forward(cell_length)
            pen.left(90)
            pen.forward(width)
            pen.left(90)
            pen.forward(cell_length)
            pen.up()
            pen.end_fill()
        else:
            pen.write('+'+color,True,align="left",font=("Arial",16,"normal"))
            pen.up()
            pen.forward(10)
    # saves the canvas as a ps then uses gs to convert to a png
    save = str(input("Would you like to save the image (yes/no)?\n"))
    if save == "yes":
        cv = display.getcanvas()
        name = str(input("What would you like to name the file?\n"))
        cv.postscript(file= name+".ps", colormode='color')
        subprocess.call('gs -r300 -dTextAlphaBits=4 -sDEVICE=png16m -sOutputFile='+name+'.png -dBATCH -dNOPAUSE '+name+'.ps', shell=True)
        os.remove(name+'.ps')
    try:
        display.exitonclick()
    except:
        pass
