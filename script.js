const screens = document.querySelectorAll('.screen');
const openingScreen = document.getElementById('opening-screen');
const openingVideo = document.getElementById('opening-video');
const btnStartOpening = document.getElementById('btn-start-opening');
const btnMusou = document.getElementById('btn-musou');
const btnEncyclopedia = document.getElementById('btn-encyclopedia');
const btnCiawi = document.getElementById('btn-ciawi');
const btnHutan = document.getElementById('btn-hutan');
const btnEncyBattle = document.getElementById('btn-ency-battle');
const btnEncyCharacter = document.getElementById('btn-ency-character');
const encyItemButtons = document.querySelectorAll('.ency-item');
const backButtons = document.querySelectorAll('.back');

const battleBgm = document.getElementById('bgm-battle');
const encyclopediaBgm = document.getElementById('bgm-ency');
const dialogueBgm = document.getElementById('bgm-dialogue');
const rewardBgm = document.getElementById('bgm-reward');
const sfxEnemyAttack = document.getElementById('sfx-enemy-attack');
const sfxEnemyHit = document.getElementById('sfx-enemy-hit');
const sfxEnemyLose = document.getElementById('sfx-enemy-lose');

const heroName = document.getElementById('hero-name');
const enemyName = document.getElementById('enemy-name');
const battleBg = document.getElementById('battle-bg');
const heroIdle = document.getElementById('hero-idle');
const enemyIdle = document.getElementById('enemy-idle');
const capturedIdle = document.getElementById('captured-idle');
const heroHpFill = document.getElementById('hero-hp');
const enemyHpFill = document.getElementById('enemy-hp');
const heroReaction = document.getElementById('hero-reaction');
const enemyReaction = document.getElementById('enemy-reaction');
const capturedReaction = document.getElementById('captured-reaction');
const attackEffect = document.getElementById('attack-effect');
const questionText = document.getElementById('question-text');
const choicesWrap = document.getElementById('choices');
const battleLog = document.getElementById('battle-log');
const sceneFader = document.getElementById('scene-fader');

const rewardImg = document.getElementById('reward-img');
const endingVideo = document.getElementById('ending-video');
const dialogueZhao = document.getElementById('dialogue-zhao');
const dialogueAnya = document.getElementById('dialogue-anya');
const dialogueBubble = document.getElementById('dialogue-bubble');
const dialogueText = document.getElementById('dialogue-text');
const dialogueNext = document.getElementById('dialogue-next');

const encyBg = document.getElementById('ency-bg');
const encyTitle = document.getElementById('ency-title');
const encyImage = document.getElementById('ency-image');
const encyText = document.getElementById('ency-text');
const encyDetailBack = document.getElementById('ency-detail-back');

let heroHpMax = 4;
let enemyHpMax = 4;
let heroHp = heroHpMax;
let enemyHp = enemyHpMax;
let currentRound = 0;
let attackCountHero = 0;
let attackCountEnemy = 0;
let correctCount = 0;
let openingStarted = false;
let currentBattle = 'ciawi';
let pendingEndingSequence = false;
let dialogueIndex = 0;
let activeDialogue = [];

const encyclopediaData = {
  battle: {
    ciawi: {
      title: 'Pertempuran Ciawi',
      image: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.png',
      textPath: 'Encyclopedia/Pertempuran/Pertempuran_Ciawi/Pertempuran_Ciawi.txt',
      bg: 'Musou_mode/Background.png',
      backTo: 'ency-battle-screen',
    },
    hutan: {
      title: 'Ekspedisi Hutan Selatan',
      image: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.png',
      textPath: 'Encyclopedia/Pertempuran/Ekspedisi_Hutan_Selatan/Ekspedisi_Hutan_Selatan.txt',
      bg: 'Musou_mode/Background2.png',
      backTo: 'ency-battle-screen',
    },
  },
  tokoh: {
    anya: {
      title: 'Anya',
      image: 'Encyclopedia/Tokoh/Anya/Karakter2.png',
      textPath: 'Encyclopedia/Tokoh/Anya/Anya.txt',
      bg: 'Musou_mode/Tamat/Background_cinta.png',
      backTo: 'ency-character-screen',
    },
    lin: {
      title: 'Lín Zōng’è',
      image: 'Encyclopedia/Tokoh/Lin/Musuh2.png',
      textPath: 'Encyclopedia/Tokoh/Lin/Lin.txt',
      bg: 'Musou_mode/Background2.png',
      backTo: 'ency-character-screen',
    },
    yuan: {
      title: 'Yuán Qīguó',
      image: 'Encyclopedia/Tokoh/Yuan/Musuh1.png',
      textPath: 'Encyclopedia/Tokoh/Yuan/Yuan.txt',
      bg: 'Musou_mode/Background.png',
      backTo: 'ency-character-screen',
    },
    zhao: {
      title: 'Zhào Bóyán Shànbà',
      image: 'Encyclopedia/Tokoh/Zhao/Karakter1.png',
      textPath: 'Encyclopedia/Tokoh/Zhao/Zhao.txt',
      bg: 'Musou_mode/Tamat/Background_cinta.png',
      backTo: 'ency-character-screen',
    },
  },
};

