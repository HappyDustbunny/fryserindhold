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
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const allTab = document.getElementById('allTab');
const typeTab = document.getElementById('typeTab');

let localContent;
let currentArray;
let curItemObj;

document.getElementById('type').addEventListener('click', typeButtonWasClicked);
document.getElementById('all').addEventListener('click', allButtonWasClicked);
document.getElementById('allTab').addEventListener('click', function(event) { allTabHasBeenClicked(event); }, true);
document.getElementById('typeButtonsDiv1').addEventListener('click', function(event) { typeHasBeenClicked(event); }, true);
document.getElementById('typeButtonsDiv2').addEventListener('click', function(event) { typeHasBeenClicked(event); }, true);
document.getElementById('changeNumberDiv').addEventListener('click', function(event) {changeNumberButtonHasBeenClicked(event); }, true);
document.getElementById('changeMonthsDiv').addEventListener('click', function(event) { changeMonthButtonHasBeenClicked(event); }, true);
document.getElementById('addNew').addEventListener('click', addNewItem);
document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('closeButton').addEventListener('click', closeButtonClicked);
document.getElementById('confirmButton').addEventListener('click', confirmButtonHasBeenClicked);
document.getElementById('increment').addEventListener('click', incrementNumberOfItemsCounter);

class itemObj {
    constructor(hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer) {
        this.hash = hash;
        this.itemName = itemName;
        this.number = number;
        this.type = type;
        this.shelf = shelf;
        this.keepsInMonths = keepsInMonths;
        this.addedToFreezer = addedToFreezer;
            }
}

function typeButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'block';
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('type').style.background = 'rgba(153, 222, 238, 0.77)';
    document.getElementById('all').style.background = 'rgba(211, 211, 211, 0.30)';
}


function allButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('allTab').style.display = 'block';
    document.getElementById('type').style.background = 'rgba(211, 211, 211, 0.30)';
    document.getElementById('all').style.background = 'rgba(153, 222, 238, 0.77)';
}


function setUpFunction() {
    allButtonWasClicked();
    
    // // Get fixed content
    content = fixedContent;

    fillAllTab();
    curItemObj = new itemObj(1, 'none', 1, 'noLabel', 1, 3, 176207000000); // hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer
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
    let bgColourClass = 'bglightgreen';
    let sortedContent = content;

    // let sortedContent = new Map([...content].sort());
    sortedContent.sort((a, b) => 
        a[1].toLowerCase().localeCompare(b[1].toLowerCase(), 'da')
    );

    
    sortedContent.forEach(function(value) {
        let symbol = symbols.get(value[3]);  // Get the symbol maching the type of food
        let stock = value[2];
        let monthFrosen = monthNames[new Date(value[6]).getMonth()];
        let daysLeft = value[5] * 30 - (now.getTime() - value[6])/(3600000*24);
        let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
        if (months < 1) {bgColourClass = 'yellow'};
        if (daysLeft < 15) {bgColourClass = 'bgred'};

        allTab.innerHTML += '<div id="' + value[0] + '" class="itemDiv">' +
        '<span id="edit_' + value[0] + '" class="goesLeft">' + symbol + ' ' + capitalizeFirst(value[1]) + '</span>' +
        '<span class="goesRight">' + monthFrosen + ' ' +
        '<span class="' + bgColourClass + '"> ' + months + ' mdr </span>  ' +
        '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
        '<button id="minus_' + value[0] + '" class="minus"> &#10134; </button> ' + 
        '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
        '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>'
        
        bgColourClass = 'bglightgreen';
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


function typeHasBeenClicked(event) {
    let clickedType = event.target.id;
    if (clickedType != 'typeButtonsDiv1' && clickedType != 'typeButtonsDiv2') {
        unPressFoodTypes();
        document.getElementById(clickedType).classList.add('foodTypeActive');
        curItemObj.itemName = clickedType;
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
    
    if (clickedModifier == 'minus3' && 4 < curItemObj.keepsInMonths) {
        curItemObj.keepsInMonths -= 3;
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    } else if (clickedModifier == 'minus1' && 1 < curItemObj.keepsInMonths) {
        curItemObj.keepsInMonths -= 1;
        if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    } else if (clickedModifier == 'plus1') {
        curItemObj.keepsInMonths += 1;
        if (3 < curItemObj.keepsInMonths) { document.getElementById('minus3').disabled = false; }
        if (1 < curItemObj.keepsInMonths) { document.getElementById('minus1').disabled = false; }
    } else if (clickedModifier == 'plus3') {
        curItemObj.keepsInMonths += 3;
        document.getElementById('minus1').disabled = false;
        document.getElementById('minus3').disabled = false;
    }

    document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
}


function allTabHasBeenClicked(event) {
    let clickedID = event.target.id;
    
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

        document.getElementById('plusToolTip').style.display = 'flex';
        let clickedTop =  document.getElementById(clickedID).getBoundingClientRect().top;
        if (clickedTop < 300) { clickedTop += 30} else {clickedTop -= 80};
        document.getElementById('plusToolTip').style.top = clickedTop + 'px';
        
    } else if (clickedID.slice(0, 4) == 'edit') {
        myID = clickedID.slice(5);  // Remove 'edit_';
        currentArray = findRelevantArray(myID);
        document.getElementById('addItemPage').style.display = 'flex';
        document.getElementById('addItem').style.display = 'none';  // TODO: Resolve currentArray vs curItemObj
        document.getElementById('inputBox').value = capitalizeFirst(currentArray[1]) + '  ' + monthNames[new Date().getMonth()] + ' ';
        document.getElementById('numberOfItemsInput').value = currentArray[2];
        if (currentArray[2] < 2) { document.getElementById('numberMinus1').disabled = true; }
        document.getElementById('keepsForText').value = currentArray[5] + ' mdr';
        if (currentArray[5] < 4) { document.getElementById('minus3').disabled = true; }
        if (currentArray[5] < 2) { document.getElementById('minus1').disabled = true; }
        document.getElementById(currentArray[3]).classList.add('foodTypeActive');
        // document.getElementById(currentArray[3]).style.borderStyle = 'inset';
        shaddowFoodTypes();
        document.getElementById(currentArray[3]).classList.remove('shaddowed');
    }
}

function addItem() {
    clearAddItemPage();
    document.getElementById('addItemPage').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';
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
    // TODO: Add content here. Remember to hide +button when not relevant
    closeButtonClicked();
}


function incrementNumberOfItemsCounter() {
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
    document.getElementById('inputBox').value = monthNames[new Date().getMonth()] + ' ';;
    document.getElementById('numberOfItemsInput').value = '1';
    document.getElementById('numberMinus1').disabled = true;
    document.getElementById('keepsForText').value = '3 mdr';
    document.getElementById('minus1').disabled = true;
    document.getElementById('minus3').disabled = true;
    unPressFoodTypes();
    unshaddowFoodTypes();
}

function capitalizeFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

// Usefull snippets

// for ( value of document.getElementsByClassName("itemDiv")) {
//  value.style.color = 'green';
//  value.style.backgroundColor = 'red';
// } 

