var month2num = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6, "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12};
var num2month = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};
var slideIndexLength = Object.keys(month2num).length;
var todaysDate = new Date;
var currentMonth = (todaysDate.getMonth() + 1);
var currentMonth = num2month[currentMonth]
var numMonth = month2num[currentMonth];
var currentYear = todaysDate.getFullYear();
var todaysDay = todaysDate.getDate();
var monthData;

var firstTime = 1;
var firstTimeCompleteButton = 1;

const MC = new Event("refreshData");
document.addEventListener(
    'refreshData',
    (e) => {
        loc = window.parent.document
        // console.log(loc)
        // console.log("event triggered")
        extFile(loc);
        loc = null;
    }, false
)

function extFile(extLoc){ //for functions that execute in popup.html to execute in main
    // console.log(extLoc)
    var bn = extLoc.querySelector("#refreshButton").click()
    // console.log(bn)
    // console.log("Clicking refresh button")
}

function mainCalendar() {
    
    console.log("Main Calendar")
    //onload stuff
    monthsJSON();
    popupListener();
    function monthsJSON(){ //gets list of month lengths
        months();
        // assignmentsData();
        async function months(){
            monthJSON = await fetch("months.json")
            .then(response => response.json())
            .then(json => monthJSON = json);
            // console.log("calling");

            var first = Object.values(monthJSON);
            var monthData = first[0];
            // console.log(monthData);
            if(firstTime == 1){
                indexDays(monthData);
            }
            assignmentsData(monthData);
        }

        async function assignmentsData(monthData){
	    try{
            assignmentsDataJson = await fetch("assignmentsPHP.json")
            .then(response => response.json()).then(json => assignmentsJSON = json);
            decodeAssignments(assignmentsJSON[0],monthData)
        }
	     catch{
            try{
                console.log("Failed Once")
                assignmentsDataJson = await fetch("assignmentsPHP.json")
                .then(response => response.json()).then(json => assignmentsJSON = json);
                decodeAssignments(assignmentsJSON[0],monthData)
            }
            catch{
                console.log("Failed");
                assignmentsDataJson = await fetch("template.json")
                .then(response => response.json())
                .then(json => assignmentsJSON = json);
                decodeAssignments(assignmentsJSON[0],monthData);
            }
        }


        // console.log(firstTimeCompleteButton)
        if(firstTimeCompleteButton == 1){
            document.getElementById(currentMonth).classList.replace("hidden","shown"); //displays current month
            document.getElementById("monthText").innerHTML = currentMonth; //displays name of month
            firstTimeCompleteButton = 2;

        }

        // console.log("load")
    }
    }
    
    function indexDays(second) { //creates box templates
        firstTime = 2;
        // console.log("called")
        forms = document.getElementsByClassName("month");
        // console.log(forms);
        for (let l = 1; l <= slideIndexLength; l++){
            var formNumber = num2month[l]; //sets form to look at
            // console.log(formNumber)
            var currentMonthLocation = document.getElementById(formNumber) //gets location of the form
            // console.log(currentMonthLocation);

            //creates weeks
            for (let i = 0; i <= 5; i++) {
                wkCt = document.createElement("div"); //creates div
                wkCt.classList.add("weekContainer"); //adds class
                currentMonthLocation.appendChild(wkCt); //adds to document
                // console.log(i);
        
                var newDivLocation = currentMonthLocation.getElementsByClassName("weekContainer")[i]; //gets i'th week location
                // console.log(newDivLocation);
        
                //creates days
                for (let j = 1; j <= 7; j++){
                        dCt = document.createElement("div"); //creates div
                        dCt.classList.add("box"); //adds class
                        newDivLocation.appendChild(dCt); //adds to document
                    }
            }
            currentMonthLocation.classList.add("hidden") //sets all months to be hidden by default

            var boxes = currentMonthLocation.getElementsByClassName("box");
            // console.log(boxes);
            for (let k = 0; k < boxes.length; k++) {
                var boxLocation = boxes[k];
                // console.log(boxLocation);
                var boxDivTemp = document.createElement("div"); //creates div
                boxDivTemp.setAttribute('id',"box" + k); //assigns id
                var boxDivDate = document.createElement("p"); //adds text element
                var assignmentContainerDiv = document.createElement("div");
                assignmentContainerDiv.classList.add("assnCont");
                // boxDivDate.innerText = k //box number, NOT DATE
                boxLocation.appendChild(boxDivTemp);    //adds to doc
                boxLocation.appendChild(boxDivDate);    //adds to doc
                boxLocation.appendChild(assignmentContainerDiv);
            }
            setupDays(formNumber,second)
            function setupDays(formNumber,second){
                // console.log(monthJSON)
                // console.log(second)
                var ahh = second;
                var second = ahh;
                var twoone = second[formNumber];
                third = twoone[0];
                // console.log(third);
                
                var numDays = third["numDays"];
                // console.log(numDays);
                var startDay = third["startDay"]
                // console.log(startDay)
                setDates(formNumber, startDay, numDays);
            
                function setDates(formNumber,startDay,numDays){
                    //form number sends "Jan" ,"Feb", "Mar"...
                    var startingBox = startDay - 1;
                    // console.log(startingBox);
                    var check = "#box" + startingBox;
                    // console.log(check)
                    var startBoxId = currentMonthLocation.firstChild.querySelector(check);
                    // console.log(startBoxId)
                    // startBoxId.nextElementSibling.innerHTML = 1;
                    // console.log(numDays)
                    for (let x = 1; x <= numDays; x++){
                        try{
                        var date = x; //id of box
                        // console.log(date)
                        var boxNum = startingBox + x - 1;
                        var dateBox = "#box" + boxNum;
                        // console.log(dateBox)
                        var setBox = currentMonthLocation.querySelector(dateBox);
                        // console.log(setBox)
                        setBox.nextElementSibling.innerHTML = date;
                        var dateId = "day" + date;
                        setBox.nextElementSibling.setAttribute('id',dateId)
                        }
                        catch{
                            console.log("month over")
                        }
                    }
                }
                var box35 = currentMonthLocation.querySelector("#box35");
                var box35val = box35.nextElementSibling.innerText
                if(box35val){
                }
                else {
                    box35.parentElement.parentElement.classList.replace("weekContainer","hidden")
                }
            }
        }
        
        var todayLoc = document.getElementById(currentMonth) //get current date and highlights it
        todayLocParent = todayLoc.querySelector("#day" + todaysDay)
        todayLocParent.parentElement.classList.add("today")
    }
}

