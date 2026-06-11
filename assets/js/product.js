function showProductFilter(filterId) {
  if (!filterId) return;

  const normalizedFilter = filterId.startsWith('#') ? filterId : `#${filterId}`;
  const targetFilter = document.querySelector(normalizedFilter);

  if (!targetFilter) {
    window.location.href = `product.html${normalizedFilter}`;
    return;
  }

  document.querySelectorAll('#portfolio-flters li').forEach((element) => {
    element.classList.toggle('filter-active', element === targetFilter);
  });

  targetFilter.click();
}
