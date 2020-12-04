"use strict";
exports.__esModule = true;
exports["default"] = {
    // アクションモードを設定する
    setAction: function (n) {
        if (1 <= n && n <= 3) {
            action = n;
        }
        console.log('誰に(を)？(1:しー, 2:キャン)');
    },
    // ターゲットを設定する(えさをあげるときのみ)
    setTarget: function (n) {
        if (1 <= n && n <= 2) {
            target = n;
        }
        console.log('なにをあげる？(1:おやつ, 2:シーチキン)');
    },
    // 猫に空腹かを聞く
    askCondition: function (n) {
        var cat = cats.filter(function (cat) { return cat.id === n; })[0];
        if (cat !== undefined) {
            if (cat.monsterMode)
                cat.storm();
            else
                cat.telCondition();
            return true;
        }
        else {
            this.err();
            console.log('誰に(を)？(1:しー, 2:キャン)');
            return false;
        }
    },
    // えさをあげる
    giveFood: function (targetId, foodId) {
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
            this.err();
            console.log('なにをあげる？(1:おやつ, 2:シーチキン)');
            return false;
        }
    },
    // 猫を遊ばせる
    letPlay: function (n) {
        var cat = cats.filter(function (cat) { return cat.id === n; })[0];
        if (cat !== undefined) {
            if (cat.monsterMode)
                cat.storm();
            else
                cat.play();
            return true;
        }
        else {
            this.err();
            console.log('誰に(を)？(1:しー, 2:キャン)');
            return false;
        }
    },
    // 最初の状態に戻す
    reset: function () {
        action = undefined;
        target = undefined;
        food = undefined;
        this.startMsg();
    },
    err: function () {
        console.log('\n入力に誤りがあります');
    },
    startMsg: function () {
        console.log('\nアクションを選択してください(1:空腹か聞く, 2:餌を与える, 3:遊ばせる)');
    }
};
