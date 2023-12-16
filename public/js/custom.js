
// var cupSize = 0; // 초기 값

// function hideRow() {
//     const row = document.getElementById('ingredient');
//     const row2 = document.getElementById('ingredient2');
//     const row3= document.getElementById('ingredient3');
//     const row4 = document.getElementById('ingredient4');
//     const row5 = document.getElementById('ingredient5');
//     row.style.display = 'none';
//     row2.style.display = 'none';
//     row3.style.display = 'none';
//     row4.style.display = 'none';
//     row5.style.display = 'none';
//   }


//   document.addEventListener('DOMContentLoaded', function() {
//     hideRow(); // 페이지 로드 시 오렌지 행 숨김
//   });



// // 추가
// function showRow1()  {
//     const row = document.getElementById('ingredient');
//     row.style.display = '';
//   }
//   function showRow2()  {
//     const row = document.getElementById('ingredient2');
//     row.style.display = '';
//   }
//   function showRow3()  {
//     const row = document.getElementById('ingredient3');
//     row.style.display = '';
//   }
//   function showRow4()  {
//     const row = document.getElementById('ingredient4');
//     row.style.display = '';
//   }
//   function showRow5()  {
//     const row = document.getElementById('ingredient5');
//     row.style.display = '';
//   }
// // 삭제
// function deleteRow1()  {
//     const row = document.getElementById('ingredient');
//     row.style.display = 'none';
//   }
//   function deleteRow2()  {
//     const row = document.getElementById('ingredient2');
//     row.style.display = 'none';
//   }
//   function deleteRow3()  {
//     const row = document.getElementById('ingredient3');
//     row.style.display = 'none';
//   }
//   function deleteRow4()  {
//     const row = document.getElementById('ingredient4');
//     row.style.display = 'none';
//   }
//   function deleteRow5()  {
//     const row = document.getElementById('ingredient5');
//     row.style.display = 'none';
//   }


  function updateCupSize(select) {
    // bracket notation을 사용하여 data-value에 접근
    var cupSize = select.options[select.selectedIndex].getAttribute('data-value');
    
    // 결과를 표시하는 span 업데이트
    var cupSizeDisplay = document.getElementById("cupSize");
    cupSizeDisplay.textContent = cupSize;
}




