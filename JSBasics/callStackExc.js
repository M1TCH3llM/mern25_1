function sloverFlow() {
    if (i <= 999) {
    setTimeout(() => {
        sloverFlow();
        console.log("SlowverFlow!" + i);
        i++
    })
} else {
     console.log("Function Death " + i);
    sloverFlow();
}
}

sloverFlow();