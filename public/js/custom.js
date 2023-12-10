function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateOrderSummary();
}

function adjustQuantity(button, action) {
    var inputField = button.parentNode.querySelector('input[type="text"]');
    var currentValue = parseInt(inputField.value);

    if (action === 'increment') {
        inputField.value = currentValue + 1;
    } else if (action === 'decrement' && currentValue > 1) {
        inputField.value = currentValue - 1;
    }

    updateOrderSummary();
}

function addRow() {
    var table = document.querySelector('table');
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = '<button class="delete-btn" onclick="deleteRow(this)">삭제</button>';
    cell2.innerHTML = '재료';
    cell3.innerHTML = '<select></option><option value="ingredient1">재료 1</option><option value="ingredient2">재료 2</option></option><option value="ingredient3">재료 3</option></option><option value="ingredient4">재료 4</option></select>';
    cell4.innerHTML = '0원';
    cell5.innerHTML = '<button class="quantity-btn" onclick="adjustQuantity(this, \'increment\')">+</button><input type="text" value="1" readonly><button class="quantity-btn" onclick="adjustQuantity(this, \'decrement\')">-</button>';
    cell6.innerHTML = '0원';

    updateOrderSummary();
}

function updateOrderSummary() {
    var rows = document.querySelectorAll('table tbody tr');
    var ingredientCount = 0;
    var totalPrice = 0;

    rows.forEach(function (row) {
        var quantity = parseInt(row.querySelector('input[type="text"]').value);
        var price = parseFloat(row.querySelector('input[type="text"][placeholder="가격"]').value);
        ingredientCount += quantity;
        totalPrice += quantity * price;
    });

    document.getElementById('ingredientCount').textContent = ingredientCount;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function checkout() {
    // 여기에 결제 로직을 추가할 수 있습니다.
    alert('결제하기 버튼이 클릭되었습니다.');
}

function register() {
    // 여기에 등록 로직을 추가할 수 있습니다.
    alert('등록하기 버튼이 클릭되었습니다.');
}