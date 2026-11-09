"use strict";

// 각 축에 정확히 네 문항이 있습니다. 동점은 해당 축의 마지막 답변으로 결정합니다.
const questions = [
  { axis: "EI", scene: "출근길", text: "월요일 아침, 엘리베이터에서 팀원을 마주쳤다!", choices: [{ text: "먼저 말을 걸고 주말 썰로 엘리베이터를 접수한다.", letter: "E" }, { text: "살짝 웃어 인사하고 이어폰 속 내 세계로 돌아간다.", letter: "I" }] },
  { axis: "EI", scene: "새 프로젝트", text: "새 프로젝트 킥오프, 나의 첫 행동은?", choices: [{ text: "사람들을 모아 아이디어를 주고받으며 에너지를 얻는다.", letter: "E" }, { text: "자료를 먼저 읽고 생각을 정리한 뒤 의견을 낸다.", letter: "I" }] },
  { axis: "EI", scene: "점심시간", text: "점심시간이 왔다. 오늘의 식사 작전은?", choices: [{ text: "동료들을 소집해 시끌벅적한 맛집 원정을 떠난다.", letter: "E" }, { text: "혼자 조용히 좋아하는 메뉴를 먹으며 충전한다.", letter: "I" }] },
  { axis: "EI", scene: "회식 자리", text: "회식 2차 얘기가 나오자 나는?", choices: [{ text: "좋아! 오늘은 내가 분위기 담당 빌런이다.", letter: "E" }, { text: "에너지가 바닥났다. 조용히 탈출 경로를 찾는다.", letter: "I" }] },
  { axis: "SN", scene: "업무 지시", text: "상사가 새 업무를 맡겼다. 가장 먼저 궁금한 것은?", choices: [{ text: "마감일, 예산, 필요한 자료 같은 구체적인 정보.", letter: "S" }, { text: "이 일의 큰 목적과 앞으로 펼쳐질 가능성.", letter: "N" }] },
  { axis: "SN", scene: "회의 자료", text: "회의 자료를 읽을 때 내 눈에 먼저 들어오는 건?", choices: [{ text: "숫자와 사례, 바로 실행할 수 있는 내용.", letter: "S" }, { text: "자료 사이에 숨어 있는 흐름과 새로운 아이디어.", letter: "N" }] },
  { axis: "SN", scene: "문제 발생", text: "예상 못 한 문제가 터졌다! 나의 해결 방식은?", choices: [{ text: "예전에 통했던 방법과 확인된 사실부터 살핀다.", letter: "S" }, { text: "원인을 연결해 보고 색다른 해결책을 떠올린다.", letter: "N" }] },
  { axis: "SN", scene: "기획 발표", text: "내가 기획안을 설명한다면 가장 자신 있는 부분은?", choices: [{ text: "현실적인 단계와 꼼꼼한 실행 계획.", letter: "S" }, { text: "듣는 사람을 설레게 하는 미래 그림.", letter: "N" }] },
  { axis: "TF", scene: "피드백", text: "동료가 내 의견과 반대되는 말을 했다. 나는?", choices: [{ text: "근거를 비교해 더 타당한 쪽을 찾는다.", letter: "T" }, { text: "상대가 왜 그렇게 느꼈는지 먼저 들어본다.", letter: "F" }] },
  { axis: "TF", scene: "팀 갈등", text: "팀원 둘이 살짝 다퉜다. 내 빌런식 중재법은?", choices: [{ text: "문제의 핵심을 정리하고 공평한 기준을 세운다.", letter: "T" }, { text: "각자의 감정을 듣고 상처를 덜 남기는 길을 찾는다.", letter: "F" }] },
  { axis: "TF", scene: "칭찬 타임", text: "동료가 발표를 마쳤다. 내가 먼저 할 말은?", choices: [{ text: "핵심 메시지가 명확했어. 이 부분은 더 다듬자!", letter: "T" }, { text: "긴장했을 텐데 정말 수고했어. 멋졌어!", letter: "F" }] },
  { axis: "TF", scene: "결정 순간", text: "두 아이디어 중 하나만 골라야 한다면?", choices: [{ text: "성과와 효율을 따져 가장 합리적인 안을 고른다.", letter: "T" }, { text: "팀 분위기와 사람들에게 미칠 영향을 살핀다.", letter: "F" }] },
  { axis: "JP", scene: "일정 관리", text: "월요일 아침, 이번 주를 시작하는 방식은?", choices: [{ text: "할 일을 정리하고 일정표부터 장악한다.", letter: "J" }, { text: "급한 일부터 처리하며 흐름에 맞춰 움직인다.", letter: "P" }] },
  { axis: "JP", scene: "마감 전날", text: "마감 하루 전, 내 작업물은 보통?", choices: [{ text: "이미 끝나 있다. 마지막 점검만 남았다.", letter: "J" }, { text: "지금부터 집중력 폭발! 막판에 완성도가 오른다.", letter: "P" }] },
  { axis: "JP", scene: "갑작스런 변경", text: "회의 시간이 갑자기 바뀌었다. 내 속마음은?", choices: [{ text: "내 계획이 흔들리다니... 새 일정부터 다시 맞춘다.", letter: "J" }, { text: "오, 빈 시간이 생겼네! 그때 맞춰 유연하게 움직인다.", letter: "P" }] },
  { axis: "JP", scene: "퇴근 직전", text: "퇴근 10분 전, 새로운 일이 들어왔다!", choices: [{ text: "우선순위와 처리 시간을 정해 내일 계획에 넣는다.", letter: "J" }, { text: "상황을 보고 지금 할지 내일 할지 즉석에서 정한다.", letter: "P" }] }
];

