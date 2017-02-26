let tableDiv = document.getElementById('table'),
	table = document.createElement('table'),
	imageForTable = document.createElement('img'),
	imageDiv = document.getElementById('img_for_table'),
	slider = document.getElementById('slide_list'),
	currentSlide = 0,
	leftArrow = document.getElementById('slider_left'),
	rightArrow = document.getElementById('slider_right'),
	countOfPaginationPoint = 0,
	divSliderPagination = document.getElementById('sliderPagination'),
	sliderSize = 4,
	emptyBlock = document.getElementsByClassName('slideEmpty'),
	imageForGoods = document.getElementById('goodsURL'),
	nameForGoods = document.getElementById('productName'),
	discriptionForGoods = document.getElementById('discription'),
	priceForGoods = document.getElementById('price'),
	goodsWindow = document.getElementById('flex-buy');

table.className = 'catalog_db';


function hide(state) {
    event.target.parentElement.style.display = state;           
    document.getElementById('popUp_bg').style.display = state;             
}

function show() {
	document.getElementById('account').style.display = 'flex';			
	document.getElementById('popUp_bg').style.display = 'block'; 			
}


if(document.documentElement.clientWidth < 650) {
	sliderSize = 2;
}

function buildEmptySlider(sliderSize){
	
	for(let i = 0; i<sliderSize; i++){
			let slideEmpty = document.createElement('div');
			slideEmpty.setAttribute('class', `slideEmpty`);
	
			let slideImgBlockEmpty = document.createElement('div');
			slideImgBlockEmpty.setAttribute('class', 'slideImgEmpty');
	
			let slideTextEmpty = document.createElement('span');
			slideTextEmpty.setAttribute('class', 'slideTextEmpty');
			slideTextEmpty.innerHTML=`Empty`;
			slideEmpty.appendChild(slideImgBlockEmpty);
			slideEmpty.appendChild(slideTextEmpty);
			slider.appendChild(slideEmpty);
		}
}

buildEmptySlider(sliderSize);

function buildList(data, startPos, endPos) {

	table.innerHTML= '';
		for(let i = startPos; i<=endPos; i++ ){
			let tableRow = document.createElement('tr'),
				tableData = document.createElement('td'),
				tableAddBtn = document.createElement('td'),
				addBtn = document.createElement('a'),
				tableRemoveBtn = document.createElement('td'),
				removeBtn = document.createElement('a');

			if(data[i].activeButton === true) {
				addBtn.setAttribute('class', 'activeAddToSlider');
				removeBtn.setAttribute('class', 'disabledSliderButton');
			} else if(data[i].activeButton === false) {
				addBtn.setAttribute('class', 'disabledSliderButton');
				removeBtn.setAttribute('class', 'activeRemoveFromSlider');
			}
			

			tableData.innerHTML = `${data[i].name}`;
			tableData.setAttribute('data-id',`${data[i].id}`);
			tableData.setAttribute('onclick',`showImage(${data[i].id})`);
			addBtn.innerHTML = '+';
			addBtn.setAttribute('data-id',`${data[i].id}`);
			addBtn.setAttribute('onclick',`addToSlider(${data[i].id})`);
			removeBtn.innerHTML = '-';
			removeBtn.setAttribute('data-id',`${data[i].id}`);
			removeBtn.setAttribute('onclick',`removeFromSlider(${data[i].id})`);
			tableAddBtn.appendChild(addBtn);
			tableRemoveBtn.appendChild(removeBtn);
			tableRow.appendChild(tableData);
			tableRow.appendChild(tableAddBtn);
			tableRow.appendChild(tableRemoveBtn);
			table.appendChild(tableRow);
		}

	tableDiv.insertBefore(table, tableDiv.firstElementChild);

	if(slider.children.length <= sliderSize) {
		rightArrow.style.display = 'none';
	}
}

buildList(data, 0, 9);

function showImage(id) {
	imageDiv.firstElementChild.setAttribute('src', data[id].URL);
}

function moveToLeft() {
	rightArrow.style.display = 'block';
	currentSlide += 157;
	slider.style.left = `${currentSlide}px`;

	if(currentSlide === 0) {
		leftArrow.style.display = 'none';
	}
}

function moveToRight() {
	leftArrow.style.display = 'block';
	currentSlide -= 157;
	slider.style.left = `${currentSlide}px`;

	if(currentSlide === (-(slider.children.length*157-(157*sliderSize)))) {
		rightArrow.style.display = 'none';
	}
}

