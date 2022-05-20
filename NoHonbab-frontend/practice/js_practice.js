/*var info = {
  index: 0,
  latitude: 37.5,
  longitude: 126.9,
  gender: "F",
  pet: true,
  ages: 30,
  mbti: "ENTJ",
  walk_purpose: "exercise",
  walk_time: "daytime",
  walk_prefer_place: "park",
};
var info_json = JSON.stringify(info);
console.log(info_json);

var dummy1 = {
  index: 1,
  latitude: 37.5038429649,
  longitude: 126.8980226771,
  gender: "M",
  pet: true,
  ages: 20,
  mbti: "INFJ",
  walk_purpose: "walk",
  walk_time: "morning",
  walk_prefer_place: "alley",
};
var dummy_json = JSON.stringify(dummy1);

function JSON_is_male(obj) {
  //console.log(obj.gender);
  if (obj[gender] === "M") {
    console.log(obj);
  } else {
    console.log("남자 아님");
  }
}
JSON_is_male(info_json);
JSON_is_male(dummy_json);
console.log(dummy1.gender);
console.log(dummy_json);
console.log(obj[gender]);

//var info_obj = JSON.parse(info_json);
//console.log(info_obj);
var my_d = {
  name: "aaa",
  age: 12,
  gender: "M",
};

function scoring(obj) {
  obj["socre"] = 0;
}
scoring(my_d);
console.log(my_d);

var d = [
  {
    name: "qqq",
    age: 12,
    gender: "M",
  },
  {
    name: "www",
    age: 44,
    gender: "F",
  },
];

for (let i = 0; i < d.length; i++) {
  console.log(`comparing ${my_d.name} and ${d[i].name}`);
  if (my_d["name"] === d[i]["name"]) console.log("name is same");
  if (my_d["age"] === d[i]["age"]) console.log("age is same");
  if (my_d["gender"] === d[i]["gender"]) console.log("gender is same");
  console.log();
}*/

var o = { asd: 1, qwe: 2 };
console.log(o["rrr"]);
if (o["rrr"]) console.log("2222");
console.log(7 % 4);
