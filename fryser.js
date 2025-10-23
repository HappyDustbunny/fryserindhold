
const content = new Map([
  //[name, number, type, shelf, keepsInMonths, addedToFreezer]
    ['Brød', [1, 'bread', 1, 5, 1761217795422]],
    ['Kylling', [2, 'fowl', 2, 4, 1761217795422]]
])

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

    content.forEach(function(value, key) {
        console.log(value, key);
    })
}
