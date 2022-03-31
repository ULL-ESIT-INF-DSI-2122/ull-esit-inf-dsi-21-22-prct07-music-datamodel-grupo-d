type tipos = {
  name: string,
  value: number
}

const tmp: tipos[] = [{name: "1", value: 1}, {name: "2", value: 2}, {name: "3", value: 3}];

const pos = tmp.indexOf({name: "1", value: 1});
console.log(pos);
pos > 0 ? tmp.splice(pos, 1): "";
console.log(tmp);
