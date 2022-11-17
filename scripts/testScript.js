var questions = new Map();

var num=0;

var questionNum=0;
var stageNum=1;
var attemptNum=0;
var answersSelected = [];
var score=0;

var textLoaded=null;

class Question 
{   
    format=null;        
    type= null;
    wordsNum=0;
    optionsNum=0;
    grade=0;
    errorMessage="";
    answers=new Set();
    correctAnswers=new Set();
    question="";
    Task="";
    usedFlag=false;
    answersBlock="";
    taskBlock="";
    questionBlock="";
  
    constructor(input)
    {
        var fields = input.split('//');
        
        this.format=fields[0];        
        this.type= fields[1];

        // var wordsNum=0;
        // var optionsNum=0;
        
        // var grade=0;
        // var errorMessage="Correct answer is '";

        // var answers=new Set();
        // var correctAnswers=new Set();
        
        // var question=null;
        
        // var Task=null;
        
        // var usedFlag=false;

        // var answersBlock=null;
        // var questionBlock=null;
       



        console.log (this.format);
        console.log (this.type);  
        switch (this.type)
        {
            case "Txt":
                {
                    this.question=fields[3];
                    this.wordsNum=parseInt(fields[2]);
                    this.correctAnswers.add(fields[4]);
                    this.Task="Write "+this.wordsNum+" word(s) to fill in the gap in the text below."
                    this.taskBlock="<p class='taskStyle'>"+this.Task+"</p>";
                    if (this.format=="Txt") this.questionBlock="<p class='questionStyle'>"+this.question+"</p>";
                    else if (this.format="Pic")
                    {
                        this.questionBlock="<p class='questionStyle'>"+this.question+"</p></div>"+
                                             "<div><img class='question-image' src='img/"+fields[5]+"'></div>";
                    }                   
                    this.answersBlock="<input name='textAnswerOption' type='text' style='width: 30%; padding: 10px; margin: auto; border: 1px solid white; font-size: 20px' name='answerText' value=''>";
                    break;
                }
            case "Mult":
               {
                this.question=fields[2];                    
                this.answers.add(fields[3]);
                this.answers.add(fields[4]);
                this.answers.add(fields[5]);
                this.answers.add(fields[6]);            
                this.Task="Select ONE answer to fill in the gap in the text below."
                this.correctAnswers.add(fields[7]);
                this.taskBlock="<p class='taskStyle'>"+this.Task+"</p>";
                if (this.format=="Txt") this.questionBlock="<p class='questionStyle'>"+this.question+"</p>";
                else if (this.format="Pic")
                {
                    this.questionBlock="<p class='questionStyle'>"+this.question+"</p></div>"+
                                         "<div><img class='question-image' src='img/"+fields[8]+"'></div>";
                }                   
                    for (var current of this.answers)
                    {
                        this.answersBlock+="<p style='width: 100%; padding: 10px; margin: auto; font-family: Arial;'><input name='radioAnswerOption'  type='radio' value='"+current+"'> <span style='font-size: 20px'>"+current+"</span></p>";
                       
                    }                   
                    break;
                }
                case "Opt":
                    {
                        this.question=fields[3];
                        this.optionsNum=parseInt(fields[2]);
                         switch (this.optionsNum)
                         {
                             case 2:
                                 {
                                    this.correctAnswers.add(fields[10]);  
                                    this.correctAnswers.add(fields[11]);
                                    break;  
                                 }
                                 case 3:
                                    {
                                        this.correctAnswers.add(fields[10]);  
                                        this.correctAnswers.add(fields[11]);
                                        this.correctAnswers.add(fields[12]);
                                       break;  
                                    }
                         }                  
                         this.answers.add(fields[4]);
                         this.answers.add(fields[5]);
                         this.answers.add(fields[6]);
                         this.answers.add(fields[7]);
                         this.answers.add(fields[8]);
                         this.answers.add(fields[9]);
                         this.Task="Select ALL options which could be used to fill in the gap in the text below."
                        
                         this.taskBlock="<p class='taskStyle'>"+this.Task+"</p>";
                         if (this.format=="Txt") this.questionBlock="<p class='questionStyle'>"+this.question+"</p>";
                         else if (this.format="Pic")
                         {
                            switch (this.optionsNum)
                            {
                                case 2:
                                    {
                                        this.questionBlock="<div> <p class='questionStyle'>"+this.question+"</p></div>"+
                                        "<div><img class='question-image' src='img/"+fields[12]+"'></div>";
                                       break;  
                                    }
                                    case 3:
                                       {
                                        this.questionBlock="<div> <p class='questionStyle'>"+this.question+"</p></div>"+
                                        "<div><img class='question-image' src='img/"+fields[13]+"'></div>";
                                        break;
                                       }
                            }          
                         }                   

                        
                        
                         for (var current of this.answers)
                         {
                            this.answersBlock+="<p style='width: 100%; padding: 10px; margin: auto; font-family: Arial;'><input  name='checkboxAnswerOption' type='checkbox' value='"+current+"'> <span style='font-size: 20px;'>"+current+"</span></p>";
                            
                         }                   
                         break;
                     }
        }
    } 


   
    answerCheck(answerArray)
    {
        switch (this.type)
        {
            case "Txt":
                {
                   if (this.correctAnswers.has(answerArray[0])) return 1;
                   else 
                   {
                    this.correctAnswers.forEach(current=>{this.errorMessage=current});                    
                        return 0;
                    }
                }
            case "Mult":
               {
                if (this.correctAnswers.has(answerArray[0])) return 1;
                else 
                {                    
                    this.correctAnswers.forEach(current=>{this.errorMessage=current});
                    return 0;
                 }
               }
            case "Opt":
                {
                    if (answerArray.length==this.correctAnswers.size)
                    {
                        answerArray.forEach(current => {
                        if (!this.correctAnswers.has(current))
                            {
                                this.correctAnswers.forEach(current=>{this.errorMessage+=current+" // "});                               
                                return 0;                                
                            } 
                        })                        
                        return 1;
                    }
                    else
                    {
                        this.correctAnswers.forEach(current=>{this.errorMessage+=current+" // "});                        
                        return 0;                                
                    } 
                }                
        }
    } 
}
   


