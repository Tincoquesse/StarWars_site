console.log('Hello')

document.addEventListener('DOMContentLoaded', (event) => {

    fetch(`http://swapi.dev/api/starships/?page=1`)
        .then(response => response.json())
        .then(response => {
            // console.log(response['results']);
            renderStarshipsPaginator(response['count'])
            renderStarshipsList(response['results']);
            console.log(localStorage);
        });

    function renderStarshipsList(starships, nextRoll){
        if(nextRoll){
            const starshipsHtmlElems = starships.map((starship, index) => getStarshipLayout(starship, index))
            const starshipsList = document.querySelector('#starships-container');
            removeAllChildNodes(starshipsList);
            starshipsHtmlElems.forEach(elem => starshipsList.append(elem));

        }
        else {
            const peopleHtmlElems = starships.map((person, index) => getStarshipLayout(person, index))
            const starshipsList = document.querySelector('#starships-container');
            peopleHtmlElems.forEach(elem => starshipsList.append(elem));

        }
    }
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function getStarshipLayout(starship, index) {
        const root = getStarshipRoot();
        index++;
        root.append(getFollowIcon(starship['name']))
        root.append(getStarshipProp('', starship['name']));
        root.append(getStarshipProp('Model: ', starship['model'], index));
        root.append(getStarshipProp('Cost: ', starship['cost_in_credits'], index));
        root.append(getStarshipProp('Manufacturer: ', starship['manufacturer'], index));
        root.append(getStarshipButton(index));
        return root;
    }

    function getStarshipRoot() {
        const root = document.createElement('div');
        root.classList.add('container-item');
        return root;
    }

    function getStarshipProp(title, property, index) {
        const prop = document.createElement('div');
        prop.classList.add('card-title');
        if (index) {
            prop.classList.add(`starship-toggle-prop-${index}`);
            prop.classList.add('hide')
        }
        prop.innerText = `${title}${property}`;
        return prop;
    }


    function getFollowIcon(name) {
        const key = name.replace(/\s/g, '')
        const value = new Date().toLocaleString();
        const elem = document.createElement('div');
        localStorage.getItem(key) ? elem.classList.add('icon-used') : elem.classList.add('icon-not-used');
        elem.addEventListener('click', () => {
            if (elem.classList.contains('icon-not-used')) {
                elem.classList.replace('icon-not-used', 'icon-used');
                localStorage.setItem(key, value);
                console.log(localStorage)
            } else {
                elem.classList.replace('icon-used', 'icon-not-used');
                localStorage.removeItem(key);
                console.log(localStorage)
            }
        })
        return elem
    }

    function getStarshipButton(index) {
        const button = document.createElement('button');
        button.id = `starship-details-button-${index}`;
        button.innerText = 'Details';
        button.addEventListener('click', () => {
            const props = document.querySelectorAll(`.starship-toggle-prop-${index}`);
            props.forEach(prop => {
                if (prop.classList.contains('hide')) {
                    prop.classList.replace('hide', 'visible')
                } else {
                    prop.classList.replace('visible', 'hide')
                }
            });
        });
        return button;
    }


    function renderStarshipsPaginator(count, page = 1) {
        const pages = Math.ceil(count / 10);
        const select = document.getElementById('page');
        for (let i = 1; i <= pages; i++) {
            const option = document.createElement('option');
            option.innerText = i;
            option.value = i;
            select.append(option);
        }
        select.value = page;
        select.addEventListener('change', (event) => {
            fetch(`http://swapi.dev/api/starships/?page=${event.target.value}`)
                .then(response => response.json())
                .then(response => {
                    page = event.target.value;
                    renderStarshipsList(response['results'], true);
                    select.innerText = '';
                    renderStarshipsPaginator(response['count'], page);
                });
        })

    }
})

function navFunction() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function lightMode() {
    const element = document.body;
    element.classList.toggle("light_on");
    const element2 = document.querySelector('#home')
    element2.classList.toggle("header-light");


}