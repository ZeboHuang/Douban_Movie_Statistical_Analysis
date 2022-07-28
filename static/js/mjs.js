//Get the button:
mybutton = document.getElementById("back2top");
next_btn = document.getElementById('nextBtn');
prev_btn = document.getElementById('prevBtn');


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

mybutton.style.display = "block";
next_btn.style.display = "block";
prev_btn.style.display = "block";

// function scrollFunction() {
//     // console.log('scroll')
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//
//     } else {
//         mybutton.style.display = "none";
//         next_btn.style.display = "none";
//         prev_btn.style.display = "none";
//     }
// }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    click_cnt = 0;
}

var click_cnt = 0

//跳转下一各锚点
function nextFunction() {
    if (click_cnt < 10) {
        click_cnt+=1
        window.location.href = "#block_" + click_cnt;
        console.log(click_cnt)
    }
}

function prevFunction() {
    if (click_cnt > 0) {
        click_cnt-=1
        window.location.href = "#block_" + click_cnt;
        console.log(click_cnt)
    }
}

// console.log('in mjs')