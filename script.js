const screens = document.querySelectorAll('.screen');
const openingScreen = document.getElementById('opening-screen');
const openingVideo = document.getElementById('opening-video');
const btnStartOpening = document.getElementById('btn-start-opening');
const btnMusou = document.getElementById('btn-musou');
const btnEncyclopedia = document.getElementById('btn-encyclopedia');
const btnCiawi = document.getElementById('btn-ciawi');
const btnHutan = document.getElementById('btn-hutan');
const backButtons = document.querySelectorAll('.back');

const battleBgm = document.getElementById('bgm-battle');
const sfxEnemyAttack = document.getElementById('sfx-enemy-attack');
const sfxEnemyHit = document.getElementById('sfx-enemy-hit');
const sfxEnemyLose = document.getElementById('sfx-enemy-lose');
const rewardBgm = document.getElementById('bgm-reward');
const encyclopediaBgm = document.getElementById('bgm-encyclopedia');
const loveBgm = document.getElementById('bgm-love');

const heroIdle = document.getElementById('hero-idle');
const supportIdle = document.getElementById('support-idle');
const enemyIdle = document.getElementById('enemy-idle');
const heroName = document.getElementById('hero-name');
const enemyName = document.getElementById('enemy-name');
const heroHpFill = document.getElementById('hero-hp');
const enemyHpFill = document.getElementById('enemy-hp');
const heroReaction = document.getElementById('hero-reaction');
const enemyReaction = document.getElementById('enemy-reaction');
const attackEffect = document.getElementById('attack-effect');
const questionText = document.getElementById('question-text');
const choicesWrap = document.getElementById('choices');
const battleLog = document.getElementById('battle-log');
const sceneFader = document.getElementById('scene-fader');

const rewardImg = document.getElementById('reward-img');
const btnRewardNext = document.getElementById('btn-reward-next');

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

const tamatBeforeVideo = document.getElementById('tamat-before-video');
const tamatAfterVideo = document.getElementById('tamat-after-video');
const zhaoDialogue = document.getElementById('zhao-dialogue');
const anyaDialogue = document.getElementById('anya-dialogue');
const zhaoLine = document.getElementById('zhao-line');
const anyaLine = document.getElementById('anya-line');
const dialogueQuestion = document.getElementById('dialogue-question');
const dialogueChoices = document.getElementById('dialogue-choices');

const creditsList = document.getElementById('credits-list');
const btnCreditsMenu = document.getElementById('btn-credits-menu');

const heroHpMax = 5;
const enemyHpMax = 5;
let heroHp = heroHpMax;
let enemyHp = enemyHpMax;
let currentRound = 0;
let attackCountHero = 0;
let attackCountEnemy = 0;
let openingStarted = false;
let currentBattleKey = null;
let creditsTimer = null;
let dialogueIndex = 0;

/* ================= SCREEN CONTROL ================= */

function showScreen(id) {
  screens.forEach((s) => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const inBattle = id === 'battle-screen';
  const inReward = id === 'reward-screen';
  const inEncyclopedia = id === 'encyclopedia-screen';
  const inLovePart = id === 'dialogue-screen' || id === 'credits-screen';

  if (!inBattle) {
    battleBgm.pause();
    battleBgm.currentTime = 0;
  }

  if (!inReward) {
    rewardBgm.pause();
    rewardBgm.currentTime = 0;
  }

  if (!inEncyclopedia) {
    encyclopediaBgm.pause();
    encyclopediaBgm.currentTime = 0;
  }

  if (!inLovePart) {
    loveBgm.pause();
    loveBgm.currentTime = 0;
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

/* ================= BATTLE SYSTEM ================= */

function updateHpBars() {
  heroHpFill.style.width = `${Math.max(0, (heroHp / heroHpMax) * 100)}%`;
  enemyHpFill.style.width = `${Math.max(0, (enemyHp / enemyHpMax) * 100)}%`;
}

function endBattle() {
  const heroWon = enemyHp <= heroHp;

  if (heroWon) {
    battleLog.textContent = 'Kemenangan!';
    sfxEnemyLose.currentTime = 0;
    sfxEnemyLose.play().catch(() => {});
    setTimeout(() => transitionTo('reward-screen'), 2000);
  } else {
    battleLog.textContent = 'Kalah! Coba lagi.';
    setTimeout(() => transitionTo('musou-screen'), 2000);
  }
}

function startBattle() {
  heroHp = heroHpMax;
  enemyHp = enemyHpMax;
  currentRound = 0;
  attackCountHero = 0;
  attackCountEnemy = 0;
  updateHpBars();
  battleLog.textContent = 'Pertempuran dimulai!';
  transitionTo('battle-screen');
  battleBgm.volume = 0.2;
  battleBgm.play().catch(() => {});
}

/* ================= DIALOGUE ================= */

function startDialogue() {
  dialogueIndex = 0;
  transitionTo('dialogue-screen');
}

function startCredits() {
  creditsList.innerHTML = '';
  const lines = [
    '=== CREDITS ===',
    'Campaign Selatan Tamat',
    'Terima kasih sudah bermain',
  ];

  let i = 0;
  creditsTimer = setInterval(() => {
    if (i >= lines.length) {
      clearInterval(creditsTimer);
      return;
    }
    const p = document.createElement('p');
    p.textContent = lines[i];
    creditsList.appendChild(p);
    i++;
  }, 700);

  transitionTo('credits-screen');
}

/* ================= EVENTS ================= */

btnStartOpening.addEventListener('click', (e) => {
  e.stopPropagation();
  openingStarted = true;
  openingVideo.muted = false;
  openingVideo.play().catch(() => {});
  btnStartOpening.classList.add('hidden');
});

btnMusou.addEventListener('click', () => showScreen('musou-screen'));

btnEncyclopedia.addEventListener('click', () => {
  showScreen('encyclopedia-screen');
});

btnCiawi.addEventListener('click', startBattle);
btnHutan.addEventListener('click', startBattle);

btnRewardNext.addEventListener('click', () => {
  transitionTo('menu-screen');
});

btnCreditsMenu.addEventListener('click', () =>
  transitionTo('menu-screen')
);

backButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-back');
    transitionTo(target);
  });
});

openingScreen.addEventListener('click', () => {
  if (!openingStarted) return;
  openingVideo.pause();
  transitionTo('menu-screen');
});

openingVideo.addEventListener('ended', () =>
  transitionTo('menu-screen')
);

tamatBeforeVideo.addEventListener('ended', startDialogue);
tamatAfterVideo.addEventListener('ended', startCredits);
