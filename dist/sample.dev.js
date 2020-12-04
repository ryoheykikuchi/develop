"use strict";

/**
 * node.jsを使った対話型コマンドラインツール
 * node.jsはイベントループなので、他の言語のようにwhileで入力待ちしたりしなくていいのがすばらしい
 * 入出力はreadlineを使う
 */
var rl = require('readline'); // readline


var utl = require('util');
/**
 * コンストラクタでコマンドのハンドラーオブジェクトを受け取る
 */


function Cli(handler) {
  this.handler = handler;
}

Cli.prototype.run = function () {
  var self = this; // readlineのインターフェースを構築

  var rli = rl.craeteInterface({
    input: process.stdin,
    output: process.stdout
  }); // プロンプトを定義 後から変更も可能

  rli.setPrompt('> '); // 文字を入力された時に発生するイベント 引数には入力された行が入っている

  rli.on('line', function (line) {
    // 空白でパースして最初をコマンド、残りを引数とする
    var args = line.split(/\s+/),
        cmd = args.shift(); // ハンドラーにコマンドがあったら実行、この時callを使って、ハンドラーのthisをrliにしてやる

    if (self.handler[cmd]) {
      self.handler[cmd].call(rli, args, function (err, res) {
        util.puts(res); // コマンドの実行結果を出力

        rli.prompt();
      });
    } else if (cmd.length > 0) {
      util.puts('cmd not found.');
      rli.prompt();
    } else {
      rli.prompt();
    }

    rli.prompt();
  }).on('close', function () {
    util.puts('');
    process.stdin.destroy();
  });
  rli.prompt();
};

function Handler() {} // サンプル 渡された引数をそのまま出力


Handler.prototype.echo = function (args, fn) {
  fn(null, args);
}; // cliを終了させる


Handler.prototype.exit = function (args, fn) {
  util.puts('bye!');
  this.emit('close');
};

new Cli(new Handler()).run();