const battleConfig = {
  ciawi: {
    enemyName: 'Yuán Qīguó',
    enemyIdle: 'Musou_mode/Musuh1/Musuh1.png',
    bg: 'Musou_mode/Background.png',
    enemyAttack1: 'Musou_mode/Musuh1/Menyerang.png',
    enemyAttack2: 'Musou_mode/Musuh1/Menyerang2.png',
    enemyHit: 'Musou_mode/Musuh1/Terkena_serangan.png',
    enemyWin: 'Musou_mode/Musuh1/Menang.png',
    enemyLose: 'Musou_mode/Musuh1/Kalah.png',
    enemyAttackSfx1: 'Musou_mode/Musuh1/Attack1.mp3',
    enemyAttackSfx2: 'Musou_mode/Musuh1/Attack2.mp3',
    enemyHitSfx: 'Musou_mode/Musuh1/Attacked.mp3',
    enemyLoseSfx: 'Musou_mode/Musuh1/Lose.mp3',
    heroAttack2: 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir_2.png',
    heroFxOdd: 'effects/api.png',
    heroFxEven: 'effects/petir.PNG',
    enemyFxOdd: 'effects/Uang_api.png',
    enemyFxEven: 'effects/Uang_petir.png',
    showCaptured: false,
    questionPool: [
      { q: 'Pulau terbesar di Indonesia adalah...', choices: ['Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi'], answer: 2 },
      { q: 'Siapa proklamator kemerdekaan Indonesia?', choices: ['R.A. Kartini', 'Soekarno', 'Diponegoro', 'Cut Nyak Dien'], answer: 1 },
      { q: 'Candi Borobudur terletak di provinsi...', choices: ['Jawa Tengah', 'Bali', 'Jawa Barat', 'Banten'], answer: 0 },
      { q: 'Selat yang memisahkan Jawa dan Sumatra adalah...', choices: ['Selat Sunda', 'Selat Makassar', 'Selat Bali', 'Selat Karimata'], answer: 0 },
    ],
    rewardImg: 'Musou_mode/Hadiah_Musuh1.png',
    rewardBgm: 'Musou_mode/Hadiah_Musuh1.mp3',
    rewardAutoNext: false,
  },
  hutan: {
    enemyName: 'Lín Zōng’è',
    enemyIdle: 'Musou_mode/Musuh2/Musuh2.png',
    bg: 'Musou_mode/Background2.png',
    enemyAttack1: 'Musou_mode/Musuh2/Menyerang.png',
    enemyAttack2: 'Musou_mode/Musuh2/Menyerang.png',
    enemyHit: 'Musou_mode/Musuh2/Kaget.png',
    enemyWin: 'Musou_mode/Musuh2/Biasa].png',
    enemyLose: 'Musou_mode/Musuh2/Kalah.png',
    enemyAttackSfx1: 'Musou_mode/Musuh2/Attack1.mp3',
    enemyAttackSfx2: 'Musou_mode/Musuh2/Attack2.mp3',
    enemyHitSfx: 'Musou_mode/Musuh2/Attacked.mp3',
    enemyLoseSfx: 'Musou_mode/Musuh2/Lose.mp3',
    heroAttack2: 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir_2.png',
    heroFxOdd: 'effects/api.png',
    heroFxEven: 'effects/petir.PNG',
    enemyFxOdd: 'effects/Sawit_api.png',
    enemyFxEven: 'effects/Sawit_petir.png',
    showCaptured: true,
    questionPool: [
      { q: 'Kerajaan Majapahit mencapai puncak kejayaan pada masa...', choices: ['Hayam Wuruk', 'Ken Arok', 'Mulawarman', 'Airlangga'], answer: 0 },
      { q: 'Gunung tertinggi di Indonesia adalah...', choices: ['Semeru', 'Rinjani', 'Puncak Jaya', 'Kerinci'], answer: 2 },
      { q: 'Peristiwa Sumpah Pemuda terjadi pada tahun...', choices: ['1908', '1928', '1945', '1966'], answer: 1 },
      { q: 'Selat Makassar memisahkan Pulau...', choices: ['Jawa dan Bali', 'Kalimantan dan Sulawesi', 'Sumatra dan Kalimantan', 'Papua dan Maluku'], answer: 1 },
    ],
    rewardImg: 'Musou_mode/Hadiah_Musuh2.png',
    rewardBgm: 'Musou_mode/Hadiah_Musuh2.mp3',
    rewardAutoNext: true,
  },
};

