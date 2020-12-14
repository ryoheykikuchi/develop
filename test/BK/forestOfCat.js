"use strict";
exports.__esModule = true;
var CatClass_1 = require("./CatClass");
var OutputMethods_1 = require("./OutputMethods");
var ForestOfCats = /** @class */ (function () {
    function ForestOfCats() {
        // 猫配列を定義
        this.arrayCats = [
            {
                id: 1,
                name: 'しー',
                hungerPoint: 0,
                hungerCoefficient: 1,
                monsterMode: false
            },
            {
                id: 2,
                name: 'キャン',
                hungerPoint: 0,
                hungerCoefficient: 2,
                monsterMode: false
            }
        ];
        // 餌配列
        this.foods = [
            { id: 1, name: 'おやつ' },
            { id: 2, name: 'シーチキン' },
        ];
        this.cats = []; // 猫クラス用配列
        // アクション、対象を保持しておくためのフラグ
        this.action = undefined; // 1:空腹か聞く, 2:餌を与える, 3:遊ばせる
        this.target = undefined; // 1:しー, 2:キャン
        // 出力メソッドたち
        this.outputs = new OutputMethods_1["default"]();
    }
    // 猫クラス生成
    ForestOfCats.prototype.initialize = function () {
        for (var _i = 0, _a = this.arrayCats; _i < _a.length; _i++) {
            var cat = _a[_i];
            this.cats.push(new CatClass_1["default"](cat));
        }
    };
    // アクションモードを設定する
    ForestOfCats.prototype.setAction = function (n) {
        if (1 <= n && n <= 3) {
            this.action = n;
            this.outputs.whom();
        }
        else {
            this.outputs.err();
            this.outputs.startMsg();
        }
    };
    // ターゲットを設定する(えさをあげるときのみ)
    ForestOfCats.prototype.setTarget = function (n) {
        if (1 <= n && n <= 2) {
            this.target = n;
            this.outputs.what();
        }
        else {
            this.outputs.err();
            this.outputs.whom();
        }
    };
    // 飼い主の行動
    // 猫に空腹かを聞く
    ForestOfCats.prototype.askCondition = function (n) {
        var cat = this.cats.filter(function (cat) { return cat.id === n; })[0];
        if (cat !== undefined) {
            this.outputs.output(cat.telCondition());
            return true;
        }
        else {
            this.outputs.err();
            this.outputs.whom();
            return false;
        }
    };
    // えさをあげる
    ForestOfCats.prototype.giveFood = function (targetId, foodId) {
        var cat = this.cats.filter(function (cat) { return cat.id === targetId; })[0];
        var food = this.foods.filter(function (food) { return food.id === foodId; })[0];
        if (cat !== undefined && food !== undefined) {
            this.outputs.output(cat.eat(food.name));
            return true;
        }
        else {
            this.outputs.err();
            this.outputs.whom();
            return false;
        }
    };
    // 猫を遊ばせる
    ForestOfCats.prototype.letPlay = function (n) {
        var cat = this.cats.filter(function (cat) { return cat.id === n; })[0];
        if (cat !== undefined) {
            this.outputs.output(cat.play());
            return true;
        }
        else {
            this.outputs.err();
            this.outputs.whom();
            return false;
        }
    };
    // 最初の状態に戻す(一つの行動が完了したとき)
    ForestOfCats.prototype.reset = function () {
        this.action = undefined;
        this.target = undefined;
        this.outputs.startMsg();
    };
    // メイン処理
    ForestOfCats.prototype.main = function (line) {
        if (!Number.isNaN(parseInt(line))) {
            switch (this.action) {
                case undefined:
                    this.setAction(parseInt(line));
                    break;
                case 1:
                    if (this.askCondition(parseInt(line)))
                        this.reset();
                    break;
                case 2:
                    if (this.target === undefined) {
                        this.setTarget(parseInt(line));
                    }
                    else {
                        if (this.giveFood(this.target, parseInt(line)))
                            this.reset();
                        break;
                    }
                    break;
                case 3:
                    if (this.letPlay(parseInt(line))) {
                        this.reset();
                    }
                    break;
            }
        }
        else {
            this.outputs.err();
        }
    };
    // はじめに実行される関数
    ForestOfCats.prototype.start = function () {
        this.initialize();
        this.outputs.startMsg();
    };
    return ForestOfCats;
}());
var foc = new ForestOfCats();
// 標準入力受付
var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', function (line) {
    foc.main(line);
    reader.prompt();
});
// プログラム開始
foc.start();
reader.prompt();
