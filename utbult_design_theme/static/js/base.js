function toggleLightDarkMode(button) {
    body = document.body
    if(button.checked){
        body.classList.remove('light')
        body.classList.add('dark')
    }
    else {
        body.classList.remove('dark')
        body.classList.add('light')
    }
}

function toggleBurgerMenu() {
    const el = document.getElementById('burger-menu');
    if(el.classList.contains('open')) {
        el.classList.remove('open');
    }
    else {
        el.classList.add('open');
    }
}

function closeBurgerMenu() {
    const el = document.getElementById('burger-menu');
    if(el.classList.contains('open')) {
        el.classList.remove('open');
    }
}

function toggleBurgerMenuInstance(buttonEl) {
    el = buttonEl.parentNode.parentNode.parentNode.getElementsByTagName('ul')[0];
    if(el?.classList.contains('hidden')) {
        el?.classList.remove('hidden');
    }
    else {
        el?.classList.add('hidden');
    }
}

window.onload = function() {
    // Generate TOC
    const toc = document.getElementById('toc');
    const content = document.getElementById('content');

    const firstElements = [];
    const lastElemets = [];
    let currentEl;
    let currentElUl;

    // Generate empty elements to let the first heading be of any depth
    for(let i = 0; i < 6; i++) {
        currentEl = document.createElement('li');
        currentElUl = document.createElement('ul');
        currentEl.appendChild(currentElUl);

        if(i == 0) {
            toc.appendChild(currentEl);
        }
        else {
            lastElemets[i - 1].lastChild.appendChild(currentEl);
        }
        lastElemets[i] = currentEl;
        firstElements[i] = currentEl;
    }

    // Go through all headings and populate the toc
    content.querySelectorAll("h1, h2, h3, h4, h5").forEach((el) => {
        const headingLevelRegex = /[h|H]([1-5]*)/gm;
        const level = headingLevelRegex.exec(el.tagName)[1];
        const button_html = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" preserveAspectRatio="none">
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
        `;

        currentEl = document.createElement('li');
        currentElUl = document.createElement('ul');

        currentEl.innerHTML = `
            <div class="burger-heading-container">
                <a href="#${el.id}">
                    <${el.tagName}>${el.innerHTML}</${el.tagName}>
                </a>
                <div></div>
            </div>
        `;

        if(level > 1) {
            currentElUl.classList.add('hidden');
        }
        currentEl.appendChild(currentElUl);

        if(level == 1) {
            toc.appendChild(currentEl);
        }
        else{
            lastElemets[level - 2].lastChild.appendChild(currentEl);
            const parentContainer = lastElemets[level - 2].getElementsByClassName('burger-heading-container')[0]?.querySelectorAll('div')[0];
            if(parentContainer && level > 2 && !parentContainer.querySelectorAll('button').length) {
                const parentButton = document.createElement('button');
                parentButton.setAttribute('onclick', `toggleBurgerMenuInstance(this)`);
                parentButton.innerHTML = button_html;
                parentContainer.appendChild(parentButton);
            }
        }
        lastElemets[level - 1] = currentEl;
    });

    // Remove unpopulated elements from the furst creation
    for(let i = 5; i >= 0; i--) {
        if(!firstElements[i].querySelectorAll('div').length) {
            if(i > 0) {
                firstElements[i - 1].lastChild.removeChild(firstElements[i]);
            }
            else {
                toc.removeChild(firstElements[i]);
            }
        }
    }
};