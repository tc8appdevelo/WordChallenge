import fetch from "node-fetch";
import { argv } from "process";

const url = argv[2];
const word1 = argv[3];
const word2 = argv[4];

// console.log(url);
// console.log(word);

function fetchData() {
  console.log(`Downloading source of ${url}`)
  fetch(url)
    .then(response => response.text().then(function (text) {
      countReplace(text, word1, word2)
    }));
}

let pageText = "Hello hello hello heLLO HELLO world WORLD world woRLD world aaa aaa bbb bbb bbb BB";

// Are words only alphabetical characters?
// If someone searches href="https://..." should it count those?
// Do word search based on alphabet, if that works
// think of total string search.

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
    }

    // if (str.includes(wrd1.toLowerCase())) {
    //   console.log(str);
    // }

    
  }
  console.log(`Found ${count} occurences of ${wrd1}`);
  console.log(arr);
}

function formatText(str) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  let formattedStr = "";

  for (let i = 0; i < str.length; i++) {
    let lowerStr = str[i].toLowerCase();
    if (alphabet.includes(lowerStr)) {
      formattedStr += lowerStr;
    }
  }
  console.log(formattedStr);
}

// formatText("hell!o0i%");
// countReplace(pageText, "Hello");
fetchData();