function changeMonth(direction){
    var month = num2month[numMonth];
    // console.log(month); 
    // console.log(direction);
    if (direction == 1){ //increases month by 1
        prevNumMonth = numMonth;
        prevDisplayMonth = num2month[prevNumMonth];
        numMonth = numMonth + 1;
        // console.log(numMonth);
        if (numMonth > slideIndexLength){ 
            numMonth = 1;
        }

        displayMonth = num2month[numMonth];
        // console.log(displayMonth);

        document.getElementById(prevDisplayMonth).classList.replace("shown","hidden"); //hides month originally showing
        document.getElementById(displayMonth).classList.replace("hidden","shown"); //displays new month
        document.getElementById("monthText").innerHTML = displayMonth;
        
    }
    
    else if (direction == -1){ //decreases month by 1
        prevNumMonth = numMonth;
        prevDisplayMonth = num2month[prevNumMonth];
        numMonth = numMonth - 1;
        // console.log(numMonth);

        if (numMonth < 1){
            numMonth = slideIndexLength;
        }
        
        displayMonth = num2month[numMonth];
        // console.log(slideIndexLength)
        // console.log(displayMonth);

        document.getElementById(prevDisplayMonth).classList.replace("shown","hidden"); //hides month originally showing
        document.getElementById(displayMonth).classList.replace("hidden","shown"); //displays new month
        document.getElementById("monthText").innerHTML = displayMonth;
    }
}

function cycleForward(){ //called by buttons
    var direction = 1;
    changeMonth(direction);
}

function cycleBackward(){ //called by buttons
    var direction = -1;
    changeMonth(direction);
}

