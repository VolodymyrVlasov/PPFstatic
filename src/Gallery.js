let list = document.querySelectorAll('.product_gallery_image__wrapper');

console.log(list[1])

document.querySelector('.product_gallery_video').addEventListener('mouseover', (e) => {
    e.target.play();
})

document.querySelector('.product_gallery_video').addEventListener('mouseout', (e) => {
    e.target.pause()
})

