var hoge = $('.age');
$.each(hoge, function(_, value){
    console.log(value);
    var hoge = $(value.outerText);
    var a = hoge.selector;
    if(a.indexOf("year") !== -1){
        $(value).css({'color': 'red'});
    }else if(a.indexOf("months ago") !== -1){
        if(/([5-9|1(0|1)])/.test(a)) {
            $(value).css({'color': 'orange'});
        }
    }else{
        $(value).css({'color': '#888'});
    }
});
