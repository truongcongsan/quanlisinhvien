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
const studentList = [
  {
    codeValue: "001",
    nameValue: "Trịnh Nam Trường",
    emailValue: "xinloiigg@gmail.com",
    addressValue: "Ninh Bình",
    gender: "Nam",
  },
  {
    codeValue: "002",
    nameValue: "Trịnh Quốc Khánh",
    emailValue: "khanhkhi@gmail.com",
    addressValue: "Hải Phòng",
    gender: "Nam",
  },
  {
    codeValue: "003",
    nameValue: "Trịnh Bảo Ngọc",
    emailValue: "baongoc@gmail.com",
    addressValue: "Hà Nội",
    gender: "Nữ",
  },
  {
    codeValue: "004",
    nameValue: "Vừ A Dính",
    emailValue: "vuadinh@gmail.com",
    addressValue: "Lai Châu",
    gender: "Nam",
  },
];

// Hiển thị danh sách sinh viên
const render = () => {
  const data = studentList.map((student, index) => {
    return `
      <tr id="row${index}">
        <td>${index + 1}</td>
        <td>${student.codeValue}</td>
        <td id="name${index}">${student.nameValue}</td>
        <td id="email${index}">${student.emailValue}</td>
        <td id="address${index}">${student.addressValue}</td>
        <td id="gender${index}">${student.gender}</td>
        <td><button class="btnDelete" onclick="deleteFunc(${index})">Xóa</button></td>
        <td>
          <button class="btnEdit" id="btnEdit${index}" onclick="editFunc(${index})">Sửa</button>
          <button class="btnSave" id="btnSave${index}" onclick="saveFunc(${index})">Lưu</button>
        </td>
      </tr>
    `;
  });
  $("#data").innerHTML = data.join("");
};
render();

// Validate Email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
    $(".validate-email").innerHTML = "Email không được bỏ trống!";
    errorEmail.classList.remove("hidden");
    isValid = false;
  }
  if (!validateEmail(email.value) && email.value) {
    email.classList.add("invalid");
    $(".validate-email").innerHTML = "Nhập sai định dạng email!";
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
    const addressValue = address.value;
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
      addressValue,
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
function deleteFunc(index) {
  if (confirm("Bạn có muốn xóa thông tin sinh viên này không?")) {
    studentList.splice(index, 1);
    render();
  }
}

// Btn sửa thông tin sản phẩm
function editFunc(index) {
  $("#btnEdit" + index).style.display = "none";
  $("#btnSave" + index).style.display = "block";

  //Tạo ra input để chỉnh sửa thông tin
  $("#name" + index).innerHTML =
    "<input type='text' class='ip-edit' id='name-txt" +
    index +
    "' value='" +
    studentList[index].nameValue +
    "'>";
  $("#email" + index).innerHTML =
    "<input type='text' class='ip-edit' id='email-txt" +
    index +
    "' value='" +
    studentList[index].emailValue +
    "'>";
  $("#address" + index).innerHTML =
    "<input type='text' class='ip-edit' id='address-txt" +
    index +
    "' value='" +
    studentList[index].addressValue +
    "'>";
  $("#gender" + index).innerHTML =
    "<select value='" +
    studentList[index].gender +
    "' id='gender-txt" +
    index +
    "'><option>Nam</option><option>Nữ</option></select>";
}

// Btn lưu thông tin sản phẩm vừa sửa
function saveFunc(index) {
  $("#btnSave" + index).style.display = "none";
  $("#btnEdit" + index).style.display = "block";

  // Lấy giá trị của input và gán cho biến mới
  var nameValueNew = $("#name-txt" + index).value;
  var emailValueNew = $("#email-txt" + index).value;
  var addressValueNew = $("#address-txt" + index).value;
  var genderValueNew = $("#gender-txt" + index).value;

  // Gán giá trị mới vào mảng
  studentList[index].nameValue = nameValueNew;
  studentList[index].emailValue = emailValueNew;
  studentList[index].addressValue = addressValueNew;
  studentList[index].gender = genderValueNew;

  // In giá trị vừa lưu vào mảng ra
  $("#name" + index).innerHTML = studentList[index].nameValue;
  $("#email" + index).innerHTML = studentList[index].emailValue;
  $("#address" + index).innerHTML = studentList[index].addressValue;
  $("#gender" + index).innerHTML = studentList[index].gender;
}

// Btn tìm kiếm
function searchInfor() {
  // Tạo biến lưu giá trị người dùng nhập vào thanh tìm kiếm
  const searchInput = $(".search").value;
  // Tạo biến lưu giá trị select người dùng chọn
  const searchSelect = $("#search-select").value;
  // Tạo mảng rỗng
  const arr = [];

  // Nếu người dùng chọn giá trị select là "Mã"
  if (searchSelect === "Mã") {
    // Chạy vòng for từ 0 đến độ dài của mảng studentList
    for (let i = 0; i < studentList.length; i++) {
      // Nếu giá trị "Mã" của mảng khác giá trị người dùng nhập vào
      if (studentList[i].codeValue !== searchInput) {
        //Thêm phần tử i thỏa mãn điều kiện trên vào mảng
        arr.push(i);
        // Chạy vòng for từ 0 đến độ dài của mảng arr ở trên
        for (let j = 0; j < arr.length; j++) {
          // Ẩn các row có id tương ứng
          $("#row" + arr[j]).style.display = "none";
        }
      }
    }
  }
  if (searchSelect === "Tên") {
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].nameValue !== searchInput) {
        arr.push(i);
        for (let j = 0; j < arr.length; j++) {
          $("#row" + arr[j]).style.display = "none";
        }
      }
    }
  }

  if (searchSelect === "Email") {
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].emailValue !== searchInput) {
        arr.push(i);
        for (let j = 0; j < arr.length; j++) {
          $("#row" + arr[j]).style.display = "none";
        }
      }
    }
  }
  if (searchSelect === "Địa chỉ") {
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].addressValue !== searchInput) {
        arr.push(i);
        for (let j = 0; j < arr.length; j++) {
          $("#row" + arr[j]).style.display = "none";
        }
      }
    }
  }
  if (searchSelect === "Giới tính") {
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].gender !== searchInput) {
        arr.push(i);
        for (let j = 0; j < arr.length; j++) {
          $("#row" + arr[j]).style.display = "none";
        }
      }
    }
  }
  // Nếu không nhập gì vào ô tìm kiếm mà vẫn submit tìm kiếm, trả về mảng ban đầu.
  if (searchInput === "") {
    render();
  }
}

//Btn ẩn hiện bảng nhập thông tin
function btnHideShow() {
  const btnToggle = $("#btn-hide-show");
  const moveToggle = $("#container-input");

  btnToggle.classList.toggle("arrow-right");
  btnToggle.classList.toggle("arrow-left");

  moveToggle.classList.toggle("move-right");
  moveToggle.classList.toggle("move-left");

  // btnToggle.to.add("arrow-right");
  // btnToggle.classList.remove("arrow-left");

  // if ((btnToggle = "arrow-right")) {
  //   btnToggle.classList.add("arrow-left");
  //   btnToggle.classList.remove("arrow-right");

  // }
}