const dialogueScript = [
  {
    speaker: 'zhao',
    text: 'Anya! Akhirnya aku menemukanmu di Hutan Selatan. Aku khawatir sekali.',
    zhao: 'Musou_mode/Karakter1/Karakter1/Percakapan/Kaget.png',
    anya: 'Musou_mode/Karakter2/Kaget.png',
  },
  {
    speaker: 'anya',
    text: 'Zhao... aku sempat takut. Tapi waktu melihatmu datang, aku jadi tenang.',
    zhao: 'Musou_mode/Karakter1/Karakter1/Percakapan/Penasaran.png',
    anya: 'Musou_mode/Karakter2/Biasa.png',
  },
  {
    speaker: 'zhao',
    text: 'Aku berjanji tidak akan membiarkanmu sendirian lagi. Kita pulang bersama.',
    zhao: 'Musou_mode/Karakter1/Karakter1/Percakapan/Biasa.png',
    anya: 'Musou_mode/Karakter2/Bahagia.png',
  },
  {
    speaker: 'anya',
    text: 'Terima kasih, Zhao. Hari ini aku tahu... aku bisa selalu percaya padamu.',
    zhao: 'Musou_mode/Karakter1/Karakter1/Percakapan/Biasa.png',
    anya: 'Musou_mode/Karakter2/Bahagia.png',
  },
  {
    speaker: 'zhao',
    text: 'Ayo, kita mulai babak baru. Apa pun yang datang, kita hadapi berdua.',
    zhao: 'Musou_mode/Karakter1/Karakter1/Percakapan/Biasa.png',
    anya: 'Musou_mode/Karakter2/Bahagia.png',
  },
];

