"use strict";
exports.__esModule = true;
var interface_1 = require("./interface");
var she = new interface_1["default"](1, 'しー', 0, 1, false);
var can = new interface_1["default"](2, 'キャン', 0, 2, false);
var cats = [she, can];
var foods = [
    { id: 1, name: 'おやつ' },
    { id: 2, name: 'シーチキン' },
];
var action = undefined; // 1:空腹か聞く, 2:餌を与える, 3:遊ばせる
var target = undefined; // 1:しー, 2:キャン
var food = undefined; // 1:おやつ, 2:シーチキン
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', function (line) {
    if (!Number.isNaN(parseInt(line))) {
        switch (action) {
            case undefined:
                setAction(parseInt(line));
                break;
            case 1:
                if (askCondition(parseInt(line)))
                    reset();
                break;
            case 2:
                if (target === undefined) {
                    setTarget(parseInt(line));
                }
                else {
                    if (giveFood(target, parseInt(line)))
                        reset();
                    break;
                }
                break;
            case 3:
                if (letPlay(parseInt(line))) {
                    reset();
                }
                break;
        }
    }
    else {
        err();
    }
    reader.prompt();
});
startMsg();
reader.prompt();
// アクションモードを設定する
function setAction(n) {
    if (1 <= n && n <= 3) {
        action = n;
        whom();
    }
    else {
        err();
        startMsg();
    }
}
// ターゲットを設定する(えさをあげるときのみ)
function setTarget(n) {
    if (1 <= n && n <= 2) {
        target = n;
        what();
    }
    else {
        err();
        whom();
    }
}
// 猫に空腹かを聞く
function askCondition(n) {
    var cat = cats.filter(function (cat) { return cat.id === n; })[0];
    if (cat !== undefined) {
        if (cat.monsterMode)
            cat.storm();
        else
            cat.telCondition();
        return true;
    }
    else {
        err();
        whom();
        return false;
    }
}
// えさをあげる
function giveFood(targetId, foodId) {
    var cat = cats.filter(function (cat) { return cat.id === targetId; })[0];
    var food = foods.filter(function (food) { return food.id === foodId; })[0];
    if (cat !== undefined && food !== undefined) {
        if (cat.monsterMode)
            cat.storm();
        else
            cat.eat(food.name);
        return true;
    }
    else {
        err();
        whom();
        return false;
    }
}
// 猫を遊ばせる
function letPlay(n) {
    var cat = cats.filter(function (cat) { return cat.id === n; })[0];
    if (cat !== undefined) {
        if (cat.monsterMode)
            cat.storm();
        else
            cat.play();
        return true;
    }
    else {
        err();
        whom();
        return false;
    }
}
// 最初の状態に戻す
function reset() {
    action = undefined;
    target = undefined;
    food = undefined;
    startMsg();
}
function err() {
    console.log('\n ! 入力に誤りがあります');
}
function startMsg() {
    console.log('\n ● アクションを選択してください(1:空腹か聞く, 2:餌を与える, 3:遊ばせる)');
}
function whom() {
    console.log(' ● 誰に(を)？(1:しー, 2:キャン)');
}
function what() {
    console.log(' ● なにをあげる？(1:おやつ, 2:シーチキン)');
}
