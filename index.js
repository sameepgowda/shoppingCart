window.addEventListener("DOMContentLoaded",()=>{
    getCartItems();
})

function handleFormSubmit(event) {
    event.preventDefault();
    const sellingPrice = document.querySelector("#sellingPrice").value ;
    const productName = document.querySelector("#productName").value ;
    const category = document.querySelector("#category").value ;
    const cartData = {
        sellingPrice,productName,category
    } 
    axios.post("https://crudcrud.com/api/211ec396e3d24235898b2018a0b81ff5/shoppingCart",
        cartData).then(()=>{
            getCartItems();
            console.log("post successful")
        }).catch((err)=>console.log(err))
}


function getCartItems(){
axios.get("https://crudcrud.com/api/211ec396e3d24235898b2018a0b81ff5/shoppingCart").then((val)=>{
            console.log("get successful");
            
            
            
            displayCartItems(val.data);
        }).catch((err)=>console.log(err))
}

function displayCartItems(data){
    document.querySelector("#ul1").innerHTML = "";
document.querySelector("#ul2").innerHTML = "";
document.querySelector("#ul3").innerHTML = "";
    for(let product of data){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(
            `${product.sellingPrice} - ${product.category} - ${product.productName}`
        ))
        let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete Order"));
        deleteBtn.addEventListener("click", function (event) {
        axios.delete(
            `https://crudcrud.com/api/211ec396e3d24235898b2018a0b81ff5/shoppingCart/${product._id}`
        ).then(()=>{console.log("Delete successful");
            getCartItems();
        })
    })
        li.appendChild(deleteBtn)
        if(product.category=="Electronics"){
            let ul1 = document.querySelector("#ul1");
            ul1.appendChild(li)
        }else if(product.category=="Food"){
            let ul2 = document.querySelector("#ul2");
            ul2.appendChild(li)
        }else if(product.category=="SkinCare"){
            let ul3 = document.querySelector("#ul3");
            ul3.appendChild(li)
        }
    }
}