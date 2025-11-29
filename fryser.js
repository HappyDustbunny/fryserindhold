// const content = new Map();
const fixedContent = [
    //[hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer, showItem]
    [0, 'brød', 0, 'bread', 0, 8, 0, false],
    // [303686550, 'brød', 1, 'bread', 1, 5, 1761217795422, true],
    [254164556, 'kylling', 2, 'fowl', 2, 4, 1761217795422, true],
    [1677053109, 'grønne bønner', 1, 'veggie', 2, 8, 1743617600000, true],
    [11802677, "is", 1, "cake", 1, 1, 1762349662007, true],
    [1180267467, "kage", 0, "cake", 1, 3, 1761217795422, true],
    [11867467, "okse", 1, "meat", 1, 3, 1762349662007, true],
    [1186743467, "bao", 1, "meal", 1, 3, 1762349772007, true]
]
const symbols = new Map([
    ['bread', '&#x1F35E;'],
    ['veggie', '&#x1F346;'],
    ['cake', '&#x1F382;'],
    ['fish', '&#x1F41F;'],
    ['fowl', '&#x1F414;'],
    ['meat', '&#x1F969;'],
    ['whatEvs', '&#x1F937'],
    ['meal', '&#x1F37D;&#xFE0F;']
]);
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const allTab = document.getElementById('allTab');
const typeTab = document.getElementById('typeTab');

let curItemObj;
let numberOfShelves;
let chosenShelf;

window.addEventListener('click', function(event) {closeMenuByClickingAnywhere(event); }, true);

document.getElementById('burger').addEventListener('click', showMenu);
// document.getElementById('changeNumberOfShelvesButton').addEventListener('click', changeNumberOfShelvesButtonHasBeenClicked);
document.getElementById('menuDiv').addEventListener('click', function(event) {menuWasClicked(event); }, true);
document.getElementById('type').addEventListener('click', typeButtonWasClicked);
document.getElementById('all').addEventListener('click', allButtonWasClicked);
document.getElementById('oldest').addEventListener('click', oldestButtonWasClicked);
document.getElementById('typeTab').addEventListener('click', function(event) { tabHasBeenClicked(event); }, true);
document.getElementById('allTab').addEventListener('click', function(event) { tabHasBeenClicked(event); }, true);
document.getElementById('oldestTab').addEventListener('click', function(event) { tabHasBeenClicked(event); }, true);
document.getElementById('typeButtonsDiv1').addEventListener('click', function(event) { typeHasBeenClicked(event); }, true);
document.getElementById('changeNumberDiv').addEventListener('click', function(event) {changeNumberButtonHasBeenClicked(event); }, true);
document.getElementById('changeMonthsDiv').addEventListener('click', function(event) { changeMonthButtonHasBeenClicked(event); }, true);
document.getElementById('addNew').addEventListener('click', addNewItem);
document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('closeButton').addEventListener('click', closeButtonClicked);
document.getElementById('confirmButton').addEventListener('click', confirmButtonHasBeenClicked);
document.getElementById('setUpConfirmButton').addEventListener('click', setUpConfirmButtonHasBeenClicked);
document.getElementById('changeShelvesConfirmButton').addEventListener('click', changeShelvesConfirmButtonHasBeenClicked);
document.getElementById('increment').addEventListener('click', incrementNumberOfItemsCounter);
document.getElementById('shelveNumber').addEventListener('click', function(event) { shelveNumberHasBeenClicked(event); }, true);
document.getElementById('numberOfShelvesDiv').addEventListener('click', function(event) { numberOfShelvesHasBeenClicked(event); }, true);
document.getElementById('newNumberOfShelvesDiv').addEventListener('click', function(event) { numberOfShelvesHasBeenClicked(event); }, true);
document.getElementById('inputBox').addEventListener('keyup', inputBoxHasChanges);
document.getElementById('inputBox').addEventListener('keypress', function(event) { inputBoxHasKeyPress(event); }, true);
document.getElementById('dropDownItemDiv').addEventListener('click', function(event) { dropDownHaveBeenClicked(event); }, true);


