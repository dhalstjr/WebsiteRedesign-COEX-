$(function () {
  // 대상을 변수에 저장

  // 풀페이지 변수 적용
  const $window = $(window);
  const $sideDot = $(".indicator li");
  const $section = $("#container > section");

  /* 헤더 부분 변수 저장 */
  const $header = $("#header");
  const $menu = $(".gnb > li");
  const $submenu = $(".submenu");
  const $subNotice = $(".sub-notice");
  const duration = 300;

  /* Top 버튼 */
  const $btnTop = $(".btn-top");

  // 헤더 부분 실행
  $menu.on("mouseenter", function () {
    // 메뉴 한번에 떨어뜨리기
    const menuIdx = $(this).index();
    $menu.removeClass("on").eq(menuIdx).addClass("on");
    $submenu.stop().fadeIn(duration);
    /*     $subNotice.stop().slideDown(duration); */
    $header.addClass("active");
  });

  $menu.on("mouseleave", function () {
    $submenu.stop().fadeOut(duration);
    $menu.removeClass("on");
    $header.removeClass("active");
  });

  /* top버튼이 처음에는 안보이게  */
  $btnTop.hide();

  // 항목별 인덱스를 활용
  let secIdx = 0;

  updateDot(secIdx);
  moveSection(secIdx);
  // console.log($window, $sideDot, $section, $btnTop);

  //Top버튼을 클릭했을 떄 상단으로 이동
  $btnTop.on("click", function () {
    secIdx = 0;
    moveSection(secIdx);
  });

  // section을  이동하는 동작을 함수로 정의
  function moveSection(index) {
    // 인덱스를 활용해서 섹션의 위치값 구하기
    $sideDot.removeClass("on").eq(index).addClass("on");
    const posTop = index * $window.outerHeight();

    // console.log(posTop);
    $("html, body").stop().animate(
      {
        scrollTop: posTop,
      },
      400
    );

    updateDot(index);
    console.log(secIdx);

    /* Top버튼 보이게 / 숨기게 */
    if (secIdx >= 2) {
      $btnTop.fadeIn();
    } else {
      $btnTop.fadeOut();
    }
  }

  // indicator를 클릭했을 떄
  $sideDot.on("click", function () {
    secIdx = $(this).index();

    moveSection(secIdx);
  });

  // indicator 업데이트 하는 함수
  function updateDot(index) {
    $sideDot.removeClass("on").eq(index).addClass("on");
  }

  // 마우스 휠 & 키보드 조작
  $window.on("wheel keydown", function (e) {
    if ($("html, body").is(":animated")) return;

    if (e.originalEvent.deltaY < 0 || e.key === "ArrowUp") {
      // 휠을 올리거나 위로 가는 화살표 키를 누른 경우
      // 조건을 걸어서 코드를 종료
      if (secIdx === 0) return;
      secIdx--;
    } else if (e.originalEvent.deltaY > 0 || e.key === "ArrowDown") {
      // 휠을 내리거나 아래 화살표 키를 누른 경우

      if (secIdx === $section.length - 1) return;
      secIdx++;
    }

    moveSection(secIdx);
  });

  let scrollTop = $window.scrollTop();
  setWhiteBackground();

  function setWhiteBackground() {
    const sectionHeight = $section.outerHeight();
    if (scrollTop >= sectionHeight) {
      $header.addClass("w-bg");
    } else {
      $header.removeClass("w-bg");
    }
  }

  // 3. 초기화 실행 slide를 위한
  const swiper = new Swiper(".event-slider", {
    autoplay: {
      delay: 3000,
    },

    loop: true,
    speed: 1000,

    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
  });
});
