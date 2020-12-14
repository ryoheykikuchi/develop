export default class Outputs {
  // メッセージ出力メソッド
  err(): void {
    console.log('\n ! 入力に誤りがあります');
  }
  startMsg(): void {
    console.log('\n ● アクションを選択してください\n   1 : 空腹か聞く\n   2 : 餌をあげる\n   3 : 遊ばせる');
  }
  whom(): void {
    console.log(' ● 対象を選択してください\n   1 : しー\n   2 : キャン');
  }
  what(): void {
    console.log(' ● 餌を選択してください\n   1 : おやつ\n   2 : シーチキン');
  }
  output(msg: string) {
    let decoration: string = '--';
    for (let i = 0; i < msg.length; i ++) {
      decoration += '--';
    }
    console.log('  ' + decoration + '  ');
    console.log(' | ' + msg + ' |');
    console.log('  ' + decoration + '  ');
  }
}