function showMenu() {
    setTimeout(() => {
        document.getElementById('menuDiv').style.display = 'flex';
    }, 10);
}


function closeMenu() {
    document.getElementById('menuDiv').style.display = 'none';
}


function closeMenuByClickingAnywhere(event) {
    if (!document.getElementById('menuDiv').contains(event.target)) {
        closeMenu();
    }
}


function menuWasClicked(event) {
    let clickedID = event.target.id;
    
    document.getElementById(clickedID).classList.add('buttonPressed');
    setTimeout(() => {
       document.getElementById(clickedID).classList.remove('buttonPressed');
       closeMenu();
       handleMenu(clickedID); 
    }, 200);
}


function handleMenu(clickedID) {
    switch(clickedID) {
        case 'changeNumberOfShelvesButton':
            changeNumberOfShelves();
            break;
        case 'veganButton':
            document.getElementById('choseVeganOrNot').style.display = 'flex';  // TODO: Make buttons in choseVeganOrNot add or remove class nonVegan apporpriately
            break;
        case 'backUpButton':
            backUp();
            break;
        case 'restoreBackUpButton':
            restoreBackUp();
            break;
        case 'deleteAllButton':
            deleteAll();
            break;
    }
}


function changeNumberOfShelves() {
    document.getElementById('changeShelvesDiv').style.display = 'flex';
    fillShelveDiv('newNumberOfShelvesDiv', 8);

    // Highlight current number of shelves
    document.getElementById('shelveNumber' + localStorage.numberOfShelves).classList.add('numberActive');
}


function backUp() {
    console.log('backUp');
}


function restoreBackUp() {
    console.log('restoreBackUp');
}


function deleteAll() {
    console.log('deleteAll');
}
// function changeNumberOfShelvesButtonHasBeenClicked(){
//     document.getElementById('changeNumberOfShelvesButton').classList.add('buttonPressed');
//     setTimeout(() => {
//         document.getElementById('changeNumberOfShelvesButton').classList.remove('buttonPressed');
//         closeMenu();
//         console.log('rap');
//     }, 200);
// }


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

// ************ Trie implementation borrowed from https://medium.com/@johnadjanohoun/understanding-and-implementing-a-trie-prefix-tree-in-javascript-2417dd5b361c


// class TrieNode {
//     constructor() {
//         this.children = {};
//         this.value = '';
//         this.isEndOfWord = false;
//     }
// }

// class Trie {
//     constructor() {
//         this.root = new TrieNode();
//     }

//     insert(word) {
//         let node = this.root;
//         for (let char of word) {
//             if (!node.children[char]) {
//                 node.children[char] = new TrieNode();
//                 node.value = char;
//             }
//             node = node.children[char];
//         }
//         node.isEndOfWord = true;
//     }

//     search(word) {
//         let node = this._searchPrefix(word);
//         return node !== null && node.isEndOfWord;
//     }

//     startsWith(prefix) {
//         return this._searchPrefix(prefix) !== null;
//     }

//     retriveFrom(prefix) {
//         let words = [];
//         let currentWord = '';
//         let node = this.root;
//         for (let char of prefix) {
//             if (!node.children[char]) {
//                 return null;
//             }
//             while (!node.children[char].isEndOfWord) {
//                 currentWord += node.value;
//                 node = node.children[char];
//             }
//             words.push(currentWord);
//         }

//         return words;
//     }

//     _searchPrefix(prefix) {
//         let node = this.root;
//         for (let char of prefix) {
//             if (!node.children[char]) {
//                 return null;
//             }
//             node = node.children[char];
//         }
//         return node;
//     }
// }

// const trie = new Trie();

// ********* Trie implementation end ***********************************************************************************************************************


