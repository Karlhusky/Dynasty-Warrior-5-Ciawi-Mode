diff --git a/script.js b/script.js
index baf9f2bfa1990ca2cc1e4c55b22b0afd48eb3a07..7155d4e5ccfdc3af76b6e96016183c8d455cb3db 100644
--- a/script.js
+++ b/script.js
@@ -1,272 +1,703 @@
 const screens = document.querySelectorAll('.screen');
 const openingScreen = document.getElementById('opening-screen');
 const openingVideo = document.getElementById('opening-video');
 const btnStartOpening = document.getElementById('btn-start-opening');
 const btnMusou = document.getElementById('btn-musou');
 const btnEncyclopedia = document.getElementById('btn-encyclopedia');
 const btnCiawi = document.getElementById('btn-ciawi');
+const btnHutan = document.getElementById('btn-hutan');
 const backButtons = document.querySelectorAll('.back');
 
 const battleBgm = document.getElementById('bgm-battle');
 const sfxEnemyAttack = document.getElementById('sfx-enemy-attack');
 const sfxEnemyHit = document.getElementById('sfx-enemy-hit');
 const sfxEnemyLose = document.getElementById('sfx-enemy-lose');
+const rewardBgm = document.getElementById('bgm-reward');
+const encyclopediaBgm = document.getElementById('bgm-encyclopedia');
+const loveBgm = document.getElementById('bgm-love');
 
 const heroIdle = document.getElementById('hero-idle');
+const supportIdle = document.getElementById('support-idle');
 const enemyIdle = document.getElementById('enemy-idle');
+const heroName = document.getElementById('hero-name');
+const enemyName = document.getElementById('enemy-name');
 const heroHpFill = document.getElementById('hero-hp');
 const enemyHpFill = document.getElementById('enemy-hp');
 const heroReaction = document.getElementById('hero-reaction');
 const enemyReaction = document.getElementById('enemy-reaction');
 const attackEffect = document.getElementById('attack-effect');
 const questionText = document.getElementById('question-text');
 const choicesWrap = document.getElementById('choices');
 const battleLog = document.getElementById('battle-log');
 const sceneFader = document.getElementById('scene-fader');

