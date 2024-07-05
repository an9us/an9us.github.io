// ローディングアニメーション、テキストアニメーション
document.addEventListener("DOMContentLoaded", function() {
  window.onload = function() {
      var loadingScreen = document.getElementById('loading-screen');
      var mainContent = document.getElementById('main-content');

      // loadingScreen.style.display = 'none';
      // mainContent.style.display = 'block';
      // mainContent.style.opacity = 1; 
      
      // 设置loading-screen的透明度为0
      loadingScreen.style.opacity = 0;

      // 在过渡结束后将loading-screen隐藏
      loadingScreen.addEventListener('transitionend', function() {
        loadingScreen.style.display = 'none';
      });

      // 显示main-content
      mainContent.style.display = 'block';
      mainContent.style.opacity = 1; 


      
      // document.body.style.overflow = 'auto'; 
      
      ScrollReveal().reveal('.timeline-item', { 
          distance: '100px',
          duration: 1000,
          easing: 'ease-in-out',
          origin: 'bottom',
          viewFactor: 0.2
      });

      document.querySelectorAll('.textanimation').forEach(element => {
          initializeTextAnimation(element);
      });

      const observer = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: '0px',
          threshold: 0.5 // 50%可见时触发
      });

      document.querySelectorAll('.textanimation').forEach(element => {
          observer.observe(element);
      });

      $('.odometer').each(function() {
          var odometer = new Odometer({ 
              el: this, 
              value: 0, 
              theme: 'minimal',
              duration: 3000
          });
          $(this).data('odometer', odometer);
      });

      let odometerObserver = new IntersectionObserver(handleOdometerIntersection, {
          threshold: 0.5 // 元素至少有50%可见时触发
      });

      document.querySelectorAll('.odometer').forEach(target => {
          odometerObserver.observe(target);
      });
  };
});

function initializeTextAnimation(element) {
  const string = element.innerHTML;
  const split = string.split(/(<br>)/g); // 保留<br>标签

  element.innerHTML = "";
  split.forEach((part) => {
      if (part === "<br>") {
          element.innerHTML += "<br>";
      } else {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = part;
          while (tempDiv.firstChild) {
              wrapTextNodes(tempDiv.firstChild);
              element.appendChild(tempDiv.firstChild);
          }
      }
  });
}

function wrapTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      node.textContent = "";
      text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'char';
          node.parentNode.insertBefore(span, node);
      });
      node.remove();
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach(child => wrapTextNodes(child));
  }
}

function animateText(element) {
  let char = 0;
  const spans = element.querySelectorAll('span');
  const totalChars = spans.length;

  const delay = element.getAttribute('data-animation-delay') || 20; // 20毫秒

  const timer = setInterval(() => {
      const span = spans[char];
      span.classList.add('transform');
      char++;
      if (char === totalChars) {
          clearInterval(timer);
      }
  }, delay);
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          animateText(entry.target);
          observer.unobserve(entry.target);
      }
  });
}

function handleOdometerIntersection(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.classList.add('animated', 'fadeIn');

          const odometer = $(entry.target).data('odometer');
          if (entry.target.id === 'odometer1') {
              odometer.update(1000);
          } else if (entry.target.id === 'odometer2') {
              odometer.update(3000);
          } else if (entry.target.id === 'odometer3') {
              odometer.update(10000);
          } else if (entry.target.id === 'odometer4') {
              odometer.update(15000);
          }

          observer.unobserve(entry.target);
      }
  });
}

