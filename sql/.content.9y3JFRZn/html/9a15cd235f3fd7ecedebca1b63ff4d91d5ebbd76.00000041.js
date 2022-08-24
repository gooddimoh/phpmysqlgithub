(function($) {
    $.fn.liMarquee = function(params) {
        var p = $.extend({
            direction: 'left',
            //Указывает направление движения содержимого контейнера (left | up)
            loop: -1,
            //Задает, сколько раз будет прокручиваться содержимое. "-1" для бесконечного воспроизведения движения
            scrolldelay: 0,
            //Величина задержки в миллисекундах между движениями
            scrollamount: 50,
            //Скорость движения контента (px/sec)
            circular: true
        }, params);
        return this.each(function() {
            var loop = p.loop;
            var strWrap = $(this).addClass('str_wrap');
            strWrap.wrapInner($('<div>').addClass('str_move'));
            var strMove = $('.str_move', strWrap);
            var strMoveClone = strMove.clone().addClass('str_move_clone');
            var time = 0;
            if (p.direction == 'left') {
                var strWrapWidth = strWrap.width();
                var strMoveWidth = strMove.width();
                strWrap.height(strMove.outerHeight())
                if (strMoveWidth > strWrapWidth) {


                    if (p.circular) {
                        strMoveClone.clone().css({
                            right: -strMoveWidth,
                            width: strMoveWidth
                        }).appendTo(strMove);
                        strMoveClone.css({
                            left: -strMoveWidth,
                            width: strMoveWidth
                        }).appendTo(strMove);
                    }
                    var strMoveLeft = strWrapWidth;
                    var k1 = 0;


                    //strMove.css({left:strWrapWidth})
                    var timeFunc = function() {
                        time = (strMoveWidth + strMove.position().left) / p.scrollamount * 1000;
                        return time
                    };
                    var moveFunc = function() {
                        if (loop != 0) {
                            var leftPos = -strMoveWidth;
                            if (p.circular) {
                                leftPos = -(strMoveWidth + (strMoveWidth - strWrapWidth));
                            }
                            strMove.animate({
                                left: leftPos
                            }, timeFunc(), 'linear', function() {
                                $(this).css({
                                    left: strWrapWidth
                                });
                                if (loop == -1) {
                                    setTimeout(moveFunc, p.scrolldelay)
                                } else {
                                    loop--;
                                    setTimeout(moveFunc, p.scrolldelay)
                                }
                            });


                        }
                    };
                    moveFunc();
                    
                    $('.newsticker').delegate('.str_move', 'mouseenter', function() {
                        $(this).addClass('str_active');
                        strMove.stop(true);
                    })
                    $('.newsticker').delegate('.str_move', 'mouseleave', function() {
                        $(this).removeClass('str_active');
                        moveFunc();
                    })
                    if (p.drag) {
                        strWrap.on('mousedown', function(e) {
                            strMoveLeft = strMove.position().left;
                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
                            $(this).on('mousemove', function(e) {
                                console.log(k1 + (e.clientX - strWrap.offset().left))
                                strMove.stop(true).css({
                                    left: k1 + (e.clientX - strWrap.offset().left)
                                });
                            }).on('mouseup', function() {
                                $(this).off('mousemove');
                            });
                        });
                    } else {
                        $(this).addClass('no_drag')
                    };
                } else {
                    strWrap.addClass('str_static');
                };
            }; /*##########vertical##########*/
            if (p.direction == 'up') {
                strWrap.addClass('str_vertical');
                var strWrapHeight = strWrap.height();
                var strMoveHeight = strMove.height();

                if (strMoveHeight > strWrapHeight) {
                    if (p.circular) {
                        strMoveClone.clone().css({
                            bottom: -strMoveHeight,
                            height: strMoveHeight
                        }).appendTo(strMove);
                        strMoveClone.css({
                            top: -strMoveHeight,
                            height: strMoveHeight
                        }).appendTo(strMove);
                    }
                    var k2 = 0;

                    //strMove.css({top:strWrapHeight});
                    var timeFunc = function() {
                        time = (strMoveHeight + strMove.position().top) / p.scrollamount * 1000;
                        return time;
                    };
                    var moveFunc = function() {
                        if (loop != 0) {
                            //strMove.animate({top:-strMoveHeight},timeFunc(),'linear',function(){
                            var topPos = -strMoveHeight;
                            if (p.circular) {
                                topPos = -(strMoveHeight + (strMoveHeight - strWrapHeight));
                            }
                            strMove.animate({
                                top: topPos
                            }, timeFunc(), 'linear', function() {
                                $(this).css({
                                    top: strWrapHeight
                                });
                                if (loop == -1) {
                                    setTimeout(moveFunc, p.scrolldelay);
                                } else {
                                    loop--;
                                    setTimeout(moveFunc, p.scrolldelay);
                                };
                            });
                        };
                    };
                    moveFunc();
                    strWrap.on('mouseenter', function() {
                        $(this).addClass('str_active');
                        strMove.stop(true);
                    }).on('mouseleave', function() {
                        $(this).removeClass('str_active');
                        moveFunc();
                    })

                } else {
                    strWrap.addClass('str_static');
                };
            };
        });
    };
})(jQuery);