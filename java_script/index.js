console.log('Hello')

document.addEventListener('DOMContentLoaded', (event) => {

    // BASIC DOM MANIPULATION
    // https://developer.mozilla.org/en-US/docs/Web/API/Event

    // console.log('on DOMContentLoaded', event)
    // console.log(document.querySelectorAll(".container"));
    // console.log(document.querySelector("#people-container"))

    // const peopleContainer = document.querySelector("#people-container");
    // peopleContainer.classList.add('people-wrapper');
    // peopleContainer.setAttribute('customAttribute', 'customValue');
    //
    // const paragraph = document.createElement('p');
    // paragraph.textContent = 'this is people paragraph';
    // peopleContainer.append(paragraph);
    // peopleContainer.style.cssText = 'border: 1px solid black; cursor: pointer';
    //
    // peopleContainer.addEventListener('click', (event) => {
    //     console.log('click', event)
    // });
    // BASIC DOM MANIPULATION END

    // OLD SCHOOL REQUEST
    // // Create new XMLHttpRequest() object to communicate with server layer
    // const request = new XMLHttpRequest();
    // // open() defines method type and specific URL of api that we want to communicate with
    // request.open('GET', 'http://swapi.dev/api/people/?page=1');
    // // send() execute the defined request
    // request.send();
    // // wait for request results and set listener to deal with the data
    // request.addEventListener('load', function(){
    //     const response = JSON.parse(this.responseText)
    //     console.log(response);
    // });
    // OLD SCHOOL REQUEST END

    fetch(`http://swapi.dev/api/starships/?page=1`)
        .then(response => response.json())
        .then(response => {
            console.log(response['results']);
            renderStarshipsPaginator(response['count'])
            renderStarshipsList(response['results']);
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

    function getStarshipLayout(person, index){
        const root = getStarshipRoot();
        index++;
        // const response;
        // response.prop1.prop2.prop3;
        // response['prop1']['prop2']['prop3']

        root.append(getFollowIcon(index, person['name']))
        root.append(getStarshipProp('', person['name']));
        root.append(getStarshipProp('Model: ', person['model'], index));
        root.append(getStarshipProp('Cost: ', person['cost_in_credits'], index));
        root.append(getStarshipProp('Manufacturer: ', person['manufacturer'], index));
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
    pageGlobal = 1;

    function getFollowIcon(index, person) {
        const str = person;
        const key = str.replace(/\s/g, '')
        const value = 'liked';
        const img = document.createElement('div');
        img.classList.add('icon-not-used');
        img.id = value;
        img.classList.add(key);
        img.addEventListener('click', () =>{
            if (img.classList.contains('icon-not-used')){
                img.classList.replace('icon-not-used', 'icon-used');
                localStorage.setItem(key, value);
                console.log(localStorage)
            }
            else{
                img.classList.replace('icon-used', 'icon-not-used');
                localStorage.removeItem(key);
                console.log(localStorage)
            }
        })
        return img
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
            pageGlobal = event.target.value;
        })

    }
    // const chameleonButton = document.getElementById('chameleon-button');
    // chameleonButton.addEventListener("click", () => {
    //
    //     if(chameleonButton.classList.contains('button-blank')){
    //         chameleonButton.classList.replace('button-blank', 'button-green')
    //     }
    //     else if (chameleonButton.classList.contains('button-green')) {
    //         chameleonButton.classList.replace('button-green', 'button-yellow')
    //     }
    //     else if (chameleonButton.classList.contains('button-yellow')) {
    //         chameleonButton.classList.replace('button-yellow', 'button-red')
    //     }
    //     else if (chameleonButton.classList.contains('button-red')) {
    //         chameleonButton.classList.replace('button-red', 'button-blank')
    //     }
    // })
    // const greyButton = document.getElementById('grey-button');
    // greyButton.addEventListener("mouseover", ()=> {
    // greyButton.classList.add('button-grey')
    // })
    // greyButton.addEventListener("mouseout", ()=> {
    //     greyButton.classList.remove('button-grey')
    // })
    //
    //
    // document.addEventListener("mousemove", (event) =>{
    // document.getElementById('mouse-position-x').value=event.x;
    // document.getElementById('mouse-position-y').value=event.y;
    // })
    //
    // const toggleButton = document.getElementById('toggle-button');
    // const toggleContent = document.getElementById('toggle-content');
    // toggleButton.addEventListener('click', () => {
    //     if (toggleContent.classList.contains('hide')) {
    //         toggleContent.classList.remove('hide');
    //     } else {
    //         toggleContent.classList.add('hide');
    //     }
    // })
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