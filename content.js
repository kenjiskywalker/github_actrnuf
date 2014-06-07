// 1. hoge より良い名前つけましょう。例えば、jQuery のオブジェクトなら $age = $('.age') とかにするのが良いです。あと .age だけだとセレクタとして弱く、変なところに色付くかもしれないです。 '.files .age' とか？
// 2. ファイル内でいきなり変数宣言してしまうと、グローバル変数になってしまうので全体を無名関数で囲み、クロージャを生成して、即時実行する。(下記コード参照のこと)
var hoge = $('.age');

// 3. $('.age').each(function(_, value) {}) って書けます
$.each(hoge, function(_, value){
    console.log(value);
    // 4. ここ、jQuery に食わせる意味ないと思います。それよりは var $value = $(value) として、$value.text() で良いのでは。あと一応 trim して空白除去しましょう。
    var hoge = $(value.outerText);
    // 5. 変数名気になる
    var a = hoge.selector;
    if(a.indexOf("year") !== -1){
        // 6. color に渡す value は、定数にしておいた方がよさそう。なんなら、設定値としてオブジェクトで持ってた方がいいのでは。(下記コード参照のこと)
        $(value).css({'color': 'red'});
    }else if(a.indexOf("months ago") !== -1){
        // 7. これ正規表現おかしくないですか
        if(/([5-9|1(0|1)])/.test(a)) {
            $(value).css({'color': 'orange'});
        }
    }else{
        // 8. 設定値が一つの場合は .css('color', '#888') で良いかと
        $(value).css({'color': '#888'});
    }
});


/** オマケ '[]'カッコ内は上記指摘番号

// window (グローバル変数) を global として受け取る [2]
(function(global) {

// 色を付ける設定値を宣言 [6]
var ASSIGN_MAP = [
    {
        re: /year/,
        color: 'red'
    },
    {
        // [7]
        re: /([5-9]|1(0|1))\smonth\sago/,
        color: 'orange'
    }
];
var DEFAULT_COLOR = '#888';

// [3]
$('.files .age').each(function(_, value) {
    // [4, 5]
    var $value = $(value);
    var ageText = $value.text().trim();
    var color = null;

    ASSIGN_MAP.some(function(assign) {
        if (assign.re.test(ageText)) {
            color = assign.color;
            return true;
        }
    });
    // color が設定されてない場合はデフォルト
    if (!color) {
        color = DEFAULT_COLOR;
    }
    // [8]
    $value.css('color', color);
});

})(window);
*/
