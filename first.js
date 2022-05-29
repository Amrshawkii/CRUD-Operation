

var productNameInp = document.getElementById("productNameInput");
var productPriceInp = document.getElementById("productPriceInput");
var productCategoryInp = document.getElementById("productCategoryInput");
var productDescInp = document.getElementById("productDescInput");
var productsList ;
var addBtn = document.getElementById("addBtn")
var currentIndex = 0 ;

addBtn.addEventListener("click" , function(){

    if (addBtn.innerHTML == "add")
    {
        addProduct();
    }
    else
    {
        saveUpdate();
    }
})

function saveUpdate()
{
    product = 
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value
    }
    productsList[currentIndex] = product;
    localStorage.setItem("myProducts" , JSON.stringify(productsList));
    displayProducts();
    clearForm();
    addBtn.innerHTML = "add";
}

if(localStorage.getItem("myProducts") == null)
{
    productsList = [] ;
}
else
{
    productsList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}


function addProduct()
{
    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value
    }
    productsList.push(product);
    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
    displayProducts();
    clearForm();


}

function displayProducts()
{
    var cont = "";

    for (var i = 0 ; i < productsList.length ; i++)
    {
        cont += `<tr>
        <td>`+i+`</td>
        <td>`+productsList[i].name+`</td>
        <td>`+productsList[i].price+`</td>
        <td>`+productsList[i].category+`</td>
        <td>`+productsList[i].desc+`</td>
        <td><button onclick = "updateProduct(`+i+`)" class='btn btn-warning'>update</button></td>
        <td><button onclick = "deleteProduct(`+i+`)" class='btn btn-danger'>delete</button></td>
        </tr>`;

    }
    document.getElementById("tableBody").innerHTML = cont;
}

function clearForm()
{
     productNameInp.valu = "" ;
     productPriceInp.value = "" ;
     productCategoryInp.value = "" ;
     productDescInp.value = "" ;
}

function searchProducts(term)
{
    var cartona = "";
    var cartona2 = "";
    var newTxt = "";
    for(i = 0 ; i < productsList.length ; i++)
    {
        if(productsList[i].name.includes(term.trim()) == true)
        {
            cartona += `<tr>
            <td>`+i+`</td>
            <td>`+productsList[i].name+`</td>
            <td>`+productsList[i].price+`</td>
            <td>`+productsList[i].category+`</td>
            <td>`+productsList[i].desc+`</td>
            <td><button onclick ="updateProduct(`+i+`)" class='btn btn-warning'>update</button></td>
            <td><button onclick ="deleteProduct(`+i+`)" class='btn btn-danger'>delete</button></td>
            </tr>`;

            newText = productsList[i].name.replace(term , `<span style="color:red">`+term+`</span>` )
            cartona2 += `<p>`+newTxt+`</p>`

        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
    document.getElementById("searchResults").innerHTML = cartona2;
}


    function deleteProduct(index)
    {
        productsList.splice(index , 1);
        localStorage.setItem("myproducts" , JSON.stringify(productsList)); 
        displayProducts();
    }

    function updateProduct(index)
    {
        currentIndex = index ;

        productNameInp.value = productsList[index].name;
        productPriceInp.value = productsList[index].price;
        productCategoryInp.value = productsList[index].category;
        productDescInp.value = productsList[index].desc;

        addBtn.innerHTML = "Update" ;

    }


