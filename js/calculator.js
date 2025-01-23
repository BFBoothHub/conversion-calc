// Get DOM elements
const trafficSlider = document.getElementById('traffic');
const trafficDisplay = document.getElementById('traffic-value');
const newSalesSlider = document.getElementById('new-sales');
const newSalesDisplay = document.getElementById('new-sales-value');
const conversionRateDisplay = document.getElementById('conversion-rate-value');
const lifetimeSlider = document.getElementById('lifetime-value');
const lifetimeDisplay = document.getElementById('lifetime-value-value');
const clientMonthsSlider = document.getElementById('client-months');
const clientMonthsDisplay = document.getElementById('client-months-value');
const increaseRateSlider = document.getElementById('increase-rate');
const increaseRateDisplay = document.getElementById('increase-rate-value');
const optimizedRateOutput = document.getElementById('optimized-rate');
const optimizedCustomersOutput = document.getElementById('optimized-customers');
const revenueIncreaseOutput = document.getElementById('revenue-increase');
const currentCustomersOutput = document.getElementById('current-customers');
const currentRevenueOutput = document.getElementById('current-revenue');

// Add state tracking for popup
let popupShownCount = 0;
let lastConversionRate = 0;
let isSliderMoving = false;
let sliderTimeout;
let popupShown = false;

// Get all necessary elements
const sliders = document.querySelectorAll('.range-slider');

// Update calculations
function updateCalculations() {
    // Get all input values
    const traffic = parseFloat(document.getElementById('traffic').value) || 0;
    const newSales = parseFloat(document.getElementById('new-sales').value) || 0;
    const lifetimeValue = parseFloat(document.getElementById('lifetime-value').value) || 0;
    const clientMonths = parseFloat(document.getElementById('client-months').value) || 0;
    const increaseRate = parseFloat(document.getElementById('increase-rate').value) || 0;

    // Update slider display values
    document.querySelector(`[for="traffic"] + .slider-container .current-value`)
        .textContent = new Intl.NumberFormat('en-GB').format(traffic);
    document.querySelector(`[for="new-sales"] + .slider-container .current-value`)
        .textContent = new Intl.NumberFormat('en-GB').format(newSales);
    document.querySelector(`[for="lifetime-value"] + .slider-container .current-value`)
        .textContent = new Intl.NumberFormat('en-GB').format(lifetimeValue);
    document.querySelector(`[for="client-months"] + .slider-container .current-value`)
        .textContent = `${clientMonths} Month${clientMonths !== 1 ? 's' : ''}`;
    document.querySelector(`[for="increase-rate"] + .slider-container .current-value`)
        .textContent = `${increaseRate.toFixed(1)}%`;

    // Calculate current values
    const currentConversionRate = traffic > 0 ? (newSales / traffic) * 100 : 0;
    const monthlyRevenue = (newSales * lifetimeValue) / clientMonths;

    // Update current website stats
    document.getElementById('current-customers').textContent = 
        new Intl.NumberFormat('en-GB').format(newSales);
    document.getElementById('current-revenue').textContent = 
        new Intl.NumberFormat('en-GB').format(monthlyRevenue);
    document.getElementById('conversion-rate-value').textContent = 
        `${currentConversionRate.toFixed(2)}%`;

    // Calculate and update future website stats
    const optimizedConversionRate = currentConversionRate * (1 + (increaseRate / 100));
    const optimizedCustomers = Math.round((traffic * optimizedConversionRate) / 100);
    const optimizedMonthlyRevenue = (optimizedCustomers * lifetimeValue) / clientMonths;
    const monthlyRevenueIncrease = optimizedMonthlyRevenue - monthlyRevenue;

    // Update future website stats
    document.getElementById('optimized-rate').textContent = 
        `${optimizedConversionRate.toFixed(2)}%`;
    document.getElementById('optimized-customers').textContent = 
        new Intl.NumberFormat('en-GB').format(optimizedCustomers);
    document.getElementById('revenue-increase').textContent = 
        new Intl.NumberFormat('en-GB').format(Math.max(0, monthlyRevenueIncrease));

    // Check for popup condition
    if (currentConversionRate >= 4 && !window.popupShown) {
        document.getElementById('popup').style.display = 'flex';
        window.popupShown = true;
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    // Add input event listeners to all sliders
    const sliders = document.querySelectorAll('.range-slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', updateCalculations);
    });

    // Initial calculation
    updateCalculations();
});

// Close popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Update HTML for arrows to use triangles
document.querySelectorAll('.slider-arrow').forEach(arrow => {
    arrow.innerHTML = ''; // Remove arrow character, using CSS triangles instead
});

// Reset popup counter function (if needed)
function resetPopupCounter() {
    popupShownCount = 0;
    lastConversionRate = 0;
} 