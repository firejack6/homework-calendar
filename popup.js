fetch('./config/variables.json').then(response=>response.json()).then(json=>parseclass(json[0]))
var classOptions
var firstload = 1;
function parseclass(configSettings){
    if(firstload == 1){
    classOptions = configSettings["classes"]
        for(let i=0;i<classOptions.length;i++){
            var opt = document.createElement("option");
            opt.value = classOptions[i];
            opt.innerHTML = classOptions[i];

            document.getElementById("classEntry").appendChild(opt)
        }
    }
    firstload = 0;
}