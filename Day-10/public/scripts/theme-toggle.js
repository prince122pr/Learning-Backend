document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("toggleTheme");
  if (btn) {
    btn.onclick = function () {
      document.body.classList.toggle("light-theme");
      btn.textContent = document.body.classList.contains("light-theme")
        ? "☀️"
        : "🌙";
    };
  }
});
