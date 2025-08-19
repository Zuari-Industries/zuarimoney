// --- GOOGLE SHEETS SUBMISSION (Your Original Code) ---
const leadForm = document.getElementById('leadForm');
const formContainer = document.getElementById('form-container');
const confirmationMessage = document.getElementById('confirmationMessage');

// This event listener is attached directly to the form, so it can be outside DOMContentLoaded
if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = leadForm.name.value.trim();
      const phone = leadForm.phone.value.trim();

      if (!name || !phone.match(/^[0-9]{10}$/)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      const submitButton = leadForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
      }

      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxkLkeX1AoxuzotHuBVwEXwxEgLPFQQjX8p0xT0RqttTJLIEDH39H43Qs9ORQT1bDot/exec',
          {
            method: 'POST',
            body: new URLSearchParams({ 
              name, 
              phone,
              timestamp: new Date().toISOString()
            })
          }
        );

        if (response.ok) {
          formContainer.style.display = 'none';
          confirmationMessage.style.display = 'block';
          leadForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.log('CORS error occurred, but data likely submitted successfully');
        formContainer.style.display = 'none';
        confirmationMessage.style.display = 'block';
        leadForm.reset();
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
}


// --- MAIN DOM CONTENT LOADED EVENT LISTENER ---
document.addEventListener('DOMContentLoaded', () => {
    // --- MODAL AND FORM LOGIC (Your Original Code) ---
    const leadModal = document.getElementById('leadModal');
    const closeBtn = document.getElementById('closeBtn');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const bottomBarForm = document.getElementById('bottomBarForm');
    
    const openModal = () => {
        const formContainer = document.getElementById('form-container');
        const confirmationMessage = document.getElementById('confirmationMessage');
        if (formContainer && confirmationMessage) {
            formContainer.style.display = 'block';
            confirmationMessage.style.display = 'none';
        }
        if (leadModal) {
            leadModal.classList.add('show');
        }
    };
    const closeModal = () => {
        if (leadModal) {
            leadModal.classList.remove('show');
        }
    };
    
    ctaButtons.forEach(button => {
        if (!button.closest('form')) {
            button.addEventListener('click', openModal);
        }
    });
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(leadModal) leadModal.addEventListener('click', (e) => {
        if (e.target === leadModal) closeModal();
    });

    if (bottomBarForm) {
        const bottomBarNameInput = bottomBarForm.querySelector('input[name="name"]');
        const bottomBarPhoneInput = bottomBarForm.querySelector('input[name="phone"]');
        
        if (bottomBarNameInput) {
            bottomBarNameInput.setAttribute('readonly', 'readonly');
            bottomBarNameInput.addEventListener('click', openModal);
            bottomBarNameInput.addEventListener('focus', openModal);
        }
        
        if (bottomBarPhoneInput) {
            bottomBarPhoneInput.setAttribute('readonly', 'readonly');
            bottomBarPhoneInput.addEventListener('click', openModal);
            bottomBarPhoneInput.addEventListener('focus', openModal);
        }
        bottomBarForm.addEventListener('submit', (event) => {
            event.preventDefault();
            openModal();
        });
    }

    // This is a simplified UI handler for the modal form, separate from the Google Sheets logic
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // The actual submission is handled by the listener at the top of the file.
        // This function just provides UI feedback.
        const formContainer = document.getElementById('form-container');
        const confirmationMessage = document.getElementById('confirmationMessage');
        
        if (formContainer && confirmationMessage) {
            console.log('Displaying confirmation for:', {
                name: event.target.elements.name.value,
                phone: event.target.elements.phone.value,
            });
            
            if (!leadModal.classList.contains('show')) {
                openModal();
            }

            formContainer.style.display = 'none';
            confirmationMessage.style.display = 'block';
            setTimeout(() => {
                closeModal();
                // Reset form UI after modal is fully closed
                setTimeout(() => formContainer.style.display = 'block', 300);
            }, 3000);
        }
    };
    
    // The main leadForm's submit is already handled by the Google Sheets script.
    // This listener is for UI feedback only.
    document.getElementById('leadForm').addEventListener('submit', handleFormSubmit);


    // --- ACCORDION SCRIPT (Your Original Code) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
    
    // --- TAB SCRIPT (Your Original Code) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === tabId);
            });
        });
    });

    // --- SECTION FADE-IN (Your Original Code) ---
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    allSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- COMPOUNDING GRAPH ANIMATION (Your Original Code) ---
    const compoundingGraph = document.getElementById('compoundingGraph');
    if (compoundingGraph) {
        const graphObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        graphObserver.observe(compoundingGraph);
    }

    // --- POPUP ON SCROLL (Your Original Code) ---
    let popupShown = false;
    window.addEventListener('scroll', () => {
        if (popupShown) return;
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition / pageHeight >= 0.5) {
            popupShown = true;
            if (leadModal && !leadModal.classList.contains('show')) {
                openModal();
            }
        }
    });

    // --- NEW: CHART.JS MARKET GROWTH GRAPH LOGIC ---
    const ctx = document.getElementById('marketGrowthChart');
    if (ctx) {
        const years = Array.from({ length: 11 }, (_, i) => 2015 + i);
        const growthData = [100, 110, 125, 130, 150, 140, 180, 210, 200, 240, 270]; // Sample data

        const highlightIndices = [years.indexOf(2019), years.indexOf(2022), years.indexOf(2025)];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Market Growth Index',
                    data: growthData,
                    borderColor: 'rgba(0, 123, 255, 0.8)',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: (context) => highlightIndices.includes(context.dataIndex) ? 'rgba(255, 99, 132, 1)' : 'rgba(0, 123, 255, 0.8)',
                    pointRadius: (context) => highlightIndices.includes(context.dataIndex) ? 6 : 3,
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'top', align: 'end', labels: { boxWidth: 12, font: { family: "'Manrope', sans-serif" } } },
                    tooltip: {
                        backgroundColor: '#0A2342',
                        titleFont: { family: "'Manrope', sans-serif", size: 14 },
                        bodyFont: { family: "'Manrope', sans-serif", size: 12 },
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: { label: (context) => `Index: ${context.parsed.y}` }
                    }
                },
                scales: {
                    y: { grid: { color: '#E5E7EB', borderDash: [5, 5] }, ticks: { font: { family: "'Manrope', sans-serif" } } },
                    x: { grid: { display: false }, ticks: { font: { family: "'Manrope', sans-serif" } } }
                }
            }
        });
    }

    // --- NEW: INVESTMENT SIMULATOR LOGIC ---
    const simCategoryButtons = document.querySelectorAll('.category-btn');
    const simAmountInput = document.getElementById('investmentAmount');
    const simYearSelect = document.getElementById('startYear');
    const simResultBox = document.getElementById('resultBox');
    const simFinalAmountEl = document.getElementById('finalAmount');
    const simTotalReturnEl = document.getElementById('totalReturn');
    const simCagrUsedEl = document.getElementById('cagrUsed');

    if (simYearSelect) {
        const currentYear = new Date().getFullYear();
        for (let year = 2015; year < currentYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            simYearSelect.appendChild(option);
        }
        simYearSelect.value = currentYear - 5;
    }

    const calculateGrowth = () => {
        if (!simAmountInput || !simYearSelect || !simResultBox) return;

        const principal = parseFloat(simAmountInput.value);
        const startYear = parseInt(simYearSelect.value);
        const activeCategoryBtn = document.querySelector('.category-selector .category-btn.active');

        if (!principal || !startYear || !activeCategoryBtn || principal < 1000) {
            simResultBox.hidden = true;
            return;
        }

        const cagr = parseFloat(activeCategoryBtn.dataset.cagr);
        const years = 2025 - startYear;
        const finalAmount = principal * Math.pow((1 + cagr), years);
        const totalReturn = ((finalAmount - principal) / principal) * 100;

        simFinalAmountEl.textContent = `₹${finalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
        simTotalReturnEl.textContent = `${totalReturn.toFixed(1)}%`;
        simCagrUsedEl.textContent = `${(cagr * 100).toFixed(0)}%`;
        simResultBox.hidden = false;
    };

    simCategoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            simCategoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-checked', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-checked', 'true');
            calculateGrowth();
        });
    });

    if (simAmountInput) simAmountInput.addEventListener('input', calculateGrowth);
    if (simYearSelect) simYearSelect.addEventListener('change', calculateGrowth);

    if (simAmountInput && simAmountInput.value) {
        calculateGrowth();
    }
});