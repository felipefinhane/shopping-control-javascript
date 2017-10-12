var list = [
    {"desc":"rice", "amount":"1", "value":"5.40"},
    {"desc":"beer", "amount":"12", "value":"1.99"},
    {"desc":"meat", "amount":"1", "value":"15.00"}
];

function getTotal(list) {
    var total = 0;
    for(var key in list) {
        total += parseFloat(list[key].value) * parseInt(list[key].amount);
    }
    document.getElementById('totalValue').innerHTML = formatValue(total);
    return;
}

function setList(list) {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead/><tbody>';
    if(list.length > 0) {
        for(var key in list) {
            table += '<tr>';
            table += "<td>" + formatDesc(list[key].desc) + "</td>";
            table += "<td>" + formatAmount(list[key].amount) + "</td>";
            table += "<td class=\"money\">" + formatValue(list[key].value) + "</td>";
            table += '<td>';
            table += "<button onclick=\"setUpdate(" + key + ")\" class=\"btn btn-default\">Edit</button> ";
            table += "<button onclick=\"deleteData(" + key + ")\" class=\"btn btn-default\">Delete</button></td>";
            table += '</tr>';
        }
    } else{
        table += '<tr><td colspan=\"4\">List is empty</td></tr>';
    }
    table += '</tbody>';
    getTotal(list);
    saveListStorage(list);
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    var val = parseFloat(value).toFixed(2) + "";
    val = val.replace(".", ",");
    return "R$ " + val;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function addData() {
    if (!validation()) {
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var obj = {
        "desc": desc,
        "amount": amount,
        "value": value
    };
    list.unshift(obj);
    resetForm();
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById("inputIdUpdate").innerHTML = "<input type=\"hidden\" id=\"idUpdate\" value=\"" + id + "\"/>";
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
}

function resetForm(){
    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById('errors').style.display = "none";
}

function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    list[id] = {
        "desc": desc,
        "amount": amount,
        "value": value
    };
    resetForm();
    setList(list);
}

function deleteData(id) {
    if(confirm("Delete this item?")) {
        if(id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if (desc === "") {
        errors += '<p>Fill out description!</p>';
    }

    if (amount === "") {
        errors += '<p>Fill out amount!</p>';
    } else if (amount != parseInt(amount)) {
        errors += '<p>fill out valid amount!</p>';
    }

    if (value === "") {
        errors += '<p>Fill out value!</p>';
    } else if (amount != parseFloat(amount)) {
        errors += '<p>fill out valid value!</p>';
    }

    if (errors != "") {
        document.getElementById('errors').style.display = 'block';
        document.getElementById('errors').style.backgroundColor = 'rgba(85, 85, 85, 0.3)';
        document.getElementById('errors').style.color = 'white';
        document.getElementById('errors').style.padding = '10px';
        document.getElementById('errors').style.margin = '10px';
        document.getElementById('errors').style.borderRadius = '13px';
        document.getElementById('errors').innerHTML = "<h3>Errors:</h3>" + errors;
        return 0;
    }
    return 1;

}

function deleteList() {
    if(confirm("Delete this List?")) {
        list = [];
        setList(list);
    }
    return;
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList);
    }
    setList(list);
}
initListStorage();
