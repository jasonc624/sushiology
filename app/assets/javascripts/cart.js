var itemNumber = [];
var quantities = [];
var products = [];

function AddOrder(ItemId) {

    if (document.getElementById("hover_input" + ItemId.toString()).value != "") {
        var s = document.getElementById("ProductColumn").innerHTML;
        var value = document.getElementById("item" + ItemId).innerHTML;

        if (document.getElementById("itemName" + value) == null) {
            s = s + "<h6 class=\"productInCart\" id=\"itemName" + value + "\">" + value + "</h6>";
            document.getElementById("ProductColumn").innerHTML = s;

            var s = document.getElementById("QuantityColumn").innerHTML;
            s = s + "<h6 class=\"itemQTY\" id=\"" + value + "Quantity\">" + document.getElementById("hover_input" + ItemId).value + "</h6>";
            document.getElementById("QuantityColumn").innerHTML = s;

            var element = document.getElementById('CancelColumn');
            newInput = document.createElement('input');

            newInput.type = 'button';
            newInput.value = 'X';
            newInput.className = 'CancelButt';
            newInput.onclick = deleteRow.bind(null, value, newInput); // whatever value is?

            element.appendChild(newInput);


            itemNumber.push(ItemId);
            quantities.push(document.getElementById("hover_input" + ItemId).value);
            products.push(value);
        } else {
            document.getElementById(value + "Quantity").innerHTML = document.getElementById("hover_input" + ItemId).value;
            quantities[products.indexOf(value)] = document.getElementById("hover_input" + ItemId).value;
        }
    }

}
function deleteRow(value, thisButton) {
    var element = document.getElementById("itemName" + value);
    element.parentNode.removeChild(element);

    var element = document.getElementById(value + "Quantity");
    element.parentNode.removeChild(element);

    thisButton.parentNode.removeChild(thisButton);
}
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie() {
    var exdate = new Date();

    //for quantities
    exdate.setDate(exdate.getDate() + 1);
    var c_value = escape(quantities.join('|')) + ((1 == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = "Quantities" + "=" + c_value;

    //for products
    exdate.setDate(exdate.getDate() + 1);
    var c_value = escape(products.join('|')) + ((1 == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = "productNames" + "=" + c_value;

    //for itemNumber
    exdate.setDate(exdate.getDate() + 1);
    var c_value = escape(itemNumber.join('|')) + ((1 == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = "ItemNumber" + "=" + c_value;

    window.open("order.html", "_self")
}

function checkCookie() {
    var prices = [8.99, 4.99, 3.99, 2.99, 3.99, 6.99, 5.99, 5.99, 2.99, 7.99, 10.99, 12.99];
    products = getCookie("productNames");
    customerName = getCookie("CustomerName");

    if (products != null && products != "") {
        var total = 0;
        quantities = getCookie("Quantities");
        itemNumber = getCookie("ItemNumber");

        products = products.split('|');
        quantities = quantities.split('|');
        itemNumber = itemNumber.split('|');

        var table = document.getElementById("OrderTable");
        for (i = 0; i < products.length; i++) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = products[i];
            cell2.innerHTML = "x" + quantities[i];
            cell3.innerHTML = "$" + prices[itemNumber[i] - 1] * quantities[i];
            total += prices[itemNumber[i] - 1] * quantities[i];
        }

        document.getElementById("Amount").innerHTML = "$" + total;

    } else if (customerName != null) {
        document.getElementById("OrderTable").style.display = "none";

        var e = document.getElementById("ThankYouLabel");
        e.style.display = "block";
        e.innerHTML = "Thank you for ordering " + customerName + "!";


    } else {
        alert("You should go to the menu and select items to order");
    }
}

function OpenOrderForm() {
    var e = document.getElementById("orderHoverBox");
    e.style.display = "block";
}

function CloseOrderForm() {
    var e = document.getElementById("orderHoverBox");
    e.style.display = "none";
}

function OrderButton() {
    var exdate = new Date();

    //for quantities
    exdate.setDate(exdate.getDate() + 1);
    var c_value = escape(document.getElementById("orderNameInput").value) + ((1 == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = "CustomerName" + "=" + c_value;

    document.cookie = "ItemNumber" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "productNames" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "Quantities" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    window.open("order.html", "_self")
}