function OnLoadDocument()
{
    $('#loader').on('change', function() {  
        const reader1=new FileReader();        
        reader1.onload = function(event)
        {
           // console.log(event.target.result);
            textLoaded=event.target.result;
            // $(".selectorDiv").css("opacity", "0");
            // $("#nextButton").css("opacity", "1");
            $("#nextButton").prop("value", "Start test");
            DataLoad()
        };
        reader1.readAsText(this.files[0]);
    })

    $("#nextButton").click(function() {
        console.log("button click "+$("#nextButton").val());

        switch ($("#nextButton").val())
        {
            case "Select test file":
            {
                $("#loader").click();
                break;
            }
            case "Start test":
            {
                console.log("Start");
                if (attemptNum==3)
                {
                    questions.clear();
                    attemptNum==0;
                }

                attemptNum++;
                stageNum==1;               
                score=0;

                // const reader1=new FileReader();        
                // reader1.onload = function(event)
                // {
                //     console.log(event.target.result);
                //     textLoaded=event.target.result;
                //     DataLoad()
                // };
                // reader1.readAsText("questionsVarUpdated.txt");


                $("#bar").css("width","20"+"%");
                $(".trackBarDiv").css("opacity", "1");
                $(".enumerateContainerDiv").css("opacity", "1");
                $(".textDiv").css("opacity", "1");
                $(".answerContainerDiv").css("opacity", "1");
                $(".footerDiv").css("opacity", "1");
                QuestionSelect();
            
                break;

            }
            case "Next":
                {
                    QuestionSelect();
                    break;
                }
                case "Check answer":
                    {
                        switch (questions.get(questionNum).type)
                        {
                            case "Txt":
                                {
                                   answersSelected.push($("input[name=textAnswerOption]").val());
                                   break;
                                }
                            case "Mult":
                               {
                                answersSelected.push($("input[name=radioAnswerOption]:checked").val());
                                break;
                               }
                            case "Opt":
                                {
                                    $('input[name=checkboxAnswerOption]:checked').each(function () {
                                        answersSelected.push($(this).val());
                                   }); 
                                    break;
                                }                
                        }
                        CheckAnswer();
                        break;
                    }
                    case "Show test result":
                        {
                            ShowResult();
                            break;
                        }
        }
    });
   
}


