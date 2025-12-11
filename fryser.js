let curItemObj;
let numberOfShelves;
let chosenShelf;
let categories;
let backupFileName = '';
let totalBackUp;
let itemIsBeingEdited = false;


const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const allTab = document.getElementById('allTab');
const typeTab = document.getElementById('typeTab');

const fixedContent = [
    //[hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer, showItem]
    // [0, 'brød', 0, 'bread', 0, 8, 0, false],
    // [303686550, 'brød', 1, 'bread', 1, 5, 1761217795422, true],
    // [254164556, 'kylling', 2, 'fowl', 2, 4, 1761217795422, true],
    // [1677053109, 'grønne bønner', 1, 'veggie', 2, 8, 1743617600000, true],
    // [11802677, "is", 1, "cake", 1, 1, 1762349662007, true],
    // [1180267467, "kage", 0, "cake", 1, 3, 1761217795422, true],
    // [11867467, "okse", 1, "meat", 1, 3, 1762349662007, true],
    // [1186743467, "bao", 1, "meal", 1, 3, 1762349772007, true]
    [863840954, 'and hel', 0, 'fowl', 0, 11, 0, false],
    [1239076312, 'isterninger', 0, 'whatEvs', 0, 12, 0, false],
    [747805084,	'andebryst', 0, 'fowl', 0, 8, 0, false],
    [747805084,	'andebryst', 0, 'fowl', 0, 8, 0, false],
    [756649692,	'andelever', 0, 'fowl', 0, 3, 0, false],
    [861777557,	'andelår', 0, 'fowl', 0, 8, 0, false],
    [2023914425, 'andevinger', 0, 'fowl', 0, 8, 0, false],
    [1383475206, 'boller', 0, 'bread', 0, 6, 0, false],
    [2119680384, 'bouillon', 0, 'whatEvs', 0, 4, 0, false],
    [2136587557, 'bov okse', 0, 'meat', 0, 10, 0, false],
    [794475844, 'bryst okse', 0, 'meat', 0, 10, 0, false],
    [3036860, 'brød', 0, 'bread', 0, 8, 0, false],
    [101422, 'bær', 0, 'veggie', 0, 4, 0, false],
    [778168486, 'fiskefars', 0, 'fish', 0, 3, 0, false],
    [97658099, 'fløde', 0, 'whatEvs', 0, 2, 0, false],
    [3148863, 'fond', 0, 'whatEvs', 0, 4, 0, false],
    [1028354125, 'franskbrød', 0, 'bread', 0, 6, 0, false],
    [97711062, 'frugt', 0, 'veggie', 0, 2, 0, false],
    [506890702, 'grovbrød', 0, 'bread', 0, 8, 0, false],
    [2039168563, 'grøntsager', 0, 'veggie', 0, 2, 0, false],
    [708031676, 'gås hel', 0, 'fowl', 0, 11, 0, false],
    [156665882, 'gåsebryst', 0, 'fowl', 0, 8, 0, false],
    [156665882, 'gåsebryst', 0, 'fowl', 0, 8, 0, false],
    [165510490, 'gåselever', 0, 'fowl', 0, 3, 0, false],
    [705968279, 'gåselår', 0, 'fowl', 0, 8, 0, false],
    [1125606793, 'gåsevinger', 0, 'fowl', 0, 8, 0, false],
    [1752132516, 'hale okse', 0, 'meat', 0, 8, 0, false],
    [1351324402, 'hals okse', 0, 'meat', 0, 10, 0, false],
    [1260072156, 'hamburgryg', 0, 'meat', 0, 6, 0, false],
    [132473512, 'hjerte lam', 0, 'meat', 0, 3, 0, false],
    [188387694, 'hjerte okse', 0, 'meat', 0, 3, 0, false],
    [188517128, 'hjerte svin', 0, 'meat', 0, 3, 0, false],
    [1387362553, 'højreb okse', 0, 'meat', 0, 10, 0, false],
    [3340103, 'høne', 0, 'fowl', 0, 10, 0, false],
    [1138885820, 'inderlår okse med kappe', 0, 'meat', 0, 8, 0, false],
    [1291291654, 'inderlår okse uden kappe', 0, 'meat', 0, 10, 0, false],
    [1184232175, 'indmad', 0, 'meat', 0, 3, 0, false],
    [3370, 'is', 0, 'cake', 0, 3, 0, false],
    [982482580 , 'porrer', 0, 'veggie', 0, 10, 0, false],
    [365249293 , 'broccoli', 0, 'veggie', 0, 10, 0, false],
    [21136086 , 'blomkål', 0, 'veggie', 0, 10, 0, false],
    [1895447910 , 'gulerødder', 0, 'veggie', 0, 10, 0, false],
    [3343837 , 'majs', 0, 'veggie', 0, 10, 0, false],
    [442983890 , 'persille', 0, 'veggie', 0, 10, 0, false],
    [3083453 , 'dild', 0, 'veggie', 0, 10, 0, false],
    [976942674 , 'purløg', 0, 'veggie', 0, 10, 0, false],
    [2053420871 , 'lime leaves', 0, 'veggie', 0, 10, 0, false],
    [1577377590 , 'kaffe malet', 0, 'veggie', 0, 10, 0, false],
    [1422659945, 'jordbær', 0, 'veggie', 0, 12, 0, false],
    [921830999, 'hindbær', 0, 'veggie', 0, 12, 0, false],
    [896785250, 'brombær', 0, 'veggie', 0, 12, 0, false],
    [896785250, 'solbær', 0, 'veggie', 0, 12, 0, false],
    [1645293686, 'stikkelsbær', 0, 'veggie', 0, 12, 0, false],
    [3500232, 'ribs', 0, 'veggie', 0, 12, 0, false],
    [95841653 , 'rabarber', 0, 'veggie', 0, 12, 0, false],
    [1382646669 , 'blåbær', 0, 'veggie', 0, 12, 0, false],
    [1677053109, 'grønne bønner', 0, 'veggie', 0, 12, 0, false],
    [1256891325, 'bønner', 0, 'veggie', 0, 12, 0, false],
    [215920725, 'ærter', 0, 'veggie', 0, 12, 0, false],
    [3284148, 'kage', 0, 'cake', 0, 3, 0, false],
    [58415802, 'lagkage', 0, 'cake', 0, 3, 0, false],
    [896610501, 'sorbet', 0, 'cake', 0, 4, 0, false],
    [1754768343, 'klump okse', 0, 'meat', 0, 10, 0, false],
    [1120271721, 'kuller', 0, 'fish', 0, 10, 0, false],
    [1739753175, 'kuvertbrød', 0, 'bread', 0, 4, 0, false],
    [2046171485, 'kylling hel', 0, 'fowl', 0, 1, 0, false],
    [1600469063, 'kyllingebryst', 0, 'fowl', 0, 7, 0, false],
    [1591624455, 'kyllingelever', 0, 'fowl', 0, 3, 0, false],
    [2044108088, 'kyllingelår', 0, 'fowl', 0, 8, 0, false],
    [1703815692, 'kyllingeoverlår', 0, 'fowl', 0, 8, 0, false],
    [1805968950, 'kyllingevinger', 0, 'fowl', 0, 7, 0, false],
    [3314077, 'laks', 0, 'fish', 0, 3, 0, false],
    [1320815086, 'lam mørbrad', 0, 'meat', 0, 8, 0, false],
    [1603677076, 'lam strimler', 0, 'meat', 0, 8, 0, false],
    [1707814411, 'lam tern', 0, 'meat', 0, 8, 0, false],
    [788025712, 'lammehals', 0, 'meat', 0, 8, 0, false],
    [1441823754, 'lammekotelet', 0, 'meat', 0, 8, 0, false],
    [1258432543, 'lammekød hakket', 0, 'meat', 0, 3, 0, false],
    [1258432544, 'hakket lam', 0, 'meat', 0, 3, 0, false],
    [1333737816, 'lammekølle', 0, 'meat', 0, 8, 0, false],
    [1652231166, 'lever lam', 0, 'meat', 0, 3, 0, false],
    [320540676, 'lever okse', 0, 'meat', 0, 3, 0, false],
    [320670110, 'lever svin', 0, 'meat', 0, 3, 0, false],
    [1087733230, 'lyssej', 0, 'fish', 0, 6, 0, false],
    [378442923, 'lår okse', 0, 'meat', 0, 10, 0, false],
    [1081507870, 'makrel', 0, 'fish', 0, 3, 0, false],
    [60526709, 'mascarpone', 0, 'whatEvs', 0, 3, 0, false],
    [282075410, 'mørbrad lam', 0, 'meat', 0, 8, 0, false],
    [154502388, 'mørbrad okse', 0, 'meat', 0, 10, 0, false],
    [154631822, 'mørbrad svin', 0, 'meat', 0, 6, 0, false],
    [867298356, 'mørksej', 0, 'fish', 0, 6, 0, false],
    [1990424930, 'nakkefilet svin', 0, 'meat', 0, 6, 0, false],
    [1849208291, 'nakkekam svin', 0, 'meat', 0, 6, 0, false],
    [1580410636, 'nakkekotelet svin', 0, 'meat', 0, 6, 0, false],
    [1393675813, 'oksebov', 0, 'meat', 0, 10, 0, false],
    [707435996, 'oksebryst', 0, 'meat', 0, 10, 0, false],
    [254112160, 'oksehale', 0, 'meat', 0, 8, 0, false],
    [254112146, 'oksehals', 0, 'meat', 0, 10, 0, false],
    [750757923, 'oksehøjreb', 0, 'meat', 0, 10, 0, false],
    [686012233, 'okseKlump', 0, 'meat', 0, 10, 0, false],
    [2008145503, 'oksekød hakket', 0, 'meat', 0, 6, 0, false],
    [20081455034, 'okse hakket', 0, 'meat', 0, 6, 0, false],
    [2008145504, 'hakket okse', 0, 'meat', 0, 6, 0, false],
    [1393662549, 'okselår', 0, 'meat', 0, 10, 0, false],
    [1948134316, 'oksemørbrad', 0, 'meat', 0, 10, 0, false],
    [1413007128, 'oksenderlår', 0, 'meat', 0, 8, 0, false],
    [856932517, 'okseroastbeef', 0, 'meat', 0, 10, 0, false],
    [1902446194, 'okseschnitzler', 0, 'meat', 0, 10, 0, false],
    [722904088, 'okseskank', 0, 'meat', 0, 8, 0, false],
    [253774227, 'okseslag', 0, 'meat', 0, 8, 0, false],
    [2097600413, 'oksespidsbryst', 0, 'meat', 0, 10, 0, false],
    [723175648, 'oksesteak', 0, 'meat', 0, 10, 0, false],
    [949506578, 'oksestrimler', 0, 'meat', 0, 8, 0, false],
    [253750629, 'oksetern', 0, 'meat', 0, 8, 0, false],
    [251508371, 'oksetværreb', 0, 'meat', 0, 8, 0, false],
    [977043519, 'oksetykkam', 0, 'meat', 0, 10, 0, false],
    [223834459, 'oksetyksteg', 0, 'meat', 0, 10, 0, false],
    [1579047060, 'oksetyndsteg', 0, 'meat', 0, 8, 0, false],
    [240401229, 'okseyderlår', 0, 'meat', 0, 10, 0, false],
    [110352, 'ost', 0, 'whatEvs', 0, 4, 0, false],
    [856137988, 'pølser', 0, 'meat', 0, 2, 0, false],
    [110367512, 'pålæg', 0, 'meat', 0, 2, 0, false],
    [621303195, 'ribbensteg svin', 0, 'meat', 0, 6, 0, false],
    [892683739, 'roastbeef okse', 0, 'meat', 0, 10, 0, false],
    [1147423363, 'rullesteg svin', 0, 'meat', 0, 6, 0, false],
    [492696314, 'rødspætte', 0, 'fish', 0, 6, 0, false],
    [581737045, 'røget fisk', 0, 'fish', 0, 1, 0, false],
    [581566227, 'røget laks', 0, 'fish', 0, 1, 0, false],
    [718878073, 'røget ørred', 0, 'fish', 0, 1, 0, false],
    [798578378, 'rå bacon', 0, 'meat', 0, 2, 0, false],
    [873813138, 'schnitzler okse', 0, 'meat', 0, 10, 0, false],
    [113752, 'sej', 0, 'fish', 0, 6, 0, false],
    [3530318, 'sild', 0, 'fish', 0, 3, 0, false],
    [2056962936, 'skank okse', 0, 'meat', 0, 8, 0, false],
    [986619313, 'skinke svin', 0, 'meat', 0, 6, 0, false],
    [553060188, 'skinkesnitzel', 0, 'meat', 0, 6, 0, false],
    [1429918804, 'skærising', 0, 'fish', 0, 6, 0, false],
    [716401775, 'slag okse', 0, 'meat', 0, 8, 0, false],
    [3538516, 'smør', 0, 'whatEvs', 0, 3, 0, false],
    [366100159, 'spidsbryst okse', 0, 'meat', 0, 10, 0, false],
    [1415523136, 'steak okse', 0, 'meat', 0, 10, 0, false],
    [1194792726, 'strimler okse', 0, 'meat', 0, 8, 0, false],
    [764556098, 'svin mørbrad', 0, 'meat', 0, 6, 0, false],
    [1381679812, 'svin strimler', 0, 'meat', 0, 4, 0, false],
    [421823504, 'svine tern', 0, 'meat', 0, 4, 0, false],
    [978267636, 'svinebov', 0, 'meat', 0, 6, 0, false],
    [978259430, 'svinekam', 0, 'meat', 0, 6, 0, false],
    [1835412888, 'svinekoteletter', 0, 'meat', 0, 5, 0, false],
    [2116000052, 'svinekød. hakket', 0, 'meat', 0, 3, 0, false],
    [2116000053, 'hakket svin', 0, 'meat', 0, 3, 0, false],
    [498203657, 'svineskank', 0, 'meat', 0, 6, 0, false],
    [1997241601, 'tern okse', 0, 'meat', 0, 8, 0, false],
    [110548463, 'torsk', 0, 'fish', 0, 6, 0, false],
    [1756082797, 'tværreb okse', 0, 'meat', 0, 8, 0, false],
    [423842397, 'tykkam okse', 0, 'meat', 0, 10, 0, false],
    [882865317, 'tyksteg okse', 0, 'meat', 0, 10, 0, false],
    [1520491472, 'tyndsteg okse', 0, 'meat', 0, 8, 0, false],
    [1363231514, 'vildt fedt', 0, 'meat', 0, 15, 0, false],
    [96328907, 'vildt magert', 0, 'meat', 0, 19, 0, false],
    [489781325, 'yderlår okse', 0, 'meat', 0, 10, 0, false],
    [232542167, 'ørred', 0, 'fish', 0, 3, 0, false]
]

