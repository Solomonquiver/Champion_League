const teams = [
  'Real Madrid','Man City','Bayern','PSG',
  'Chelsea','Juventus','Barça','Liverpool',
  'Atletico','Dortmund','Inter','Ajax',
  'Porto','Benfica','RB Leipzig','AC Milan'
];

let stage = 0; // 0=Group,1=R16,2=QF,3=SF,4=Final
let bracket = []; // arrays of pairs
const stageNames = ['Group Stage','Round of 16','Quarterfinals','Semifinals','Final'];
const events = document.getElementById('events');
const title = document.getElementById('stage-title');
const btn = document.getElementById('nextStageBtn');
const bracketDiv = document.getElementById('bracket');

btn.addEventListener('click', () => {
  advanceStage();
});

function advanceStage() {
  if(stage===0){
    bracket = shuffle(teams);
    events.innerHTML = `<div class="event">Group Stage completed.</div>`;
  } else {
    bracket = playStage(bracket);
  }

  renderStage();
  stage++;
  if(stage>4) btn.disabled=true;
}

function playStage(prev){
  let winners = [];
  for(let i=0;i<prev.length;i+=2){
    const [t1,t2] = prev.slice(i,i+2);
    const [wlg,log] = simulateMatch(t1,t2);
    events.innerHTML += `<div class="event">${log}</div>`;
    winners.push(wlg);
  }
  return winners;
}

function simulateMatch(a,b){
  const ga = rand(0,5), gb = rand(0,5);
  let log = `${a} ${ga} - ${gb} ${b}`;
  if(ga===gb){
    const pen = rand(0,1)?1:-1;
    if(pen===1) log += ` (PKs: ${a} wins)` , ga++;
    else log += ` (PKs: ${b} wins)`, gb++;
  }
  return [ga>gb ? a : b, log];
}

function renderStage(){
  title.textContent = stageNames[stage];
  btn.textContent = stage<4 ? `Play ${stageNames[stage+1]}` : 'Tournament Complete';
  bracketDiv.innerHTML = '';}

//   for(getParticipantList().forEach(t => {
//     const el = document.createElement('div');
//     el.className='team-card';
//     el.innerHTML = `<img src="https://via.placeholder.com/40?text=${t[0]}" alt="">${t}`;
//     bracketDiv.append(el);
//   }));
// }




function getParticipantList(){
  if(stage===0) return bracket;
  return stage<=4 ? bracket : [];
}

function shuffle(arr){
  return arr.slice().sort(()=>Math.random()-0.5);
}

function rand(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

// Initial Render
renderStage();
