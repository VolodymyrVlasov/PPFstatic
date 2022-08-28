document.querySelector('.product_gallery_video').addEventListener('mouseover', (e) => {
    console.log("hover", e.target);
    e.target.play();
})

document.querySelector('.product_gallery_video').addEventListener('mouseout', (e) => {
    e.target.pause()
})

let gallery = document.querySelector('.product_gallery');
gallery.addEventListener('mouseover', (e) => {  
    const targetNode = e.target
    if (targetNode.tagName == "VIDEO") {
        targetNode.play();
    }     
})

gallery.addEventListener('mouseout', (e) => {  
    const targetNode = e.target
    if (targetNode.tagName == "VIDEO") {
        targetNode.pause();
    }     
})  