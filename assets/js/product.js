showFilter(filterName)
{
   let url = "product.html";
   window.location.href=url+filterName;
 
   let portfolioFlters = document.querySelector("#portfolio-flters");
   portfolioFlters.forEach(
       element => element.classList.remove("filter-active")
   );
   let selectedFilter = document.querySelector(filterName);
   selectedFilter.classList.add("filter-active")

}


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
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


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
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });
