const screens = document.querySelectorAll('.screen');
const openingScreen = document.getElementById('opening-screen');
const openingVideo = document.getElementById('opening-video');
const btnStartOpening = document.getElementById('btn-start-opening');
const btnSkipOpening = document.getElementById('btn-skip-opening');
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

/* ================= ENCYCLOPEDIA ELEMENTS ================= */

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

/* ================= DATA ================= */

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

/* ================= BATTLE SYSTEM ================= */

const heroHpMax = 4;
const enemyHpMax = 4;
let heroHp = heroHpMax;
let enemyHp = enemyHpMax;
let currentRound = 0;
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

/* ================= SCREEN CONTROL ================= */

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
    if (callback) callback();
    showScreen(targetScreen);
    setTimeout(() => sceneFader.classList.remove('active'), 250);
  }, 550);
}

function skipOpening() {
  if (!openingScreen.classList.contains('active')) return;

  openingVideo.pause();
  transitionTo('menu-screen');
}

function handleOpeningSkipInput() {
  if (!openingStarted) return;
  skipOpening();
}

/* ================= ENCYCLOPEDIA ================= */

function resetEncyclopediaView() {
  encyclopediaMenu.classList.remove('hidden');
  encyclopediaSubmenu.classList.add('hidden');
  encyclopediaDetail.classList.add('hidden');
}

function showEncyclopediaSubmenu(categoryKey) {
  const category = encyclopediaData[categoryKey];
  if (!category) return;

  encyclopediaMenu.classList.add('hidden');
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
    const text = await response.text();
    encyclopediaDetailText.textContent = text.trim();
  } catch {
    encyclopediaDetailText.textContent = 'Narasi belum dapat dimuat saat ini.';
  }
}

/* ================= BATTLE ================= */

function updateHpUI() {
  heroHpFill.style.width = `${(heroHp / heroHpMax) * 100}%`;
  enemyHpFill.style.width = `${(enemyHp / enemyHpMax) * 100}%`;
}

function endBattle(playerWins) {
  if (playerWins) {
    battleLog.textContent = 'Musuh kalah! Menuju hadiah...';
    setTimeout(() => transitionTo('reward-screen'), 900);
    return;
  }

  battleLog.textContent = 'Kamu kalah. Kembali ke menu...';
  setTimeout(() => transitionTo('menu-screen'), 900);
}

function enemyTurn() {
  heroHp = Math.max(0, heroHp - 1);
  updateHpUI();
  battleLog.textContent = 'Jawaban salah! Musuh menyerang balik.';
  sfxEnemyAttack.currentTime = 0;
  sfxEnemyAttack.play().catch(() => {});

  if (heroHp <= 0) {
    endBattle(false);
    return;
  }

  currentRound += 1;
  renderQuestion();
}

function handleAnswer(selectedIndex) {
  const question = questions[currentRound];
  const isCorrect = selectedIndex === question.answer;

  if (isCorrect) {
    enemyHp = Math.max(0, enemyHp - 1);
    updateHpUI();
    battleLog.textContent = 'Jawaban benar! Musuh terkena serangan.';
    sfxEnemyHit.currentTime = 0;
    sfxEnemyHit.play().catch(() => {});

    if (enemyHp <= 0) {
      sfxEnemyLose.currentTime = 0;
      sfxEnemyLose.play().catch(() => {});
      endBattle(true);
      return;
    }

    currentRound += 1;
    renderQuestion();
    return;
  }

  enemyTurn();
}

function renderQuestion() {
  if (currentRound >= questions.length) {
    currentRound = 0;
  }

  const question = questions[currentRound];
  questionText.textContent = question.q;
  choicesWrap.innerHTML = '';

  question.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => handleAnswer(index));
    choicesWrap.appendChild(button);
  });
}

function startBattle() {
  heroHp = heroHpMax;
  enemyHp = enemyHpMax;
  currentRound = 0;

  updateHpUI();
  renderQuestion();
  battleLog.textContent = 'Jawab pertanyaan dengan benar untuk menyerang!';

  battleBgm.currentTime = 0;
  battleBgm.volume = 0.35;
  battleBgm.play().catch(() => {});

  heroIdle.classList.remove('muted');
  enemyIdle.classList.remove('muted');
  heroReaction.classList.remove('active');
  enemyReaction.classList.remove('active');
  attackEffect.classList.remove('active');

  transitionTo('battle-screen');
}

/* ================= EVENTS ================= */

btnStartOpening.addEventListener('click', (event) => {
  event.stopPropagation();
  openingStarted = true;
  openingVideo.muted = false;
  openingVideo.play().catch(() => {});
  btnStartOpening.classList.add('hidden');
    btnSkipOpening.classList.remove('hidden');
});

btnSkipOpening.addEventListener('click', (event) => {
  event.stopPropagation();
  skipOpening();
});

openingScreen.addEventListener('click', handleOpeningSkipInput);
document.addEventListener('keydown', handleOpeningSkipInput);
document.addEventListener('touchstart', handleOpeningSkipInput, { passive: true });
openingVideo.addEventListener('ended', () => transitionTo('menu-screen'));

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
