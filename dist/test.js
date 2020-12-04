var actionMode = 0; // a空腹か聞く:1, 餌を与える:2, 遊ばせる:3
var reader1 = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader1.on('line', function (line) {
    switch (Number(line)) {
        case 0:
        case 1:
        case 2:
        case 3:
    }
    reader1.prompt();
});
// reader1.question('What is your name? ', (answer) => {
//   console.log(`Hello, ${answer}!`);
// });
reader1.on('close', function () {
    // この中に入力が終わった後の処理=ロジックを記載する。
    console.log(cats);
});
console.log('who?(1:Owner, 2:She, 3:Can)');
reader1.prompt();
// function ownerAction(): void {
//   console.log('Select action(1:ask, 2:give)');
//   reader1.prompt();
// }
var cats = [
    { name: 'しーちゃん', hungerPoint: 0, hungerCoefficient: 1 },
    { name: 'キャンちゃん', hungerPoint: 0, hungerCoefficient: 2 },
];
// Ownerの行動
// 猫が空腹かを確かめる
// 猫に餌をあげる
// 猫の行動
// 腹の調子を教える
function returnHunger(cat) {
    if (cat.hungerPoint > 100)
        return '暴れる';
    else if (cat.hungerPoint >= 60)
        return 'ハラヘリ';
    else
        return 'まだ大丈夫';
}
// 餌を食べる
function eatFood(cat, foodName) {
    if (foodName === 'おやつ')
        cat.hungerPoint -= 40;
    else if (foodName === 'シーチキン')
        cat.hungerPoint = 0;
}
// 遊ぶ
function play(cat) {
    cat.hungerPoint += 10 * cat.hungerCoefficient;
    console.log(cat.name + 'は遊んでいます');
    actionMode = 0;
    console.log('who?(1:Owner, 2:She, 3:Can)');
}
