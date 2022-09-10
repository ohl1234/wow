$(function(){
    /**
     *  1. header event
     *  1-1. 스크롤 시 sticky header
     *  1-2. btn-request 클릭 시 이벤트
     *  1-3. btn-menu클릭 시 gsap이벤트
     *  1-4. 앵커포인트 클릭 시 메뉴 닫힘
     */

    $(window).scroll(function(){
        curr = $(this).scrollTop();
        href = $('#about').offset().top;

        if (curr >= href) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        };
    });

    $('.btn-requset').click(function(){
        if($('.gnb-area').css('display') == 'block'){
            menuOpen.reverse();
            $('.requset-area').addClass('active');
        }else{
            $('.requset-area').addClass('active');
        }
    });
    $('.requset-area .btn-close').click(function(){
        $('.requset-area').removeClass('active');

        $('.requset-area .selection .blind').text('Russia');
        $('.requset-area .selection .select-flag i').addClass('russia');
        $('.requset-area .selection .select-code').text('+7');
        $('.requset-area .select-option').removeClass('active');
    });

    gsap.set('.gnb-area',{
        opacity:0,
        scale:0.8,
        yPercent:50
    });
    menuOpen = gsap.to('.gnb-area',{
        opacity:1,
        scale:1,
        display:"block",
        yPercent:0,
        paused:true // 애니메이션 중지
    });

    $('.btn-menu').click(function(){
        menuOpen.restart();  // 다시 애니메이션 시작가능
    });
    $('.gnb-area .btn-close').click(function(){
        menuOpen.reverse(); // gsap.set 상태로 
    });

    $('.gnb-area a').click(function(){
        const headerHeight = $('.header').outerHeight(); // header height값

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - (headerHeight + 40)
        },500);
        menuOpen.reverse();
    });

    /**
     *  2. main event
     *  2-1. sc-visual gsap 
     *  2-2. 공통 gsap // each문, if?문 data-fade data-stagger
     *  2-3. sc-infrastructure img
     *  2-4. sc-apartments layout
     *  2-5. developer tit ani
     *  2-6. 셀렉트 국기변경,정보변경 // 객체,text(),addclass,removeclass
     *  2-7. ic-plus hover 이벤트
     *  2-8. .sc-finishing .btn-tab 이벤트
     *  2-9. .sc-storage hover 이벤트 // 미완성
     */

    gsap.to('.ani-area',1,{
        scale:1.1,
        repeat:-1, //음수는 무한
        yoyo:true,
        duration:1
    });

    gsap.from('.sc-visual .thumb-area',{
        scrollTrigger:{
            trigger:".sc-visual",
            start:"top top",
            end:"bottom top",
            scrub:1,
        },
        scale:1.15
    });

    $('[data-fade]').each(function(i,el){
        child = $(this).find('>*');

        element = $(this).data('stagger') ? $(this).find('>*') : el;
        // 만약 긱 data-fade에 data-stagger가 있으면 data-stagger > * 선택. 아니면 data-fade의 갯수 
        gsap.from(element,{
            scrollTrigger:{
                trigger:el,
                start:"top 80%",
                end:"bottom top",
            },
            stagger:0.1,
            yPercent:30,
            opacity:0,
            duration:0.7
        })
    });

    gsap.from('.sc-infrastructure img',{
        scrollTrigger:{
            trigger:".sc-infrastructure",
            start:"top 80%",
            end:"bottom top",
            scrub:1
        },
        yPercent:10
    });

    const layoutAni = gsap.timeline({
        scrollTrigger:{
            trigger:".sc-apartments",
            start:"top 80%",
            end:"bottom top",
            scrub:1
        }
    });
    layoutAni.addLabel('a')
    .from('.sc-apartments .wrap1',{yPercent:40},'a')
    .from('.sc-apartments .wrap2',{yPercent:-40},'a')

    gsap.to('.sc-developer .tit-ani',{
        scrollTrigger:{
            trigger:".group-project .project-area",
            start:"top 30%",
            end:"bottom top",
            scrub:1,
            duration:1.5
        },
        xPercent:-100
    })

    // requset-area
    $('.requset-area .selection').click(function(){
        $('.requset-area .select-option').addClass('active');
    });

    $('.requset-area .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.requset-area .selection .blind').text(data.nation);
        $('.requset-area .selection .select-flag i').removeClass().addClass(data.flag);
        $('.requset-area .selection .select-code').text(data.code);
        $('.requset-area .select-option').removeClass('active');
    });

    // sc-location
    $('.sc-location .selection').click(function(){
        $('.sc-location .select-option').addClass('active');
    });

    $('.sc-location .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.sc-location .selection .blind').text(data.nation);
        $('.sc-location .selection .select-flag i').removeClass().addClass(data.flag);
        $('.sc-location .selection .select-code').text(data.code);
        $('.sc-location .select-option').removeClass('active');
    });

    //sc-payment
    $('.sc-payment .selection').click(function(){
        $('.sc-payment .select-option').addClass('active');
    });

    $('.sc-payment .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.sc-payment .selection .blind').text(data.nation);
        $('.sc-payment .selection .select-flag i').removeClass().addClass(data.flag);
        $('.sc-payment .selection .select-code').text(data.code);
        $('.sc-payment .select-option').removeClass('active');
    });


    $('.ic-plus').hover(function(){
        $(this).parent().addClass('active');
        $(this).siblings('.info-box').addClass('active');
    },function(){
        $(this).parent().removeClass('active');
        $(this).siblings('.info-box').removeClass('active');
    });

    $('.sc-finishing .btn-tab').click(function(e){
        e.preventDefault();

        target = $(this).data('target');

        $(this).addClass('active').siblings().removeClass('active');
        $('[data-id='+target+']').addClass('active').siblings().removeClass('active');
    });

    $('.sc-storage .thumb-box').eq(0).addClass('active')
    $('.sc-storage .storage-item').mouseenter(function(){
        idx = $(this).index();
        $('.sc-storage .thumb-box').siblings().removeClass('active').eq(idx).addClass('active')
    })


    /**
     *  3. swiper-slide event
     */

    const swiper1 = new Swiper(".sc-benefits .swiper", {
    effect: "fade",
    navigation: {
        nextEl: ".next1",
        prevEl: ".prev1",
        },
        pagination: {
        el: ".pagination",
        type: 'fraction'
        }
    });

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
                return `<a href="#" class="tab-item ${className}">${slide7Arr[index]}</a>`;
            }
        }
    });

    const swiper3 = new Swiper(".sc-rare .swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        navigation: {
        nextEl: ".next2",
        prevEl: ".prev2",
        }
    });

    const swiper4 = new Swiper(".sc-finishing .swiper", {
        effect: "fade",
        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        },
        pagination: {
          el: ".pagination",
          clickable: true,
        },
    });

    const swiper5 = new Swiper(".sc-gallery .swiper", {
        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        },
        pagination: {
          el: ".pagination",
          clickable: true,
        },
    });
})
