(function(){
    //菜单列表
    $(".fm-cf li").click(function(){
        $(this).addClass("fc-on").siblings("li").removeClass("fc-on");
        $(".fm-item").css("display","none");
        $(".fm-item").eq($(this).index()).css("display","block");
        $(".fm-cf li:not(.fc-on)").hover(
            function(){
                $(this).addClass("theme-color");
            },
            function(){
                $(this).removeClass("theme-color");
            }
        );
    });
    $(".fm-cf a:not(.fc-on)").hover(
        function(){
            $(this).addClass("theme-color");
        },
        function(){
            $(this).removeClass("theme-color");
        }
    );
    //收藏点击
    $(".fm-clc").click(function(){
        $(this).toggleClass("clc clced")
    })

})();