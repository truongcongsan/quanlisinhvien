const $ = document.querySelector.bind(document);

// Khai báo biến
const form = $("form");
const code = $("input[name='code']");
const fullName = $("input[name='name']");
const email = $("input[name='email']");
const address = $("input[name='address']");

const errorCode = $("#error-code");
const errorName = $("#error-name");
const errorEmail = $("#error-email");
const errorAddress = $("#error-address");
const errorGender = $("#error-gender");

let isValid = false;

// Dữ liệu sinh viên tĩnh
let studentList = [
  {
    codeValue: "001",
    nameValue: "Trịnh Nam Trường",
    emailValue: "xinloiigg@gmail.com",
    addresssValue: "Ninh Bình",
    gender: "Nam",
  },
  {
    codeValue: "002",
    nameValue: "Trịnh Quốc Khánh",
    emailValue: "khanhkhi@gmail.com",
    addresssValue: "Ninh Bình",
    gender: "Nam",
  },
  {
    codeValue: "003",
    nameValue: "Trịnh Bảo Ngọc",
    emailValue: "baongoc@gmail.com",
    addresssValue: "Ninh Bình",
    gender: "Nữ",
  },
];

// Hiển thị danh sách sinh viên
const render = () => {
  const data = studentList.map((student, index) => {
    return `
      <tr>
      <td>${index}</td>
      <td>${student.codeValue}</td>
      <td>${student.nameValue}</td>
      <td>${student.emailValue}</td>
      <td>${student.addresssValue}</td>
      <td>${student.gender}</td>
      <td><button id="btnDelete" class="${index}" onclick="deleteF()">Xóa</button></td>
      <td><button id="btnEdit">Sửa</button></td>
      </tr>
    `;
  });
  $("#data").innerHTML = data.join("");
};
render();
// Validate
const validateInputs = () => {
  isValid = true;
  if (!code.value) {
    code.classList.add("invalid");
    errorCode.classList.remove("hidden");
    isValid = false;
  }
  if (!fullName.value) {
    fullName.classList.add("invalid");
    errorName.classList.remove("hidden");
    isValid = false;
  }
  if (!email.value) {
    email.classList.add("invalid");
    errorEmail.classList.remove("hidden");
    isValid = false;
  }
  if (!address.value) {
    address.classList.add("invalid");
    errorAddress.classList.remove("hidden");
    isValid = false;
  }
  if (!$("#male").checked && !$("#famale").checked) {
    $("#male").classList.add("invalid");
    $("#famale").classList.add("invalid");
    errorGender.classList.remove("hidden");
    isValid = false;
  }
};

// Kiểm tra xem msv có bị trùng hay không
const codeRepaet = () => {
  for (let i = 0; i < studentList.length; i++) {
    if (code.value === studentList[i].codeValue) {
      isValid = false;
      alert("Trùng mã sv!");
    }
  }
};

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  codeRepaet();
  if (isValid) {
    const codeValue = code.value;
    const nameValue = fullName.value;
    const emailValue = email.value;
    const addresssValue = address.value;
    let gender = "";
    if ($("#male").checked) {
      gender = $("#male").value;
    } else if ($("#famale").checked) {
      gender = $("#famale").value;
    }

    // Thêm mới thông tin một sinh viên
    studentList.push({
      codeValue,
      nameValue,
      emailValue,
      addresssValue,
      gender,
    });
    // Hiển thị danh sách sinh viên sau khi thêm mới
    render();
    alert("Thêm thành công!");
  }
});

// Reset input
const inputReset = (ip, er) => {
  ip.addEventListener("input", () => {
    ip.classList.remove("invalid");
    er.classList.add("hidden");
  });
};
inputReset(code, errorCode);
inputReset(fullName, errorName);
inputReset(email, errorEmail);
inputReset(address, errorAddress);

// Nút reset form
const formReset = (ip, er) => {
  ip.classList.remove("invalid");
  er.classList.add("hidden");
};
form.addEventListener("reset", () => {
  formReset(code, errorCode);
  formReset(fullName, errorName);
  formReset(email, errorEmail);
  formReset(address, errorAddress);
  errorGender.classList.add("hidden");
});

// Btn xóa thông tin sinh viên
function deleteF() {
  if (confirm("Bạn có muốn xóa thông tin sinh viên này không?")) {
    studentList.splice(studentList[$("#btnDelete").className], 1);
    render();
    alert("Xóa thành công!");
  }
}
