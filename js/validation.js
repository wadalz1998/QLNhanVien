function Validation() {
  this.kiemTraDoDai = function (value, min, max, spanID, mess) {
    // trim  xóa space trc và sau
    if (value.trim().length >= min && value.trim().length <= max) {
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).innerHTML = mess;
    return true;
  };
  this.kiemTraRong = function (value, spanID, mess) {
    if (value === "") {
      getEle(spanID).innerHTML = mess;
      getEle(spanID).style.display = "block";
      return false;
    } else {
      getEle(spanID).innerHTML = "";
      return true;
    }
  };
  this.kiemTraTonTaiMaTK = function (value, data, spanID, mess) {
    for (var i = 0; i < data.length; i++) {
      const kiemTra = data[i];
      if (kiemTra.taiKhoan === value) {
        getEle(spanID).innerHTML = mess;
        getEle(spanID).style.display = "block";
        return false;
      }
      getEle(spanID).innerHTML = "";
      return true;
    }
  };
  this.kiemTraChu = function (value, spanID, mess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };
  this.kiemTraEmail = function (value, spanID, mess) {
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (value.match(email)) {
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };
  this.kiemTraPassWord = function (value, spanID, mess) {
    const passWord =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(passWord)) {
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };
  this.kiemTraDate = function (value, spanID, mess) {
    const date = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (value.match(date)) {
      getEle(spanID).innerHTML = "";
      return true;
    }
    getEle(spanID).style.display = "block";
    getEle(spanID).innerHTML = mess;
    return false;
  };
  this.kiemTraSelected = function (spanID, mess) {
    if (document.getElementById("chucvu").selectedIndex === 0) {
      getEle(spanID).innerHTML = mess;
      getEle(spanID).style.display = "block";
      return false;
    }
    getEle(spanID).innerHTML = "";
    return true;
  };
}
