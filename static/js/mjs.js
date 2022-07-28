//Get the button:
mybutton = document.getElementById("back2top");
next_btn = document.getElementById('nextBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    // console.log('scroll')
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
        next_btn.style.display = "block";
    } else {
        mybutton.style.display = "none";
        next_btn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    click_cnt = 0;
}

var click_cnt = 0

//跳转下一各锚点
function nextFunction() {
    let lst = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11];
    if (click_cnt < lst.length) {
        hrefstr=window.location.href.toString();
        console.log(hrefstr[hrefstr.length-1])
        window.location.href = "#block_" + lst[click_cnt++];
    } else
        click_cnt = 0;
}

// console.log('in mjs')