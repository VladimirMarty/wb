export function open(item) {
    item.classList.add('active');
    document.addEventListener('keydown', closeByEsc);
    item.addEventListener('click', closeByOverlay);

};

export function close(popap) {
    popap.classList.remove('active');
    document.removeEventListener('keydown', closeByEsc);
    popap.removeEventListener('click', closeByOverlay);
};


function closeByEsc(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.active');
        close(openedPopup);
    }
};

function closeByOverlay(e) {
    console.log(e)
    if (e.target.classList.contains('active')) {
        close(e.target);
    };
};