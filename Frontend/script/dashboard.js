document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutbutton");

    const confirmdiv = document.getElementById('logout_confimdiv')
    confirmdiv.style.display = 'none'

    logoutButton.addEventListener("click", function(e) {
        e.preventDefault()
        console.log("button hits...")
        confirmdiv.style.display = 'block'
        confirmdiv.style.position= "fixed"
        confirmdiv.style.top = "100px";
        confirmdiv.style.left = "77%";
        confirmdiv.style.height = "200px"
        confirmdiv.style.backgroundColor ='whitesmoke'
        confirmdiv.style.color ='black'


        const confirmlogoutbutton = document.getElementById('confirm_logout')
        confirmlogoutbutton.addEventListener('click',function(){
            fetch("http://localhost:8080/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            }
        })
        .then(response => {
            if (response.message ="Logout successful" ) {
                alert("Logout successful");
                window.location.href = "index.html";
            } else {
                alert("Logout failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Logout failed. Please try again.");
        });

        })


        
    });


    const cancel_logout = document.getElementById('cancel')
    cancel_logout.addEventListener('click', function(){
        confirmdiv.style.display = 'none'
    })
});

  const showcategory = document.getElementById("showcategory");
  const adminwelcome = document.getElementById("adminwelcome");
  const appendCategory = document.getElementById("append_Category");
  appendCategory.style.display = "none";

  const token = localStorage.getItem("digitoken");
 console.log(token);

  const fetchcategory = async function () {
    console.log("button clicked....");
    adminwelcome.style.display = "none";
    appendCategory.style.display = "block";

    const categoryTable = document.getElementById("category_table");
    const tbody = categoryTable.getElementsByTagName("tbody")[0];

   

    try {
      const response = await fetch("http://localhost:8080/category/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch categories");
        console.log(response);
      }

      const data = await response.json();
      const categories = data.category;
      console.log("data", categories);

      tbody.innerHTML = "";

      categories.forEach((category) => {
        const statusText = category.status ? "active" : "inactive";
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${category.id}</td>
                  <td>${category.name}</td>
                  <td>${category.description}</td>
                  <td>${statusText}</td>

                  <td><button class="update-button"><i class="fa fa-pen"></i></button></td>
                  <td><button class="delete-button"><i class="fa fa-trash"></i></button></td>
 
              `;
        tbody.appendChild(row);

        const updateButton = row.querySelector(".update-button");
        const deleteButton = row.querySelector(".delete-button");

        updateButton.addEventListener("click", function () {

          const cate_id = category._id

          console.log("Update button clicked for category:", cate_id);

          const update_category_form =  document.getElementById('update_category_form')
          update_category_form.style.display = 'block'

          document.getElementById("update_category_form").addEventListener("submit", async function(event) {
          event.preventDefault();

        const id = document.getElementById("update_category_id").value;
        const name = document.getElementById("update_category_name").value;
        const description = document.getElementById("update_category_description").value;
        const status = document.getElementById("category_status2").value;

        console.log("status",status)

    const formData = {id,name, description,status};

    console.log("fromdata",formData)

    try {
      const response = await fetch(`/update/${cate_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization:token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        console.log("Category updated:", updatedCategory);
        update_category_form.display.style = 'none'
        fetchcategory()
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error(error);
    }
  });

          

          
        });

        deleteButton.addEventListener("click", async function () {
          const id = category._id;
          console.log(id);
          try {
            const response = await fetch(
              `http://localhost:8080/category/delete/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete category");
            }

            const data = await response.json();
            console.log(data.message);

            fetchcategory();
          } catch (error) {
            console.error("Error:", error.message);
          }
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  showcategory.addEventListener("click", fetchcategory);

  const add_newcategory = document.getElementById("add_newcategory");
  console.log("button clicked for add new");
  add_newcategory.addEventListener("click", function () {
    const add_category_form = document.getElementById("add_category_form");
    add_category_form.style.display = "block";
  });

  const newadd_categoryform = document.getElementById("add_category_form");
  newadd_categoryform.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("category_id").value;
    const name = document.getElementById("category_name").value;
    const description = document.getElementById(
      "category_description"
    ).value;
    const status = document.getElementById("category_status").value;

    if (
      id === "" ||
      name === "" ||
      description === "" ||
      status === ""
    ) {
      alert("Please fill the all things about category");
    } else {
      payload = {
        id,
        name,
        description,
        status,
      };

       console.log("payload",payload)
    
        fetch("http://localhost:8080/category/addnew", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization : token
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log("data", data.message);

            if (data.message === "Category already exists") {
                alert(data.message);
            } else if (data.message === "New Category Added successfully") {
                alert("Category Added Succesfully !");
                 fetchcategory();
                
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
  });



  const cancel_add_new = document.getElementById('cancel_add_new').addEventListener('click',function(){
    console.log("buttom  clilc by harhsal")
    newadd_categoryform.style.display = 'none'
    
  })
  const showhome = document
    .getElementById("showhome")
    .addEventListener("click", function() {
      adminwelcome.style.display = "block";
      appendCategory.style.display = "none";

    });


    const searchForm = document.getElementById("search_by_cate_name");

searchForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const token = localStorage.getItem("digitoken");
  console.log("token", token);

  const categoryName = document.getElementById("search_by_name").value;
  console.log("search value", categoryName);

  try {
    const response = await fetch(`http://localhost:8080/category/search?name=${encodeURIComponent(categoryName)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token 
      }
    });


    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    console.log(categories);
   
   displayCategories(categories);
  } catch (error) {
    console.error(error);
  }
});

