$(function(){

    $('.btn-requset').click(function(){
        if($('.gnb-area').css('display') == 'block'){
            menuActive.reverse();
            $('.requset-area').addClass('active');
        }else{
            $('.requset-area').addClass('active');
        }
    })
    $('.btn-close').click(function(){
        $('.requset-area').removeClass('active');
    })
    //1. 스케일
    gsap.to('.ani-area',1,{
        scale:1.1,
        repeat:-1, //음수는 무한
        yoyo:true

    })

    gsap.from('.sc-visual .thumb-area',{
        scrollTrigger:{
            trigger:".sc-visual",
            start:"top top",
            end:"bottom top",
            scrub:1,
            markers:true
        },
        scale:1.15
    })

    gsap.set('.gnb-area',{
        opacity: 0,
        scale:0.8,
        yPercent:50,
    })
    menuActive = gsap.to('.gnb-area',{
        opacity: 1,
        scale:1,
        display: 'block',
        yPercent:0,
        paused:true
    })

    $('.btn-menu').click(function(){
        menuActive.restart();
    })
    $('.gnb-area .btn-close').click(function(){
        menuActive.reverse();
    })

    /**
     * 
     * 
     * @data-fade
     * @data-stagger
     * 
     */

    $('[data-fade]').each(function(i,el){
        child = $(this).find('>*');
        
        element = $(this).data('stagger') ? $(this).find(">*") : el
        gsap.from(element,{
            scrollTrigger:{
                trigger:el,
                start:"top 80%",
                end:"bottom top",
                markers:true
            },
            stagger:0.1,
            yPercent:30,
            opacity:0
        })

        $('.selection').click(function(){
            $('.select-option').addClass('active');
        })


        const swiper1 = new Swiper(".sc-benefits .swiper", {
            effect: "fade",
            navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
            },
            pagination: {
            el: ".pagination",
            type: 'fraction'
            }
         });
         
        $('.select-option button').click(function(){
            data = {
                nation:$(this).find('.country-name').text(),
                flag:$(this).find('.option-flag').data('flag'),
                code:$(this).find('.option-code').text()
            }
            $('.selection .blind').text(data.nation)
            $('.selection .select-flag i').removeClass().addClass(data.flag)
            $('.selection .select-code').text(data.code)
            $('.select-option').removeClass('active');
        })

        slide7Arr = ['Dream Island','Kolomenskoye','CSKA Arena','Riviera Mall']
        const swiper2 = new Swiper(".sc-infrastructure .swiper", {
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
              },
            pagination: {
                el: ".sc-infrastructure .tab-list",
                clickable: true,
                renderBullet: function (index, className) {
                    //return '<span class="' + className + '">' + (index + 1) + "</span>";
                    return `<a href="#" class="tab-item ${className}">${slide7Arr[index]}</a>`;
                }
            }
        });

        $('.ic-plus').hover(function(){
            $('.info-hover').removeClass('active')
            $(this).parent('.info-hover').addClass('active')
        })

       let isHover = false; // settimeout  중복실행방지

        $('.storage-list .storage-item').hover(function(){
            idx = $(this).index();
            if(isHover === false){
                isHover = true; // 실행이 되자마자 true -> 그 다음에 실행 ㄴㄴ
                $('.sc-storage .current').addClass('hide')// top 100% 더내림
                $('.sc-storage .thumb-box').removeClass('active').eq(idx).addClass('active') // top 0
                
                setTimeout(function(){
                    $('.sc-storage .current').removeClass('hide') // top 100% -> top  -100%
                    $('.sc-storage .thumb-box').removeClass('current').eq(idx).addClass('current') // 작동중인 애한테 넣기
                },1000)
                // 하이드빼고 커런트 들어가야함
            }
            


        })
    })
    // $('[data-stagger]').each(function(i,el){

    //     child = $(this).find('>*')
        
    //     gsap.from(child,{
    //         scrollTrigger:{
    //             trigger:el,
    //             start:"top 80%",
    //             end:"bottom top",
    //             markers:true
    //         },
    //         stagger:0.2,
    //         yPercent:30,
    //         opacity:0
    //     })
    // })
})