
// script.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé");
  
    applySavedTheme();
    applySavedColors();
    applySavedBackgroundImage();
    initThemeToggle();
    initMenuBehavior();
    initPostSubmission();
    initVoting();
    sendComment();
    typeComment()
  });
  
  // -----------------------------
  // 1. Apply Theme
  // -----------------------------
  function applySavedTheme() {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.body.classList.add("dark");
    }
  }
  
  function initThemeToggle() {
    const button = document.querySelector(".switch-dark-mode");
    const icon = document.getElementById("theme-icon");
    const body = document.body;
  
    button?.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
      updateIcon();
    });
  
    function updateIcon() {
      if (icon) {
        icon.src = body.classList.contains("dark") ? "sun.svg" : "moon.svg";
      }
    }
  
    updateIcon();
  }
  
  // -----------------------------
  // 2. Apply Accent + Background
  // -----------------------------
  function applySavedColors() {
    const savedBG = localStorage.getItem("userBackgroundColor");
    const savedAccent = localStorage.getItem("userAccentColor");
  
    if (savedBG) {
      document.documentElement.style.setProperty("--bg-color", savedBG);
    }
    if (savedAccent) {
      document.documentElement.style.setProperty("--accent", savedAccent);
    }
  }
  
  function applySavedBackgroundImage() {
    const overlay = document.getElementById("background-overlay");
    if (!overlay) {
      console.warn("⚠️ Element #background-overlay not found");
      return;
    }    const savedImage = localStorage.getItem("userBackgroundImage");
    const savedBlur = localStorage.getItem("userBgBlur");
  
    if (overlay) {
      if (savedImage) {
        overlay.style.backgroundImage = `url(${savedImage})`;
        overlay.style.backgroundSize = "cover";
        overlay.style.backgroundPosition = "center";
      }
      if (savedBlur) {
        overlay.style.backdropFilter = `blur(${savedBlur})`;
        overlay.style.webkitBackdropFilter = `blur(${savedBlur})`;
      }
    }
  }
  
  // -----------------------------
  // 3. Menu Toggle
  // -----------------------------
  function initMenuBehavior() {
    const menu = document.querySelector(".menu");
    const items = document.querySelectorAll(".menu-el");
    const menuTag = document.querySelector(".menu-access");
    const toggleSwitch = document.getElementById("menu-switch");
    const switchLabel = document.getElementById("menu-switch-label");
  
    if (!menu || !items.length || !menuTag) return;
  
    function updateMenuLockIcon(locked) {
      if (switchLabel) {
        switchLabel.textContent = locked ? "Unlock" : "Lock";
      }
    }
  
    function showMenu() {
      items.forEach(el => el.style.transform = "translateX(0px)");
      menu.classList.add("open");
      menu.style.opacity = "1";
    }
  
    function hideMenu() {
      items.forEach(el => el.style.transform = "translateX(-150px)");
      menu.classList.remove("open");
      menu.style.opacity = "0";
    }
  
    // Toggle avec le bouton menuTag
    menuTag.addEventListener("click", (e) => {
      e.stopPropagation(); // ← essentiel
      if (menu.classList.contains("open")) {
        hideMenu();
      } else {
        showMenu();
      }
    });
  
    // Ferme le menu si clic ailleurs
    document.addEventListener("click", (e) => {
      const isClickInsideMenu = menu.contains(e.target);
      const isClickOnToggle = menuTag.contains(e.target);
  
      if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains("open")) {
        hideMenu();
      }
    });
  
    // Gestion du lock (facultatif)
    if (toggleSwitch && switchLabel) {
      const saved = localStorage.getItem("menuAlwaysVisible") === "true";
      toggleSwitch.checked = saved;
      updateMenuLockIcon(saved);
  
      toggleSwitch.addEventListener("change", () => {
        const isChecked = toggleSwitch.checked;
        localStorage.setItem("menuAlwaysVisible", isChecked.toString());
        updateMenuLockIcon(isChecked);
  
        if (isChecked) {
          showMenu();
        } else {
          hideMenu();
        }
      });
  
      if (saved) showMenu();
      else hideMenu();
    }
  }
  
  
  
  // -----------------------------
  // 4. Post Submission
  // -----------------------------
  function initPostSubmission() {
    const sendBtn = document.querySelector(".send-btn");
    const input = document.getElementById("input");
    const container = document.querySelector(".cards-posted");
    const popup = document.querySelector(".post-published");
  
    if (!sendBtn || !input || !container) return;
  
    sendBtn.addEventListener("click", () => {
      const id = Date.now();
      const html = `
        <div class="card-post" data-id="${id}" id="card">
          <div class="card-title">
            <div class="profil">P</div>
            <h1 class="fullname">Username</h1>
          </div>
          <div class="card-body-post">
            <div class="text-wrapper">
              <p class="comment-posted">${input.value}</p>
              <div class="post-icons">
                <div class="like-comment">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="like-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    C2 5.42 4.42 3 7.5 3
                    C9.24 3 10.91 3.81 12 5.08
                    C13.09 3.81 14.76 3 16.5 3
                    C19.58 3 22 5.42 22 8.5
                    C22 12.28 18.6 15.36 13.45 19.54L12 21.35z"/>
            </svg> 
            <h6 class="like-comment-counter">0</h6>
            </div>
            <div class="bubble-comment">
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="var(--neutral-color)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="chat-bubble-icon">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h6 class="comment-counter">0</h6>
            
            </div>
          </div>            
          </div>
            <div class="responses-container"></div>
            <div class="comment-section-card">
              <textarea class="comment-section auto-resize" placeholder="Say something"></textarea>
              <button class="send-comment-btn">Send</button>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
  
      const newCard = container.querySelector(`[data-id="${id}"]`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: "smooth", block: "center" });
        const newLikeIcon = newCard.querySelector(".like-icon");
        bindLikeToggle(newLikeIcon);
      }

      const postedComment = newCard.querySelector(".comment-posted");
if (postedComment) {
  postedComment.classList.add("highlight");
  setTimeout(() => postedComment.classList.remove("highlight"), 1000);
}


  
      input.value = "";
      // popup?.classList.add("show");
  
      // setTimeout(() => popup?.classList.remove("show"), 2000);
    });
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
  
    // Créer un clone invisible pour mesurer la hauteur requise
    const clone = document.createElement('div');
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.style.zIndex = '-1000';
    clone.style.whiteSpace = 'pre-wrap';
    clone.style.wordWrap = 'break-word';
    clone.style.font = window.getComputedStyle(textarea).font;
    clone.style.lineHeight = window.getComputedStyle(textarea).lineHeight;
    clone.style.padding = window.getComputedStyle(textarea).padding;
    clone.style.width = textarea.offsetWidth + 'px';
    clone.textContent = textarea.value || textarea.placeholder || ''; // ← utilise placeholder
  
    document.body.appendChild(clone);
    const newHeight = clone.scrollHeight;
    document.body.removeChild(clone);
  
    textarea.style.height = Math.max(newHeight, 40) + 'px'; // 40px = fallback
  }
  
  
  
  document.addEventListener('input', (e) => {
    if (e.target.tagName.toLowerCase() === 'textarea' && e.target.classList.contains('auto-resize')) {
      autoResizeTextarea(e.target);
    }
  });
  
  // Optional: also resize once on page load for placeholder sizing
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('textarea.auto-resize').forEach(autoResizeTextarea);
  });
  
  

  // -----------------------------
  // 5. Comment Send Button
  // -----------------------------

  function bindLikeToggle(likeIcon) {
    const likeCommentCounter = likeIcon.parentElement.querySelector('.like-comment-counter');
  
    // Look for closest response-posted first, fallback to card-post
    const post = likeIcon.closest(".response-posted") || likeIcon.closest(".card-post");
    if (!post) return; // Fail silently if somehow not found
  
    const id = post.dataset.id;
    let likedPosts = JSON.parse(localStorage.getItem("likedComments")) || {};
  
    likeIcon.addEventListener('click', () => {
      const current = likedPosts[id] === true;
      let count = parseInt(likeCommentCounter.textContent);
  
      if (current) {
        count--;
        likedPosts[id] = false;
        likeIcon.classList.remove('liked');
        likeIcon.querySelector('path').style.fill = 'none';
      } else {
        count++;
        likedPosts[id] = true;
        likeIcon.classList.add('liked');
        likeIcon.querySelector('path').style.fill = 'var(--accent)';
        likeIcon.querySelector('path').style.stroke = 'var(--accent)';
      }
  
      likeCommentCounter.textContent = count;
      localStorage.setItem("likedComments", JSON.stringify(likedPosts));
    });
  }

  function typeComment() {
    const container = document.querySelector(".cards-posted");
  
    container.addEventListener("click", (e) => {
      const bubble = e.target.closest(".chat-bubble-icon");
      if (!bubble) return;
      console.log("💬 Chat bubble cliquée");
  
      const post = bubble.closest(".card-post");
      if (!post) return;
  
      const wrapper = post.querySelector(".comment-section-card");
      if (!wrapper) return;
  
      wrapper.classList.toggle("show");

      const textarea = wrapper.querySelector('.comment-section');
const button = wrapper.querySelector('.send-comment-btn');

if (wrapper.classList.contains('show')) {
  textarea.classList.add('show');
  button.classList.add('show');
} else {
  textarea.classList.remove('show');
  button.classList.remove('show');
}

    });
  }
  
  
  
  
  
  function sendComment() {
    const container = document.querySelector('.cards-posted');
  
    container.addEventListener('click', (e) => {
      if (!e.target.classList.contains('send-comment-btn')) return;
  
      const post = e.target.closest('.card-post');
      const commentInput = post.querySelector('.comment-section');
      const responseContainer = post.querySelector('.responses-container');
      const commentCount = post.querySelector('.comment-counter'); // 👈 ciblé correctement
  
      const id = Date.now();
      const html = `
        <div class="response-posted" data-id="${id}">
          <div class="response-card">
            <div class="response-title">
              <div class="profil-comment">P</div>
              <h1 class="fullname-response">Username</h1>
            </div>
            <div class="response-body">
              <p class="response">${commentInput.value}</p>    
            <div class="response-footer">
              <div class="post-icons">
                <div class="like-comment">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="like-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    C2 5.42 4.42 3 7.5 3
                    C9.24 3 10.91 3.81 12 5.08
                    C13.09 3.81 14.76 3 16.5 3
                    C19.58 3 22 5.42 22 8.5
                    C22 12.28 18.6 15.36 13.45 19.54L12 21.35z"/>
            </svg> 
            <h6 class="like-comment-counter">0</h6>
            </div>
            <div class="bubble-comment">
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="var(--neutral-color)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="chat-bubble-icon">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h6 class="comment-counter">0</h6>
            
            </div>
              </div>
            </div>
            </div>
          </div>
        </div>`;
  
      responseContainer.insertAdjacentHTML("beforeend", html);
  
      const newPost = responseContainer.querySelector(`[data-id="${id}"]`);
      const newLikeIcon = newPost.querySelector('.like-icon');
      bindLikeToggle(newLikeIcon);
  
      commentInput.value = '';
      commentInput.dispatchEvent(new Event('input')); 

      // Rétracter la section commentaire
      const commentSectionCard = post.querySelector('.comment-section-card');
      commentSectionCard?.classList.remove('show');

      const sendButton = post.querySelector('.send-comment-btn');
      const textarea = post.querySelector('.comment-section');

      sendButton?.classList.remove('show');
      textarea?.classList.remove('show');



  
      // Mise à jour du compteur
      if (commentCount) {
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
      }
    });
  }
  
  
  
  // -----------------------------
  // 6. Voting System
  // -----------------------------
  function initVoting() {
    const container = document.querySelector(".cards-posted");
    if (!container) return;
  
    container.addEventListener("click", (e) => {
      const btn = e.target;
      if (!btn.classList.contains("upvote") && !btn.classList.contains("downvote")) return;
  
      const post = btn.closest(".card-post");
      const id = post.dataset.id;
      const votes = JSON.parse(localStorage.getItem("votedPosts")) || {};
      const current = votes[id];
  
      const up = post.querySelector(".upvote");
      const down = post.querySelector(".downvote");
  
      let upCount = parseInt(up.textContent);
      let downCount = parseInt(down.textContent);
  
      if (btn.classList.contains("upvote")) {
        if (current === "upvoted") {
          upCount--;
          delete votes[id];
        } else {
          if (current === "downvoted") downCount--;
          upCount++;
          votes[id] = "upvoted";
        }
      }
  
      if (btn.classList.contains("downvote")) {
        if (current === "downvoted") {
          downCount--;
          delete votes[id];
        } else {
          if (current === "upvoted") upCount--;
          downCount++;
          votes[id] = "downvoted";
        }
      }
  
      up.textContent = upCount;
      down.textContent = downCount;
      localStorage.setItem("votedPosts", JSON.stringify(votes));
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const active = document.activeElement;
  
      // If the user is in the main post input
      if (active.id === "input") {
        e.preventDefault();
        document.querySelector(".send-btn")?.click();
      }
  
      // If the user is in a comment textarea
      if (active.classList.contains("comment-section")) {
        e.preventDefault();
        const card = active.closest(".card-post");
        card?.querySelector(".send-comment-btn")?.click();
      }
    }
  });

  function adjustHeight() {
    const cards = document.querySelector('.cards');
    cards.style.height = `${window.innerHeight}px`;
  }
  
  window.addEventListener('resize', adjustHeight);
  window.addEventListener('orientationchange', adjustHeight);
  document.addEventListener('DOMContentLoaded', adjustHeight);
  
  