+const rewardImg = document.getElementById('reward-img');
+const btnRewardNext = document.getElementById('btn-reward-next');
+
+const encyclopediaMenu = document.getElementById('encyclopedia-menu');
+const encyclopediaSubmenu = document.getElementById('encyclopedia-submenu');
+const encyclopediaSubmenuTitle = document.getElementById('ency-submenu-title');
+const encyclopediaSubmenuList = document.getElementById('ency-submenu-list');
+const encyclopediaDetail = document.getElementById('encyclopedia-detail');
+const encyclopediaDetailTitle = document.getElementById('ency-detail-title');
+const encyclopediaDetailImage = document.getElementById('ency-detail-image');
+const encyclopediaDetailText = document.getElementById('ency-detail-text');
+const encyclopediaDetailBg = document.getElementById('ency-detail-bg');
+const btnEncyBackMain = document.getElementById('btn-ency-back-main');
+const btnEncyBackSub = document.getElementById('btn-ency-back-sub');
+
+const tamatBeforeVideo = document.getElementById('tamat-before-video');
+const tamatAfterVideo = document.getElementById('tamat-after-video');
+const zhaoDialogue = document.getElementById('zhao-dialogue');
+const anyaDialogue = document.getElementById('anya-dialogue');
+const zhaoLine = document.getElementById('zhao-line');
+const anyaLine = document.getElementById('anya-line');
+const dialogueQuestion = document.getElementById('dialogue-question');
+const dialogueChoices = document.getElementById('dialogue-choices');
+
+const creditsList = document.getElementById('credits-list');
+const btnCreditsMenu = document.getElementById('btn-credits-menu');
+
+const encyclopediaData = {
+  pertempuran: {
+    title: 'Pertempuran',
+    items: [
+      {
+        title: 'Pertempuran Ciawi',
+        image: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.png',
+        textPath: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.txt',
+        background: 'Musou_mode/Background.png',
+      },
+      {
+        title: 'Ekspedisi Hutan Selatan',
+        image: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.png',
+        textPath: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.txt',
+        background: 'Musou_mode/Background2.png',
+      },
+    ],
+  },
+  tokoh: {
+    title: 'Tokoh',
+    items: [
+      {
+        title: 'Anya',
+        image: 'Encyclopedia/Tokoh/Anya/Karakter2.png',
+        textPath: 'Encyclopedia/Tokoh/Anya/Anya.txt',
+        background: 'Musou_mode/Tamat/Background_cinta.png',
+      },
+      {
+        title: 'Lin',
+        image: 'Encyclopedia/Tokoh/Lin/Musuh2.png',
+        textPath: 'Encyclopedia/Tokoh/Lin/Lin.txt',
+        background: 'Musou_mode/Background2.png',
+      },
+      {
+        title: 'Yuan',
+        image: 'Encyclopedia/Tokoh/Yuan/Musuh1.png',
+        textPath: 'Encyclopedia/Tokoh/Yuan/Yuan.txt',
+        background: 'Musou_mode/Background.png',
+      },
+      {
+        title: 'Zhao',
+        image: 'Encyclopedia/Tokoh/Zhao/Karakter1.png',
+        textPath: 'Encyclopedia/Tokoh/Zhao/Zhao.txt',
+        background: 'Musou_mode/Tamat/Background_cinta.png',
+      },
+    ],
+  },
+};
+
+const battleConfigs = {
+  ciawi: {
+    title: 'Pertempuran Ciawi',
+    heroName: 'Zhào Bóyán Shànbà',
+    enemyName: 'Yuán Qīguó',
+    background: 'Musou_mode/Background.png',
+    enemyIdle: 'Musou_mode/Musuh1/Musuh1.png',
+    enemyReactionHit: 'Musou_mode/Musuh1/Terkena_serangan.png',
+    enemyReactionAttack1: 'Musou_mode/Musuh1/Menyerang.png',
+    enemyReactionAttack2: 'Musou_mode/Musuh1/Menyerang2.png',
+    enemyReactionLose: 'Musou_mode/Musuh1/Kalah.png',
+    enemyReactionWin: 'Musou_mode/Musuh1/Menang.png',
+    enemyAttackSfx1: 'Musou_mode/Musuh1/Attack1.mp3',
+    enemyAttackSfx2: 'Musou_mode/Musuh1/Attack2.mp3',
+    enemyHitSfx: 'Musou_mode/Musuh1/Attacked.mp3',
+    enemyLoseSfx: 'Musou_mode/Musuh1/Lose.mp3',
+    rewardImage: 'Musou_mode/Hadiah_Musuh1.png',
+    rewardAudio: 'Musou_mode/Hadiah_Musuh1.mp3',
+    rewardButtonText: 'Kembali ke Menu',
+    rounds: 4,
+    supportVisible: false,
+    questions: [
+      {
+        q: 'Pulau terbesar di Indonesia adalah...',
+        choices: ['Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi'],
+        answer: 2,
+      },
+      {
+        q: 'Siapa proklamator kemerdekaan Indonesia?',
+        choices: ['R.A. Kartini', 'Soekarno', 'Diponegoro', 'Cut Nyak Dien'],
+        answer: 1,
+      },
+      {
+        q: 'Candi Borobudur terletak di provinsi...',
+        choices: ['Jawa Tengah', 'Bali', 'Jawa Barat', 'Banten'],
+        answer: 0,
+      },
+      {
+        q: 'Selat yang memisahkan Jawa dan Sumatra adalah...',
+        choices: ['Selat Sunda', 'Selat Makassar', 'Selat Bali', 'Selat Karimata'],
+        answer: 0,
+      },
+    ],
   },
+  hutan: {
+    title: 'Ekspedisi Hutan Selatan',
+    heroName: 'Zhào Bóyán Shànbà',
+    enemyName: 'Lín Zōng’è',
+    background: 'Musou_mode/Background2.png',
+    enemyIdle: 'Musou_mode/Musuh2/Biasa].png',
+    enemyReactionHit: 'Musou_mode/Musuh2/Kaget.png',
+    enemyReactionAttack1: 'Musou_mode/Musuh2/Menyerang.png',
+    enemyReactionAttack2: 'Musou_mode/Musuh2/Menyerang.png',
+    enemyReactionLose: 'Musou_mode/Musuh2/Kalah.png',
+    enemyReactionWin: 'Musou_mode/Musuh2/Kaget.png',
+    enemyAttackSfx1: 'Musou_mode/Musuh2/Attack1.mp3',
+    enemyAttackSfx2: 'Musou_mode/Musuh2/Attack2.mp3',
+    enemyHitSfx: 'Musou_mode/Musuh2/Attacked.mp3',
+    enemyLoseSfx: 'Musou_mode/Musuh2/Lose.mp3',
+    rewardImage: 'Musou_mode/Hadiah_Musuh2.png',
+    rewardAudio: 'Musou_mode/Hadiah_Musuh2.mp3',
+    rewardButtonText: 'Lanjut ke Tamat',
+    rounds: 5,
+    supportVisible: true,
+    questions: [
+      {
+        q: 'Ibukota Jawa Barat adalah...',
+        choices: ['Bandung', 'Bogor', 'Bekasi', 'Cirebon'],
+        answer: 0,
+      },
+      {
+        q: 'Hewan yang dikenal sebagai raja hutan adalah...',
+        choices: ['Harimau', 'Singa', 'Gajah', 'Beruang'],
+        answer: 1,
+      },
+      {
+        q: 'Sungai terpanjang di Indonesia adalah...',
+        choices: ['Kapuas', 'Mahakam', 'Brantas', 'Musi'],
+        answer: 0,
+      },
+      {
+        q: 'Planet yang dikenal sebagai planet merah adalah...',
+        choices: ['Venus', 'Jupiter', 'Mars', 'Saturnus'],
+        answer: 2,
+      },
+      {
+        q: 'Bhinneka Tunggal Ika berarti...',
+        choices: ['Berbeda-beda tetapi tetap satu', 'Bersatu kita teguh', 'Merdeka atau mati', 'Satu nusa satu bangsa'],
+        answer: 0,
+      },
+    ],
+  },
+};
+
+const dialogueScenes = [
   {
+    question: 'Zhao: "Akhirnya aku menemukanmu, Anya. Apa yang paling kamu rindukan?"',
+    zhaoReaction: 'Musou_mode/Karakter1/Karakter1/Percakapan/Penasaran.png',
+    anyaReaction: 'Musou_mode/Karakter2/Bahagia.png',
+    choices: [
+      {
+        text: 'A. Aku rindu ketenangan istana dan suaramu.',
+        zhaoLine: 'Kalau begitu, aku berjanji melindungimu lebih baik dari sebelumnya.',
+        anyaLine: 'Aku percaya padamu, Beryan.',
+      },
+      {
+        text: 'B. Aku rindu membaca buku bersamamu.',
+        zhaoLine: 'Malam ini kita mulai lagi, dari halaman pertama kemenangan kita.',
+        anyaLine: 'Itu membuatku tersenyum, Beryan.',
+      },
+      {
+        text: 'C. Aku rindu rakyat yang damai.',
+        zhaoLine: 'Kita akan jaga perdamaian itu bersama.',
+        anyaLine: 'Ya, untuk semua orang yang menunggu harapan.',
+      },
+    ],
   },
   {
+    question: 'Anya: "Perang ini berat... apa langkahmu berikutnya?"',
+    zhaoReaction: 'Musou_mode/Karakter1/Karakter1/Percakapan/Biasa.png',
+    anyaReaction: 'Musou_mode/Karakter2/Sedih.png',
+    choices: [
+      {
+        text: 'A. Memulihkan desa-desa terlebih dahulu.',
+        zhaoLine: 'Logistik dan keamanan desa akan jadi prioritas utama.',
+        anyaLine: 'Keputusan itu akan menenangkan banyak keluarga.',
+      },
+      {
+        text: 'B. Menata pasukan lalu membuka jalur dagang.',
+        zhaoLine: 'Tanpa ekonomi yang pulih, perdamaian tak akan bertahan.',
+        anyaLine: 'Pemikiranmu selalu jauh ke depan.',
+      },
+      {
+        text: 'C. Mengirim utusan damai ke wilayah sekitar.',
+        zhaoLine: 'Aku ingin kemenangan ini menjadi awal persatuan.',
+        anyaLine: 'Itu alasan rakyat mengikutimu.',
+      },
+    ],
   },
   {
+    question: 'Zhao: "Setelah semua ini, bagaimana kita dikenang?"',
+    zhaoReaction: 'Musou_mode/Karakter1/Karakter1/Percakapan/Kaget.png',
+    anyaReaction: 'Musou_mode/Karakter2/Kaget.png',
+    choices: [
+      {
+        text: 'A. Sebagai pelindung rakyat.',
+        zhaoLine: 'Aku akan pegang kata-kata itu sebagai sumpah.',
+        anyaLine: 'Dan aku akan berdiri di sisimu.',
+      },
+      {
+        text: 'B. Sebagai pasangan yang menyembuhkan negeri.',
+        zhaoLine: 'Bersamamu, aku berani menata masa depan.',
+        anyaLine: 'Masa depan itu terasa dekat sekarang.',
+      },
+      {
+        text: 'C. Sebagai simbol harapan selatan.',
+        zhaoLine: 'Harapan itu akan kita jaga dengan tindakan nyata.',
+        anyaLine: 'Mari kita mulai dari malam ini.',
+      },
+    ],
   },
 ];
 
