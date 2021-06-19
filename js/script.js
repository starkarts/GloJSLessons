'use strict';

let start = document.querySelector('#start'),
	plusIncome = document.querySelector('button.income_add'),
	plusExpenses = document.querySelector('button.expenses_add'),
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],		
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),		
	incomeTitle = document.querySelector('input.income-title'),		
	expensesTitle = document.querySelector('input.expenses-title'),		
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	incomeItems = document.querySelectorAll('.income-items');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
	budget:0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	check: function() {
		salaryAmount.addEventListener('input', function() {
			if (salaryAmount.value === '') {
				start.disabled = true;
			} else {
				start.disabled = false;
			}
		});
	},
	start: function() {
		
		appData.check();
	
		appData.budget = +salaryAmount.value;
		
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		
		appData.showResult();
	},
	showResult: function() {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth; 
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(appData.getTargetMonth());
		incomePeriodValue.value = appData.calcSavedMoney();
		periodSelect.addEventListener('input', function() {
			incomePeriodValue.value = appData.calcSavedMoney();
		});
	},
	addExpensesBlock: function() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			plusExpenses.style.display = 'none';
		}
	},
	getExpenses: function() {
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	addIncomeBlock: function() {
		let cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			plusIncome.style.display = 'none';
		}
	}, 
	getIncome: function() {
		incomeItems.forEach(function(item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = cashIncome;
			}
		});
	},
	getAddExpenses: function() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function(item) {
			item = item.trim();
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: function() {
		additionalIncomeItem.forEach(function(item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	},
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
		return appData.expensesMonth;
	},
	getBudget: function() {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function() {
		return targetAmount.value / appData.budgetMonth;
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
		return appData.budgetMonth * periodSelect.value;
	},
	changePeriodValue: function() {
		periodAmount.textContent = periodSelect.value;
	}, 
};


start.addEventListener('click', appData.start);

plusExpenses.addEventListener('click', appData.addExpensesBlock);

plusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changePeriodValue);


if (appData.getTargetMonth() > 0) {
console.log('Срок достижения цели ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); 
} else {
	console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ':' + appData[key]);
}







	