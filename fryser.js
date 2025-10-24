const content = new Map();
const fixedContent = new Map([
    //[name, number, type, shelf, keepsInMonths, addedToFreezer]
    ['brød', [1, 'bread', 1, 5, 1761217795422]],
    ['kylling', [2, 'fowl', 2, 4, 1761217795422]],
    ['grønne bønner', [1, 'veggie', 2, 4, 1743717600000]]
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

class Item {
    constructor(name, number, type, shelf, keepsInMonths, addedToFreezer) {
        this.name = name;
        this.number = number;
        this.type = type;
        this.shelf = shelf;
        this.keepsInMonths = keepsInMonths;
        this.addedToFreezer = addedToFreezer;
    }
}

document.getElementById('type').addEventListener('click', typeButtonWasClicked);
document.getElementById('all').addEventListener('click', allButtonWasClicked);

function typeButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'block';
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('type').style.background = 'aqua';
    document.getElementById('all').style.background = 'lightgray';
}

function allButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('allTab').style.display = 'block';
    document.getElementById('type').style.background = 'lightgray';
    document.getElementById('all').style.background = 'aqua';
}

function setUpFunction() {
    allButtonWasClicked();
    
    // Get fixed content
    fixedContent.forEach(function(value, key) {
        console.log(key, value);
        content.set(key, new Item(key, value[0], value[1], value[2], value[3], value[4]));
    })
    
    // Get local content
    if (localStorage.getItem('localContent')) {
        localContent = JSON.parse(localStorage.localContent);

        localContent.forEach(function(value, key) {
            content.set(key, new Item(key, value[0], value[1], value[2], value[3], value[4]));
        })
    }

    fillAllTab();
}

function fillAllTab() {
    let now = new Date();
    let bgcolour = 'lightgreen';

    let sortedContent = new Map([...content].sort());
    
    sortedContent.forEach(function(value,key) {
        let symbol = symbols.get(value.type);  // Get the symbol maching the type of food
        let stock = value.number;
        let strippedKey = key.replace(/\s/g, '_');  // Replace spaces with underscore
        strippedKey = strippedKey.replace(/\æ/g, 'ae');
        strippedKey = strippedKey.replace(/\ø/g, 'oe');
        strippedKey = strippedKey.replace(/\å/g, 'aa');
        strippedKey = strippedKey.replace(/\W/g, '');  // Strip non-alphanumeric word characters
        let daysLeft = value.keepsInMonths * 30 - (now.getTime() - value.addedToFreezer)/(3600000*24);
        let months = Math.round(value.keepsInMonths - (now.getTime() - value.addedToFreezer)/(3600000*24*30));
        if (months < 1) {bgcolour = 'yellow'};
        if (daysLeft < 15) {bgcolour = 'red'};

        allTab.innerHTML += '<div id="' + strippedKey + '" class="itemDiv">' +
        '<span class="goesLeft">' + symbol + ' ' + key[0].toUpperCase() + key.slice(1) + '</span>' +
        '<span class="goesRight">' + 
        '<span style="background-color: ' + bgcolour + '"> ' + months + ' mdr </span>  ' +
        '&#x2263;' + value.shelf + ' ' + // Four bars symbolizing shelf number
        '<button class="minus"> &#10134; </button> ' + stock + ' ' + 
        '<button class="plus"> &#10133; </button> </span> </div>'
        
        bgcolour = 'lightgreen';
    });
}
