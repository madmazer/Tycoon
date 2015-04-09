var credits = 5000;

var Comtainium = {
    owned: 0,
    price: 5
}
var Avrarium = {
    owned: 0,
    price: 20
}
var Rartainia = {
    owned: 0,
    price: 50
}
var ExotCrystals = {
    owned: 0,
    price: 150
}

var minerArray = ["d100", "d250", "d400", "m120", "m750", "m900"];

var unitmodarray = [1, 10, 50, 100];

var d100 = {
    owned: 0,
    ComtRate: 10,
    AvraRate: 0,
    RartRate: 0,
    ExotRate: 0,
    cost: 1800,
    maxallowed: 20,
    speed: 10000,
    reliablity: 30

};
var d250 = {
    owned: 0,
    ComtRate: 30,
    AvraRate: 0,
    RartRate: 0,
    ExotRate: 0,
    cost: 6750,
    maxallowed: 20,
    speed: 8000,
    reliablity: 15

};
var d400 = {
    owned: 0,
    ComtRate: 100,
    AvraRate: 0,
    RartRate: 0,
    ExotRate: 0,
    cost: 29000,
    maxallowed: 20,
    speed: 7000,
    reliablity: 45

};
var m120 = {
    owned: 0,
    ComtRate: 500,
    AvraRate: 5,
    RartRate: 0,
    ExotRate: 0,
    cost: 55000,
    maxallowed: 20,
    speed: 15000,
    reliablity: 40

};
var m750 = {
    owned: 0,
    ComtRate: 800,
    AvraRate: 125,
    RartRate: 2,
    ExotRate: 0,
    cost: 120000,
    maxallowed: 20,
    speed: 15,
    reliablity: 20

};
var m900 = {
    owned: 0,
    ComtRate: 500,
    AvraRate: 250,
    RartRate: 1,
    ExotRate: 0,
    cost: 1450000,
    maxallowed: 20,
    speed: 10000,
    reliablity: 50

};



function onClicked(p1) {


    if (credits >= window[p1].cost) {


        credits = credits - (window[p1].cost);
        window[p1].owned = window[p1].owned + 1;

        document.getElementById(p1).innerHTML = window[p1].owned;
    }

}

function tradeclick(p1) {
    var cash = window[p1].owned * window[p1].price;
    window[p1].owned = 0;
    credits = credits + cash;

}




//*****HUD*****//

function displayHUD() {
    document.getElementById("HUDCash").innerHTML = "Credits: " + Math.round(credits);
    document.getElementById("comt").innerHTML = "Comtainium: " + Comtainium.owned;
    document.getElementById("avra").innerHTML = "Avrarium: " + Avrarium.owned;
    document.getElementById("rart").innerHTML = "Rartainia: " + Rartainia.owned;
    document.getElementById("exot").innerHTML = "Exot Crystals: " + ExotCrystals.owned;
    document.getElementById("Comtainium").innerHTML = Comtainium.price;
    document.getElementById("Avrarium").innerHTML = Avrarium.price;
    document.getElementById("Rartainia").innerHTML = Rartainia.price;
    document.getElementById("ExotCrystals").innerHTML = ExotCrystals.price;


    minerArray.forEach(printStats);



}

function printStats(p1) {
    var EleID = p1;
    var start = "hud";
    var endCost = "Cost";
    var endOwned = "Owned";
    var endRel = "Rel";
    var costs = start + EleID + endCost;
    var owned = start + EleID + endOwned;
    var Rel = start + EleID + endRel;

    document.getElementById(costs).innerHTML = window[p1].cost;
    document.getElementById(owned).innerHTML = window[p1].owned;
    document.getElementById(Rel).innerHTML = window[p1].reliablity;


}

setInterval(displayHUD, 500);



/*****ENDHUD*****/

/*****|MINING ACTIONS|******/

function mine(a1) {

    if (a1.owned > 0) {

        var rateComt = a1.ComtRate * a1.owned;
        var rateAvra = a1.AvraRate * a1.owned;
        var rateRart = a1.RartRate * a1.owned;
        var rateExot = a1.ExotRate * a1.owned;

        Comtainium.owned = Comtainium.owned + rateComt;
        Avrarium.owned = Avrarium.owned + rateAvra;
        Rartainia.owned = Rartainia.owned + rateRart;
        ExotCrystals.owned = ExotCrystals.owned + rateExot;

    }
}




//for each object this is per turn GOING TO USE ARRAYS INSTEAD//

setInterval(function () {
    mine(d100);
}, d100.speed);
setInterval(function () {
    mine(d250);
}, d250.speed);
setInterval(function () {
    mine(d400);
}, d400.speed);
setInterval(function () {
    mine(m120);
}, d400.speed);
setInterval(function () {
    mine(m750);
}, d400.speed);
setInterval(function () {
    mine(m900);
}, d400.speed);




/**Random Events**/

/** declare random function**/
function getRand() {
    return (Math.floor((Math.random() * 100) + 1));
}

function ranMiner() {
    var ranMiner = minerArray[Math.floor(Math.random() * minerArray.length) + 0];
    return ranMiner;

}

/*declare functions for events**/

function eventDefect(a1) {
    var test = getRand();


    if (test <= window[a1].reliablity) {

        var affected = window[a1].owned * 0.8;
        var costperunit = window[a1].cost * 0.2;
        var cost = affected * costperunit;

        credits = credits - cost;

        console.log(a1 + " Drone Error: " + affected + " Needed Repairs it cost " + cost + " Credits to fix");

    } else

        console.log("safe " + ranMiner());




}

/**event timing**/

setInterval(function () {
    eventDefect(ranMiner());
}, 5000);





function save() {
    localStorage.setItem("Array", JSON.stringify(d100));

}

setInterval(save, 500);

function load() {
    d100 = JSON.parse(localStorage.getItem("Array"));
    console.log(getStorage.owned);

}

$(document).ready(function () {
    $("p").css("text-decoration", "line-through");
    $("#marketplacedisplay").hide;



});

$("#marketplace").on({
    click: function () {
        $("#marketplacedisplay").toggle(200);
        $("#mainarea").toggle(800);
        load();
    },


});




