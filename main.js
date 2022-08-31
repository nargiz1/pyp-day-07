let messageContent = document.querySelector("#message-content");
let duration = document.querySelector("#duration");
let cancelable = document.querySelector("#cancelable");
let success = document.querySelector("#success");
let error = document.querySelector("#error");
let addButton = document.querySelector("#add-button");
let clearBtn = document.querySelector("#clear-button");
let toasts = document.querySelector("#toasts");

success.setAttribute("checked", true);

addButton.addEventListener("click", function () {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  let toastP = document.createElement("p");
  toast.append(toastP);
  let content;

  if(messageContent.value != ""){
    content = messageContent.value;
  }

  if (success.getAttribute("checked")) {
    toast.classList.add("success-toast");
    content = content?? "Success!"
  } else if (error.getAttribute("checked")) {
    toast.classList.add("error-toast");
    content = content?? "Error!"
  }

  if (cancelable.getAttribute("checked")) {
    let cnclBtn = document.createElement("button");
    cnclBtn.classList.add("cancel-button");
    cnclBtn.innerText = "X";
    console.log(cnclBtn);

    toast.append(cnclBtn);

    cnclBtn.addEventListener("click", function () {
      toasts.removeChild(toast);
    });

  }

  toastP.innerText = content;
  toasts.append(toast);

  let finalDuration;

  if (duration.value == "" || duration.value < 500) {
    finalDuration = 500;
  } else if (isNaN(+duration.value)) {
    finalDuration = 500;
  } else if (duration.value >= 500) {
    finalDuration = duration.value;
  }

  setTimeout(function () {
    toasts.removeChild(toast);
  }, finalDuration);
});

clearBtn.addEventListener("click", function () {
  toasts.innerHTML = "";
});

cancelable.addEventListener("click", function () {
  if (cancelable.getAttribute("checked")) {
    cancelable.removeAttribute("checked");
  } else {
    cancelable.setAttribute("checked", true);
  }
});
success.addEventListener("click", function () {
  if (success.getAttribute("checked")) {
    success.removeAttribute("checked");
    error.setAttribute("checked", true);
  } else {
    success.setAttribute("checked", true);
    error.removeAttribute("checked");
  }
});
error.addEventListener("click", function () {
  if (error.getAttribute("checked")) {
    error.removeAttribute("checked");
    success.setAttribute("checked", true);
  } else {
    error.setAttribute("checked", true);
    success.removeAttribute("checked");
  }
});
