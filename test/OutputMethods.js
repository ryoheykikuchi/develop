"use strict";
exports.__esModule = true;
var Outputs = /** @class */ (function () {
    function Outputs() {
    }
    // メッセージ出力メソッド
    Outputs.prototype.err = function () {
        console.log('\n ! 入力に誤りがあります');
    };
    Outputs.prototype.startMsg = function () {
        console.log('\n ● アクションを選択してください\n   1 : 空腹か聞く\n   2 : 餌をあげる\n   3 : 遊ばせる');
    };
    Outputs.prototype.whom = function () {
        console.log(' ● 対象を選択してください\n   1 : しー\n   2 : キャン');
    };
    Outputs.prototype.what = function () {
        console.log(' ● 餌を選択してください\n   1 : おやつ\n   2 : シーチキン');
    };
    Outputs.prototype.output = function (msg) {
        var decoration = '--';
        for (var i = 0; i < msg.length; i++) {
            decoration += '--';
        }
        console.log('  ' + decoration + '  ');
        console.log(' | ' + msg + ' |');
        console.log('  ' + decoration + '  ');
    };
    return Outputs;
}());
exports["default"] = Outputs;
