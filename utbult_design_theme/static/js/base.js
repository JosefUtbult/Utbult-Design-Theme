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
    console.log(buttonEl.innerHTML);
    el = buttonEl.parentNode.getElementsByTagName('ul')[0];
    if(el?.classList.contains('hidden')) {
        el?.classList.remove('hidden');
    }
    else {
        el?.classList.add('hidden');
    }
}

window.onload = function() {
    const toc = document.getElementById('toc');
    const content = document.getElementById('content');

    content.querySelectorAll("h1, h2, h3, h4, h5").forEach((el) => {
        const currentEl = document.createElement('li');
        const currentElLink = document.createElement('a')
        currentElLink.href = `#${el.id}`;
        currentElLink.innerHTML = el.innerHTML;

        currentEl.appendChild(currentElLink);
        toc.appendChild(currentEl);
    })
};