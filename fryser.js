// const content = new Map();
const fixedContent = [
    //[hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer]
    [3036860, 'brød', 1, 'bread', 1, 5, 1761217795422, true],
    [254164556, 'kylling', 2, 'fowl', 2, 4, 1761217795422, true],
    [1677053109, 'grønne bønner', 1, 'veggie', 2, 4, 1743717600000, true],
    [11802677, "is", 1, "cake", 1, 3, 1762349662007, true],
    [1180267467, "kage", 0, "cake", 1, 3, 1762349662007, true],
    [11867467, "okse", 1, "meat", 1, 3, 1762349662007, true]
]
const symbols = new Map([
    ['bread', '&#x1F35E;'],
    ['veggie', '&#x1F346;'],
    ['cake', '&#x1F382;'],
    ['fish', '&#x1F41F;'],
    ['fowl', '&#x1F414;'],
    ['meat', '&#x1F969;'],
    ['whatEvs', '&#x1F937'],
    ['noLabel', '&#8195']
]);
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const allTab = document.getElementById('allTab');
const typeTab = document.getElementById('typeTab');

let localContent;
let curItemObj;
let numberOfShelves = 3;  // TODO: Set this the first time the PWA is run

document.getElementById('type').addEventListener('click', typeButtonWasClicked);
document.getElementById('all').addEventListener('click', allButtonWasClicked);
document.getElementById('allTab').addEventListener('click', function(event) { tabHasBeenClicked(event); }, true);
document.getElementById('typeTab').addEventListener('click', function(event) { tabHasBeenClicked(event); }, true);
document.getElementById('typeButtonsDiv1').addEventListener('click', function(event) { typeHasBeenClicked(event); }, true);
document.getElementById('typeButtonsDiv2').addEventListener('click', function(event) { typeHasBeenClicked(event); }, true);
document.getElementById('changeNumberDiv').addEventListener('click', function(event) {changeNumberButtonHasBeenClicked(event); }, true);
document.getElementById('changeMonthsDiv').addEventListener('click', function(event) { changeMonthButtonHasBeenClicked(event); }, true);
document.getElementById('addNew').addEventListener('click', addNewItem);
document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('closeButton').addEventListener('click', closeButtonClicked);
document.getElementById('confirmButton').addEventListener('click', confirmButtonHasBeenClicked);
document.getElementById('setUpConfirmButton').addEventListener('click', setUpConfirmButtonHasBeenClicked);
document.getElementById('increment').addEventListener('click', incrementNumberOfItemsCounter);
document.getElementById('numberOfShelvesDiv').addEventListener('click', function(event) { numberOfShelvesHasBeenClicked(event); }, true);

class itemObj {
    constructor(hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer, showInAllTab) {
        this.hash = hash;
        this.itemName = itemName;
        this.number = number;
        this.type = type;
        this.shelf = shelf;
        this.keepsInMonths = keepsInMonths;
        this.addedToFreezer = addedToFreezer;
        this.showInAllTab = showInAllTab;
            }
}


function setUpFunction() {
    // // Get fixed content
    content = fixedContent;  // TODO: Hmm... Thinking needed here

    if (!localStorage.numberOfShelves) {
        askForNumberOfShelves();
    } else {
        allButtonWasClicked();
        fillAllTab();
        clearAddItemPage();
    }
    
}


function askForNumberOfShelves() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('setUpDiv').style.display = 'flex';

    fillShelveDiv('numberOfShelvesDiv', 8);

}


function numberOfShelvesHasBeenClicked(event) {
    let clickedNumber = event.target.id;
    if (clickedNumber != 'numberOfShelvesDiv') {
        document.querySelectorAll('.shelveNum').forEach(button => button.classList.remove('numberActive'));
        document.getElementById(clickedNumber).classList.add('numberActive');
        localStorage.numberOfShelves = Number(clickedNumber.slice(12));
    }
}


function setUpConfirmButtonHasBeenClicked() {
    document.getElementById('setUpDiv').style.display = 'none';
    
    allButtonWasClicked();
    fillAllTab();
    clearAddItemPage();
}



