var deferreds = []
$imgs.each(function(){
    var dfd = $.Deferred()
    $(this).on('load',function(){
        dfd.resolve()
    })
    deferreds.push(dfd)
})

$.when.apply(null,deferreds).done(function(){
    console.log('load complete')
})

<img src="" display="none"></img>