function stopAllAudio() {
  [battleBgm, encyclopediaBgm, dialogueBgm, rewardBgm, sfxEnemyAttack, sfxEnemyHit, sfxEnemyLose].forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function showScreen(id) {
  screens.forEach((s) => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const inEncyclopedia = id.startsWith('ency');
  if (inEncyclopedia) {
    encyclopediaBgm.volume = 0.4;
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

function showReaction(target, src, duration = 2200) {
  target.src = src;
  target.classList.add('visible');
  setTimeout(() => target.classList.remove('visible'), duration);
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

  const conf = battleConfig[currentBattle];
  const item = conf.questionPool[currentRound % conf.questionPool.length];
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
  const conf = battleConfig[currentBattle];
  const correct = selected === answer;
  currentRound += 1;
  choicesWrap.innerHTML = '';

  if (correct) {
    correctCount += 1;
    attackCountHero += 1;
    enemyHp -= 1;
    battleLog.textContent = `Benar! ${heroName.textContent} menyerang ${conf.enemyName}!`;

    const heroAttackAlt = attackCountHero % 2 === 0;
    showReaction(
      heroReaction,
      heroAttackAlt ? conf.heroAttack2 : 'Musou_mode/Karakter1/Karakter1/Battle/Menyindir.png',
    );
    showReaction(enemyReaction, conf.enemyHit);
    showEffect(heroAttackAlt ? conf.heroFxEven : conf.heroFxOdd, true);
    playAttackMotion(true);

    sfxEnemyHit.src = conf.enemyHitSfx;
    sfxEnemyHit.currentTime = 0;
    sfxEnemyHit.volume = 1;
    sfxEnemyHit.play().catch(() => {});
  } else {
    attackCountEnemy += 1;
    heroHp -= 1;
    battleLog.textContent = `Salah! ${conf.enemyName} membalas serangan!`;

    const enemyAttackAlt = attackCountEnemy % 2 === 0;
    showReaction(enemyReaction, enemyAttackAlt ? conf.enemyAttack2 : conf.enemyAttack1);
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Terkena_serangan.png');
    if (conf.showCaptured) {
      showReaction(capturedReaction, 'Musou_mode/Karakter2/Sedih.png', 1800);
    }
    showEffect(enemyAttackAlt ? conf.enemyFxEven : conf.enemyFxOdd, false);
    playAttackMotion(false);

    sfxEnemyAttack.src = enemyAttackAlt ? conf.enemyAttackSfx2 : conf.enemyAttackSfx1;
    sfxEnemyAttack.currentTime = 0;
    sfxEnemyAttack.volume = 1;
    sfxEnemyAttack.play().catch(() => {});
  }

  updateHpBars();
  setTimeout(askQuestion, 2000);
}

function showRewardAndProceed() {
  const conf = battleConfig[currentBattle];
  rewardImg.src = conf.rewardImg;

  rewardBgm.src = conf.rewardBgm;
  rewardBgm.volume = 0.45;
  rewardBgm.currentTime = 0;
  rewardBgm.play().catch(() => {});

  transitionTo('reward-screen');

  if (conf.rewardAutoNext) {
    setTimeout(() => startEndingSequence(), 2600);
  }
}

function endBattle() {
  const conf = battleConfig[currentBattle];
  const heroWon = currentBattle === 'hutan' ? enemyHp <= 0 || correctCount >= 2 : enemyHp <= heroHp;

  if (heroWon) {
    battleLog.textContent = `Kemenangan! ${heroName.textContent} memenangkan pertempuran.`;
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Menang.png');
    showReaction(enemyReaction, conf.enemyLose);

    sfxEnemyLose.src = conf.enemyLoseSfx;
    sfxEnemyLose.currentTime = 0;
    sfxEnemyLose.volume = 1;
    sfxEnemyLose.play().catch(() => {});

    setTimeout(() => {
      battleBgm.pause();
      battleBgm.currentTime = 0;
      showRewardAndProceed();
    }, 2000);
  } else {
    battleLog.textContent = `Kalah! ${conf.enemyName} masih unggul. Coba lagi dari menu Musou.`;
    showReaction(heroReaction, 'Musou_mode/Karakter1/Karakter1/Battle/Kalah.png');
    showReaction(enemyReaction, conf.enemyWin);
    setTimeout(() => transitionTo('musou-screen'), 2100);
  }
}

function setupBattleAppearance() {
  const conf = battleConfig[currentBattle];
  heroName.textContent = 'Zhào Bóyán Shànbà';
  enemyName.textContent = conf.enemyName;
  enemyIdle.src = conf.enemyIdle;
  battleBg.src = conf.bg;
  capturedIdle.classList.toggle('visible-captured', conf.showCaptured);
  capturedReaction.classList.toggle('visible-captured', conf.showCaptured);
}

function startBattle(mode) {
  stopAllAudio();
  currentBattle = mode;
  const conf = battleConfig[currentBattle];
  setupBattleAppearance();

  heroHp = heroHpMax;
  enemyHp = enemyHpMax;
  currentRound = 0;
  attackCountHero = 0;
  attackCountEnemy = 0;
  correctCount = 0;
  updateHpBars();

  battleLog.textContent = 'Pertempuran dimulai! Jawab 4 soal untuk menentukan pemenang.';
  transitionTo('battle-screen');

  battleBgm.src = 'Musou_mode/Background_perang.mp3';
  battleBgm.volume = 0.2;
  battleBgm.currentTime = 0;
  battleBgm.play().catch(() => {});

  setTimeout(askQuestion, 1100);
}

async function loadText(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return 'Narasi belum dapat dimuat.';
    return await res.text();
  } catch {
    return 'Narasi belum dapat dimuat.';
  }
}

async function showEncyclopediaDetail(type, key) {
  const item = encyclopediaData[type][key];
  encyTitle.textContent = item.title;
  encyImage.src = item.image;
  encyBg.src = item.bg;
  encyText.textContent = 'Memuat narasi...';
  encyDetailBack.setAttribute('data-back', item.backTo);
  transitionTo('ency-detail-screen');
  encyText.textContent = await loadText(item.textPath);
}

function fadeOutDialogueBgmAndFinish() {
  let volume = dialogueBgm.volume;
  const timer = setInterval(() => {
    volume -= 0.05;
    if (volume <= 0) {
      clearInterval(timer);
      dialogueBgm.pause();
      dialogueBgm.currentTime = 0;
      dialogueBgm.volume = 0.45;
      playEndingVideo('Musou_mode/Tamat/Sesudah_ngobrol.mp4', () => {
        transitionTo('menu-screen');
      });
      return;
    }
    dialogueBgm.volume = volume;
  }, 120);
}

function renderDialogueStep() {
  const item = activeDialogue[dialogueIndex];
  if (!item) {
    dialogueNext.disabled = true;
    fadeOutDialogueBgmAndFinish();
    return;
  }

  dialogueZhao.src = item.zhao;
  dialogueAnya.src = item.anya;
  dialogueBubble.src = item.speaker === 'zhao' ? 'Musou_mode/Tamat/Zhao_bubble.png' : 'Musou_mode/Tamat/Anya_buble.png';
  dialogueText.textContent = item.text;
}

function startDialogueScene() {
  transitionTo('dialogue-screen');
  activeDialogue = dialogueScript;
  dialogueIndex = 0;
  dialogueNext.disabled = false;

  dialogueBgm.volume = 0.45;
  dialogueBgm.currentTime = 0;
  dialogueBgm.play().catch(() => {});

  renderDialogueStep();
}

function playEndingVideo(src, onEnded) {
  transitionTo('ending-video-screen', () => {
    endingVideo.src = src;
    endingVideo.controls = false;
    endingVideo.currentTime = 0;
    endingVideo.play().catch(() => {});
    endingVideo.onended = onEnded;
  });
}

function startEndingSequence() {
  if (pendingEndingSequence) return;
  pendingEndingSequence = true;

  playEndingVideo('Musou_mode/Tamat/Sebelum_ngobrol.mp4', () => {
    startDialogueScene();
  });
}

btnStartOpening.addEventListener('click', (event) => {
  event.stopPropagation();
  startOpeningWithSound();
});
btnMusou.addEventListener('click', () => transitionTo('musou-screen'));
btnEncyclopedia.addEventListener('click', () => transitionTo('encyclopedia-screen'));
btnCiawi.addEventListener('click', () => startBattle('ciawi'));
btnHutan.addEventListener('click', () => startBattle('hutan'));
btnEncyBattle.addEventListener('click', () => transitionTo('ency-battle-screen'));
btnEncyCharacter.addEventListener('click', () => transitionTo('ency-character-screen'));

encyItemButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-type');
    const key = btn.getAttribute('data-key');
    showEncyclopediaDetail(type, key);
  });
});

backButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-back');
    if (target === 'menu-screen') {
      stopAllAudio();
      pendingEndingSequence = false;
    }
    transitionTo(target);
  });
});

rewardImg.addEventListener('click', () => {
  if (currentBattle === 'ciawi') {
    stopAllAudio();
    transitionTo('menu-screen');
  }
});

dialogueNext.addEventListener('click', () => {
  dialogueIndex += 1;
  renderDialogueStep();
});

openingScreen.addEventListener('click', skipOpening);
document.addEventListener('keydown', skipOpening);
openingVideo.addEventListener('ended', () => transitionTo('menu-screen'));
