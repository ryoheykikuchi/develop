import Cat from './CatClass';
import { CatInterface } from './CatInterface';
import Outputs from './OutputMethods';

class ForestOfCats {
  // 猫配列を定義
  arrayCats: CatInterface[] = [
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
  foods: {id: number, name: string}[] = [
    { id: 1, name: 'おやつ' },
    { id: 2, name: 'シーチキン' },
  ];

  cats: Cat[] = []; // 猫クラス用配列

  // アクション、対象を保持しておくためのフラグ
  action: number = undefined; // 1:空腹か聞く, 2:餌を与える, 3:遊ばせる
  target: number = undefined; // 1:しー, 2:キャン

  // 出力メソッドたち
  outputs = new Outputs();

  // 猫クラス生成
  initialize(): void {
    for (const cat of this.arrayCats) {
      this.cats.push(new Cat(cat));
    }
  }

  // アクションモードを設定する
  setAction(n: number): void {
    if (1 <= n && n <= 3) {
      this.action = n;
      this.outputs.whom();
    } else {
      this.outputs.err();
      this.outputs.startMsg();
    }
  }

  // ターゲットを設定する(えさをあげるときのみ)
  setTarget(n: number): void {
    if (1 <= n && n <= 2) {
      this.target = n;
      this.outputs.what();
    } else {
      this.outputs.err();
      this.outputs.whom();
    }
  }

  // 飼い主の行動
  // 猫に空腹かを聞く
  askCondition(n: number): boolean {
    const cat = this.cats.filter((cat) => cat.id === n)[0];
    if (cat !== undefined) {
      this.outputs.output(cat.telCondition());
      return true;
    } else {
      this.outputs.err();
      this.outputs.whom();
      return false;
    }
  }

  // えさをあげる
  giveFood(targetId: number, foodId: number): boolean {
    const cat = this.cats.filter((cat) => cat.id === targetId)[0];
    const food = this.foods.filter((food) => food.id === foodId)[0];
    if (cat !== undefined && food !== undefined) {
      this.outputs.output(cat.eat(food.name));
      return true;
    } else {
      this.outputs.err();
      this.outputs.what();
      return false;
    }
  }

  // 猫を遊ばせる
  letPlay(n: number): boolean {
    const cat = this.cats.filter((cat) => cat.id === n)[0];
    if (cat !== undefined) {
      this.outputs.output(cat.play());
      return true;
    } else {
      this.outputs.err();
      this.outputs.whom();
      return false;
    }
  }

  // 最初の状態に戻す(一つの行動が完了したとき)
  reset(): void {
    this.action = undefined;
    this.target = undefined;
    this.outputs.startMsg();
  }

  // メイン処理
  main(line): void {
    if (!Number.isNaN(parseInt(line))) {
      switch (this.action) {
        case undefined:
          this.setAction(parseInt(line));
          break;
        case 1:
          if (this.askCondition(parseInt(line))) this.reset();
          break;
        case 2:
          if (this.target === undefined) {
            this.setTarget(parseInt(line));
          } else {
            if (this.giveFood(this.target, parseInt(line))) this.reset();
            break;
          }
          break;
        case 3:
          if (this.letPlay(parseInt(line))) {
            this.reset();
          }
          break;
      }
    } else {
      this.outputs.err();
    }
  }
  // はじめに実行される関数
  start(): void {
    this.initialize();
    this.outputs.startMsg();
  }
}

const foc: ForestOfCats = new ForestOfCats();
// 標準入力受付
const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  foc.main(line);
  reader.prompt();
});

// プログラム開始
foc.start();
reader.prompt();