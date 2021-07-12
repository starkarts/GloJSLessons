'use strict';

let start = document.querySelector('#start'),
	cancel = document.querySelector('#cancel'),
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

const AppData = function() {

	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];
	this.deposit = false;
	this.percentDeposi = 0;
	this.moneyDeposi = 0;

};

AppData.prototype.check = function() {
	if (salaryAmount.value !== '') {
		start.removeAttribute('disabled');
	} 
};

AppData.prototype.start = function() {
	if (salaryAmount.value === '') {
		start.setAttribute('disabled', 'true');
		return;
	}

	let allInput = document.querySelectorAll('.data input[type = text]');
	allInput.forEach(function(item) {
		item.setAttribute('disabled', 'true');
	});
	
	plusExpenses.setAttribute('disabled', 'true');
	plusIncome.setAttribute('disabled', 'true');
	start.style.display = 'none';
	cancel.style.display = 'block';

	this.budget = +salaryAmount.value;

	this.getExpenses();
	this.getIncome();
	this.getExpensesMonth();
	this.getAddExpenses();
	this.getAddIncome();
	this.getBudget();
	this.getInfoDeposit();
	this.getStatusIncome();
	this.showResult();
		
};

AppData.prototype.showResult = function() {
	const _this = this;
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth; 
	additionalExpensesValue.value = this.addExpenses.join(", ");
	additionalIncomeValue.value = this.addIncome.join(", ");
	targetMonthValue.value = Math.ceil(appData.getTargetMonth());
	incomePeriodValue.value = this.calcSavedMoney();
	periodSelect.addEventListener('input', function() {
		incomePeriodValue.value = _this.calcSavedMoney();
	});
};

AppData.prototype.addExpensesBlock = function() {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
	expensesItems = document.querySelectorAll('.expenses-items');
	if (expensesItems.length === 3) {
		plusExpenses.style.display = 'none';
	}
};

AppData.prototype.getExpenses = function() {
	const _this = this;
	expensesItems.forEach(function(item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			_this.expenses[itemExpenses] = cashExpenses;
		}
	});
};

AppData.prototype.addIncomeBlock = function() {
	let cloneIncomeItems = incomeItems[0].cloneNode(true);
	incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
	incomeItems = document.querySelectorAll('.income-items');
	if (incomeItems.length === 3) {
		plusIncome.style.display = 'none';
	}
}; 

AppData.prototype.getIncome = function() {
	const _this = this;
	incomeItems.forEach(function(item) {
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = item.querySelector('.income-amount').value;
		if (itemIncome !== '' && cashIncome !== '') {
			_this.income[itemIncome] = cashIncome;
		}
	});
};

AppData.prototype.getAddExpenses = function() {
	let addExpenses = additionalExpensesItem.value.split(',');
	const _this = this;
	addExpenses.forEach(function(item) {
		item = item.trim();
		if (item !== '') {
			_this.addExpenses.push(item);
		}
	});
};

AppData.prototype.getAddIncome = function() {
	const _this = this;
	additionalIncomeItem.forEach(function(item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			_this.addIncome.push(itemValue);
		}
	});
};

AppData.prototype.getExpensesMonth = function() {
	for (let key in this.expenses) {
		this.expensesMonth += +this.expenses[key];
	}
	// return appData.expensesMonth;
};

AppData.prototype.getBudget = function() {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
	return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function() {
	if (this.budgetDay < 0) {
    console.log("Что-то пошло не так");
  } else if (this.budgetDay > 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
    console.log("У вас средний уровень дохода");
  } else if (this.budgetDay < 600) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
  }
};

AppData.prototype.getInfoDeposit = function() {
	if (this.deposit) {
    this.percentDeposit = +prompt("Какой годовой процент?", 10);
    this.moneyDeposit = +prompt("Какая сумма заложена?", 10000);
  }
};

AppData.prototype.calcSavedMoney = function() {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriodValue = function() {
	periodAmount.textContent = periodSelect.value;
}; 

AppData.prototype.reset = function() {
	let inputTextData = document.querySelectorAll('.data input[type = text]'),
			resultInputAll = document.querySelectorAll('.result input[type = text]');
	
	inputTextData.forEach(function(elem) {
		elem.value = '';
		elem.removeAttribute('disabled');
		periodSelect.value = '0';
		periodAmount.innerHTML = periodSelect.value;
	});
	resultInputAll.forEach(function(elem) {
		elem.value = '';
	});

	for (let i = 1; i < incomeItems.length; i++) {
	incomeItems[i].parentNode.removeChild(incomeItems[i]);
	plusIncome.style.display = 'block';
	}
	for (let i = 1; i < expensesItems.length; i++) {
	expensesItems[i].parentNode.removeChild(expensesItems[i]);
	plusExpenses.style.display = 'block';
	}

	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.expensesMonth = 0;
	this.deposit = false;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.addExpenses = [];


	cancel.style.display = 'none';
	start.style.display = 'block';
	plusExpenses.removeAttribute('disabled');
	plusIncome.removeAttribute('disabled');
	depositCheck.checked = false;
};

const appData = new AppData();

console.log(appData);


start.addEventListener('click', appData.start.bind(appData));
plusExpenses.addEventListener('click', appData.addExpensesBlock.bind(appData));
plusIncome.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', appData.changePeriodValue.bind(appData));
salaryAmount.addEventListener('keyup', appData.check);
cancel.addEventListener('click', appData.reset);

if (appData.getTargetMonth() > 0) {
console.log('Срок достижения цели ' + Math.ceil(appData.getTargetMonth()) + ' месяцев'); 
} else {
	console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

// for (let key in appData) {
// 	console.log('Наша программа включает в себя данные: ' + key + ':' + appData[key]);
// }
