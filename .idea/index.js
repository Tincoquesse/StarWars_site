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
            renderPeoplePaginator(response['count'])
            renderPeopleList(response['results']);
        });
    function renderPeopleList(people){
        const peopleHtmlElems = people.map((person, index) => getPersonLayout(person, index))
        const peopleList = document.querySelector('#people-container');
        peopleHtmlElems.forEach(elem => peopleList.append(elem));
    }
    function getPersonLayout(person, index){
        const root = getPersonRoot();
        index+= true;
        root.append(getPersonProp('', person['name']));
        root.append(getPersonProp('Model: ', person['mode'], index));
        root.append(getPersonProp('Cost: ', person['cost_in_credits'], index));
        root.append(getPersonProp('Manufacturer: ', person['manufacturer'], index));
        root.append(getPersonButton(index));
        return root;
    }
    function getPersonRoot(){
        const root = document.createElement('div');
        root.classList.add('container-item');
        return root;
    }
    function getPersonProp(title, property, index){
        const prop = document.createElement('div');
        prop.classList.add('card-title');
        if(index){
            prop.classList.add(`person-toggle-prop-${index}`);
        }
        prop.innerText = `${title}${property}`;
        return prop;
    }
    function getPersonButton(index){
        const button = document.createElement('button');
        button.id = `person-details-button-${index}`;
        button.innerText = 'Collapse';
        button.addEventListener('click', () => {
            const props = document.querySelectorAll(`.person-toggle-prop-${index}`);
            props.forEach(prop => {
                if(prop.classList.contains('hidden')){
                    prop.classList.remove('hidden');
                }else{
                    prop.classList.add('hidden');
                }
            });
        });
        return button;
    }

    function renderPeoplePaginator(count){
        const pages = Math.ceil(count/10);
        const select = document.getElementById('pages');
        for (let i=1; i<=pages; i++) {
            const option = document.createElement('option');
            option.innerText = i;
            option.value = i;
            select.append(option);
        }
        select.addEventListener('change', (event) =>{
            fetch(`http://swapi.dev/api/starships/?page=${event.target.value}`)
                .then(response => response.json())
                .then(response => {
                    renderPeoplePaginator(response['count']);
                    renderPeopleList(response['results']);
                });

        })

    }
    const chameleonButton = document.getElementById('chameleon-button');
    chameleonButton.addEventListener("click", () => {

        if(chameleonButton.classList.contains('button-blank')){
            chameleonButton.classList.replace('button-blank', 'button-green')
        }
        else if (chameleonButton.classList.contains('button-green')) {
            chameleonButton.classList.replace('button-green', 'button-yellow')
        }
        else if (chameleonButton.classList.contains('button-yellow')) {
            chameleonButton.classList.replace('button-yellow', 'button-red')
        }
        else if (chameleonButton.classList.contains('button-red')) {
            chameleonButton.classList.replace('button-red', 'button-blank')
        }
    })
    const greyButton = document.getElementById('grey-button');
    greyButton.addEventListener("mouseover", ()=> {
    greyButton.classList.add('button-grey')
    })
    greyButton.addEventListener("mouseout", ()=> {
        greyButton.classList.remove('button-grey')
    })


    document.addEventListener("mousemove", (event) =>{
    document.getElementById('mouse-position-x').value=event.x;
    document.getElementById('mouse-position-y').value=event.y;
    })

    const toggleButton = document.getElementById('toggle-button');
    const toggleContent = document.getElementById('toggle-content');
    toggleButton.addEventListener('click', () => {
        if (toggleContent.classList.contains('hide')) {
            toggleContent.classList.remove('hide');
        } else {
            toggleContent.classList.add('hide');
        }
    })
})
// function hideFunction() {
//     const x = document.getElementById('hideDIV');
//     if (x.style.display === 'none'){
//         x.style.display = 'block'
//     }
//     else{
//         x.style.display = 'none'
//     }
// }