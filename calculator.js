function updateCalculations() {
    // ... existing code ...

    // Fix the percentage calculation
    const currentConversionRate = traffic > 0 ? (newSales / traffic) * 100 : 0;
    const increaseRate = parseFloat(document.getElementById('increase-rate').value) || 0;
    
    // Directly add the percentages
    const optimizedRate = currentConversionRate + increaseRate;
    const clampedOptimizedRate = Math.min(optimizedRate, 100);

    // ... rest of the calculation code ...
} 