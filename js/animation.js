// ローディングアニメーション、テキストアニメーション
document.addEventListener("DOMContentLoaded", function() {
  window.onload = function() {
  // ローディングアニメーション
    let loadingScreen = document.getElementById('loading-screen');
    let mainContent = document.getElementById('main-content');
    loadingScreen.style.opacity = 0;
    loadingScreen.addEventListener('transitionend', function() {
      loadingScreen.style.display = 'none';
    });
    mainContent.style.display = 'block';
    mainContent.style.opacity = 1; 

  // アニメーション　FadeInUp
    ScrollReveal().reveal('.timeline-item', { 
        distance: '100px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom',
        viewFactor: 0.2
    });

    //ネットワーク数字アニメーション
    $(document).ready(function(){
      $('.odometer').each(function() {
          let odometer = new Odometer({
              el: this,
              value: 0,
              theme: 'minimal',
              duration: 3000
          });
          $(this).data('odometerInstance', odometer);
      });

      function handleIntersection(entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.visibility = 'visible';
                  entry.target.classList.add('animated', 'fadeIn');

                  // 获取并设置新的值以触发 odometer 动画
                  let value = $(entry.target).data('value');
                  $(entry.target).data('odometerInstance').update(value);

                  // 停止观察已触发动画的元素
                  observer.unobserve(entry.target);
              }
          });
      }
      let observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5 // 元素至少有50%可见时触发
      });

      let targets = document.querySelectorAll('.odometer');
      targets.forEach(target => {
          observer.observe(target);
      });
    });

    
  };
});


//ナビゲーションバー色変化
$(document).ready(function () {
  let $navbar = $('.navbar');
  let $inquiryBtn = $('.inquiry-btn');
  let $logoText = $('.nav-logo-text');
  let $heroBg = $('.hero-bg');

  function onScroll() {
    if ($(window).scrollTop() > $heroBg.height() -200) {
      $navbar.addClass('scrolled');
      $inquiryBtn.addClass('scrolled');
      $logoText.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
      $inquiryBtn.removeClass('scrolled');
      $logoText.removeClass('scrolled');
    }
  }

  $(window).on('scroll', onScroll);
});

//メリットカードカルーセル
$(document).ready(function(){
  $('.merit-carousel').owlCarousel({
    items: 1,
    loop: false ,
    nav: false,
    dots: false,
    margin:100,
    center: true,
    slideSpeed : 200,
    responsive: {
      0: {
        mergeFit:true,
        items: 1
      },
      768: {
        mergeFit:true,
        items: 1
      }
    }
});


$('.owl-nav-prev').click(function() {
  $('.merit-carousel').trigger('prev.owl.carousel');
});

$('.owl-nav-next').click(function() {
  $('.merit-carousel').trigger('next.owl.carousel');
});
});

  //ボタンアニメーション
  $(document).ready(function() {
    $(".button_su_inner").mouseenter(function(e) {
        let parentOffset = $(this).offset(); 
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("desplode-circle");
        $(this).prev(".su_button_circle").addClass("explode-circle");
    });

    $(".button_su_inner").mouseleave(function(e) {
        let parentOffset = $(this).offset(); 
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("explode-circle");
        $(this).prev(".su_button_circle").addClass("desplode-circle");
    });
});
