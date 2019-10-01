document.addEventListener("DOMContentLoaded", function() {
	const Xstart = 8.68; //wsp początku tablicy w %
    const Ystart = 38.05;
    const widthCell = 14.03;  //rozmiar kamórki w %
    const heightCell = 9.26;
	let listExercises = [];
	let activeList = 0;
	
	listExercises = [[{
		id: 4,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 28,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 32,
		sets: 3,
		comment: '20 powtórzeń'
	}],
	[{
		id: 0,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 8,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 3,
		sets: 3,
		comment: '20 powtórzeń'
	}],
	[{
		id: 30,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 14,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 33,
		sets: 3,
		comment: '20 powtórzeń'
	},
	{
		id: 35,
		sets: 3,
		comment: '20 powtórzeń'
	}]	
	];
	titleList = ['Trening Dynamiczny', 'Trening Niedzielny', 'Trening Ciężki'];
	
	function activeMenu(){
		const menu = document.querySelectorAll('.menu a');
		menu.forEach(function(link, index){
			link.innerHTML = titleList[index];
			link.addEventListener('click', function(event){
				activeList = index;
				showList();
				event.preventDefault();
				menu.forEach(function(link2){
					link2.classList.remove('active');
				});
				link.classList.add('active');
			});
		})
	}
	
    function mouseSelect(){
        const absTab = document.querySelector('#absImg');
        absTab.addEventListener('click', function(e){
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            const xpr = 100 * x / absTab.width;
            const ypr = 100 * y / absTab.height;
    
            if (xpr > Xstart && xpr < (Xstart + widthCell * 6) && ypr > Ystart && ypr < (Ystart + heightCell * 6)) {
               const idExercise = Math.floor((xpr - Xstart) / widthCell) + 6 * Math.floor((ypr - Ystart) / heightCell);
			   addExercise(idExercise);
            }
        });
    }

    function addExercise(id){
        function Exercise(id)  {
            this.id = id,
            this.sets = 3,
			this.comment = '20 powtórzeń'
        }
        const newExercise = new Exercise(id);
        listExercises[activeList].push(newExercise);
		showList();
		const toAnim = document.querySelector('.listElement:last-child');
		toAnim.classList.add('animNew');
    }

    function showList(){
		function addTitle(){
			const title = document.createElement('h2');
			title.innerHTML = titleList[activeList];
			title.classList.add('listTitle');
			listDiv.appendChild(title);

			const titleInput = document.createElement('input');
			titleInput.type = 'text';
			titleInput.value = titleList[activeList];
			titleInput.classList.add('hide');
			titleInput.classList.add('titleEdit');
			listDiv.appendChild(titleInput);
		}

		function changeOrder(object, index, direction){
			if ((index + direction >= 0) && (index + direction < listExercises[activeList].length)) {
				listExercises[activeList].splice(index, 1);
				listExercises[activeList].splice(index + direction, 0, object);
				showList();
			}
		}

		function add_edit_button(){
			const editButton = document.createElement('button');
			editButton.innerHTML = 'edytuj';
			editButton.id = 'editButton';
			listDiv.appendChild(editButton);
			editButton.addEventListener('click', function(){
				const comments = document.querySelectorAll('.comment');
				const textEdit = document.querySelectorAll('.textEdit');
				const title = document.querySelector('.listTitle');
				const titleInput = document.querySelector('.titleEdit');
				const menu = document.querySelectorAll('.menu a')[activeList];

				const toHide = document.querySelectorAll('.comment, .textEdit, .listTitle, .titleEdit');
				toHide.forEach(function(toHide){
					toHide.classList.toggle('hide');
				});

				if (editButton.innerHTML == 'edytuj'){
					editButton.innerHTML = 'zapisz';
				} else
				if (editButton.innerHTML == 'zapisz'){
					editButton.innerHTML = 'edytuj';
					titleList[activeList] = titleInput.value;
					title.innerHTML = titleList[activeList];
					menu.innerHTML = titleList[activeList];
					comments.forEach(function(comm, i){
						comm.innerHTML = textEdit[i].value;
						listExercises[activeList][i].comment = textEdit[i].value;
					});
				}
			});
		}

		function add_canvas(item, exercise){
			const canvasDiv = document.createElement('canvas');
			canvasDiv.classList.add('miniCanv');
			canvasDiv.width = '107';
			canvasDiv.height = '100';
			item.appendChild(canvasDiv);
			const ctx = item.querySelector('canvas').getContext('2d');
		
			image.addEventListener('load', function(){
				const xOrg = 112 + (exercise.id % 6) * 181; 
				const yOrg = 694 + (Math.floor(exercise.id / 6)) * 169; 
				   ctx.drawImage(image, xOrg, yOrg, 181, 169, 0, 0, 107, 100);
			});
		}

		function add_input(item, exercise){
			const textEdit = document.createElement('input');
			textEdit.type = 'text';
			textEdit.value = exercise.comment;
			textEdit.classList.add('hide');
			textEdit.classList.add('textEdit');
			item.appendChild(textEdit);
		}
		
		function add_comment(item, exercise){
			const comment = document.createElement('span');
			comment.classList.add('comment');
			comment.innerHTML = exercise.comment;
			item.appendChild(comment);
		}

		function add_arrows(item, exercise, index){
			const arrows = document.createElement('span');
			arrows.classList.add('arrows');
			item.appendChild(arrows);
			const arrowUp = document.createElement('img');
			arrowUp.src = 'img/arrow_up.png';
			const arrowDown = document.createElement('img');
			arrowDown.src = 'img/arrow_down.png';
			arrows.appendChild(arrowUp);
			arrows.appendChild(arrowDown);
			arrowUp.addEventListener('click', function(){
				changeOrder(exercise, index, -1);
			});
			arrowDown.addEventListener('click', function(){
				changeOrder(exercise, index, 1);
			});	
		}
		
		function add_delete(item, index){
			const del = document.createElement('img');
			del.classList.add('delete');
			del.src = 'img/delete.png';
			item.appendChild(del);
			del.addEventListener('click', function(){
				const toDelete = this.parentElement;
				toDelete.classList.add('animDelete');
				listExercises[activeList].splice(index, 1);
				setTimeout(function(){showList();}, 280);
			});
		}

		const listDiv = document.querySelector('#treningView');
		listDiv.innerHTML = '';
		const image = new Image();
		image.src = 'img/ab-exercises-chart.jpg';
		addTitle();
		add_edit_button();

        listExercises[activeList].forEach(function(ob, index){
			const el = document.createElement('div');
            el.classList.add('listElement');
			add_canvas(el, ob);
			add_input(el, ob);
			add_comment(el, ob);
			add_arrows(el, ob, index);
			add_delete(el, index);
            listDiv.appendChild(el);
        }); 
    }

activeMenu();
mouseSelect();
showList();
});