import { CatInterface } from './CatInterface';

export default class Cat implements CatInterface {
  id: number;
	name: string;
  hungerPoint: number;
  hungerCoefficient: number;
  monsterMode: boolean;
	
	constructor(cat: CatInterface){
    this.id = cat.id;
		this.name = cat.name;
    this.hungerPoint = cat.hungerPoint;
    this.hungerCoefficient = cat.hungerCoefficient;
    this.monsterMode = cat.monsterMode;
  }
  
  // 猫の行動　(文字列を返す)
  // 体調を返す
	telCondition(): string {
		if (this.monsterMode) return this.storm();
    else if (this.hungerPoint >= 60) return (' → ' + this.name + '「ハラヘリ」');
    else return (this.name + '「まだ大丈夫」');
  }
  
  // えさを食べる
  eat(food: string): string {
    if (this.monsterMode) {
      return this.storm();
    } else {
      if (food === 'おやつ') this.hungerPoint -= 40;
      else if (food === 'シーチキン') this.hungerPoint = 0;
      if (this.hungerPoint < 0) this.hungerPoint = 0;
      return (this.name + 'は' + food + 'を食べた');
    }
  }

  // 遊ぶ
  play(): string {
    if (this.monsterMode) {
      return this.storm();
    } else {
      this.hungerPoint += 10 * this.hungerCoefficient;
      if (this.hungerPoint >= 100) this.monsterMode = true;
      return (this.name + 'は遊んでいる');
    }
  }

  // 暴れる
  storm(): string {
    return (this.name + 'は' + '暴れている！');
  }
}
