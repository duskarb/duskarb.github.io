// 한국어/English 전환. ?lang=ko|en 이 있으면 그걸, 없으면 브라우저 언어를 따른다.
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const param = new URLSearchParams(location.search).get("lang");
  let lang = param === "ko" || param === "en" ? param : navigator.language.startsWith("ko") ? "ko" : "en";

  function apply() {
    root.lang = lang;
    for (const el of document.querySelectorAll("[data-lang]")) el.classList.toggle("active", el.dataset.lang === lang);
    for (const b of document.querySelectorAll(".lang button")) b.setAttribute("aria-pressed", String(b.value === lang));
    const title = document.querySelector(`meta[name="title-${lang}"]`);
    if (title) document.title = title.content;
  }

  for (const b of document.querySelectorAll(".lang button")) {
    b.addEventListener("click", () => {
      lang = b.value;
      apply();
    });
  }
  apply();
})();