+const creditsWords = [
+  '=== CREDITS ===',
+  'Campaign Selatan Tamat',
+  'Zhao = beryan',
+  'Anya = Agnia',
+  'Yuan = Jokow',
+  'Lin = Prabowo',
+  'Terima kasih sudah bermain',
+];
+
+const heroHpMax = 5;
+const enemyHpMax = 5;
+let heroHp = heroHpMax;
+let enemyHp = enemyHpMax;
+let currentRound = 0;
+let attackCountHero = 0;
+let attackCountEnemy = 0;
+let openingStarted = false;
+let currentBattleKey = null;
+let creditsTimer = null;
+let dialogueIndex = 0;
+
 function showScreen(id) {
   screens.forEach((s) => s.classList.remove('active'));
   document.getElementById(id).classList.add('active');
 
+  const inBattle = id === 'battle-screen';
+  const inReward = id === 'reward-screen';
+  const inEncyclopedia = id === 'encyclopedia-screen';
+  const inLovePart = id === 'dialogue-screen' || id === 'credits-screen';
+
+  if (!inBattle) {
     battleBgm.pause();
     battleBgm.currentTime = 0;
   }
+
+  if (inReward && currentBattleKey) {
+    const cfg = battleConfigs[currentBattleKey];
+    rewardBgm.src = cfg.rewardAudio;
+    rewardBgm.currentTime = 0;
+    rewardBgm.volume = 1;
+    rewardBgm.play().catch(() => {});
+  } else {
+    rewardBgm.pause();
+    rewardBgm.currentTime = 0;
+  }
+
+  if (inEncyclopedia) {
+    encyclopediaBgm.volume = 0.35;
+    encyclopediaBgm.play().catch(() => {});
+  } else {
+    encyclopediaBgm.pause();
+    encyclopediaBgm.currentTime = 0;
+  }
+
+  if (inLovePart) {
+    loveBgm.volume = 0.4;
+    loveBgm.play().catch(() => {});
+  } else {
+    loveBgm.pause();
+    loveBgm.currentTime = 0;
+  }
 }
 
 function transitionTo(targetScreen, callback) {
   sceneFader.classList.add('active');
   setTimeout(() => {
     if (typeof callback === 'function') callback();
     showScreen(targetScreen);
     setTimeout(() => sceneFader.classList.remove('active'), 250);
   }, 550);
 }
 
 function startOpeningWithSound() {
   if (openingStarted) return;
   openingStarted = true;
 
   openingVideo.muted = false;
   openingVideo.volume = 1;
   openingVideo.currentTime = 0;
   openingVideo.play().catch(() => {
     openingVideo.muted = true;
     openingVideo.play().catch(() => {});
   });
 
   btnStartOpening.classList.add('hidden');
 }
 
 function skipOpening() {
   if (!openingScreen.classList.contains('active') || !openingStarted) return;
   openingVideo.pause();
   transitionTo('menu-screen');
 }
 
 function updateHpBars() {
+  heroHpFill.style.width = `${Math.max(0, (heroHp / heroHpMax) * 100)}%`;
+  enemyHpFill.style.width = `${Math.max(0, (enemyHp / enemyHpMax) * 100)}%`;
 }
 
 function showReaction(target, src) {
   target.src = src;
   target.classList.add('visible');
   setTimeout(() => target.classList.remove('visible'), 2200);
 }
 
 function showEffect(src, isHeroAttack) {
   attackEffect.src = src;
   attackEffect.classList.add('visible');
   attackEffect.classList.toggle('left-hit', !isHeroAttack);
   setTimeout(() => attackEffect.classList.remove('visible'), 1300);
 }
 
 function playAttackMotion(isHeroAttack) {
   const attacker = isHeroAttack ? heroIdle : enemyIdle;
   const defender = isHeroAttack ? enemyIdle : heroIdle;
 
   attacker.classList.remove('attack-lunge');
   defender.classList.remove('hit-shake');
 
   attacker.classList.add('attack-lunge');
   defender.classList.add('hit-shake');
 
   setTimeout(() => {
     attacker.classList.remove('attack-lunge');
     defender.classList.remove('hit-shake');
   }, 1000);
 }
 