function addToSlider(currentId) {
	
	if(data[currentId].activeButton === true) {

		if(emptyBlock.length != 0){
			emptyBlock[emptyBlock.length-1].remove();
		}

		event.target.setAttribute('class', 'disabledSliderButton');
		event.target.parentElement.nextElementSibling.firstElementChild.setAttribute('class', 'activeRemoveFromSlider');

		let slide = document.createElement('div');
		slide.setAttribute('class', `slide block${currentId}`);
		slide.setAttribute('data-id', `${currentId}`);
		slide.setAttribute('onclick', `getBuy(${currentId})`);
		let slideImgBlock = document.createElement('div');
		slideImgBlock.setAttribute('class', 'slideImg');

		let slideImage = document.createElement('img');
		slideImage.setAttribute('src', data[currentId].URL);
		slideImgBlock.appendChild(slideImage);

		let slideText = document.createElement('span');
		slideText.setAttribute('class', 'slideText');
		slideText.innerHTML=`${data[currentId].name}`;

		slide.appendChild(slideImgBlock);
		slide.appendChild(slideText);
		slider.insertBefore(slide, slider.firstElementChild);

		if(slider.children.length ===1 || slider.children.length/sliderSize > countOfPaginationPoint) {
			let paginationPoint = document.createElement('a');
				paginationPoint.setAttribute('class', `click_button`);
				paginationPoint.setAttribute('id', `pointId${countOfPaginationPoint}`);
				paginationPoint.setAttribute('onclick', `paginationForSLider(${countOfPaginationPoint})`);
				divSliderPagination.appendChild(paginationPoint);
				countOfPaginationPoint++;
		}
		data[currentId].activeButton = false;
	}

	if(slider.children.length>sliderSize) {
		rightArrow.style.display = 'block';
	}
}


function removeFromSlider(currentId) {
 
 if(data[currentId].activeButton === false) {
		event.target.setAttribute('class', 'disabledSliderButton');
		event.target.parentElement.previousElementSibling.firstElementChild.setAttribute('class', 'activeAddToSlider');

		document.getElementsByClassName(`block${currentId}`)[0].remove();
		if( currentSlide != 0) {
		currentSlide +=157;
		slider.style.left = `${currentSlide}px`;
		}
	
		if(slider.children.length == sliderSize) {
			currentSlide = 0;
			slider.style.left = `${currentSlide}px`;
			rightArrow.style.display = 'none';
 			leftArrow.style.display = 'none';
		}

	 if(slider.children.length<sliderSize && emptyBlock.length < sliderSize) {

	 	let slideEmpty = document.createElement('div');
		slideEmpty.setAttribute('class', `slideEmpty`);

		let slideImgBlockEmpty = document.createElement('div');
		slideImgBlockEmpty.setAttribute('class', 'slideImgEmpty');

		let slideTextEmpty = document.createElement('span');
		slideTextEmpty.setAttribute('class', 'slideTextEmpty');
		slideTextEmpty.innerHTML=`Empty`;
		slideEmpty.appendChild(slideImgBlockEmpty);
		slideEmpty.appendChild(slideTextEmpty);
		slider.appendChild(slideEmpty);
 }		


		data[currentId].activeButton = true;
	}
	if(countOfPaginationPoint-1 === slider.children.length/sliderSize) {
 			divSliderPagination.lastElementChild.remove();
 			countOfPaginationPoint--;
 		}
 		
}

function paginationForSLider(idOfPaginationPoint) {
	if(idOfPaginationPoint === 0) {
		slider.style.left = `${0}px`;
		currentSlide = 0;
		rightArrow.style.display = 'block';
		if(currentSlide === 0) {
			leftArrow.style.display = 'none';
		}

	}else if(slider.children.length/sliderSize > idOfPaginationPoint+1) {
		currentSlide = -sliderSize*157*idOfPaginationPoint;
		slider.style.left = `${currentSlide}px`;
		rightArrow.style.display = 'block';
		leftArrow.style.display = 'block';

	} 
	else{
		currentSlide = -((sliderSize*157*idOfPaginationPoint)+(slider.children.length-sliderSize*(idOfPaginationPoint+1))*157);
		slider.style.left = `${currentSlide}px`;
		leftArrow.style.display = 'block';

		if(currentSlide == -(slider.children.length*157-(sliderSize*157))) {
			rightArrow.style.display = 'none';
		}
	}
}
 function getBuy(currentId) {
 	imageForGoods.setAttribute('src', data[currentId].URL );
	nameForGoods.innerHTML = data[currentId].name;
	discriptionForGoods.innerHTML = data[currentId].discription;
	priceForGoods.innerHTML = `${data[currentId].price}грн`;
	document.getElementById('buyButton').setAttribute('onclick', `addToBasket(${currentId})`)
	if(data[currentId].inBasket) {
		document.getElementById('buyButton').setAttribute('class', 'disactiveAddToBasket');
	} else {
		document.getElementById('buyButton').setAttribute('class', 'activeAddToBasket');
		document.getElementById('buyButton').innerHTML = 'Добавить в корзину!';
	}
	goodsWindow.style.display = 'flex';
	document.getElementById('popUp_bg').style.display = 'block';
 }
