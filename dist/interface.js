"use strict";
exports.__esModule = true;
var Cat = /** @class */ (function () {
    function Cat(id, name, hungerPoint, hungerCoefficient, monsterMode) {
        this.id = id;
        this.name = name;
        this.hungerPoint = hungerPoint;
        this.hungerCoefficient = hungerCoefficient;
        this.monsterMode = monsterMode;
    }
    // 体調を返す
    Cat.prototype.telCondition = function () {
        if (this.monsterMode)
            this.storm();
        else if (this.hungerPoint >= 60)
            console.log(' → ' + this.name + '「ハラヘリ」');
        else
            console.log(' → ' + this.name + '「まだ大丈夫」');
    };
    // えさを食べる
    Cat.prototype.eat = function (food) {
        if (food === 'おやつ')
            this.hungerPoint -= 40;
        else if (food === 'シーチキン')
            this.hungerPoint = 0;
        if (this.hungerPoint < 0)
            this.hungerPoint = 0;
        console.log(' → ' + this.name + 'は' + food + 'を食べた');
    };
    // 遊ぶ
    Cat.prototype.play = function () {
        if (this.hungerPoint >= 100) {
            this.monsterMode = true;
            this.storm();
        }
        else {
            this.hungerPoint += 10 * this.hungerCoefficient;
            console.log(' → ' + this.name + 'は遊んでいる');
        }
    };
    // 暴れる
    Cat.prototype.storm = function () {
        console.log(' → ' + this.name + 'は' + '暴れている！');
    };
    return Cat;
}());
exports["default"] = Cat;