+function setupBattleVisuals(config) {
+  heroName.textContent = config.heroName;
+  enemyName.textContent = config.enemyName;
+  enemyIdle.src = config.enemyIdle;
+  document.getElementById('battle-bg').src = config.background;
+  supportIdle.classList.toggle('hidden', !config.supportVisible);
+}
+
 function askQuestion() {
+  if (!currentBattleKey) return;
+  const config = battleConfigs[currentBattleKey];
+
+  if (currentRound >= config.rounds || heroHp <= 0 || enemyHp <= 0) {
     endBattle();
     return;
   }
 
+  const item = config.questions[currentRound % config.questions.length];
+  questionText.textContent = `Ronde ${currentRound + 1}/${config.rounds} — ${item.q}`;
   choicesWrap.innerHTML = '';
 
   item.choices.forEach((choice, idx) => {
     const btn = document.createElement('button');
     btn.textContent = choice;
     btn.onclick = () => answerQuestion(idx, item.answer);
     choicesWrap.appendChild(btn);
   });
 }
 
 function answerQuestion(selected, answer) {
+  if (!currentBattleKey) return;
+  const config = battleConfigs[currentBattleKey];
+
   const correct = selected === answer;
   currentRound += 1;
   choicesWrap.innerHTML = '';
 
   if (correct) {
     attackCountHero += 1;
     enemyHp -= 1;
+    battleLog.textContent = `Benar! ${config.heroName} menyerang ${config.enemyName}!`;
 
     const heroAttackAlt = attackCountHero % 2 === 0;
     showReaction(
       heroReaction,
       heroAttackAlt
         ? 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir_2.png'
         : 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir.png',
     );
+    showReaction(enemyReaction, config.enemyReactionHit);
     showEffect(attackCountHero % 2 === 0 ? 'effects/petir.PNG' : 'effects/api.png', true);
     playAttackMotion(true);
 
+    sfxEnemyHit.src = config.enemyHitSfx;
     sfxEnemyHit.currentTime = 0;
     sfxEnemyHit.volume = 1;
     sfxEnemyHit.play().catch(() => {});
   } else {
     attackCountEnemy += 1;
     heroHp -= 1;
+    battleLog.textContent = `Salah! ${config.enemyName} membalas serangan!`;
 
     const enemyAttackAlt = attackCountEnemy % 2 === 0;
     showReaction(
       enemyReaction,
+      enemyAttackAlt ? config.enemyReactionAttack2 : config.enemyReactionAttack1,
     );
     showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Terkena_serangan.png');
     showEffect(attackCountEnemy % 2 === 0 ? 'effects/Uang_petir.png' : 'effects/Uang_api.png', false);
     playAttackMotion(false);

+    sfxEnemyAttack.src = enemyAttackAlt ? config.enemyAttackSfx2 : config.enemyAttackSfx1;
     sfxEnemyAttack.currentTime = 0;
     sfxEnemyAttack.volume = 1;
     sfxEnemyAttack.play().catch(() => {});
   }
 
   updateHpBars();
+  setTimeout(askQuestion, 1900);
 }
 
 function endBattle() {
+  if (!currentBattleKey) return;
+  const config = battleConfigs[currentBattleKey];
   const heroWon = enemyHp <= heroHp;
 
   if (heroWon) {
+    battleLog.textContent = `Kemenangan! ${config.heroName} memenangkan ${config.title}.`;
     showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Menang.png');
+    showReaction(enemyReaction, config.enemyReactionLose);
+
+    sfxEnemyLose.src = config.enemyLoseSfx;
     sfxEnemyLose.currentTime = 0;
     sfxEnemyLose.volume = 1;
     sfxEnemyLose.play().catch(() => {});
 
+    if (currentBattleKey === 'ciawi') {
+      btnHutan.classList.add('blink');
+    }
+
     setTimeout(() => {
+      rewardImg.src = config.rewardImage;
+      btnRewardNext.textContent = config.rewardButtonText;
+      transitionTo('reward-screen');
     }, 2100);
   } else {
+    battleLog.textContent = `Kalah! ${config.enemyName} masih unggul. Coba lagi.`;
     showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Kalah.png');
+    showReaction(enemyReaction, config.enemyReactionWin);
     setTimeout(() => transitionTo('musou-screen'), 2100);
   }
 }
 
