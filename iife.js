let obj = {
  name: "rishi",
  age:19,
  email: "ysuryansh@gmail.com",
  address:{
    city: "Bhopal",
  },
};

let obj2 = JSON.parse(JSON.stringify(obj));

obj2.address.city = "Indore";

console.log(obj2);