const results = {
  INTJ: { title: "그림자 전략가 고양이", emoji: "🐈‍⬛", description: "회의실 구석에서 조용히 큰 그림을 그려요. 모두가 퇴근한 뒤에도 머릿속 작전판은 반짝반짝 돌아가는 타입!" },
  INTP: { title: "논리 실험실 문어", emoji: "🐙", description: "말수는 적어도 아이디어 촉수는 여덟 개. 복잡한 문제를 풀다가 엉뚱한 지름길까지 발견하는 호기심 빌런!" },
  ENTJ: { title: "카리스마 보스 사자", emoji: "🦁", description: "프로젝트가 나타나면 목표부터 접수해요. 자신감 넘치는 한마디로 팀을 이끄는 야망 가득한 대장 빌런!" },
  ENTP: { title: "말발 천재 여우", emoji: "🦊", description: "회의에서 반짝이는 반전 아이디어를 던져요. 토론을 놀이처럼 즐기며 판을 뒤집는 장난꾸러기 빌런!" },
  INFJ: { title: "비밀 계획가 올빼미", emoji: "🦉", description: "사람 마음도, 팀의 미래도 깊이 들여다봐요. 조용히 모두를 좋은 방향으로 움직이는 신비로운 빌런!" },
  INFP: { title: "상상력 폭주 토끼", emoji: "🐰", description: "마음속엔 나만의 작은 왕국이 있어요. 좋아하는 일에는 진심을 쏟고, 다정한 상상으로 회사를 물들이는 빌런!" },
  ENFJ: { title: "팀심 조종사 돌고래", emoji: "🐬", description: "동료들의 가능성을 발견하면 그냥 못 지나쳐요. 모두의 의욕을 끌어올리는 따뜻한 리더 빌런!" },
  ENFP: { title: "아이디어 폭죽 다람쥐", emoji: "🐿️", description: "새로운 재미를 보면 볼에 가득 저장해요. 말 한마디로 사무실 분위기를 바꿔 버리는 에너지 빌런!" },
  ISTJ: { title: "규칙 수호자 펭귄", emoji: "🐧", description: "체크리스트가 곧 나의 무기! 약속과 마감을 빈틈없이 지키며 팀을 든든하게 받쳐 주는 성실 빌런!" },
  ISFJ: { title: "몰래 챙김 요정 곰", emoji: "🐻", description: "누가 지쳤는지 먼저 알아채고 슬쩍 간식을 건네요. 조용한 배려로 팀의 체력을 지키는 포근한 빌런!" },
  ESTJ: { title: "일정 접수 대장 늑대", emoji: "🐺", description: "흩어진 업무를 한 줄로 세우는 능력자. 분명한 기준과 추진력으로 프로젝트를 전진시키는 지휘관 빌런!" },
  ESFJ: { title: "분위기 관리왕 강아지", emoji: "🐶", description: "팀원들의 기분과 회식 메뉴까지 놓치지 않아요. 모두를 하나로 모아 주는 친화력 만렙 빌런!" },
  ISTP: { title: "고장 해결사 너구리", emoji: "🦝", description: "말보다 손이 먼저 움직여요. 갑자기 생긴 문제도 침착하게 툭 해결하고 사라지는 쿨한 빌런!" },
  ISFP: { title: "감성 잠입 요원 고양이", emoji: "🐱", description: "조용히 자기만의 방식으로 멋을 내요. 자유로운 감각과 다정함으로 슬쩍 존재감을 남기는 빌런!" },
  ESTP: { title: "현장 돌파왕 치타", emoji: "🐆", description: "일이 터지면 누구보다 빨리 달려가요. 눈치와 순발력으로 위기를 기회로 바꾸는 액션 빌런!" },
  ESFP: { title: "스포트라이트 햄스터", emoji: "🐹", description: "적막한 사무실도 금세 무대로 만들어요. 즐거운 에너지로 동료들의 하루를 빛내는 인기 빌런!" }
};