function fillShelveDiv(relevantDiv, numberOfShelves) {
    currentdiv = document.getElementById(relevantDiv);
    currentdiv.innerHTML = '';
    for (let n = 1; n <= numberOfShelves; n++) {
        currentdiv.innerHTML += '<button id="shelveNumber' + n + '" class="shelveNum">' + n + '</button>';
    }
}


function typeButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'block';
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('type').style.background = 'rgba(153, 222, 238, 0.77)';
    document.getElementById('all').style.background = 'rgba(211, 211, 211, 0.30)';
    document.getElementById('plusToolTip').style.display = 'none';
    fillTypeTab();
}


function allButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('allTab').style.display = 'block';
    document.getElementById('type').style.background = 'rgba(211, 211, 211, 0.30)';
    document.getElementById('all').style.background = 'rgba(153, 222, 238, 0.77)';
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


function fillTypeTab() {
    allTab.innerHTML = '';  // Avoid HTML-elements with same ID

    let now = new Date();
    let bgColourClass = 'bglightgreen';
    
    for (const value of symbols.keys()) {  // Scrub categories in Type tab
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }

    content.forEach(function(value) {
        if (value[7]) {
            let currentElement = document.getElementById(value[3]);
            
            let minusOrTrashCan = ' &#10134; ';
            let stock = value[2];
            let monthFrosen = monthNames[new Date(value[6]).getMonth()];
            let daysLeft = value[5] * 30 - (now.getTime() - value[6])/(3600000*24);
            let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
            if (months < 1) {bgColourClass = 'yellow'};
            if (daysLeft < 15) {bgColourClass = 'bgred'};
            let noLeft = '';
            if (stock == 0) { minusOrTrashCan = ' &#x1F5D1; '; noLeft = 'noLeft'};
    
            currentElement.nextElementSibling.innerHTML += '<div id="' + value[0] + '" class="itemDiv ' + noLeft + '">' +
            '<span id="edit_' + value[0] + '" class="goesLeft">' + ' ' + capitalizeFirst(value[1]) + '</span>' +
            '<span class="goesRight">' + monthFrosen + ' ' +
            '<span class="' + bgColourClass + '"> ' + months + ' mdr </span>  ' +
            '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
            '<button id="minus_' + value[0] + '" class="minus"> ' + minusOrTrashCan + ' </button> ' + 
            '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
            '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>';

            bgColourClass = 'bglightgreen';
        }
    });

    for (const value of symbols.keys()) {  // Grey out categories without content
        let currentElement = document.getElementById(value);
        if (currentElement.nextElementSibling.innerHTML === '') {  // TODO: Fix this with classList.add/remove
            currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.1)';
            currentElement.style.color = 'gray';
        }
    }
}


function fillAllTab() {
    for (const value of symbols.keys()) {  // Remove content in order to avoid HTML-elements with same ID
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }

    let now = new Date();
    let bgColourClass = 'bglightgreen';
    let sortedContent = content;

    allTab.innerHTML = '';

    // let sortedContent = new Map([...content].sort());
    sortedContent.sort((a, b) => 
        a[1].toLowerCase().localeCompare(b[1].toLowerCase(), 'da')
    );

    
    sortedContent.forEach(function(value) {
        if (value[7]) {
            let symbol = symbols.get(value[3]);  // Get the symbol maching the type of food
            let minusOrTrashCan = ' &#10134; ';
            let stock = value[2];
            let monthFrosen = monthNames[new Date(value[6]).getMonth()];
            let daysLeft = value[5] * 30 - (now.getTime() - value[6])/(3600000*24);
            let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
            if (months < 1) {bgColourClass = 'yellow'};
            if (daysLeft < 15) {bgColourClass = 'bgred'};
            let noLeft = '';
            if (stock == 0) { minusOrTrashCan = ' &#x1F5D1; '; noLeft = 'noLeft';};
    
            allTab.innerHTML += '<div id="' + value[0] + '" class="itemDiv ' + noLeft + '">' +
            '<span id="edit_' + value[0] + '" class="goesLeft">' + symbol + ' ' + capitalizeFirst(value[1]) + '</span>' +
            '<span class="goesRight">' + monthFrosen + ' ' +
            '<span class="' + bgColourClass + '"> ' + months + ' mdr </span>  ' +
            '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
            '<button id="minus_' + value[0] + '" class="minus"> ' + minusOrTrashCan + ' </button> ' + 
            '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
            '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>'
            
            bgColourClass = 'bglightgreen';
        }
    });
}


