import fetch from "node-fetch";
import { argv } from "process";

const url = argv[2];
const word1 = argv[3];
const word2 = argv[4];

function fetchData() {
  console.log(`Downloading source of ${url}`)
  fetch(url)
    .then(response => response.text().then(function (text) {
      countReplace(text, word1, word2)
    }));
}


// First decide how to separate words from other characters.
// Split on space but also replace all punctuation with "" or " ".
// Searching for hello should find Hello! should it find Hell!o? 
// Should He!y get turned into Hey or He y

// Want to return the same html file with word1 replaced by word2
// Assuming this means to only search for that word in html
// elements that display text to the user.
// When getting the html with the current method, this is a problem.
// From the console it looks like Im getting the html file, but
// if built with react or something similar, just seeing a <script>
// not the html elements that script is eventually rendering

function countReplace(content, wrd1, wrd2) {
  let arr = content.split(" ");
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    let str = arr[i].toLowerCase();
    
    if (str === wrd1.toLowerCase()) {
      count += 1;
      arr[i] = wrd2;
    } else if (str.includes(wrd1.toLowerCase())) {
      count += 1;
      // arr[i] = formatText(str, wrd1, wrd2)
    }
  }
  console.log(arr);
  console.log(`Found ${count} occurences of ${wrd1}`);
  console.log(`Replaced all occurances of ${wrd1} with ${wrd2}`);

  // console.log(arr.join(" "));
}

// Figure out best way to separate and replace in situation
// where word1 has not been split into its own array element
// Try getting indicies of start and end and slicing/splicing
// to replace with word2
function formatText(str, wrd1, wrd2) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let formattedStr = "";
  let startIdx = -1;
  let endIdx = -1;

  let arr = str.split(wrd1[0].toLowerCase())
  console.log(arr)

  for (let i = 0; i < str.length; i++) {
    let lowerStr = str[i].toLowerCase();
    if (lowerStr === wrd1[0].toLowerCase()) {
      if (startIdx === -1) {
        startIdx = i;
      } 
    } else if (startIdx > -1) {
      endIdx = i;
    }
  }
  console.log(formattedStr);
}

fetchData();
