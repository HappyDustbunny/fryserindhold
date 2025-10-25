// const content = new Map();
const fixedContent = new Map([
    //[hash, [name, number, type, shelf, keepsInMonths, addedToFreezer]]
    [3036860, ['brød', 1, 'bread', 1, 5, 1761217795422]],
    [254164556, ['kylling', 2, 'fowl', 2, 4, 1761217795422]],
    [1677053109, ['grønne bønner', 1, 'veggie', 2, 4, 1743717600000]]
])
const symbols = new Map([
    ['bread', '&#x1F35E;'],
    ['veggie', '&#x1F346;'],
    ['cake', '&#x1F382;'],
    ['fish', '&#x1F41F;'],
    ['fowl', '&#x1F414;'],
    ['meat', '&#x1F969;']
]);
const allTab = document.getElementById('allTab');
const typeTab = document.getElementById('typeTab');

let localContent;

// class Item {
//     constructor(hash, name, number, type, shelf, keepsInMonths, addedToFreezer) {
//         this.hash = hash;
//         this.name = name;
//         this.number = number;
//         this.type = type;
//         this.shelf = shelf;
//         this.keepsInMonths = keepsInMonths;
//         this.addedToFreezer = addedToFreezer;
//     }
// }


document.getElementById('type').addEventListener('click', typeButtonWasClicked);
document.getElementById('all').addEventListener('click', allButtonWasClicked);
document.getElementById('allTab').addEventListener('click', function(event) { allTabHasBeenClicked(event); }, true);


function typeButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'block';
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('type').style.background = 'rgba(0, 255, 255, 0.21)';
    document.getElementById('all').style.background = 'rgba(211, 211, 211, 0.30)';
}


function allButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('allTab').style.display = 'block';
    document.getElementById('type').style.background = 'rgba(211, 211, 211, 0.30)';
    document.getElementById('all').style.background = 'rgba(0, 255, 255, 0.21)';
}


function setUpFunction() {
    allButtonWasClicked();
    
    // // Get fixed content
    content = fixedContent;
    // fixedContent.forEach(function(value, key) {
    //     console.log(key, value);
    //     content.set(key, new Item(key, value[0], value[1], value[2], value[3], value[4], value[5]));
    // })
    
    // // Get local content
    // if (localStorage.getItem('localContent')) {
    //     localContent = JSON.parse(localStorage.localContent);

    //     localContent.forEach(function(value, key) {
    //         content.set(key, new Item(key, value[0], value[1], value[2], value[3], value[4], value[5]));
    //     })
    // }

    fillAllTab();
}


function makeHash(string) {  // Use for making unique hash from name
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash;
};


function fillAllTab() {
    let now = new Date();
    let bgcolour = 'lightgreen';

    // let sortedContent = new Map([...content].sort());
    let sortedContent = new Map( [...fixedContent.entries()].sort((a, b) => 
        a[1][0].toLowerCase().localeCompare(b[1][0].toLowerCase())
    ));

    
    sortedContent.forEach(function(value,key) {
        let symbol = symbols.get(value[2]);  // Get the symbol maching the type of food
        let stock = value[1];
        // let strippedKey = key.replace(/\s/g, '_');  // Replace spaces with underscore
        // strippedKey = strippedKey.replace(/\æ/g, 'ae');
        // strippedKey = strippedKey.replace(/\ø/g, 'oe');
        // strippedKey = strippedKey.replace(/\å/g, 'aa');
        // strippedKey = strippedKey.replace(/\W/g, '');  // Strip non-alphanumeric word characters
        let daysLeft = value[4] * 30 - (now.getTime() - value[5])/(3600000*24);
        let months = Math.round(value[4] - (now.getTime() - value[5])/(3600000*24*30));
        if (months < 1) {bgcolour = 'yellow'};
        if (daysLeft < 15) {bgcolour = 'red'};

        allTab.innerHTML += '<div id="' + key + '" class="itemDiv">' +
        '<span class="goesLeft">' + symbol + ' ' + value[0][0].toUpperCase() + value[0].slice(1) + '</span>' +
        '<span class="goesRight">' + 
        '<span style="background-color: ' + bgcolour + '"> ' + months + ' mdr </span>  ' +
        '<span> &#x2263;' + value[3] + '</span> ' + // Four bars symbolizing shelf number
        '<button id="minus_' + key + '" class="minus"> &#10134; </button> ' + 
        '<span id="stock_' + key + '">' + stock + '</span> ' + 
        '<button id="plus_' + key + '" class="plus"> &#10133; </button> </span> </div>'
        
        bgcolour = 'lightgreen';
    });
}


function allTabHasBeenClicked(event) {
    let clickedID = event.target.id;

    if (clickedID.slice(0, 5) == 'minus') {
        myID = clickedID.slice(6);  // Remove 'minus_'
        let howMany = content.get(Number(myID))[1];
        if (1 < howMany) {
            howMany -= 1;
            content.get(Number(myID))[1] = howMany;
        } else if (howMany == 1) {
            howMany = 0;
            content.get(Number(myID))[1] = howMany;
            document.getElementById(myID).style.color = 'rgba(40, 90, 240, 0.35)';
        }
        document.getElementById('stock_' + myID).textContent = howMany;
    } else if (clickedID.slice(0, 4) == 'plus') {
        myID = clickedID.slice(5);  // Remove 'plus_'
        let howMany = content.get(Number(myID))[1];
        if (1 <= howMany) {
            howMany += 1;
            content.get(Number(myID))[1] = howMany;
        } else if (howMany == 0) {
            howMany = 1;
            content.get(Number(myID))[1] = howMany;
            document.getElementById(myID).style.color = '';
        }
        document.getElementById('stock_' + myID).textContent = howMany;
    } 
}



// Usefull snippets

// for ( value of document.getElementsByClassName("itemDiv")) {
//  value.style.color = 'green';
//  value.style.backgroundColor = 'red';
// } 