function findRelevantObject(myID) {
    let relevantArray;
    let relevantObject;
    content.forEach(function(value) {
        if (value[0] === Number(myID)) {
            relevantArray = value;
        }
    });

    if (relevantArray) {
        relevantObject = new itemObj(...relevantArray);  // Transform the relevant array to the relevant object
        return relevantObject;
    }
}


function updateRelevantObject(myID, relevantObject) {
    let relevantArray = Object.values(relevantObject);  // Transform the relevant object to the relevant array
    content = content.map(x => (x[0] === Number(myID) ? relevantArray : x));
}


function typeHasBeenClicked(event) {
    let clickedType = event.target.id;
    if (clickedType != 'typeButtonsDiv1' && clickedType != 'typeButtonsDiv2') {
        unPressFoodTypes();
        document.getElementById(clickedType).classList.add('foodTypeActive');
        curItemObj.type = clickedType.replace('Type', '');
    }
}


function changeNumberButtonHasBeenClicked(event) {
    let clickedModifier = event.target.id;

    if (clickedModifier == 'numberMinus1') {
        curItemObj.number -= 1;
        if (curItemObj.number < 2) { document.getElementById('numberMinus1').disabled = true; }
    } else if (clickedModifier == 'numberPlus1') {
        curItemObj.number += 1;
        document.getElementById('numberMinus1').disabled = false;
    }

    document.getElementById('numberOfItemsInput').value = curItemObj.number;
}


function changeMonthButtonHasBeenClicked(event) {
    let clickedModifier = event.target.id;
    
    if (clickedModifier == 'minus3' && 3 < curItemObj.keepsInMonths) {
        curItemObj.keepsInMonths -= 3;
        if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    } else if (clickedModifier == 'minus1' && 1 < curItemObj.keepsInMonths) {
        curItemObj.keepsInMonths -= 1;
        if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    } else if (clickedModifier == 'plus1') {
        curItemObj.keepsInMonths += 1;
        if (1 < curItemObj.keepsInMonths) { document.getElementById('minus1').disabled = false; }
        if (3 < curItemObj.keepsInMonths) { document.getElementById('minus3').disabled = false; }
    } else if (clickedModifier == 'plus3') {
        curItemObj.keepsInMonths += 3;
        document.getElementById('minus1').disabled = false;
        document.getElementById('minus3').disabled = false;
    }

    document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
}


function tabHasBeenClicked(event) {
    let clickedID = event.target.id;
    
    if (clickedID.slice(0, 5) == 'minus') {
        myID = clickedID.slice(6);  // Remove 'minus_'
        curItemObj = findRelevantObject(myID);
        if (1 < curItemObj.number) {
            curItemObj.number -= 1;
            updateRelevantObject(myID, curItemObj);
            document.getElementById('stock_' + myID).textContent = curItemObj.number;
        } else if (curItemObj.number == 1) {
            curItemObj.number = 0;
            updateRelevantObject(myID, curItemObj);
            document.getElementById(myID).classList.add('noLeft');
            document.getElementById('minus_' + myID).textContent = ' \u{1F5D1} ';  // Trash can
            document.getElementById('stock_' + myID).textContent = curItemObj.number;
        } else if (curItemObj.number == 0) {
            curItemObj.showInAllTab = false;
            document.getElementById(myID).classList.remove('noLeft');
            document.getElementById('minus_' + myID).textContent = ' \u{2796} ';  // Minus
            updateRelevantObject(myID, curItemObj);
            if (event.currentTarget.id === 'typeTab') {  // Necessary as each clear the other in order to avoid ID collisions
                fillTypeTab();
            } else {
                fillAllTab();
            }
        }
    } else if (clickedID.slice(0, 4) == 'plus') {
        myID = clickedID.slice(5);  // Remove 'plus_'
        curItemObj = findRelevantObject(myID);

        document.getElementById('plusToolTip').style.display = 'flex';
        document.getElementById('addItem').style.display = 'none'; 

        let clickedTop =  document.getElementById(clickedID).getBoundingClientRect().top;
        if (clickedTop < 300) { clickedTop += 30} else {clickedTop -= 80};
        document.getElementById('plusToolTip').style.top = clickedTop + 'px';

        document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
        document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';
        shaddowFoodTypes();
        document.getElementById(curItemObj.type).classList.remove('shaddowed');
        
        document.getElementById('numberOfItemsInput').value = curItemObj.number;
        document.getElementById('numberMinus1').disabled = true;
        
        document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
        document.getElementById('minus3').disabled = false;
        document.getElementById('minus1').disabled = false;
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
        if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        
    } else if (clickedID.slice(0, 4) == 'edit') {
        myID = clickedID.slice(5);  // Remove 'edit_';
        curItemObj = findRelevantObject(myID);
        
        document.getElementById('addItemPage').style.display = 'flex';
        document.getElementById('addItem').style.display = 'none'; 
        
        document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
        document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';
        
        shaddowFoodTypes();
        document.getElementById(curItemObj.type).classList.remove('shaddowed');
        
        document.getElementById('numberOfItemsInput').value = curItemObj.number;
        if (curItemObj.number < 2) { document.getElementById('numberMinus1').disabled = true; }
        
        document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
        document.getElementById('minus3').disabled = false;
        document.getElementById('minus1').disabled = false;
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
        if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        document.getElementById(curItemObj.type).classList.add('foodTypeActive');
    }
}

