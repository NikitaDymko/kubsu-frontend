document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const resultDiv = document.getElementById('result');
    const quantityError = document.getElementById('quantity-error');
    const quantityRegex = /^[1-9]\d*$/;

    function validateQuantity(inputValue) {
        return quantityRegex.test(inputValue);
    }

    function calculateCost() {
        quantityError.textContent = '';
        resultDiv.textContent = '';

        const quantityValue = quantityInput.value.trim();
        const price = parseInt(productSelect.value, 10);

        if (!validateQuantity(quantityValue)) {
            quantityError.textContent = 'Пожалуйста, введите корректное количество (только положительные целые числа)';
            return;
        }

        const quantity = parseInt(quantityValue, 10);
        const totalCost = quantity * price;

        const productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
        resultDiv.textContent = `Стоимость заказа: ${totalCost} руб. (${productName} × ${quantity} шт.)`;
    }

    calculateBtn.addEventListener('click', calculateCost);
});