// TODO: Update Ret Antal Hylder in burger menu

const fixedCategories = ['bread', 'veggie', 'cake', 'fish', 'fowl', 'meat', 'whatEvs', 'meal'];
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
// document.getElementById('addNew').addEventListener('click', addNewItem);
document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('closeButton').addEventListener('click', closeButtonClicked);
document.getElementById('confirmButton').addEventListener('click', confirmButtonHasBeenClicked);
document.getElementById('setUpConfirmButton').addEventListener('click', setUpConfirmButtonHasBeenClicked);
document.getElementById('foodTypeSetUpDiv').addEventListener('click', function(event) { foodTypeSetUpHasBeenClicked(event); });
document.getElementById('adjustFoodTypeDiv').addEventListener('click', function(event) { foodTypeSetUpHasBeenClicked(event); });
document.getElementById('changeShelvesConfirmButton').addEventListener('click', changeShelvesConfirmButtonHasBeenClicked);
document.getElementById('changeCategoriesConfirmButton').addEventListener('click', changeCategoriesConfirmButtonHasBeenClicked);
// document.getElementById('increment').addEventListener('click', incrementNumberOfItemsCounter);
document.getElementById('shelveNumber').addEventListener('click', function(event) { shelveNumberHasBeenClicked(event); }, true);
document.getElementById('numberOfShelvesDiv').addEventListener('click', function(event) { numberOfShelvesHasBeenClicked(event); }, true);
document.getElementById('newNumberOfShelvesDiv').addEventListener('click', function(event) { numberOfShelvesHasBeenClicked(event); }, true);
document.getElementById('inputBox').addEventListener('beforeinput', (event) => {inputBoxHasChanges(event)});
document.getElementById('inputBox').addEventListener('keydown', function(event) { inputBoxHasKeyPress(event); }, true);
document.getElementById('dropDownItemDiv').addEventListener('click', function(event) { dropDownHaveBeenClicked(event); }, true);
document.getElementById('takeBackUpButton').addEventListener('click', takeBackUpButtonClicked);
document.getElementById('confirmRestoreBackUpButton').addEventListener('click', confirmRestoreBackUpButtonClicked);
document.getElementById('cancelBackUpButton').addEventListener('click', cancelBackUpButtonClicked);
document.getElementById('cancelRestoreBackUpButton').addEventListener('click', cancelRestoreBackUpButtonClicked);
document.getElementById('confirmDeleteAllButton').addEventListener('click', confirmDeleteAllButtonClicked);
document.getElementById('cancelDeleteAllButton').addEventListener('click', cancelDeleteAllButtonClicked);


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
        case 'adjustCategoriesButton':
            adjustCategories();
            break;
        case 'backUpButton':
            showBackUpDialog();
            break;
        case 'restoreBackUpButton':
            showRestoreBackUpDialog();
            break;
        case 'deleteAllButton':
            showDeleteAllDialog();
            break;
    }
}