function setUpFunction() {
    // // Get locally stored content

    if (localStorage.getItem('content')) {
        content = JSON.parse(localStorage.content);
    } else {
        content = fixedContent;
        localStorage.content = JSON.stringify(content);
    }

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


function shelveNumberHasBeenClicked(event) {
    let clickedNumberID = event.target.id;
    if (clickedNumberID != 'numberOfShelvesDiv' || clickedNumberID != 'changeShelveDiv' ) {
        chosenShelf = Number(clickedNumberID.slice(12));
        document.querySelectorAll('.shelveNum').forEach(button => button.classList.remove('numberActive'));
        document.getElementById(clickedNumberID).classList.add('numberActive');
    }
    curItemObj.shelf = chosenShelf;
}


function numberOfShelvesHasBeenClicked(event) {
    let clickedNumberID = event.target.id;
    if (clickedNumberID != 'numberOfShelvesDiv' || clickedNumberID != 'changeShelveDiv' ) {
        chosenShelf = Number(clickedNumberID.slice(12));
        document.querySelectorAll('.shelveNum').forEach(button => button.classList.remove('numberActive'));
        document.getElementById(clickedNumberID).classList.add('numberActive');
    }
}


function setUpConfirmButtonHasBeenClicked() {
    document.getElementById('setUpDiv').style.display = 'none';
    localStorage.numberOfShelves = chosenShelf;

    document.getElementById('numberOfShelvesDiv').innerHTML = ''; // Remove shelve-number buttons to avoid id-clashes
    
    allButtonWasClicked();
    fillAllTab();
    clearAddItemPage();
}


function changeShelvesConfirmButtonHasBeenClicked() {
    document.getElementById('changeShelvesDiv').style.display = 'none';

    if (chosenShelf < localStorage.numberOfShelves) {
        content.forEach(function(value) {
            if (chosenShelf < value[4]) { value[4] = 1 }  // Move all shelf content to lowest shelf for the items on higher shelfnumber than the new shelf number
        }); 
    }

    localStorage.numberOfShelves = chosenShelf;
    
    document.getElementById('newNumberOfShelvesDiv').innerHTML = ''; // Remove shelve-number buttons to avoid id-clashes
    
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
    currentdiv.style.display = 'flex';
}


function typeButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'block';
    document.getElementById('type').classList.add('tabActive');
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('all').classList.remove('tabActive');
    document.getElementById('oldestTab').style.display = 'none';
    document.getElementById('oldest').classList.remove('tabActive');
    // document.getElementById('type').style.background = 'rgba(153, 222, 238, 0.77)';
    // document.getElementById('all').style.background = 'rgba(211, 211, 211, 0.30)';
    document.getElementById('plusToolTip').style.display = 'none';
    fillTypeTab();
}


function allButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('type').classList.remove('tabActive');
    document.getElementById('allTab').style.display = 'block';
    document.getElementById('all').classList.add('tabActive');
    document.getElementById('oldestTab').style.display = 'none';
    document.getElementById('oldest').classList.remove('tabActive');
    // document.getElementById('type').style.background = 'rgba(211, 211, 211, 0.30)';
    // document.getElementById('all').style.background = 'rgba(153, 222, 238, 0.77)';
    fillAllTab();
}

