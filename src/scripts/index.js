const cursor_blob = document.getElementById("cursor_blob");

document.body.onpointermove = event => {
    const {clientX, clientY} = event;

    cursor_blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards" });
}