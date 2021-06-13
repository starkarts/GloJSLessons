'use strict';
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
    function start() {
		do {
			money = +prompt('Ваш месячный доход?', 50000);
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
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 200000,
	period: 5,
	asking: function() {
		
		if (confirm('Есть ли у вас дополнительный источник заработка?')) {
			let itemIncome,
					cashIncome;
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?');
			}
			while (!isNaN(itemIncome));

			do {
				cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
			} 
			while (!isNumber(cashIncome));

			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses,
				amount;
		do {
			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Транспорт,кварплата,интернет');
		} 
		while (!isNaN(addExpenses));

		appData.addExpenses = addExpenses;
		for (let item of appData.addExpenses) {
			item = item.charAt(0).toUpperCase() + item.substring(1);
		}

		appData.deposit = confirm('Есть ли у вас депозит в банке?');

		for (let i = 0; i < 2; i++) {
		let expenses;
		do {
			expenses = prompt('Введите обязательую статью расходов?');
		}
		while (!isNaN(expenses));	

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
	},
	getInfoDeposit: function() {
		if (appData.deposit) {
			appData.percentDeposit = +prompt('Какой годовой процент?', 10);
			appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
		}
	},
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// console.log('Бюджет на день: ' + Math.floor(appData.budgetDay));
console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
console.log('Срок достижения цели ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); 
} else {
	console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ':' + appData[key]);
}

console.log(appData.addExpenses);



let сalculation = document.querySelector('#start'),
	plusIncome = document.querySelector('button.income_add'),
	plusExpenses = document.querySelector('button.expenses_add'),
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],	
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],		
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),		
	incomeTitle = document.querySelector('input.income-title'),		
	incomeAmount = document.querySelector('.income-amount'),
	expensesTitle = document.querySelector('input.expenses-title'),		
	expensesAmount = document.querySelector('.expenses-amount'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');

	