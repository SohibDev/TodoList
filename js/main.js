const elForm = findElement('#add-form');
const ul = findElement('#todos');
const errSpan = findElement('#span');
const elSearch = findElement('#search');
const elSelect = findElement('#select');
const themeBtn = findElement('#btn-theme');

const allBtn = findElement('#all');
const completedBtn = findElement('#completed');
const unCompletedBtn = findElement('#uncompleted');

const todoTemplate = findElement('#todo-template');

completedBtn.addEventListener('click', () => {
	const result = todos.filter((todo) => {
		if (todo.completed === true) {
			return todo;
		}
	});

	renderTodos(result);
});
unCompletedBtn.addEventListener('click', () => {
	const result = todos.filter((todo) => {
		if (todo.completed === false) {
			return todo;
		}
	});

	renderTodos(result);
});
allBtn.addEventListener('click', () => {
	renderTodos(todos);
});

function renderTodos(array) {
	ul.textContent = '';

	const fragment = document.createDocumentFragment();

	array.forEach(function (todo) {
		const template = todoTemplate.content.cloneNode(true);
		const title = findElement('.title1', template);
		const date = findElement('.date', template);
		const editBtn = findElement('.btn-primary', template);
		const deleteBtn = findElement('.btn-danger', template);
		const completeBtn = findElement('.btn-info', template);

		editBtn.dataset.id = todo.id;
		deleteBtn.dataset.id = todo.id;
		completeBtn.dataset.id = todo.id;

		title.textContent = todo.title;
		date.textContent += generateDate(todo.date);
		fragment.appendChild(template);
	});

	ul.appendChild(fragment);
}

renderTodos(todos);

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();

	let input = evt.target.todo;

	let date = evt.target.date;

	// form validation
	if (input.value === '') {
		span.style.display = 'block';
		input.className += ' border-danger';

		return;
	}
	span.style.display = 'none';
	input.className = 'form-control';

	// add todo to array
	const newTodo = {
		// id:	todos.length+1,
		id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
		title: input.value,
		completed: false,
		date: date.value,
	};

	todos.push(newTodo);

	renderTodos(todos);

	elForm.reset();
});

let theme = 'light';

themeBtn.addEventListener('click', function () {
	if (theme === 'dark') {
		document.body.className = 'light'; // oq rang
		theme = 'light'; //oq

		themeBtn.textContent = 'Tungi rejim';
	} else if (theme === 'light') {
		document.body.className = 'dark'; // qora rang
		theme = 'dark'; // qora
		themeBtn.textContent = 'Kunduzgi rejim';
	}
});

ul.addEventListener('click', function (evt) {
	const element = evt.target;

	// complete
	if (element.className.includes('complete-btn')) {
		const inputId = Number(element.dataset.id);

		todos.forEach((todo) => {
			if (todo.id === inputId) {
				todo.completed = !todo.completed;
			}
		});

		renderTodos(todos);
	}

	// delete
	if (element.className.includes('btn-danger')) {
		const id = Number(element.dataset.id);

		const result2 = todos.filter((todo) => {
			if (todo.id !== id) {
				return todo;
			}
		});
		todos = result2;

		renderTodos(result2);
	}

	// edit
	if (element.className.includes('btn-primary')) {
		const id = Number(element.dataset.id);

		const editTodoInput = document.querySelector('#edit-todo');
		const editDateInput = document.querySelector('#edit-date');
		const editDateText = document.querySelector('.edit-date-text');
		const editBtn = document.querySelector('#edit-btn');

		todos.forEach((todo) => {
			if (todo.id === id) {
				editTodoInput.value = todo.title;
				editDateText.textContent = generateDate(todo.date);

				editBtn.addEventListener('click', () => {
					const title = editTodoInput.value;
					const date = editDateInput.value;
					todo.title = title;
					todo.date = date;

					renderTodos(todos);
				});
			}
		});
	}
});

// search
elSearch.addEventListener('change', () => {
	const inputValue = elSearch.value;

	let searchArray = todos.filter((todo) => {
		if (todo.title.toLowerCase().includes(inputValue.toLowerCase())) {
			return todo;
		}
	});

	renderTodos(searchArray);
});

// filter
elSelect.addEventListener('change', () => {
	if (elSelect.value === 'all') {
		renderTodos(todos);
		return;
	}
	let resultArray = todos.filter((todo) => {
		if (elSelect.value == String(todo.completed)) {
			return todo;
		}
	});

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			console.log(genre, elSelect.value);
		});
	});

	renderTodos(resultArray);
});

AOS.init();
