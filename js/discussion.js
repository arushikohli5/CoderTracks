/*jslint es6:true
jslint browser: true*/
var DATA = [];
var showfav = false;

//forms
const questionForm=document.getElementById('question');
const responseForm=document.getElementById('responseForm');

//buttons
const newQuesBtn=document.getElementById('new-ques');
const resolveBtn=document.getElementById('resolve');
const responseBtn=document.getElementById('response-submit');
const submitBtn=document.getElementById('ques-submit');
const responseSubmitbtn=document.getElementById('response-submit')

const welcome=document.getElementById('welcome');
const query=document.getElementById('query');
const noMatchFound=document.getElementById('no-match-found');
const response=document.getElementById('response');
const quesInfo=document.getElementById('question-info');
const index=document.getElementById('pos');
const quesList=document.getElementsByTagName('ul')[0];
const responseList=document.getElementById('responseList');


newQuesBtn.addEventListener('click',()=>{
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
});

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let ques=questionForm.ques.value;
    let subj=questionForm.subject.value;
    questionForm.ques.value='';
    questionForm.subject.value='';
    DATA.push({ques, subj, quesHighlight: [], subjHighLight: [], response: []});
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderQuestionList(DATA);
});

query.addEventListener('keyup', () => {
    let search = query.value.toLowerCase().trim();
    if(search.length === 0) {
        renderQuestionList(DATA);
        return;
    }
    let matches = 0;
    DATA.forEach((obj, ind, arr) => {
        obj.subjHighLight = generateHighlightIndex(search, obj.subj);
        obj.quesHighlight = generateHighlightIndex(search, obj.ques);
        matches += obj.subjHighLight.length + obj.quesHighlight.length;
    });
    if(matches === 0) renderNoMatchFound();
    else renderQuestionList(DATA, true);
});
setup();

function setup(){
    if(localStorage.getItem('DATA')){
        DATA=JSON.parse(localStorage.getItem('DATA'));
    }

    renderQuestionList(DATA);
    response.classList.add('d-none');
    welcome.classList.remove('d-none');

}


function renderQuestionList(questions, isQueryList = false) {
    if(query.value.trim() !== '') {
        isQueryList = true;
        }
    quesList.innerHTML = '';
    noMatchFound.classList.add('d-none');
    questions.forEach((obj, pos) => {
        if(isQueryList && obj.quesHighlight.length === 0 && obj.subjHighLight.length === 0) {}
        
        else {
            let div = createBox(obj.subj, obj.ques, isQueryList, obj.subjHighLight, obj.quesHighlight);
            let iconBar = document.createElement('div');
            iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');
            div.appendChild(iconBar);
            
            let li = document.createElement('li');
            li.appendChild(div);
            li.addEventListener('click', () => displayResponseArea(pos));
            quesList.appendChild(li);
        }
    });
}

function createBox(title,subtitle,isQueryList=false,titleHighlight=[],subtitleHighlight=[]){
    let h5=document.createElement('h5');
    h5.setAttribute('class','mb-1');
    
    if(!isQueryList){
        let header=document.createTextNode(title);
        h5.appendChild(header);
    }
    else{
        generateHighlight(h5,title,titleHighlight);
    }
    
    let p=document.createElement('p');
    p.setAttribute('class', 'text-secondary mb-1');

    if(!isQueryList){
        let a=document.createTextNode(subtitle);
        p.appendChild(a);
    }
    else{
        generateHighlight(p,subtitle,subtitleHighlight);
    }

    let div=document.createElement('div');
    div.setAttribute('class','py-1 pl-1 border-bottom');
    div.appendChild(h5);
    div.appendChild(p);

    return div;
}

function generateHighlight(parent, text, highlights) {
    let s = 0;
    let piece = '';
    highlights.forEach((obj) => {
        
        let span = document.createElement('span');
        span.classList.add('bg-warning');
        piece = document.createTextNode(text.substring(obj.beg, obj.end));
        s = obj.end;
        span.appendChild(piece);
        parent.appendChild(span);
    });
    if(s < text.length) {
        piece = document.createTextNode(text.substring(s, text.length));
        parent.appendChild(piece);
    }
}


function generateHighlightIndex(search, text) {
    let s = 0;
    let arr = [];
    text = text.toLowerCase();
    while(s < text.length) {
        let beg = text.indexOf(search, s);
        if(beg === -1) break;
        s = beg + search.length;
        arr.push({beg, end: s});
    }
    return arr;
}

function renderResponseList(responses) {
    responseList.innerHTML = '';
    responses.forEach((resp, pos) => {

        let div = createBox(resp.name, resp.message);
        div.classList.add('bg-light');
        div.classList.add('my-2');
        div.classList.remove('border-bottom');

        
        let iconBar = document.createElement('div');
        iconBar.setAttribute('class', 'mr-2 d-flex justify-content-end');
        
        div.append(iconBar);
        responseList.appendChild(div);
    });
}

function renderQuestionInfo(question) {
    let div = createBox(question.subj, question.ques);
    let iconBar = document.createElement('div');
    iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');
    
    div.appendChild(iconBar);
    div.classList.add('bg-light');
    div.classList.remove('border-bottom');
    quesInfo.innerHTML = '';
    quesInfo.appendChild(div);
}

function deleteQuestion() {
    DATA.splice(index.value, 1);
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderQuestionList(DATA);
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
}

function addResponse(e) {
    e.preventDefault();
    let name = responseForm.username.value, message = responseForm.response.value;
    responseForm.username.value = '';
    responseForm.response.value = '';
    let q = DATA[responseForm.qId.value];
    q.response.push({name, message});
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderResponseList(q.response);
}

function displayResponseArea(pos) {
    index.value = pos;
    welcome.classList.add('d-none');
    response.classList.remove('d-none');
    renderQuestionInfo(DATA[pos]);
    renderResponseList(DATA[pos].response);
}

function createCountLabel(count) {
    let span = document.createElement('span');
    span.innerText = count;
    return span;
}

function renderNoMatchFound() {
    quesList.innerHTML = '';
    noMatchFound.classList.remove('d-none');
}

responseSubmitbtn.addEventListener('click', addResponse);

resolveBtn.addEventListener('click', deleteQuestion);