function changeNumberOfShelves() {
    document.getElementById('changeShelvesDiv').style.display = 'flex';
    document.getElementById('choseNumberOfShelvesSetUp').style.display = 'flex';
    // document.getElementById('adjustCategories').style.display = 'flex';
    fillShelveDiv('newNumberOfShelvesDiv', 8);
    
    // Highlight current number of shelves
    document.getElementById('shelveNumber' + localStorage.numberOfShelves).classList.add('numberActive');
}


function adjustCategories() {
    document.getElementById('adjustCategories').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';
    document.querySelectorAll('.foodTypeSetUp').forEach(button => {
        button.classList.add('shaddowed');
    });
    categories.forEach(value => document.getElementById(value + 'AdjustButton').classList.remove('shaddowed'));
}


function showBackUpDialog() {
    document.getElementById('takeBackUp').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';
    
    let now = new Date();
    let date = now.getDate().toString() + '-' + (now.getMonth() + 1).toString() + '-' + now.getFullYear().toString();
    backupFileName = 'FryserBackup_' + date + '.txt';
    document.getElementById('backUpName').value = backupFileName;
}


function showRestoreBackUpDialog() {
    document.getElementById('restoreBackUp').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';

    document.getElementById('restoreBackUpInput').addEventListener('change', readFile, false);
}


