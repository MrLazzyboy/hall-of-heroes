<template>
  <div class="legend">
    <h2 class="legend__title">Условные обозначения</h2>
    <div class="legend__items">
      <div v-for="(item, index) in legendItems" :key="index" class="legend__item">
        <div class="legend__icon" :class="{ 'legend__icon--green': item.isGreen }">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_482_1743)">
              <path d="M7.20719 12.91C10.3568 12.91 12.91 10.3568 12.91 7.20719C12.91 4.05762 10.3568 1.50439 7.20719 1.50439C4.05762 1.50439 1.50439 4.05762 1.50439 7.20719C1.50439 10.3568 4.05762 12.91 7.20719 12.91Z" stroke="white" stroke-width="1.14056" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.92627 8.34749C4.92627 8.34749 5.78169 9.48805 7.20739 9.48805C8.63308 9.48805 9.4885 8.34749 9.4885 8.34749M5.49655 5.49609H5.50225M8.91822 5.49609H8.92393" stroke="white" stroke-width="1.14056" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_482_1743">
                <rect width="13.6867" height="13.6867" fill="white" transform="translate(0.36377 0.36377)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <span class="legend__label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegendComponent',
  data() {
    return {
      legendItems: [
        { label: 'фэнтези', isGreen: false },
        { label: 'футуризм', isGreen: false },
        { label: 'средневековье', isGreen: false },
        { label: 'постапокалипсис', isGreen: false },
        { label: 'ещё что-нибудь', isGreen: true }
      ]
    }
  }
}
</script>

<style>
/* BEM methodology applied to the legend component */
.legend {
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(257.41deg, rgba(90, 51, 98, 0.2) -4.79%, rgba(31, 24, 33, 0.2) 86.4%);
  border: 1px solid #18171E
}

/* Element: title */
.legend__title {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-family: Arial, sans-serif;
}

/* Element: items container */
.legend__items {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  align-items: center;
}

/* Element: individual item */
.legend__item {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Element: icon */
.legend__icon {
  width: 24px;
  height: 24px;
  border-radius: 6.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #886535;
}

/* Modifier: green icon */
.legend__icon--green {
  background-color: #4a7548; /* Green color */
}

/* Element: icon inner (for potential icon content) */
.legend__icon-inner {
  color: #ffffff;
  font-size: 18px;
}

/* Element: label */
.legend__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  color: #CDC2D1;

}

/* Responsive design */
@media (max-width: 768px) {
  .legend__items {
    flex-direction: column;
    align-items: flex-start;
  }

  .legend__item {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .legend__title {
    font-size: 20px;
  }

  .legend__label {
    font-size: 14px;
  }

  .legend__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
