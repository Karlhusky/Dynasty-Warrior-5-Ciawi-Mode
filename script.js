const screens = document.querySelectorAll('.screen');
const openingScreen = document.getElementById('opening-screen');
const openingVideo = document.getElementById('opening-video');
const btnMusou = document.getElementById('btn-musou');
const btnEncyclopedia = document.getElementById('btn-encyclopedia');
const btnCiawi = document.getElementById('btn-ciawi');
const backButtons = document.querySelectorAll('.back');

const battleBgm = document.getElementById('bgm-battle');
const sfxEnemyAttack = document.getElementById('sfx-enemy-attack');
const sfxEnemyHit = document.getElementById('sfx-enemy-hit');
const sfxEnemyLose = document.getElementById('sfx-enemy-lose');

const heroHpFill = document.getElementById('hero-hp');
const enemyHpFill = document.getElementById('enemy-hp');
const heroReaction = document.getElementById('hero-reaction');
const enemyReaction = document.getElementById('enemy-reaction');
const attackEffect = document.getElementById('attack-effect');
const questionText = document.getElementById('question-text');
const choicesWrap = document.getElementById('choices');
const battleLog = document.getElementById('battle-log');

const heroHpMax = 4;
const enemyHpMax = 4;
let heroHp = heroHpMax;
let enemyHp = enemyHpMax;
let currentRound = 0;
let attackCountHero = 0;
let attackCountEnemy = 0;

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

  if (id !== 'battle-screen') {
    battleBgm.pause();
    battleBgm.currentTime = 0;
  }
}

function tryPlayOpening() {
  openingVideo.muted = false;
  openingVideo.play().catch(() => {
    openingVideo.muted = true;
    openingVideo.play().catch(() => {});
  });
}

function skipOpening() {
  if (!openingScreen.classList.contains('active')) return;
  openingVideo.pause();
  showScreen('menu-screen');
}

function updateHpBars() {
  heroHpFill.style.width = `${(heroHp / heroHpMax) * 100}%`;
  enemyHpFill.style.width = `${(enemyHp / enemyHpMax) * 100}%`;
}

function showReaction(target, src) {
  target.src = src;
  target.classList.add('visible');
  setTimeout(() => target.classList.remove('visible'), 1300);
}

function showEffect(src, isHeroAttack) {
  attackEffect.src = src;
  attackEffect.classList.add('visible');
  attackEffect.classList.toggle('left-hit', !isHeroAttack);
  setTimeout(() => attackEffect.classList.remove('visible'), 500);
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

    sfxEnemyAttack.src = enemyAttackAlt ? 'Musou_mode/Musuh1/Attack2.mp3' : 'Musou_mode/Musuh1/Attack1.mp3';
    sfxEnemyAttack.currentTime = 0;
    sfxEnemyAttack.volume = 1;
    sfxEnemyAttack.play().catch(() => {});
  }

  updateHpBars();
  setTimeout(askQuestion, 1100);
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
      showScreen('reward-screen');
    }, 1800);
  } else {
    battleLog.textContent = 'Kalah! Yuán Qīguó masih unggul. Coba lagi dari menu Musou.';
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Kalah.png');
    showReaction(enemyReaction, 'Musou_mode/Musuh1/Menang.png');
    setTimeout(() => showScreen('musou-screen'), 1800);
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
  showScreen('battle-screen');

  battleBgm.volume = 0.22;
  battleBgm.currentTime = 0;
  battleBgm.play().catch(() => {});

  setTimeout(askQuestion, 700);
}

btnMusou.addEventListener('click', () => showScreen('musou-screen'));
btnEncyclopedia.addEventListener('click', () => showScreen('encyclopedia-screen'));
btnCiawi.addEventListener('click', startBattle);

backButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-back');
    showScreen(target);
  });
});

openingScreen.addEventListener('click', skipOpening);
document.addEventListener('keydown', skipOpening);
openingVideo.addEventListener('ended', skipOpening);

tryPlayOpening();