function readFile(event) {
  let file = event.target.files[0];
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function(event) {
    totalBackUp = JSON.parse(event.target.result);
  }

  reader.readAsText(file);
}


function confirmRestoreBackUpButtonClicked() {
  if (document.getElementById('restoreBackUpInput').value == '') {
    newMessage('Vælg en backup fil', 2500);
  } else {
    let answer = confirm('Er du sikker på at du vil gendanne denne backup?');
    if (answer) {
      for (item in totalBackUp) {
        localStorage[item] = totalBackUp[item];
      }

      location.reload();

    } else {
      newMessage('Der skete ingen ændringer', 2500);
    }
  }
}


function takeBackUpButtonClicked() {
    // Wrap up data from localStorage in a blob
    let data = JSON.stringify(localStorage);
    let blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    
    // Store the blob by creating a link element, clicking it and removing it again
    let url = window.URL.createObjectURL(blob);
    console.log(url);
    
    let element = window.document.createElement('a');
    element.href = url;
    element.download = backupFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Clean up
    window.URL.revokeObjectURL(url);
    
    document.getElementById('takeBackUp').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
}



function cancelBackUpButtonClicked() {
    document.getElementById('takeBackUp').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    
    newMessage('Intet blev ændret', 3000);
}


function cancelRestoreBackUpButtonClicked() {
    document.getElementById('restoreBackUp').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    
    newMessage('Intet blev ændret', 3000);
}


