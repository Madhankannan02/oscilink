const str = "C:\\Users\\madha\\AppData\\Local\\Temp\\sketch_1780810169726_3e04cin\\sketch_1780810169726_3e04cin.ino:8:3: error: expected ';' before 'digitalWrite'";
const regex = /^(.*):(\d+):(\d+):\s*(error|warning|fatal error):\s*(.*)$/i;

const match = str.match(regex);
console.log("Match:", match);