function addToBasket(currentId) {
	data[currentId].inBasket = true;
	event.target.innerHTML = 'Уже в корзине';
	event.target.setAttribute('class', 'disactiveAddToBasket');
}
function removeFromBasket(currentId) {
	data[currentId].inBasket = false;
}


let basketCount = 0,
	summurily = 0;

function buildBasket() {
	summurily = 0;
	document.getElementById('tableBasket').innerHTML = '';
	document.getElementById('tableBasket').innerHTML = `<tr>
							<th >#</th>
							<th colspan="2">Название:</th>
							<th >Количество:</th>
							<th>Стоимость:</th>
							<th>Удалить</th>
						</tr>`;
	basketCount = 0;
	summurily = 0;
	for(let i = 0; i<data.length; i++){
		if(data[i].inBasket) {
			basketCount++
			let tableRow = document.createElement('tr');
			tableRow.innerHTML = `<td>${basketCount}</td>
						<td><img src="${data[i].URL}" alt="" class="imgForBasket"></td>
						<td>${data[i].name}</td>
						<td><input type="number" min="1" max="10" value="1" step="1" onchange="calcSummurily(${i})" ></td>
						<td class="tdPrice">${data[i].price}грн</td>
						<td onclick="removeFromBasket(${i})" class='remove-From-Basket'>del</td>`
			document.getElementById('tableBasket').appendChild(tableRow);
			
			if(discontInp) {
				let disc = (data[i].price * (discontInp/100));
				summurily += data[i].price - disc;
			} else {
				summurily+=data[i].price;
			}
			
			
		}
	}
	document.getElementsByClassName('sum')[0].innerHTML = `${summurily}грн`;
	document.getElementById('basket').style.display = 'flex';
	document.getElementById('popUp_bg').style.display = 'block';
}
 function calcSummurily(currentId) {
 	let arr =  document.getElementsByClassName('tdPrice'),
 		inputValue =  event.target.value,
 		result = data[currentId].price * inputValue,
 		disc = (data[currentId].price * (discontInp/100));

 	event.target.parentElement.nextElementSibling.innerHTML = `${result}грн`;
 	summurily = 0

 	for(let i = 0; i<arr.length; i++) {
 		summurily += parseInt(arr[i].innerHTML) - disc;
 	}

 	document.getElementsByClassName('sum')[0].innerHTML = `${summurily}грн`;
 }

 var minutes = 0,
 	seconds = 0,
 	discontInp = 0;

 function setTimer() {

 	let month = parseInt(document.getElementById('setMonth').value),
 		days = parseInt(document.getElementById('setDays').value),
 		hours = parseInt(document.getElementById('setHours').value);
 	discontInp = parseInt(document.getElementById('discont').value);

 	if(isNaN(month)){
 		month = 0;
 	} 
 	if(isNaN(days)){
 		days = 0;
 	} 
 	if(isNaN(hours)){
 		hours = 0;
 	} 
 
 	 	days = days+ month*31;
 	if (days < 10) days = "0" + days;

 	document.getElementById('showDiscont').innerHTML = discontInp;
 	document.getElementsByClassName('special-Offer')[0].style.display='block';

 	function startTimer () {
 		if(seconds == 0) {
	 		if(minutes == 0){
	 			if(hours == 0){
	 				if(days == 0) {
	 					document.getElementsByClassName('spacial-Offer')[0].style.display='none';
	 					discontInp = 0;
	 				}
	 			days--
	 			hours = 60;
	 			 if (days < 10) days = "0" + days;
	 			}
	 		hours--;
	 		minutes = 60;
	 		if (hours < 10) hours = "0" + hours;	
	 		}
	 	minutes--;
	 	seconds= 60;
	 	if (minutes < 10) minutes = "0" + minutes;
	 	}
	 	else seconds--;
 	if (seconds < 10) seconds = "0" + seconds;
 	document.getElementById('day').innerHTML = days;
 	document.getElementById('hour').innerHTML = hours;
 	document.getElementById('minute').innerHTML = minutes;
 	document.getElementById('second').innerHTML = seconds;

 	}

     setInterval(startTimer, 1000);
 }
 function removeFromBasket(currentId) {
 	data[currentId].inBasket = false;
 	buildBasket();

 }
