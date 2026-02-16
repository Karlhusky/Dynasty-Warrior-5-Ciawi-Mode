const screens = document.querySelectorAll('.screen');
const openingScreen = document.getElementById('opening-screen');
const openingVideo = document.getElementById('opening-video');
const btnStartOpening = document.getElementById('btn-start-opening');
const btnMusou = document.getElementById('btn-musou');
const btnEncyclopedia = document.getElementById('btn-encyclopedia');
const btnCiawi = document.getElementById('btn-ciawi');
const backButtons = document.querySelectorAll('.back');

const battleBgm = document.getElementById('bgm-battle');
const sfxEnemyAttack = document.getElementById('sfx-enemy-attack');
const sfxEnemyHit = document.getElementById('sfx-enemy-hit');
const sfxEnemyLose = document.getElementById('sfx-enemy-lose');
const rewardBgm = document.getElementById('bgm-reward');
const encyclopediaBgm = document.getElementById('bgm-encyclopedia');

const heroIdle = document.getElementById('hero-idle');
const enemyIdle = document.getElementById('enemy-idle');
const heroHpFill = document.getElementById('hero-hp');
const enemyHpFill = document.getElementById('enemy-hp');
const heroReaction = document.getElementById('hero-reaction');
const enemyReaction = document.getElementById('enemy-reaction');
const attackEffect = document.getElementById('attack-effect');
const questionText = document.getElementById('question-text');
const choicesWrap = document.getElementById('choices');
const battleLog = document.getElementById('battle-log');
const sceneFader = document.getElementById('scene-fader');

const encyclopediaMenu = document.getElementById('encyclopedia-menu');
const encyclopediaSubmenu = document.getElementById('encyclopedia-submenu');
const encyclopediaSubmenuTitle = document.getElementById('ency-submenu-title');
const encyclopediaSubmenuList = document.getElementById('ency-submenu-list');
const encyclopediaDetail = document.getElementById('encyclopedia-detail');
const encyclopediaDetailTitle = document.getElementById('ency-detail-title');
const encyclopediaDetailImage = document.getElementById('ency-detail-image');
const encyclopediaDetailText = document.getElementById('ency-detail-text');
const encyclopediaDetailBg = document.getElementById('ency-detail-bg');
const btnEncyBackMain = document.getElementById('btn-ency-back-main');
const btnEncyBackSub = document.getElementById('btn-ency-back-sub');

const encyclopediaData = {
  pertempuran: {
    title: 'Pertempuran',
    items: [
      {
        title: 'Pertempuran Ciawi',
        image: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.png',
        textPath: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.txt',
        background: 'Musou_mode/Background.png',
      },
      {
        title: 'Ekspedisi Hutan Selatan',
        image: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.png',
        textPath: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.txt',
        background: 'Musou_mode/Background2.png',
      },
    ],
  },
  tokoh: {
    title: 'Tokoh',
    items: [
      {
        title: 'Anya',
        image: 'Encyclopedia/Tokoh/Anya/Karakter2.png',
        textPath: 'Encyclopedia/Tokoh/Anya/Anya.txt',
        background: 'Musou_mode/Tamat/Background_cinta.png',
      },
      {
        title: 'Lin',
        image: 'Encyclopedia/Tokoh/Lin/Musuh2.png',
        textPath: 'Encyclopedia/Tokoh/Lin/Lin.txt',
        background: 'Musou_mode/Background2.png',
      },
      {
         title: 'Yuan',
        image: 'Encyclopedia/Tokoh/Yuan/Musuh1.png',
        textPath: 'Encyclopedia/Tokoh/Yuan/Yuan.txt',
        background: 'Musou_mode/Background.png',
      },
      {
        title: 'Zhao',
        image: 'Encyclopedia/Tokoh/Zhao/Karakter1.png',
        textPath: 'Encyclopedia/Tokoh/Zhao/Zhao.txt',
        background: 'Musou_mode/Tamat/Background_cinta.png',
      },
    ],
  },
};

const heroHpMax = 4;
const enemyHpMax = 4;
let heroHp = heroHpMax;
let enemyHp = enemyHpMax;
let currentRound = 0;
let attackCountHero = 0;
let attackCountEnemy = 0;
let openingStarted = false;

