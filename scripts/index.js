const btn = {
    el: document.querySelector('.btn-up'),
    show(){
        this.el.classList.remove('btn-up-hide')
    },
    hide(){
        this.el.classList.add('btn-up-hide')
    },
    addEventListener(){
        window.addEventListener('scroll', () => {
            const scrollOffset = window.scrollY || document.documentElement.scrollTop;

            console.log(scrollOffset)

            scrollOffset > 100 ? this.show() : this.hide()
        });

        this.el.onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }
}


btn.addEventListener();


function getDayInfo(date){

    date = new Date(date);

    let day = date.toLocaleString('default', { weekday: 'long' }),
        month = date.toLocaleString('default', { month: 'long' }),
        year = date.getFullYear(),
        month_number = (date.getMonth() === 2 || date.getMonth() === 7) ? 0 : 1,
        days = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000)),
        weekNumber = Math.ceil(days / 7);

    day = day[0].toUpperCase() + day.slice(1, day.length);
    month = month[0].toUpperCase() + month.slice(1, month.length - month_number) + ((month_number == 0) ? 'а' : 'я');


    return `${day}, ${weekNumber} неделя ${month} ${year} года`;
}

function handleForm(event) {
    let form = document.getElementById('form_container');
    form.classList.toggle('form-container__hide');
}

function generatCategory(data, parents){
    for(let parent of parents){

        let id = parent.id;

        for(let i = 0; i < data[id].length; i++){

            // Product container
            let card = document.createElement('li');
            card.classList.add('category-item');



            // Image of product from index
            let image = document.createElement('div');
            image.classList.add('category-image');
            image.style.backgroundImage = `url('../images/${id}/${i + 1}.jpg')`;



            // Name of product from json
            let title = document.createElement('h2');
            title.innerText = data[id][i].name;


            // Date par from json
            let date = getDayInfo(data[id][i].date);
            let datePar = document.createElement('p');
            datePar.innerText = date;


            let addBtn = document.createElement('button');
            addBtn.onclick = (event) => handleForm(event);
            addBtn.innerText = 'Купить'


            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(datePar);
            card.appendChild(addBtn);

            parent.appendChild(card);
        }
    }
}


const parents = document.querySelectorAll('.category');

let data;

await fetch('../data/data.json')
.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(json => {
    data = json;
});

generatCategory(data, parents);

