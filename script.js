document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateGain);
    
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculateGain();
        });
    });
});

function calculateGain() {
    // Get input values
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const entryPrice = parseFloat(document.getElementById('entry-price').value) || 0;
    const exitPrice = parseFloat(document.getElementById('exit-price').value) || 0;
    const entryCost = parseFloat(document.getElementById('entry-cost').value) || 0;
    const exitCost = parseFloat(document.getElementById('exit-cost').value) || 0;
    
    // Calculations
    const investedAmount = quantity * entryPrice;
    const finalAmount = quantity * exitPrice;
    const grossGain = finalAmount - investedAmount;
    const totalCost = entryCost + exitCost;
    const netGain = grossGain - totalCost;
    const roi = (netGain / investedAmount) * 100;
    
    // Display results
    document.getElementById('invested-amount').textContent = `₹${investedAmount.toFixed(2)}`;
    document.getElementById('final-amount').textContent = `₹${finalAmount.toFixed(2)}`;
    document.getElementById('gross-gain').textContent = `₹${grossGain.toFixed(2)}`;
    document.getElementById('total-cost').textContent = `₹${totalCost.toFixed(2)}`;
    document.getElementById('net-gain').textContent = `₹${netGain.toFixed(2)}`;
    document.getElementById('roi').textContent = `${roi.toFixed(2)}%`;
    
    // Show gain/loss status
    const gainStatus = document.getElementById('gain-status');
    gainStatus.textContent = netGain >= 0 ? 
        `✅ Net Gain: ₹${netGain.toFixed(2)}` : 
        `❌ Net Loss: ₹${Math.abs(netGain).toFixed(2)}`;
    gainStatus.className = netGain >= 0 ? "profit" : "loss";
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