function displayCategories(categories) {
  

  const categoryTable = document.getElementById("category_table");
    const tbody = categoryTable.getElementsByTagName("tbody")[0];
    tbody.innerHTML= ""

  categories.forEach(category => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = category.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = category.name;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = category.description;

    const statusCell = document.createElement("td");
    statusCell.textContent = category.status === "1" ? "Active" : "Inactive";

    const updateCell = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.classList.add("update-button");
    const updateIcon = document.createElement("i");
    updateIcon.classList.add("fas", "fa-edit"); 
    updateButton.appendChild(updateIcon);
    updateCell.appendChild(updateButton);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt"); 

    deleteButton.appendChild(deleteIcon);
    deleteCell.appendChild(deleteButton);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(statusCell);
    row.appendChild(updateButton);
    row.appendChild(deleteButton)

    tbody.appendChild(row);
  });
}



const showproduct =  document.getElementById('showproduct')

const showproduct_container =  document.getElementById('show_product_container')
showproduct.addEventListener('click',function(){

    console.log('showproduct button click')

    appendCategory.style.display = "none";
    showproduct_container.style.display = "block";
    adminwelcome.style.display = "none";

    

    async function getAllProducts() {
        try {
          const response = await fetch('http://localhost:8080/product/getallproduct', {
            headers: {
              Authorization: token
            }
          });
          const data = await response.json();
          if (response.ok) {
            return data.data;
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.error('Error fetching products:', error.message);
        }
      }
      
      getAllProducts()
        .then(products => {
          console.log(products);
          ProductTable(products)
          
        })
        .catch(error => {
          console.error('Error:', error.message);
        });

})

function ProductTable(products) {
    const tableBody = document.getElementById('product_table_body');
    tableBody.innerHTML = '';

    const productstatusText = products.status ? "active" : "inactive";
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.packageSize}</td>
            <td>${product.mrp}</td>
            <td><img src="${product.image}" alt="Avatar" class="avatar"></td>
            <td>${productstatusText}</td>
            <td><button class="update-product-button"><i class="fa fa-pen"></i></button></td>
            <td><button class="delete-product-button"><i class="fa fa-trash"></i></button></td>
        `;
        tableBody.appendChild(row);

         // Add event listener for update button
        row.querySelector('.update-product-button').addEventListener('click', () => {
            console.log('Update button clicked for product:', product._id);
        });

        // Add event listener for delete button
        row.querySelector('.delete-product-button').addEventListener('click', () => {
            const deleteButton = row.querySelector('.delete-product-button');

            
            deleteButton.addEventListener('click', async () => {
                try {
                    const productId = product._id; 
                    const response = await fetch(`http://localhost:8080/product/delete/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                             Authorization : token
                        }
                    });
        
                    if (response.ok) {
                        const data = await response.json();

                        console.log(data)
                        console.log(data.message); 
                        getAllProducts()
                        
                    } else {
                        console.error('Failed to delete product');
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            });
        });


        
    });

    
}



       