const $ = (id) => document.getElementById(id);
const screens = { start: $("start-screen"), quiz: $("quiz-screen"), result: $("result-screen") };
let currentIndex = 0;
let answers = Array(questions.length).fill(null);
let advanceTimer = null;
let currentType = null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => { element.hidden = key !== name; });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderQuestion() {
  const question = questions[currentIndex];
  $("question-count").textContent = `${String(currentIndex + 1).padStart(2, "0")} / 16`;
  $("scene-tag").textContent = `SCENE ${String(currentIndex + 1).padStart(2, "0")} · ${question.scene}`;
  $("question-title").textContent = question.text;
  $("progress-fill").style.width = `${(currentIndex / questions.length) * 100}%`;
  const progress = document.querySelector(".progress-track");
  progress.setAttribute("aria-valuenow", String(currentIndex));
  progress.setAttribute("aria-valuetext", `${questions.length}개 중 ${currentIndex}개 완료`);
  $("back-button").disabled = currentIndex === 0;
  const list = $("answer-list");
  list.replaceChildren();
  question.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-button${answers[currentIndex] === choice.letter ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(answers[currentIndex] === choice.letter));
    const key = document.createElement("span");
    key.className = "answer-key";
    key.textContent = String(choiceIndex + 1);
    key.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.textContent = choice.text;
    button.append(key, text);
    button.addEventListener("click", () => chooseAnswer(choice.letter));
    list.append(button);
  });
  $("question-title").focus({ preventScroll: true });
}

function chooseAnswer(letter) {
  clearTimeout(advanceTimer);
  answers[currentIndex] = letter;
  Array.from($("answer-list").children).forEach((button, index) => {
    const selected = questions[currentIndex].choices[index].letter === letter;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = true;
  });
  advanceTimer = setTimeout(() => {
    if (currentIndex === questions.length - 1) {
      showResult(calculateType());
    } else {
      currentIndex += 1;
      renderQuestion();
    }
  }, 300);
}

function calculateType() {
  return ["EI", "SN", "TF", "JP"].map((axis) => {
    const indices = questions.map((question, index) => question.axis === axis ? index : -1).filter((index) => index >= 0);
    const first = indices.filter((index) => answers[index] === axis[0]).length;
    const second = indices.filter((index) => answers[index] === axis[1]).length;
    return first === second ? answers[indices[indices.length - 1]] : first > second ? axis[0] : axis[1];
  }).join("");
}

function showResult(type) {
  const result = results[type];
  if (!result) return;
  currentType = type;
  $("result-type").textContent = type;
  $("result-title").textContent = result.title;
  $("result-emoji").textContent = result.emoji;
  $("result-emoji").setAttribute("aria-label", result.title);
  $("result-description").textContent = result.description;
  $("share-feedback").textContent = "";
  $("manual-share").hidden = true;
  showScreen("result");
  $("result-title").focus({ preventScroll: true });
}

function startQuiz() {
  clearTimeout(advanceTimer);
  currentIndex = 0;
  answers = Array(questions.length).fill(null);
  currentType = null;
  showScreen("quiz");
  renderQuestion();
}

function sharePayload() {
  const result = results[currentType];
  const text = `회사에서 나는 무슨 빌런?\n내 결과는 ${result.emoji} ${result.title} (${currentType})!\n${result.description}`;
  const url = /^https?:$/.test(window.location.protocol) ? `${window.location.origin}${window.location.pathname}?type=${currentType}` : "";
  return { title: "회사에서 나는 무슨 빌런?", text, url };
}

async function shareResult() {
  if (!currentType) return;
  const payload = sharePayload();
  const fullText = payload.url ? `${payload.text}\n${payload.url}` : payload.text;
  if (navigator.share) {
    try {
      await navigator.share(payload);
      $("share-feedback").textContent = "결과를 공유했어요!";
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(fullText);
    $("share-feedback").textContent = "결과 문구를 복사했어요! 원하는 곳에 붙여넣어 주세요.";
  } catch (_) {
    $("share-text").value = fullText;
    $("manual-share").hidden = false;
    $("share-text").focus();
    $("share-text").select();
    $("share-feedback").textContent = "자동 복사가 어려워요. 아래 문구를 직접 복사해 주세요.";
  }
}

$("start-button").addEventListener("click", startQuiz);
$("restart-button").addEventListener("click", startQuiz);
$("share-button").addEventListener("click", shareResult);
$("back-button").addEventListener("click", () => {
  clearTimeout(advanceTimer);
  if (currentIndex > 0) { currentIndex -= 1; renderQuestion(); }
});
document.addEventListener("keydown", (event) => {
  if (screens.quiz.hidden || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
  if (event.key !== "1" && event.key !== "2") return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName))) return;
  const button = $("answer-list").children[Number(event.key) - 1];
  if (button && !button.disabled) button.click();
});

const requestedType = new URLSearchParams(window.location.search).get("type")?.toUpperCase();
if (requestedType && Object.hasOwn(results, requestedType)) showResult(requestedType);
