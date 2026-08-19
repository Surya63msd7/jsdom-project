// list
// filter

let userContainer = document.querySelector(".userContainer");
let searchInput = document.querySelector("#searchInput");

const users = [
  {
    profileUrl:
      "https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_1280.jpg",
    name: "Pankaj Tripathi",
    email: "pankajmirja@tripathi.com",
  },
  {
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLgW0m3TnEd8WIBSAej73ovDkRXGBukPkaQ&s",
    name: "Munna Bhaiya",
    email: "Munnababu@gmail.com",
  },
  {
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLgW0m3TnEd8WIBSAej73ovDkRXGBukPkaQ&s",
    name: "munna don",
    email: "munnadudu@gmail.com",
  },
  {
    profileUrl:
      "https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/80221678-0539-4495-8007-0096677e1eca/image00016.jpeg",
    name: "Guddu Bhaiya",
    email: "guddupandit@gmail.com",
  },
];

function renderUsers(arr) {
  userContainer.innerHTML = "";

  arr.map(function (obj) {
    let { profileUrl, name, email } = obj;

    let divElem = document.createElement("div");
    divElem.className = "userItem";
    divElem.innerHTML = `
            <div class="image">
                <img src=${profileUrl} alt="error loading image">
            </div>
            <div class="userDetails">
                <h3>${name}</h3>
                <p>${email}</p>
            </div>
        `;
    userContainer.append(divElem);
  });
}

renderUsers(users); // initial render

function handleSearch(e) {
  let searchValue = e.target.value;
  let filteredUsers = users.filter((obj) => {
    return (
      obj.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      obj.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  renderUsers(filteredUsers);
}

searchInput.addEventListener("input", handleSearch);
