let money = 50000;
let income = 10000;
let addExpenses;
let deposit = true;
let mission = 200000;
let period = 5;

function showTypeOf(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toLowerCase().split(', '));

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательую статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательую статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

function getExpensesMonth() {
  return amount1 + amount2;
}
console.log('Расходы за месяц ' + getExpensesMonth());

function getAccumulatedMonth() {
  return money - amount1 - amount2;
}
getAccumulatedMonth();

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = (accumulatedMonth) / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

function getTargetMonth() {
  return mission / accumulatedMonth;
}
console.log('Срок достижения цели ' + Math.ceil(getTargetMonth()) + ' месяцев');

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