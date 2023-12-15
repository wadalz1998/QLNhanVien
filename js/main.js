function getEle(id) {
  return document.getElementById(id);
}
const dsnv = new danhSachNhanVien();
const validation = new Validation();

function showThongTinNhanVien() {
  const _taiKhoan = getEle("tknv").value;
  const _hoVaTen = getEle("name").value;
  const _email = getEle("email").value;
  const _passWord = getEle("password").value;
  const _ngayLam = getEle("datepicker").value;
  const _luongCoBan = getEle("luongCB").value;
  // if (chucVu === "") {
  //   document.getElementById("chucvu").selectedIndex===1
  // }

  const _chucVu = getEle("chucvu").value;
  const tinhTienDuaTrenChucVu = document.getElementById("chucvu").selectedIndex;
  let _tongLuong = 0;
  if (tinhTienDuaTrenChucVu === 1) {
    _tongLuong = _luongCoBan * 3;
  } else if (tinhTienDuaTrenChucVu === 2) {
    _tongLuong = _luongCoBan * 2;
  } else _tongLuong = _luongCoBan;
  const _gioLam = getEle("gioLam").value;
  let _xepLoai = "Trung Binh";
  if (_gioLam >= 192) {
    _xepLoai = "Xuat Sac";
  } else if (_gioLam >= 176) {
    _xepLoai = "Gioi";
  } else if (_gioLam >= 160) {
    _xepLoai = "Kha";
  }

  const nv = new NhanVien(
    _taiKhoan,
    _hoVaTen,
    _email,
    _ngayLam,
    _chucVu,
    _xepLoai,
    _tongLuong,
    _gioLam,
    _passWord,
    _luongCoBan
  );
  return nv;
}
function clearThemNhanVienButton() {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("luongCB").value = "";
  getEle("gioLam").value = "";
  // getEle("datepicker").value =ngayLam;
}

function handleThemNV() {
  const nv = showThongTinNhanVien();
  var isValid = true;
  isValid &=
    validation.kiemTraRong(nv.taiKhoan, "tbTKNV", "Khong duoc de trong") &&
    validation.kiemTraDoDai(nv.taiKhoan, 4, 6, "tbTKNV", "do dai tu 4-6") &&
    validation.kiemTraTonTaiMaTK(
      nv.taiKhoan,
      dsnv.array,
      "tbTKNV",
      "TK da ton tai"
    );
  isValid &=
    validation.kiemTraRong(nv.hoVaTen, "tbTen", "Khong duoc de trong") &&
    validation.kiemTraChu(nv.hoVaTen, "tbTen", "phai la chu cai");
  isValid &=
    validation.kiemTraRong(nv.email, "tbEmail", "Khong duoc de trong") &&
    validation.kiemTraEmail(nv.passWord, "tbMatKhau", "Khong duoc de trong");
  isValid &=
    validation.kiemTraRong(nv.passWord, "tbMatKhau", "Khong duoc de trong") &&
    validation.kiemTraPassWord(
      nv.passWord,
      "tbMatKhau",
      "passWord chua du manh"
    ) &&
    validation.kiemTraDoDai(nv.passWord, 6, 10, "tbMatKhau", "Do dai 6-10");

  isValid &=
    validation.kiemTraRong(nv.ngayLam, "tbNgay", "Khong duoc de trong") &&
    validation.kiemTraDate(nv.ngayLam, "tbNgay", "Sai dinh dang mm/dd/yyyy ");
  isValid &=
    validation.kiemTraRong(nv.luongCoBan, "tbLuongCB", "Khong duoc de trong") &&
    validation.kiemTraDoDai(
      nv.luongCoBan,
      1000000,
      20000000,
      "tbLuongCB",
      "So tien tu 1m-20m"
    );
  isValid &=
    validation.kiemTraRong(nv.gioLam, "tbGiolam", "Khong duoc de trong") &&
    validation.kiemTraDoDai(
      nv.gioLam,
      80,
      200,
      "tbGiolam",
      "GIo lam tu 80-200"
    );
  isValid &= validation.kiemTraSelected("tbChucVu", "chua chon");

  if (!isValid) return;
  dsnv.themNV(nv);
  //   console.log(dsnv);
  renderUI(dsnv.array);

  setLocalStorage();
}

function viTri(maTK) {
  // tìm vị trí;
  var index = -1;
  for (var i = 0; i < dsnv.array.length; i++) {
    const nv = dsnv.array[i];
    if (nv.taiKhoan === maTK) {
      index = i;
      break;
    }
  }
  return index;
}
function handleDelete(maTK) {
  const index = viTri(maTK);
  if (index !== -1) {
    // array.splice(vitri,so luong can xoa)
    dsnv.array.splice(index, 1);
  }
  renderUI(dsnv.array);
  setLocalStorage();
}
function layThongTinNVTheoTK(id) {
  const index = viTri(id);
  if (index !== -1) {
    return dsnv.array[index];
  }
  return null;
}
function handeEdit(id) {
  const nv = layThongTinNVTheoTK(id);
  getEle("tknv").value = nv.taiKhoan;
  getEle("name").value = nv.hoVaTen;
  getEle("email").value = nv.email;
  getEle("password").value = nv.passWord;
  getEle("datepicker").value = nv.ngayLam;
  const test = (getEle("luongCB").value = nv.luongCoBan);
  // console.log(luongCoBan);
  getEle("chucvu").text = nv.chucvu;
  getEle("gioLam").value = nv.gioLam;
}
function handleUpdateNV() {
  const nv = showThongTinNhanVien();
  const index = viTri(nv.taiKhoan);
  if (index !== -1) {
    dsnv.array[index] = nv;
    console.log(dsnv.array[index].maTK);
    renderUI(dsnv.array);
    setLocalStorage();
  }
  console.log(dsnv.array);
}
function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const nv = data[i];
    content += `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoVaTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" onclick="handeEdit('${nv.taiKhoan}')">Sửa</button>
        <button class="btn btn-danger" onclick="handleDelete('${nv.taiKhoan}')">X</button>
        </td>
    </tr>`;
  }
  getEle("tableDanhSach").innerHTML = content;
}

// search
function timKiemLoaiNhanVien(keyword) {
  var mangTimKiem = [];
  const keywordLower = keyword.toLowerCase();
  for (var i = 0; i < dsnv.array.length; i++) {
    const nv = dsnv.array[i];
    const xepLoailower = nv.xepLoai.toLowerCase();
    const indexLower = xepLoailower.indexOf(keywordLower);
    if (indexLower !== -1) {
      mangTimKiem.push(nv);
    }
  }

  return mangTimKiem;
}

getEle("searchName").addEventListener("keyup", function () {
  const keyword = getEle("searchName").value;
  const resultSearch = timKiemLoaiNhanVien(keyword);
  renderUI(resultSearch);
});

// localStorage
function setLocalStorage() {
  // convert data JSON=>String
  const dataString = JSON.stringify(dsnv.array);
  // lưu
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  const dataString = localStorage.getItem("DSNV");
  if (!dataString) return;
  //   convert dataJSON
  const dataJSON = JSON.parse(dataString);
  //   phục hồi array
  dsnv.array = dataJSON;
  renderUI(dsnv.array);
}
getLocalStorage();
