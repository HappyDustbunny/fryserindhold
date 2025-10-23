const content = new Map();
const fixedContent = new Map([
    //[name, number, type, shelf, keepsInMonths, addedToFreezer]
    ['brød', [1, 'bread', 1, 5, 1761217795422]],
    ['kylling', [2, 'fowl', 2, 4, 1761217795422]],
    ['grønne bønner', [1, 'veggie', 2, 4, 1761217795422]]
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
    let sortedContent = new Map([...content].sort());
    sortedContent.forEach(function(value,key) {
        let symbol = symbols.get(value.type);
        let strippedKey = key.replace(/\s/g, '');
        allTab.innerHTML += '<p id="' + strippedKey + '">' + symbol + ' ' + key[0].toUpperCase() + key.slice(1) + ' ' + 
        ' ' + value.number + ' stk ' + ' i skuffe ' + value.shelf +  ' </p>'
    })
}
