const select = (el, all = false) => {
  el = el.trim()
  if (!el) {
    return all ? [] : null
  }
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}

function refreshFilter(){
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      filter: '.filter-spm'
    });

    let portfolioFilters = select('#portfolio-flters li', true);

    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      portfolioIsotope.on('arrangeComplete', function() {
        AOS.refresh()
      });
    }, true);

    showFilter(portfolioFilters, portfolioIsotope);
  }
}


function refreshFilterContent(){

    let portfolioContainer = select('.description-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.product-desc',
        layoutMode: 'fitRows',
		    filter: '.filter-spm'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });

        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);

      showFilter(portfolioFilters, portfolioIsotope);
    }
}

function updateProductFilterHash(filterElement) {
  if (!filterElement.id) return;

  const hash = `#${filterElement.id}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, '', hash);
  }
}


(function() {
  "use strict";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyRevealAnimations = () => {
    if (prefersReducedMotion) return;

    const revealGroups = [
      { selector: '.section-title', animation: 'fade-up' },
      { selector: '.about .content > div', animation: 'fade-up' },
      { selector: '.counts .count-box', animation: 'zoom-in' },
      { selector: '.why-us .accordion-list li', animation: 'fade-left' },
      { selector: '.support .icon-box, .team-about .icon-box', animation: 'fade-up' },
      { selector: '.specialize .icon-box, .certifications .icon-box', animation: 'zoom-in' },
      { selector: '.portfolio .portfolio-item', animation: 'fade-up' },
      { selector: '.contact .info, .contact .php-email-form, .career-contact .info, .career-contact .php-email-form, .feedback-form .content', animation: 'fade-up' },
      { selector: '#footer .footer-top .row > div', animation: 'fade-up' }
    ];

    revealGroups.forEach(({ selector, animation }) => {
      select(selector, true).forEach((element, index) => {
        if (!element.hasAttribute('data-aos')) {
          element.setAttribute('data-aos', animation);
        }

        if (!element.hasAttribute('data-aos-delay')) {
          element.setAttribute('data-aos-delay', String(Math.min((index % 4) * 80, 240)));
        }
      });
    });
  };

  applyRevealAnimations();

  window.addEventListener("load", () => {
    AOS.init({
        duration: 750,
        easing: "ease-in-out",
        once: true,
        mirror: false,
        offset: 80,
        disable: () => prefersReducedMotion,
    });
});

  /**
   * Easy selector helper function
   */
  // const select = (el, all = false) => {
  //   el = el.trim()
  //   if (all) {
  //     return [...document.querySelectorAll(el)]
  //   } else {
  //     return document.querySelector(el)
  //   }
  // }

  /**
   * Easy event listener function
   */
  // const on = (type, el, listener, all = false) => {
  //   let selectEl = select(el, all)
  //   if (selectEl) {
  //     if (all) {
  //       selectEl.forEach(e => e.addEventListener(type, listener))
  //     } else {
  //       selectEl.addEventListener(type, listener)
  //     }
  //   }
  // }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
    document.body.classList.toggle('nav-open')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (!this.hash) return

    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        document.body.classList.remove('nav-open')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash.startsWith('#filter-') && select('#portfolio')) {
      scrollto('#portfolio')
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  //  window.addEventListener('load', () =>refreshFilter);
  //  window.addEventListener('load', () =>refreshFilterContent);

  /**
   * Porfolio isotope and filter
   */
   window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
		    filter: '.filter-spm'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        updateProductFilterHash(this);
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);

      showFilter(portfolioFilters, portfolioIsotope);
      window.addEventListener('hashchange', function() {
        showFilter(portfolioFilters, portfolioIsotope);
      });
    }
  });



  window.addEventListener('load', () => {
    let portfolioContainer = select('.description-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.product-desc',
        layoutMode: 'fitRows',
		    filter: '.filter-spm'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });

        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        updateProductFilterHash(this);
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);

      showFilter(portfolioFilters, portfolioIsotope);
      window.addEventListener('hashchange', function() {
        showFilter(portfolioFilters, portfolioIsotope);
      });

    }

  });




  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Testimonials slider
   */
   new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });


  /**
   * Clients Slider
   */
   new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });



})()


function showFilter(portfolioFilters, portfolioIsotope) {
   const filter = window.location.hash.slice(1);
   if (filter.startsWith('filter-')){
      portfolioFilters.forEach(
        element => {
          if(element.id === filter){
              element.classList.add('filter-active')
              portfolioIsotope.arrange({
                filter: element.getAttribute('data-filter')
              });
              portfolioIsotope.on('arrangeComplete', function() {
                AOS.refresh()
              });
          }else{
              element.classList.remove('filter-active')
          }
        }
      )
   }

}


let queryPopupHandled = false;
const queryPopupDismissedUntilKey = 'queryPopupDismissedUntil';
const queryPopupDismissDuration = 4 * 60 * 1000;

function isQueryPopupDismissed() {
  try {
    return Number(localStorage.getItem(queryPopupDismissedUntilKey)) > Date.now();
  } catch (error) {
    return false;
  }
}

function dismissQueryPopup() {
  try {
    localStorage.setItem(
      queryPopupDismissedUntilKey,
      String(Date.now() + queryPopupDismissDuration)
    );
  } catch (error) {
    // The popup still closes when browser storage is unavailable.
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const popupMain = document.querySelector('#popupMain');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(scrollProgress);

  const updateScrollProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  };

  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);

  if (!reduceMotion) {
    document.querySelectorAll('.count-box, .icon-box, .testimonial-item').forEach(function (element) {
      element.addEventListener('mousemove', function (event) {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty('--shine-x', `${x}%`);
        element.style.setProperty('--shine-y', `${y}%`);
      });
    });
  }

  if (window.innerWidth > 768 && popupMain && !isQueryPopupDismissed()) {
    setTimeout(function () {
      if (!queryPopupHandled && !isQueryPopupDismissed()) {
        queryPopupHandled = true;
        popupMain.style.display = 'block';
      }
    }, 6000);
  }

  document.querySelectorAll('.contactp-close').forEach(function (element) {
    element.addEventListener('click', function () {
      queryPopupHandled = true;
      dismissQueryPopup();
      if (popupMain) {
        popupMain.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('#topbar .facebook, #topbar .linkedin, #footer .facebook, #footer .linkedin').forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  document.querySelectorAll('.subNav').forEach(function (element) {
    element.addEventListener('click', function () {
      const target = element.dataset.id;
      if (target) {
        window.location.href = target;
      }
    });
  });
});