const questions = [
  {
    q: 'Pulau terbesar di Indonesia adalah...',
    choices: ['Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi'],
    answer: 2,
  },
  {
    q: 'Siapa proklamator kemerdekaan Indonesia?',
    choices: ['R.A. Kartini', 'Soekarno', 'Diponegoro', 'Cut Nyak Dien'],
    answer: 1,
  },
  {
    q: 'Candi Borobudur terletak di provinsi...',
    choices: ['Jawa Tengah', 'Bali', 'Jawa Barat', 'Banten'],
    answer: 0,
  },
  {
    q: 'Selat yang memisahkan Jawa dan Sumatra adalah...',
    choices: ['Selat Sunda', 'Selat Makassar', 'Selat Bali', 'Selat Karimata'],
    answer: 0,
  },
];

function showScreen(id) {
  screens.forEach((s) => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  
  const inBattle = id === 'battle-screen';
  const inReward = id === 'reward-screen';
  const inEncyclopedia = id === 'encyclopedia-screen';

  if (!inBattle) {
    battleBgm.pause();
    battleBgm.currentTime = 0;
  }

  if (inReward) {
    rewardBgm.currentTime = 0;
    rewardBgm.volume = 1;
    rewardBgm.play().catch(() => {});
  } else {
    rewardBgm.pause();
    rewardBgm.currentTime = 0;
  }

  if (inEncyclopedia) {
    encyclopediaBgm.volume = 0.35;
    encyclopediaBgm.play().catch(() => {});
  } else {
    encyclopediaBgm.pause();
    encyclopediaBgm.currentTime = 0;
  }
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
  heroHpFill.style.width = `${(heroHp / heroHpMax) * 100}%`;
  enemyHpFill.style.width = `${(enemyHp / enemyHpMax) * 100}%`;
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

function askQuestion() {
  if (currentRound >= 4 || heroHp <= 0 || enemyHp <= 0) {
    endBattle();
    return;
  }

  const item = questions[currentRound % questions.length];
  questionText.textContent = `Ronde ${currentRound + 1}/4 — ${item.q}`;
  choicesWrap.innerHTML = '';

  item.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => answerQuestion(idx, item.answer);
    choicesWrap.appendChild(btn);
  });
}

function answerQuestion(selected, answer) {
  const correct = selected === answer;
  currentRound += 1;
  choicesWrap.innerHTML = '';

  if (correct) {
    attackCountHero += 1;
    enemyHp -= 1;
    battleLog.textContent = 'Benar! Zhào Bóyán Shànbà menyerang Yuán Qīguó!';

    const heroAttackAlt = attackCountHero % 2 === 0;
    showReaction(
      heroReaction,
      heroAttackAlt
        ? 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir_2.png'
        : 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir.png',
    );
    showReaction(enemyReaction, 'Musou_mode/Musuh1/Terkena_serangan.png');
    showEffect(attackCountHero % 2 === 0 ? 'effects/petir.PNG' : 'effects/api.png', true);
    playAttackMotion(true);

    sfxEnemyHit.currentTime = 0;
    sfxEnemyHit.volume = 1;
    sfxEnemyHit.play().catch(() => {});
  } else {
    attackCountEnemy += 1;
    heroHp -= 1;
    battleLog.textContent = 'Salah! Yuán Qīguó membalas serangan!';

    const enemyAttackAlt = attackCountEnemy % 2 === 0;
    showReaction(
      enemyReaction,
      enemyAttackAlt ? 'Musou_mode/Musuh1/Menyerang2.png' : 'Musou_mode/Musuh1/Menyerang.png',
    );
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Terkena_serangan.png');
    showEffect(attackCountEnemy % 2 === 0 ? 'effects/Uang_petir.png' : 'effects/Uang_api.png', false);
    playAttackMotion(false);

    sfxEnemyAttack.src = enemyAttackAlt ? 'Musou_mode/Musuh1/Attack2.mp3' : 'Musou_mode/Musuh1/Attack1.mp3';
    sfxEnemyAttack.currentTime = 0;
    sfxEnemyAttack.volume = 1;
    sfxEnemyAttack.play().catch(() => {});
  }

  updateHpBars();
  setTimeout(askQuestion, 2000);
}