function oldestButtonWasClicked() {
    document.getElementById('typeTab').style.display = 'none';
    document.getElementById('type').classList.remove('tabActive');
    document.getElementById('allTab').style.display = 'none';
    document.getElementById('all').classList.remove('tabActive');
    document.getElementById('oldestTab').style.display = 'block';
    document.getElementById('oldest').classList.add('tabActive');
    
    fillOldestTab();
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
    for (const value of symbols.keys()) {  // Scrub categories in Type tab
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }
    
    allTab.innerHTML = '';  // Avoid HTML-elements with same ID
    oldestTab.innerHTML = '';

    let now = new Date();
    let bgColourClass = 'bglightgreen';

    content.forEach(function(value) {
        if (value[7]) {
            let currentElement = document.getElementById(value[3]);
            
            let minusOrTrashCan = ' &#10134; ';
            let stock = value[2];
            let monthFrosen = monthNames[new Date(value[6]).getMonth()];
            let daysLeft = Math.round(value[5] * 30 - (now.getTime() - value[6])/(3600000*24));
            let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
            let timeUnit = 'mdr';
            if (months <= 1) {
                bgColourClass = 'bgYellow';
                months = daysLeft;
                if (daysLeft < 15) { bgColourClass = 'bgred' };
                timeUnit = 'dg';
            }
            // if (months < 1) {bgColourClass = 'yellow'};
            // if (daysLeft < 15) {bgColourClass = 'bgred'};
            let noLeft = '';
            if (stock == 0) { minusOrTrashCan = ' &#x1F5D1; '; noLeft = 'noLeft'};
    
            currentElement.nextElementSibling.innerHTML += '<div id="' + value[0] + '" class="itemDiv ' + noLeft + '">' +
            '<span id="edit_' + value[0] + '" class="goesLeft">' + ' ' + capitalizeFirst(value[1]) + '</span>' +
            '<span class="goesRight">' + monthFrosen + ' ' +
            '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
            '<span class="' + bgColourClass + '"> ' + months + ' ' + timeUnit + ' </span>  ' +
            '<span id="stock_' + value[0] + '">' + stock + '</span> ' +
            '<button id="minus_' + value[0] + '" class="minus"> ' + minusOrTrashCan + ' </button> ' + 
            '</span> </div>';
            // '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>';

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
    for (const value of symbols.keys()) {  // Remove content from Type-tab in order to avoid HTML-elements with same ID
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }
    
    allTab.innerHTML = '';
    oldestTab.innerHTML = '';

    let now = new Date();
    let bgColourClass = 'bglightgreen';
    let sortedContent = content;


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
            let daysLeft = Math.round(value[5] * 30 - (now.getTime() - value[6])/(3600000*24));
            let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
            let timeUnit = 'mdr';
            if (months <= 1) {
                bgColourClass = 'bgYellow';
                months = daysLeft;
                if (daysLeft < 15) { bgColourClass = 'bgred' };
                timeUnit = 'dg';
            }
            // if (months < 1) {bgColourClass = 'yellow'};
            // if (daysLeft < 15) {bgColourClass = 'bgred'};
            let noLeft = '';
            if (stock == 0) { minusOrTrashCan = ' &#x1F5D1; '; noLeft = 'noLeft';};
    
            allTab.innerHTML += '<div id="' + value[0] + '" class="itemDiv ' + noLeft + '">' +
            '<span id="edit_' + value[0] + '" class="goesLeft">' + symbol + ' ' + capitalizeFirst(value[1]) + '</span>' +
            '<span class="goesRight">' + monthFrosen + ' ' +
            '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
            '<span class="' + bgColourClass + '"> ' + months + ' ' + timeUnit + ' </span>  ' +
            '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
            '<button id="minus_' + value[0] + '" class="minus"> ' + minusOrTrashCan + ' </button> ' + 
            '</span> </div>'
            // '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>'
            
            bgColourClass = 'bglightgreen';
        }
    });
}