+function startBattle(modeKey) {
+  const config = battleConfigs[modeKey];
+  if (!config) return;
+
+  currentBattleKey = modeKey;
   heroHp = heroHpMax;
   enemyHp = enemyHpMax;
   currentRound = 0;
   attackCountHero = 0;
   attackCountEnemy = 0;
   updateHpBars();
 
+  setupBattleVisuals(config);
+
+  battleLog.textContent = `Pertempuran dimulai! Menangkan ${config.rounds} ronde untuk menang.`;
   transitionTo('battle-screen');
 
   battleBgm.volume = 0.2;
   battleBgm.currentTime = 0;
   battleBgm.play().catch(() => {});
 
   setTimeout(askQuestion, 1100);
 }
 
+function startTamatSequence() {
+  transitionTo('tamat-before-screen', () => {
+    tamatBeforeVideo.currentTime = 0;
+    tamatBeforeVideo.play().catch(() => {});
+  });
+}
+
+function startDialogue() {
+  dialogueIndex = 0;
+  renderDialogueScene();
+  transitionTo('dialogue-screen');
+}
+
+function renderDialogueScene() {
+  const scene = dialogueScenes[dialogueIndex];
+  if (!scene) {
+    startTamatAfter();
+    return;
+  }
+
+  zhaoDialogue.src = scene.zhaoReaction;
+  anyaDialogue.src = scene.anyaReaction;
+  zhaoLine.textContent = '...';
+  anyaLine.textContent = '...';
+  dialogueQuestion.textContent = `Pilihan ${dialogueIndex + 1}/3 — ${scene.question}`;
+  dialogueChoices.innerHTML = '';
+
+  scene.choices.forEach((choice) => {
+    const btn = document.createElement('button');
+    btn.textContent = choice.text;
+    btn.addEventListener('click', () => {
+      zhaoLine.textContent = choice.zhaoLine;
+      anyaLine.textContent = choice.anyaLine;
+      dialogueChoices.innerHTML = '';
+
+      const nextBtn = document.createElement('button');
+      nextBtn.textContent = dialogueIndex < dialogueScenes.length - 1 ? 'Lanjut Percakapan' : 'Akhiri Percakapan';
+      nextBtn.addEventListener('click', () => {
+        dialogueIndex += 1;
+        renderDialogueScene();
+      });
+      dialogueChoices.appendChild(nextBtn);
+    });
+    dialogueChoices.appendChild(btn);
+  });
+}
+
+function startTamatAfter() {
+  transitionTo('tamat-after-screen', () => {
+    tamatAfterVideo.currentTime = 0;
+    tamatAfterVideo.play().catch(() => {});
+  });
+}
+
+function startCredits() {
+  if (creditsTimer) clearInterval(creditsTimer);
+  creditsList.innerHTML = '';
+
+  let idx = 0;
+  creditsTimer = setInterval(() => {
+    if (idx >= creditsWords.length) {
+      clearInterval(creditsTimer);
+      creditsTimer = null;
+      return;
+    }
+
+    const line = document.createElement('p');
+    line.textContent = creditsWords[idx];
+    creditsList.appendChild(line);
+    idx += 1;
+  }, 700);
+
+  transitionTo('credits-screen');
+}
+
+function resetEncyclopediaView() {
+  encyclopediaMenu.classList.remove('hidden');
+  encyclopediaSubmenu.classList.add('hidden');
+  encyclopediaDetail.classList.add('hidden');
+}
+
+function showEncyclopediaSubmenu(categoryKey) {
+  const category = encyclopediaData[categoryKey];
+  if (!category) return;
+
+  encyclopediaMenu.classList.add('hidden');
+  encyclopediaDetail.classList.add('hidden');
+  encyclopediaSubmenu.classList.remove('hidden');
+  encyclopediaSubmenuTitle.textContent = category.title;
+  encyclopediaSubmenuList.innerHTML = '';
+
+  category.items.forEach((item) => {
+    const btn = document.createElement('button');
+    btn.textContent = item.title;
+    btn.addEventListener('click', () => showEncyclopediaDetail(item));
+    encyclopediaSubmenuList.appendChild(btn);
+  });
+}
+
+async function showEncyclopediaDetail(item) {
+  encyclopediaSubmenu.classList.add('hidden');
+  encyclopediaDetail.classList.remove('hidden');
+
+  encyclopediaDetailTitle.textContent = item.title;
+  encyclopediaDetailImage.src = item.image;
+  encyclopediaDetailBg.src = item.background;
+  encyclopediaDetailText.textContent = 'Memuat narasi...';
+
+  try {
+    const response = await fetch(item.textPath);
+    if (!response.ok) throw new Error('Gagal memuat narasi');
+    const text = await response.text();
+    encyclopediaDetailText.textContent = text.trim();
+  } catch {
+    encyclopediaDetailText.textContent = 'Narasi belum dapat dimuat saat ini.';
+  }
+}
+
 btnStartOpening.addEventListener('click', (event) => {
   event.stopPropagation();
   startOpeningWithSound();
 });