function addItem() {
    document.getElementById('addItemPage').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';
    clearAddItemPage();
    fillShelveDiv('changeShelveDiv', localStorage.numberOfShelves);
}
    

function addNewItem() {
    document.getElementById('addItemPage').style.display = 'flex';
    document.getElementById('plusToolTip').style.display = 'none';
}


function closeButtonClicked() {
    document.getElementById('addItemPage').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    unshaddowFoodTypes();
    unPressFoodTypes();
}


function confirmButtonHasBeenClicked() {
    if (document.getElementById('inputBox').value != '') {
        let newHash = makeHash(document.getElementById('inputBox').value + document.getElementById('inputBoxMonth').value);
        if (findRelevantObject(newHash)) {
            oldItem = findRelevantObject(newHash);
            oldItem.number += curItemObj.number;
            updateRelevantObject(newHash, oldItem);
        } else {
            curItemObj.hash = newHash;
            curItemObj.itemName = document.getElementById('inputBox').value;
            curItemObj.addedToFreezer = new Date().getTime();
            curItemObj.showInAllTab = true;
            content.push(Object.values(curItemObj));
        }
    }
    
    closeButtonClicked();
    fillAllTab();
}


function incrementNumberOfItemsCounter() {
    if (curItemObj.number == 0) {
        document.getElementById(myID).classList.remove('noLeft');
        document.getElementById('minus_' + myID).textContent = ' \u{2796} '  // Minus
    }
    curItemObj.number += 1;
    updateRelevantObject(myID, curItemObj);
    document.getElementById('stock_' + myID).textContent = curItemObj.number;
    document.getElementById('plusToolTip').style.display = 'none';
}


function shaddowFoodTypes() {
    document.querySelectorAll('.foodType').forEach(button => {
        button.classList.add('shaddowed');
        button.disabled = true;
    });
    // document.querySelectorAll('.foodType').forEach(button => button.disabled = true);
}

function unshaddowFoodTypes() {
    document.querySelectorAll('.foodType').forEach(button => {
        button.classList.remove('shaddowed');
        button.disabled = false;
    });
}


function unPressFoodTypes() {
    document.querySelectorAll('.foodType').forEach(button => button.classList.remove('foodTypeActive'));
}


function clearAddItemPage() {
    document.getElementById('inputBox').value = '';
    document.getElementById('inputBox').focus();
    document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';
    document.getElementById('numberOfItemsInput').value = '1';
    document.getElementById('numberMinus1').disabled = true;
    document.getElementById('keepsForText').value = '3 mdr';
    document.getElementById('minus1').disabled = false;
    document.getElementById('minus3').disabled = true;
    unPressFoodTypes();
    unshaddowFoodTypes();
    curItemObj = new itemObj(1, 'none', 1, 'noLabel', 1, 3, 176207000000); // hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer
}

function capitalizeFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

// Usefull snippets

// for ( value of document.getElementsByClassName("itemDiv")) {
//  value.style.color = 'green';
//  value.style.backgroundColor = 'red';
// } 