function endBattle() {
  const heroWon = enemyHp <= heroHp;

  if (heroWon) {
    battleLog.textContent = 'Kemenangan! Zhào Bóyán Shànbà memenangkan Pertempuran Ciawi.';
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Menang.png');
    showReaction(enemyReaction, 'Musou_mode/Musuh1/Kalah.png');
    sfxEnemyLose.currentTime = 0;
    sfxEnemyLose.volume = 1;
    sfxEnemyLose.play().catch(() => {});

    setTimeout(() => {
      transitionTo('reward-screen');
    }, 2100);
  } else {
    battleLog.textContent = 'Kalah! Yuán Qīguó masih unggul. Coba lagi dari menu Musou.';
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Kalah.png');
    showReaction(enemyReaction, 'Musou_mode/Musuh1/Menang.png');
    setTimeout(() => transitionTo('musou-screen'), 2100);
  }
}

function startBattle() {
  heroHp = heroHpMax;
  enemyHp = enemyHpMax;
  currentRound = 0;
  attackCountHero = 0;
  attackCountEnemy = 0;
  updateHpBars();

  battleLog.textContent = 'Pertempuran dimulai! Jawab 4 soal untuk menentukan pemenang.';
  transitionTo('battle-screen');

  battleBgm.volume = 0.2;
  battleBgm.currentTime = 0;
  battleBgm.play().catch(() => {});

  setTimeout(askQuestion, 1100);
}

function resetEncyclopediaView() {
  encyclopediaMenu.classList.remove('hidden');
  encyclopediaSubmenu.classList.add('hidden');
  encyclopediaDetail.classList.add('hidden');
}

function showEncyclopediaSubmenu(categoryKey) {
  const category = encyclopediaData[categoryKey];
  if (!category) return;

  encyclopediaMenu.classList.add('hidden');
  encyclopediaDetail.classList.add('hidden');
  encyclopediaSubmenu.classList.remove('hidden');
  encyclopediaSubmenuTitle.textContent = category.title;
  encyclopediaSubmenuList.innerHTML = '';

  category.items.forEach((item) => {
    const btn = document.createElement('button');
    btn.textContent = item.title;
    btn.addEventListener('click', () => showEncyclopediaDetail(item));
    encyclopediaSubmenuList.appendChild(btn);
  });
}

async function showEncyclopediaDetail(item) {
  encyclopediaSubmenu.classList.add('hidden');
  encyclopediaDetail.classList.remove('hidden');

  encyclopediaDetailTitle.textContent = item.title;
  encyclopediaDetailImage.src = item.image;
  encyclopediaDetailBg.src = item.background;
  encyclopediaDetailText.textContent = 'Memuat narasi...';

  try {
    const response = await fetch(item.textPath);
    if (!response.ok) throw new Error('Gagal memuat narasi');
    const text = await response.text();
    encyclopediaDetailText.textContent = text.trim();
  } catch {
    encyclopediaDetailText.textContent = 'Narasi belum dapat dimuat saat ini.';
  }
}

btnStartOpening.addEventListener('click', (event) => {
  event.stopPropagation();
  startOpeningWithSound();
});
btnMusou.addEventListener('click', () => showScreen('musou-screen'));
btnEncyclopedia.addEventListener('click', () => {
  showScreen('encyclopedia-screen');
  resetEncyclopediaView();
});
btnCiawi.addEventListener('click', startBattle);

document.querySelectorAll('[data-ency-category]').forEach((btn) => {
  btn.addEventListener('click', () => {
    showEncyclopediaSubmenu(btn.getAttribute('data-ency-category'));
  });
});

btnEncyBackMain.addEventListener('click', resetEncyclopediaView);
btnEncyBackSub.addEventListener('click', () => {
  encyclopediaDetail.classList.add('hidden');
  encyclopediaSubmenu.classList.remove('hidden');
});

backButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-back');
    transitionTo(target);
  });
});

openingScreen.addEventListener('click', skipOpening);
document.addEventListener('keydown', skipOpening);
openingVideo.addEventListener('ended', () => transitionTo('menu-screen'));
