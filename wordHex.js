var hex_keys = {
  "0000":"0","0001":"1","0010":"2","0011":"3","0100":"4","0101":"5","0110":"6",
  "0111":"7","1000":"8","1001":"9","1010":"A","1011":"B","1100":"C","1101":"D",
  "1110":"E","1111":"F"
}


function main() {
  console.log("Hello World")
  // console.log(document.getElementsByName("input").value);
  var word = document.getElementsByName("input").value;
  // console.log("Hello World");
  var binary = "";
  for (letter in word) {
    var b_letter = word[letter].charCodeAt(0).toString(2);
    while (b_letter.length < 8){
      b_letter = "0" + b_letter;
    }
    binary += b_letter
    // console.log(b_letter);
  }
  // console.log(binary);
  hex_groups = binary.match(/.{1,4}/g)
  // console.log(hex_groups);
  hex = "";
  for (group in hex_groups) {
    hex += hex_keys[hex_groups[group]];
  }
  // console.log(hex);
  hex_groups = hex.match(/.{1,6}/g);
  console.log(hex_groups)
}

main();
