const count = document.getElementById('count');

// 加算
document.getElementById('plusBtn').addEventListener('click', () => ++count.value);

// 減算
document.getElementById('minusBtn').addEventListener('click', () => {
  if (count.value > 0) --count.value;
});

// リセット
document.getElementById('resetBtn').addEventListener('click', () => count.value = 0);