//ナビゲーションバー
$(document).ready(function () {
  var $navbar = $('.navbar');
  var $inquiryBtn = $('.inquiry-btn');
  var $logoText = $('.nav-logo-text');
  var $heroBg = $('.hero-bg');

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

// 数字アニメーション
$(document).ready(function(){
    // 初期化odometer
    var odometer1 = new Odometer({ 
      el: $('#odometer1')[0], 
      value: 0, 
      theme: 'minimal',
      duration: 3000
    });
    var odometer2 = new Odometer({ 
      el: $('#odometer2')[0], 
      value: 0, 
      theme: 'minimal',
      duration: 3000
    });
    var odometer3 = new Odometer({ 
      el: $('#odometer3')[0], 
      value: 0, 
      theme: 'minimal',
      duration: 3000
    });
    var odometer4 = new Odometer({ 
      el: $('#odometer4')[0], 
      value: 0, 
      theme: 'minimal',
      duration: 3000
    });
  
    // IntersectionObserver 回调函数
    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.classList.add('animated', 'fadeIn');
          
          // 设置新的值以触发 odometer 动画
          if (entry.target.id === 'odometer1') {
            odometer1.update(1000);
          } else if (entry.target.id === 'odometer2') {
            odometer2.update(3000);
          } else if (entry.target.id === 'odometer3') {
            odometer3.update(10000);
          } else if (entry.target.id === 'odometer4') {
            odometer4.update(15000);
          }
  
          // 停止观察已触发动画的元素
          observer.unobserve(entry.target);
        }
      });
    }
  
    // 创建 IntersectionObserver 实例
    let observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5// 元素至少有50%可见时触发
    });
  
    // 观察目标元素
    let targets = document.querySelectorAll('.odometer');
    targets.forEach(target => {
      observer.observe(target);
    });
  });

  //ボタンアニメーション
  $(document).ready(function() {
    $(".button_su_inner").mouseenter(function(e) {
        var parentOffset = $(this).offset(); 
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("desplode-circle");
        $(this).prev(".su_button_circle").addClass("explode-circle");
    });

    $(".button_su_inner").mouseleave(function(e) {
        var parentOffset = $(this).offset(); 
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
        $(this).prev(".su_button_circle").removeClass("explode-circle");
        $(this).prev(".su_button_circle").addClass("desplode-circle");
    });
});


//テキストアニメーション
// document.addEventListener('DOMContentLoaded', () => {
//   // 找到所有带有 .textanimation 类的元素，并初始化
//   document.querySelectorAll('.textanimation').forEach(element => {
//       initializeTextAnimation(element);
//   });

//   // 触发条件
//   const observer = new IntersectionObserver(handleIntersection, {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.5 // 50%可见时触发
//   });

//   // 所有带有 .textanimation的元素
//   document.querySelectorAll('.textanimation').forEach(element => {
//       observer.observe(element);
//   });
// });

// function initializeTextAnimation(element) {
//   const string = element.innerHTML;
//   const split = string.split(/(<br>)/g); // 保留<br>标签

//   element.innerHTML = "";
//   split.forEach((part) => {
//       if (part === "<br>") {
//           element.innerHTML += "<br>";
//       } else {
//           const tempDiv = document.createElement('div');
//           tempDiv.innerHTML = part;
//           while (tempDiv.firstChild) {
//               wrapTextNodes(tempDiv.firstChild);
//               element.appendChild(tempDiv.firstChild);
//           }
//       }
//   });
// }

// function wrapTextNodes(node) {
//   if (node.nodeType === Node.TEXT_NODE) {
//       const text = node.textContent;
//       node.textContent = "";
//       text.split('').forEach(char => {
//           const span = document.createElement('span');
//           span.textContent = char;
//           span.className = 'char';
//           node.parentNode.insertBefore(span, node);
//       });
//       node.remove();
//   } else if (node.nodeType === Node.ELEMENT_NODE) {
//       const childNodes = Array.from(node.childNodes);
//       childNodes.forEach(child => wrapTextNodes(child));
//   }
// }

// function animateText(element) {
//   let char = 0;
//   const spans = element.querySelectorAll('span');
//   const totalChars = spans.length;

//   const delay = element.getAttribute('data-animation-delay') || 20; //20毫秒

//   const timer = setInterval(() => {
//       const span = spans[char];
//       span.classList.add('transform');
//       char++;
//       if (char === totalChars) {
//           clearInterval(timer);
//       }
//   }, delay);
// }

// function handleIntersection(entries, observer) {
//   entries.forEach(entry => {
//       if (entry.isIntersecting) {
//           // 当元素进入视口时触发动画
//           animateText(entry.target);
//           // 停止观察该元素
//           observer.unobserve(entry.target);
//       }
//   });
// }


