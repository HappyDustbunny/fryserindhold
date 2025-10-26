// const content = new Map();
const fixedContent = [
    //[hash, name, number, type, shelf, keepsInMonths, addedToFreezer]
    [3036860, 'brød', 1, 'bread', 1, 5, 1761217795422],
    [254164556, 'kylling', 2, 'fowl', 2, 4, 1761217795422],
    [1677053109, 'grønne bønner', 1, 'veggie', 2, 4, 1743717600000]
]
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

    fillAllTab();
}


function makeHash(string) {  // Use for making unique hash from name
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return Math.abs(hash);
};


function fillAllTab() {
    let now = new Date();
    let bgcolour = 'lightgreen';
    let sortedContent = content;

    // let sortedContent = new Map([...content].sort());
    sortedContent.sort((a, b) => 
        a[1].toLowerCase().localeCompare(b[1].toLowerCase(), 'da')
    );

    
    sortedContent.forEach(function(value) {
        let symbol = symbols.get(value[3]);  // Get the symbol maching the type of food
        let stock = value[2];
        let daysLeft = value[5] * 30 - (now.getTime() - value[6])/(3600000*24);
        let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
        if (months < 1) {bgcolour = 'yellow'};
        if (daysLeft < 15) {bgcolour = 'red'};

        allTab.innerHTML += '<div id="' + value[0] + '" class="itemDiv">' +
        '<span id="edit' + value[0] + '" class="goesLeft">' + symbol + ' ' + value[1][0].toUpperCase() + value[1].slice(1) + '</span>' +
        '<span class="goesRight">' + 
        '<span style="background-color: ' + bgcolour + '"> ' + months + ' mdr </span>  ' +
        '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
        '<button id="minus_' + value[0] + '" class="minus"> &#10134; </button> ' + 
        '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
        '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>'
        
        bgcolour = 'lightgreen';
    });
}


function findRelevantArray(myID) {
    let relevantArray;
    content.forEach(function(value) {
        if (value[0] === Number(myID)) {
            relevantArray = value;
        }
    });

    return relevantArray;
}


function updateRelevantArray(myID, relevantArray) {
    content.forEach(function(value) {
        if (value[0] === Number(myID)) {
            value = relevantArray;
        }
    });
}


function allTabHasBeenClicked(event) {
    let clickedID = event.target.id;
    let currentArray;
    
    if (clickedID.slice(0, 5) == 'minus') {
        myID = clickedID.slice(6);  // Remove 'minus_'
        currentArray = findRelevantArray(myID);
        let howMany = currentArray[2];
        if (1 < howMany) {
            howMany -= 1;
            currentArray[2] = howMany;
            updateRelevantArray(myID, currentArray);
        } else if (howMany == 1) {
            howMany = 0;
            currentArray[2] = howMany;
            updateRelevantArray(myID, currentArray);
            document.getElementById(myID).style.color = 'rgba(40, 90, 240, 0.35)';
        }
        document.getElementById('stock_' + myID).textContent = howMany;
    } else if (clickedID.slice(0, 4) == 'plus') {
        myID = clickedID.slice(5);  // Remove 'plus_'
        currentArray = findRelevantArray(myID);
        let howMany = currentArray[2];
        if (1 <= howMany) {
            howMany += 1;
            currentArray[2] = howMany;
            updateRelevantArray(myID, currentArray);
        } else if (howMany == 0) {
            howMany = 1;
            currentArray[2] = howMany;
            updateRelevantArray(myID, currentArray);
            document.getElementById(myID).style.color = '';
        }
        document.getElementById('stock_' + myID).textContent = howMany;
    } else if (clickedID.slice(0, 4) == 'edit') {
        document.getElementById('addItemPage').style.display = 'flex'; 
    }
}



// Usefull snippets

// for ( value of document.getElementsByClassName("itemDiv")) {
//  value.style.color = 'green';
//  value.style.backgroundColor = 'red';
// } 