function decodeAssignments(data,monthData){
    // console.log("decoding")
    //removes previous assignments for refreshing
    var prevAssignments = document.querySelectorAll(".assignment");
    var prevAssignments1 = document.querySelectorAll(".assignmentDone");
    clearPrevAssignments(prevAssignments)
    clearPrevAssignments(prevAssignments1);
    // console.log(prevAssignments)


    // console.log(data)
    // console.log(monthData)
    for (let m = 1; m <= 12;m++){ //month
        var year = currentYear;
        var mon = num2month[m];
        var byYear = data[year];
        var byMonth = byYear[mon];
        var monthDays = monthData[mon];
        var monthDays = monthDays[0];
        var monthDays = monthDays["numDays"]
        // console.log(monthDays);
        for(let d = 1; d <= monthDays; d++){ //day
            var byDay = byMonth[d]
            // console.log(byDay)
            if (byDay){
                var order = sortAssignments(byDay);
                // console.log(order);
                // console.log(data);
            } 
            var formNumber = num2month[m];   
            var monthDoc = document.getElementById(formNumber); //sets which slide to search

            var newDayDoc = "#" + "day" + d;
            var newDayDoc = monthDoc.querySelector(newDayDoc);
            // console.log(newDayDoc)
            try{
                var assignmentName = Object.keys(byDay);
                var numAssignments = assignmentName.length
                // console.log(assignmentName);
                var numAssignments = assignmentName.length;
                // console.log(numAssignments);

                var dateDoc = "#day" + d;
                var dayDocP = monthDoc.querySelector(dateDoc); //gets p element of dated box
                var dayDoc = dayDocP.nextElementSibling;
                for(let a = 0; a <= numAssignments; a++){ //assignment
                    var selectedAssignment = byDay[assignmentName[a]]
                    // console.log(selectedAssignment);
                    var dueTime = selectedAssignment["time"];
                    var dueTimeString = String(dueTime);
                    if(dueTimeString.length == 3){
                        var hour = "0" + dueTimeString.substring(0,1);
                        var minutes = dueTimeString.substring(1,3);
                        var dueTimeString = hour + ":" + minutes;
                    } else if(dueTimeString.length == 2){
                        var hour = "00";
                        var minutes = dueTimeString.substring(0,2);
                        console.log(dueTimeString)
                        console.log(minutes)
                        var dueTimeString = hour + ":" + minutes;
                    } else if(dueTimeString.length == 1){
                        var hour = "00";
                        var minutes = "0" + dueTimeString.substring(0,1);
                        var dueTimeString = hour + ":" + minutes;
                    } else if(dueTimeString.length == 0){
                        var hour = "00";
                        var minutes = "00";
                        var dueTimeString = hour + ":" + minutes;
                    }
                    else{
                        var hour = dueTimeString.substring(0,2);
                        var minutes = dueTimeString.substring(2,4);
                        var dueTimeString = hour + ":" + minutes;
                    }
                    
                    var subject = selectedAssignment["class"];
                    var progress = selectedAssignment["progress"];
                    // console.log(dueTime,subject,progress)
                
                    var assignment = document.createElement("p");
                    var dispString = assignmentName[a] + " " +  dueTimeString; //adds invisible character between name and time for button stuff in addAssignment
                    assignment.innerText = dispString;
                    assignment.classList.add(subject);
                    assignment.style.order = order[a]

                    if(progress == 100){
                        assignment.classList.add("assignmentDone")
                        // console.log("Line 300")
                    }
                    // else{
                    assignment.classList.add("assignment");
                    // };

                    dayDoc.appendChild(assignment);
                    // console.log("finished")

                    var deleteButton = document.createElement("button");
                    deleteButton.innerText = "x";
                    deleteButton.classList.add("deleteButton");
                    deleteButton.setAttribute('type','button');
                    // console.log(selectedAssignment)
                    // console.log(dayDoc)
                    var assignmentLocation = dayDoc.querySelectorAll(".assignment")[a]
                    // console.log(assignmentLocation)
                    if (assignmentLocation == null){
                        var assignmentLocation = dayDoc.querySelector(".assignmentDone");
                        // console.log("null result")
                    }
                    // console.log(assignmentLocation)
                    assignmentLocation.appendChild(deleteButton)

                    var completeButton = document.createElement("button");
                    completeButton.innerText = "✓";
                    completeButton.classList.add("completeButton");
                    completeButton.setAttribute('type','button');
                    // console.log(selectedAssignment)

                    var editButton = document.createElement("button");
                    editButton.classList.add("editButton");
                    editButton.setAttribute('type','button');
                    editButton.innerText = "Edit";

                    try{
                    var assignmentLocation = dayDoc.querySelectorAll(".assignment")[a]
                    assignmentLocation.appendChild(editButton)
                    assignmentLocation.appendChild(completeButton)
                    // console.log(assignmentLocation)
                    }
                    catch{
                        console.log("FAILS")
                    }
                    };




            }
            catch{} //it'll just continue when there's no assignments for that day
            // console.log("continue")
            if(firstTimeCompleteButton == 1){
                var addButton = document.createElement("button")
                addButton.innerText = "+";
                addButton.classList.add("addButton")
                addButton.setAttribute('type', "button")
                newDayDoc.parentElement.appendChild(addButton)
            }
        }
    }

    addButtonFun();
    addExtraButtons();
}

function addButtonFun(){
    var addButtonList = document.querySelectorAll(".addButton")
    // console.log(addButtonList)
    for(i of addButtonList){
        i.addEventListener('mouseover', function(){
            this.classList.add("addButtonHover")
        })

        i.addEventListener('mouseleave', function(){
            this.classList.remove("addButtonHover")
        })

        i.addEventListener('click', function() {
            addButtonClicked(this)
        });
    }

    var topAddButton = document.getElementById("addButtonTop")
    topAddButton.addEventListener('click',function() {
        addButtonClicked("topButton");
    });

};

