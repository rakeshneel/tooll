document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateGains);
    
    // Auto-calculate when final amount changes
    document.getElementById('final-amount').addEventListener('input', calculateGains);
});

function calculateGains() {
    // Get input values
    const investment = parseFloat(document.getElementById('investment').value) || 0;
    const entryCost = parseFloat(document.getElementById('entry-cost').value) || 0;
    const exitCost = parseFloat(document.getElementById('exit-cost').value) || 0;
    const finalAmount = parseFloat(document.getElementById('final-amount').value) || 0;
    
    // Calculations
    const totalCost = entryCost + exitCost;
    const grossGain = finalAmount - investment;
    const netGain = grossGain - totalCost;
    const roi = (netGain / investment) * 100;
    
    // Display results
    document.getElementById('total-cost').textContent = `₹${totalCost.toFixed(2)}`;
    document.getElementById('gross-gain').textContent = `₹${grossGain.toFixed(2)}`;
    document.getElementById('net-gain').textContent = `₹${netGain.toFixed(2)}`;
    document.getElementById('roi').textContent = `${roi.toFixed(2)}%`;
    
    // Show gain/loss status
    const gainStatus = document.getElementById('gain-status');
    if (netGain > 0) {
        gainStatus.innerHTML = `✅ <strong>Profit:</strong> ₹${netGain.toFixed(2)} (${roi.toFixed(2)}%)`;
        gainStatus.className = "profit";
    } else if (netGain < 0) {
        gainStatus.innerHTML = `❌ <strong>Loss:</strong> ₹${Math.abs(netGain).toFixed(2)} (${Math.abs(roi).toFixed(2)}%)`;
        gainStatus.className = "loss";
    } else {
        gainStatus.innerHTML = "➖ <strong>Break Even</strong>";
        gainStatus.className = "";
    }
}
