var items;
var firstItem;
var lastItem;
var currentItem;
var currentItemId;

window.onload = function () {
    initializeItems();
    hideAllItems();
    showItem(currentItem);
    initializeNavigation();
};

function initializeItems() {
    items = document.getElementsByClassName("item");
    firstItem = items.item(0);
    lastItem = items.item(items.length - 1);
    currentItem = firstItem;
    currentItemId = 0;
}

function hideAllItems() {
    var nbItems = items.length;

    for (var i = 0; i < nbItems; i++) {
        items.item(i).style.display = "none";
    }
}

function showItem(item) {
    item.style.display = "initial";
}

function initializeNavigation() {
    document.getElementById("previous").onclick = previous;
    document.getElementById("next").onclick = next;
    document.getElementsByClassName("select-item").onclick = selectItem;
}

function previous() {
    if (currentItem == firstItem) {
        currentItem = lastItem;
    } else {

    }

    hideAllItems();
    showItem(currentItem);
}

function next() {
    if (currentItem == lastItem) {
        currentItem = firstItem;
    } else {

    }

    hideAllItems();
    showItem(currentItem);
}

function selectItem() {

}