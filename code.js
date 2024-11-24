let qestions_num=document.querySelector(".count span");
let bullets=document.querySelector(".bullets .spans");
let qest=document.querySelector(".quiz-area");
let Area=document.querySelector(".answers-area");
let sumbit=document.querySelector("button");
let res=document.querySelector(".results");
let Countdown=document.querySelector(".countdown");

let current_index=0;
let right_answers=0;
let timer;
function getQueations()
{
    let myreqest=new XMLHttpRequest();
    myreqest.open("GET","code.json",true);
    myreqest.send();
    myreqest.onreadystatechange=function()
    {
        if(this.status===200 && this.readyState===4)
        {
            let js_object=JSON.parse(this.responseText);
            add_bullets(js_object.length);
            countdown(5,js_object.length);
            add_answers(js_object[current_index],js_object.length);
            sumbit.onclick=()=>{
                let theright=js_object[current_index].right_answer;
                current_index++;
                checkAnswer(theright,js_object.length);
                Area.innerHTML="";
                qest.innerHTML="";
                add_answers(js_object[current_index],js_object.length);
                changebullets(current_index);
                clearInterval(timer);
                countdown(5,js_object.length);
                showres(js_object.length);
            }
            // console.log(js_object[0]);

        }
        
    }
}
getQueations();
function add_bullets(num)
{
    qestions_num.innerHTML=num;
   for(let i=0;i<num;i++)
   {
     let span =document.createElement("span");
     if(i===0)
     {
        span.className="on";
     }
    bullets.appendChild(span);
   }
}

function add_answers(item,num){
  if(num>current_index)
  {
    let qestion=document.createElement("h2");
    let text=document.createTextNode(item.title);
    qestion.appendChild(text);
    qest.appendChild(qestion);
   
    for (let i=0 ;i<4;i++)
    {
      let answer=document.createElement("div");
      answer.className="answer";
  
      let radio=document.createElement("input");
      // by default first answer will be checked
      if(i===0)
      {
          radio.checked=true;
      }
      radio.name="qestion";
      radio.type='radio';
      radio.id=`answer_${i}`;
      //why we wrie this line
      radio.dataset.ans=item[`answer_${i+1}`];
      answer.appendChild(radio);
      let label=document.createElement("label");
      label.htmlFor=`answer_${i}`;
      let label_text=document.createTextNode(item[`answer_${i+1}`]);
      label.appendChild(label_text);
      answer.appendChild(label);
      Area.appendChild(answer);
    
    }
  }
}

function checkAnswer(ans,count)
{
     let choice=document.getElementsByName("qestion");
     let chosen;
   for(let i=0;i<choice.length;i++)
   {
      if(choice[i].checked)
      {
        chosen=choice[i].dataset.ans;
      }
   }
   if(ans=== chosen)
   {
    right_answers++;
    // console.log("true");
   }
  //  else
  //  {
  //   console.log("false");
  //  }
}

function changebullets(Index)
{
  let bullets=document.querySelectorAll(".bullets .spans span");
  let array=Array.from(bullets);
  array.forEach(function(el,index){
      if(Index===index)
      {
         el.className='on';
      }
  })
}

function showres(count)
{
  let final_res;
  if(count===current_index)
  {
    Area.remove();
    qest.remove();
    document.querySelector(".bullets").remove();
    sumbit.remove();
    if(right_answers>(count/2) && right_answers<count)
    {
      final_res=`<span class="good">good</span>, ${right_answers} is right from ${count}`;
    }
    else if(right_answers===count)
    {
       final_res=`<span class="perfect">perfect</span> All answers is right`;
    }
    else
    {
      final_res=`<span class="bad">bad</span> ${right_answers} is right from ${count}`;
    }
    res.innerHTML=final_res;
  res.style.padding='10px';
  res.style.marginTop='10px';
  }
  
}

function countdown(duration , count)
{
   if(current_index<count)
   {
    let minutes;
    let secound;
       timer=setInterval(function(){
         minutes=parseInt(duration / 60);
         secound=parseInt(duration%60);

        minutes=minutes<10?`0${minutes}`:minutes;
        secound=secound<10?`0${secound}`:secound;
        Countdown.innerHTML=`${minutes} : ${secound}`;
        if(--duration<0)
        {

          clearInterval(timer);
          sumbit.click();
        }
      },1000)
      
   }
}






