/* eslint-disable */

import {select, toggleClass} from './jsHelper'
import dynamics from 'dynamics.js'
import $ from 'jquery'
import anime from 'animejs'

export default function loginForm() {

  console.log("loginForm popup setup");

  const btnOpen = select('.js-open');
  const btnOpenMob = select('.js-open-mobile');
  const btnClose = select('.close-btn');
  const btnCloseMob = select('.close-login-txt');
  const modal = select('.js-modal');
  const modalWrap = select('#login-form');
  const modalChildren = modal.children;
  const signupBg = select('.signup-bg');
  const loginBg = select('.login-bg');
  const signupBtn = select('.signup-btn-disabled');
  const loginBtn = select('.login-btn-disabled');
  const loginItems = select ('.login-item');
  const signupItems = select ('.signup-item');
  const headLinks = select('.head-links-mobile');
  const hamburger = select('#hamburger');

  function showItems(items) {



    for (var i=0 ; i< items.length ; i++){

      var item = items[i];

      item.style.zIndex = "1000";

      dynamics.css(item, {
        opacity: 0,
        translateY: 20
      });

      dynamics.animate(item, {
        opacity: 1,
        translateY: 0
      }, {
        type: dynamics.spring,
        frequency: 300,
        friction: 435,
        duration: 400,
        delay: 100 + i * 50
    });


    }
  }

  function hideModal() {
    dynamics.animate(modal, {
      opacity: 0,
      translateY: 100
    }, {
      type: dynamics.spring,
      frequency: 50,
      friction: 600,
      duration: 1500
    });
  }

  function showModal() {
    // Define initial properties
    dynamics.css(modal, {
      opacity: 0,
      scale: .5
    });

    // Animate to final properties
    dynamics.animate(modal, {
      opacity: 1,
      scale: 1
    }, {
      type: dynamics.spring,
      frequency: 300,
      friction: 400,
      duration: 1000
    });
  }

  function blurIt (noHamburger) {
    var noHamburger = (typeof noHamburger !== 'undefined') ? noHamburger : true;
    $(".head-line").toggleClass("blur-it");
    $(".head-logo").toggleClass("blur-it");
    $(".chat-wrap").toggleClass("blur-it");
    $(".head-links-desktop").toggleClass("blur-it");
    if (noHamburger == false) {
      $(".hamburger").toggleClass("blur-it");
    }
  };

  function toggleClasses(loginOn, bodyLock) {
    var loginOn = (typeof loginOn !== 'undefined') ? loginOn : false;
    var bodyLock = (typeof bodyLock !== 'undefined') ? bodyLock : false;
    if (loginOn) {
      toggleClass(modalWrap, 'flexOn');
    }
    if (bodyLock) {
      toggleClass(select("body"), 'body-login-form-enabled');
    }
  }

  function lockTab (expr) {

    var expr;
    switch (expr) {
      case "lockAll":
        // lock all
        $("input, button, *[tabindex='0']").each(function () {
          $(this).attr("tabindex","-1");
        });
        break;
      case "unlockLogin":
        // lock all excpect login items
        $("input, button, *[tabindex='0']").each(function () {
          $(this).attr("tabindex","-1");
        });
        $(".items").each(function () {
          $(this).attr("tabindex","0");
        });
        break;
      case "unlockAll":
        $("input, button, *[tabindex='-1']").each(function () {
          $(this).attr("tabindex","0");
        });
        // unlock all
        break;
      default:
        console.log("no valid argm");
    }
  }

  function animateIt(amount) {
    setTimeout(function() {
      anime({
        targets: headLinks,
        translateX: amount,
        duration: 300,
        easing: 'easeInOutQuart'
      });
    }, 200);
  }

  // OPEN head links on HAMBURGER BTN CLICK
  hamburger.addEventListener('click', function(e) {

    toggleClasses(false, true);
    blurIt(true);
    if (hamburger.classList.contains("is-active")) {
      lockTab("unlockAll");
      $("#hamburger").toggleClass('is-active');
      animateIt("100%");
    } else {
      lockTab("lockAll");
      window.scrollTo( 0, 0 );
      $("#hamburger").toggleClass('is-active');

      if (window.matchMedia("(max-width: 500px)").matches) {
        animateIt("-100%");
      } else {
        animateIt("-50%");
      }

    }

  });

  // OPEN login form
  btnOpen.addEventListener('click', function() {
    showModal();
    showItems(loginItems);
    showItems(signupItems);
    toggleClasses(true, true);
    blurIt();
    lockTab("unlockLogin");
  });

  // open login form MOBILE
  btnOpenMob.addEventListener('click', function() {
    showModal();
    showItems(loginItems);
    showItems(signupItems);
    toggleClasses(true, false);
    lockTab("unlockLogin");
  });

  // close login form with CLOSE BTN
  $(".close-btn").on('click', function(e) {
    // if hamburger menu is CLOSED
    if (!$("#hamburger").hasClass("is-active")) {
      hideModal();
      dynamics.setTimeout(toggleClasses(true, true), 4000);
      blurIt();
      lockTab("unlockAll");
    // if hamburger menu is OPENED
    } else {
      hideModal();
      setTimeout(function () {
        toggleClasses(true, false);
      }, 100);
      lockTab("lockAll");
    }
  });

  // Close login form WRAP / head links on CLICK OUT
  $(document).click(function(e) {
    var $target = $(e.target);

    // // CLOSE login form
    // if login form is OPENED (head links OPENED)
    if (
      // if login form is OPENED
      $("#login-form").css("display") !== "none" &&
      // if CLICK OUT login form expect :
      // login form CLOSE BTN
      !$target.closest('.js-close').length && !$target.hasClass('.js-close') &&
      // login form WRAP
      !$target.closest('.js-modal').length && !$target.hasClass('js-modal') &&
      // head links connect 'se connecter' BTN
      !$target.closest('.js-open').length && !$target.hasClass('js-open') &&
      // head links MOBILE connect 'se connecter' BTN
      !$target.closest('.js-open-mobile').length && !$target.hasClass('js-open-mobile')
    ) {
      // if head links is OPENED
      if (!$("#hamburger").hasClass("is-active")) {
        hideModal();
        toggleClasses(true, true)
        blurIt();
        lockTab("unlockAll");
      // if head links is CLOSED
      } else {
        hideModal();
        setTimeout(function () {
          toggleClasses(true, false);
        }, 100);
        lockTab("lockAll");
      }
    }

    // // CLOSE head links
    // if head links MOBILE is OPENED (login form CLOSED)
    else if (
      // if head links OPENED
      $("#hamburger").hasClass("is-active") &&
      // if login form CLOSED
      $("#login-form").css("display") == "none" &&
      // if CLICK OUT login form expect :
      // login form CLOSE BTN
      !$target.closest('.close-btn-wrap').length && !$target.hasClass('close-btn-wrap') &&
      // head links WRAP
      !$target.closest('.head-links-mobile').length && !$target.hasClass('head-links-mobile') &&
      // hamburger menu icon
      !$target.closest('.hamburger').length && !$target.hasClass('hamburger') &&
      // close login '[x] close' TEXT
      !$target.closest('.close-login-txt').length && !$target.hasClass('close-login-txt')
    )
    {
      animateIt("100%");
      toggleClasses(false, true);
      $("#hamburger").toggleClass('is-active');
      blurIt();
      lockTab("unlockAll");
    }

  });

  // close login form on click MOBILE CLOSE TEXT (login)
  btnCloseMob[0].addEventListener('click', function(e) {
    hideModal();
    setTimeout(function () {
      toggleClasses(true, false);
    }, 100);
    lockTab("lockAll");
  });

  // close login form on click MOBILE CLOSE TEXT (signup)
  btnCloseMob[1].addEventListener('click', function(e) {
    hideModal();
    setTimeout(function () {
      toggleClasses(true, false);
    }, 100);
    lockTab("lockAll");
  });

  // close login form WRAP / head links on type ESCAPE
  $(document).keyup(function(e) {

    if (
        ($("#login-form").css('display') == 'none') &&
        (e.keyCode === 27) &&
        ($("#hamburger").hasClass("is-active"))
      )
    {
          animateIt("100%");

          if (!$("#hamburger").hasClass("is-active")) {
            blurIt(false);
            $("#hamburger").toggleClass('is-active');
            toggleClasses(false, true);
            lockTab("lockAll");
          }
          else {
            blurIt();
            $("#hamburger").toggleClass('is-active');
            toggleClasses(false, true);
            lockTab("unlockAll");
          }
    }
    else if (
        $("#login-form").css('display') !== 'none' &&
        e.keyCode === 27 &&
        !$("#login-form").find("input").is(":focus")
      )
    {
      if (!$("#hamburger").hasClass("is-active")) {
        hideModal();
        toggleClasses(true, true);
        blurIt();
        lockTab("unlockAll");
      }
      else {
        hideModal();
        setTimeout(function () {
          toggleClasses(true, false);
        }, 100);
        lockTab("lockAll");
      }
    }

  });

  // open SIGNUP form on click SIGNUP BTN (mobile)
  signupBtn.addEventListener('click', function(e) {


    signupBg.style.zIndex = "999";

    $(".login-item").css("opacity","0");

    dynamics.css(signupBg, {
      scale: 0
    })

    dynamics.animate(signupBg, {
      scale: 1000
    }, {
      type: dynamics.spring,
      frequency: 300,
      friction: 435,
      duration: 1400
    });

    dynamics.setTimeout(function() {
      signupBg.style.zIndex = "-1";
      $(".login-wrap").removeClass("displayOn");
      $(".login-wrap").addClass("displayOff");
      $(".signup-wrap").removeClass("displayOff");
      $(".signup-wrap").addClass("displayOn");
      showItems(signupItems);
    }, 100);

    dynamics.setTimeout(function() {
      $(".login-item").css("opacity","1");
    }, 300);


  });

  // open LOGIN form on click LOGIN BTN (mobile)
  loginBtn.addEventListener('click', function(e) {


    loginBg.style.zIndex = "999";

    $(".signup-item").css("opacity","0");

    dynamics.css(loginBg, {
      scale: 0
    })

    dynamics.animate(loginBg, {
      scale: 1000
    }, {
      type: dynamics.spring,
      frequency: 300,
      friction: 435,
      duration: 1400
    });

    dynamics.setTimeout(function() {
      loginBg.style.zIndex = "-1";
      $(".signup-wrap").removeClass("displayOn");
      $(".signup-wrap").addClass("displayOff");
      $(".login-wrap").removeClass("displayOff");
      $(".login-wrap").addClass("displayOn");
      showItems(loginItems);
    }, 100);

    dynamics.setTimeout(function() {
      $(".signup-item").css("opacity","1");
    }, 300);


  });

}