function fillOldestTab() {
    for (const value of symbols.keys()) {  // Remove content from Type-tab in order to avoid HTML-elements with same ID
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }

    allTab.innerHTML = '';
    oldestTab.innerHTML = '';

    let now = new Date();
    let bgColourClass = 'bglightgreen';
    
    // Sort after what spoils first
    let sortedContent = content.sort(function(a, b) {
        return ((Math.round(a[5] - (now.getTime() - a[6])/(3600000*24*30))) 
        - (Math.round(b[5] - (now.getTime() - b[6])/(3600000*24*30))) 
        || a[1] - b[1])  // ...And then alphabetically for equally old food
    });

    sortedContent.forEach(function(value) {
        if (value[7]) {
            let symbol = symbols.get(value[3]);  // Get the symbol maching the type of food
            let minusOrTrashCan = ' &#10134; ';
            let stock = value[2];
            let monthFrosen = monthNames[new Date(value[6]).getMonth()];
            let daysLeft = Math.round(value[5] * 30 - (now.getTime() - value[6])/(3600000*24));
            let months = Math.round(value[5] - (now.getTime() - value[6])/(3600000*24*30));
            let timeUnit = 'mdr';
            if (months <= 1) {
                bgColourClass = 'bgYellow';
                months = daysLeft;
                if (daysLeft < 15) { bgColourClass = 'bgred' };
                timeUnit = 'dg';
            }
            let noLeft = '';
            if (stock == 0) { minusOrTrashCan = ' &#x1F5D1; '; noLeft = 'noLeft';};
    
            oldestTab.innerHTML += '<div id="' + value[0] + '" class="itemDiv ' + noLeft + '">' +
            '<span id="edit_' + value[0] + '" class="goesLeft">' + symbol + ' ' + capitalizeFirst(value[1]) + '</span>' +
            '<span class="goesRight">' + monthFrosen + ' ' +
            '<span> &#x2263;' + value[4] + '</span> ' + // Four bars symbolizing shelf number
            '<span class="' + bgColourClass + '"> ' + months + ' ' + timeUnit + ' </span>  ' +
            '<span id="stock_' + value[0] + '">' + stock + '</span> ' + 
            '<button id="minus_' + value[0] + '" class="minus"> ' + minusOrTrashCan + ' </button> ' + 
            '</span> </div>';
            // '<button id="plus_' + value[0] + '" class="plus"> &#10133; </button> </span> </div>;'
            
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


function deleteRelevantObject(myID, relevantObject) {

}


function typeHasBeenClicked(event) {
    let clickedType = event.target.id;
    if (clickedType != 'typeButtonsDiv1') {
    // if (clickedType != 'typeButtonsDiv1' && clickedType != 'typeButtonsDiv2') {
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

        localStorage.content = JSON.stringify(content);
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
            // curItemObj.showInAllTab = false;
            // document.getElementById(myID).classList.remove('noLeft');
            // document.getElementById('minus_' + myID).textContent = ' \u{2796} ';  // Minus
            // updateRelevantObject(myID, curItemObj);
            let index = content.findIndex((value) => value[0] === Number(myID));
            content.splice(index, 1); // Remove array with the given index
            switch(event.currentTarget.id) {
                case 'typeTab':
                    fillTypeTab();
                    break;
                case 'allTab':
                    fillAllTab();
                    break;
                case 'oldestTab':
                    fillOldestTab();
                    break;
            }
            // if (event.currentTarget.id === 'typeTab') {  // Necessary as each clear the other in order to avoid ID collisions
            //     fillTypeTab();
            // } else {
            //     fillAllTab();
            // }
        }
    // } else if (clickedID.slice(0, 4) == 'plus') {
    //     myID = clickedID.slice(5);  // Remove 'plus_'
    //     curItemObj = findRelevantObject(myID);

    //     document.getElementById('plusToolTip').style.display = 'flex';
    //     document.getElementById('addItem').style.display = 'none'; 

    //     let clickedTop =  document.getElementById(clickedID).getBoundingClientRect().top;
    //     if (clickedTop < 300) { clickedTop += 30} else {clickedTop -= 80};
    //     document.getElementById('plusToolTip').style.top = clickedTop + 'px';

    //     document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
    //     document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';
    //     shaddowFoodTypes();
    //     document.getElementById(curItemObj.type).classList.remove('shaddowed');
        
    //     document.getElementById('numberOfItemsInput').value = curItemObj.number;
    //     document.getElementById('numberMinus1').disabled = true;
        
    //     document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
    //     document.getElementById('minus3').disabled = false;
    //     document.getElementById('minus1').disabled = false;
    //     if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    //     if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
        
    } else if (clickedID.slice(0, 4) == 'edit') {
        myID = clickedID.slice(5);  // Remove 'edit_';
        curItemObj = findRelevantObject(myID);
        
        document.getElementById('addItemPage').style.display = 'flex';
        fillShelveDiv('changeShelveDiv', localStorage.numberOfShelves);
        document.getElementById('addItem').style.display = 'none'; 
        
        document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
        document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';

        document.querySelectorAll('.shelveNum').forEach(button => button.classList.remove('numberActive'));
        document.getElementById('shelveNumber' + curItemObj.shelf).classList.add('numberActive');
        
        shaddowFoodTypes();
        document.getElementById(curItemObj.type + 'Type').classList.remove('shaddowed');
        
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


function inputBoxHasChanges() {
    let newInput = document.getElementById('inputBox');
    let dropDownItemDiv = document.getElementById('dropDownItemDiv');
    let shownItems = [];
    dropDownItemDiv.innerHTML = '';

    if (newInput.value !== '') {
        content.forEach(function(item) {
            let regex = new RegExp('^' + newInput.value);
            if (item[1].match(regex) && !(shownItems.includes(item[1]))) {
                dropDownItemDiv.innerHTML += '<button id="' + item[0] + '" class="dropDownButton"> ' 
                + capitalizeFirst(item[1]) + '</button>';
                
                shownItems.push(item[1]);  // To exclude already shown suggestions
            }
        });
        
        dropDownItemDiv.style.display = 'flex';
    } else {
        dropDownItemDiv.style.display = 'none';
    }
    
}


function inputBoxHasKeyPress(event) {
    let newInput = document.getElementById('inputBox');
    if (event.key === 'Enter') {
        if (document.getElementsByClassName('dropDownButton').length === 1) {
            let currentID;
            content.forEach(function(item) {
                let regex = new RegExp('^' + newInput.value);
                if (item[1].match(regex)    ) {
                    currentID = item[0];
                }
            });
            curItemObj = findRelevantObject(currentID);
            curItemObj.number = 1;

            fillAddItemPage(curItemObj);
        }
    // } else if (event.key === 'ArrowDown') {
    }
}


function dropDownHaveBeenClicked(event) {
    let clickedID = event.target.id;

    curItemObj = findRelevantObject(clickedID);
    curItemObj.number = 1;

    fillAddItemPage(curItemObj);    
}


function fillAddItemPage(curItemObj){
    document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
    document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';
    shaddowFoodTypes();
    document.getElementById(curItemObj.type + 'Type').classList.remove('shaddowed');
    
    document.getElementById('numberOfItemsInput').value = curItemObj.number;
    
    document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
    document.getElementById('minus3').disabled = false;
    document.getElementById('minus1').disabled = false;
    if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
    
    // Clear drop down box
    document.getElementById('dropDownItemDiv').innerHTML = '';
}



function confirmButtonHasBeenClicked() {
    if (document.getElementById('inputBox').value != '') {
        // if (curItemObj.hash != 0 && findRelevantObject(curItemObj.hash)) {
        //     // oldItem = findRelevantObject(newHash);
        //     // oldItem.number = curItemObj.number;
        //     // oldItem.shelf = curItemObj.shelf;
        //     // oldItem.keepsInMonths = curItemObj.keepsInMonths;
        //     // updateRelevantObject(newHash, oldItem);
        //     curItemObj.showInAllTab = true;
        //     updateRelevantObject(curItemObj.hash, curItemObj);
        // } else {
        // }
        let newHash = makeHash(document.getElementById('inputBox').value + document.getElementById('inputBoxMonth').value);
        curItemObj.hash = newHash;
        curItemObj.itemName = document.getElementById('inputBox').value.toLowerCase();
        curItemObj.addedToFreezer = new Date().getTime();
        curItemObj.showInAllTab = true;
        content.push(Object.values(curItemObj));
    }

    localStorage.content = JSON.stringify(content);
    
    closeButtonClicked();
    fillAllTab();
    document.getElementById('dropDownItemDiv').innerHTML = '';  // Remove suggestions from inputbox
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

    localStorage.content = JSON.stringify(content);
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