// function restoreBackUp() {
    //     console.log('restoreBackUp');
    // }

    
function showDeleteAllDialog() {
    document.getElementById('deleteAll').style.display = 'flex';
    document.getElementById('addItem').style.display = 'none';
}


function cancelDeleteAllButtonClicked() {
    document.getElementById('deleteAll').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    
    newMessage('Intet blev ændret', 3000);
}


function confirmDeleteAllButtonClicked() {
    let answer = confirm('Er du SIKKER på at du vil slette alt?!?');
    if (answer) {
        localStorage.clear();

        newMessage('Alt er blevet slettet og siden genindlæses om lidt', 2500);

        setTimeout(() => {
            location.reload();
        }, 2600);
    } else {
        newMessage('Der skete ingen ændringer', 2500)
    }
}


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
        categories = JSON.parse(localStorage.categories);
    } else {
        content = fixedContent;
        localStorage.content = JSON.stringify(content);
        categories = fixedCategories;
        localStorage.categories = JSON.stringify(categories);
    }

    if (!localStorage.numberOfShelves) {
        askForNumberOfShelves();
    } else {
        document.getElementById('addItem').style.display = 'block';
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
    let chosenShelf;
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
    if (!localStorage.setUpFinished) {  // Close Introduction and show Chose Number of Shelves
        document.getElementById('introDiv').style.display = 'none';
        document.getElementById('choseNumberOfShelvesSetUp').style.display = 'flex';
        localStorage.setUpFinished = 'notYet';
    } else if (localStorage.setUpFinished === 'notYet') {  // Close Chose Number of Shelves and show Chose Categoriese
        localStorage.numberOfShelves = chosenShelf;
        document.getElementById('numberOfShelvesDiv').innerHTML = ''; // Remove shelve-number buttons to avoid id-clashes

        document.getElementById('choseNumberOfShelvesSetUp').style.display = 'none';
        document.getElementById('choseCategoriesSetUp').style.display = 'flex';
        localStorage.setUpFinished = 'nearlyThere';
    } else if (localStorage.setUpFinished === 'nearlyThere') {  // Show Chose Categories
        document.getElementById('choseCategoriesSetUp').style.display = 'none';
        localStorage.setUpFinished = 'setUpDone';
        
        document.getElementById('setUpDiv').style.display = 'none';
        document.getElementById('addItem').style.display = 'block';
        
        allButtonWasClicked();
        fillAllTab();
        clearAddItemPage();
    }
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


function changeCategoriesConfirmButtonHasBeenClicked() {
    document.getElementById('adjustCategories').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    localStorage.categories = JSON.stringify(categories);
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
    // document.getElementById('plusToolTip').style.display = 'none';
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


function hideCategories(postfix) {
    fixedCategories.forEach(id => document.getElementById(id + postfix).classList.add('hideCat'));
    categories.forEach(id => document.getElementById(id + postfix).classList.remove('hideCat'));
}


function fillTypeTab() {
    for (const value of symbols.keys()) {  // Scrub categories in Type tab
        let currentElement = document.getElementById(value);
        currentElement.nextElementSibling.innerHTML = '';
        currentElement.style.backgroundColor = 'rgba(84, 255, 255, 0.21)';  // Restore colour for categories that have recieved content since last repaint
    }

    hideCategories('');
    
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
        unPressFoodTypes();
        document.getElementById(clickedType).classList.add('foodTypeActive');
        curItemObj.type = clickedType.replace('Type', '');
    }
}


function foodTypeSetUpHasBeenClicked(event) {
    let clickedType = event.target.id;
    if (clickedType != 'foodTypeSetUpDiv' && clickedType != 'adjustFoodTypeDiv') {
        if (document.getElementById(clickedType).classList.contains('shaddowed')) {
            document.getElementById(clickedType).classList.remove('shaddowed');
            if (clickedType.includes('Adjust')) {
                categories.push(clickedType.slice(0, -12));
            } else {
                categories.push(clickedType.slice(0, -6));
            }
        } else {
            document.getElementById(clickedType).classList.add('shaddowed');
            if (clickedType.includes('Adjust')) {
                categories = categories.filter(item => item !== clickedType.slice(0, -12));
            } else {
                categories = categories.filter(item => item !== clickedType.slice(0, -6));
            }
        }
    }

    localStorage.categories = JSON.stringify(categories);
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
        
        itemIsBeingEdited = true;
        
        document.getElementById('addItemPage').style.display = 'flex';
        fillShelveDiv('changeShelveDiv', localStorage.numberOfShelves);
        document.getElementById('addItem').style.display = 'none'; 
        
        document.getElementById('inputBox').value = capitalizeFirst(curItemObj.itemName);
        document.getElementById('inputBoxMonth').value = monthNames[new Date().getMonth()] + ' ';

        document.querySelectorAll('.shelveNum').forEach(button => button.classList.remove('numberActive'));
        document.getElementById('shelveNumber' + curItemObj.shelf).classList.add('numberActive');
        
        shaddowFoodTypes('.foodType');
        document.getElementById(curItemObj.type + 'Type').classList.remove('shaddowed');
        
        document.getElementById('numberOfItemsInput').value = curItemObj.number;
        if (1 < curItemObj.number) { document.getElementById('numberMinus1').disabled = false; }
        
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
    hideCategories('Type');
}
    

function addNewItem() {
    document.getElementById('addItemPage').style.display = 'flex';
    // document.getElementById('plusToolTip').style.display = 'none';
}


function closeButtonClicked() {
    document.getElementById('addItemPage').style.display = 'none';
    document.getElementById('addItem').style.display = 'block';
    clearAddItemPage();
}


function inputBoxHasChanges(event) {
    const newChar = event.data;
    let newInput = document.getElementById('inputBox');
    let dropDownItemDiv = document.getElementById('dropDownItemDiv');
    let shownItems = [];
    dropDownItemDiv.innerHTML = '';

    if (newChar && (!/[a-zA-Z0-9æøåÆØÅ]/.test(newChar) && !/\s/.test(newChar))) {
        event.preventDefault();
        alert('Brug kun bogstaver og tal, tak')
    } else if (newChar) {
        content.forEach(function(item) {
            let regex = new RegExp('^' + newInput.value);
            if (item[1].match(regex) && !(shownItems.includes(item[1])) && (categories.includes(item[3]))) {
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
    shaddowFoodTypes('.foodType');
    document.getElementById(curItemObj.type + 'Type').classList.remove('shaddowed');
    
    document.getElementById('numberOfItemsInput').value = curItemObj.number;
    
    if (curItemObj.shelf !== 0) {
        document.getElementById('shelveNumber' + curItemObj.shelf).classList.add('numberActive');
    }
    
    document.getElementById('keepsForText').value = curItemObj.keepsInMonths + ' mdr';
    document.getElementById('minus3').disabled = false;
    document.getElementById('minus1').disabled = false;
    if (curItemObj.keepsInMonths < 4) { document.getElementById('minus3').disabled = true; }
    if (curItemObj.keepsInMonths < 2) { document.getElementById('minus1').disabled = true; }
    
    // Clear drop down box
    document.getElementById('dropDownItemDiv').innerHTML = '';
}


function newMessage(message, time) {
    let messageDiv = document.getElementById('message');
    messageDiv.style.display = 'flex';
    messageDiv.innerHTML = '<p> ' + message + '</p>';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, time);
}



function confirmButtonHasBeenClicked() {
    if (document.getElementById('inputBox').value == '') {
        newMessage('Skriv hvad det er du lægger <br> i fryseren under "Indhold"', 3000);
    } else if (curItemObj.shelf === 0) {
        newMessage('Vælg hvilken hylde du <br> vil lægge varen ind på', 3000);
    } else if (curItemObj.type === 'noLabel') {
        newMessage('Vælg hvilken kategori <br> varen er', 3000);
    } else if (document.getElementById('inputBox').value != '') {
        if (itemIsBeingEdited) {
            // Remove duplicate items from the same month, then add the item with new number/shelve/keepsFor...
            content = content.map(value => (value[0] !== Number(curItemObj.hash)) ? value: undefined).filter(Boolean);
            content.push(Object.values(curItemObj));
        } else {
            let newHash = makeHash(document.getElementById('inputBox').value + new Date().getTime().toString());  // + document.getElementById('inputBoxMonth').value);
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
        document.getElementById('changeShelveDiv').innerHTML = '';  // Remove shelves to avoid id clash
    }

    itemIsBeingEdited = false;
}


function incrementNumberOfItemsCounter() {
    if (curItemObj.number == 0) {
        document.getElementById(myID).classList.remove('noLeft');
        document.getElementById('minus_' + myID).textContent = ' \u{2796} '  // Minus
    }
    curItemObj.number += 1;
    updateRelevantObject(myID, curItemObj);
    document.getElementById('stock_' + myID).textContent = curItemObj.number;
    // document.getElementById('plusToolTip').style.display = 'none';

    localStorage.content = JSON.stringify(content);
}


function shaddowFoodTypes(type) {
    document.querySelectorAll(type).forEach(button => {
        button.classList.add('shaddowed');
        button.disabled = true;
    });
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
    curItemObj = new itemObj(1, 'none', 1, 'noLabel', 0, 3, 176207000000); // hash, itemName, number, type, shelf, keepsInMonths, addedToFreezer
}


function capitalizeFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}


// Usefull snippets

// for ( value of document.getElementsByClassName("itemDiv")) {
//  value.style.color = 'green';
//  value.style.backgroundColor = 'red';
// } 

// Make hashes for new items
// ['rabarber', 'blåbær', 'stikkelsbær'].forEach(value => {console.log(makeHash(value), ", '" + value + "'")})