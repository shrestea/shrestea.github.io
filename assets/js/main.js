;(function () {
  "use strict"
  var doc = document.documentElement
  var w = window

  var header = document.getElementById("header")
  var checkScroll = () => {
    var curScroll = w.scrollY || doc.scrollTop
    if (curScroll > 20) {
      header.style.top = 0
    } else {
      header.style.top = "-90px"
    }
  }

  window.addEventListener("scroll", checkScroll)

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener)
  }

  document.getElementById("mysecondteacher").addEventListener(
    "click",
    () => {
      window.open("https://mysecondteacher.com.np/", "_newtab")
    },
    false
  )

  document.getElementById("ciphergame").addEventListener(
    "click",
    () => {
      window.open("https://github.com/misakihiyo/CipherGame", "_newtab")
    },
    false
  )

  document.getElementById("dynaspy").addEventListener(
    "click",
    () => {
      window.open("https://github.com/misakihiyo/DynaSpy", "_newtab")
    },
    false
  )

  document.getElementById("petfeeder").addEventListener(
    "click",
    () => {
      window.open(
        "https://github.com/misakihiyo/arduino-popo-feeder",
        "_newtab"
      )
    },
    false
  )

  document.getElementById("nepalibraille").addEventListener(
    "click",
    () => {
      window.open("https://github.com/misakihiyo/NepaliBraille", "_newtab")
    },
    false
  )

  let navbarlinks = select("#navbar .scrollto", true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active")
      } else {
        navbarlink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    })
  }

  let backtotop = select(".back-to-top")
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active")
      } else {
        backtotop.classList.remove("active")
      }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active")
    this.classList.toggle("bi-list")
    this.classList.toggle("bi-x")
  })

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        let body = select("body")
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active")
          let navbarToggle = select(".mobile-nav-toggle")
          navbarToggle.classList.toggle("bi-list")
          navbarToggle.classList.toggle("bi-x")
        }
        scrollto(this.hash)
      }
    },
    true
  )

  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  let preloader = select("#preloader")
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove()
    })
  }

  const typed = select(".typed")
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items")
    typed_strings = typed_strings.split(",")
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
  }

  let skilsContent = select(".skills-content")
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true)
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%"
        })
      },
    })
  }

  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  })

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  })

  new PureCounter()
})()
