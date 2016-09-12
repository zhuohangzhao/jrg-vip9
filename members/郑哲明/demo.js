$(window).on('mousemove',function(e){
    console.log(e.pageX,e.pageY)
})


function fn(){
    this.name = 'jirengu'
    console.log(this)
}

new fn()