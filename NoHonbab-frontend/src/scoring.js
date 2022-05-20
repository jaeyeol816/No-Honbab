//import { all_mbti } from "./mbti_compatibility.js";
let all_mbti = {
  ENTJ: [
    "ISFP",
    "INFP",
    "ESFP",
    "ESTP",
    "ISTP",
    "INTP",
    "ENFP",
    "INFJ",
    "INTJ",
    "ENFJ",
    "ISTJ",
    "ENTP",
    "ESTJ",
    "ENTJ",
    "ESFJ",
    "ISFJ",
  ],
  ENTP: [
    "ISFJ",
    "ISTJ",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "INFJ",
    "INTJ",
    "INFP",
    "ENFJ",
    "INTP",
    "ISTP",
    "ENFP",
    "ESTP",
    "ENTJ",
    "ESFP",
    "ISFP ",
  ],
  INTJ: [
    "ESFP",
    "ESTP",
    "ISFP",
    "INFP",
    "INFJ",
    "ENFP",
    "ENTP",
    "ISTP",
    "ENFJ",
    "INTJ",
    "ISTJ",
    "ENTJ",
    "INTP",
    "ESTJ",
    "ISFJ",
    "ESFJ",
  ],
  INTP: [
    "ESFJ",
    "ENFJ",
    "ISFJ",
    "INFJ",
    "ESTJ",
    "ISTJ",
    "ENTJ",
    "ENFP",
    "ENTP",
    "INTP",
    "INTJ",
    "ISTP",
    "INFP",
    "ESTP",
    "ISFP",
    "ESFP",
  ],
  ESTJ: [
    "INFP",
    "ISFP",
    "INTP",
    "ENTP",
    "ISTP",
    "ESFP",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "INTJ",
    "ENTJ",
    "ESTP",
    "ENFJ",
    "INFJ",
  ],
  ESFJ: [
    "INTP",
    "ISTP",
    "ENTP",
    "ENFP",
    "INFP",
    "ISTJ",
    "ESFJ",
    "ESTP",
    "ISFP",
    "ENFJ",
    "ISFJ",
    "INFJ",
    "ESTJ",
    "ESFP",
    "ENTJ",
    "INTJ",
  ],
  ISTJ: [
    "ENFP",
    "ENTP",
    "ISFP",
    "INFP",
    "ESTP",
    "ESFP",
    "INTP",
    "ESTJ",
    "ESFJ",
    "ISTJ",
    "INTJ",
    "ISFJ",
    "ISTP",
    "ENTJ",
    "INFJ",
    "ENFJ",
  ],
  ISFJ: [
    "ENTP",
    "ENFP",
    "INTP",
    "ISTP",
    "ESFP",
    "ESTP",
    "ESTJ",
    "INFP",
    "ESFJ",
    "ISTJ",
    "ISFJ",
    "ENFJ",
    "INFJ",
    "ISFP",
    "INTJ",
    "ENTJ",
  ],
  ENFJ: [
    "ISTP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFJ",
    "INFP",
    "ISFP",
    "ENTP",
    "INTJ",
    "ESFJ",
    "INFJ",
    "ENFP",
    "ENTJ",
    "ISFJ",
    "ESTJ",
    "ISTJ",
  ],
  ENFP: [
    "ISTJ",
    "ISFJ",
    "ESFJ",
    "ESTJ",
    "INFJ",
    "INTJ",
    "ENTJ",
    "ISFP",
    "ENFP",
    "INTP",
    "INFP",
    "ENFJ",
    "ENTP",
    "ESFP",
    "ESTP",
    "ISTP",
  ],
  INFJ: [
    "ESTP",
    "ESFP",
    "ISTP",
    "INTP",
    "ENFP",
    "ENTP",
    "INTJ",
    "ENTJ",
    "INFJ",
    "ISFP",
    "ENFJ",
    "ESFJ",
    "ISFJ",
    "INFP",
    "ISTJ",
    "ESTJ",
  ],
  INFP: [
    "ESTJ",
    "ENTJ",
    "INTJ",
    "ISTJ",
    "ENFJ",
    "ESFJ",
    "ENTP",
    "INFP",
    "ISFJ",
    "INTP",
    "ESFP",
    "ENFP",
    "ISFP",
    "INFJ",
    "ISTP",
    "ESTP",
  ],
  ESTP: [
    "INFJ",
    "INTJ",
    "ENFJ",
    "ENTJ",
    "ISFJ",
    "ISTP",
    "ISTJ",
    "ESFJ",
    "ESTP",
    "ISFP",
    "ESFP",
    "INTP",
    "ENTP",
    "ESTJ",
    "ENFP",
    "INFP",
  ],
  ESFP: [
    "INTJ",
    "INFJ",
    "ENTJ",
    "ENFJ",
    "ESTJ",
    "ISTJ",
    "ISFJ",
    "ISFP",
    "ISTP",
    "INFP",
    "ESFP",
    "ESTP",
    "ESFJ",
    "ENFP",
    "ENTP",
    "INTP",
  ],
  ISTP: [
    "ENFJ",
    "ESFJ",
    "INFJ",
    "ISFJ",
    "ENTJ",
    "ESTJ",
    "ESFP",
    "ESTP",
    "INTJ",
    "ISTP",
    "INTP",
    "ENTP",
    "ISTJ",
    "ISFP",
    "INFP",
    "ENFP",
  ],
  ISFP: [
    "ENTJ",
    "ESTJ",
    "INTJ",
    "ISTJ",
    "ENFJ",
    "ESFJ",
    "INFJ",
    "ESFP",
    "ISFP",
    "ESTP",
    "ENFP",
    "INFP",
    "ISTP",
    "ISFJ",
    "INTP",
    "ENTP",
  ],
};
function scoring(obj, dummy_obj) {
  function locationScore(latitude, longitude, dummy_latitude, dummy_longitude) {
    let seoul_max = 36.78;

    /*  Latitude: 1 deg = 110.574 km
        Longitude: 1 deg = 111.320*cos(latitude) km  */

    let y = (latitude - dummy_latitude) * 110.574;
    let x =
      (longitude - dummy_longitude) *
      111.32 *
      Math.cos(longitude - dummy_longitude);
    let dist = Math.sqrt(x * x + y * y);
    return 35 * (dist / seoul_max);
  }
  function genderScore(gender, dummy_gender) {
    // 성별 상관 없다고 하면 score 6.66
    if (gender == "any") return 20 / 3.0;
    else return gender == dummy_gender ? 10 : 0;
  }
  function petScore(pet, dummy_pet) {
    return Boolean(pet) == dummy_pet ? 5 : 0;
  }
  function agesScore(ages, dummy_ages) {
    let diff = Math.abs(ages - dummy_ages);
    if (diff <= 3) return 10;
    else if (diff <= 7) return 6;
    else if (diff <= 10) return 2;
    else return 0;
  }
  function mbtiScore(mbti, dummy_mbti, walk_purpose_obj) {
    //let percent = walk_purpose_obj.indexOf("friendship") != -1 ? 10 : 5; // 소통 목적이면 score 2배
    let percent = walk_purpose_obj["friendship"] ? 10 : 5; // 소통 목적이면 score 2배
    let compatibility = all_mbti[mbti];
    for (let i = 0; i < 16; i++) {
      if (compatibility[i] == dummy_mbti) return percent * ((15 - i) / 15.0);
    }
  }
  function purposeScore(walk_purpose_obj, dummy_walk_purpose) {
    // 중복 가능, walk_purpose 는 Object.
    // ex) walk_purpose = {"exercise":true, "walk":false, "friendship":true}
    let percent = 0;
    if (walk_purpose_obj["friendship"]) percent = 10;
    if (walk_purpose_obj[dummy_walk_purpose]) percent = 15;
    return percent;
  }
  function timeScore(walk_time_obj, dummy_walk_time) {
    // 중복 가능, walk_time 은 Object.
    // ex) walk_time = {"morning":false, "daytime":true}
    let day_cycle = ["dawn", "morning", "daytime", "night"];
    let dummy_walk_time_idx = day_cycle.indexOf(dummy_walk_time);
    if (walk_time_obj[dummy_walk_time]) return 15;
    else if (
      // 일치하진 않아도 인접한 시간대면 5 반환
      walk_time_obj[(dummy_walk_time_idx + 3) % 4] ||
      walk_time_obj[(dummy_walk_time_idx + 1) % 4]
    )
      return 5;
    else return 0;
  }
  function placeScore(walk_prefer_place_obj, dummy_walk_prefer_place) {
    if (walk_prefer_place_obj[dummy_walk_prefer_place]) return 5;
    else return 0;
  }
  let score = 0.0;
  score += locationScore(
    obj.latitude,
    obj.longitude,
    dummy_obj.latitude,
    dummy_obj.longitude
  );
  score += genderScore(obj.gender, dummy_obj.gender);
  score += petScore(obj.pet, dummy_obj.pet);
  score += agesScore(obj.ages, dummy_obj.ages);
  score += mbtiScore(obj.mbti, dummy_obj.mbti, obj.walk_purpose);
  score += purposeScore(obj.walk_purpose, dummy_obj.walk_purpose);
  score += timeScore(obj.walk_time, dummy_obj.walk_time);
  score += placeScore(obj.walk_prefer_place, dummy_obj.walk_prefer_place);
  dummy_obj["score"] = score;
}

var info = {
  index: 0,
  latitude: 37.5,
  longitude: 126.9,
  gender: "F",
  pet: true,
  ages: 30,
  mbti: "ENTJ",
  walk_purpose: { exercise: true },
  walk_time: "daytime",
  walk_prefer_place: "park",
};

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
