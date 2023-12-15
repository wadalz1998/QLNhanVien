function NhanVien(
  _taiKhoan,
  _hoVaTen,
  _email,
  _ngayLam,
  _chucVu,
  _xepLoai,
  _tongLuong,
  _passWord,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoVaTen = _hoVaTen;
  this.email = _email;
  this.ngayLam = _ngayLam;
  this.chucVu = _chucVu;
  this.xepLoai = _xepLoai;
  this.tongLuong = _tongLuong;
  this.passWord = _passWord;
  this.gioLam = _gioLam;
}

function danhSachNhanVien() {
  this.array = [];
  this.themNV = function (nv) {
    this.array.push(nv);
  };
  this.suaNV = function () {};
  this.xoaNV = function (id) {
    const index = viTri(id);
    if (index !== -1) {
      // array.splice(vitri,so luong can xoa)
      this.array.splice(index, 1);
    }
  };
  this.timKiemNV = function () {};
}

