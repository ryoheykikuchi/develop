import Cat from './interface';

let she = new Cat(1, 'しー', 0, 1, false);
let can = new Cat(2, 'キャン', 0, 2, false);

let cats: Cat[] = [ she, can ];

const foods: {id: number, name: string}[] = [
  { id: 1, name: 'おやつ' },
  { id: 2, name: 'シーチキン' },
];

let action: number = undefined; // 1:空腹か聞く, 2:餌を与える, 3:遊ばせる
let target: number = undefined; // 1:しー, 2:キャン
let food: number = undefined; // 1:おやつ, 2:シーチキン
const reader = require('readline').createInterface({
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
        if (askCondition(parseInt(line))) reset();
        break;
      case 2:
        if (target === undefined) {
          setTarget(parseInt(line));
        } else {
          if (giveFood(target, parseInt(line))) reset();
          break;
        }
        break;
      case 3:
        if (letPlay(parseInt(line))) {
          reset();
        }
        break;
    }
  } else {
    err();
  }
  reader.prompt();
});
startMsg();
reader.prompt();

// アクションモードを設定する
function setAction(n: number): void {
  if (1 <= n && n <= 3) {
    action = n;
    whom();
  } else {
    err();
    startMsg();
  }
}

// ターゲットを設定する(えさをあげるときのみ)
function setTarget(n: number): void {
  if (1 <= n && n <= 2) {
    target = n;
    what();
  } else {
    err();
    whom();
  }
}

// 猫に空腹かを聞く
function askCondition(n: number): boolean {
  const cat = cats.filter((cat) => cat.id === n)[0];
  if (cat !== undefined) {
    if (cat.monsterMode) cat.storm();
    else cat.telCondition();
    return true;
  } else {
    err();
    whom();
    return false;
  }
}

// えさをあげる
function giveFood(targetId: number, foodId: number): boolean {
  const cat = cats.filter((cat) => cat.id === targetId)[0];
  const food = foods.filter((food) => food.id === foodId)[0];
  if (cat !== undefined && food !== undefined) {
    if (cat.monsterMode) cat.storm();
    else cat.eat(food.name);
    return true;
  } else {
    err();
    whom();
    return false;
  }
}

// 猫を遊ばせる
function letPlay(n: number): boolean {
  const cat = cats.filter((cat) => cat.id === n)[0];
  if (cat !== undefined) {
    if (cat.monsterMode) cat.storm();
    else cat.play();
    return true;
  } else {
    err();
    whom();
    return false;
  }
}

// 最初の状態に戻す
function reset(): void {
  action = undefined;
  target = undefined;
  food = undefined;
  startMsg();
}

function err(): void {
  console.log('\n ! 入力に誤りがあります');
}
function startMsg(): void {
  console.log('\n ● アクションを選択してください\n   1 : 空腹か聞く\n   2 : 餌をあげる\n   3 : 遊ばせる');
}
function whom(): void {
  console.log(' ● 誰に(を)?\n   1 : しー\n   2 : キャン');
}
function what(): void {
  console.log(' ● なにをあげる?\n   1 : おやつ\n   2 : シーチキン )');
}