function DataLoad()
{
    console.log("DataLoad");
    console.log(textLoaded);
        if (textLoaded.length>0)        {
            
            var fields = textLoaded.split('\r\n');
            fields.forEach(current=>{
                if (current.length>0)
                {
                    num++;
                    console.log(current);
                    questions.set(num, new Question(current));
                }
            });            
        }

        console.log(questions)
}

function QuestionSelect()
{
    
    var index=Math.floor(Math.random() * ((64) - 1) + 1);
  
    while ((questions.get(index)).usedFlag==true)
    {
        var index=Math.floor(Math.random() * ((64) - 1) + 1);
    }
    questionNum=index;

    console.log("INDEX:"+questionNum+" QUESTION: "+questions.get(questionNum))

    $("#questionText").css("opacity", "1");
    $("#answerOptions").css("opacity", "1");
    $("#taskText").html(questions.get(questionNum).taskBlock);
    $("#questionText").html(questions.get(questionNum).questionBlock);        
    $("#answerOptions").html(questions.get(questionNum).answersBlock);
    $("#enumerate").text(stageNum+"/20");
    $("#correct").text("Correct answers: "+score);
    $("#nextButton").prop('value','Check answer');
    $("#bar").css("width",(5*stageNum)+"%");
    
    questions.get(questionNum).usedFlag=true;
}

function CheckAnswer()
{
    
    if (questions.get(questionNum).answerCheck(answersSelected)==1)
    {
        $("#taskText").html("<p class='questionStyle' style='color: darkGreen; font-weight: bold; '>Correct answer!</p>");
        $("#questionText").css("opacity", "0");
        $("#answerOptions").css("opacity", "0");
        score++;
        $("#correct").text("Correct answers: "+score);

    }
    else 
    {
        $("#taskText").html("<p class='questionStyle' style='color: red; font-weight: bold; '>Incorrect answer!</p>");
        $("#questionText").css("opacity", "0");
        $("#answerOptions").html("<p> <span class='taskStyle' style='color: darkRed'>Correct answer(s):   </span> <span class='correctStyle' style='color: black'>"+questions.get(questionNum).errorMessage+"</span></p>");
    }
    $("#correct").text("Correct answers: "+score);
    $("#nextButton").prop('value','Next');
    answersSelected = [];
    if (stageNum==20)
    {
        $("#nextButton").prop('value','Show test result');
    }
    else 
    {
        stageNum++;
    }
}

function ShowResult()
{
    $("#taskText").html("<p class='questionStyle' style='color: green'>You have provided "+score+" correct answers out of 20</p>");
    var resultMessage=null;
    if (score>18) resultMessage="Your command of English is perfect!";
    else if (score>15 && score<19) resultMessage="Your have excellent command of English!";
    else if (score>10 && score<16) resultMessage="Your English is good but you should continue working on it!";
    else if (score>7 && score<11) resultMessage="This test is slightly higher than your level. You have a lot of work to do to improve your command of English!";
    else if (score>3 && score<8) resultMessage="This test is probably a bit too hard for you. You have to really work hard on your English!";
    else if (score<4) resultMessage="This test is way too hard for you. Why don't you start at the beginning?";

    $("#answerOptions").css("opacity", "1");
    $("#answerOptions").html("<p class='taskStyle' style='color: green'>"+resultMessage+"</p>");

  $(".enumerateContainerDiv").css("opacity", "0");
  $(".footerDiv").css("opacity", "0");
  $("#nextButton").prop('value','Start test');
  stageNum=0;
}
    


    




