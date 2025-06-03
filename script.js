document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateProfit);
    
    // Also allow calculation when pressing Enter in any input field
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateProfit();
            }
        });
    });
});

function calculateProfit() {
    // Get input values
    const investment = parseFloat(document.getElementById('investment').value) || 0;
    const entryCost = parseFloat(document.getElementById('entry-cost').value) || 0;
    const exitCost = parseFloat(document.getElementById('exit-cost').value) || 0;
    const gains = parseFloat(document.getElementById('gains').value) || 0;
    
    // Calculate results
    const totalCost = entryCost + exitCost;
    const netProfit = gains - totalCost;
    const roi = (netProfit / investment) * 100;
    
    // Display results
    document.getElementById('total-cost').textContent = `₹${totalCost.toFixed(2)}`;
    document.getElementById('net-profit').textContent = `₹${netProfit.toFixed(2)}`;
    document.getElementById('roi').textContent = `${roi.toFixed(2)}%`;
    
    // Show profit/loss status
    const profitStatus = document.getElementById('profit-status');
    profitStatus.textContent = netProfit >= 0 ? "✅ Profit!" : "❌ Loss!";
    profitStatus.className = netProfit >= 0 ? "profit" : "loss";
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
