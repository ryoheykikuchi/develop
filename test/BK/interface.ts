import { Cat } from './catInterface'

export default class defCat {
  cat: Cat;
  // id: number;
	// name: string;
  // hungerPoint: number;
  // hungerCoefficient: number;
  // monsterMode: boolean;
	
	constructor(id: number, name: string, hungerPoint: number, hungerCoefficient: number, monsterMode: boolean){
    this.cat.id = id;
		this.cat.name = name;
    this.cat.hungerPoint = hungerPoint;
    this.cat.hungerCoefficient = hungerCoefficient;
    this.cat.monsterMode = monsterMode;
  }
  
  // 猫の行動　(文字列を返す)
  // 体調を返す
	telCondition(): string {
		if (this.cat.monsterMode) return this.storm();
    else if (this.cat.hungerPoint >= 60) return (' → ' + this.cat.name + '「ハラヘリ」');
    else return (this.cat.name + '「まだ大丈夫」');
  }
  
  // えさを食べる
  eat(food: string): string {
    if (this.cat.monsterMode) {
      return this.storm();
    } else {
      if (food === 'おやつ') this.cat.hungerPoint -= 40;
      else if (food === 'シーチキン') this.cat.hungerPoint = 0;
      if (this.cat.hungerPoint < 0) this.cat.hungerPoint = 0;
      return (this.cat.name + 'は' + food + 'を食べた');
    }
  }

  // 遊ぶ
  play(): string {
    if (this.cat.monsterMode) {
      return this.storm();
    } else {
      this.cat.hungerPoint += 10 * this.cat.hungerCoefficient;
      if (this.cat.hungerPoint >= 100) this.cat.monsterMode = true;
      return (this.cat.name + 'は遊んでいる');
    }
  }

  // 暴れる
  storm(): string {
    return (this.cat.name + 'は' + '暴れている！');
  }
}
