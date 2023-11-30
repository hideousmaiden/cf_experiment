PennController.ResetPrefix(null)

Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global()).log( "id" , getVar("ID") ) // Add the ID to all trials' results lines
    
Sequence("welcome", randomize("experimental-trial"), "send", "final");


// Welcome screen and logging user's ID
newTrial( "welcome",
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("instructions-2", "<b>В этом эксперименте, вам нужно будет оценить естественность предложения в заданном контексте</b>")
        .center()
        .print()
    ,
    newText("instructions-3", "<p>Контекст будет задан с подписью \"Контекст: <...>\" </p>")
        .center()
        .print()
    ,
    newText("instructions-4", "<p>Ниже будет показано предложение, смысловую приемлимость и уместность которого вам нужно будет оценить <b>по шкале от 0 до 10</b>.</p>")
        .center()
        .print()
    ,
    newText("Введите ваш возраст:")
    ,
    newTextInput("age")
        .print()
    ,
    newButton("Начать")
        .print()
          .wait(getTextInput("age").testNot.text(""))
);
    
Template("list.csv" , 
    row => newTrial( "experimental-trial" ,
    newText("context", row.text).center().print()
    ,
    newText("check", row.check).center().print()
    ,
    newText("blank", "\n\n").center().print()
    ,
    newScale("AcceptabilityJudgment", 10)
    //.before( newText("left", "плохо"))
    //.after(newText("right", "хорошо")).default(5)
    .center().print().log("judge"),
    newText("blank2", "бессмысленно _ _ _ _ _ _ _ _ _ _ _ _ _ осмысленно").center().print(),
    newText("blank3", "                                                 ").print(),
    
    
    //.size("640px","1em")
    //newController("AcceptabilityJudgment", {s: row.check, as: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], presentAsScale: true,
    //leftComment: "very bad", rightComment: "very good"}).print().log("judge")
    
    newButton("Далее")
        .print()
        .wait( getScale("AcceptabilityJudgment").test.selected()) 
        // End of trial, move to next one
    )
    .log( "Age" , getVar("age") )
    .log( "Sentence", row.sentID)
    .log( "Group", row.group)      // Append group (A vs B) to each result line
    .log( "Condition", row.condition)  // Append condition (tr. v op. v fi.) to each result line
);
// Send the results
SendResults("send");

// A simple final screen
newTrial ( "final" ,
    newText("The experiment is over. Thank you for participating!")
        .print()
    ,
    newText("You can now close this page.")
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
);