+
 btnMusou.addEventListener('click', () => showScreen('musou-screen'));
+btnEncyclopedia.addEventListener('click', () => {
+  showScreen('encyclopedia-screen');
+  resetEncyclopediaView();
+});
+btnCiawi.addEventListener('click', () => startBattle('ciawi'));
+btnHutan.addEventListener('click', () => startBattle('hutan'));
+
+btnRewardNext.addEventListener('click', () => {
+  if (currentBattleKey === 'hutan') {
+    startTamatSequence();
+    return;
+  }
+
+  transitionTo('menu-screen');
+});
+
+document.querySelectorAll('[data-ency-category]').forEach((btn) => {
+  btn.addEventListener('click', () => {
+    showEncyclopediaSubmenu(btn.getAttribute('data-ency-category'));
+  });
+});
+
+btnEncyBackMain.addEventListener('click', resetEncyclopediaView);
+btnEncyBackSub.addEventListener('click', () => {
+  encyclopediaDetail.classList.add('hidden');
+  encyclopediaSubmenu.classList.remove('hidden');
+});
 
 backButtons.forEach((btn) => {
   btn.addEventListener('click', () => {
     const target = btn.getAttribute('data-back');
     transitionTo(target);
   });
 });
 
+btnCreditsMenu.addEventListener('click', () => transitionTo('menu-screen'));
+
 openingScreen.addEventListener('click', skipOpening);
 document.addEventListener('keydown', skipOpening);
 openingVideo.addEventListener('ended', () => transitionTo('menu-screen'));
+tamatBeforeVideo.addEventListener('ended', startDialogue);
+tamatAfterVideo.addEventListener('ended', startCredits);
