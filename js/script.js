let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 10000;
let addExpenses;
let deposit = true;
let mission = 200000;
let period = 5;

let start = function() {
  do {
    money = +prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

function showTypeOf(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toLowerCase().split(', '));

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;
  
  for (let i = 0; i < 2; i++) {
      
    expenses[i] = prompt('Введите обязательую статью расходов?');

    sum += +prompt('Во сколько это обойдется?');
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
}
getAccumulatedMonth();

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = (accumulatedMonth) / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

function getTargetMonth() {
  return mission / accumulatedMonth;
}

if (getTargetMonth() > 0) {
console.log('Срок достижения цели ' + Math.ceil(getTargetMonth()) + ' месяцев'); } else {
	console.log('Цель не будет достигнута');
}

let getStatusIncome = function() {
  if (budgetDay < 0) {
    console.log('Что-то пошло не так');
  } else if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что-то пошло не так');
  }
};

getStatusIncome();