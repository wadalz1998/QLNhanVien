function getEle(id) {
  return document.getElementById(id);
}
const dsnv = new danhSachNhanVien();
function showThongTinNhanVien() {
  const _taiKhoan = getEle("tknv").value;
  const _hoVaTen = getEle("name").value;
  const _email = getEle("email").value;
  const _passWord = getEle("password").value;
  const _ngayLam = getEle("datepicker").value;
  const _luongCoBan = getEle("luongCB").value;
  const chucVu = getEle("chucvu");
  if (chucVu) {
  }
  const _tongLuong = _luongCoBan;
  const _chucVu = getEle("chucvu").value;
  const _gioLam = getEle("gioLam").value;
  const _xepLoai = "tot";
  const nv = new NhanVien(
    _taiKhoan,
    _hoVaTen,
    _email,
    _ngayLam,
    _chucVu,
    _xepLoai,
    _tongLuong,
    _gioLam,
    _passWord
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
  getEle("datepicker").value = nv.ngayLam;
}

function handleThemNV() {
  const nv = showThongTinNhanVien();
  dsnv.themNV(nv);
  //   console.log(dsnv);
  renderUI(dsnv.array);

  setLocalStorage();
}

function viTri(id) {
  // tìm vị trí;
  var index = -1;
  for (var i = 0; i < dsnv.array.length; i++) {
    const nv = dsnv.array[i];
    if (nv.taiKhoan === id) {
      index = i;
      break;
    }
  }
  return index;
}
function handleDelete(id) {
  const index = viTri(id);
  if (index !== -1) {
    // array.splice(vitri,so luong can xoa)
    console.log(index);
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
  getEle("luongCB").value = nv.luongCB;
  getEle("chucvu").text = nv.chucvu;
  getEle("gioLam").value = nv.gioLam;
}
function handleUpdateNV() {
  const nv = showThongTinNhanVien();
  const index= layThongTinNVTheoTK(nv.taiKhoan);
  dsnv.themNV(nv);



  renderUI(dsnv.array);
  setLocalStorage();
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