function addExtraButtons(){ 
    var assignmentList = document.querySelectorAll(".deleteButton");
    for(i of assignmentList){
        i.addEventListener('mouseover', function(){
            this.classList.add("deleteButtonHover");
        });

        i.addEventListener('mouseleave', function(){
            this.classList.remove("deleteButtonHover");
        });

        i.addEventListener('click', function() {
            deleteButtonClicked(this);
        });
    };

    var assignmentListComplete = document.querySelectorAll(".completeButton");
    // console.log(assignmentListComplete)
    for(i of assignmentListComplete){
        i.addEventListener('mouseover', function(){
            this.classList.add("completeButtonHover");
        });

        i.addEventListener('mouseleave', function(){
            this.classList.remove("completeButtonHover");
        });

        i.addEventListener('click', function() {
            completeButtonClicked(this);
        });
    };

    var assignmentListEdit = document.querySelectorAll(".editButton");
    for(i of assignmentListEdit){
        i.addEventListener("mouseover", function(){
            this.classList.add("editButtonHover");
        });

        i.addEventListener('mouseleave', function(){
            this.classList.remove("editButtonHover");
        });

        i.addEventListener('click', function(){
            editButtonClicked(this);
        });
    };

}

function clearPrevAssignments(nodeList){
    try{
    for(i in nodeList){
        nodeList[i].remove()
    }
}
catch{"First load"}
}

function popupListener(){
    var form = document.getElementById("iframe").contentWindow.document;
    var subButton = form.firstChild.nextSibling.firstChild.nextElementSibling.firstChild.nextSibling.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    // console.log(subButton)
    subButton.addEventListener('click', function(){
        document.getElementById("iframeContainer").classList.add("hidden");
        // setTimeout(mainCalendar, 1000);
    })
}

function sortAssignments(inArr){
    // console.log("sorting")
    // console.log(inArr)
    var asmt = Object.keys(inArr); //original order
    var numAsng = asmt.length;

    var outTimes = [];
    for(let i=0;i<numAsng;i++){
        var assn = inArr[asmt[i]];
        var assnTime = assn["time"]
        // console.log(assnTime)
        outTimes[i] = assnTime;
    }
    // console.log(outTimes)
    var sortedTime = outTimes.sort((a,b) => {
        if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
    });
    // console.log(outTimes)
    var newTimeLoc = [];
    for(let i=0;i<numAsng;i++){
        // console.log(sortedTime)
        assn = inArr[asmt[i]];
        assnTime = assn["time"];
        // console.log("TIME "+assnTime)
        newTimeLoc[i] = sortedTime.indexOf(assnTime)
        // console.log("LOC "+newTimeLoc)
        sortedTime[newTimeLoc] = 9999;
        // console.log(newTimeLoc);
    }
    // console.log(newTimeLoc);
    return newTimeLoc
}

function hideAssignments(){
    var eventLocs = document.querySelectorAll(".assignment");
    var butVal = document.getElementById("hideAssignments").value;
    if(butVal == 0){
        for(let i=0;i<eventLocs.length;i++){
            if(!eventLocs[i].classList.contains("EVENT")){
                if(!eventLocs[i].classList.contains("ROCKETS")){
                    eventLocs[i].classList.add("hidden")
                }
            }
        }
        document.getElementById("hideAssignments").value = 1;
        document.getElementById("hideAssignments").innerHTML = "Show Assignments";
    } else if(butVal == 1){
        for(let i=0;i<eventLocs.length;i++){
            if(!eventLocs[i].classList.contains("EVENT")){
                if(!eventLocs[i].classList.contains("ROCKETS")){
                    eventLocs[i].classList.remove("hidden")
                }
            }
        }
        document.getElementById("hideAssignments").value = 0;
        document.getElementById("hideAssignments").innerHTML = "Hide Assignments";

    }
}

function hideEvents(){
    var assignmentLocs = document.querySelectorAll(".EVENT");
    var butVal = document.getElementById("hideEvents").value;
    if(butVal == 0){
        for(let i=0;i<assignmentLocs.length;i++){
            assignmentLocs[i].classList.add("hidden")
        }
        document.getElementById("hideEvents").value = 1;
        document.getElementById("hideEvents").innerHTML = "Show Events";
    } else if(butVal == 1){
        for(let i=0;i<assignmentLocs.length;i++){
            assignmentLocs[i].classList.remove("hidden")
        }
        document.getElementById("hideEvents").value = 0;
        document.getElementById("hideEvents").innerHTML = "Hide Events";
    }
}