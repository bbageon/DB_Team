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

document.addEventListener("DOMContentLoaded", function() {
    // 컵사이즈 옵션 변경 이벤트 리스너 등록
    var cupSizeSelect = document.querySelector("#cupSize");
    cupSizeSelect.addEventListener("change", function() {
        // 선택된 컵사이즈의 값 가져오기
        var selectedCupSize = parseInt(cupSizeSelect.value);

        // 베이스와 재료들의 값을 컵사이즈에 맞게 업데이트
        updateBaseValue(selectedCupSize);
        updateIngredientValue(selectedCupSize);
    });

    // 베이스 값 업데이트 함수
    function updateBaseValue(selectedCupSize) {
        // 베이스 옵션들의 부모 요소인 tr 가져오기
        var baseRow = document.querySelector("#baseRow");

        // 선택된 컵사이즈에 따라 베이스 값 업데이트
        var baseValue = selectedCupSize * 0.2; // 예시로 0.2를 곱하는데 실제로는 적절한 계산 필요
        baseRow.querySelector(".base-value").textContent = baseValue + "원";

        // 베이스의 ml 테이블 값 업데이트
        var mlTable = baseRow.querySelector(".ml-value");
        mlTable.textContent = selectedCupSize + "ml";
    }

    // 재료 값 업데이트 함수
    function updateIngredientValue(selectedCupSize) {
        // 재료 옵션들의 부모 요소인 tr 가져오기
        var ingredientRow = document.querySelector("#ingredientRow");

        // 선택된 컵사이즈에 따라 재료 값 업데이트
        var ingredientValue = selectedCupSize * 0.1; // 예시로 0.1을 곱하는데 실제로는 적절한 계산 필요
        ingredientRow.querySelector(".ingredient-value").textContent = ingredientValue + "원";

        // 재료의 ml 테이블 값 업데이트
        var mlTable = ingredientRow.querySelector(".ml-value");
        mlTable.textContent = selectedCupSize + "ml";
    }
});

// 삭제 버튼 클릭 시 해당 행 삭제하는 함수
function deleteRow(button) {
    var row = button.closest("tr");
    row.parentNode.removeChild(row);
}
