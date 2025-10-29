document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('options-group');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('property-group');
    const propertyCheckbox = document.getElementById('property');
    const totalPriceElement = document.getElementById('total-price');

    const basePrices = {
        basic: 1000,
        premium: 2000,
        custom: 1500
    };

    function validateQuantity(input) {
        const value = input.value.trim();
        const regex = /^[1-9]\d*$/;
        
        if (!regex.test(value) || value === '0') {
            input.style.borderColor = 'red';
            return false;
        } else {
            input.style.borderColor = '#ddd';
            return true;
        }
    }

    function updateInterface() {
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;
        
        optionsSelect.value = '0';
        propertyCheckbox.checked = false;
        
        if (selectedService === 'basic') {
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.add('hidden');
        } else if (selectedService === 'premium') {
            optionsGroup.classList.remove('hidden');
            propertyGroup.classList.add('hidden');
        } else if (selectedService === 'custom') {
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.remove('hidden');
        }
        
        calculateTotal();
    }

    function calculateTotal() {
        if (!validateQuantity(quantityInput)) {
            totalPriceElement.textContent = 'Введите корректное количество (только положительные числа)';
            totalPriceElement.style.color = 'red';
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;
        
        let total = basePrices[selectedService] * quantity;
        
        if (selectedService === 'premium') {
            const optionPrice = parseInt(optionsSelect.value) || 0;
            total += optionPrice * quantity;
        }
        
        if (selectedService === 'custom' && propertyCheckbox.checked) {
            total += 800 * quantity;
        }
        
        totalPriceElement.textContent = total.toLocaleString('ru-RU') + ' руб.';
        totalPriceElement.style.color = '#2c5aa0';
    }

    quantityInput.addEventListener('input', function() {
        validateQuantity(this);
        calculateTotal();
    });

    quantityInput.addEventListener('blur', function() {
        if (!validateQuantity(this)) {
            this.value = '1';
            calculateTotal();
        }
    });

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateInterface);
    });

    optionsSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);

    updateInterface();
});