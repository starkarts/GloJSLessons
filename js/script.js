'use strict';
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
    function start() {
		do {
			money = +prompt('Ваш месячный доход?');
		}
		while (!isNumber(money));
}

start();

let appData = {
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 200000,
	period: 5,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
		amount;
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposite = confirm('Есть ли у вас депозит в банке?');

		for (let i = 0; i < 2; i++) {
		let expenses;
		expenses = prompt('Введите обязательую статью расходов?');

		do {
			amount = +prompt('Во сколько это обойдется?');
		}
		while (!isNumber(amount));
		appData.expenses[expenses] = +amount;
		}
		// console.log(appData.expenses);
		return appData.expenses;
	},
	getExpensesMonth: function() {
		
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
	
		return appData.expensesMonth;
	},
	getBudget: function() {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = appData.budgetMonth / 30;

		return appData.budgetMonth, appData.budgetDay;
	},
	getTargetMonth: function() {
		return appData.mission / appData.expensesMonth;
	},
	getStatusIncome: function() {
		if (appData.budgetDay < 0) {
			console.log('Что-то пошло не так');
		} else if (appData.budgetDay > 1200) {
			console.log('У вас высокий уровень дохода');
		} else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
			console.log('У вас средний уровень дохода');
		} else if (appData.budgetDay < 600) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		}
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// console.log('Бюджет на день: ' + Math.floor(appData.budgetDay));
console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
console.log('Срок достижения цели ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); } else {
	console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ':' + appData[key]);
}