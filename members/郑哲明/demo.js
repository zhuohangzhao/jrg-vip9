arr = ["a", "b", 1, 3, 5, "b", 2];
newarr = filterNumeric(arr);  //   [1,3,5,2]

function filterNumeric(arr) {
	return arr.filter(function (e){
		return typeof e === 'number'; 
	})
}


=============非ES5实现==================
    
arr = ["a", "b", 1, 3, 5, "b", 2];
newarr = filterNumeric(arr);  //   [1,3,5,2]
    
function filterNumeric(arr) {
    var newArr = []
    for (var i = 0 ; i < arr.length ; i ++) {
        if (typeof arr[i] === 'number') {
            newArr.push(arr[i])
        }
    }
    return newArr
}