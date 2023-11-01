import Swal from "sweetalert2";

export function useNotify() {
  function positive(msg) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      width: "80%",
      color: "#67E8F9",
    });
  }
  function negative(msg) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      width: "80%",
      color: "#C43D27",
    });
  }
  function positiveConfirm(msg) {
    Swal.fire({
      position: "center",
      title: "",
      text: msg,
      showConfirmButton: true,
      width: "80%",
      confirmButtonColor: "#67E8F9",
      confirmButtonText: "OK",
    });
  }
  function negativeConfirm(msg) {
    Swal.fire({
      position: "center",
      title: "",
      text: msg,
      showConfirmButton: true,
      width: "80%",
      confirmButtonColor: "#C43D27",
      confirmButtonText: "OK",
    });
  }
  function message(msg) {
    Swal.fire({
      position: "center",
      title: msg,
      showConfirmButton: false,
      width: "80%",
      color: "#67E8F9",
      timer: 1500,
    });
  }
  async function confirmCancel(msg) {
    return await Swal.fire({
      position: "center",
      title: msg,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      cancelButtonColor: "#6B767E",
      confirmButtonColor: "#67E8F9",

      width: "80%",
      color: "#67E8F9",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return true
      } else if (result.isDenied) {
        return false
      }else{
        return false
      }
    });
  }
  return {
    positive,
    negative,
    positiveConfirm,
    negativeConfirm,
    message,
    confirmCancel,
  };
}
